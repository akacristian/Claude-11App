export default function Field({ label, value, tone }) {
  if (!value || value === '—') return null
  const c =
    tone === 'rose' ? 'text-rose-600' : tone === 'slate' ? 'text-stone-400' : 'text-brass-600'
  return (
    <div className="mb-2">
      <div className={`text-[11px] font-bold uppercase tracking-widest ${c}`}>{label}</div>
      <div className="text-sm text-stone-700 leading-snug">{value}</div>
    </div>
  )
}
