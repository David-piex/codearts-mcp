import { describe, expect, it } from "vitest";
import { collectToolNames, createServerInfo } from "../../src/server/register-tools.js";
import { expectedToolNames } from "./expected-tool-names.js";

describe("collectToolNames", () => {
  it("exposes all phase 1 tool names", () => {
    expect(collectToolNames()).toEqual(expectedToolNames);
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
