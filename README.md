# Eleven Barrack — Food Notes Trainer

A gamified, mobile-first training app for learning the **Eleven Barrack** restaurant
food notes (May 2026). Built with **React + Vite + Tailwind CSS**.

The full menu — 54 dishes across 12 sections — is encoded as the game database, with
each dish's table description, process, allergies/replacements, mise en place, and a
structured allergen matrix.

## Game modes

- **🃏 Flashcards** — study deck with flip cards, section filter, shuffle, and "mastered" tracking.
- **❓ Multiple Choice Quiz** — rotating questions on table descriptions, ingredients/process,
  and allergies (including "can you serve this guest?" scenarios) with instant feedback.
- **🛡️ Allergy Safe Guard** — a simulated guest arrives with a restriction
  (shellfish, seafood, coeliac/gluten, dairy, egg, nuts, sesame, alliums, nightshade,
  halal, alcohol). Approve or reject the dish; learn exactly which rule applied.
- **📖 Menu Reference** — searchable dictionary of the raw notes, grouped by section.

An **XP / level / streak** dashboard tracks progress (persisted in `localStorage`), with
audio blips and full-screen colour flashes for correct/incorrect answers.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html                 Vite entry
public/standalone.html      Zero-build single-file version (open directly in a browser)
src/
  main.jsx                  React entry + providers
  App.jsx                   Tab shell + feedback overlay
  index.css                 Tailwind directives + flip-card / scrollbar styles
  data/dishes.js            Menu database (dishes, sections, allergens, guest profiles)
  hooks/useGameState.jsx    XP / streak / stats state + localStorage persistence
  lib/
    utils.js                Game logic + section colour helpers + XP curve
    sound.js                WebAudio feedback blips
  components/
    Header.jsx              HUD (level, XP, streak, mute)
    Home.jsx                Dashboard + mode picker
    Flashcards.jsx          Study deck
    Quiz.jsx                Multiple-choice quiz + question generator
    AllergyGuard.jsx        Approve/reject simulation
    MenuBrowser.jsx         Searchable reference
    FlagPills.jsx, Field.jsx  Shared presentational pieces
```

## Data fidelity

Allergen flags follow the notes precisely with three states:

- **present / cannot be removed** (unsafe),
- **modifiable** (safe with a substitution or omission — e.g. AP Baguette dairy → olive oil),
- **absent** (safe).

The halal flag marks dishes that are *not* halal. No culinary details were invented;
flags derive from the explicit "Allergies – Replacements" notes and named ingredients.
