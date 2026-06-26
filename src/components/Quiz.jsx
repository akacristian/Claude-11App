import { useCallback, useState } from 'react'
import { DISHES, PROFILES, ALLERGENS } from '../data/dishes.js'
import { rand, shuffle, pickDistinct, statusFor, ALLERGEN_LABEL } from '../lib/utils.js'
import { useGame } from '../hooks/useGameState.jsx'

function makeQuestion() {
  const types = ['desc', 'ingredient', 'allergy-flag', 'safe']
  const type = types[Math.floor(Math.random() * types.length)]

  if (type === 'desc') {
    const d = rand(DISHES)
    const opts = pickDistinct(DISHES, 3, (x) => x.id !== d.id).map((x) => x.name)
    opts.push(d.name)
    return {
      type,
      tag: 'Table Description',
      prompt: 'Which dish matches this table-side description?',
      sub: `“${d.desc}”`,
      options: shuffle(opts),
      answer: d.name,
      explain: `${d.name} — ${d.sec}.`,
    }
  }

  if (type === 'ingredient') {
    const d = rand(DISHES.filter((x) => x.process && x.process.length > 40))
    const snippet = d.process.length > 180 ? d.process.slice(0, 180) + '…' : d.process
    const opts = pickDistinct(DISHES, 3, (x) => x.id !== d.id).map((x) => x.name)
    opts.push(d.name)
    return {
      type,
      tag: 'Ingredients / Process',
      prompt: 'Which dish is prepared like this?',
      sub: `“${snippet}”`,
      options: shuffle(opts),
      answer: d.name,
      explain: `${d.name}.`,
    }
  }

  if (type === 'allergy-flag') {
    const cands = DISHES.filter((x) => Object.values(x.flags).some((v) => v === 'yes'))
    const d = rand(cands)
    const present = Object.keys(d.flags).filter((k) => d.flags[k] === 'yes')
    const correctKey = rand(present)
    const absent = ALLERGENS.map((a) => a.key).filter((k) => !d.flags[k])
    const distract = pickDistinct(absent, 3).map((k) => ALLERGEN_LABEL[k])
    const opts = [...distract, ALLERGEN_LABEL[correctKey]]
    return {
      type,
      tag: 'Allergies',
      prompt: `A guest asks about “${d.name}”. Which allergen must you flag (cannot be removed)?`,
      sub: '',
      options: shuffle(opts),
      answer: ALLERGEN_LABEL[correctKey],
      explain: `${d.name}: ${d.allergies}`,
    }
  }

  // safe-to-serve
  const profile = rand(PROFILES)
  const d = rand(DISHES)
  const st = statusFor(d, profile.keys)
  const map = {
    safe: 'Safe to serve as is',
    mod: 'Safe only with a modification',
    unsafe: 'Cannot be served',
  }
  return {
    type: 'safe',
    tag: 'Allergies',
    prompt: `Guest profile: ${profile.icon} ${profile.name}. Can you serve “${d.name}”?`,
    sub: '',
    options: shuffle(['Safe to serve as is', 'Safe only with a modification', 'Cannot be served']),
    answer: map[st],
    explain: `${d.name}: ${d.allergies}`,
  }
}

export default function Quiz() {
  const g = useGame()
  const [q, setQ] = useState(() => makeQuestion())
  const [picked, setPicked] = useState(null)
  const [session, setSession] = useState({ correct: 0, total: 0 })

  const next = useCallback(() => {
    setQ(makeQuestion())
    setPicked(null)
  }, [])

  function answer(opt) {
    if (picked) return
    setPicked(opt)
    const ok = opt === q.answer
    g.recordQuiz(ok)
    g.showFeedback(ok)
    setSession((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }))
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-500">
          Session:{' '}
          <span className="font-bold text-slate-800">
            {session.correct} / {session.total}
          </span>
        </div>
        <button
          onClick={next}
          className="ml-auto text-sm px-3 py-1.5 rounded-lg bg-slate-200 font-semibold"
        >
          Skip ↻
        </button>
      </div>

      <div className="mt-3 rounded-2xl bg-white shadow-sm border border-slate-100 p-5 animate-pop">
        <span className="text-[11px] font-bold uppercase tracking-wide text-sky-600">{q.tag}</span>
        <h3 className="font-bold text-slate-900 mt-1 leading-snug">{q.prompt}</h3>
        {q.sub && (
          <p className="text-sm text-slate-500 italic mt-2 border-l-2 border-slate-200 pl-3">
            {q.sub}
          </p>
        )}

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            let cls =
              'w-full text-left px-4 py-3 rounded-xl border border-slate-200 bg-white font-medium active:scale-[.99] transition hover:border-sky-300'
            if (picked) {
              if (opt === q.answer)
                cls =
                  'w-full text-left px-4 py-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 font-semibold'
              else if (opt === picked)
                cls =
                  'w-full text-left px-4 py-3 rounded-xl border-2 border-rose-500 bg-rose-50 font-semibold animate-shake'
              else
                cls =
                  'w-full text-left px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-400'
            }
            return (
              <button key={i} disabled={!!picked} onClick={() => answer(opt)} className={cls}>
                {opt}
              </button>
            )
          })}
        </div>

        {picked && (
          <>
            <div
              className={`mt-3 text-sm rounded-xl p-3 ${picked === q.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}
            >
              {picked === q.answer ? (
                <>
                  <b>✅ Correct!</b>{' '}
                </>
              ) : (
                <>
                  <b>❌ Not quite.</b> Answer: <b>{q.answer}</b>.{' '}
                </>
              )}
              <br />
              <span className="text-slate-600">{q.explain}</span>
            </div>
            <button
              onClick={next}
              className="mt-3 w-full py-3 rounded-xl bg-slate-900 text-white font-semibold"
            >
              Continue ›
            </button>
          </>
        )}
      </div>
    </div>
  )
}
