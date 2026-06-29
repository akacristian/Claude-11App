import { useState } from 'react'
import { useGame } from '../hooks/useGameState.jsx'
import { levelInfo } from '../lib/utils.js'
import { ProfileButton, ProfileMenu } from './Profiles.jsx'

export default function Header() {
  const g = useGame()
  const li = levelInfo(g.xp)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white grid place-items-center font-black text-lg shrink-0">
            11
          </div>
          <div className="min-w-0">
            <h1 className="font-extrabold leading-tight text-slate-900">Eleven Barrack</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Food Notes Trainer · May 2026</p>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Stat icon="🔥" value={g.streak} label="streak" />
            <Stat icon="⭐" value={g.xp} label="XP" />
            <button
              onClick={g.toggleMute}
              title="Toggle sound"
              className="w-9 h-9 grid place-items-center rounded-lg hover:bg-slate-100 text-lg"
            >
              {g.muted ? '🔇' : '🔊'}
            </button>
            <ProfileButton onClick={() => setMenuOpen(true)} />
          </div>
        </div>
        <ProfileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 shrink-0">Lv {li.lvl}</span>
          <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
              style={{ width: li.pct + '%' }}
            />
          </div>
          <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
            {li.into}/{li.need}
          </span>
        </div>
      </div>
    </header>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className="text-right">
      <div className="flex items-center gap-1 justify-end">
        <span>{icon}</span>
        <span className="font-bold tabular-nums">{value}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  )
}
