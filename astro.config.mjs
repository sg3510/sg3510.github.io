import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://sebgrubb.com',
  integrations: [react()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkGfm],
  },
});
