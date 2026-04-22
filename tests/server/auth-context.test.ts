import { describe, expect, it, vi } from "vitest";
import { createResolveInput, createResolver } from "./auth-context-test-helpers.js";

describe("auth context resolver", () => {
  it("prefers Authorization bearer tokens over cookies", async () => {
    const resolver = createResolver({
      repository: {
        findByTokenHash: async (hash: string) =>
          hash === "bearer-hash" ? { auth_id: "auth-bearer" } : undefined
      },
      hashToken: (raw: string) => (raw === "token-a" ? "bearer-hash" : "cookie-hash")
    });

    const result = await resolver.resolve({
      ...createResolveInput({
        bearerToken: "token-a",
        cookieToken: "token-b"
      })
    });

    expect(result?.authId).toBe("auth-bearer");
  });

  it("falls back to cookie tokens when bearer tokens are absent", async () => {
    const resolver = createResolver({
      repository: {
        findByTokenHash: async (hash: string) =>
          hash === "cookie-hash" ? { auth_id: "auth-cookie" } : undefined
      }
    });

    const result = await resolver.resolve({
      ...createResolveInput({
        cookieToken: "token-b"
      })
    });

    expect(result?.authId).toBe("auth-cookie");
  });

  it("falls back to query tokens when bearer and cookie tokens are absent", async () => {
    const resolver = createResolver({
      repository: {
        findByTokenHash: async (hash: string) =>
          hash === "query-hash" ? { auth_id: "auth-query" } : undefined
      },
      hashToken: () => "query-hash"
    });

    const result = await resolver.resolve({
      ...createResolveInput({
        queryToken: "token-q"
      })
    });

    expect(result?.authId).toBe("auth-query");
  });

  it("reuses a session-bound auth identity before re-reading cookie tokens", async () => {
    const findByTokenHash = vi.fn(async () => ({ auth_id: "auth-cookie" }));
    const resolver = createResolver({
      repository: {
        findByTokenHash
      },
      sessionStore: {
        getAuthId: (sessionId: string) =>
          sessionId === "session-bound" ? "auth-session" : undefined
      },
    });

    const result = await resolver.resolve({
      ...createResolveInput({
        sessionId: "session-bound",
        cookieToken: "token-b"
      })
    });

    expect(result).toEqual({
      authId: "auth-session"
    });
    expect(findByTokenHash).not.toHaveBeenCalled();
  });

  it("reuses cached token lookups within the resolver cache window", async () => {
    let now = 1_000;
    const findByTokenHash = vi.fn(async () => ({ auth_id: "auth-cookie" }));
    const resolver = createResolver({
      repository: {
        findByTokenHash
      },
      cacheTtlMs: 5_000,
      now: () => now
    });

    await expect(
      resolver.resolve({
        ...createResolveInput({
          cookieToken: "token-b"
        })
      })
    ).resolves.toEqual({
      authId: "auth-cookie",
      rawToken: "token-b"
    });

    now += 100;

    await expect(
      resolver.resolve({
        ...createResolveInput({
          cookieToken: "token-b"
        })
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
    const resolver = createResolver({
      repository: {
        findByTokenHash
      },
      cacheTtlMs: 5_000,
      now: () => now
    });

    await expect(
      resolver.resolve({
        ...createResolveInput({
          cookieToken: "token-b"
        })
      })
    ).resolves.toEqual({
      authId: "auth-cookie-1",
      rawToken: "token-b"
    });

    now += 5_001;

    await expect(
      resolver.resolve({
        ...createResolveInput({
          cookieToken: "token-b"
        })
      })
    ).resolves.toEqual({
      authId: "auth-cookie-2",
      rawToken: "token-b"
    });

    expect(findByTokenHash).toHaveBeenCalledTimes(2);
  });

  it("rejects expired tokens returned from persistence", async () => {
    const touchByTokenHash = vi.fn();
    const resolver = createResolver({
      repository: {
        findByTokenHash: async () => ({
          auth_id: "auth-expired",
          expires_at: "2026-04-20T00:00:00.000Z"
        }),
        touchByTokenHash
      },
      hashToken: () => "expired-hash",
      now: () => Date.parse("2026-04-21T00:00:00.000Z")
    });

    await expect(
      resolver.resolve({
        ...createResolveInput({
          cookieToken: "token-expired"
        })
      })
    ).resolves.toBeUndefined();

    expect(touchByTokenHash).not.toHaveBeenCalled();
  });

  it("renews cookie tokens that are inside the renewal window", async () => {
    const touchByTokenHash = vi.fn();
    const resolver = createResolver({
      repository: {
        findByTokenHash: async () => ({
          auth_id: "auth-cookie",
          expires_at: "2026-04-21T00:00:05.000Z"
        }),
        touchByTokenHash
      },
      now: () => Date.parse("2026-04-21T00:00:00.000Z"),
      authTokenTtlMs: 60_000,
      renewalWindowMs: 10_000
    });

    await expect(
      resolver.resolve({
        ...createResolveInput({
          cookieToken: "token-cookie"
        })
      })
    ).resolves.toEqual({
      authId: "auth-cookie",
      rawToken: "token-cookie"
    });

    expect(touchByTokenHash).toHaveBeenCalledWith("cookie-hash", {
      lastUsedAt: "2026-04-21T00:00:00.000Z",
      updatedAt: "2026-04-21T00:00:00.000Z",
      expiresAt: "2026-04-21T00:01:00.000Z"
    });
  });

  it("renews bearer tokens that are inside the renewal window", async () => {
    const touchByTokenHash = vi.fn();
    const resolver = createResolver({
      repository: {
        findByTokenHash: async () => ({
          auth_id: "auth-bearer",
          expires_at: "2026-04-21T00:00:02.000Z"
        }),
        touchByTokenHash
      },
      hashToken: () => "bearer-hash",
      now: () => Date.parse("2026-04-21T00:00:00.000Z"),
      authTokenTtlMs: 60_000,
      renewalWindowMs: 5_000
    });

    await expect(
      resolver.resolve({
        ...createResolveInput({
          bearerToken: "token-bearer",
          cookieToken: "token-cookie"
        })
      })
    ).resolves.toEqual({
      authId: "auth-bearer",
      rawToken: "token-bearer"
    });

    expect(touchByTokenHash).toHaveBeenCalledWith("bearer-hash", {
      lastUsedAt: "2026-04-21T00:00:00.000Z",
      updatedAt: "2026-04-21T00:00:00.000Z",
      expiresAt: "2026-04-21T00:01:00.000Z"
    });
  });

  it("does not write persistence state when resolving a session-bound auth identity", async () => {
    const touchByTokenHash = vi.fn();
    const resolver = createResolver({
      repository: {
        findByTokenHash: async () => ({ auth_id: "auth-cookie" }),
        touchByTokenHash
      },
      sessionStore: {
        getAuthId: (sessionId: string) =>
          sessionId === "session-bound" ? "auth-session" : undefined
      },
      authTokenTtlMs: 60_000,
      renewalWindowMs: 5_000
    });

    await expect(
      resolver.resolve({
        ...createResolveInput({
          sessionId: "session-bound",
          cookieToken: "token-cookie"
        })
      })
    ).resolves.toEqual({
      authId: "auth-session"
    });

    expect(touchByTokenHash).not.toHaveBeenCalled();
  });
});
