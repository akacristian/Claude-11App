import { useState } from 'react'
import { useGame } from '../hooks/useGameState.jsx'
import { levelInfo } from '../lib/utils.js'
import { ProfileButton, ProfileMenu } from './Profiles.jsx'

export default function Header() {
  const g = useGame()
  const li = levelInfo(g.xp)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-stone-300/60">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pine-800 text-brass-200 grid place-items-center font-display font-semibold text-xl shrink-0">
            A
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-semibold text-lg leading-tight text-pine-900 tracking-tight">
              ASHE
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-stone-500 -mt-0.5">
              Menu Training Manual
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Stat icon="🔥" value={g.streak} label="streak" />
            <Stat icon="✦" value={g.xp} label="XP" />
            <button
              onClick={g.toggleMute}
              title="Toggle sound"
              className="w-9 h-9 grid place-items-center rounded-lg hover:bg-stone-100 text-lg"
            >
              {g.muted ? '🔇' : '🔊'}
            </button>
            <ProfileButton onClick={() => setMenuOpen(true)} />
          </div>
        </div>
        <ProfileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-bold text-pine-800 shrink-0">Lv {li.lvl}</span>
          <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brass-400 to-brass-600 transition-all duration-500"
              style={{ width: li.pct + '%' }}
            />
          </div>
          <span className="text-[10px] text-stone-400 shrink-0 tabular-nums">
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
        <span className="text-brass-600">{icon}</span>
        <span className="font-bold tabular-nums text-stone-800">{value}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wide text-stone-400">{label}</div>
    </div>
  )
}
