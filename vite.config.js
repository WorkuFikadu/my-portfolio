import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If deploying on Vercel, base is root '/', if GitHub Pages, it uses '/my-portfolio/'
export default defineConfig({
  plugins: [react()],
  base: (process.env.VERCEL || process.env.VERCEL_ENV) ? '/' : '/my-portfolio/',
})
