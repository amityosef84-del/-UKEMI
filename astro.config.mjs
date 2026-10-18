// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the production domain once it is decided.
const SITE_URL = 'https://www.ukemi.example';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
