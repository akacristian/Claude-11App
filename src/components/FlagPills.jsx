import { ALLERGENS } from '../data/dishes.js'

export default function FlagPills({ dish }) {
  const pills = []
  for (const a of ALLERGENS) {
    const v = dish.flags[a.key]
    if (!v) continue
    const cls = v === 'yes' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
    pills.push(
      <span key={a.key} className={`text-[11px] px-2 py-0.5 rounded-full ${cls}`}>
        {a.icon} {a.label}
        {v === 'mod' ? ' · can modify' : ''}
      </span>
    )
  }
  if (!pills.length) {
    pills.push(
      <span
        key="none"
        className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700"
      >
        ✓ no flagged allergens
      </span>
    )
  }
  return <div className="flex flex-wrap gap-1">{pills}</div>
}
