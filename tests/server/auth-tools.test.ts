import { describe, expect, it } from "vitest";
import {
  createConfigureSessionHandlerWithPersistence,
  createClearSessionHandlerWithPersistence
} from "../../src/server/create-server.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("session auth tools", () => {
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
});
