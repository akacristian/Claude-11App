import { useState } from 'react'
import { useGame } from '../hooks/useGameState.jsx'
import { levelInfo, AVATARS } from '../lib/utils.js'

// Shared avatar grid used by both the create form and the gate.
function AvatarPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {AVATARS.map((a) => (
        <button
          key={a}
          type="button"
          onClick={() => onChange(a)}
          className={`aspect-square rounded-xl text-2xl grid place-items-center border-2 transition ${
            value === a
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          {a}
        </button>
      ))}
    </div>
  )
}

function CreateForm({ onCreate, onCancel }) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(AVATARS[0])

  function submit(e) {
    e.preventDefault()
    onCreate(name, avatar)
    setName('')
    setAvatar(AVATARS[0])
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-xs font-semibold text-slate-500">Name</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="Your name"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-emerald-400"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500">Pick an avatar</label>
        <div className="mt-1">
          <AvatarPicker value={avatar} onChange={setAvatar} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 font-semibold text-slate-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-xl bg-emerald-500 py-2.5 font-bold text-white active:scale-95 transition"
        >
          {onCancel ? 'Add player' : "Let's go"}
        </button>
      </div>
    </form>
  )
}

// Full-screen first-run / no-profile gate.
export function ProfileGate() {
  const g = useGame()
  const hasUsers = g.users.length > 0
  const [adding, setAdding] = useState(!hasUsers)

  return (
    <div className="min-h-screen bg-slate-100 grid place-items-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white grid place-items-center font-black text-lg">
            11
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 leading-tight">Eleven Barrack</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Who&apos;s studying?</p>
          </div>
        </div>

        {hasUsers && !adding && (
          <div className="space-y-2">
            {g.users.map((u) => (
              <button
                key={u.id}
                onClick={() => g.switchUser(u.id)}
                className="w-full flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-emerald-300 active:scale-[.99] transition"
              >
                <span className="text-2xl">{u.avatar}</span>
                <span className="font-semibold text-slate-800">{u.name}</span>
                <span className="ml-auto text-slate-300 text-xl">›</span>
              </button>
            ))}
            <button
              onClick={() => setAdding(true)}
              className="w-full rounded-xl border-2 border-dashed border-slate-200 p-3 font-semibold text-slate-500 hover:border-emerald-300"
            >
              + New player
            </button>
          </div>
        )}

        {adding && (
          <CreateForm
            onCreate={(name, avatar) => g.createUser(name, avatar)}
            onCancel={hasUsers ? () => setAdding(false) : null}
          />
        )}
      </div>
    </div>
  )
}

// Modal switcher opened from the header.
export function ProfileMenu({ open, onClose }) {
  const g = useGame()
  const [adding, setAdding] = useState(false)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl bg-white p-5 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center mb-3">
          <h2 className="font-extrabold text-slate-900">{adding ? 'Add player' : 'Players'}</h2>
          <button onClick={onClose} className="ml-auto text-slate-400 text-xl px-2">
            ✕
          </button>
        </div>

        {adding ? (
          <CreateForm
            onCreate={(name, avatar) => {
              g.createUser(name, avatar)
              setAdding(false)
              onClose()
            }}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <div className="space-y-2">
            {g.users.map((u) => {
              const active = u.id === g.activeId
              return (
                <div
                  key={u.id}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${
                    active ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      g.switchUser(u.id)
                      onClose()
                    }}
                    className="flex items-center gap-3 flex-1 text-left min-w-0"
                  >
                    <span className="text-2xl">{u.avatar}</span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-slate-800 truncate">{u.name}</span>
                      <span className="block text-xs text-slate-500">
                        {active ? 'Active' : 'Tap to switch'}
                      </span>
                    </span>
                  </button>
                  {g.users.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${u.name} and their progress?`)) g.deleteUser(u.id)
                      }}
                      title="Delete player"
                      className="text-slate-300 hover:text-rose-500 px-1 text-lg shrink-0"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              )
            })}
            <button
              onClick={() => setAdding(true)}
              className="w-full rounded-xl border-2 border-dashed border-slate-200 p-3 font-semibold text-slate-500 hover:border-emerald-300"
            >
              + New player
            </button>

            <AccountSection />
          </div>
        )}
      </div>
    </div>
  )
}

// Cloud sync sign-in / status. Hidden entirely when Supabase isn't configured.
function AccountSection() {
  const g = useGame()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState(null)

  if (!g.cloud.enabled) return null

  async function send(e) {
    e.preventDefault()
    setErr(null)
    const { error } = await g.signIn(email)
    if (error) setErr(error)
    else setSent(true)
  }

  const statusLabel = {
    idle: '',
    syncing: 'Syncing…',
    synced: 'Synced ✓',
    error: 'Sync error',
  }[g.cloud.status]

  return (
    <div className="mt-4 border-t border-slate-100 pt-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-bold text-slate-700">☁️ Sync across devices</span>
        {g.cloud.signedIn && (
          <span className="ml-auto text-xs text-slate-400">{statusLabel}</span>
        )}
      </div>

      {g.cloud.signedIn ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 truncate">{g.cloud.email}</span>
          <button
            onClick={g.signOut}
            className="ml-auto text-xs font-semibold text-slate-500 underline shrink-0"
          >
            Sign out
          </button>
        </div>
      ) : sent ? (
        <p className="text-xs text-slate-500">
          Check <span className="font-semibold">{email}</span> for a login link, then open it on any
          device to sync your players.
        </p>
      ) : (
        <form onSubmit={send} className="space-y-2">
          <p className="text-xs text-slate-500">
            Enter your email to save your players to the cloud and load them on any device.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-white shrink-0"
            >
              Send link
            </button>
          </div>
          {err && <p className="text-xs text-rose-500">{err}</p>}
        </form>
      )}
    </div>
  )
}

// Small avatar button for the header that shows level + opens the menu.
export function ProfileButton({ onClick }) {
  const g = useGame()
  if (!g.activeUser) return null
  const li = levelInfo(g.xp)
  return (
    <button
      onClick={onClick}
      title="Switch player"
      className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 hover:bg-slate-100"
    >
      <span className="text-xl">{g.activeUser.avatar}</span>
      <span className="hidden sm:block text-left leading-tight">
        <span className="block text-xs font-bold text-slate-700 max-w-[80px] truncate">
          {g.activeUser.name}
        </span>
        <span className="block text-[10px] text-slate-400">Lv {li.lvl}</span>
      </span>
    </button>
  )
}
