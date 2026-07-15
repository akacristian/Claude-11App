# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A gamified, mobile-first web app for learning the ASHE restaurant menu training &
service manual. Four modes: Flashcards (spaced repetition), multiple-choice Quiz,
"Allergy Safe Guard" approve/reject simulation, and a searchable Menu Reference.
React + Vite + Tailwind. No backend; progress lives in `localStorage`. Cloned from
the Eleven Barrack trainer — same architecture, different data and branding.

## Commands

```bash
npm install
npm run dev        # dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview
npm run lint       # keep at zero warnings
npm run format
```

No test suite; verify by building and exercising the app in a browser.

## Architecture

**Single data source.** `src/data/dishes.js` exports `DISHES` (27 dishes),
`SECTIONS` (7), `ALLERGENS` (15 keys incl. crustacean/mollusc split, soy, coconut,
pork, yeast), `PROFILES`, and `GUEST_NAMES`. Data was transcribed from the ASHE
"Menu Training & Service Manual".

**Allergen flag model.** `flags[key]`: `'yes'` = present/cannot remove, `'mod'` =
removable/substitutable, absent = safe. `statusFor(dish, keys)` in `src/lib/utils.js`
collapses restriction keys into `'safe' | 'mod' | 'unsafe'` and drives the Quiz
serve-questions and Allergy Guard verdicts.

**Data-fidelity rule:** flags and notes derive only from the explicit Allergens
lines and named ingredients in the manual — never invent ingredients or allergens.

**Field mapping.** `desc` = table description; `process` = preparation & service
notes (incl. upsells and critical service directives); `allergies` = allergens &
modifications text; `mise` = cutlery.

**State.** `src/hooks/useGameState.jsx` persists a multi-profile store under
localStorage key `ashe-trainer-v1` (`{ activeId, users: [{ id, name, avatar,
state }] }`). Per-card spaced-repetition `levels` (`again|hard|okay|easy`), `known`
synced to `easy`, XP only on grade improvement.

## Tailwind gotcha

All colour classes must exist as full string literals (see `CHIP`/`BAR` maps in
`src/lib/utils.js` and the custom `pine`/`brass`/`cream`/`paper` palette in
`tailwind.config.js`). Never build class names via template interpolation — the
production build purges them silently.

## Design

Warm bistro identity: Fraunces serif display font, cream background, paper cards,
pine green + brass accents. The "A" monogram appears in Header, ProfileGate and the
Home hero.
