import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*live*.test.ts"],
    exclude: ["dist/**"],
    pool: "threads",
    clearMocks: true,
    restoreMocks: true
  }
});
