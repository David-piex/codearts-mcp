import { describe, expect, it, vi } from "vitest";
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

  it("falls back to query tokens when bearer and cookie tokens are absent", async () => {
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash: async (hash: string) =>
          hash === "query-hash" ? { auth_id: "auth-query" } : undefined
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: () => "query-hash"
    });

    const result = await resolver.resolve({
      headers: {},
      queryToken: "token-q"
    });

    expect(result?.authId).toBe("auth-query");
  });

  it("reuses a session-bound auth identity before re-reading cookie tokens", async () => {
    const findByTokenHash = vi.fn(async () => ({ auth_id: "auth-cookie" }));
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash
      },
      sessionStore: {
        getAuthId: (sessionId: string) =>
          sessionId === "session-bound" ? "auth-session" : undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: () => "cookie-hash"
    });

    const result = await resolver.resolve({
      sessionId: "session-bound",
      headers: {
        cookie: "codearts_mcp_auth=token-b"
      }
    });

    expect(result).toEqual({
      authId: "auth-session"
    });
    expect(findByTokenHash).not.toHaveBeenCalled();
  });

  it("reuses cached token lookups within the resolver cache window", async () => {
    let now = 1_000;
    const findByTokenHash = vi.fn(async () => ({ auth_id: "auth-cookie" }));
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: () => "cookie-hash",
      cacheTtlMs: 5_000,
      now: () => now
    });

    await expect(
      resolver.resolve({
        headers: {
          cookie: "codearts_mcp_auth=token-b"
        }
      })
    ).resolves.toEqual({
      authId: "auth-cookie",
      rawToken: "token-b"
    });

    now += 100;

    await expect(
      resolver.resolve({
        headers: {
          cookie: "codearts_mcp_auth=token-b"
        }
      })
    ).resolves.toEqual({
      authId: "auth-cookie",
      rawToken: "token-b"
    });

    expect(findByTokenHash).toHaveBeenCalledTimes(1);
  });

  it("refreshes cached token lookups after the resolver cache window expires", async () => {
    let now = 10_000;
    const findByTokenHash = vi
      .fn(async () => ({ auth_id: "auth-cookie-1" }))
      .mockResolvedValueOnce({ auth_id: "auth-cookie-1" })
      .mockResolvedValueOnce({ auth_id: "auth-cookie-2" });
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: () => "cookie-hash",
      cacheTtlMs: 5_000,
      now: () => now
    });

    await expect(
      resolver.resolve({
        headers: {
          cookie: "codearts_mcp_auth=token-b"
        }
      })
    ).resolves.toEqual({
      authId: "auth-cookie-1",
      rawToken: "token-b"
    });

    now += 5_001;

    await expect(
      resolver.resolve({
        headers: {
          cookie: "codearts_mcp_auth=token-b"
        }
      })
    ).resolves.toEqual({
      authId: "auth-cookie-2",
      rawToken: "token-b"
    });

    expect(findByTokenHash).toHaveBeenCalledTimes(2);
  });
});
