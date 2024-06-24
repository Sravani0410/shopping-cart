import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [react(), tailwind(),preact()]
});