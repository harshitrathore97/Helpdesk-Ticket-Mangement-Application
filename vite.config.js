import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets load cleanly on GitHub Pages, subpaths, and root domains
});
