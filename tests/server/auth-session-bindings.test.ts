import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createClearSessionHandlerWithPersistence,
  createSessionAwareReqProjectsHandler
} from "../../src/server/create-server.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import {
  bootstrapHttpRuntime,
  createAuthContext,
  createAuthRepositoryStub,
  createBoundSessionStore,
  createPersistedAuthRecord,
  masterKey,
  stubJsonFetch
} from "./http-test-helpers.js";

function createProjectsPayload() {
  return {
    projects: [
      {
        project_id: "project-1",
        name: "Codearts-mcp"
      }
    ],
    total: 1
  };
}

function createReqProjectsInput() {
  return {
    page: 1,
    page_size: 20
  };
}

function createSessionAwareReqProjectsContext(
  authId: string,
  overrides: Record<string, unknown> = {}
) {
  return {
    sessionId: "session-refresh",
    authInfo: {
      authId
    },
    ...overrides
  } as never;
}

function createActiveAuthRecord(authId = "auth-1") {
  return createPersistedAuthRecord({
    auth_id: authId,
    token_hash: `hash-${authId}`,
    encrypted_access_key: encryptSecretValue(`ak-${authId}`, masterKey),
    encrypted_secret_key: encryptSecretValue(`sk-${authId}`, masterKey),
    created_at: "2026-04-19T10:00:00.000Z",
    updated_at: "2026-04-19T10:00:00.000Z",
    last_used_at: "2026-04-19T10:00:00.000Z"
  });
}

function bootstrapReqProjectsHandler(options?: {
  store?: ReturnType<typeof createBoundSessionStore>;
  activeAuthIds?: string[];
}) {
  const store = options?.store ?? createBoundSessionStore("session-temp", "auth-temp");
  const fetchMock = stubJsonFetch(createProjectsPayload());

  bootstrapHttpRuntime({
    store,
    authRepository: createAuthRepositoryStub({
      findActiveByAuthId: (authId) =>
        options?.activeAuthIds?.includes(authId) ?? authId === "auth-1"
          ? createActiveAuthRecord(authId)
          : undefined
    })
  });

  return {
    store,
    fetchMock,
    handler: createSessionAwareReqProjectsHandler(store)
  };
}

describe("session auth bindings", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("revokes stored auth identity for the current session", async () => {
    const store = createBoundSessionStore();
    let revoked: { authId: string; revokedAt: string } | undefined;
    const handler = createClearSessionHandlerWithPersistence({
      sessionStore: store,
      repository: createAuthRepositoryStub({
        revoke: (authId, revokedAt) => {
          revoked = { authId, revokedAt };
        }
      })
    });

    const result = await handler({}, { sessionId: "session-a" });

    expect(result.structuredContent.cleared).toBe(true);
    expect(revoked?.authId).toBe("auth-1");
    expect(store.getAuthId("session-a")).toBeUndefined();
  });

  it("resolves business tool clients from request auth identity without a pre-bound session", async () => {
    const store = createBoundSessionStore("session-temp", "auth-temp");
    store.clear("session-temp");
    const { fetchMock, handler } = bootstrapReqProjectsHandler({ store });

    await expect(
      handler(
        createReqProjectsInput(),
        createAuthContext("auth-1")
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

  it("clears stale session bindings when the persisted auth identity is no longer active", async () => {
    const store = createBoundSessionStore("session-stale", "auth-stale");

    bootstrapHttpRuntime({ store });

    const handler = createSessionAwareReqProjectsHandler(store);

    await expect(
      handler(
        createReqProjectsInput(),
        {
          sessionId: "session-stale"
        }
      )
    ).rejects.toThrow(/No Huawei Cloud credentials configured for auth identity auth-stale/);

    expect(store.getAuthId("session-stale")).toBeUndefined();
  });

  it("refreshes a session binding when a new request auth identity is presented", async () => {
    const store = createBoundSessionStore("session-temp", "auth-temp");
    store.clear("session-temp");
    const { fetchMock, handler } = bootstrapReqProjectsHandler({
      store,
      activeAuthIds: ["auth-1", "auth-2"]
    });

    await expect(
      handler(
        createReqProjectsInput(),
        createSessionAwareReqProjectsContext("auth-1")
      )
    ).resolves.toBeTruthy();
    expect(store.getAuthId("session-refresh")).toBe("auth-1");

    await expect(
      handler(
        createReqProjectsInput(),
        createSessionAwareReqProjectsContext("auth-2")
      )
    ).resolves.toBeTruthy();

    expect(store.getAuthId("session-refresh")).toBe("auth-2");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
