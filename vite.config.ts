import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nuvola-pizza/',
  plugins: [react()],
})
