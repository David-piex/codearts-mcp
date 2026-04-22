import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildClientsForSession,
  buildClientsFromCredentialConfig,
  configureHttpAuthRuntimeConfig
} from "../../src/server/auth-session-runtime.js";
import {
  createAuthRepositoryStub,
  createBoundSessionStore,
  createRuntimeAuthRecord,
  masterKey
} from "./http-test-helpers.js";

const sessionId = "session-a";

function createCredentialConfig(
  overrides: Partial<Parameters<typeof buildClientsFromCredentialConfig>[0]> = {}
) {
  return {
    accessKey: "ak-1",
    secretKey: "sk-1",
    reqBaseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
    repoBaseUrl: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
    pipelineBaseUrl: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
    checkBaseUrl: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
    testPlanBaseUrl: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
    deployBaseUrl: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
    buildBaseUrl: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
    artifactBaseUrl: "https://artifact.cn-north-4.myhuaweicloud.cn",
    ...overrides
  };
}

function configureRuntimeSession(options?: {
  clientCacheTtlMs?: number;
  initialNow?: number;
  initialRecord?: ReturnType<typeof createRuntimeAuthRecord>;
}) {
  const store = createBoundSessionStore();
  let now = options?.initialNow ?? 1_000;
  let record =
    options?.initialRecord ?? createRuntimeAuthRecord("2026-04-20T08:00:00.000Z");
  const findActiveByAuthId = vi.fn((authId: string) =>
    authId === "auth-1" ? record : undefined
  );

  configureHttpAuthRuntimeConfig({
    repository: createAuthRepositoryStub({
      findActiveByAuthId
    }),
    masterKey,
    clientCacheTtlMs: options?.clientCacheTtlMs,
    now: () => now
  } as never);

  return {
    store,
    findActiveByAuthId,
    setRecord(nextRecord: ReturnType<typeof createRuntimeAuthRecord>) {
      record = nextRecord;
    },
    advanceTime(ms: number) {
      now += ms;
    }
  };
}

function buildSessionClients(store: ReturnType<typeof createBoundSessionStore>) {
  return buildClientsForSession(store, { sessionId });
}

function buildSessionClientsTwice(options: {
  runtimeOptions?: Parameters<typeof configureRuntimeSession>[0];
  advanceMs: number;
  nextRecord?: ReturnType<typeof createRuntimeAuthRecord>;
}) {
  const runtime = configureRuntimeSession(options.runtimeOptions);
  const first = buildSessionClients(runtime.store);

  if (options.nextRecord) {
    runtime.setRecord(options.nextRecord);
  }

  runtime.advanceTime(options.advanceMs);

  return {
    ...runtime,
    first,
    second: buildSessionClients(runtime.store)
  };
}

describe("auth session runtime", () => {
  afterEach(() => {
    configureHttpAuthRuntimeConfig({});
  });

  it("reuses built product clients while the persisted auth config is unchanged", () => {
    const { store } = configureRuntimeSession();

    const first = buildSessionClients(store);
    const second = buildSessionClients(store);

    expect(second).toBe(first);
    expect(second.reqClient).toBe(first.reqClient);
    expect(second.pipelineClient).toBe(first.pipelineClient);
  });

  it("refreshes built product clients when the persisted auth config changes", () => {
    const { first, second } = buildSessionClientsTwice({
      runtimeOptions: {
        clientCacheTtlMs: 0,
        initialNow: 10_000
      },
      advanceMs: 1,
      nextRecord: createRuntimeAuthRecord("2026-04-20T08:05:00.000Z", {
        req_base_url: "https://projectman-ext.cn-east-3.myhuaweicloud.com"
      })
    });

    expect(second).not.toBe(first);
    expect(second.reqClient).not.toBe(first.reqClient);
  });

  it("lazily creates only the accessed product client from credential config", () => {
    const created: string[] = [];
    const clients = buildClientsFromCredentialConfig(
      createCredentialConfig(),
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

  it("passes tiered read-cache TTLs into downstream product client builders", () => {
    const capturedOptions: Record<string, unknown> = {};

    const clients = buildClientsFromCredentialConfig(
      createCredentialConfig({
        readCacheTtls: {
          reqListProjectsMs: 60_000,
          repoListRepositoriesMs: 55_000,
          pipelineListPipelinesMs: 5_000,
          buildListJobsMs: 4_000
        }
      }),
      {
        createHttpClient: (options: { baseUrl: string }) => options.baseUrl,
        createArtifactClient: () => ({ kind: "artifact" }),
        createBuildClient: (_baseUrl: string, options?: unknown) => {
          capturedOptions.build = options;
          return { kind: "build" };
        },
        createCheckClient: () => ({ kind: "check" }),
        createDeployClient: () => ({ kind: "deploy" }),
        createReqClient: (_baseUrl: string, options?: unknown) => {
          capturedOptions.req = options;
          return { kind: "req" };
        },
        createRepoClient: (_baseUrl: string, options?: unknown) => {
          capturedOptions.repo = options;
          return { kind: "repo" };
        },
        createPipelineClient: (_baseUrl: string, options?: unknown) => {
          capturedOptions.pipeline = options;
          return { kind: "pipeline" };
        },
        createTestPlanClient: () => ({ kind: "testplan" })
      } as never
    );

    void clients.reqClient;
    void clients.repoClient;
    void clients.pipelineClient;
    void clients.buildClient;

    expect(capturedOptions).toEqual({
      req: { listCacheTtlMs: 60_000 },
      repo: { listCacheTtlMs: 55_000 },
      pipeline: { listCacheTtlMs: 5_000 },
      build: { listCacheTtlMs: 4_000 }
    });
  });

  it("reuses cached clients without re-reading the repository inside the revalidation window", () => {
    const { first, second, findActiveByAuthId } = buildSessionClientsTwice({
      runtimeOptions: {
        clientCacheTtlMs: 5_000
      },
      advanceMs: 100
    });

    expect(second).toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(1);
  });

  it("uses a longer default revalidation window to avoid repeated repository reads", () => {
    const { first, second, findActiveByAuthId } = buildSessionClientsTwice({
      advanceMs: 4_000
    });

    expect(second).toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(1);
  });

  it("keeps the default revalidation window warm for longer bursts", () => {
    const { first, second, findActiveByAuthId } = buildSessionClientsTwice({
      advanceMs: 30_000
    });

    expect(second).toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(1);
  });

  it("revalidates cached clients after the revalidation window expires", () => {
    const { first, second, findActiveByAuthId } = buildSessionClientsTwice({
      runtimeOptions: {
        clientCacheTtlMs: 5_000,
        initialNow: 10_000
      },
      advanceMs: 5_001,
      nextRecord: createRuntimeAuthRecord("2026-04-20T08:05:00.000Z")
    });

    expect(second).not.toBe(first);
    expect(findActiveByAuthId).toHaveBeenCalledTimes(2);
  });
});
