import { useMemo, useState } from 'react'
import { DISHES, SECTIONS } from '../data/dishes.js'
import { shuffle, secChip, GRADES } from '../lib/utils.js'
import { useGame } from '../hooks/useGameState.jsx'
import FlagPills from './FlagPills.jsx'
import Field from './Field.jsx'

// How many times a card enters one study pass, by its current level.
// Struggling cards ('again') repeat most; learned cards ('easy') least.
const WEIGHT = { new: 3, again: 4, hard: 3, okay: 2, easy: 1 }

// Build a study queue. Each "round" holds at most one copy of a card, so a
// card's repeats are spread across the pass rather than landing back-to-back.
function buildQueue(ids, levels) {
  const rounds = []
  for (const id of ids) {
    const w = WEIGHT[levels[id] || 'new'] ?? 1
    for (let r = 0; r < w; r++) (rounds[r] ||= []).push(id)
  }
  return rounds.flatMap((r) => shuffle(r))
}

const GRADE_BTN = {
  again: 'bg-rose-500',
  hard: 'bg-orange-500',
  okay: 'bg-sky-500',
  easy: 'bg-emerald-500',
}
const GRADE_LABEL = { again: 'Again', hard: 'Hard', okay: 'Okay', easy: 'Easy' }
const GRADE_HINT = { again: 'show often', hard: 'struggling', okay: 'almost', easy: 'learned' }

const LEVEL_BADGE = {
  again: { label: 'Again', cls: 'text-rose-600' },
  hard: { label: 'Hard', cls: 'text-orange-600' },
  okay: { label: 'Okay', cls: 'text-sky-600' },
  easy: { label: '✓ Mastered', cls: 'text-emerald-600' },
}

export default function Flashcards() {
  const g = useGame()
  const [filter, setFilter] = useState('all')
  const [queue, setQueue] = useState(() => buildQueue(DISHES.map((d) => d.id), g.levels))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const sections = ['all', ...Object.keys(SECTIONS)]

  const pool = useMemo(
    () => (filter === 'all' ? DISHES : DISHES.filter((d) => d.sec === filter)).map((d) => d.id),
    [filter]
  )

  // Live progress over the current pool (respects the section filter).
  const counts = useMemo(() => {
    let mastered = 0,
      studying = 0,
      fresh = 0
    for (const id of pool) {
      const l = g.levels[id]
      if (l === 'easy') mastered++
      else if (l) studying++
      else fresh++
    }
    return { mastered, studying, fresh, total: pool.length }
  }, [pool, g.levels])

  function applyFilter(f) {
    setFilter(f)
    const ids = (f === 'all' ? DISHES : DISHES.filter((d) => d.sec === f)).map((d) => d.id)
    setQueue(buildQueue(ids, g.levels))
    setIdx(0)
    setFlipped(false)
  }
  function doShuffle() {
    setQueue(buildQueue(pool, g.levels))
    setIdx(0)
    setFlipped(false)
  }
  function next() {
    setFlipped(false)
    if (idx + 1 < queue.length) setIdx(idx + 1)
    else {
      // Pass finished — rebuild with the latest levels.
      setQueue(buildQueue(pool, g.levels))
      setIdx(0)
    }
  }
  function prev() {
    setFlipped(false)
    setIdx((i) => Math.max(0, i - 1))
  }

  const dish = useMemo(() => DISHES.find((d) => d.id === queue[idx]), [queue, idx])
  if (!dish) return null

  function flip() {
    setFlipped((f) => {
      const nextFlip = !f
      if (nextFlip) {
        g.blip('flip')
        g.bumpFlashSeen()
      }
      return nextFlip
    })
  }

  function grade(gr) {
    g.gradeCard(dish.id, gr)
    g.showFeedback(gr === 'again' ? false : true)
    // Re-show struggling cards again soon within this pass.
    if (gr === 'again' || gr === 'hard') {
      const gap = gr === 'again' ? 3 : 6
      const id = dish.id
      setQueue((q) => {
        const nq = [...q]
        nq.splice(Math.min(nq.length, idx + gap), 0, id)
        return nq
      })
    }
    next()
  }

  const badge = LEVEL_BADGE[g.levels[dish.id]]

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={filter}
          onChange={(e) => applyFilter(e.target.value)}
          className="text-sm rounded-lg border-slate-200 border px-2 py-1.5 bg-white"
        >
          {sections.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All sections' : s}
            </option>
          ))}
        </select>
        <button
          onClick={doShuffle}
          className="text-sm px-3 py-1.5 rounded-lg bg-slate-200 font-semibold"
        >
          🔀 Shuffle
        </button>
        <span className="ml-auto text-sm text-slate-500 tabular-nums">
          {counts.mastered}/{counts.total} mastered
        </span>
      </div>

      {/* progress bar: mastered / studying / to study */}
      <ProgressBar counts={counts} />

      <div className="mt-4 card-3d animate-pop">
        <div
          className={`card-inner relative w-full ${flipped ? 'flipped' : ''}`}
          style={{ minHeight: '22rem' }}
          onClick={flip}
        >
          {/* FRONT */}
          <div className="card-face absolute inset-0 rounded-2xl bg-white shadow-lg border border-slate-100 p-6 flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${secChip(dish.sec)}`}>
                {SECTIONS[dish.sec].emoji} {dish.sec}
              </span>
              {badge && (
                <span className={`text-xs font-bold ml-auto ${badge.cls}`}>{badge.label}</span>
              )}
            </div>
            <div className="flex-1 grid place-items-center text-center px-2">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 leading-snug">
                  {dish.name}
                </div>
                <div className="mt-3 text-sm text-slate-400">Tap to reveal the notes</div>
              </div>
            </div>
            <FlagPills dish={dish} />
          </div>
          {/* BACK */}
          <div className="card-face card-back absolute inset-0 rounded-2xl bg-white shadow-lg border border-slate-100 p-5 overflow-y-auto">
            <div className="text-lg font-extrabold text-slate-900 mb-2">{dish.name}</div>
            <Field label="Table description" value={dish.desc} />
            <Field label="Process" value={dish.process} />
            <Field label="Allergies & replacements" value={dish.allergies} tone="rose" />
            <Field label="Mise en place" value={dish.mise} tone="slate" />
            <div className="mt-3">
              <FlagPills dish={dish} />
            </div>
          </div>
        </div>
      </div>

      {/* grade buttons — how well did you know it? */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {GRADES.map((gr) => (
          <button
            key={gr}
            onClick={() => grade(gr)}
            className={`py-2.5 rounded-xl text-white font-bold active:scale-95 transition ${GRADE_BTN[gr]}`}
          >
            <span className="block leading-tight">{GRADE_LABEL[gr]}</span>
            <span className="block text-[10px] font-medium opacity-80">{GRADE_HINT[gr]}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={prev}
          className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 font-semibold active:scale-95"
        >
          ‹ Prev
        </button>
        <button
          onClick={next}
          className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 font-semibold active:scale-95"
        >
          Skip ›
        </button>
      </div>
    </div>
  )
}

function ProgressBar({ counts }) {
  const { mastered, studying, fresh, total } = counts
  const pct = (n) => (total ? (100 * n) / total : 0)
  return (
    <div className="mt-3">
      <div className="flex h-3 rounded-full overflow-hidden bg-slate-200">
        <div className="bg-emerald-500" style={{ width: pct(mastered) + '%' }} />
        <div className="bg-amber-400" style={{ width: pct(studying) + '%' }} />
      </div>
      <div className="flex gap-3 mt-1.5 text-[11px] text-slate-500">
        <Legend color="bg-emerald-500" label="Mastered" value={mastered} />
        <Legend color="bg-amber-400" label="Studying" value={studying} />
        <Legend color="bg-slate-300" label="To study" value={fresh} />
      </div>
    </div>
  )
}

function Legend({ color, label, value }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {label} <span className="font-bold text-slate-700 tabular-nums">{value}</span>
    </span>
  )
}
