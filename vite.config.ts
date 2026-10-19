import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The address the site is published at. index.html is written with the planned URL;
// the Pages workflow passes the real one, so assets and link-preview URLs always match where it is served.
const PLANNED_URL = 'https://alexwilder-dev.github.io/nuvola-pizza/'
const SITE_URL = (process.env.SITE_URL ?? PLANNED_URL).replace(/\/?$/, '/')

export default defineConfig({
  base: new URL(SITE_URL).pathname,
  plugins: [
    react(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll(PLANNED_URL, SITE_URL),
    },
  ],
})
