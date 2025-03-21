import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      external: [] // Ensure Okta is bundled properly
    }
  }
});
