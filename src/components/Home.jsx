import { useGame } from '../hooks/useGameState.jsx'
import { DISHES } from '../data/dishes.js'
import { levelInfo } from '../lib/utils.js'

export default function Home({ onNavigate }) {
  const g = useGame()
  const li = levelInfo(g.xp)
  const total = DISHES.length
  const known = Object.keys(g.known).length
  const acc = g.stats.quizTotal ? Math.round((100 * g.stats.quizCorrect) / g.stats.quizTotal) : 0
  const gacc = g.stats.guardTotal ? Math.round((100 * g.stats.guardCorrect) / g.stats.guardTotal) : 0

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-5 shadow-lg">
        <p className="text-sm text-slate-300">Welcome back — train your floor knowledge</p>
        <div className="flex items-end gap-4 mt-2">
          <div>
            <div className="text-4xl font-black">Lv {li.lvl}</div>
            <div className="text-xs text-slate-300">{g.xp} XP total</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold">🔥 {g.streak}</div>
            <div className="text-xs text-slate-300">best {g.bestStreak}</div>
          </div>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-emerald-400" style={{ width: li.pct + '%' }} />
        </div>
        <div className="text-[11px] text-slate-300 mt-1">{li.into}/{li.need} XP to next level</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="🃏" label="Dishes mastered" value={`${known} / ${total}`} onClick={() => onNavigate('flash')} />
        <StatCard icon="❓" label="Quiz accuracy" value={`${acc}%`} onClick={() => onNavigate('quiz')} />
        <StatCard icon="🛡️" label="Allergy accuracy" value={`${gacc}%`} onClick={() => onNavigate('guard')} />
        <StatCard icon="📖" label="Menu items" value={total} onClick={() => onNavigate('browser')} />
      </div>

      <h2 className="font-bold text-slate-700 mt-2">Choose a mode</h2>
      <div className="space-y-3">
        <ModeCard onClick={() => onNavigate('flash')} icon="🃏" title="Flashcards" color="emerald"
          desc="Study every dish — table description, process, allergies & mise en place. Flip, learn, mark as mastered." />
        <ModeCard onClick={() => onNavigate('quiz')} icon="❓" title="Multiple Choice Quiz" color="sky"
          desc="Test yourself on table descriptions, ingredients and allergy rules with instant feedback." />
        <ModeCard onClick={() => onNavigate('guard')} icon="🛡️" title="Allergy Safe Guard" color="rose"
          desc="A guest sits down with an allergy. Approve or reject each dish before it leaves the pass." />
        <ModeCard onClick={() => onNavigate('browser')} icon="📖" title="Menu Reference" color="violet"
          desc="Searchable dictionary of the full notes, grouped by section." />
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => { if (confirm('Reset all XP, streaks and mastered dishes?')) g.reset() }}
          className="text-xs text-slate-400 underline"
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, onClick }) {
  return (
    <button onClick={onClick} className="text-left rounded-xl bg-white p-3 shadow-sm border border-slate-100 active:scale-95 transition">
      <div className="text-xl">{icon}</div>
      <div className="text-2xl font-extrabold text-slate-900 leading-tight">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </button>
  )
}

const MODE_HOVER = {
  emerald: 'hover:border-emerald-300',
  sky: 'hover:border-sky-300',
  rose: 'hover:border-rose-300',
  violet: 'hover:border-violet-300',
}

function ModeCard({ onClick, icon, title, desc, color }) {
  return (
    <button onClick={onClick} className={`w-full text-left rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex gap-4 items-start active:scale-[.99] transition ${MODE_HOVER[color] || ''}`}>
      <div className="text-3xl">{icon}</div>
      <div className="min-w-0">
        <div className="font-bold text-slate-900">{title}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
      <div className="ml-auto self-center text-slate-300 text-xl">›</div>
    </button>
  )
}
