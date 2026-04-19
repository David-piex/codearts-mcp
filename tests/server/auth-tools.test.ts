import { describe, expect, it, vi, afterEach } from "vitest";
import {
  createServer,
  createConfigureSessionHandlerWithPersistence,
  createClearSessionHandlerWithPersistence,
  createSessionAwareReqProjectsHandler
} from "../../src/server/create-server.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("session auth tools", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("persists encrypted auth state and returns token metadata", async () => {
    const store = createSessionCredentialStore();
    const persisted: Array<Record<string, unknown>> = [];
    const handler = createConfigureSessionHandlerWithPersistence({
      sessionStore: store,
      repository: {
        upsert: (record) => {
          persisted.push(record);
        },
        findByTokenHash: () => undefined,
        findActiveByAuthId: () => undefined,
        revoke: () => undefined
      },
      masterKey: "0123456789abcdef0123456789abcdef",
      createToken: () => ({ raw: "token-1", hash: "hash-1" }),
      authTokenTtlSeconds: 60
    });

    const result = await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4"
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.session_id).toBe("session-a");
    expect(result.structuredContent.auth_id).toBeTypeOf("string");
    expect(result.structuredContent.token_issued).toBe(true);
    expect(store.getAuthId("session-a")).toBe(result.structuredContent.auth_id);
    expect(persisted).toHaveLength(1);
    expect(persisted[0]).toMatchObject({
      auth_id: result.structuredContent.auth_id,
      token_hash: "hash-1",
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com"
    });
  });

  it("applies explicit endpoint overrides on top of region defaults", async () => {
    const store = createSessionCredentialStore();
    let persistedRecord: Record<string, unknown> | undefined;
    const handler = createConfigureSessionHandlerWithPersistence({
      sessionStore: store,
      repository: {
        upsert: (record) => {
          persistedRecord = record;
        },
        findByTokenHash: () => undefined,
        findActiveByAuthId: () => undefined,
        revoke: () => undefined
      },
      masterKey: "0123456789abcdef0123456789abcdef"
    });

    await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4",
        deploy_base_url: "https://custom-deploy.example.com"
      },
      { sessionId: "session-b" }
    );

    expect(persistedRecord).toMatchObject({
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://custom-deploy.example.com"
    });
  });

  it("still accepts callers that provide every endpoint explicitly", async () => {
    const store = createSessionCredentialStore();
    let persistedRecord: Record<string, unknown> | undefined;
    const handler = createConfigureSessionHandlerWithPersistence({
      sessionStore: store,
      repository: {
        upsert: (record) => {
          persistedRecord = record;
        },
        findByTokenHash: () => undefined,
        findActiveByAuthId: () => undefined,
        revoke: () => undefined
      },
      masterKey: "0123456789abcdef0123456789abcdef"
    });

    await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4",
        req_base_url: "https://req.example.com",
        repo_base_url: "https://repo.example.com",
        pipeline_base_url: "https://pipeline.example.com",
        check_base_url: "https://check.example.com",
        testplan_base_url: "https://testplan.example.com",
        deploy_base_url: "https://deploy.example.com",
        build_base_url: "https://build.example.com",
        artifact_base_url: "https://artifact.example.com"
      },
      { sessionId: "session-c" }
    );

    expect(persistedRecord).toMatchObject({
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com"
    });
  });

  it("rejects malformed regions", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandlerWithPersistence({
      sessionStore: store,
      repository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId: () => undefined,
        revoke: () => undefined
      },
      masterKey: "0123456789abcdef0123456789abcdef"
    });

    await expect(
      handler(
        {
          access_key: "ak-1",
          secret_key: "sk-1",
          region: "bad region"
        },
        { sessionId: "session-d" }
      )
    ).rejects.toThrow(/Invalid CodeArts region/);
  });

  it("revokes stored auth identity for the current session", async () => {
    const store = createSessionCredentialStore();
    store.bind("session-a", "auth-1");
    let revoked: { authId: string; revokedAt: string } | undefined;
    const handler = createClearSessionHandlerWithPersistence({
      sessionStore: store,
      repository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId: () => undefined,
        revoke: (authId, revokedAt) => {
          revoked = { authId, revokedAt };
        }
      }
    });

    const result = await handler({}, { sessionId: "session-a" });

    expect(result.structuredContent.cleared).toBe(true);
    expect(revoked?.authId).toBe("auth-1");
    expect(store.getAuthId("session-a")).toBeUndefined();
  });

  it("resolves business tool clients from request auth identity without a pre-bound session", async () => {
    const store = createSessionCredentialStore();
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          projects: [
            {
              project_id: "project-1",
              name: "Codearts-mcp"
            }
          ],
          total: 1
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    createServer({
      mode: "http",
      config: {
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000
      },
      sessionStore: store,
      authRepository: {
        upsert: () => undefined,
        findByTokenHash: () => undefined,
        findActiveByAuthId: (authId) =>
          authId === "auth-1"
            ? {
                auth_id: "auth-1",
                token_hash: "hash-1",
                encrypted_access_key: encryptSecretValue(
                  "ak-1",
                  "0123456789abcdef0123456789abcdef"
                ),
                encrypted_secret_key: encryptSecretValue(
                  "sk-1",
                  "0123456789abcdef0123456789abcdef"
                ),
                region: "cn-north-4",
                req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
                repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
                pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
                check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
                testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
                deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
                build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
                artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn",
                created_at: "2026-04-19T10:00:00.000Z",
                updated_at: "2026-04-19T10:00:00.000Z",
                last_used_at: "2026-04-19T10:00:00.000Z"
              }
            : undefined,
        revoke: () => undefined
      },
      authMasterKey: "0123456789abcdef0123456789abcdef"
    });

    const handler = createSessionAwareReqProjectsHandler(store);

    await expect(
      handler(
        {
          page: 1,
          page_size: 20
        },
        {
          authInfo: {
            authId: "auth-1"
          }
        } as never
      )
    ).resolves.toMatchObject({
      structuredContent: {
        items: [
          {
            id: "project-1",
            name: "Codearts-mcp"
          }
        ]
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
