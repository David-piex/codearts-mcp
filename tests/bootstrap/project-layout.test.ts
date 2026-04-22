import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

describe("project bootstrap", () => {
  it("contains the required root files", () => {
    expect(existsSync("package.json")).toBe(true);
    expect(existsSync("tsconfig.json")).toBe(true);
    expect(existsSync(".env.example")).toBe(true);
    expect(existsSync("README.md")).toBe(true);
  });

  it("defines MCP development scripts", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.scripts.dev).toBe("tsx src/server/index.ts");
    expect(pkg.scripts.test).toBe("vitest run --no-isolate");
    expect(pkg.scripts["test:isolate"]).toBe("vitest run");
    expect(pkg.type).toBe("module");
  });

  it("ignores generic tmp artifacts in git", () => {
    const gitignore = readFileSync(".gitignore", "utf8");

    expect(gitignore).toMatch(/^tmp-\*$/m);
  });
});
