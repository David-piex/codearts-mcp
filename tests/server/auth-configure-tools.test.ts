import { afterEach, describe, expect, it, vi } from "vitest";
import { createConfigureSessionHandlerWithPersistence } from "../../src/server/create-server.js";
import {
  getCurrentRequestDiagnostics,
  runWithRequestDiagnostics
} from "../../src/server/request-context.js";
import { createFixedWindowRateLimiter } from "../../src/server/rate-limiter.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";
import { createAuthRepositoryStub, masterKey } from "./http-test-helpers.js";

function createConfigureSessionInput(overrides: Record<string, unknown> = {}) {
  return {
    access_key: "ak-1",
    secret_key: "sk-1",
    region: "cn-north-4",
    ...overrides
  };
}

function createExplicitEndpointOverrides(overrides: Record<string, unknown> = {}) {
  return {
    req_base_url: "https://req.example.com",
    repo_base_url: "https://repo.example.com",
    pipeline_base_url: "https://pipeline.example.com",
    check_base_url: "https://check.example.com",
    testplan_base_url: "https://testplan.example.com",
    deploy_base_url: "https://deploy.example.com",
    build_base_url: "https://build.example.com",
    artifact_base_url: "https://artifact.example.com",
    ...overrides
  };
}

function createCredentialRotation(overrides: Record<string, unknown> = {}) {
  const accessKey = overrides.access_key ?? "ak-2";
  const secretKey = overrides.secret_key ?? "sk-2";

  return createConfigureSessionInput({
    access_key: accessKey,
    secret_key: secretKey,
    ...overrides
  });
}

function createConfigureSessionHarness(
  overrides: Partial<
    Parameters<typeof createConfigureSessionHandlerWithPersistence>[0]
  > = {}
) {
  const store = createSessionCredentialStore();
  const handler = createConfigureSessionHandlerWithPersistence({
    sessionStore: store,
    repository: createAuthRepositoryStub(),
    masterKey,
    ...overrides
  });

  return {
    store,
    handler
  };
}

function createPersistedRecordCapture() {
  let record: Record<string, unknown> | undefined;

  return {
    repository: createAuthRepositoryStub({
      upsert(nextRecord) {
        record = nextRecord;
      }
    }),
    getRecord() {
      return record;
    }
  };
}

function createPersistedRecordsCapture() {
  const records: Array<Record<string, unknown>> = [];

  return {
    records,
    repository: createAuthRepositoryStub({
      upsert(record) {
        records.push(record);
      }
    })
  };
}

describe("session auth configure tools", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("persists encrypted auth state and returns token metadata", async () => {
    const { records: persisted, repository } = createPersistedRecordsCapture();
    const { store, handler } = createConfigureSessionHarness({
      repository,
      masterKey,
      createToken: () => ({ raw: "token-1", hash: "hash-1" }),
      authTokenTtlSeconds: 60
    });

    const result = await handler(
      createConfigureSessionInput(),
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.session_id).toBe("session-a");
    expect(result.structuredContent.auth_id).toBeTypeOf("string");
    expect(result.structuredContent.token_issued).toBe(true);
    expect(result.structuredContent.auth_token).toBe("token-1");
    expect(result.structuredContent.query_token_supported).toBe(false);
    expect(result.content[0]?.text).toContain("Authorization: Bearer <token>");
    expect(result.content[0]?.text).not.toContain("/mcp?auth_token=<token>");
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

  it("records configure-session phase timings in request diagnostics", async () => {
    const { handler } = createConfigureSessionHarness({
      createToken: () => ({ raw: "token-1", hash: "hash-1" })
    });

    const diagnostics = await runWithRequestDiagnostics(async () => {
      await handler(createConfigureSessionInput(), { sessionId: "session-phase" });

      return getCurrentRequestDiagnostics();
    });

    expect(diagnostics?.phaseTimings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "auth_input_parse", durationMs: expect.any(Number) }),
        expect.objectContaining({ name: "auth_endpoint_resolve", durationMs: expect.any(Number) }),
        expect.objectContaining({ name: "auth_token_create", durationMs: expect.any(Number) }),
        expect.objectContaining({ name: "auth_credential_encrypt", durationMs: expect.any(Number) }),
        expect.objectContaining({ name: "auth_repository_upsert", durationMs: expect.any(Number) }),
        expect.objectContaining({ name: "auth_session_bind", durationMs: expect.any(Number) })
      ])
    );
  });

  it("applies explicit endpoint overrides on top of region defaults", async () => {
    const { repository, getRecord } = createPersistedRecordCapture();
    const { handler } = createConfigureSessionHarness({
      repository
    });

    await handler(
      createConfigureSessionInput({
        deploy_base_url: "https://custom-deploy.example.com"
      }),
      { sessionId: "session-b" }
    );

    expect(getRecord()).toMatchObject({
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://custom-deploy.example.com"
    });
  });

  it("still accepts callers that provide every endpoint explicitly", async () => {
    const { repository, getRecord } = createPersistedRecordCapture();
    const { handler } = createConfigureSessionHarness({
      repository
    });

    await handler(
      createConfigureSessionInput(createExplicitEndpointOverrides()),
      { sessionId: "session-c" }
    );

    expect(getRecord()).toMatchObject(createExplicitEndpointOverrides());
  });

  it("rejects malformed regions", async () => {
    const { handler } = createConfigureSessionHarness();

    await expect(
      handler(
        createConfigureSessionInput({
          region: "bad region"
        }),
        { sessionId: "session-d" }
      )
    ).rejects.toThrow(/Invalid CodeArts region/);
  });

  it("rate limits repeated auth configure writes within the same window", async () => {
    const { records: persisted, repository } = createPersistedRecordsCapture();
    let now = 1_000;
    const { handler } = createConfigureSessionHarness({
      repository,
      masterKey,
      createToken: () => ({
        raw: `token-${persisted.length + 1}`,
        hash: `hash-${persisted.length + 1}`
      }),
      rateLimiter: createFixedWindowRateLimiter({
        maxRequests: 2,
        windowMs: 60_000,
        now: () => now
      })
    });

    await handler(createConfigureSessionInput(), { sessionId: "session-limited" });
    now += 100;
    await handler(
      createCredentialRotation(),
      { sessionId: "session-limited" }
    );

    await expect(
      handler(
        createCredentialRotation({
          access_key: "ak-3",
          secret_key: "sk-3"
        }),
        { sessionId: "session-limited" }
      )
    ).rejects.toThrow(/Too many auth_configure_session requests/);

    expect(persisted).toHaveLength(2);
  });

  it("allows auth configure writes again after the rate limit window resets", async () => {
    let now = 5_000;
    const { handler } = createConfigureSessionHarness({
      createToken: () => ({ raw: `token-${now}`, hash: `hash-${now}` }),
      rateLimiter: createFixedWindowRateLimiter({
        maxRequests: 1,
        windowMs: 60_000,
        now: () => now
      })
    });

    await handler(createConfigureSessionInput(), { sessionId: "session-window" });

    await expect(
      handler(
        createCredentialRotation(),
        { sessionId: "session-window" }
      )
    ).rejects.toThrow(/Too many auth_configure_session requests/);

    now += 60_001;

    await expect(
      handler(
        createCredentialRotation({
          access_key: "ak-3",
          secret_key: "sk-3"
        }),
        { sessionId: "session-window" }
      )
    ).resolves.toMatchObject({
      structuredContent: {
        configured: true,
        session_id: "session-window"
      }
    });
  });
});
