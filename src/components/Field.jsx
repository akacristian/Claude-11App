export default function Field({ label, value, tone }) {
  if (!value || value === '—') return null
  const c =
    tone === 'rose' ? 'text-rose-600' : tone === 'slate' ? 'text-slate-400' : 'text-emerald-600'
  return (
    <div className="mb-2">
      <div className={`text-[11px] font-bold uppercase tracking-wide ${c}`}>{label}</div>
      <div className="text-sm text-slate-700 leading-snug">{value}</div>
    </div>
  )
}
