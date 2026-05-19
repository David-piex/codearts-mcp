import { expect, vi } from "vitest";
import { createServer } from "../../src/server/create-server.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import type { PersistedAuthRecord } from "../../src/server/auth-repository.js";
import type { AuthRepository } from "../../src/server/auth-session-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

export const masterKey = "0123456789abcdef0123456789abcdef";

export function createPersistedAuthRecord(
  overrides: Partial<PersistedAuthRecord> = {}
): PersistedAuthRecord {
  return {
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
    created_at: "2026-04-20T10:00:00.000Z",
    updated_at: "2026-04-20T10:00:00.000Z",
    last_used_at: "2026-04-20T10:00:00.000Z",
    ...overrides
  };
}

export function createRuntimeAuthRecord(
  updatedAt = "2026-04-20T08:00:00.000Z",
  overrides: Partial<PersistedAuthRecord> = {}
): PersistedAuthRecord {
  return createPersistedAuthRecord({
    created_at: "2026-04-20T08:00:00.000Z",
    updated_at: updatedAt,
    last_used_at: updatedAt,
    ...overrides
  });
}

export function createAuthRepositoryStub(
  overrides: Partial<AuthRepository> = {}
): AuthRepository {
  return {
    upsert: (_record: PersistedAuthRecord) => undefined,
    findByTokenHash: (_tokenHash: string) => undefined,
    findActiveByAuthId: (_authId: string) => undefined,
    revoke: (_authId: string, _revokedAt: string) => undefined,
    ...overrides
  };
}

function createAuthRepository() {
  return createAuthRepositoryStub({
    findActiveByAuthId: (authId: string) =>
      authId === "auth-1" ? createPersistedAuthRecord() : undefined,
  });
}

export function bootstrapHttpRuntime(options?: {
  store?: ReturnType<typeof createSessionCredentialStore>;
  authRepository?: AuthRepository;
}) {
  const store = options?.store ?? createSessionCredentialStore();
  const authRepository = options?.authRepository ?? createAuthRepository();
  const server = createServer({
    mode: "http",
    config: {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 3000
    },
    sessionStore: store,
    authRepository,
    authMasterKey: masterKey
  });

  return {
    store,
    server
  };
}

export function configureHttpRuntime(store = createSessionCredentialStore()) {
  bootstrapHttpRuntime({ store });
  return store;
}

export function createConfiguredServer() {
  const { store: sessionStore, server } = bootstrapHttpRuntime();

  return {
    sessionStore,
    server
  };
}

export function createBoundSessionStore(sessionId = "session-a", authId = "auth-1") {
  const store = createSessionCredentialStore();
  store.bind(sessionId, authId);
  return store;
}

export function readRegisteredHandler(
  server: unknown,
  name: string
): (input: unknown, extra: unknown) => Promise<unknown> {
  const registeredTools = (server as { _registeredTools?: Record<string, { handler: Function }> })
    ._registeredTools;
  const handler = registeredTools?.[name]?.handler;

  if (!handler) {
    throw new Error(`Expected registered handler for ${name}.`);
  }

  return handler as (input: unknown, extra: unknown) => Promise<unknown>;
}

export function expectRateLimitResult(result: unknown, actionName: string) {
  expect(result).toMatchObject({
    isError: true,
    content: [
      {
        type: "text"
      }
    ],
    structuredContent: {
      category: "rate_limit",
      message: `Too many ${actionName} requests for this MCP session. Try again later.`,
      status: 429
    }
  });
  expect((result as { content?: Array<{ text?: string }> }).content?.[0]?.text).toContain(
    `Too many ${actionName} requests for this MCP session. Try again later.`
  );
}

export function jsonResponse(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  });
}

export function stubJsonFetch(payload: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  const status = init?.status ?? 200;

  if (!headers.has("content-type") && status !== 204) {
    headers.set("content-type", "application/json");
  }

  const fetchMock = vi.fn(async () => {
    return new Response(status === 204 ? null : JSON.stringify(payload), {
      status,
      ...init,
      headers
    });
  });

  vi.stubGlobal("fetch", fetchMock as typeof fetch);

  return fetchMock;
}

export function readFirstFetchCall(fetchMock: {
  mock: { calls: Array<unknown[]> };
}) {
  const [url, init] = fetchMock.mock.calls[0] as [string | URL, RequestInit];
  return {
    url,
    init,
    headers: init.headers as Record<string, string>
  };
}

export function expectSignedFetch(fetchMock: {
  mock: { calls: Array<unknown[]> };
}, expectedCalls = 1) {
  expect(fetchMock).toHaveBeenCalledTimes(expectedCalls);
  const request = readFirstFetchCall(fetchMock);

  expect(request.headers.Authorization).toContain("SDK-HMAC-SHA256");

  return request;
}

export async function executeSessionAwareHandler<TResult>(options: {
  createHandler: (store: ReturnType<typeof createSessionCredentialStore>) => (
    input: unknown,
    extra: unknown
  ) => Promise<TResult>;
  input: unknown;
  responsePayload: unknown;
  responseInit?: ResponseInit;
  authId?: string;
}) {
  const store = configureHttpRuntime();
  const fetchMock = stubJsonFetch(options.responsePayload, options.responseInit);
  const handler = options.createHandler(store);
  const result = await handler(options.input, createAuthContext(options.authId));
  const request = expectSignedFetch(fetchMock);

  return {
    store,
    result,
    fetchMock,
    request
  };
}

export async function expectSessionAwareWriteExecution<TResult>(options: {
  createHandler: (store: ReturnType<typeof createSessionCredentialStore>) => (
    input: unknown,
    extra: unknown
  ) => Promise<TResult>;
  input: unknown;
  responsePayload: unknown;
  responseInit?: ResponseInit;
  authId?: string;
  expectedItem: Record<string, unknown>;
  expectedRequest: {
    path: string;
    method?: string;
    bodyIncludes?: string[];
  };
}) {
  const { result, request } = await executeSessionAwareHandler(options);

  expect(result).toMatchObject({
    structuredContent: {
      item: options.expectedItem
    }
  });

  expect(String(request.url)).toContain(options.expectedRequest.path);
  expect(request.init.method).toBe(options.expectedRequest.method ?? "POST");

  const requestBody = String(request.init.body ?? "");
  for (const fragment of options.expectedRequest.bodyIncludes ?? []) {
    expect(requestBody).toContain(fragment);
  }

  return {
    result,
    request,
    requestBody
  };
}

export function createAuthContext(authId = "auth-1") {
  return {
    authInfo: {
      authId
    }
  } as never;
}

export function createSessionAuthContext(
  sessionId = "session-write",
  authId = "auth-1"
) {
  return {
    sessionId,
    authInfo: {
      authId
    }
  } as never;
}

export async function expectWritePathRateLimit(options: {
  toolName: string;
  responsePayload: unknown;
  allowedInput: (index: number) => unknown;
  blockedInput: unknown;
  sessionId?: string;
  authId?: string;
  responseInit?: ResponseInit;
  allowedCount?: number;
}) {
  const { server } = createConfiguredServer();
  const handler = readRegisteredHandler(server, options.toolName);
  const fetchMock = stubJsonFetch(options.responsePayload, options.responseInit);
  const context = createSessionAuthContext(options.sessionId, options.authId);
  const allowedCount = options.allowedCount ?? 3000;

  for (let index = 0; index < allowedCount; index += 1) {
    await expect(handler(options.allowedInput(index), context)).resolves.toBeTruthy();
  }

  const blockedResult = await handler(options.blockedInput, context);

  expectRateLimitResult(blockedResult, options.toolName);
  expect(fetchMock).toHaveBeenCalledTimes(allowedCount);

  return {
    handler,
    fetchMock,
    blockedResult
  };
}
