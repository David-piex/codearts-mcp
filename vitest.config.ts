import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: [...configDefaults.exclude, "dist/**", "tests/**/*live*.test.ts"],
    pool: "threads",
    clearMocks: true,
    restoreMocks: true
  }
});
