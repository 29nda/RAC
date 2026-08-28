// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

const SITE = process.env.PUBLIC_SITE_URL || 'https://ropeaccesscenter.id';

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: { enabled: true },
  }),
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  compressHTML: true,
  vite: {
    // Cast: @tailwindcss/vite resolves its own Vite copy, so the Plugin
    // types are structurally identical but nominally distinct.
    plugins: [/** @type {any} */ (tailwindcss())],
    build: {
      cssMinify: 'lightningcss',
      minify: 'esbuild',
      assetsInlineLimit: 2048,
    },
  },
});
