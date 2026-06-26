import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { beep } from '../lib/sound.js'

const SAVE_KEY = 'eb-trainer-v1'

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    known: {}, // dishId -> true
    stats: { flashSeen: 0, quizCorrect: 0, quizTotal: 0, guardCorrect: 0, guardTotal: 0 },
    muted: false,
  }
}

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY))
    if (s && typeof s === 'object') {
      const d = defaultState()
      return { ...d, ...s, stats: { ...d.stats, ...(s.stats || {}) }, known: s.known || {} }
    }
  } catch {
    /* ignore */
  }
  return defaultState()
}

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [data, setData] = useState(loadState)
  const [flash, setFlash] = useState(null) // 'good' | 'bad' | null

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data))
    } catch {
      /* ignore */
    }
  }, [data])

  const flashTimer = useRef(null)
  const showFeedback = useCallback((ok) => {
    setData((d) => {
      beep(ok ? 'good' : 'bad', d.muted)
      return d
    })
    setFlash(ok ? 'good' : 'bad')
    clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlash(null), 480)
  }, [])

  const blip = useCallback(
    (type) =>
      setData((d) => {
        beep(type, d.muted)
        return d
      }),
    []
  )

  const addXP = useCallback((n) => setData((d) => ({ ...d, xp: Math.max(0, d.xp + n) })), [])

  const bumpStreak = useCallback(
    (ok) =>
      setData((d) => {
        const streak = ok ? d.streak + 1 : 0
        return { ...d, streak, bestStreak: Math.max(d.bestStreak, streak) }
      }),
    []
  )

  const markKnown = useCallback(
    (id) =>
      setData((d) => {
        if (d.known[id]) return d
        return { ...d, known: { ...d.known, [id]: true }, xp: d.xp + 5 }
      }),
    []
  )

  const recordQuiz = useCallback(
    (ok) =>
      setData((d) => ({
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
    []
  )

  const recordGuard = useCallback(
    (ok) =>
      setData((d) => ({
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
    []
  )

  const bumpFlashSeen = useCallback(
    () => setData((d) => ({ ...d, stats: { ...d.stats, flashSeen: d.stats.flashSeen + 1 } })),
    []
  )

  const toggleMute = useCallback(() => setData((d) => ({ ...d, muted: !d.muted })), [])

  const reset = useCallback(() => setData(defaultState()), [])

  const value = {
    ...data,
    flash,
    addXP,
    bumpStreak,
    markKnown,
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
