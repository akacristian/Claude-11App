import { useGame } from '../hooks/useGameState.jsx'
import { DISHES } from '../data/dishes.js'
import { levelInfo } from '../lib/utils.js'

export default function Home({ onNavigate }) {
  const g = useGame()
  const li = levelInfo(g.xp)
  const total = DISHES.length
  const known = Object.keys(g.known).length
  const acc = g.stats.quizTotal ? Math.round((100 * g.stats.quizCorrect) / g.stats.quizTotal) : 0
  const gacc = g.stats.guardTotal
    ? Math.round((100 * g.stats.guardCorrect) / g.stats.guardTotal)
    : 0

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-pine-800 text-cream p-6 shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -top-8 font-display text-[9rem] leading-none text-pine-700/60 select-none pointer-events-none">
          A
        </div>
        <p className="relative text-[11px] uppercase tracking-widest text-brass-200">
          Train your floor knowledge
        </p>
        <div className="relative flex items-end gap-4 mt-2">
          <div>
            <div className="font-display font-semibold text-5xl">Lv {li.lvl}</div>
            <div className="text-xs text-pine-100/80 mt-1">{g.xp} XP total</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold">🔥 {g.streak}</div>
            <div className="text-xs text-pine-100/80">best {g.bestStreak}</div>
          </div>
        </div>
        <div className="relative mt-4 h-2 rounded-full bg-pine-900/70 overflow-hidden">
          <div className="h-full bg-brass-400" style={{ width: li.pct + '%' }} />
        </div>
        <div className="relative text-[11px] text-pine-100/70 mt-1.5">
          {li.into}/{li.need} XP to next level
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Dishes mastered"
          value={`${known} / ${total}`}
          onClick={() => onNavigate('flash')}
        />
        <StatCard label="Quiz accuracy" value={`${acc}%`} onClick={() => onNavigate('quiz')} />
        <StatCard label="Allergy accuracy" value={`${gacc}%`} onClick={() => onNavigate('guard')} />
        <StatCard label="Menu items" value={total} onClick={() => onNavigate('browser')} />
      </div>

      <h2 className="font-display font-semibold text-lg text-pine-900 mt-2">Choose a mode</h2>
      <div className="space-y-3">
        <ModeCard
          onClick={() => onNavigate('flash')}
          icon="🃏"
          title="Flashcards"
          desc="Study every dish — description, preparation & service, allergens & cutlery. Flip, learn, mark as mastered."
        />
        <ModeCard
          onClick={() => onNavigate('quiz')}
          icon="❓"
          title="Multiple Choice Quiz"
          desc="Test yourself on descriptions, preparation and allergen rules with instant feedback."
        />
        <ModeCard
          onClick={() => onNavigate('guard')}
          icon="🛡️"
          title="Allergy Safe Guard"
          desc="A guest sits down with an allergy. Approve or reject each dish before it leaves the pass."
        />
        <ModeCard
          onClick={() => onNavigate('browser')}
          icon="📖"
          title="Menu Reference"
          desc="Searchable dictionary of the full training manual, grouped by section."
        />
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => {
            if (confirm('Reset all XP, streaks and mastered dishes?')) g.reset()
          }}
          className="text-xs text-stone-400 underline"
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}

function StatCard({ label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl bg-paper p-4 shadow-sm border border-stone-200 active:scale-95 transition"
    >
      <div className="font-display font-semibold text-3xl text-pine-900 leading-tight">
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wide text-stone-500 mt-1">{label}</div>
    </button>
  )
}

function ModeCard({ onClick, icon, title, desc }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl bg-paper p-4 shadow-sm border border-stone-200 flex gap-4 items-start active:scale-[.99] transition hover:border-brass-400"
    >
      <div className="w-12 h-12 shrink-0 rounded-lg bg-pine-50 border border-pine-100 grid place-items-center text-2xl">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-display font-semibold text-pine-900">{title}</div>
        <div className="text-sm text-stone-500 mt-0.5">{desc}</div>
      </div>
      <div className="ml-auto self-center text-brass-500 text-xl">›</div>
    </button>
  )
}
