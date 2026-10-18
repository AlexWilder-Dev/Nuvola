# Nuvola Pizza — demo site

A speculative front-end for Nuvola Pizza (Brixton Village and Boxpark Croydon), built to pitch to the owners.
Static data only: no ordering, booking or payment backend, and the contact form shows a confirmation without sending anything.

- Live: https://alexwilder-dev.github.io/nuvola-pizza/
- Deep links for ads: `https://alexwilder-dev.github.io/nuvola-pizza/#/brixton` and `…/#/croydon` open straight onto that site's shopfront and remember the choice.

## Stack

Vite, React, TypeScript, Framer Motion, React Router (`HashRouter`), deployed to GitHub Pages under `/nuvola-pizza/`.

```sh
npm install
npm run dev      # local
npm run build    # type-check and build to dist/
npm run og       # rebuild public/og.jpg and favicons (sharp)
```

`.github/workflows/pages.yml` builds and publishes `dist/` on every push to `main`.

## Where things live

- `src/data/nuvola.ts` — everything that changes: menus, hours, phones, booking and ordering links, this week's special and the Unlimited night, split by site. Edit this file to update the site.
- `src/data/photos.ts` — photo lookup (files in `src/assets/photos/`, made by `scripts/prepare-photos.mjs` from `research/photos/`).
- `src/assets/nuvola-wordmark.svg`, `src/assets/cloud.svg` — the fascia lettering and the cloud mural, traced from photos of the Brixton shop.
- `research/notes.md` — research, sources and the reasoning behind the design.

Site by AlexWilder-Dev
