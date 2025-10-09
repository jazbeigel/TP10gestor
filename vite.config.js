import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'prop-types': fileURLToPath(new URL('./prop-types/index.js', import.meta.url)),
    },
  },
})
