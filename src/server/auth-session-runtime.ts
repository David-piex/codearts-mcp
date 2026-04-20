import { createHuaweiAuthHeaders } from "../core/auth/huawei-auth.js";
import { AppError } from "../core/errors/app-error.js";
import { createHttpClient } from "../core/http/client.js";
import { createArtifactClient } from "../products/artifact/client.js";
import { createBuildClient } from "../products/build/client.js";
import { createCheckClient } from "../products/check/client.js";
import { createDeployClient } from "../products/deploy/client.js";
import { createPipelineClient } from "../products/pipeline/client.js";
import { createRepoClient } from "../products/repo/client.js";
import { createReqClient } from "../products/req/client.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import { decryptSecretValue } from "./auth-crypto.js";
import {
  readHttpAuthRequestInfo,
  type AuthRepository
} from "./auth-session-tools.js";
import type { SessionCredentialStore } from "./session-store.js";

type ProductClients = {
  artifactClient: ReturnType<typeof createArtifactClient>;
  buildClient: ReturnType<typeof createBuildClient>;
  checkClient: ReturnType<typeof createCheckClient>;
  deployClient: ReturnType<typeof createDeployClient>;
  reqClient: ReturnType<typeof createReqClient>;
  repoClient: ReturnType<typeof createRepoClient>;
  pipelineClient: ReturnType<typeof createPipelineClient>;
  testPlanClient: ReturnType<typeof createTestPlanClient>;
};

type ClientBuilderDependencies = {
  createHttpClient: typeof createHttpClient;
  createArtifactClient: typeof createArtifactClient;
  createBuildClient: typeof createBuildClient;
  createCheckClient: typeof createCheckClient;
  createDeployClient: typeof createDeployClient;
  createReqClient: typeof createReqClient;
  createRepoClient: typeof createRepoClient;
  createPipelineClient: typeof createPipelineClient;
  createTestPlanClient: typeof createTestPlanClient;
};

export type HttpAuthRuntimeConfig = {
  repository?: AuthRepository;
  masterKey?: string;
  clientCacheTtlMs?: number;
  now?: () => number;
};

export type SessionToolExtra = {
  sessionId?: string;
  authId?: string;
  authInfo?: unknown;
};

let httpAuthRuntimeConfig: HttpAuthRuntimeConfig = {};
const defaultClientCacheTtlMs = 5_000;
const cachedClientsByAuthId = new Map<
  string,
  {
    signature: string;
    expiresAt: number;
    clients: ProductClients;
  }
>();

const defaultClientBuilderDependencies: ClientBuilderDependencies = {
  createHttpClient,
  createArtifactClient,
  createBuildClient,
  createCheckClient,
  createDeployClient,
  createReqClient,
  createRepoClient,
  createPipelineClient,
  createTestPlanClient
};

export function configureHttpAuthRuntimeConfig(config: HttpAuthRuntimeConfig) {
  httpAuthRuntimeConfig = config;
  cachedClientsByAuthId.clear();
}

export function readHttpAuthRuntimeConfig(): HttpAuthRuntimeConfig {
  return httpAuthRuntimeConfig;
}

export function buildClientsFromCredentialConfig(config: {
  accessKey: string;
  secretKey: string;
  reqBaseUrl: string;
  repoBaseUrl: string;
  pipelineBaseUrl: string;
  checkBaseUrl: string;
  testPlanBaseUrl: string;
  deployBaseUrl: string;
  buildBaseUrl: string;
  artifactBaseUrl: string;
}, dependencies: ClientBuilderDependencies = defaultClientBuilderDependencies): ProductClients {
  const authHeaders = createHuaweiAuthHeaders(config.accessKey, config.secretKey);
  const cachedClients: Partial<ProductClients> = {};

  function getOrCreateClient<TKey extends keyof ProductClients>(
    key: TKey,
    factory: () => ProductClients[TKey]
  ) {
    const existing = cachedClients[key];

    if (existing !== undefined) {
      return existing;
    }

    const created = factory();
    cachedClients[key] = created;
    return created;
  }

  return {
    get artifactClient() {
      return getOrCreateClient("artifactClient", () =>
        dependencies.createArtifactClient(
          dependencies.createHttpClient({ baseUrl: config.artifactBaseUrl, authHeaders })
        )
      );
    },
    get buildClient() {
      return getOrCreateClient("buildClient", () =>
        dependencies.createBuildClient(
          dependencies.createHttpClient({ baseUrl: config.buildBaseUrl, authHeaders })
        )
      );
    },
    get checkClient() {
      return getOrCreateClient("checkClient", () =>
        dependencies.createCheckClient(
          dependencies.createHttpClient({ baseUrl: config.checkBaseUrl, authHeaders })
        )
      );
    },
    get deployClient() {
      return getOrCreateClient("deployClient", () =>
        dependencies.createDeployClient(
          dependencies.createHttpClient({ baseUrl: config.deployBaseUrl, authHeaders })
        )
      );
    },
    get reqClient() {
      return getOrCreateClient("reqClient", () =>
        dependencies.createReqClient(
          dependencies.createHttpClient({ baseUrl: config.reqBaseUrl, authHeaders })
        )
      );
    },
    get repoClient() {
      return getOrCreateClient("repoClient", () =>
        dependencies.createRepoClient(
          dependencies.createHttpClient({ baseUrl: config.repoBaseUrl, authHeaders })
        )
      );
    },
    get pipelineClient() {
      return getOrCreateClient("pipelineClient", () =>
        dependencies.createPipelineClient(
          dependencies.createHttpClient({ baseUrl: config.pipelineBaseUrl, authHeaders })
        )
      );
    },
    get testPlanClient() {
      return getOrCreateClient("testPlanClient", () =>
        dependencies.createTestPlanClient(
          dependencies.createHttpClient({ baseUrl: config.testPlanBaseUrl, authHeaders })
        )
      );
    }
  };
}

export function resolveAuthId(store: SessionCredentialStore, extra: SessionToolExtra) {
  const requestAuthInfo = readHttpAuthRequestInfo(extra);
  const sessionBoundAuthId = extra.sessionId ? store.getAuthId(extra.sessionId) : undefined;
  const authId = extra.authId ?? requestAuthInfo?.authId ?? sessionBoundAuthId;

  if (authId && extra.sessionId && sessionBoundAuthId !== authId) {
    store.bind(extra.sessionId, authId);
  }

  return authId;
}

function createAuthConfigSignature(record: NonNullable<ReturnType<AuthRepository["findActiveByAuthId"]>>) {
  return JSON.stringify({
    updated_at: record.updated_at,
    encrypted_access_key: record.encrypted_access_key,
    encrypted_secret_key: record.encrypted_secret_key,
    req_base_url: record.req_base_url,
    repo_base_url: record.repo_base_url,
    pipeline_base_url: record.pipeline_base_url,
    check_base_url: record.check_base_url,
    testplan_base_url: record.testplan_base_url,
    deploy_base_url: record.deploy_base_url,
    build_base_url: record.build_base_url,
    artifact_base_url: record.artifact_base_url
  });
}

export function buildClientsForSession(store: SessionCredentialStore, extra: SessionToolExtra) {
  const authId = resolveAuthId(store, extra);

  if (!authId) {
    if (!extra.sessionId) {
      throw new AppError(
        "auth_error",
        "This tool requires an MCP session or request auth identity."
      );
    }

    throw new AppError(
      "auth_error",
      `No Huawei Cloud credentials configured for session ${extra.sessionId}.`
    );
  }

  const repository = httpAuthRuntimeConfig.repository;
  const masterKey = httpAuthRuntimeConfig.masterKey;
  const now = httpAuthRuntimeConfig.now ?? Date.now;
  const clientCacheTtlMs = httpAuthRuntimeConfig.clientCacheTtlMs ?? defaultClientCacheTtlMs;

  if (!repository || !masterKey) {
    throw new AppError("auth_error", "HTTP auth persistence is not configured for this server.");
  }

  const cachedEntry = cachedClientsByAuthId.get(authId);

  if (cachedEntry && cachedEntry.expiresAt > now()) {
    return cachedEntry.clients;
  }

  const sessionConfig = repository.findActiveByAuthId(authId);

  if (!sessionConfig) {
    cachedClientsByAuthId.delete(authId);
    if (extra.sessionId) {
      store.clear(extra.sessionId);
    }

    throw new AppError("auth_error", `No Huawei Cloud credentials configured for auth identity ${authId}.`);
  }

  const signature = createAuthConfigSignature(sessionConfig);

  if (cachedEntry?.signature === signature) {
    cachedEntry.expiresAt = now() + clientCacheTtlMs;
    return cachedEntry.clients;
  }

  const clients = buildClientsFromCredentialConfig({
    accessKey: decryptSecretValue(sessionConfig.encrypted_access_key, masterKey),
    secretKey: decryptSecretValue(sessionConfig.encrypted_secret_key, masterKey),
    reqBaseUrl: sessionConfig.req_base_url,
    repoBaseUrl: sessionConfig.repo_base_url,
    pipelineBaseUrl: sessionConfig.pipeline_base_url,
    checkBaseUrl: sessionConfig.check_base_url,
    testPlanBaseUrl: sessionConfig.testplan_base_url,
    deployBaseUrl: sessionConfig.deploy_base_url,
    buildBaseUrl: sessionConfig.build_base_url,
    artifactBaseUrl: sessionConfig.artifact_base_url
  });

  cachedClientsByAuthId.set(authId, {
    signature,
    expiresAt: now() + clientCacheTtlMs,
    clients
  });

  return clients;
}
