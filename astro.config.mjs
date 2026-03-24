import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind(), icon()],

  i18n: {
    defaultLocale: "es",
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    },
    fallback: {
      en: 'es',
    }
  }
});