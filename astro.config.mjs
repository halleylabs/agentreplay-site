import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://anzal1.github.io",
  base: "/agentreplay-site",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ]
});
