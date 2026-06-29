import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://amazonicatropical.com',

  // output: 'hybrid' → páginas .astro se pre-renderizan (SSG) por defecto,
  // pero las rutas marcadas con `export const prerender = false` (ej. API route
  // de contacto) corren en servidor. Requiere el adapter de Node.
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),

  // i18n nativo de Astro. prefixDefaultLocale: true genera /es/ y /en/
  // explícitamente (mejor SEO multi-idioma que dejar el default sin prefijo).
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: 'manual'
  },

  integrations: [
    tailwind(),
  ],

  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
