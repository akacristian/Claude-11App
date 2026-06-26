import { useMemo, useState } from 'react'
import { DISHES, SECTIONS } from '../data/dishes.js'
import { secBar, ALLERGEN_LABEL } from '../lib/utils.js'
import FlagPills from './FlagPills.jsx'
import Field from './Field.jsx'

export default function MenuBrowser() {
  const [q, setQ] = useState('')
  const [sec, setSec] = useState('all')
  const [open, setOpen] = useState({})

  const sections = ['all', ...Object.keys(SECTIONS)]

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let items = DISHES.filter((d) => sec === 'all' || d.sec === sec)
    if (needle) {
      items = items.filter((d) => {
        const hay = (d.name + ' ' + d.desc + ' ' + d.process + ' ' + d.allergies + ' ' +
          Object.keys(d.flags).map((k) => ALLERGEN_LABEL[k]).join(' ')).toLowerCase()
        return hay.includes(needle)
      })
    }
    const g = {}
    items.forEach((d) => { (g[d.sec] = g[d.sec] || []).push(d) })
    return g
  }, [q, sec])

  const hasResults = Object.keys(groups).length > 0

  return (
    <div>
      <div className="sticky top-[140px] z-20 bg-slate-100 pb-2 -mx-1 px-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dishes, ingredients, allergens…"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm"
        />
        <div className="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setSec(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${s === sec ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
            >
              {s === 'all' ? 'All' : `${SECTIONS[s].emoji} ${s}`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {!hasResults && <div className="text-center text-slate-400 py-10">No dishes match “{q}”.</div>}
        {Object.keys(SECTIONS).filter((s) => groups[s]).map((s) => (
          <div key={s} className="pt-1">
            <div className="flex items-center gap-2 px-1 py-1">
              <span className={`w-1.5 h-5 rounded-full ${secBar(s)}`} />
              <h3 className="font-bold text-slate-700">{SECTIONS[s].emoji} {s}</h3>
              <span className="text-xs text-slate-400">{groups[s].length}</span>
            </div>
            {groups[s].map((d) => (
              <Row key={d.id} dish={d} open={!!open[d.id]} onToggle={() => setOpen((o) => ({ ...o, [d.id]: !o[d.id] }))} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Row({ dish, open, onToggle }) {
  return (
    <div className="rounded-xl bg-white border border-slate-100 shadow-sm mb-2 overflow-hidden">
      <button onClick={onToggle} className="w-full text-left px-4 py-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-slate-900 leading-snug">{dish.name}</div>
          <div className="text-xs text-slate-500 truncate">{dish.desc}</div>
        </div>
        <div className="text-slate-300 text-lg shrink-0">{open ? '▲' : '▼'}</div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100">
          <Field label="Table description" value={dish.desc} />
          <Field label="Process" value={dish.process} />
          <Field label="Allergies & replacements" value={dish.allergies} tone="rose" />
          <Field label="Mise en place" value={dish.mise} tone="slate" />
          <div className="mt-2"><FlagPills dish={dish} /></div>
        </div>
      )}
    </div>
  )
}
