import { describe, expect, it } from "vitest";
import { resolveServerMode } from "../../src/server/index.js";

describe("resolveServerMode", () => {
  it("defaults to stdio mode", () => {
    expect(resolveServerMode({})).toBe("stdio");
  });

  it("switches to http mode when requested", () => {
    expect(resolveServerMode({ MCP_TRANSPORT: "http" })).toBe("http");
  });
});
