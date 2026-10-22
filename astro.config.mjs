// @ts-check
import { defineConfig } from 'astro/config';

// Cambia `site` por el dominio definitivo cuando exista.
export default defineConfig({
  site: 'https://ligianaula.example',
  trailingSlash: 'never',
  build: { format: 'file' },
});
