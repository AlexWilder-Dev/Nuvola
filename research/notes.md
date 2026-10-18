# Nuvola Pizza — research notes

Researched 18 October 2026. **Verified** = page, PDF or JSON fetched and read. **Snippet** = seen only in a search-engine summary, not on the page itself. Raw downloads are in `research/raw/`, photos in `research/photos/`.

## Who they are

- **Company:** Fatti di Impasto Ltd (company no. 15565667, on their site's footer). Incorporated 15 March 2024, active, SIC 56290. Sole director **Fatjon Peto**, Italian, born 1989 (Companies House, verified). The company name means roughly "made of dough".
- **Founder:** their site (verified, rendered): *"Nuvola was born from the dream of Fatjon, a pizzaiolo who honed his craft in Naples before moving to London in 2018. After years of experience in traditional Neapolitan pizzerias…"* The chef photo on their site is filed as `chef-fatjon.jpg`.
- **Brixton chef:** OpenTable (snippet; OpenTable blocked every fetch): *"an authentic Neapolitan experience led by Chef Fabio … who has honed his craft in some of the best pizzerias in Naples"*, and has won awards in his hometown. So: Fatjon founded it; Fabio runs the Brixton kitchen. Both appear on the site.
- **Method, in their words** (nuvolapizza.co.uk): *"The name Nuvola (Italian for 'cloud') reflects our philosophy: a light, soft, and highly digestible dough that feels like a cloud with every bite. We use the biga method, an evolution of sourdough, perfected through countless trials until we achieved the ideal balance of fragrance, texture, and flavor."* *"…from the long fermentation of the dough to the selection of fresh, high-quality ingredients."*
- **Brixton Village's write-up** (brixtonvillage.com/trader/nuvola-pizza, verified): *"Nuvola was born from a simple idea: make pizza the right way. Few ingredients, carefully chosen. Dough that's properly made and given the time it needs. And real attention to how it's cooked. They don't follow trends… The oven doesn't forgive mistakes, but when a pizza comes out just right, you can taste the difference… made to be eaten, not just admired… a tight-knit team with their hands in the dough."*
- **Boxpark's copy** (boxpark.co.uk Nuvola page, verified): *"a dough so light and airy it feels like a cloud. Founded by a master pizzaiolo from Naples, the brand uses a special fermentation technique to ensure every slice is perfectly digestible, fragrant…"*
- **How they talk about themselves:** plain and craft-proud. They talk about dough, time, fermentation, the oven. The best lines come from the Brixton Village write-up, which reads like it was supplied by them. The weak lines are the template ones on their own site ("crafted with passion", "Nuvola is more than a pizzeria"), which this site avoids.

## The two rooms

**Brixton: 4 Market Row, Brixton Village, SW9 8LD.** A small shopfront in the covered Market Row arcade (glass roof, plants trailing from the gallery above). White fascia with **NUVOLA** hand-painted in a soft sky blue, in a condensed serif with bracketed, flared serifs, and **BIGA PIZZA** in spaced sans capitals. White-framed windows with a row of small panes on top. Wooden slatted tables outside with blue seat cushions, under the arcade roof. Inside: white walls, light wood, a painted mural of a **blue cloud above a pizza** (woodcut-style pizza with red tomatoes, fior di latte and a basil leaf), and a wood-fired oven with a pale blue-grey dome and a "G" on the arch. Brixton Buzz notes the site is Franco Manca's former first site, has a bit of seating indoors and more outside ("freezing in winter… cheerful and sunlit in the warmer months") and no bathroom. Sit-down, booked on OpenTable, dog-friendly; delivery on Just Eat and Uber Eats.

**Croydon: Unit 38, Boxpark Croydon, 99 George Street, CR0 1LD.** A counter unit in Boxpark's food hall by East Croydon station. Black frame, white **NUVOLA PIZZA** sign with unit numbers 39 and 38 on either side, the oven glowing inside. The hall is dark, with neon, big screens, communal benches and black-and-white chevron signage. You order at your table on me&u (Boxpark's "ORDER AT YOUR TABLE" button) or book a Boxpark table through Boxpark's DesignMyNight venue booking; there is no Nuvola-specific booking. Delivery on Just Eat and Uber Eats.

The two are different businesses for the visitor: a sit-down pizzeria you book versus a food-hall stall you order from on your phone.

## Who comes, and when (from the listings and reviews found)

- Brixton: market-goers, dates and small groups at the outside tables; dog owners; budget eaters on Tuesdays (Brixton Buzz: 50% off on Tuesdays — also the "EVERY TUESDAY 50% OFF ALL PIZZA!" chalkboard in a photo on their own site; not confirmed as current, so not on the new site). Hours suit lunch Tue/Fri–Sun and evenings all week except Monday. OpenTable tags it dog-friendly, happy hour, neighbourhood gem (snippet).
- Croydon: Boxpark crowd — groups, after-work, event and match nights in the hall (Boxpark's own happy hour, 5–8pm Mon–Fri, is the venue's, not Nuvola's). Open 11.30am–10pm every day.

## What reviewers say

- **Praise:** the dough. OpenTable (snippets, 2026): *"Absolutely great italian dough, hats off for accomodating vegan cheese"* (Sara, June 2026); light dough, generous portions; efficient service. Brixton Buzz: *"the staff are really nice"*. Just Eat: Brixton 43 ratings, Croydon 37, both shown as 5 stars (most 5★, a tail of 1–2★).
- **Complaints:** Brixton Buzz (Nov 2025 guide, critical): *"overpriced at full price and not great quality at all – skimpy toppings… It all feels a bit improvised"*, no bathroom, cold outside tables in winter. OpenTable: very busy, slower service (4★ with service 3). Uber Eats Croydon 3.6 vs Brixton 4.1.
- **Price confusion is real:** a Margherita is £8.50 ordered at the Croydon stall (me&u), £9.95 sit-down in Brixton, £10.50 on Just Eat Brixton, £13.95 on Just Eat Croydon and on Uber Eats. The site shows each menu with its own source so nobody is misled.

## The current site (nuvolapizza.co.uk) — what's weak

1. **Client-rendered.** The HTML is 5 KB with an empty `<div id="root">`; every word arrives by JavaScript.
2. **No og:image**, so shared links show no picture. `og:type` is "restaurant" (not a valid type). The structured-data image points at `/hero-image.jpg`, which doesn't exist.
3. **The first screen on a phone sells one action.** It shows "Reserve - Brixton" and "View Our Menu", and a privacy banner covers the lower half. There's no Croydon action. Nothing links to Just Eat, Uber Eats, me&u or Boxpark anywhere on the site, even though they pay for Google Ads to it.
4. **Menus are a PDF (Brixton) and a PNG (Croydon)**: unreadable on a phone, not searchable.
5. **None of the reasons to choose them is on it:** no weekly special, no Unlimited night, no Chef Fabio. The dough story is there but buried under template copy ("crafted with passion", "more than a pizzeria").
6. Template look (Playfair + Inter, emoji service list, a gallery labelled "Brixton Brixton Brixton…"). It doesn't look like the shop with the painted blue NUVOLA sign.
7. Inconsistent details: footer says "Open Daily (Closed Mondays)". Croydon is marked `acceptsReservations: false` while Boxpark takes table bookings.

## Facts used on the new site, and where they came from

| Fact | Source | Status |
|---|---|---|
| Brixton hours: Mon closed; Tue 12–10; Wed–Thu 5–10; Fri–Sat 12–10; Sun 12–9 | nuvolapizza.co.uk (page + structured data); SquareMeal and OpenTable (snippet) agree | Confirmed |
| Croydon hours: 11.30am–10pm daily | nuvolapizza.co.uk; Just Eat and Uber Eats agree | Confirmed for Nuvola's stall (Boxpark's venue hours differ) |
| Phones: Brixton 07928 527509, Croydon 07521 571354 | nuvolapizza.co.uk (Just Eat lists 07762 339899 for Croydon) | Their own site used |
| Brixton menu (food + drinks) | PDFs linked from nuvolapizza.co.uk | Verified, date not printed |
| Croydon menu | Boxpark PDF = me&u live menu = PNG on their site | Verified, current |
| Bundles, vegan pizzas | Just Eat menu JSON for each site, published 14 and 18 Oct 2026 | Verified |
| Unlimited Pizza & Drinks: unlimited pizza, Aperol Spritz, Prosecco, Peroni | OpenTable (via brief and snippets) | Contents confirmed; **£40pp / 90 min only in snippets, left off** |
| Weekly special pizza with seasonal ingredients | OpenTable "About" (snippet) | Slot in data; no current special found |
| Instagram | Brixton Village links @nuvolapizzauk; Boxpark links @nuvolabigapizza; their site links @nuvolapizzauk and TikTok @nuvolapizzauk | See below |

## Photos (all real; what each shows and where it's used)

From nuvolapizza.co.uk:
- `site-01` — Brixton fascia in daylight, white front, NUVOLA in sky blue, empty tables outside. *Used to trace the wordmark and sample the palette.*
- `site-02` — same front at night, warm light inside, cloud sticker on the door. *Palette.*
- `site-03` — margherita on a metal plate, wooden market table. *Not used.*
- `site-04` — the front at an angle with diners outside, arcade roof above. *Not used (site-12 is clearer).*
- `site-05` — the **cloud-above-pizza mural** inside Brixton. *Traced into the cloud mark (favicons, footer, dough sequence).*
- `site-06` — aubergine pizza with an Aperol Spritz, light wood table. *Not used.*
- `site-08` — top-down pizza with sausage, mushrooms, fior di latte, basil, on a round board. *Cropped round for the end of the dough sequence (under the cloud, like the mural).*
- `site-09` — pepperoni & hot honey on a board (also Boxpark's image-2). *Not used.*
- `site-10` — olive pizza by an "EVERY TUESDAY 50% OFF ALL PIZZA!" chalkboard. *Not used (offer not confirmed current).*
- `site-11` — top-down pizza beside the bright-blue paper menu. *Not used (cheese looks like vegan cheese; can't label it).*
- `site-12` — Brixton front with a full house outside, plants hanging from the arcade. *"Come by", Brixton.*
- `hero-image` — margherita held at the mouth of the wood-fired oven, fire behind. *Brixton shopfront window; og.jpg.*
- `01-new` — the Croydon unit: black frame, NUVOLA PIZZA, 39/38, oven inside. *"Come by", Croydon; unit numbers on the Croydon fascia.*
- `02-new` — pizza on a table inside Boxpark, neon and screens behind. *Croydon shopfront window.*
- `chef-fatjon` — Fatjon stretching dough in the air by the oven. *"Who makes it".*

From Boxpark (550×440 studio shots on pale concrete): ham & mushroom, margherita, aubergine (with salted ricotta), mushroom & truffle (white), pepperoni, nduja with a pesto spiral, artichoke & olives (same as Brixton Village's photo), and a selection. *Round thumbnails on the menu, only against the dish each one shows.*

## Design reasoning

- **Palette** comes from the shop: fascia white `#f3f0e8`, the painted sky-blue lettering `#4a8fc4`, the cloud mural's cobalt outline `#0d4a8b` and slate fill `#5b7fa3`, and tomato/basil from the mural pizza for small accents (special tag, open-now dot). Croydon switches to the Boxpark unit's black and the bright blue of their Croydon menu `#3db5f5`.
- **Type:** the NUVOLA wordmark is traced from the fascia photo, not set in a font. Headings use Roboto Serif at a condensed width, the closest free match to the sign's condensed, flared serif. Body and labels use Figtree, and spaced capitals echo "BIGA PIZZA".
- **Layout:** the first screen is drawn as the chosen shopfront. Brixton gets the painted fascia over a window with a row of small panes. Croydon gets the black unit with 39 and 38 either side. The menu card copies each printed menu: Brixton's pale watercolour sheet with the looped rule under NUVOLA, and Croydon's bright blue sheet with the navy ME/NU block.
- **Signature interactions:** (1) a Brixton/Croydon switch that changes theme, actions, hours, menu, delivery and "this week". It is remembered between visits and deep-linkable (`#/brixton`, `#/croydon`) so each ad can land on its own site. (2) The dough sequence: a shaggy biga on the bench proves and fills with bubbles, swells into the cloud from the mural, and lands on a real Nuvola pizza under it — the mural made real.

## What the owners most want this site to do

1. Turn every ad click into an order or a booking at the right site in a tap or two (their current site has no Croydon action and no delivery links at all, while they pay for ads to it).
2. Make the cloud-light biga dough, Fatjon and Chef Fabio the reason to choose Nuvola in a town full of pizzerias (it's the one thing reviewers consistently praise, and the counter to "overpriced/skimpy").
3. Fill Brixton's quieter tables with what's already theirs and not on the site: the Unlimited Pizza & Drinks night and the weekly special.
