# Nuvola Pizza — demo site

A speculative front-end for Nuvola Pizza (Brixton Village and Boxpark Croydon), built to pitch to the owners.
Static data only: no ordering, booking or payment backend, and the contact form shows a confirmation without sending anything.

- Live: https://alexwilder-dev.github.io/Nuvola/ (served at the repository's name; renaming the repo to `nuvola-pizza` moves it to https://alexwilder-dev.github.io/nuvola-pizza/ with no code change)
- Deep links for ads: `…/#/brixton` and `…/#/croydon` open straight onto that site's shopfront and remember the choice. Add `?v=name` before the `#` to tag a link in the open pings.

## Stack

Vite, React, TypeScript, Framer Motion, React Router (`HashRouter`), deployed to GitHub Pages at the repository's Pages address.

```sh
npm install
npm run dev      # local
npm run build    # type-check and build to dist/
npm run og       # rebuild public/og.jpg and favicons (sharp)
```

`.github/workflows/pages.yml` builds and publishes `dist/` on every push to the default branch. It passes the real Pages address as `SITE_URL`, so the base path and every link-preview URL in `index.html` match where the site is served.

## Where things live

- `src/data/nuvola.ts` — everything that changes: menus, hours, phones, booking and ordering links, this week's special and the Unlimited night, split by site. Edit this file to update the site.
- `src/data/photos.ts` — photo lookup (files in `src/assets/photos/`, made by `scripts/prepare-photos.mjs` from `research/photos/`).
- `src/assets/nuvola-wordmark.svg`, `src/assets/cloud.svg` — the fascia lettering and the cloud mural, traced from photos of the Brixton shop.
- `research/notes.md` — research, sources and the reasoning behind the design.

Site by AlexWilder-Dev
