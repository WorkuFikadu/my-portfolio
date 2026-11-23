import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If deploying on Vercel, base is root '/', if GitHub Pages, it can use '/my-portfolio/' or relative './'
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : (process.env.NODE_ENV === 'production' && !process.env.VERCEL ? '/my-portfolio/' : './'),
})
