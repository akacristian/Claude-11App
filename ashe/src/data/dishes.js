/* ASHE — menu database
   Parsed from the ASHE "Menu Training & Service Manual".
   flags: yes = present/cannot remove (UNSAFE); mod = removable/substitutable; (absent) = safe.
   Flags derive only from the explicit Allergens lines and named ingredients in the notes. */

export const SECTIONS = {
  'Bread & Snacks': { color: 'amber', emoji: '🥖' },
  'Small Plates': { color: 'orange', emoji: '🍲' },
  'Seafood & Raw Bar': { color: 'cyan', emoji: '🦪' },
  'Salads & Vegetables': { color: 'green', emoji: '🥗' },
  'Curries & Mains': { color: 'red', emoji: '🍛' },
  Sides: { color: 'yellow', emoji: '🍚' },
  Desserts: { color: 'pink', emoji: '🍨' },
}

export const DISHES = [
  /* 1 */ {
    id: 1,
    sec: 'Bread & Snacks',
    name: 'House Pickles',
    desc: 'Salted and rinsed carrot, kohlrabi and daikon radish over a creamy sesame curry paste, seasoned with native bush tomato and garnished with deep-fried soybeans.',
    process:
      'Pickled carrot, kohlrabi and daikon are served over a rich, creamy sesame curry paste base, heavily seasoned with native Australian bush tomato (earthy, subtle bitter-sour finish) and garnished with deep-fried soybeans for texture.',
    allergies: 'Sesame, Soy, Alliums, Nightshades (bush tomato), Coconut.',
    mise: 'No cutlery — finger food / shared snack.',
    flags: { sesame: 'yes', soy: 'yes', alliums: 'yes', nightshade: 'yes', coconut: 'yes' },
  },

  /* 2 */ {
    id: 2,
    sec: 'Bread & Snacks',
    name: 'Butter Laminated Sourdough (2 per serve)',
    desc: 'Three-day house sourdough laminated with cultured butter and fermented red rice, glazed with rice malt syrup, coconut sugar, sweet soy and coconut oil. Served with curry paste compound butter.',
    process:
      'Dough is developed over three days, laminated with cultured butter with fermented red rice rolled through the layers, and glazed with rice malt syrup, raw coconut sugar, sweet soy sauce and coconut oil. Accompanied by a curry paste compound butter cooked with Vegemite, sour cream and tamarind paste — salty, creamy, lightly sweet. Upsell: extra pieces $4.00 each.',
    allergies: 'Dairy, Gluten, Soy, Coconut, Yeast — STRICTLY NO MODIFICATIONS.',
    mise: 'Butter knife.',
    flags: { dairy: 'yes', gluten: 'yes', soy: 'yes', coconut: 'yes', yeast: 'yes' },
  },

  /* 3 */ {
    id: 3,
    sec: 'Bread & Snacks',
    name: 'Wood Fired Sesame Flatbread',
    desc: 'Sourdough flatbread pressed with toasted sesame, topped with burnt chilli sambal, smoked Laughing Cow cheese, LP’s mortadella and a shaved onion–coriander–shallot salad in Nahm Jim.',
    process:
      "Chef Khanh's pizza dough leavened with sourdough starter; toasted white sesame seeds pressed into the raw dough before hearth baking. Topped with smoky burnt chilli sambal (red chillies, white onion and garlic blistered in the clay oven, blitzed smooth, San Marzano tomatoes folded through), house-smoked Laughing Cow cheese and LP's mortadella. Dressed at service with shaved red onion, coriander and green shallots in Nahm Jim dressing.",
    allergies:
      'Gluten, Alliums, Nightshades — STRICTLY NO MODIFICATIONS. Dairy can be omitted on request (remove the cheese). Contains sesame (pressed into dough) and pork (mortadella).',
    mise: 'Service scissors for portioning tableside.',
    flags: {
      gluten: 'yes',
      alliums: 'yes',
      nightshade: 'yes',
      sesame: 'yes',
      pork: 'yes',
      dairy: 'mod',
    },
  },

  /* 4 */ {
    id: 4,
    sec: 'Bread & Snacks',
    name: 'Pate en Croute',
    desc: 'Signature charcuterie in the flavours of a grilled pork Bánh Mì: Char Siu pork jowl, Vietnamese pork loaf, black fungus, grilled onion and liver pâté core, with pickles and egg mayo.',
    process:
      'Adaptation from Aru capturing a street-style Grilled Pork Bánh Mì. Layers of grilled Char Siu pork jowl, dense Vietnamese pork loaf, rehydrated black fungus, grilled sweet onions, black pepper and coriander stalks around a smooth liver pâté core; 48-hour cold set. Served with shredded pickled carrot and daikon, cucumber matchsticks, coriander leaves, bird’s eye chillies and house egg mayonnaise.',
    allergies: 'Gluten, Allium, Pork, Egg, Soy — STRICTLY NO MODIFICATIONS.',
    mise: 'Side knife.',
    flags: { gluten: 'yes', alliums: 'yes', pork: 'yes', egg: 'yes', soy: 'yes' },
  },

  /* 5 */ {
    id: 5,
    sec: 'Small Plates',
    name: 'Pho-Spiced Beef Tendon',
    desc: 'Puffed pho-spiced tendon crisp draped over torched raw marble score 9+ beef girello, brushed with fish sauce–lemon–garlic glaze, with Sriracha cocktail onions, Thai basil and hoisin.',
    process:
      '12-hour slow-cooked tendons (kombu + pho aromatics: black pepper, star anise, cassia, black cardamom) pressed, frozen, mandoline-sliced, dehydrated and deep-fried into an airy crisp. Draped over raw marble score 9+ Eye of Round flash-kissed with a blowtorch, brushed with a fish sauce, lemon juice and garlic paste glaze, garnished with Sriracha-spiked pickled cocktail onion rings, Thai basil and hoisin ribbons.',
    allergies:
      'Fish Sauce, Alliums — pickled cocktail onion garnish can be omitted, but the garlic paste in the meat glaze CANNOT be removed.',
    mise: 'No cutlery — single-bite snack.',
    flags: { fish: 'yes', alliums: 'yes' },
  },

  /* 6 */ {
    id: 6,
    sec: 'Small Plates',
    name: 'Fried Oxtail Dumpling (3 per serve)',
    desc: 'Crisp empanada-style dumplings of overnight-braised oxtail in aromatic curry, served in a split roasted smoked bone marrow; guests spoon marrow on top, with fermented chilli paste.',
    process:
      'Oxtail is braised overnight in a concentrated curry reduction (house curry paste, coconut cream, palm sugar, warm spices), hand-crimped into crescent dumplings and deep-fried crisp. Presented resting in a split, slow-roasted, lightly smoked beef bone marrow casing — guests scoop the marrow over the dumpling and finish with fermented red chilli paste on the side. Upsell: extra pieces $7.00 each.',
    allergies:
      'Gluten (in the pastry AND the fermented chilli paste), Allium (curry paste base), Coconut — STRICTLY NO MODIFICATIONS.',
    mise: 'Teaspoon for extracting marrow.',
    flags: { gluten: 'yes', alliums: 'yes', coconut: 'yes' },
  },

  /* 7 */ {
    id: 7,
    sec: 'Small Plates',
    name: 'Chicken & Prawn Sausage (individual serve)',
    desc: 'Thai-style chicken and prawn sausage in a butter-fried mini milk-bread bun, glazed with tamarind–sweet chilli jam and topped with a micro herb salad and fried shallots.',
    process:
      "House sausage of ground chicken thigh, chopped prawns, red curry paste, glutinous sticky rice, spring onion, coriander and lime leaf (same preparation model as King Clarence's fish finger bao). Served hot-dog style in a mini milk-bread bun pan-fried in butter, glazed with tamarind and sweet chilli jam (caramelised red onion, pickled chillies, tamarind pulp), finished with sawtooth coriander, Vietnamese mint, chives and fried shallot flakes.",
    allergies:
      'Allium (can be modified — omit fresh chives and raw shallot topping), Coconut, Crustacean, Fish Sauce, Dairy, Gluten (milk bread bun).',
    mise: 'Side knife if guests split or share portions.',
    flags: {
      alliums: 'mod',
      coconut: 'yes',
      crustacean: 'yes',
      fish: 'yes',
      dairy: 'yes',
      gluten: 'yes',
    },
  },

  /* 8 */ {
    id: 8,
    sec: 'Seafood & Raw Bar',
    name: 'Shellfish Plate (serves 2 — $72)',
    desc: 'Four-part seafood installation: Sydney Rock oysters in coconut vinaigrette, raw Abrolhos scallop with Char Siu pork jowl, Vietnamese-Cajun pickled mussels, and Yamba pippies in sate.',
    process:
      'Oysters: chilled, coconut vinaigrette (coconut cream, fish sauce, rice wine vinegar, orange curry oil), pickled shallots and sea succulents — also à la carte at $7.50 each. Scallop: shaved cold, crisp Char Siu pork jowl, green Nahm Jim (jalapeño, garlic, coriander root, desert lime, fish sauce, palm sugar). Mussels: flashed open, pickled in kumquat juice, white balsamic, fish sauce and pickled chilli; piped Vietnamese-Cajun compound butter (ghee base) and Bánh Mì pangrattato. Pippies: flash-warm in Vietnamese sate (lemongrass, chilli, onion, oyster sauce, tamarind water, blood lime), crushed toasted peanuts.',
    allergies:
      'Mollusc, Gluten, Coconut, Fish Sauce, Nightshade, Alliums, Pork, Sesame, Dairy, Egg, Peanuts. Consult the master kitchen grid for specific component removals.',
    mise: 'No cutlery by default; set an individual oyster fork per guest.',
    flags: {
      mollusc: 'yes',
      gluten: 'yes',
      coconut: 'yes',
      fish: 'yes',
      nightshade: 'yes',
      alliums: 'yes',
      pork: 'yes',
      sesame: 'yes',
      dairy: 'yes',
      egg: 'yes',
      peanut: 'yes',
    },
  },

  /* 9 */ {
    id: 9,
    sec: 'Seafood & Raw Bar',
    name: 'Torched Flametail Snapper',
    desc: 'Paper-thin torched snapper over fire-roasted crushed tomatoes with rice paddy herb, dressed in lemon pepper vinaigrette split with Makrut lime leaf oil.',
    process:
      'Local Flametail Snapper sliced sashimi-thin and briefly torched. Base of wood-fire-roasted vine tomatoes, crushed and dressed with rice paddy herb (Ngò Ôm), chives and coriander stalks. Dressed with lemon pepper vinaigrette (lemon juice, lemon aspen pulp, palm sugar, fish sauce, fermented red chilli) split with Makrut lime leaf oil; cracked black pepper to finish.',
    allergies:
      'Alliums (garnish can be omitted; trace garlic remains in dressing), Fish Sauce, Sesame, Gluten (trace from standard brewed soy), Nightshades (can be modified — remove the fire-roasted tomato base).',
    mise: 'Dessert fork + dessert spoon.',
    flags: { alliums: 'yes', fish: 'yes', sesame: 'yes', gluten: 'yes', nightshade: 'mod' },
  },

  /* 10 */ {
    id: 10,
    sec: 'Seafood & Raw Bar',
    name: "Chilled Spanner Crab 'Hor Mok'",
    desc: 'Cold crab custard (crab stock, coconut milk, cream, red curry, oyster sauce, tamarind) topped with Spanner Crab, finger lime and lemongrass coconut cream; crab crackers and sesame rice paper.',
    process:
      'Modern cold take on Hor Mok: silky custard of reduced blue swimmer crab stock, coconut milk, dairy cream, red curry paste, oyster sauce and tamarind, set with agar-agar. Topped with hand-picked Spanner Crab, finger lime, chives and lime zest, piped with lemongrass-infused coconut cream. Sits on a PRESENTATION-ONLY banana leaf — must not be eaten. Served with fried red crab crackers and puffed sesame rice paper. CRITICAL: the sesame rice paper is gluten-free; the red crab crackers CONTAIN gluten.',
    allergies:
      'Crustacean, Coconut, Mollusc, Allium (garnish modifiable, core curry base CANNOT be removed), Gluten (only in fried crab crackers — substitute extra rice paper), Sesame (bound to rice paper), Dairy (cream in custard).',
    mise: 'Dessert fork + dessert spoon.',
    flags: {
      crustacean: 'yes',
      coconut: 'yes',
      mollusc: 'yes',
      alliums: 'yes',
      gluten: 'mod',
      sesame: 'yes',
      dairy: 'yes',
    },
  },

  /* 11 */ {
    id: 11,
    sec: 'Seafood & Raw Bar',
    name: 'Chargrilled Cuttlefish Sour Orange Curry',
    desc: 'Fire-seared cuttlefish “noodles” in squid ink sambal with pickled torch ginger flower and leek, in a hot sour orange curry broth with five pippies and sea blight.',
    process:
      'Cuttlefish shaved into noodle-like strands, seared over hardwood embers and dressed in jet-black squid ink sambal (curry paste, dried chillies, shrimp paste, squid ink). Tossed with pickled pink torch ginger flower and julienned leek. Orange curry broth of roasted prawn shell stock, curry paste, orange juice, fish sauce and tamarind, boiled with 5 fresh pippies at plating. Presentation banana blossom leaf at the base; garnished with sea blight leaves. Torch ginger flower: zesty, citrusy, aromatic Southeast Asian floral.',
    allergies: 'Shellfish (prawn stock, shrimp paste), Allium, Fish Sauce, Mollusc.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { crustacean: 'yes', alliums: 'yes', fish: 'yes', mollusc: 'yes' },
  },

  /* 12 */ {
    id: 12,
    sec: 'Salads & Vegetables',
    name: 'Chicken Crackling Noodles',
    desc: 'Egg noodles glazed in seafood XO (dried scallop, dried prawn, smoked salmon), topped with pickled green garlic, crisp chicken crackling, vinegar batter crumbs, sesame and chilli.',
    process:
      'House XO replaces pork bacon with dried sea scallops, dried prawns and house-smoked Atlantic salmon, simmered with heavy ratios of shallot and garlic, emulsified with master chicken stock, oyster sauce and dark soy. Fresh yellow egg noodles wok-tossed in the reduction, topped with pickled green garlic shoots, golden chicken crackling shards, vinegar-powder batter crumbs, black and white sesame and chilli powder.',
    allergies:
      'Gluten, Egg, Shellfish (dried prawn, dried scallop, oyster sauce), Alliums, Sesame. Can be modified by omitting the crispy chicken skin crackling/crumb mixture. Contains fish (smoked salmon) and soy.',
    mise: 'Dessert fork + dessert spoon.',
    flags: {
      gluten: 'yes',
      egg: 'yes',
      crustacean: 'yes',
      mollusc: 'yes',
      fish: 'yes',
      alliums: 'yes',
      soy: 'yes',
      sesame: 'mod',
    },
  },

  /* 13 */ {
    id: 13,
    sec: 'Salads & Vegetables',
    name: 'Crispy Rice Salad',
    desc: 'Deep-fried jasmine rice balls broken tableside, ringed with coconut-marinated Deep Sea Perch, pineapple, herbs, betel leaf and peanuts, with gandong sambal and Mắm Nêm dressing.',
    process:
      'Jasmine rice seasoned with coconut oil, shallots, spring onion and coriander root, compressed and deep-fried until crunchy, broken open at the table. Ringed with Deep Sea Perch marinated in coconut milk, pineapple juice and fish sauce; fresh pineapple; raw shallot; lemongrass; Makrut lime leaf; two mints; fried shallots; wild betel leaf; roasted peanuts. Crowned with gandong sambal and a fermented anchovy (Mắm Nêm) dressing. SERVICE: waitstaff must aggressively toss all components tableside.',
    allergies:
      'Alliums (cooked), Peanuts (can be omitted), Fish (perch/anchovy — can be omitted), Crustaceans (shrimp paste in sambal — can be omitted), Nightshades. Contains coconut (oil + milk).',
    mise: 'Dessert fork + dessert spoon.',
    flags: {
      alliums: 'yes',
      peanut: 'mod',
      fish: 'mod',
      crustacean: 'mod',
      nightshade: 'yes',
      coconut: 'yes',
    },
  },

  /* 14 */ {
    id: 14,
    sec: 'Salads & Vegetables',
    name: 'Chilled Broccolini',
    desc: 'Charred, chilled broccolini over yuzu kosho coconut yoghurt with burnt citrus vinaigrette, pickled cucumber and broccolini stems, spring onion oil and puffed wild rice.',
    process:
      'Broccolini grilled hard over coals, chilled. Base of strained coconut yoghurt with Yuzu Kosho. Burnt citrus vinaigrette of caramelised grapefruit, orange, lime and red chilli. Topped with pickled green chilli cucumber discs, pickled broccolini stems, spring onion oil and puffed wild rice.',
    allergies:
      'Allium, Gluten (brewed soy in marinade), Nightshade (fresh chillies — can be fully omitted on request), Coconut. Contains soy.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { alliums: 'yes', gluten: 'yes', nightshade: 'mod', coconut: 'yes', soy: 'yes' },
  },

  /* 15 */ {
    id: 15,
    sec: 'Salads & Vegetables',
    name: 'Green Papaya Salad',
    desc: 'Thai som tum-style salad with shaved kangaroo jerky (omit for vegan), Ancho chilli Nahm Jim, blistered cherry tomatoes, herbs, peanuts and fried shallots.',
    process:
      'Kangaroo jerky is house-made, shaved thin and tossed through — CAN BE ENTIRELY OMITTED to keep the dish strictly vegan. Nahm Jim dressing of dried Ancho chillies, coriander root, ginger, garlic, bird’s eye chilli, vegan fish sauce, palm sugar and tamarind. Bruised green papaya with fire-blistered cherry tomatoes, coriander, mint, wild betel leaf, crushed roasted peanuts and fried shallots.',
    allergies:
      'Allium, Nightshade, Soy (certified gluten-free tamari base used), Peanuts (can be omitted from garnish).',
    mise: 'Dessert fork + dessert spoon.',
    flags: { alliums: 'yes', nightshade: 'yes', soy: 'yes', peanut: 'mod' },
  },

  /* 16 */ {
    id: 16,
    sec: 'Salads & Vegetables',
    name: 'Stir Fried Snake Beans',
    desc: 'Wok-blistered snake beans tossed with chicken thigh mince and lemongrass XO (lemongrass, onion, chilli, ginger, dried shrimp paste).',
    process:
      'Snake beans cut to length and flash-fried at extreme heat in a seasoned wok to blister while staying crisp, tossed with ground chicken thigh and Lemongrass XO reduction (minced lemongrass, white onion, red chilli, ginger, dried shrimp paste).',
    allergies:
      'Allium (cooked), Crustacean (shrimp paste), Mollusc, Gluten (trace from soy sauces in commercial ingredients). Contains soy.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { alliums: 'yes', crustacean: 'yes', mollusc: 'yes', gluten: 'yes', soy: 'yes' },
  },

  /* 17 */ {
    id: 17,
    sec: 'Curries & Mains',
    name: 'Smoked Butternut Pumpkin',
    desc: 'Overnight-smoked butternut in yellow curry with galangal-lemongrass coconut cream, pumpkin seed satay, roasted seeds, Thai basil and fried saltbush.',
    process:
      'Whole butternut pumpkins are hardwood-smoked and slow-baked overnight in the clay ovens until chewy and intensely sweet; some flesh shaved and quick-pickled in orange juice. Yellow curry base of coconut milk and cream, house yellow curry paste and pumpkin juice reduction with kombu dashi. Drizzled with cold coconut milk infused with galangal, lemongrass and Makrut lime leaf. Pumpkin seed satay of curry aromatics, torch ginger flower, coconut oil and dark coconut sugar. Garnish: roasted pumpkin seeds, Thai basil, fried saltbush with vinegar powder and curry leaf dust. SERVICE: enthusiastically encourage a side of steamed rice.',
    allergies: 'Allium (cooked), Coconut. Vegetarian centrepiece.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { alliums: 'yes', coconut: 'yes' },
  },

  /* 18 */ {
    id: 18,
    sec: 'Curries & Mains',
    name: 'King Prawns (4 pieces per serve)',
    desc: 'Wood-roasted U10 king prawns, heads butterflied, in Davidson plum red curry built on tomato paste, native myrtles, pepper berries, coconut milk and prawn head sambal.',
    process:
      'Four U10 king prawns partially deshelled (tails on), heads butterflied, roasted at extreme heat in the wood-fired clay oven. Served in red curry sharpened with native Davidson Plum pulp; paste built from tomato paste, lemon myrtle, native pepper berries, aniseed myrtle, coconut milk and prawn head sambal reduction.',
    allergies: 'Shellfish, Allium, Nightshades (tomato paste), Coconut.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { crustacean: 'yes', alliums: 'yes', nightshade: 'yes', coconut: 'yes' },
  },

  /* 19 */ {
    id: 19,
    sec: 'Curries & Mains',
    name: 'Jungle Curry of Mushrooms',
    desc: 'Four-mushroom jungle curry (shiitake, lionsmane, king brown, oyster) in a fiery broth built on mushroom blanching water, with okra, green peppercorns, Thai basil and crispy enoki.',
    process:
      'Shiitake, lionsmane, king brown and oyster mushrooms are blanched; the blanching water becomes the curry base, simmered with curry paste, green bird’s eye chillies, lime leaf, white pepper, dark soy and tamarind, dusted with porcini and shiitake powders. Mushrooms wok-tossed with sweet soy paste and tamarind, mixed with okra, bathed in the hot broth. Garnish: green peppercorn sprigs, Thai basil, tempura enoki, grilled king brown spear. Kitchen uses certified VEGAN fish sauce.',
    allergies: 'Alliums, Coconut. Contains soy (dark soy / sweet soy paste). Vegan fish sauce used.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { alliums: 'yes', coconut: 'yes', soy: 'yes' },
  },

  /* 20 */ {
    id: 20,
    sec: 'Curries & Mains',
    name: '300g Blackened Grouper Cutlet',
    desc: 'Bone-in grouper roasted in the clay oven, basted with coconut sugar–onion–garlic–ginger caramel, over smoked tomato jam with dill and sea purslane.',
    process:
      'A 300g bone-in grouper cutlet is slow-roasted in the wood-fired clay oven, continuously basted with a dark caramel of raw coconut sugar, blended white onion, garlic, ginger, coconut water and cracked black pepper until lacquered. Rests on smoked tomato jam (vine tomatoes slow-cooked with chilli, garlic, fish sauce and dried shrimp paste, finished with dill). Garnished with sea purslane.',
    allergies:
      'Coconut, Allium (cooked), Fish Sauce, Crustacean (shrimp paste), Nightshades (smoked tomato jam base can be fully omitted).',
    mise: 'Dessert fork + dessert spoon.',
    flags: { coconut: 'yes', alliums: 'yes', fish: 'yes', crustacean: 'yes', nightshade: 'mod' },
  },

  /* 21 */ {
    id: 21,
    sec: 'Curries & Mains',
    name: '500g Lamb Barnsley Chop',
    desc: '24-hour brined double-loin lamb chop grilled medium pink with muntrie berry glaze, kecap manis and Maggi marinade, and a green garlic shoot–coconut yoghurt sauce.',
    process:
      'A 500g double-loin saddle chop brined 24 hours, basted on the hardwood grill with a native Muntrie berry glaze (sweet spiced dates / green apple profile), marinated with kecap manis, Maggi seasoning, curry paste aromatics, cumin and fennel; grilled to medium pink. Served with a green herb sauce of fire-blanched green garlic shoots emulsified with coconut yoghurt.',
    allergies:
      'Gluten (wheat-brewed kecap manis and Maggi), Alliums — cooked (can be modified by entirely omitting the green garlic shoot yoghurt sauce). Contains soy (kecap manis); coconut in the omittable sauce.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { gluten: 'yes', alliums: 'mod', soy: 'yes', coconut: 'mod' },
  },

  /* 22 */ {
    id: 22,
    sec: 'Curries & Mains',
    name: '400g Dry-Aged Bangalow Sweet Pork Cutlet',
    desc: 'Dry-aged heritage pork cutlet in red curry–condensed milk–honey marinade, over rhubarb, rosella and tamarind jam, with sand ginger pork marrow jus.',
    process:
      'Bangalow Sweet Pork cutlet dry-aged in climate vaults, marinated in red curry paste, fish sauce, sweetened condensed milk, honey and black pepper, grilled over embers. Rests on sweet-sour jam of rhubarb, native rosella flower, tamarind and raw sugar. Finished with jus of fire-roasted pork marrow bones, onion, carrot, galangal and dried Sand Ginger (warming, slightly mentholated dried rhizome).',
    allergies:
      'Dairy (condensed milk marinade), Allium (cooked), Pork, Gluten (soy sauce components in glazes). Contains fish sauce and soy.',
    mise: 'Dessert fork + dessert spoon.',
    flags: {
      dairy: 'yes',
      alliums: 'yes',
      pork: 'yes',
      gluten: 'yes',
      fish: 'yes',
      soy: 'yes',
    },
  },

  /* 23 */ {
    id: 23,
    sec: 'Sides',
    name: 'Steamed Rice — Vietnamese Jasmine & Thai Red Rice',
    desc: 'Dual-grain blend: ST25 jasmine (World’s Best Rice 2019 & 2023, from Sóc Trăng, Mekong Delta) and nutty, chewy Thai red “cargo” rice coloured by natural anthocyanin.',
    process:
      'Two grains steamed together: ST25 jasmine — “ST” for Sóc Trăng province in the Mekong Delta, “25” the breeding generation; won World’s Best Rice in 2019 and 2023. Thai red rice — unpolished “cargo rice”, nutty aroma, firm chewy texture, deep red bran from natural anthocyanin.',
    allergies: 'Completely allergen-free — 100% natural grain, no fats or additions.',
    mise: 'Rice spoon.',
    flags: {},
  },

  /* 24 */ {
    id: 24,
    sec: 'Desserts',
    name: 'Condensed Milk Creme Caramel (Impossible Cake)',
    desc: 'Self-separating bake: condensed milk creme caramel base beneath a Vietnamese coffee and wattleseed sponge, finished with vanilla-seasoned pandan oil.',
    process:
      'Condensed milk custard (condensed milk, eggs, sugar, dark caramel) is poured into the mould, followed by raw Vietnamese coffee cake batter (eggs, wheat flour, browned butter, toasted milk powder, roasted wattleseed). In a water bath the layers separate by density — custard sinks, sponge rises — forming two perfect layers on inversion. Finished with green pandan oil (blended pandan leaves in neutral oil, strained, seasoned with vanilla bean paste).',
    allergies: 'Dairy, Eggs, Gluten — STRICTLY NO MODIFICATIONS.',
    mise: 'Dessert spoon.',
    flags: { dairy: 'yes', egg: 'yes', gluten: 'yes' },
  },

  /* 25 */ {
    id: 25,
    sec: 'Desserts',
    name: 'Coconut Sorbet, Pandan Tres Leches Cake',
    desc: 'Pandan sponge soaked in coconut tres leches inside a young coconut shell, with river mint oil, green apple granita, lime leaf, coconut sorbet and meringue shards.',
    process:
      'Served in a cleaned young coconut shell: green pandan sponge saturated in a tres leches bath of coconut milk, condensed milk and evaporated milk, drizzled with native river mint oil (intense cooling menthol), layered with tart green apple granita and Makrut lime leaf chiffonade, topped with a quenelle of house-churned coconut sorbet and baked white meringue shards. SERVICE: instruct the guest to drive their spoon all the way to the bottom of the shell.',
    allergies:
      'Coconut, Egg (sponge and meringue), Dairy (condensed/evaporated milk soak). The pandan sponge base is entirely GLUTEN-FREE.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { coconut: 'yes', egg: 'yes', dairy: 'yes' },
  },

  /* 26 */ {
    id: 26,
    sec: 'Desserts',
    name: 'Banana Fritter',
    desc: 'Coconut–rice-crumbed banana fritters over pandan tapioca pudding with macadamia butterscotch, banana espuma and a macadamia caramel snap tile.',
    process:
      'Base of tapioca pearls slow-cooked in pandan-infused coconut cream. Ripe bananas coated in desiccated coconut, pulverised jasmine rice and crushed dried tapioca pearls, cut into 2cm cylinders and deep-fried — crunchy shell, liquefied interior. Layered with macadamia butterscotch (butter, coconut sugar, thickened cream), crowned with banana espuma (banana custard base charged with N2O) and a brittle caramel snap tile of sugar, rice flour, rice malt syrup and crushed macadamias.',
    allergies:
      'Dairy, Egg, Nuts (can be modified for nut allergies by omitting macadamia elements), Coconut.',
    mise: 'Dessert fork + dessert spoon.',
    flags: { dairy: 'yes', egg: 'yes', nuts: 'mod', coconut: 'yes' },
  },

  /* 27 */ {
    id: 27,
    sec: 'Desserts',
    name: 'Frozen Thai Milk Tea',
    desc: 'Frozen Thai tea parfait over sherry–palm sugar braised cashews, with caramelised roti strips and torched meringue.',
    process:
      'Parfait of full-cream milk steeped with red Thai tea leaves, sweetened with dulce de leche, whipped with eggs and cream, frozen in blocks. Rests on whole cashews long-braised in aged sherry vinegar and palm sugar with native cinnamon myrtle. Topped with caramelised roti strips (rolled translucent, baked, sugar-syrup soaked, flash-fried) and a torched soft meringue crown.',
    allergies:
      'Dairy, Eggs, Nuts (cashews — can be modified and omitted), Gluten (roti flour layers — can be fully modified and omitted).',
    mise: 'Dessert spoon.',
    flags: { dairy: 'yes', egg: 'yes', nuts: 'mod', gluten: 'mod' },
  },
]

export const ALLERGENS = [
  { key: 'crustacean', label: 'Crustacean', icon: '🦐' },
  { key: 'mollusc', label: 'Mollusc', icon: '🦪' },
  { key: 'fish', label: 'Fish/Fish Sauce', icon: '🐟' },
  { key: 'gluten', label: 'Gluten', icon: '🌾' },
  { key: 'dairy', label: 'Dairy', icon: '🥛' },
  { key: 'egg', label: 'Egg', icon: '🥚' },
  { key: 'peanut', label: 'Peanuts', icon: '🥜' },
  { key: 'nuts', label: 'Tree Nuts', icon: '🌰' },
  { key: 'sesame', label: 'Sesame', icon: '⚪' },
  { key: 'soy', label: 'Soy', icon: '🫘' },
  { key: 'coconut', label: 'Coconut', icon: '🥥' },
  { key: 'alliums', label: 'Alliums', icon: '🧄' },
  { key: 'nightshade', label: 'Nightshade', icon: '🍅' },
  { key: 'pork', label: 'Pork', icon: '🥓' },
  { key: 'yeast', label: 'Yeast', icon: '🍞' },
]

export const PROFILES = [
  { name: 'Crustacean Allergy', keys: ['crustacean'], icon: '🦐' },
  { name: 'Shellfish Allergy', keys: ['crustacean', 'mollusc'], icon: '🦪' },
  { name: 'Seafood Allergy', keys: ['crustacean', 'mollusc', 'fish'], icon: '🐟' },
  { name: 'Coeliac / Gluten', keys: ['gluten'], icon: '🌾' },
  { name: 'Dairy Free', keys: ['dairy'], icon: '🥛' },
  { name: 'Egg Allergy', keys: ['egg'], icon: '🥚' },
  { name: 'Peanut Allergy', keys: ['peanut'], icon: '🥜' },
  { name: 'Tree Nut Allergy', keys: ['nuts'], icon: '🌰' },
  { name: 'Sesame Allergy', keys: ['sesame'], icon: '⚪' },
  { name: 'Soy Allergy', keys: ['soy'], icon: '🫘' },
  { name: 'Coconut Allergy', keys: ['coconut'], icon: '🥥' },
  { name: 'Allium Free', keys: ['alliums'], icon: '🧄' },
  { name: 'Nightshade Allergy', keys: ['nightshade'], icon: '🍅' },
  { name: 'No Pork', keys: ['pork'], icon: '🥓' },
  { name: 'Yeast Free', keys: ['yeast'], icon: '🍞' },
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
