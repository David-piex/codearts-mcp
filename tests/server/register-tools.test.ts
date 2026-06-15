import { describe, expect, it } from "vitest";
import { collectToolNames, createServerInfo } from "../../src/server/register-tools.js";
import { expectedToolNames } from "./expected-tool-names.js";

describe("collectToolNames", () => {
  it("exposes all phase 1 tool names", () => {
    expect(collectToolNames()).toEqual(expectedToolNames);
  });

  it("can expose only selected product-family tool names", () => {
    const filtered = collectToolNames({
      families: ["req", "repo"]
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((name) => name.startsWith("req_") || name.startsWith("repo_"))).toBe(
      true
    );
  });

  it("builds server info from config values", () => {
    expect(
      createServerInfo({
        serverName: "codearts-mcp",
        serverVersion: "0.1.0"
      })
    ).toEqual({
      name: "codearts-mcp",
      version: "0.1.0"
    });
  });
});
