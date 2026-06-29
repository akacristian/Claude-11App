# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A gamified, mobile-first web app for learning the "Eleven Barrack" restaurant food
notes (May 2026). It's a study tool with four modes: Flashcards, a multiple-choice
Quiz, an "Allergy Safe Guard" approve/reject simulation, and a searchable Menu
Reference. React + Vite + Tailwind. No backend; progress lives in `localStorage`.

## Commands

```bash
npm install        # install deps (the SessionStart hook runs this automatically on the web)
npm run dev        # dev server with hot reload (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint (flat config); keep it at zero warnings
npm run format     # Prettier-write all js/jsx/css/md/json
npm run format:check
```

There is **no test suite** yet. When verifying behavior, build and exercise the app
in a browser rather than relying on unit tests.

## Two copies of the app — keep them in mind

- `src/` + `index.html` is the real React/Vite app (the source of truth).
- `public/standalone.html` is a **separate, hand-written, zero-build single-file
  copy** of the whole app (inline data + CSS via Tailwind CDN + vanilla JS). It
  exists so non-technical users can double-click it with no install. It does **not**
  share code with `src/` — if you change app behavior or dish data in `src/`, the
  standalone file will drift unless you mirror the change there too. Don't assume
  editing one updates the other.

## Architecture

**Single data source.** `src/data/dishes.js` exports everything the game runs on:
`DISHES` (54 dishes), `SECTIONS` (12, each with a colour + emoji), `ALLERGENS`,
`PROFILES` (guest restriction profiles), and `GUEST_NAMES`. All four modes read from
these arrays; there is no API. The data was transcribed from the source Word document
"Food Notes May 2026."

**The allergen flag model is the core domain logic.** Each dish has a `flags` object
keyed by allergen. A value of:
- `'yes'` = present and **cannot** be removed (unsafe),
- `'mod'` = can be made safe with a substitution/omission,
- *absent* = not present (safe).

The `halal` flag is inverted: `'yes'` means the dish is **not** halal. `statusFor(dish, keys)`
in `src/lib/utils.js` collapses a set of allergen keys into `'safe' | 'mod' | 'unsafe'`
and is the shared brain behind both the Quiz "can you serve this?" questions and the
Allergy Guard verdicts. Changes to flags or to `statusFor` ripple into both modes and
into `FlagPills`.

**Data-fidelity rule (important for editing dish data):** flags and notes derive
*only* from the explicit "Allergies – Replacements" text and named ingredients in the
notes. Do not invent ingredient ratios, processes, or allergens. If the source doesn't
state it, leave it out. See `README.md` for the conventions.

**State.** `src/hooks/useGameState.jsx` is a React context (`GameProvider` + `useGame`)
holding XP, level, streak, per-mode stats, mastered dishes, and mute. It persists to
`localStorage` under key `eb-trainer-v1` via an effect. Components never touch storage
directly — they call `useGame()` actions (`recordQuiz`, `recordGuard`, `markKnown`,
`addXP`, `showFeedback`, etc.). XP/level math lives in `levelInfo()` in `lib/utils.js`.

**Feedback.** `showFeedback(ok)` triggers both a WebAudio blip (`lib/sound.js`) and a
full-screen colour flash (rendered in `App.jsx` from `g.flash`). No audio assets.

**Tab shell.** `App.jsx` switches between mode components by local state; `Header.jsx`
is the persistent HUD.

## Tailwind gotcha (will bite you)

Section colours are applied through runtime-built class strings. This only works
because the **full** class strings exist as literals somewhere Tailwind's content scan
can see them:
- `CHIP` / `BAR` maps in `src/lib/utils.js` hold complete strings like
  `'bg-amber-100 text-amber-800'`.
- Dynamic per-variant classes use literal lookup objects (e.g. `MODE_HOVER` in
  `Home.jsx`), **not** template interpolation like `` `hover:border-${color}-300` ``.

If you introduce a colour class via string interpolation, Tailwind will purge it and
the style silently disappears in the production build. Add new colours as full literal
strings or extend the lookup maps. Do **not** reintroduce a broad `safelist` regex in
`tailwind.config.js` — it previously bloated the CSS bundle from ~20 kB to ~1.1 MB.

## Build/deploy notes

- `vite.config.js` sets `base: './'` so the build works when hosted under a subpath
  (e.g. GitHub Pages project sites).
- `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`.
  The Pages environment only accepts deployments from the repository's **default
  branch**, so `main` must be the default for the deploy job to succeed.
- `.claude/hooks/session-start.sh` runs `npm install` on session start in the remote
  (web) environment only.
