import { defineConfig } from "vitest/config";

// Standalone config (no Nuxt/Vite plugins) so `vitest` only runs the plain
// server/utils unit tests without trying to build the Nuxt app.
export default defineConfig({
  plugins: [],
  test: {
    include: ["server/utils/__tests__/**/*.test.ts"],
    environment: "node",
  },
});
