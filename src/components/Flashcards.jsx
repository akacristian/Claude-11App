import { useMemo, useState } from 'react'
import { DISHES, SECTIONS } from '../data/dishes.js'
import { shuffle, secChip } from '../lib/utils.js'
import { useGame } from '../hooks/useGameState.jsx'
import FlagPills from './FlagPills.jsx'
import Field from './Field.jsx'

export default function Flashcards() {
  const g = useGame()
  const [filter, setFilter] = useState('all')
  const [order, setOrder] = useState(() => DISHES.map((d) => d.id))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const sections = ['all', ...Object.keys(SECTIONS)]

  function applyFilter(f) {
    setFilter(f)
    const list = f === 'all' ? DISHES.map((d) => d.id) : DISHES.filter((d) => d.sec === f).map((d) => d.id)
    setOrder(list); setIdx(0); setFlipped(false)
  }
  function go(delta) {
    setIdx((i) => (i + delta + order.length) % order.length)
    setFlipped(false)
  }
  function doShuffle() { setOrder((o) => shuffle(o)); setIdx(0); setFlipped(false) }

  const dish = useMemo(() => DISHES.find((d) => d.id === order[idx]), [order, idx])
  if (!dish) return null

  function flip() {
    setFlipped((f) => {
      const next = !f
      if (next) { g.blip('flip'); g.bumpFlashSeen() }
      return next
    })
  }
  function master() {
    g.markKnown(dish.id)
    go(1)
  }

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <select value={filter} onChange={(e) => applyFilter(e.target.value)} className="text-sm rounded-lg border-slate-200 border px-2 py-1.5 bg-white">
          {sections.map((s) => <option key={s} value={s}>{s === 'all' ? 'All sections' : s}</option>)}
        </select>
        <button onClick={doShuffle} className="text-sm px-3 py-1.5 rounded-lg bg-slate-200 font-semibold">🔀 Shuffle</button>
        <span className="ml-auto text-sm text-slate-500 tabular-nums">{idx + 1} / {order.length}</span>
      </div>

      <div className="mt-4 card-3d animate-pop">
        <div className={`card-inner relative w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: '22rem' }} onClick={flip}>
          {/* FRONT */}
          <div className="card-face absolute inset-0 rounded-2xl bg-white shadow-lg border border-slate-100 p-6 flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${secChip(dish.sec)}`}>{SECTIONS[dish.sec].emoji} {dish.sec}</span>
              {g.known[dish.id] && <span className="text-xs font-bold text-emerald-600 ml-auto">✓ Mastered</span>}
            </div>
            <div className="flex-1 grid place-items-center text-center px-2">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 leading-snug">{dish.name}</div>
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
            <div className="mt-3"><FlagPills dish={dish} /></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button onClick={() => go(-1)} className="flex-1 py-3 rounded-xl bg-white border border-slate-200 font-semibold active:scale-95">‹ Prev</button>
        <button onClick={master} className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-semibold active:scale-95">✓ Mastered</button>
        <button onClick={() => go(1)} className="flex-1 py-3 rounded-xl bg-white border border-slate-200 font-semibold active:scale-95">Next ›</button>
      </div>
    </div>
  )
}
