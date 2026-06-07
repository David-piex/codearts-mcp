import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: [...configDefaults.exclude, "dist/**", "tests/**/*live*.test.ts"],
    pool: "threads",
    testTimeout: 15_000,
    clearMocks: true,
    restoreMocks: true
  }
});
