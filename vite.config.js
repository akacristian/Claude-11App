import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fields in src/data/dishes.js that hold private manual content (recipes,
// prep notes, prices). Portfolio builds scramble these at build time so
// the real text never reaches the published bundle; the UI then blurs them.
const PRIVATE_FIELDS = ['desc', 'process', 'allergies', 'mise']

// Deterministic letter/digit substitution that keeps word lengths, spacing and
// punctuation, so the blurred text still looks like real paragraphs.
function scramble(str, seed) {
  let s = seed
  const next = () => (s = (s * 1103515245 + 12345) & 0x7fffffff)
  return str.replace(/[A-Za-z0-9]/g, (ch) => {
    if (/[0-9]/.test(ch)) return String(next() % 10)
    const c = String.fromCharCode(97 + (next() % 26))
    return ch === ch.toUpperCase() ? c.toUpperCase() : c
  })
}

function redactDishes() {
  // Matches `field: '…'` or `field: "…"` (prettier switches quotes when the text has apostrophes).
  const field = new RegExp(
    `\\b(${PRIVATE_FIELDS.join('|')}):(\\s*)(['"])((?:(?!\\3)[^\\\\]|\\\\.)*)\\3`,
    'g'
  )
  return {
    name: 'redact-dishes',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/data/dishes.js')) return null
      let n = 0
      return code.replace(
        field,
        (_, key, ws, q, text) => `${key}:${ws}${q}${scramble(text, ++n * 7919)}${q}`
      )
    },
  }
}

// Relative base so the built app also works when opened from a static host subpath.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), mode === 'portfolio' && redactDishes()],
}))
