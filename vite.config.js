import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // CRUCIAL: Setting the base path to the repository name for GitHub Pages
  base: '/prasamita-portfolio-new/', 
  plugins: [react()],
});