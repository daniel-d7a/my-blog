import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), react(), icon()],
  site: "https://pacamara-astro-6y7xr.kinsta.page",
});
