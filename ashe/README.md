# ASHE — Menu Trainer

A gamified, mobile-first training app for learning the **ASHE** restaurant menu
training & service manual. Built with **React + Vite + Tailwind CSS**. Cloned from
the Eleven Barrack Food Notes Trainer.

The menu — 27 dishes across 7 sections — is encoded as the game database, with each
dish's description, preparation & service notes, allergens/modifications, cutlery,
and a structured allergen matrix.

## Game modes

- **🃏 Flashcards** — spaced-repetition study deck (Again / Hard / Okay / Easy) with a
  weighted queue and Mastered / Studying / To study progress bar.
- **❓ Multiple Choice Quiz** — rotating questions on descriptions, preparation and
  allergen rules (including "can you serve this guest?" scenarios).
- **🛡️ Allergy Safe Guard** — a simulated guest arrives with a restriction (crustacean,
  shellfish, seafood, gluten, dairy, egg, peanut, tree nut, sesame, soy, coconut,
  allium, nightshade, pork, yeast). Approve or reject the dish.
- **📖 Menu Reference** — searchable notes with section + "safe for" dietary filters
  and at-a-glance allergen icons (fixed allergens left, can-modify right).

Multiple player profiles with independent progress, XP / levels / streaks — all in
`localStorage`, no backend.

## Allergen flag model

Each dish has a `flags` object in `src/data/dishes.js`:

- `'yes'` — allergen present and **cannot** be removed (unsafe)
- `'mod'` — can be made safe with a substitution/omission
- *absent* — not present (safe)

Flags derive only from the explicit **Allergens** lines and named ingredients in the
manual. If the source doesn't state it, it's left out.

## Getting started

```bash
npm install
npm run dev      # dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint
```

## Deploy

`vite.config.js` uses `base: './'` so the build works under any subpath.
`netlify.toml` is included (build → `dist/`, Node 20).
