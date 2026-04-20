import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildClientsForSession,
  buildClientsFromCredentialConfig,
  configureHttpAuthRuntimeConfig
} from "../../src/server/auth-session-runtime.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

const masterKey = "0123456789abcdef0123456789abcdef";

function createRecord(updatedAt: string, overrides: Partial<{
  auth_id: string;
  req_base_url: string;
}> = {}) {
  return {
    auth_id: overrides.auth_id ?? "auth-1",
    token_hash: "hash-1",
    encrypted_access_key: encryptSecretValue("ak-1", masterKey),
    encrypted_secret_key: encryptSecretValue("sk-1", masterKey),
    region: "cn-north-4",
    req_base_url:
      overrides.req_base_url ?? "https://projectman-ext.cn-north-4.myhuaweicloud.com",
    repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
    pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
    check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
    testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
    deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
    build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
    artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn",
    created_at: "2026-04-20T08:00:00.000Z",
    updated_at: updatedAt,
    last_used_at: updatedAt
  };
}

describe("auth session runtime", () => {
  afterEach(() => {
    configureHttpAuthRuntimeConfig({});
  });

  it("reuses built product clients while the persisted auth config is unchanged", () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    const record = createRecord("2026-04-20T08:00:00.000Z");

    configureHttpAuthRuntimeConfig({
      repository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId: (authId: string) => (authId === "auth-1" ? record : undefined),
        revoke: () => undefined
      },
      masterKey
    });

    const first = buildClientsForSession(store, { sessionId: "session-a" });
    const second = buildClientsForSession(store, { sessionId: "session-a" });

    expect(second).toBe(first);
    expect(second.reqClient).toBe(first.reqClient);
    expect(second.pipelineClient).toBe(first.pipelineClient);
  });

  it("refreshes built product clients when the persisted auth config changes", () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    let now = 10_000;
    let record = createRecord("2026-04-20T08:00:00.000Z");

    configureHttpAuthRuntimeConfig({
      repository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId: (authId: string) => (authId === "auth-1" ? record : undefined),
        revoke: () => undefined
      },
      masterKey,
      clientCacheTtlMs: 0,
      now: () => now
    } as never);

    const first = buildClientsForSession(store, { sessionId: "session-a" });

    record = createRecord("2026-04-20T08:05:00.000Z", {
      req_base_url: "https://projectman-ext.cn-east-3.myhuaweicloud.com"
    });
    now += 1;

    const second = buildClientsForSession(store, { sessionId: "session-a" });

    expect(second).not.toBe(first);
    expect(second.reqClient).not.toBe(first.reqClient);
  });

  it("lazily creates only the accessed product client from credential config", () => {
    const created: string[] = [];
    const clients = buildClientsFromCredentialConfig(
      {
        accessKey: "ak-1",
        secretKey: "sk-1",
        reqBaseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
        repoBaseUrl: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
        pipelineBaseUrl: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
        checkBaseUrl: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
        testPlanBaseUrl: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
        deployBaseUrl: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
        buildBaseUrl: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
        artifactBaseUrl: "https://artifact.cn-north-4.myhuaweicloud.cn"
      },
      {
        createHttpClient: (options: { baseUrl: string }) => options.baseUrl,
        createArtifactClient: (baseUrl: string) => {
          created.push(`artifact:${baseUrl}`);
          return { kind: "artifact", baseUrl };
        },
        createBuildClient: (baseUrl: string) => {
          created.push(`build:${baseUrl}`);
          return { kind: "build", baseUrl };
        },
        createCheckClient: (baseUrl: string) => {
          created.push(`check:${baseUrl}`);
          return { kind: "check", baseUrl };
        },
        createDeployClient: (baseUrl: string) => {
          created.push(`deploy:${baseUrl}`);
          return { kind: "deploy", baseUrl };
        },
        createReqClient: (baseUrl: string) => {
          created.push(`req:${baseUrl}`);
          return { kind: "req", baseUrl };
        },
        createRepoClient: (baseUrl: string) => {
          created.push(`repo:${baseUrl}`);
          return { kind: "repo", baseUrl };
        },
        createPipelineClient: (baseUrl: string) => {
          created.push(`pipeline:${baseUrl}`);
          return { kind: "pipeline", baseUrl };
        },
        createTestPlanClient: (baseUrl: string) => {
          created.push(`testplan:${baseUrl}`);
          return { kind: "testplan", baseUrl };
        }
      } as never
    );

    expect(created).toEqual([]);
    expect(clients.reqClient).toEqual({
      kind: "req",
      baseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com"
    });
    expect(created).toEqual([
      "req:https://projectman-ext.cn-north-4.myhuaweicloud.com"
    ]);
  });

  it("reuses cached clients without re-reading the repository inside the revalidation window", () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    let now = 1_000;
    const record = createRecord("2026-04-20T08:00:00.000Z");
    const findActiveByAuthId = vi.fn((authId: string) =>
      authId === "auth-1" ? record : undefined
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

  it("uses a longer default revalidation window to avoid repeated repository reads", () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    let now = 1_000;
    const record = createRecord("2026-04-20T08:00:00.000Z");
    const findActiveByAuthId = vi.fn((authId: string) =>
      authId === "auth-1" ? record : undefined
    );

    configureHttpAuthRuntimeConfig({
      repository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId,
        revoke: () => undefined
      },
      masterKey,
      now: () => now
    } as never);

    const first = buildClientsForSession(store, { sessionId: "session-a" });
    now += 4_000;
    const second = buildClientsForSession(store, { sessionId: "session-a" });

    expect(second).toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(1);
  });

  it("revalidates cached clients after the revalidation window expires", () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    let now = 10_000;
    let record = createRecord("2026-04-20T08:00:00.000Z");
    const findActiveByAuthId = vi.fn((authId: string) =>
      authId === "auth-1" ? record : undefined
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
    record = createRecord("2026-04-20T08:05:00.000Z");
    now += 5_001;
    const second = buildClientsForSession(store, { sessionId: "session-a" });

    expect(second).not.toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(2);
  });
});
