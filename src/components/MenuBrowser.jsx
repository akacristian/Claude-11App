import { useMemo, useState } from 'react'
import { DISHES, SECTIONS, ALLERGENS, PROFILES } from '../data/dishes.js'
import { secBar, ALLERGEN_LABEL } from '../lib/utils.js'
import FlagPills from './FlagPills.jsx'
import Field from './Field.jsx'

export default function MenuBrowser() {
  const [q, setQ] = useState('')
  const [sec, setSec] = useState('all')
  const [diets, setDiets] = useState([]) // selected PROFILES indices; guests can have several
  const [mode, setMode] = useState('without') // 'without' = safe dishes; 'contains' = dishes with the allergen
  const [open, setOpen] = useState({})

  const sections = ['all', ...Object.keys(SECTIONS)]

  const activeKeys = useMemo(() => [...new Set(diets.flatMap((i) => PROFILES[i].keys))], [diets])

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let items = DISHES.filter((d) => sec === 'all' || d.sec === sec)
    if (activeKeys.length) {
      items =
        mode === 'contains'
          ? // Dishes where any selected allergen is present at all ('yes' or 'mod').
            items.filter((d) => activeKeys.some((k) => d.flags[k]))
          : // Safe dishes: no 'yes' flags for any selected profile's keys.
            // Dishes with 'mod' flags are still included (safe with modification).
            items.filter((d) => activeKeys.every((k) => d.flags[k] !== 'yes'))
    }
    if (needle) {
      items = items.filter((d) => {
        const hay = (
          d.name +
          ' ' +
          d.desc +
          ' ' +
          d.process +
          ' ' +
          d.allergies +
          ' ' +
          Object.keys(d.flags)
            .map((k) => ALLERGEN_LABEL[k])
            .join(' ')
        ).toLowerCase()
        return hay.includes(needle)
      })
    }
    const g = {}
    items.forEach((d) => {
      ;(g[d.sec] = g[d.sec] || []).push(d)
    })
    return g
  }, [q, sec, activeKeys, mode])

  const hasResults = Object.keys(groups).length > 0

  return (
    <div>
      <div className="sticky top-[140px] z-20 bg-cream pb-2 -mx-1 px-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dishes, ingredients, allergens…"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-paper shadow-sm outline-none focus:border-brass-400"
        />
        <div className="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setSec(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${s === sec ? 'bg-pine-800 text-cream' : 'bg-paper border border-stone-200 text-stone-600'}`}
            >
              {s === 'all' ? 'All' : `${SECTIONS[s].emoji} ${s}`}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 mt-1.5 overflow-x-auto no-scrollbar">
          <div className="flex rounded-full overflow-hidden border border-stone-300 shrink-0">
            {[
              ['contains', 'Contains'],
              ['without', 'Does not contain'],
            ].map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${mode === m ? 'bg-pine-800 text-cream' : 'bg-paper text-stone-600'}`}
              >
                {label}
              </button>
            ))}
          </div>
          {PROFILES.map((p, i) => (
            <button
              key={p.name}
              onClick={() =>
                setDiets((ds) => (ds.includes(i) ? ds.filter((x) => x !== i) : [...ds, i]))
              }
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${diets.includes(i) ? 'bg-brass-600 text-white' : 'bg-paper border border-stone-200 text-stone-600'}`}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {!hasResults && (
          <div className="text-center text-stone-400 py-10">No dishes match “{q}”.</div>
        )}
        {Object.keys(SECTIONS)
          .filter((s) => groups[s])
          .map((s) => (
            <div key={s} className="pt-1">
              <div className="flex items-center gap-2 px-1 py-1">
                <span className={`w-1.5 h-5 rounded-full ${secBar(s)}`} />
                <h3 className="font-display font-semibold text-pine-900">
                  {SECTIONS[s].emoji} {s}
                </h3>
                <span className="text-xs text-stone-400">{groups[s].length}</span>
              </div>
              {groups[s].map((d) => (
                <Row
                  key={d.id}
                  dish={d}
                  open={!!open[d.id]}
                  onToggle={() => setOpen((o) => ({ ...o, [d.id]: !o[d.id] }))}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

function AllergenDots({ dish, filter }) {
  const dots = []
  for (const a of ALLERGENS) {
    const v = dish.flags[a.key]
    if (!v) continue
    if (filter === 'mod' && v !== 'mod') continue
    if (filter === 'yes' && v !== 'yes') continue
    dots.push(
      <span key={a.key} title={`${a.label}${v === 'mod' ? ' · can modify' : ''}`} className="text-sm leading-none">
        {a.icon}
      </span>
    )
  }
  return dots.length ? <div className="flex flex-wrap gap-0.5">{dots}</div> : null
}

function Row({ dish, open, onToggle }) {
  return (
    <div className="rounded-xl bg-paper border border-stone-200 shadow-sm mb-2 overflow-hidden">
      <button onClick={onToggle} className="w-full text-left px-4 py-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-pine-900 leading-snug">{dish.name}</div>
          <div className="text-xs text-stone-500 truncate">{dish.desc}</div>
          <AllergenDots dish={dish} filter="yes" />
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="text-brass-400 text-lg">{open ? '▲' : '▼'}</div>
          <AllergenDots dish={dish} filter="mod" />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-stone-100">
          <Field label="Table description" value={dish.desc} />
          <Field label="Process" value={dish.process} />
          <Field label="Allergies & replacements" value={dish.allergies} tone="rose" />
          <Field label="Mise en place" value={dish.mise} tone="slate" />
          <div className="mt-2">
            <FlagPills dish={dish} />
          </div>
        </div>
      )}
    </div>
  )
}
