import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { beep } from '../lib/sound.js'
import { AVATARS, GRADES } from '../lib/utils.js'
import { supabase, cloudEnabled, pullProgress, pushProgress } from '../lib/supabase.js'

const SAVE_KEY = 'eb-trainer-v2'
const LEGACY_KEY = 'eb-trainer-v1'

const GRADE_RANK = { again: 1, hard: 2, okay: 3, easy: 4 }

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    known: {}, // dishId -> true (kept in sync with 'easy' level for the mastered count)
    levels: {}, // dishId -> 'again' | 'hard' | 'okay' | 'easy'  (absent = new / to study)
    stats: { flashSeen: 0, quizCorrect: 0, quizTotal: 0, guardCorrect: 0, guardTotal: 0 },
    muted: false,
  }
}

function normalizeState(s) {
  const d = defaultState()
  if (!s || typeof s !== 'object') return d
  const known = s.known || {}
  const levels = { ...(s.levels || {}) }
  // Back-compat: cards mastered before grades existed count as 'easy'.
  for (const id in known) if (!(id in levels)) levels[id] = 'easy'
  return { ...d, ...s, stats: { ...d.stats, ...(s.stats || {}) }, known, levels }
}

function newId() {
  return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// Load the multi-user store, migrating an older single-user save if present.
function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (raw && Array.isArray(raw.users) && raw.users.length) {
      const users = raw.users
        .filter((u) => u && u.id)
        .map((u) => ({
          id: u.id,
          name: u.name || 'Player',
          avatar: u.avatar || AVATARS[0],
          state: normalizeState(u.state),
        }))
      const activeId = users.some((u) => u.id === raw.activeId) ? raw.activeId : users[0].id
      return { activeId, users }
    }
  } catch {
    /* ignore */
  }

  // Migrate a pre-profiles save into a first profile so progress isn't lost.
  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY))
    if (legacy && typeof legacy === 'object') {
      const id = newId()
      return {
        activeId: id,
        users: [{ id, name: 'Player 1', avatar: AVATARS[0], state: normalizeState(legacy) }],
      }
    }
  } catch {
    /* ignore */
  }

  // Fresh install: no profiles yet — the app will show the profile gate.
  return { activeId: null, users: [] }
}

// Normalize a whole store (e.g. one pulled from the cloud) into a valid shape.
function normalizeStore(raw) {
  if (!raw || !Array.isArray(raw.users)) return null
  const users = raw.users
    .filter((u) => u && u.id)
    .map((u) => ({
      id: u.id,
      name: u.name || 'Player',
      avatar: u.avatar || AVATARS[0],
      state: normalizeState(u.state),
    }))
  if (!users.length) return null
  const activeId = users.some((u) => u.id === raw.activeId) ? raw.activeId : users[0].id
  return { activeId, users }
}

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [store, setStore] = useState(loadStore)
  const [flash, setFlash] = useState(null) // 'good' | 'bad' | null

  // persist whole store (all profiles + which one is active)
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(store))
    } catch {
      /* ignore */
    }
  }, [store])

  // ---- cloud sync (optional; only active when Supabase is configured) ----
  const [session, setSession] = useState(null)
  const [syncState, setSyncState] = useState('idle') // 'idle' | 'syncing' | 'synced' | 'error'
  const storeRef = useRef(store)
  storeRef.current = store
  // True while we're applying a store pulled from the cloud, so the debounced
  // push effect doesn't immediately echo it back up.
  const applyingRemote = useRef(false)

  // Track the auth session.
  useEffect(() => {
    if (!supabase) return
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null)
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // On sign-in: pull the cloud save (cloud wins) or seed it from local if empty.
  const userId = session?.user?.id ?? null
  useEffect(() => {
    if (!supabase || !userId) return
    let cancelled = false
    setSyncState('syncing')
    ;(async () => {
      const remote = await pullProgress(userId)
      if (cancelled) return
      const normalized = normalizeStore(remote)
      if (normalized) {
        applyingRemote.current = true
        setStore(normalized)
      } else {
        // No cloud save yet — push whatever this device has.
        await pushProgress(userId, storeRef.current)
      }
      if (!cancelled) setSyncState('synced')
    })()
    return () => {
      cancelled = true
    }
  }, [userId])

  // Debounced push of local changes to the cloud while signed in.
  useEffect(() => {
    if (!supabase || !userId) return
    if (applyingRemote.current) {
      applyingRemote.current = false
      return
    }
    setSyncState('syncing')
    const t = setTimeout(async () => {
      const ok = await pushProgress(userId, storeRef.current)
      setSyncState(ok ? 'synced' : 'error')
    }, 800)
    return () => clearTimeout(t)
  }, [store, userId])

  const signIn = useCallback(async (email) => {
    if (!supabase) return { error: 'Cloud sync is not configured.' }
    const { error } = await supabase.auth.signInWithOtp({
      email: (email || '').trim(),
      options: { emailRedirectTo: window.location.origin + window.location.pathname },
    })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setSyncState('idle')
  }, [])

  // Update only the active profile's game state. `fn` maps old state -> new state.
  const updateActive = useCallback((fn) => {
    setStore((s) => {
      if (!s.activeId) return s
      return {
        ...s,
        users: s.users.map((u) => (u.id === s.activeId ? { ...u, state: fn(u.state) } : u)),
      }
    })
  }, [])

  const flashTimer = useRef(null)
  const showFeedback = useCallback(
    (ok) => {
      updateActive((d) => {
        beep(ok ? 'good' : 'bad', d.muted)
        return d
      })
      setFlash(ok ? 'good' : 'bad')
      clearTimeout(flashTimer.current)
      flashTimer.current = setTimeout(() => setFlash(null), 480)
    },
    [updateActive]
  )

  const blip = useCallback(
    (type) =>
      updateActive((d) => {
        beep(type, d.muted)
        return d
      }),
    [updateActive]
  )

  const addXP = useCallback(
    (n) => updateActive((d) => ({ ...d, xp: Math.max(0, d.xp + n) })),
    [updateActive]
  )

  const bumpStreak = useCallback(
    (ok) =>
      updateActive((d) => {
        const streak = ok ? d.streak + 1 : 0
        return { ...d, streak, bestStreak: Math.max(d.bestStreak, streak) }
      }),
    [updateActive]
  )

  const markKnown = useCallback(
    (id) =>
      updateActive((d) => {
        if (d.known[id]) return d
        return { ...d, known: { ...d.known, [id]: true }, xp: d.xp + 5 }
      }),
    [updateActive]
  )

  // Grade a flashcard. XP is awarded only for genuine improvement, so
  // re-grading a card down (or spamming) doesn't farm points.
  const gradeCard = useCallback(
    (id, grade) =>
      updateActive((d) => {
        if (!GRADE_RANK[grade]) return d
        const prevRank = d.levels[id] ? GRADE_RANK[d.levels[id]] : 0
        const gained = Math.max(0, GRADE_RANK[grade] - prevRank) * 3
        const levels = { ...d.levels, [id]: grade }
        const known = { ...d.known }
        if (grade === 'easy') known[id] = true
        else delete known[id]
        return { ...d, levels, known, xp: d.xp + gained }
      }),
    [updateActive]
  )

  const recordQuiz = useCallback(
    (ok) =>
      updateActive((d) => ({
        ...d,
        xp: ok ? d.xp + 10 : d.xp,
        streak: ok ? d.streak + 1 : 0,
        bestStreak: ok ? Math.max(d.bestStreak, d.streak + 1) : d.bestStreak,
        stats: {
          ...d.stats,
          quizTotal: d.stats.quizTotal + 1,
          quizCorrect: d.stats.quizCorrect + (ok ? 1 : 0),
        },
      })),
    [updateActive]
  )

  const recordGuard = useCallback(
    (ok) =>
      updateActive((d) => ({
        ...d,
        xp: ok ? d.xp + 12 : d.xp,
        streak: ok ? d.streak + 1 : 0,
        bestStreak: ok ? Math.max(d.bestStreak, d.streak + 1) : d.bestStreak,
        stats: {
          ...d.stats,
          guardTotal: d.stats.guardTotal + 1,
          guardCorrect: d.stats.guardCorrect + (ok ? 1 : 0),
        },
      })),
    [updateActive]
  )

  const bumpFlashSeen = useCallback(
    () => updateActive((d) => ({ ...d, stats: { ...d.stats, flashSeen: d.stats.flashSeen + 1 } })),
    [updateActive]
  )

  const toggleMute = useCallback(
    () => updateActive((d) => ({ ...d, muted: !d.muted })),
    [updateActive]
  )

  const reset = useCallback(() => updateActive(() => defaultState()), [updateActive])

  // ---- profile management ----
  const createUser = useCallback((name, avatar) => {
    const id = newId()
    setStore((s) => ({
      activeId: id,
      users: [
        ...s.users,
        {
          id,
          name: (name || '').trim() || `Player ${s.users.length + 1}`,
          avatar: avatar || AVATARS[s.users.length % AVATARS.length],
          state: defaultState(),
        },
      ],
    }))
    return id
  }, [])

  const switchUser = useCallback(
    (id) => setStore((s) => (s.users.some((u) => u.id === id) ? { ...s, activeId: id } : s)),
    []
  )

  const renameUser = useCallback(
    (id, name) =>
      setStore((s) => ({
        ...s,
        users: s.users.map((u) =>
          u.id === id ? { ...u, name: (name || '').trim() || u.name } : u
        ),
      })),
    []
  )

  const deleteUser = useCallback(
    (id) =>
      setStore((s) => {
        const users = s.users.filter((u) => u.id !== id)
        const activeId = s.activeId === id ? (users[0]?.id ?? null) : s.activeId
        return { activeId, users }
      }),
    []
  )

  const active = store.users.find((u) => u.id === store.activeId) || null
  const gameState = active ? active.state : defaultState()

  const value = {
    ...gameState,
    flash,
    // profiles
    users: store.users.map(({ id, name, avatar }) => ({ id, name, avatar })),
    activeId: store.activeId,
    activeUser: active ? { id: active.id, name: active.name, avatar: active.avatar } : null,
    createUser,
    switchUser,
    renameUser,
    deleteUser,
    // cloud sync
    cloud: {
      enabled: cloudEnabled,
      email: session?.user?.email ?? null,
      signedIn: !!session,
      status: syncState,
    },
    signIn,
    signOut,
    // gameplay
    addXP,
    bumpStreak,
    markKnown,
    gradeCard,
    recordQuiz,
    recordGuard,
    bumpFlashSeen,
    toggleMute,
    reset,
    showFeedback,
    blip,
  }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
