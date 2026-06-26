import { SECTIONS, ALLERGENS } from '../data/dishes.js'

export const ALLERGEN_LABEL = Object.fromEntries(ALLERGENS.map((a) => [a.key, a.label]))

export function rand(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export function shuffle(a) {
  const arr = a.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function pickDistinct(pool, n, pred = () => true) {
  const cand = shuffle(pool.filter(pred))
  const out = []
  const seen = new Set()
  for (const x of cand) {
    const key = typeof x === 'string' ? x : x.name
    if (seen.has(key)) continue
    seen.add(key)
    out.push(x)
    if (out.length >= n) break
  }
  return out
}

/** Verdict for a dish against a guest's restriction keys. */
export function statusFor(dish, keys) {
  let mod = false
  for (const k of keys) {
    if (dish.flags[k] === 'yes') return 'unsafe'
    if (dish.flags[k] === 'mod') mod = true
  }
  return mod ? 'mod' : 'safe'
}

/** XP curve: each level costs a little more than the last. */
export function levelInfo(xp) {
  let lvl = 1, need = 100, acc = 0
  while (xp >= acc + need) { acc += need; lvl++; need = 100 + (lvl - 1) * 40 }
  return { lvl, into: xp - acc, need, pct: Math.round(((xp - acc) / need) * 100) }
}

// ---- section colour helpers (class strings are safelisted in tailwind.config) ----
const CHIP = {
  amber: 'bg-amber-100 text-amber-800', orange: 'bg-orange-100 text-orange-800',
  lime: 'bg-lime-100 text-lime-800', yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800', rose: 'bg-rose-100 text-rose-800',
  purple: 'bg-purple-100 text-purple-800', red: 'bg-red-100 text-red-800',
  teal: 'bg-teal-100 text-teal-800', pink: 'bg-pink-100 text-pink-800',
  indigo: 'bg-indigo-100 text-indigo-800', cyan: 'bg-cyan-100 text-cyan-800',
  slate: 'bg-slate-100 text-slate-800',
}
const BAR = {
  amber: 'bg-amber-500', orange: 'bg-orange-500', lime: 'bg-lime-500', yellow: 'bg-yellow-500',
  green: 'bg-green-500', rose: 'bg-rose-500', purple: 'bg-purple-500', red: 'bg-red-500',
  teal: 'bg-teal-500', pink: 'bg-pink-500', indigo: 'bg-indigo-500', cyan: 'bg-cyan-500', slate: 'bg-slate-500',
}
export function secChip(sec) { return CHIP[SECTIONS[sec]?.color || 'slate'] }
export function secBar(sec) { return BAR[SECTIONS[sec]?.color || 'slate'] }
