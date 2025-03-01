import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import react from "@astrojs/react";
import readingTime from "astro-reading-time";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    icon(),
    expressiveCode({
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
      },
    }),
    readingTime(), // Keep it before `mdx` integration
    mdx(),
  ],

  site: "https://pacamara-astro-6y7xr.kinsta.page",
});
