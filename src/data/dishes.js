/* Eleven Barrack — menu database
   Parsed verbatim from "Eleven Barrack Food Notes May 2026".
   flags: yes = present/cannot remove (UNSAFE); mod = removable/substitutable; (absent) = safe.
   halal flag: yes = NOT halal. */

export const SECTIONS = {
  Appetisers: { color: 'amber', emoji: '🦪' },
  Breads: { color: 'orange', emoji: '🥖' },
  Starters: { color: 'lime', emoji: '🥗' },
  Pasta: { color: 'yellow', emoji: '🍝' },
  Salads: { color: 'green', emoji: '🥬' },
  Mains: { color: 'rose', emoji: '🍽️' },
  'For the Table': { color: 'purple', emoji: '🍖' },
  'Steaks From the Grill': { color: 'red', emoji: '🥩' },
  Sides: { color: 'teal', emoji: '🍟' },
  Dessert: { color: 'pink', emoji: '🍰' },
  Cheese: { color: 'indigo', emoji: '🧀' },
  'Bar Menu': { color: 'cyan', emoji: '🍔' },
}

export const DISHES = [
  /* 1 */ {
    id: 1,
    sec: 'Appetisers',
    name: 'Appellation Oysters',
    desc: 'Sydney Rock Oysters [from Location] served with mignonette.',
    process:
      'Oysters are shucked to order and served on rock salt with lemon cheek and mignonette. Mignonette is made from Red Wine Vinegar, Sugar, and finished with eschalots, chives and black pepper.',
    allergies: 'Shellfish, Seafood. Alliums – in mignonette, can be removed.',
    mise: 'Oyster Fork – Waiter to place on table. Small silver spoon with mignonette.',
    flags: { shellfish: 'yes', fish: 'yes', alliums: 'mod' },
  },

  /* 2 */ {
    id: 2,
    sec: 'Appetisers',
    name: 'Fried Ricotta Dumplings (Cod Roe OR Baerri Caviar)',
    desc: 'Fried ricotta dumplings with whipped cod roe OR Baerri Caviar.',
    process:
      'Dumplings are made from ricotta, lemon zest, salt, baking powder and egg. Piped onto a spoon and deep fried to order. Once cooked they are seasoned with Kombu powder (dehydrated Taki Kombu) and served with either whipped cod roe or Baerri Caviar (if Caviar, also served with creme fraiche and chives garnish). Whipped Cod Roe is made from Salted Cod roe.',
    allergies:
      'Dairy (Ricotta, Creme Fraiche) cannot be modified. Contains egg. Contains Gluten. Seafood > leave the roe or caviar off. Fish > leave the roe or caviar off. Alliums: Chives > can be left off.',
    mise: 'Small spoon with roe.',
    flags: { gluten: 'yes', dairy: 'yes', egg: 'yes', fish: 'mod', alliums: 'mod' },
  },

  /* 3 */ {
    id: 3,
    sec: 'Appetisers',
    name: 'Pickled Oyster Mushroom Skewer',
    desc: 'Oyster mushroom skewer with sesame yoghurt and chilli crunch.',
    process:
      'Lightly pickled oyster mushrooms are glazed in pomegranate molasses and mushroom reduction then torched. Finished with sesame yoghurt, chilli crunch, tarragon and chives.',
    allergies: 'Chilli (can be removed but not advised as key element). Sesame, dairy, garlic.',
    mise: 'One serve = one skewer.',
    flags: { dairy: 'yes', sesame: 'yes', alliums: 'yes' },
  },

  /* 5 */ {
    id: 5,
    sec: 'Appetisers',
    name: 'Bluefin Tuna Crumpet, Horseradish Cream',
    desc: 'Tuna crumpet with horseradish cream and chives.',
    process:
      'Sourdough crumpet made from flour, yeast, water; layer of horseradish cream (sour cream, horseradish, Japanese mustard). Topped with raw diced tuna, dressed in white soy, olive oil, rice wine vinegar and sliced chives.',
    allergies:
      'Seafood. Alliums > No chives. Cannot be gluten free (crumpet + white soy). Dairy (horseradish cream) > can be left off for dairy.',
    mise: 'Knife.',
    flags: { fish: 'yes', gluten: 'yes', dairy: 'mod', alliums: 'mod' },
  },

  /* 6 */ {
    id: 6,
    sec: 'Appetisers',
    name: 'Choux au Craquelin, Duck Liver Parfait, Banyuls Jelly',
    desc: 'Choux au Craquelin with Duck Liver Parfait and Banyuls Jelly.',
    process:
      'The choux is piped into balls and baked with craquelin and a Banyuls Jelly is dotted on top.',
    allergies:
      'Contains gluten. Contains cooked-out alcohol in banyuls jelly on top and reduction for the parfait (banyuls can be omitted).',
    mise: 'Fork & spoon.',
    flags: { gluten: 'yes', alcohol: 'mod' },
  },

  /* 7 */ {
    id: 7,
    sec: 'Appetisers',
    name: 'Crisp Flathead Goujons, Tartare Sauce',
    desc: 'Snapper goujons served with oyster tartare.',
    process:
      'Snapper fillet is cut into bite-size pieces and fried in a tempura batter (rice flour, water, salt). Served with a sauce made from oysters, olive oil, garlic, capers, cornichons, chives.',
    allergies:
      'Can be Gluten free but not coeliac friendly (fried in same oils). Dipping sauce has alliums, seafood, garlic, oysters/shellfish – cannot modify.',
    mise: 'Dipping sauce cannot be modified.',
    flags: { shellfish: 'yes', fish: 'yes', gluten: 'mod', alliums: 'yes' },
  },

  /* 8 */ {
    id: 8,
    sec: 'Appetisers',
    name: '2GR Full-Blood Wagyu Bresaola – 50g',
    desc: 'Full-blood Wagyu Bresaola (currently only on bar menu).',
    process: 'Sliced thin Wagyu Bresaola.',
    allergies: 'Not halal.',
    mise: 'Fork and spoon.',
    flags: { halal: 'yes' },
  },

  /* 9 */ {
    id: 9,
    sec: 'Appetisers',
    name: 'Abrolhos Island Scallops, Mandarin Brown Butter',
    desc: 'Abrolhos Island Scallop, mandarin brown butter and coriander oil.',
    process:
      '2 portions per serve. Scallops are raw – sliced in half and placed on the bottom, seasoned with salt and umami vin (olive oil, rice wine vin, gluten free soy), covered with mandarin butter (mandarin juice, cayenne, brown butter, white balsamic and shiso soy), mandarin segments and persimmon discs, coriander oil, and fresh micro coriander garnish. Save the shells for re-use.',
    allergies:
      'Cannot be dairy free. Cannot be gluten free. Can be allium free. Contains champagne vinegar – check if guests avoiding alcohol though % is very minor.',
    mise: '2 portions per serve.',
    flags: { shellfish: 'yes', dairy: 'yes', gluten: 'yes', alliums: 'mod', alcohol: 'mod' },
  },

  /* 10 */ {
    id: 10,
    sec: 'Breads',
    name: 'AP Baguette, Cultured Butter',
    desc: 'AP Baguette, side of cultured butter.',
    process:
      'Sourdough baguette supplied by AP Bakery; served with cultured butter. 1 serve is 4 slices of bread between 2 pax.',
    allergies: 'Gluten > Gluten free bread. Dairy > swap of Olive Oil.',
    mise: 'Butter dish side.',
    flags: { gluten: 'mod', dairy: 'mod' },
  },

  /* 11 */ {
    id: 11,
    sec: 'Breads',
    name: 'Smoked Garlic and Herb Bread, Aged Cheddar',
    desc: 'Smoked garlic and herb bread with aged cheddar (one portion).',
    process:
      'Pull-apart milk loaf, toasted under salamander (with butter), cheese, gratinate (caramelising on the top).',
    allergies: 'Dairy, Garlic, Gluten. Cannot be modified.',
    mise: 'Waiter to set bread plates on the side.',
    flags: { dairy: 'yes', gluten: 'yes', alliums: 'yes' },
  },

  /* 12 */ {
    id: 12,
    sec: 'Breads',
    name: 'Sourdough Toast, Crab Butter, Parsley, Dill',
    desc: 'Crab toast with crab butter, topped with dill.',
    process:
      'AP sesame and fenugreek sourdough, toasted; pipe the soft crab butter on top (butter made from roasted crab stock, fennel, tomato, cayenne, eschalot, white soy, ginger). Garnished with parsley and dill.',
    allergies:
      "Can't be modified for gluten (white soy in stock). Sesame allergy cannot be modified. Shellfish, Nightshade, dairy (butter), alliums: eschalot (butter).",
    mise: 'None.',
    flags: {
      shellfish: 'yes',
      gluten: 'yes',
      dairy: 'yes',
      sesame: 'yes',
      alliums: 'yes',
      nightshade: 'yes',
    },
  },

  /* 13 */ {
    id: 13,
    sec: 'Starters',
    name: 'Jerusalem Artichoke Tart, Cavolo Nero, Hazelnut, Citrus Sabayon',
    desc: 'Roast Jerusalem artichoke tart, layered with cavolo nero, caramelised onion and a citrus sabayon sauce.',
    process:
      'Artichokes roasted then warmed with a verde (hazelnut, garlic, rappe, lemon juice), seasoned with salt, pepper, chives. Set in a brisée tart shell over caramelised onion. Pickled eschalots and a citrus sabayon (yuzu kosho, yuzu juice, egg) on top, seasoned with wakame powder. Rappe Verde contains: mint, herbs, hazelnut, ginger, garlic, eschalot, cime de rapa, white balsamic, pickled eschalots, citrus sabayon.',
    allergies:
      'Gluten – cannot be made gluten free. Dairy – cannot be made dairy free. Nuts – contains hazelnuts in the rappe verde. Eggs – the sabayon contains eggs. Capsaicin – contains peppers in the sabayon as yuzu kosho contains green chilli.',
    mise: 'Fork and spoon.',
    flags: {
      gluten: 'yes',
      dairy: 'yes',
      nuts: 'yes',
      egg: 'yes',
      alliums: 'yes',
      nightshade: 'yes',
    },
  },

  /* 14 */ {
    id: 14,
    sec: 'Starters',
    name: 'Ora King Salmon Parfait, Pickled Radish, Salmon Roe',
    desc: 'King Ora salmon parfait, served with pickled radish, salmon roe.',
    process:
      "Made with ora king salmon, cream, milk, garlic (can't omit), gf soy (in Thermomix). Jelly is rose jelly – alcohol burnt off in cooking. Served with pickled radish, salmon roe and a side of grilled bread. Fish is cooked to 65 deg, safe for pregnant people as not raw.",
    allergies:
      'Seafood + Fish. Contains Citrus. Not dairy free or allium free. Contains cooked-out alcohol – cannot omit. Coeliac okay, crackers to replace grilled sourdough.',
    mise: 'Knife.',
    flags: { fish: 'yes', gluten: 'mod', dairy: 'yes', alliums: 'yes', alcohol: 'yes' },
  },

  /* 15 */ {
    id: 15,
    sec: 'Starters',
    name: 'Raw Bluefin Tuna, Green Olive, Creme Fraiche',
    desc: 'Raw bluefin tuna, green olive, creme fraiche.',
    process:
      'On the bottom a green olive and plum salsa with confit eschalot mixed throughout (cannot take out the eschalots), a squiggle of creme fraiche seasoned with perilla shiso soy (smoked fish bones and perilla leaves). Tuna sliced and laid on top (lightly brined). Topped with pickled eschalot rings, more creme fraiche, and chives.',
    allergies:
      'Cannot modify for alliums. The shiso soy is not gluten free, so if gluten, swap for regular creme fraiche. Dairy – can be left off for the creme fraiche.',
    mise: 'Entrée fork.',
    flags: { fish: 'yes', gluten: 'mod', dairy: 'mod', alliums: 'yes' },
  },

  /* 16 */ {
    id: 16,
    sec: 'Starters',
    name: 'Wagyu Beef Tartare, Caramelised Mustard, Tarragon',
    desc: 'Wagyu beef tartare topped with caramelised mustard and tarragon.',
    process:
      'Diced beef seasoned with eschalots, hot sauce, Worcestershire, olive oil, parsley, tarragon, salt and pepper, placed inside a marrow bone. Caramelised mustard is a sabayon (contains egg, hot english, dijon), torched to caramelise, chives on top. Served with lavosh cracker on the side.',
    allergies:
      'Contains alliums – can be left out. Gluten – toasted baguette; gluten free bread available. Worcestershire contains anchovies – seafood allergy.',
    mise: 'Entrée fork and spoon. Gluten – swap the crackers out.',
    flags: { fish: 'yes', gluten: 'mod', egg: 'yes', alliums: 'mod' },
  },

  /* 17 */ {
    id: 17,
    sec: 'Starters',
    name: 'Duck, Pork and Pistachio Terrine',
    desc: 'Duck, pork and pistachio terrine with pickled prune puree.',
    process:
      'Terrine of duck breast, pork fat, chicken liver, pork mince and pistachio, plus brandy, garlic and black and white pepper. Cooked in a mould and jellied while hot (jelly contains white soy, salt and gelatin). Cut around 100g, served with pickled prune puree, white onion mustard, and mustard emulsion.',
    allergies:
      'Jelly has white soy – contains gluten, cannot be removed. Nuts cannot be removed. Alliums cannot be removed. Is dairy free. Not halal friendly. Not suitable for pregnant people.',
    mise: 'Knife.',
    flags: { gluten: 'yes', nuts: 'yes', alliums: 'yes', halal: 'yes', alcohol: 'yes' },
  },

  /* 18 */ {
    id: 18,
    sec: 'Pasta',
    name: 'Radiatori Stracciatella, Zucchini, Pea and Mint',
    desc: 'Radiatori with stracciatella, zucchini, pea shoots and mint.',
    process:
      'Zucchini, mint and basil blitzed into a paste as the sauce base; pasta tossed through, garnished with stracciatella, pea shoots, preserved lemon and pangrattato (breadcrumb garnish – breadcrumbs, nothing added).',
    allergies:
      'Gluten (substitute for vegan pasta) and no crumb. Contains alliums in the crumb. Pasta is egg free. Pasta shape is vegan friendly.',
    mise: 'Fork + spoon.',
    flags: { gluten: 'mod', dairy: 'yes', alliums: 'mod' },
  },

  /* 19 */ {
    id: 19,
    sec: 'Pasta',
    name: 'Mafaldine Pork and Prawn Bolognese',
    desc: 'Mafaldine pasta with pork and prawn bolognaise.',
    process:
      'A bolognese of pork mince, dried shrimp, onion, carrot, celery, kombu and tomato warmed with shellfish oil before chopped prawn meat is added. Mafaldine (long flat pasta with wavy edges) tossed through. Finished with sliced chives, parmesan cheese and cracked pepper.',
    allergies:
      'Shellfish/crustaceans, Egg (pasta), Pork, Nightshade, Alliums, Dairy, not Halal :: NO MODIFICATIONS. Dairy > leave off cheese.',
    mise: 'Fork + spoon. Core allergens cannot be modified.',
    flags: {
      shellfish: 'yes',
      gluten: 'yes',
      egg: 'yes',
      dairy: 'mod',
      alliums: 'yes',
      nightshade: 'yes',
      halal: 'yes',
    },
  },

  /* 20 */ {
    id: 20,
    sec: 'Pasta',
    name: 'Prawn Ravioli, Spanner Crab, Sauce Vierge',
    desc: 'Prawn Ravioli, Spanner crab, sauce vierge, hazelnuts, tomato.',
    process:
      'One larger square ravioli stuffed with prawn mousse, with mascarpone and chives in the mix. Sauce vierge made by roasting tomatoes, removing skins and blitzing with white wine vinegar, olive oil, salt, pepper; garnished with eschalot and herbs. Finished with spanner crab meat and tomatoes. Roasted hazelnuts sprinkled through.',
    allergies:
      'Egg, Gluten, Dairy, Allium, garlic, onion (sauce), nuts (hazelnuts). Can be made allium and nut free.',
    mise: 'Fork and spoon.',
    flags: {
      shellfish: 'yes',
      gluten: 'yes',
      dairy: 'yes',
      egg: 'yes',
      nuts: 'mod',
      alliums: 'mod',
      nightshade: 'yes',
    },
  },

  /* 21 */ {
    id: 21,
    sec: 'Pasta',
    name: 'Spaghetti, Balmain Bug, Prawn, Pippies, Crab Sauce',
    desc: 'Spaghetti with Balmain bug, prawn, pippies, and a crab sauce.',
    process:
      'Sauté shallots in oil, add seafood bisque (prawn shell, carrot, celery, white wine), backed out with tomato (sautéed in olive oil, thyme and garlic), cooked down, blended, steep lime leaves, strain. Add Moreton bay bug trim, shrimp, clams, butter, creme fraiche, tarragon. Garnished with chopped tarragon and shellfish oil.',
    allergies: 'Shellfish/crustacean, dairy, gluten, egg, nightshades, alliums, garlic.',
    mise: 'Fork + spoon.',
    flags: {
      shellfish: 'yes',
      gluten: 'yes',
      dairy: 'yes',
      egg: 'yes',
      alliums: 'yes',
      nightshade: 'yes',
    },
  },

  /* 22 */ {
    id: 22,
    sec: 'Salads',
    name: 'Roast Carrot and Wild Rice Salad, Toasted Almond',
    desc: 'Roast carrot and wild rice salad, toasted almond and watercress.',
    process:
      'Carrots foil-poached then grilled over coals. Toasted almond sauce on the base, carrots tossed in a carrot dressing (reduced carrot juice and spices), toasted almond, cooked wild rice and parsley. Topped with marinated carrot ribbons and watercress; extra carrot dressing and olive oil.',
    allergies: 'Nuts. Garlic and eschalots.',
    mise: 'Fork and spoon.',
    flags: { nuts: 'yes', alliums: 'yes' },
  },

  /* 23 */ {
    id: 23,
    sec: 'Salads',
    name: 'Pickled Kohlrabi, Granny Smith Apple, Parmesan, Hazelnut',
    desc: 'Kohlrabi salad, apple, parmesan and toasted hazelnut.',
    process:
      'Apple and pear sliced on the mandolin and marinated; kohlrabi diced; all lightly pickled in rice wine vinegar, mint, olive oil and maple syrup. Pear and apple on the base, topped with kohlrabi, dressed with a parmesan dressing (parmesan, dijon, olive oil) and an apple dressing (green tabasco, lemon juice, apple juice, rice wine vinegar). Finished with shaved parmesan, chives, toasted hazelnuts and grape must vinegar.',
    allergies:
      'Nuts – can be removed. Alliums – can be done allium free. Is gluten free. Can be dairy free without the parm and dressing but not recommended. Alcohol in the rice wine vinegar – check for halal guests.',
    mise: 'Fork and spoon.',
    flags: { nuts: 'mod', dairy: 'mod', alliums: 'mod', alcohol: 'mod', halal: 'mod' },
  },

  /* 24 */ {
    id: 24,
    sec: 'Salads',
    name: 'Roasted Beetroot, Pepita Crumb, Radicchio, Dill',
    desc: 'Pickled beetroots, dressed in a beetroot dressing with pepita puree on the bottom and radicchio leaves.',
    process:
      'Beetroot roasted then pickled (sherry vinegar and white balsamic vinegar based), cut into wedges. Served with a pepita puree on the bottom, dressing made from its pickling liquor, and dressed radicchio.',
    allergies:
      'Trace amounts of gluten in pepita puree. Vinegar across the entire dish (check for halal / if vinegar okay). Otherwise vegan and gluten free friendly (if traces okay).',
    mise: 'Fork and spoon.',
    flags: { gluten: 'yes', alcohol: 'mod', halal: 'mod' },
  },

  /* 25 */ {
    id: 25,
    sec: 'Salads',
    name: 'Marinated Tuna Salad, Strawberry, Heirloom Tomato (Set Menu)',
    desc: 'Marinated tuna salad, strawberry, heirloom tomato, basil.',
    process:
      'Strawberries and tomatoes sliced fresh, layered across the plate, tuna laid on top. Dressed with umami vin (olive oil, kombu extract, rice wine vinegar); dressing is tomato water (has garlic), fermented strawberry juice, coriander seed, olive oil and rice wine vinegar. Finished with basil.',
    allergies:
      'Seafood / Raw Fish. Alcohol (vinegar). Cannot be allium free because of the garlic. Gluten free.',
    mise: 'Fork and spoon.',
    flags: { fish: 'yes', alliums: 'yes', nightshade: 'yes', alcohol: 'yes', halal: 'mod' },
  },

  /* 26 */ {
    id: 26,
    sec: 'Salads',
    name: 'Glazed Chicken, Iceberg Lettuce, Radish, Herb Yoghurt',
    desc: 'Glazed chicken salad with lardons and charred corn.',
    process:
      'Bannockburn chicken breast brined then slow roasted at 120C, rested and glazed (sherry vinegar, honey, roasted capsicum), finished over coals. Salad base of lettuce, radish and cucumber. Herb yoghurt (tarragon, dill, rice wine vinegar). Croutons tossed through with basil; cured egg yolk microplaned over top, and chives.',
    allergies:
      'Dairy – can be omitted by using an alternate dressing/yoghurt. Allium – can be omitted, take chives off. Is gluten free – remove the breadcrumbs. Egg free – just remove the egg. Alcohol: small amounts in sherry vinegar. Nightshades in the chicken glaze (capsicum).',
    mise: 'Fork and spoon.',
    flags: {
      dairy: 'mod',
      alliums: 'mod',
      gluten: 'mod',
      egg: 'mod',
      nightshade: 'yes',
      alcohol: 'mod',
    },
  },

  /* 27 */ {
    id: 27,
    sec: 'Mains',
    name: 'Cauliflower, Cippolini Onions & Parmesan Gratin',
    desc: 'Cauliflower, hazelnut and parmesan gratin.',
    process:
      'Gratin of sliced cauliflower, roasted and caramelised in brown butter, parmesan and chives. Sauce of white soy, butter, roasted cauliflower and buttermilk + hazelnut oil. Topped with soft herbs and pickled eschalot.',
    allergies:
      'Can be nut free without the nut oil. Cannot be dairy free. Cannot be gluten free. Cannot be made allium free.',
    mise: 'Fork and spoon.',
    flags: { nuts: 'mod', dairy: 'yes', gluten: 'yes', alliums: 'yes' },
  },

  /* 28 */ {
    id: 28,
    sec: 'Mains',
    name: 'Steamed Goldband Snapper, Chive Butter Sauce, Trout Roe',
    desc: 'Steamed snapper with a chive butter sauce.',
    process:
      'Steamed with salt and olive oil (in bag), served with a chive butter sauce (beurre blanc) of butter, white balsamic vinegar, lemon juice, Mirin. Sauce underneath, fish on top. 180–200g. One portion not sliced.',
    allergies:
      'Dairy in sauce (sauce can be served on the side for DF). Alliums: sauce on side only. Can be gluten free. Mirin in the sauce > alcohol.',
    mise: 'Fork and spoon.',
    flags: { fish: 'yes', dairy: 'mod', alliums: 'mod', alcohol: 'mod' },
  },

  /* 29 */ {
    id: 29,
    sec: 'Mains',
    name: 'Spiced Tuna Steak, Pepper and Beaujolais Jus',
    desc: 'Spiced tuna loin steak served with a pepper and Beaujolais jus.',
    process:
      'Tuna loin coated with dijon mustard, black pepper, fennel seed, coriander seed, panko crumb, cumin. Cooked à la plancha; served with a red wine jus containing charred pimento peppers, cumin, paprika, wine, beef jus.',
    allergies:
      'Contains garlic, not Halal friendly. Beef in the jus – leave out for pescatarian. Nightshades – pimento peppers and paprika in jus. Contains gluten, alcohol.',
    mise: 'Fork, spoon.',
    flags: {
      fish: 'yes',
      alliums: 'yes',
      nightshade: 'yes',
      gluten: 'yes',
      alcohol: 'yes',
      halal: 'yes',
    },
  },

  /* 30 */ {
    id: 30,
    sec: 'Mains',
    name: 'Spanner Crab and Fish Pie, Shellfish Bisque',
    desc: 'Spanner crab and fish pie, served with a shellfish bisque.',
    process:
      'Baby spinach at the base of a pie mould, topped with picked spanner crab meat, cayenne, dijon and a crab veloute (milk, cream, butter, flour, crab stock), white fish folded through (typically hapuka). Covered with pastry (flour, salt, butter, eggs) and baked to order. Served on a shellfish bisque (shellfish stock, cream, tomato, saffron, onions, celery, carrot).',
    allergies:
      'Egg, Dairy, Shellfish, Allium, Gluten, seafood, nightshades, onion. None of the above can be altered.',
    mise: 'Fork, spoon. Lemon cheek served.',
    flags: {
      shellfish: 'yes',
      fish: 'yes',
      egg: 'yes',
      dairy: 'yes',
      alliums: 'yes',
      gluten: 'yes',
      nightshade: 'yes',
    },
  },

  /* 31 */ {
    id: 31,
    sec: 'For the Table',
    name: 'Grilled Eastern Rock Lobster, Shellfish Butter',
    desc: 'Grilled Eastern Rock Lobster, shellfish butter, tarragon, lime.',
    process:
      'Grilled with crab butter, finished with more crab butter and shellfish bisque. Served on the side: a rice dish (risotto) with chorizo and shellfish sauce, charred lemon and finger lime.',
    allergies: 'Cannot be made DF or GF.',
    mise: 'Fork, spoon and teaspoons for sauces.',
    flags: { shellfish: 'yes', dairy: 'yes', gluten: 'yes', halal: 'yes' },
  },

  /* 32 */ {
    id: 32,
    sec: 'For the Table',
    name: 'Coal Roasted Murray Cod, Fermented Red Pepper Butter',
    desc: 'Murray Cod with fermented red pepper butter and soft herbs.',
    process:
      'A piece of Murray Cod (approx 320g) dried then roasted over coals. Red peppers (capsicums) charred then peeled, blended with vinegars, red yuzu kosho and butter.',
    allergies: 'Nightshades, dairy (butter) cannot be done without.',
    mise: 'Fork, spoon.',
    flags: { fish: 'yes', nightshade: 'yes', dairy: 'yes' },
  },

  /* 33 */ {
    id: 33,
    sec: 'For the Table',
    name: 'Kurobuta Pork Tomahawk, Blood Plum Glaze',
    desc: 'Kurobuta tomahawk served with a blood plum glaze.',
    process:
      'Kurobuta pork coated with a glaze of blood plum, sherry vinegar; cooked over the coals, carved and served with red wine jus.',
    allergies:
      'Alliums – can be omitted by removing red wine jus. Alliums and gluten in pork glaze – there is also the pork glaze in the sauce.',
    mise: '—',
    flags: { halal: 'yes', alliums: 'yes', gluten: 'yes', alcohol: 'mod' },
  },

  /* 34 */ {
    id: 34,
    sec: 'For the Table',
    name: "800g O'Connor Whole Chateaubriand Roast, Bearnaise",
    desc: '800g whole chateaubriand with condiments. Present to the table; pour jus over beef. Silver serve plates: slice of beef per pax, each with turnip, carrots and English spinach. Bearnaise on the side; mustards on side.',
    process:
      'A whole chateaubriand (thickest part of a beef fillet) rolled and sous vide at 55C for 2 hours till rare, brought back to temperature and finished in a pan with butter, rolled over the coals. Served in a copper tray with red wine jus, roasted turnips, Dutch carrots, English spinach. Also served with bearnaise and mustards. 40 mins to prepare if ordered straight up. Cannot be cooked half-half a different temperature due to sous-vide.',
    allergies: 'Bearnaise – white wine, butter, egg yolks, tarragon (check eschalot).',
    mise: 'Condiment selection: hot english, dijon, wholegrain, bearnaise. Serves 4. Must be coursed on its own.',
    flags: { dairy: 'mod', egg: 'mod', alliums: 'mod', alcohol: 'mod' },
  },

  /* 35 */ {
    id: 35,
    sec: 'Steaks From the Grill',
    name: '200g Brooklyn Valley MS3+ Tenderloin (Pepper Sauce)',
    desc: 'Brooklyn Valley Tenderloin with a pepper sauce.',
    process:
      'Premium MBS 3+ free range grass fed beef exclusive to Haverick Meats, sourced from the Gippsland Region.',
    allergies: 'Sauce has dairy AND gluten – can be on the side. Sauce contains alliums.',
    mise: 'Steak knife to be set by waiter.',
    flags: { dairy: 'mod', gluten: 'mod', alliums: 'mod' },
  },

  /* 36 */ {
    id: 36,
    sec: 'Steaks From the Grill',
    name: "250g O'Connor Scotch Fillet",
    desc: "O'Connor scotch fillet [state cook temperature].",
    process:
      'Black Opal wagyu cattle raised on Tasmanian and Victorian pastures. Grass fed and finished on grain (minimum 380 days on grain).',
    allergies: 'Red wine jus can be on the side.',
    mise: 'Steak knife to be set by waiter.',
    flags: { alcohol: 'mod' },
  },

  /* 37 */ {
    id: 37,
    sec: 'Steaks From the Grill',
    name: "450g O'Connor Bone in Sirloin",
    desc: 'Kidman bone-in sirloin [state cook temperature].',
    process:
      'Bone-in New York strip (bone-in sirloin / porterhouse). More dry-aged than the other steak options. Kidman beef raised on QLD and NT land.',
    allergies: 'na.',
    mise: 'Steak knife to be set by waiter.',
    flags: {},
  },

  /* 38 */ {
    id: 38,
    sec: 'Steaks From the Grill',
    name: '750g Smoked Southern Ranges Short Rib',
    desc: 'Southern Ranges short rib, smoked, with salsa verde.',
    process:
      'Short rib salted and cooked 15 hours overnight at 77C, cooled, portioned and vac-packed with beef jus; water bathed till hot and finished on coals. Served with a green chilli salsa (green chillies, dill, parsley, basil, tarragon, olive oil) and red wine jus. Fully cooked through (suitable for pregnant). Southern Ranges is NSW.',
    allergies:
      'Chilli. Alliums – can be omitted by removing red wine jus. Rib is vac-sealed with jus containing small amounts of alliums and alcohol. Alcohol (red wine in jus) – leave off for no alcohol.',
    mise: '—',
    flags: { alliums: 'mod', alcohol: 'mod' },
  },

  /* 39 */ {
    id: 39,
    sec: 'Steaks From the Grill',
    name: '650g Riverine MB2 Ribeye',
    desc: 'Riverine Ribeye [state cook temperature]. Cannot be cooked half-half due to thickness and multiple muscle groups.',
    process: '—',
    allergies: 'na.',
    mise: 'Steak knife to be set by waiter.',
    flags: {},
  },

  /* 40 */ {
    id: 40,
    sec: 'Steaks From the Grill',
    name: 'F1 Westholme Wagyu T-Bone',
    desc: '800g F1 Wagyu T-Bone [state cook temperature].',
    process:
      'T-Bone (Fiorentina / Bistecca): sirloin on one side, t-bone in the middle, tenderloin on the other. F1 refers to genetics (Angus and Wagyu 50/50). Served with cafe de paris butter on top. Cannot be cooked half-half due to the shape of the cut.',
    allergies: 'Dairy – Cafe de Paris butter can be left off.',
    mise: 'Steak knife to be set by waiter.',
    flags: { dairy: 'mod' },
  },

  /* 41 */ {
    id: 41,
    sec: 'Sides',
    name: 'Grilled Broccolini, Sheeps Milk Feta, Hazelnuts',
    desc: "Grilled broccolini, with sheep's milk feta and hazelnut crumb.",
    process: 'Sherry vin, olive oil, hazelnuts, salt.',
    allergies: 'Nuts (omit the hazelnuts). Dairy (omit the feta).',
    mise: 'Fork and spoon.',
    flags: { nuts: 'mod', dairy: 'mod' },
  },

  /* 42 */ {
    id: 42,
    sec: 'Sides',
    name: 'Green Leaf Salad, Chardonnay Vinaigrette',
    desc: 'Green leaf salad with a Chardonnay dressing.',
    process:
      'Mixed leaves of red and green baby cos. Dressing of white balsamic, olive oil, salt, sugar.',
    allergies: '—',
    mise: 'Fork and spoon / or salad tongs.',
    flags: {},
  },

  /* 43 */ {
    id: 43,
    sec: 'Sides',
    name: 'Baked Andean Potato, Mustard, Pancetta, Sour Cream',
    desc: 'Baked Andean potato with mustard, pancetta and sour cream.',
    process:
      'Potatoes salt-baked, scooped out, mixed with pancetta, butter, cream, Dijon. Potato skin deep fried and filled with the pancetta mix. Topped with soft herbs.',
    allergies:
      'Pork, nightshades, dairy. Traces of gluten as fried in the same oils – check for coeliac. Uses gluten free soy. Cannot be modified for pork or dairy.',
    mise: 'Fork + Spoon.',
    flags: { halal: 'yes', nightshade: 'yes', dairy: 'yes', gluten: 'yes' },
  },

  /* 44 */ {
    id: 44,
    sec: 'Sides',
    name: 'Fries, Barrack Seasoning',
    desc: 'Hand-cut fries with barrack seasoning.',
    process:
      'Barrack seasoning is nutritional yeast, onion powder, garlic powder, salt, sugar. Side aioli.',
    allergies:
      'Seasoning cannot be allium free (unless you leave the seasoning off). Cannot be sugar free. Side of Aioli can be substituted for a different sauce. Fried in the same oils as gluten – check for coeliac. Seasoning can be left off.',
    mise: 'None.',
    flags: { alliums: 'mod', gluten: 'mod', egg: 'mod' },
  },

  /* 45 */ {
    id: 45,
    sec: 'Dessert',
    name: 'Red Mill Rum Baba, Vanilla Chantilly Cream',
    desc: 'Served tableside: red mill rum baba, with a drizzle of red mill rum, served with chantilly cream.',
    process:
      'Set a tray stand in front of the table; rum baba cake whole on a tray with cake knives, rum carafe, serving teaspoon and chalice of cream. Slice the baba, give a spiel about the red mill rum (distillery in Rozelle, made especially for 11B). Pour a small amount of rum (15–30ml); guests serve cream themselves.',
    allergies: 'Alcohol, cannot be removed.',
    mise: 'Tray stand, cake serving knife + spade, teaspoon for cream, plate for serving.',
    flags: { alcohol: 'yes', gluten: 'yes', dairy: 'yes' },
  },

  /* 46 */ {
    id: 46,
    sec: 'Dessert',
    name: 'Poached Rhubarb, Vanilla Custard, Hibiscus Granita',
    desc: 'Vanilla custard topped with poached rhubarb and hibiscus granita.',
    process:
      'Base of vanilla custard, topped with poached rhubarb, brown butter crumble, rhubarb sorbet (contains reduced white wine), shiso and rosella granita, and rhubarb gel. Topped with shiso leaf.',
    allergies:
      'Halal / Alcohol – remove the sorbet (add more granita). Dairy free – swap for coconut cream instead of vanilla custard. Gluten free – swap for vegan crumble. Can be vegan. Nut free.',
    mise: '—',
    flags: { alcohol: 'mod', dairy: 'mod', gluten: 'mod', halal: 'mod' },
  },

  /* 47 */ {
    id: 47,
    sec: 'Dessert',
    name: 'Red Velvet Cake, Blackberry Compote, Creme Fraiche',
    desc: 'Red velvet cake with blackberry sauce and creme fraiche.',
    process:
      'Vanilla sponge layered with lemon butter cream, finished with a glaze of raspberry and blackberry puree. Bottom layer is a hazelnut feuilletine. Served as a slice with creme fraiche and blackberry compote on the side.',
    allergies: 'Cannot be nut free. Cannot be gluten free. Cannot be dairy free. Cannot be vegan.',
    mise: 'Waiter to set up share plates and cutlery.',
    flags: { nuts: 'yes', gluten: 'yes', dairy: 'yes', egg: 'yes' },
  },

  /* 48 */ {
    id: 48,
    sec: 'Dessert',
    name: 'Ginger Glazed Key Lime Pie, Coconut Curd, Finger Lime',
    desc: 'Key lime pie with coconut curd and finger lime.',
    process:
      "A sweet tart shell flavoured with ginger and cinnamon, filled with condensed milk, lime juice, sugar and eggs, baked at 120°C until set and slightly wobbly. Topped with a ginger 'jelly' set with agar, piped with coconut whip (coconut cream, lime zest, sugar, vanilla) and fresh finger limes.",
    allergies:
      'Allergens: eggs, gluten, dairy and nuts (almonds). Is halal but cannot be substituted for other dietaries.',
    mise: 'Waiter to set up fork and spoon if not sharing.',
    flags: { egg: 'yes', gluten: 'yes', dairy: 'yes', nuts: 'yes' },
  },

  /* 49 */ {
    id: 49,
    sec: 'Cheese',
    name: 'Cheese Selection',
    desc: "Pyengana Cheddar (Cow's Milk, St Helens TAS); Riverine Blue (Buffalo Milk, Gippsland VIC); Le Dauphin double-cream cow's milk, Bourgogne France (currently off menu, substituted with Will Studd Camembert from Normandy).",
    process: 'All garnish: Lavosh, muscatel grapes, pear chutney.',
    allergies: 'Lavosh – contains gluten.',
    mise: 'Cheese knife to be set up by waiter.',
    flags: { dairy: 'yes', gluten: 'mod' },
  },

  /* 50 */ {
    id: 50,
    sec: 'Bar Menu',
    name: '2GR Wagyu Bresaola',
    desc: 'Wagyu Bresaola.',
    process: '50g sliced thin Wagyu Bresaola.',
    allergies: 'na. (Cured wagyu – not halal.)',
    mise: 'Fork, spoon.',
    flags: { halal: 'yes' },
  },

  /* 51 */ {
    id: 51,
    sec: 'Bar Menu',
    name: 'Swordfish Sandwich, Iceberg, Cheese, Oyster Tartare',
    desc: 'Swordfish sandwich.',
    process:
      'Crumbed swordfish (panko), hot dog bun, burger cheese (American) slice, pickled jalapeno and oyster tartare.',
    allergies:
      'Cornichon, eschalot, capers, chives (for the mayo). Swordfish (fish), oyster tartare (shellfish), bun & panko (gluten), cheese (dairy).',
    mise: '—',
    flags: {
      fish: 'yes',
      shellfish: 'yes',
      gluten: 'yes',
      dairy: 'yes',
      egg: 'yes',
      alliums: 'yes',
      nightshade: 'yes',
    },
  },

  /* 52 */ {
    id: 52,
    sec: 'Bar Menu',
    name: 'The Barrack Dog, Milk Bun, Mustard, Escabeche',
    desc: 'The barrack dog with escabeche.',
    process:
      'Seafood sausage (from ALC), hot dog bun, pickled veg (celery, carrot, onion and fennel), tabasco ketchup, red yuzu kosho, American mustard, burger cheese on top.',
    allergies:
      'Seafood sausage (seafood), bun (gluten), cheese (dairy), onion (alliums), tabasco ketchup & yuzu kosho (nightshade/chilli).',
    mise: '—',
    flags: { fish: 'yes', gluten: 'yes', dairy: 'yes', alliums: 'yes', nightshade: 'yes' },
  },

  /* 53 */ {
    id: 53,
    sec: 'Bar Menu',
    name: 'Wagyu Burger, Lettuce, Onion, Comte, Pickles',
    desc: 'Wagyu Burger.',
    process: 'Burger bun, lettuce, onion, comte cheese, tomato, pickles.',
    allergies: 'Bun (gluten), comte (dairy), onion (alliums), tomato/pickles (nightshade).',
    mise: '—',
    flags: { gluten: 'yes', dairy: 'yes', alliums: 'yes', nightshade: 'yes' },
  },

  /* 54 */ {
    id: 54,
    sec: 'Bar Menu',
    name: '250g Westholme Rump Cap',
    desc: 'Westholme rump cap, served [cooking temp, e.g. Med Rare].',
    process:
      'Westholme beef from the northern ranges of Australia (mid-QLD up to Darwin). Roughly 16 million acres of rangeland stewarded, guided by the natural ecosystem of northern Australia.',
    allergies: 'na.',
    mise: 'Steak knife to be set by waiter.',
    flags: {},
  },
]

/* allergen / restriction profiles */
export const ALLERGENS = [
  { key: 'shellfish', label: 'Shellfish', icon: '🦐' },
  { key: 'fish', label: 'Fish/Seafood', icon: '🐟' },
  { key: 'gluten', label: 'Gluten', icon: '🌾' },
  { key: 'dairy', label: 'Dairy', icon: '🥛' },
  { key: 'egg', label: 'Egg', icon: '🥚' },
  { key: 'nuts', label: 'Nuts', icon: '🥜' },
  { key: 'sesame', label: 'Sesame', icon: '⚪' },
  { key: 'alliums', label: 'Alliums', icon: '🧄' },
  { key: 'nightshade', label: 'Nightshade', icon: '🍅' },
  { key: 'halal', label: 'Not Halal', icon: '☪️' },
  { key: 'alcohol', label: 'Alcohol', icon: '🍷' },
]
export const ALLERGEN_LABEL = Object.fromEntries(ALLERGENS.map((a) => [a.key, a.label]))

/* guest restriction profiles for the Allergy Guard game */
export const PROFILES = [
  { name: 'Shellfish Allergy', keys: ['shellfish'], icon: '🦐' },
  { name: 'Seafood Allergy', keys: ['shellfish', 'fish'], icon: '🐟' },
  { name: 'Coeliac / Gluten', keys: ['gluten'], icon: '🌾' },
  { name: 'Dairy Free', keys: ['dairy'], icon: '🥛' },
  { name: 'Egg Allergy', keys: ['egg'], icon: '🥚' },
  { name: 'Nut Allergy', keys: ['nuts'], icon: '🥜' },
  { name: 'Sesame Allergy', keys: ['sesame'], icon: '⚪' },
  { name: 'Allium Free', keys: ['alliums'], icon: '🧄' },
  { name: 'Nightshade Allergy', keys: ['nightshade'], icon: '🍅' },
  { name: 'Halal', keys: ['halal', 'alcohol'], icon: '☪️' },
  { name: 'No Alcohol', keys: ['alcohol'], icon: '🍷' },
]
export const GUEST_NAMES = [
  'Mr Tan',
  'Ms Okafor',
  'The Lee party',
  'Table 12',
  'Dr Rossi',
  'Ms Nguyen',
  'The Patel family',
  'Mr Johansson',
  'Table 7',
  'Ms Garcia',
  'The Müller party',
  'Mr Abebe',
]
