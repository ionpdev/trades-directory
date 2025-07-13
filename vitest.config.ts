/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import { resolve } from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    reporters: ["default"],
    coverage: {
      reporter: ["text", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/stories/**",
      ],
    },
  },
})
