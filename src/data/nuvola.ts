// Everything about Nuvola that changes lives here, split by site.
// Sources are noted beside each block; nothing here is invented. Unknowns are left out, not guessed.

export type SiteId = 'brixton' | 'croydon'
export const siteOrder: SiteId[] = ['brixton', 'croydon']

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
/** [opens, closes] in 24h London time. A missing day means closed. */
export type Hours = Partial<Record<Day, [string, string]>>

export type Action = { label: string; short: string; via: string; href: string }

export type Special = {
  name: string
  description?: string
  price?: string
  photo?: string
  photoAlt?: string
  note: string
  link?: { label: string; href: string }
}

export type Experience = {
  kicker: string
  title: string
  description: string
  includes: string[]
  price?: string
  details: string[]
  cta: string
  href: string
}

export type Bundle = { name: string; price: string; contents?: string }

// Links as used by Nuvola's own site, Just Eat, Boxpark Croydon's Nuvola page and me&u (checked 18 Oct 2026).
const OPENTABLE = 'https://www.opentable.co.uk/r/nuvola-reservations-london?restref=426282&lang=en-GB'
const JUST_EAT_BRIXTON = 'https://www.just-eat.co.uk/restaurants-nuvola---brixton-nine-elms/menu'
const JUST_EAT_CROYDON = 'https://www.just-eat.co.uk/restaurants-nuvola---croydon-croydon-cr0/menu'
const UBER_EATS_BRIXTON = 'https://www.ubereats.com/gb/store/nuvola/3_-3y3DDVpmj32pdewiJiQ'
const UBER_EATS_CROYDON = 'https://www.ubereats.com/gb/store/nuvola-boxpark-croydon/OxSIkbh0UF69eNDsw27bJA'
const BOXPARK_BOOKING = 'https://www.boxpark.co.uk/venues/croydon/food-and-drink/nuvola-pizza?book=true'
const MEANDU = 'https://www.meandu.app/bpf-croydon/counter/nuvola-pizza'

export type MenuItem = {
  name: string
  description?: string
  price: string
  /** Marks printed next to the item on the source menu, kept verbatim. */
  marks?: string[]
  /** Key into the photo map, only where a real photo of that dish exists. */
  photo?: string
  /** A line on why this one is theirs. */
  signature?: string
}

export type MenuSection = {
  id: string
  title: string
  note?: string
  items: MenuItem[]
}

export type Menu = {
  /** Where the menu was transcribed from, shown under it. */
  sources: { label: string; url: string }[]
  note?: string
  sections: MenuSection[]
  drinks?: MenuSection[]
}

/** Brixton Village food and drinks menus, linked from nuvolapizza.co.uk ("Brixton Village · Food Menu / Drinks Menu"). */
export const brixtonMenu: Menu = {
  sources: [
    { label: 'food menu', url: 'https://nuvolapizza.co.uk/assets/menu-2-BVqOmX9l.pdf' },
    { label: 'drinks menu', url: 'https://nuvolapizza.co.uk/assets/menu-1-CUEgqIRy.pdf' },
  ],
  sections: [
    {
      id: 'pizza',
      title: 'Pizza',
      items: [
        {
          name: 'Margherita',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Basil & Olive Oil',
          price: '9.95',
          photo: 'studio-margherita',
        },
        {
          name: 'Pepperoni & Hot Honey',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Pepperoni, Basil & Olive Oil, and a touch of Honey',
          price: '12.50',
          photo: 'studio-pepperoni',
        },
        {
          name: 'Mushroom & Truffle',
          description: 'Fior di Latte Mozzarella, Mushrooms, Parmesan & Truffle Oil',
          price: '11.50',
          photo: 'studio-mushroom-truffle',
        },
        {
          name: 'Sausage & Friarielli Pesto',
          signature: 'Our own take: the friarielli is blitzed into a pesto, so every bite carries greens and sausage.',
          description: 'Friarielli pesto base (broccoli rabe), Fior di Latte Mozzarella, Pork Sausage, Parmesan & Olive Oil',
          price: '13.50',
        },
        {
          name: 'Parma Ham & Rocket',
          description: 'Fior di Latte Mozzarella (white base), datterini cherry tomato, Parma Ham, Rocket & Parmesan',
          price: '13.95',
        },
        {
          name: 'Artichoke & Olives',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Artichoke, Black Olives, Olive Oil, Oregano',
          price: '11.95',
          photo: 'studio-artichoke-olives',
        },
        {
          name: 'Nduja & Pesto',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Nduja, Pesto, Olive Oil',
          price: '12.95',
          photo: 'studio-nduja-pesto',
        },
        {
          name: 'Spicy Salame & Jalapeño',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Spicy Salami, Jalapeño, Red Onion, Olive Oil',
          price: '12.50',
        },
        {
          name: 'Aubergine',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Grilled Aubergine, Salted Ricotta, Basil & Olive Oil',
          price: '10.95',
          photo: 'studio-aubergine',
        },
        {
          name: 'Ham & Mushroom',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Mushrooms, Ham, Basil & Olive Oil',
          price: '11.95',
          photo: 'studio-ham-mushroom',
        },
      ],
    },
    {
      id: 'starters',
      title: 'Starters',
      items: [
        { name: 'Nocellara Olives', description: 'Sicilian olives (GF & VG)', price: '3.50' },
        { name: 'Stuffed Olives Ascolane', description: 'Olives stuffed with beef, pork and rolled in breadcrumbs', price: '6.50' },
        { name: 'Cheese Garlic Bread', description: 'Fior di Latte Mozzarella, Garlic Oil, Rosemary', price: '7.00' },
        { name: 'Anchovies Cheese Garlic Bread', description: 'Fior di Latte Mozzarella, Anchovies, Rosemary & Garlic Oil', price: '8.00' },
        { name: 'Parmesan & Truffle Fries', description: 'Fries, Cheese and Truffle Oil', price: '5.00' },
        { name: 'Arancini Mushrooms & Gorgonzola', description: 'With Truffle Oil and Parmesan', price: '7.00' },
        { name: 'Fried Mozzarella & Hot Honey', description: 'Spicy Honey', price: '6.50' },
        { name: 'Mac and Cheese Cubes', description: 'Carbonara Cubes or Cacio e Pepe Cheese', price: '7.50' },
        { name: 'Fried Artichoke', description: 'Fried Artichoke with Rosemary Aioli', price: '9.00' },
      ],
    },
    {
      id: 'insalate',
      title: 'Insalate',
      items: [
        { name: 'Rocket & Cherry Tomato', description: 'Rocket, cherry tomato, Grana Padano, Balsamic Vinegar', price: '5.00' },
        { name: 'Rocket & Ricotta Salted', description: 'Rocket, Artichoke, Pickled red onion & Ricotta salted', price: '6.00' },
        { name: 'Burrata & Parma Ham', description: 'Burrata, Parma ham, olive oil', price: '9.00' },
        { name: 'Burrata & Datterini', description: 'Burrata, Datterini cherry tomato & Pesto', price: '8.00' },
      ],
    },
    {
      id: 'dessert',
      title: 'Dessert',
      items: [
        { name: 'Homemade Tiramisu', price: '7.00' },
        { name: 'Hackney Gelato Ice-Cream', description: 'Pistachio, Dark Chocolate, Vanilla, Raspberry', price: '3.50' },
        { name: 'Pizza Sorriso Nutella/Pistachio', description: 'Closed pizza filled with Nutella/pistachio cream', price: '9.00' },
      ],
    },
    {
      id: 'extras',
      title: 'Extra toppings & dips',
      items: [
        { name: 'Gluten-free base', price: '3.00' },
        { name: 'Burrata', price: '3.50' },
        { name: 'Anchovies', price: '2.00' },
        { name: 'Pesto Ham', price: '2.00' },
        { name: 'Parma Ham', price: '2.00' },
        { name: 'Sausage', price: '2.00' },
        { name: 'Artichokes', price: '2.00' },
        { name: 'Spicy Salame', price: '2.00' },
        { name: 'Nduja', price: '2.00' },
        { name: 'Pepperoni', price: '2.00' },
        { name: 'Pesto', price: '2.00' },
        { name: 'Friarielli', price: '1.50' },
        { name: 'Aubergine', price: '1.50' },
        { name: 'Truffle Oil', price: '1.50' },
        { name: 'Mozzarella', price: '1.50' },
        { name: 'Olives', price: '1.00' },
        { name: 'Rocket', price: '1.00' },
        { name: 'Mushroom', price: '1.00' },
        { name: 'Red Onion', price: '1.00' },
        { name: 'Jalapeño', price: '1.00' },
        { name: 'Dips: Rosemary Aioli, Spicy, Pesto, Truffle Mayo, Hot Honey', price: '1.80 each' },
      ],
    },
  ],
  drinks: [
    {
      id: 'cocktails',
      title: 'Cocktails',
      items: [
        { name: 'Aperol Spritz', description: 'Aperol, soda, Prosecco', price: '9.00' },
        { name: 'Hugo Spritz', description: 'Gin, elderflower cordial, lime juice, Prosecco, soda', price: '10.00' },
        { name: 'Limoncello Spritz', description: 'Prosecco, limoncello, soda', price: '9.50' },
        { name: 'Campari Spritz', description: 'Campari, soda, Prosecco', price: '9.50' },
        { name: 'Negroni', description: 'Red vermouth, Campari, gin', price: '9.00' },
        { name: 'Paloma', description: 'Tequila, lime juice, top with grapefruit soda', price: '10.00' },
        { name: 'Margarita', description: 'Tequila, Cointreau, lime juice & chillis', price: '9.50' },
        { name: 'Mojito', description: 'Mint, white rum, simple syrup, lime juice, soda', price: '9.50' },
      ],
    },
    {
      id: 'beer',
      title: 'Beer',
      items: [
        { name: 'Peroni Nastro Azzurro', price: '4.50' },
        { name: 'Peroni Red', price: '4.25' },
        { name: 'Brixton Pale Ale', price: '4.90' },
        { name: 'Brixton Session IPA', price: '4.90' },
        { name: 'Lucky Saint', description: 'Alcohol free', price: '4.90' },
      ],
    },
    {
      id: 'wine',
      title: 'Wine',
      note: '175ml · 250ml · bottle (Prosecco: 125ml · bottle)',
      items: [
        { name: 'Prosecco DOC', description: 'Light and lively, perfect as an aperitif', price: '6.50 · 27.00' },
        { name: 'Pinot Grigio', description: 'Fresh and fruity with notes of apple and pear', price: '7.50 · 9.50 · 28.00' },
        { name: 'Vermentino', description: 'Zesty with citrus notes and a mineral finish', price: '7.90 · 9.90 · 30.00' },
        { name: 'Gavi DOCG', description: 'Elegant with white peach and almond nuances', price: '8.90 · 10.90 · 33.00' },
        { name: 'Zensa Rosato IGP', description: 'Fresh and fruity with strawberry and pomegranate notes', price: '7.80 · 9.80 · 28.00' },
        { name: "Montepulciano d'Abruzzo DOC", description: 'Smooth with ripe red fruit flavours', price: '7.50 · 9.50 · 28.00' },
        { name: "Nero d'Avola Sicilia DOC", description: 'Full-bodied with black cherry and spice notes', price: '7.90 · 9.90 · 30.00' },
        { name: 'Primitivo IGP', description: 'Rich and velvety with hints of plum & chocolate', price: '8.50 · 10.90 · 32.00' },
      ],
    },
    {
      id: 'soft',
      title: 'Soft drinks',
      items: [
        { name: 'Coca-Cola', price: '3.00' },
        { name: 'Coca-Cola Zero', price: '3.00' },
        { name: 'Diet Coke', price: '3.00' },
        { name: 'San Pellegrino Aranciata', price: '3.50' },
        { name: 'San Pellegrino Limonata', price: '3.50' },
        { name: 'San Pellegrino Sparkling Water', price: '3.00' },
        { name: 'Acqua Panna Still Water', price: '3.00' },
      ],
    },
  ],
}

/** Boxpark Croydon menu (PDF on boxpark.co.uk, same sheet as the Croydon menu on nuvolapizza.co.uk). */
export const croydonMenu: Menu = {
  sources: [
    { label: 'Boxpark Croydon menu', url: 'https://24-social.com/boxpark/1767778478-nuvolapizzamenu-boxpark-croydon' },
    { label: 'me&u', url: 'https://www.meandu.app/bpf-croydon/counter/nuvola-pizza' },
  ],
  // The menu prints VP and HP beside some pizzas without a key; kept as printed.
  note: 'VP and HP as marked on the stall menu.',
  sections: [
    {
      id: 'pizza',
      title: 'Pizza',
      items: [
        {
          name: 'Margherita',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Basil & Olive Oil',
          price: '8.50',
          marks: ['VP'],
          photo: 'studio-margherita',
        },
        {
          name: 'Pepperoni & Hot Honey',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Pepperoni, Basil & Hot Honey',
          price: '11.95',
          marks: ['HP'],
          photo: 'studio-pepperoni',
        },
        {
          name: 'Mushroom & Truffle',
          description: 'Fior di Latte Mozzarella, Mushrooms, Parmesan & Truffle Oil',
          price: '9.95',
          marks: ['VP'],
          photo: 'studio-mushroom-truffle',
        },
        {
          name: 'Sausage & Friarielli Pesto',
          signature: 'Our own take: the friarielli is blitzed into a pesto, so every bite carries greens and sausage.',
          description: 'Friarielli pesto base (broccoli rabe), Fior di Latte Mozzarella, Italian Sausage, Parmesan',
          price: '12.50',
        },
        { name: 'Nduja', description: 'Tomato sauce, Fior di Latte Mozzarella, Nduja, Basil & Olive Oil', price: '10.50' },
        {
          name: 'Aubergine & Pesto',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Aubergine, Caramelised Onion, Pesto & Olive Oil',
          price: '10.95',
          marks: ['VP'],
        },
        {
          name: 'Ham & Mushroom',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Mushrooms, Ham, Basil & Olive Oil',
          price: '11.50',
          photo: 'studio-ham-mushroom',
        },
        {
          name: 'Chicken BBQ',
          description: 'Tomato sauce, Fior di Latte Mozzarella, Chicken Strips, Barbecue Sauce, Basil & Olive Oil',
          price: '11.95',
        },
      ],
    },
    {
      id: 'fried',
      title: 'Fried',
      items: [
        { name: 'Parmesan & Truffle Fries', description: 'Fries, Cheese and Truffle Oil', price: '4' },
        { name: 'Arancini Mushrooms & Gorgonzola', description: 'With Truffle Oil and Parmesan', price: '5.5' },
        { name: 'Fried Mozzarella & Hot Honey', price: '5' },
        { name: 'Frittatina', description: 'Fried Mac and Cheese', price: '6' },
      ],
    },
    {
      id: 'dessert',
      title: 'Dessert',
      items: [{ name: 'Classic Homemade Tiramisu', price: '6' }],
    },
    {
      id: 'extras',
      title: 'Extra toppings & dips',
      items: [
        { name: 'Extra meat', price: '2.00' },
        { name: 'Extra cheese', price: '1.50' },
        { name: 'Extra vegetables', price: '1.00' },
        { name: 'Burrata', price: '3.50' },
        { name: 'Rosemary Aioli', price: '1.60' },
        { name: 'Spicy Dip', price: '1.60' },
        { name: 'Truffle Mayo Dip', price: '1.60' },
      ],
    },
  ],
  drinks: [
    {
      id: 'soft',
      title: 'Soft drinks',
      items: [
        { name: 'San Pellegrino Aranciata', price: '3' },
        { name: 'San Pellegrino Limonata', price: '3' },
        { name: 'San Pellegrino Sparkling Water', price: '3' },
        { name: 'Acqua Panna Still Water', price: '2' },
        { name: 'Coca-Cola', price: '2' },
        { name: 'Coca-Cola Zero', price: '2' },
        { name: 'Diet Coke', price: '2' },
      ],
    },
  ],
}

// ───────────────────────── Brand ─────────────────────────

export const brand = {
  email: 'Nuvolapizzauk@gmail.com',
  socials: [
    { label: 'Instagram · @nuvolapizzauk', url: 'https://www.instagram.com/nuvolapizzauk/' },
    { label: 'TikTok · @nuvolapizzauk', url: 'https://www.tiktok.com/@nuvolapizzauk' },
  ],
  legal: 'Nuvola Pizza is run by Fatti di Impasto Ltd · Company no. 15565667',
}

// Their own words from nuvolapizza.co.uk ("Our Story"), Brixton Village's write-up and the Boxpark listing.
export const story = {
  kicker: 'Nuvola means cloud',
  title: 'The dough is the point',
  intro:
    'Nuvola started from a simple idea: make pizza the right way. Few ingredients, carefully chosen. A dough that is properly made and given the time it needs. Real attention to how it is cooked. No trends.',
  steps: [
    {
      short: 'Biga',
      label: '01 · Biga',
      title: 'It starts the day before',
      body: 'We prepare the biga one day and let it rest: flour, water and a little yeast, an evolution of sourdough. We got here through countless trials, chasing the right balance of fragrance, texture and flavour.',
    },
    {
      short: 'Time',
      label: '02 · Time',
      title: 'About sixty hours, start to finish',
      body: 'Then we make the final dough and let it mature again. Long fermentation, rested cold, given the time it needs. Nobody hurries it.',
    },
    {
      short: 'Nuvola',
      label: '03 · Nuvola',
      title: 'Light as a cloud',
      body: 'Nuvola is Italian for cloud. A light, soft, highly digestible dough that feels like a cloud with every bite.',
    },
    {
      short: 'Fire',
      label: '04 · Fire',
      title: 'Into the wood oven',
      body: 'The wood-fired oven doesn’t forgive mistakes. When a pizza comes out just right, the edge puffs up and catches, and you can taste the difference.',
    },
  ],
  peopleTitle: 'Rome, Naples, Brixton',
  people: [
    {
      name: 'Fatjon',
      role: 'Founder · pizzaiolo',
      body: 'Nuvola was born from Fatjon’s dream. He learnt to make pizza in Rome and Naples, moved to London in 2018 and spent seven years at Made of Dough in Brixton before opening Nuvola at Unit 4, Market Row in 2025.',
      quote: 'I have my own style now.',
      photo: 'chef-dough',
      photoAlt: 'Fatjon stretching a disc of dough in the air beside the oven.',
      source: {
        label: 'Brixton Culture Capital, August 2025',
        url: 'https://read.brixtonculturecapital.com/p/nuvola-takes-franco-mancas-first',
      },
    },
    {
      name: 'Fabio',
      role: 'Chef · Brixton Village',
      body: 'The kitchen at Market Row is led by Chef Fabio, who honed his craft in some of the best pizzerias in Naples and has won awards in his hometown.',
      source: { label: 'Nuvola on OpenTable', url: OPENTABLE },
    },
  ] as {
    name: string
    role: string
    body: string
    quote?: string
    photo?: string
    photoAlt?: string
    source?: { label: string; url: string }
  }[],
}

// ───────────────────────── Sites ─────────────────────────

type Site = {
  id: SiteId
  name: string
  short: string
  switchHint: string
  fasciaLine: string
  unitLeft?: string
  unitRight?: string
  heroPhoto: string
  heroAlt: string
  heroFocus: string
  addressLine: string
  addressFull: string
  where: string
  mapsUrl: string
  phone?: string
  /** Only hours Nuvola publishes; leave undefined rather than guess. */
  hours?: Hours
  hoursSource?: string
  actions: [Action, Action]
  menu: Menu
  menuIntro: string
  special?: Special
  unlimited?: Experience
  howItWorks?: { title: string; kicker: string; steps: string[] }
  /** Standing offers that have been published recently. */
  offers?: { when: string; what: string; note: string }[]
  /** Google rating as shown on Google Maps when checked. */
  rating?: { score: string; count: number; checked: string; url: string }
  /** Real reviews, quoted exactly and credited. */
  quotes?: { text: string; author: string; where: string }[]
  delivery?: {
    kicker: string
    title: string
    intro: string
    bundles: Bundle[]
    vegan?: MenuSection
    links: { label: string; via: string; href: string }[]
  }
  room: {
    kicker: string
    body: string
    features: string[]
    directions: string[]
    photo: string
    photoAlt: string
    photoFocus?: string
  }
}

export const sites: Record<SiteId, Site> = {
  brixton: {
    id: 'brixton',
    name: 'Brixton Village',
    short: 'Brixton',
    switchHint: 'Market Row · sit down',
    fasciaLine: 'Biga pizza',
    heroPhoto: 'margherita-oven',
    heroAlt: 'A margherita held up at the mouth of the wood-fired oven at Brixton, the fire burning behind it.',
    heroFocus: '50% 62%',
    addressLine: '4 Market Row, Brixton Village, SW9 8LD',
    addressFull: '4 Market Row, Brixton Village, London SW9 8LD',
    where: 'Directions',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nuvola+Pizza+4+Market+Row+Brixton+London+SW9+8LD',
    phone: '07928 527509',
    // Hours as published on nuvolapizza.co.uk (Visit Us, and the site's structured data).
    hours: {
      Tuesday: ['12:00', '22:00'],
      Wednesday: ['17:00', '22:00'],
      Thursday: ['17:00', '22:00'],
      Friday: ['12:00', '22:00'],
      Saturday: ['12:00', '22:00'],
      Sunday: ['12:00', '21:00'],
    },
    hoursSource: 'nuvolapizza.co.uk',
    actions: [
      { label: 'Book a table', short: 'Book', via: 'OpenTable', href: OPENTABLE },
      { label: 'Order delivery', short: 'Order', via: 'Just Eat · or collect', href: JUST_EAT_BRIXTON },
    ],
    menu: brixtonMenu,
    menuIntro: 'The sit-down menu at Market Row. Gluten-free base on request, £3 extra.',

    // Half-price Tuesdays: Brixton Culture Capital (Aug 2025, and its 27 Aug 2026 issue), Brixton Village's lunch guide,
    // Brixton Buzz (updated May 2026) and the chalkboard in Nuvola's own photos.
    offers: [{ when: 'Every Tuesday', what: 'Half-price pizza', note: 'Offers can change, so check when you book.' }],

    rating: {
      score: '4.9',
      count: 462,
      checked: '18 Oct 2026',
      url: 'https://www.google.com/maps/search/?api=1&query=Nuvola+Pizza+4+Market+Row+Brixton+London+SW9+8LD',
    },
    quotes: [
      { text: 'Very good pizza. One of the best we had in Brixton', author: 'Jac L', where: 'Google' },
      {
        text: 'Made to order and more value for money than any pizza I’ve ordered in South London…',
        author: 'Supriya Iyer',
        where: 'Google',
      },
    ],

    // OpenTable: "we feature a weekly special pizza, created with fresh, seasonal ingredients".
    // Fill in name/description/price each week; until then the slot says how to find out.
    special: {
      name: 'A new pizza every week',
      description:
        'Made with fresh, seasonal ingredients, on the same biga dough. It changes weekly, so ask at Market Row or check our Instagram.',
      note: 'Brixton Village only.',
      link: { label: 'See it on Instagram', href: 'https://www.instagram.com/nuvolapizzauk/' },
    },

    // OpenTable experience at Brixton. Price, length and nights are not confirmed, so they are left out.
    unlimited: {
      kicker: 'Brixton Village · on OpenTable',
      title: 'Unlimited Pizza & Drinks',
      description: 'Unlimited pizza from the wood oven, with Aperol Spritz, Prosecco and Peroni to go with it.',
      includes: ['Unlimited pizza', 'Aperol Spritz', 'Prosecco', 'Peroni'],
      price: '£40 per person · 90 minutes',
      details: [
        'Your 90 minutes start when you’re seated. Switch drinks as you like.',
        'Big table? Book ahead. Book it as an experience on our OpenTable page.',
      ],
      cta: 'Book the Unlimited night',
      href: OPENTABLE,
    },

    delivery: {
      kicker: 'From Market Row to your door',
      title: 'Delivery & collection',
      intro: 'Bundles and vegan pizzas as listed on Just Eat for Nuvola Brixton. Delivery prices differ from the restaurant menu.',
      bundles: [
        { name: 'Pizziata for 1', price: '26.80', contents: 'One pizza, one side, one dip and one soft drink.' },
        { name: 'Sweet Pizziata for 1', price: '27.80', contents: 'One pizza, one dip, one soft drink and one dessert.' },
        { name: 'Deal for 2', price: '42.00', contents: 'Two pizzas, two dips and two drinks.' },
        { name: 'Pizziata for 2', price: '57.75', contents: 'Two pizzas, two sides, one dessert and two soft drinks.' },
      ],
      vegan: {
        id: 'vegan',
        title: 'Vegan wood-fired pizza',
        note: 'Every pizza in the bundles can be one of these.',
        items: [
          { name: 'Vegan Margherita', price: '13.95' },
          { name: 'Vegan Mushrooms and Truffle', price: '13.95' },
          { name: 'Vegan Aubergine', price: '13.95' },
          { name: 'Vegan Artichoke and Olives', price: '14.95' },
          { name: 'Vegan Pesto and Cherry Tomato', price: '15.95' },
        ],
      },
      links: [
        { label: 'Order on Just Eat', via: 'Nuvola · Brixton', href: JUST_EAT_BRIXTON },
        { label: 'Order on Uber Eats', via: 'Nuvola · Brixton', href: UBER_EATS_BRIXTON },
      ],
    },
    room: {
      kicker: 'The shop in the market',
      body: 'A white shopfront with our name painted in blue, on Market Row in the covered arcade of Brixton Village. A few seats inside, more at the tables out front under the market roof.',
      features: ['Dogs welcome', 'Outdoor tables', 'Gluten-free base', 'Vegan pizzas'],
      directions: [
        'Market Row runs between Electric Lane, Coldharbour Lane and Atlantic Road, a few minutes’ walk from Brixton station (Victoria line).',
      ],
      photo: 'brixton-arcade',
      photoAlt: 'Nuvola’s shopfront on Market Row with people eating at the tables outside, under the arcade roof.',
      photoFocus: '50% 40%',
    },
  },
  croydon: {
    id: 'croydon',
    name: 'Boxpark Croydon',
    short: 'Croydon',
    switchHint: 'By East Croydon station',
    fasciaLine: 'Biga pizza',
    unitLeft: '39',
    unitRight: '38',
    heroPhoto: 'croydon-boxpark-pizza',
    heroAlt: 'A Nuvola pizza on a table inside Boxpark Croydon, the screens and lights of the hall behind it.',
    heroFocus: '50% 70%',
    addressLine: 'Unit 38, Boxpark Croydon, 99 George St, CR0 1LD',
    addressFull: 'Unit 38, Boxpark Croydon, 99 George Street, Croydon CR0 1LD',
    where: 'Directions',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nuvola+Pizza+Boxpark+Croydon+99+George+Street+CR0+1LD',
    phone: '07521 571354',
    // Hours as published on nuvolapizza.co.uk for the Croydon stall.
    hours: {
      Monday: ['11:30', '22:00'],
      Tuesday: ['11:30', '22:00'],
      Wednesday: ['11:30', '22:00'],
      Thursday: ['11:30', '22:00'],
      Friday: ['11:30', '22:00'],
      Saturday: ['11:30', '22:00'],
      Sunday: ['11:30', '22:00'],
    },
    hoursSource: 'nuvolapizza.co.uk',
    actions: [
      { label: 'Order at your table', short: 'Order', via: 'me&u', href: MEANDU },
      { label: 'Book a table', short: 'Book', via: 'Boxpark booking', href: BOXPARK_BOOKING },
    ],
    menu: croydonMenu,
    menuIntro: 'The stall menu at Boxpark Croydon, the same one you order from on me&u.',
    rating: {
      score: '4.4',
      count: 102,
      checked: '18 Oct 2026',
      url: 'https://www.google.com/maps/search/?api=1&query=Nuvola+Pizza+Boxpark+Croydon+99+George+Street+CR0+1LD',
    },
    quotes: [
      { text: 'Honestly, this was the best pizza I’ve ever had in my life.', author: 'Prema Devi Gurewan', where: 'Google' },
      { text: 'One of the best woodfire-based pizza places in Croydon!', author: 'Rinki Banik', where: 'Google' },
    ],
    howItWorks: {
      title: 'At the stall',
      kicker: 'Order at your table',
      steps: ['Take a table in the hall.', 'Open Nuvola Pizza on me&u.', 'Order and pay on your phone.'],
    },

    delivery: {
      kicker: 'From Boxpark to your door',
      title: 'Delivery & collection',
      intro: 'As listed on Just Eat for Nuvola Croydon. Delivery prices differ from the stall menu.',
      bundles: [{ name: 'Deal for 2', price: '42.00', contents: 'Two pizzas, two dips and two soft drinks.' }],
      vegan: {
        id: 'vegan',
        title: 'Vegan wood-fired pizza',
        note: 'At the stall, vegan mozzarella is an extra on any pizza (£1 on me&u).',
        items: [
          { name: 'Vegan Margherita', price: '14.95' },
          { name: 'Vegan Mushroom and Truffle', price: '16.95' },
          { name: 'Vegan Aubergine', price: '16.95' },
        ],
      },
      links: [
        { label: 'Order on Just Eat', via: 'Nuvola · Croydon', href: JUST_EAT_CROYDON },
        { label: 'Order on Uber Eats', via: 'Nuvola · Boxpark Croydon', href: UBER_EATS_CROYDON },
      ],
    },
    room: {
      kicker: 'The stall in the hall',
      body: 'Unit 38 in Boxpark Croydon, the black-framed counter with our oven behind it. Eat in the hall with everyone else.',
      // "We proudly offer Halal, gluten-free, and vegan options" (Nuvola's Croydon Google profile)
      features: ['Halal options', 'Gluten-free base', 'Vegan options', 'Order on your phone'],
      directions: ['Boxpark Croydon is on George Street, right by East Croydon station.'],
      photo: 'croydon-unit',
      photoAlt: 'Nuvola’s black-framed unit at Boxpark Croydon, numbers 39 and 38 either side of the sign and the oven glowing inside.',
      photoFocus: '50% 45%',
    },
  },
}
