import { afterEach, describe, expect, it, vi } from "vitest";
import { createAuthContextResolver } from "../../src/server/auth-context.js";
import {
  buildClientsForSession,
  configureHttpAuthRuntimeConfig
} from "../../src/server/auth-session-runtime.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import { createSessionAwareHandler } from "../../src/server/session-aware-handler.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

const masterKey = "0123456789abcdef0123456789abcdef";

describe("performance baselines", () => {
  afterEach(() => {
    configureHttpAuthRuntimeConfig({});
  });

  it("keeps repeated token resolution to a single repository lookup within the cache window", async () => {
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
        ? {
            auth_id: "auth-1",
            token_hash: "hash-1",
            encrypted_access_key: encryptSecretValue("ak-1", masterKey),
            encrypted_secret_key: encryptSecretValue("sk-1", masterKey),
            region: "cn-north-4",
            req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
            repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
            pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
            check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
            testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
            deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
            build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
            artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn",
            created_at: "2026-04-20T08:00:00.000Z",
            updated_at: "2026-04-20T08:00:00.000Z",
            last_used_at: "2026-04-20T08:00:00.000Z"
          }
        : undefined
    );

    configureHttpAuthRuntimeConfig({
      repository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId,
        revoke: () => undefined
      },
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
