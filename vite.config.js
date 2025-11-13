import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This line is CRITICAL for GitHub Pages. It tells the bundler where to find assets.
  // The path must match your repository name exactly.
  base: '/prasamita-portfolio-new/',
  plugins: [react()],
})