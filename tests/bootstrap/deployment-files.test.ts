import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

describe("deployment assets", () => {
  it("contains docker deployment files", () => {
    expect(existsSync("Dockerfile")).toBe(true);
    expect(existsSync(".dockerignore")).toBe(true);
  });

  it("contains a pm2 config for shared http mode", () => {
    expect(existsSync("ecosystem.config.cjs")).toBe(true);

    const content = readFileSync("ecosystem.config.cjs", "utf8");
    expect(content).toContain("MCP_TRANSPORT: \"http\"");
    expect(content).toContain("dist/src/server/index.js");
  });
});
