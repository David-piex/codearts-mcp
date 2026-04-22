import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildClientsForSession,
  configureHttpAuthRuntimeConfig
} from "../../src/server/auth-session-runtime.js";
import { createSessionAwareHandler } from "../../src/server/session-aware-handler.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";
import { createResolver } from "./auth-context-test-helpers.js";
import {
  createAuthRepositoryStub,
  createPersistedAuthRecord,
  masterKey
} from "./http-test-helpers.js";

describe("performance baselines", () => {
  afterEach(() => {
    configureHttpAuthRuntimeConfig({});
  });

  it("keeps repeated token resolution to a single repository lookup within the cache window", async () => {
    let now = 1_000;
    const findByTokenHash = vi.fn(async () => ({ auth_id: "auth-cookie" }));
    const resolver = createResolver({
      repository: {
        findByTokenHash
      },
      cacheTtlMs: 5_000,
      now: () => now
    });

    await resolver.resolve({
      headers: {
        cookie: "codearts_mcp_auth=token-b"
      }
    });
    now += 100;
    await resolver.resolve({
      headers: {
        cookie: "codearts_mcp_auth=token-b"
      }
    });

    expect(findByTokenHash).toHaveBeenCalledTimes(1);
  });

  it("keeps repeated session client resolution to a single repository read within the revalidation window", () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    let now = 10_000;
    const findActiveByAuthId = vi.fn((authId: string) =>
      authId === "auth-1"
        ? createPersistedAuthRecord({
            created_at: "2026-04-20T08:00:00.000Z",
            updated_at: "2026-04-20T08:00:00.000Z",
            last_used_at: "2026-04-20T08:00:00.000Z"
          })
        : undefined
    );

    configureHttpAuthRuntimeConfig({
      repository: createAuthRepositoryStub({
        findActiveByAuthId
      }),
      masterKey,
      clientCacheTtlMs: 5_000,
      now: () => now
    } as never);

    const first = buildClientsForSession(store, { sessionId: "session-a" });
    now += 100;
    const second = buildClientsForSession(store, { sessionId: "session-a" });

    expect(second).toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(1);
  });

  it("keeps repeated handler execution to a single derived product handler build for the same client", async () => {
    const runtimeClient = { kind: "runtime" };
    const getClient = vi.fn(() => runtimeClient);
    const createProductHandler = vi.fn((client: { kind: string }) => {
      return async (input: unknown) => ({ client, input });
    });
    const handler = createSessionAwareHandler({
      getClient,
      createProductHandler
    });

    await handler({ page: 1 }, { sessionId: "session-a" });
    await handler({ page: 2 }, { sessionId: "session-a" });

    expect(createProductHandler).toHaveBeenCalledTimes(1);
  });
});
