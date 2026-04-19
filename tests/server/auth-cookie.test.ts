import { describe, expect, it } from "vitest";
import {
  parseCookieHeader,
  serializeAuthCookie
} from "../../src/server/auth-cookie.js";

describe("auth cookie", () => {
  it("serializes a cookie and reads it back", () => {
    const header = serializeAuthCookie("codearts_mcp_auth", "token-1", {
      secure: false,
      maxAgeSeconds: 60
    });

    expect(header).toContain("codearts_mcp_auth=token-1");
    expect(parseCookieHeader("codearts_mcp_auth=token-1; theme=dark")).toEqual({
      codearts_mcp_auth: "token-1",
      theme: "dark"
    });
  });
});
