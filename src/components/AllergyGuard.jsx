import { useCallback, useState } from 'react'
import { DISHES, SECTIONS, PROFILES, GUEST_NAMES } from '../data/dishes.js'
import { rand, statusFor, secChip, ALLERGEN_LABEL } from '../lib/utils.js'
import { useGame } from '../hooks/useGameState.jsx'
import FlagPills from './FlagPills.jsx'

function makeRound() {
  const profile = rand(PROFILES)
  const guest = rand(GUEST_NAMES)
  const dish = rand(DISHES)
  return { profile, guest, dish, status: statusFor(dish, profile.keys) }
}

export default function AllergyGuard() {
  const g = useGame()
  const [round, setRound] = useState(() => makeRound())
  const [decided, setDecided] = useState(null) // 'approve' | 'reject'

  const next = useCallback(() => { setRound(makeRound()); setDecided(null) }, [])

  const acc = g.stats.guardTotal ? Math.round((100 * g.stats.guardCorrect) / g.stats.guardTotal) : 0
  const { profile, guest, dish, status } = round

  function decide(act) {
    if (decided) return
    setDecided(act)
    const shouldApprove = status !== 'unsafe'
    const ok = (act === 'approve') === shouldApprove
    g.recordGuard(ok)
    g.showFeedback(ok)
  }

  const correct = decided ? ((decided === 'approve') === (status !== 'unsafe')) : false
  const triggers = profile.keys.filter((k) => dish.flags[k])
  const trigTxt = triggers.length
    ? triggers.map((k) => `${ALLERGEN_LABEL[k]}${dish.flags[k] === 'mod' ? ' (modifiable)' : ' (cannot remove)'}`).join(', ')
    : 'none of the guest’s restrictions are present'
  const verdict = status === 'unsafe' ? 'REJECT — cannot be served safely'
    : status === 'mod' ? 'APPROVE with a modification'
    : 'APPROVE — safe as is'

  return (
    <div>
      <div className="flex items-center text-sm text-slate-500">
        <span>Correct calls: <b className="text-slate-800">{g.stats.guardCorrect}/{g.stats.guardTotal}</b> · {acc}%</span>
        <span className="ml-auto">🔥 {g.streak}</span>
      </div>

      <div className="mt-3 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white p-4 shadow-lg animate-pop">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{profile.icon}</div>
          <div>
            <div className="text-xs uppercase tracking-wide text-white/80">Guest at the pass</div>
            <div className="font-bold text-lg leading-tight">{guest}</div>
            <div className="text-sm">Allergy / requirement: <b>{profile.name}</b></div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${secChip(dish.sec)}`}>{SECTIONS[dish.sec].emoji} {dish.sec}</span>
        <h3 className="text-xl font-extrabold text-slate-900 mt-2 leading-snug">{dish.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{dish.desc}</p>
        <div className="mt-3"><FlagPills dish={dish} /></div>
      </div>

      {!decided ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button onClick={() => decide('approve')} className="py-4 rounded-2xl bg-emerald-500 text-white font-bold text-lg active:scale-95 shadow">✓ Approve</button>
          <button onClick={() => decide('reject')} className="py-4 rounded-2xl bg-rose-500 text-white font-bold text-lg active:scale-95 shadow">✕ Reject</button>
        </div>
      ) : (
        <div className={`mt-4 rounded-2xl p-4 ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
          <div className={`font-bold ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>{correct ? '✅ Correct call!' : '❌ Wrong call.'}</div>
          <div className="text-sm mt-1 text-slate-700">Right answer: <b>{verdict}</b></div>
          <div className="text-sm mt-2 text-slate-600"><b>Why:</b> {trigTxt}.</div>
          <div className="text-sm mt-2 text-slate-600 border-t border-slate-200/70 pt-2"><b>Notes:</b> {dish.allergies}</div>
          <button onClick={next} className="mt-3 w-full py-3 rounded-xl bg-slate-900 text-white font-semibold">Next guest ›</button>
        </div>
      )}
    </div>
  )
}
