import { describe, expect, it } from "vitest";
import { createAuthContextResolver } from "../../src/server/auth-context.js";

describe("auth context resolver", () => {
  it("prefers Authorization bearer tokens over cookies", async () => {
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash: async (hash: string) =>
          hash === "bearer-hash" ? { auth_id: "auth-bearer" } : undefined
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: (raw: string) => (raw === "token-a" ? "bearer-hash" : "cookie-hash")
    });

    const result = await resolver.resolve({
      headers: {
        authorization: "Bearer token-a",
        cookie: "codearts_mcp_auth=token-b"
      }
    });

    expect(result?.authId).toBe("auth-bearer");
  });

  it("falls back to cookie tokens when bearer tokens are absent", async () => {
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash: async (hash: string) =>
          hash === "cookie-hash" ? { auth_id: "auth-cookie" } : undefined
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: () => "cookie-hash"
    });

    const result = await resolver.resolve({
      headers: {
        cookie: "codearts_mcp_auth=token-b"
      }
    });

    expect(result?.authId).toBe("auth-cookie");
  });
});
