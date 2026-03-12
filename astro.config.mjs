import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://sidequeststofreedom.com',
  integrations: [mdx(), pagefind()],
});
