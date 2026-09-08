import { z } from "zod";
import {
  isProductToolFamily,
  type ProductToolFamily
} from "../../contracts/product-families.js";
import {
  resolveReadCacheTtls,
  type ReadCacheTtls
} from "../cache/read-cache-ttl.js";
import {
  mergeSessionEndpointOverrides,
  resolveCodeArtsBaseUrl,
  resolveRegionDefaults
} from "./region-defaults.js";

const envSchema = z.object({
  HUAWEICLOUD_BASE_URL: z.string().url().optional(),
  HUAWEICLOUD_REGION: z.string().min(1),
  HUAWEICLOUD_AK: z.string().min(1),
  HUAWEICLOUD_SK: z.string().min(1),
  MCP_SERVER_NAME: z.string().min(1),
  MCP_SERVER_VERSION: z.string().min(1)
});

export type AppConfig = {
  baseUrl: string;
  region: string;
  accessKey: string;
  secretKey: string;
  serverName: string;
  serverVersion: string;
  reqBaseUrl: string;
  repoBaseUrl: string;
  pipelineBaseUrl: string;
  checkBaseUrl: string;
  testPlanBaseUrl: string;
  deployBaseUrl: string;
  buildBaseUrl: string;
  artifactBaseUrl: string;
  readCacheTtls?: ReadCacheTtls;
  enabledProductFamilies?: ProductToolFamily[];
};

export type ServerMetadataConfig = {
  serverName: string;
  serverVersion: string;
  httpHost?: string;
  httpPort: number;
  httpAllowedOrigins?: string[];
  httpSessionIdleTimeoutMs?: number;
  httpMaxSessions?: number;
  httpMaxRequestBodyBytes?: number;
  productWriteRateLimit?: FixedWindowRateLimitConfig;
  authWriteRateLimit?: FixedWindowRateLimitConfig;
  readCacheTtls?: ReadCacheTtls;
  enabledProductFamilies?: ProductToolFamily[];
};

export type FixedWindowRateLimitConfig = {
  maxRequests: number;
  windowMs: number;
};

export type HttpAuthConfig = {
  masterKey: string;
  authDataPath: string;
  authCookieName: string;
  authCookieSecure: boolean;
  authTokenTtlSeconds: number;
  allowQueryAuthToken: boolean;
  allowClientCredentialHeaders: boolean;
  staticAuthToken?: string;
  staticCredentials?: {
    accessKey: string;
    secretKey: string;
    region: string;
    reqBaseUrl: string;
    repoBaseUrl: string;
    pipelineBaseUrl: string;
    checkBaseUrl: string;
    testPlanBaseUrl: string;
    deployBaseUrl: string;
    buildBaseUrl: string;
    artifactBaseUrl: string;
  };
};

export const DEFAULT_HTTP_WRITE_RATE_LIMIT: FixedWindowRateLimitConfig = {
  maxRequests: 3000,
  windowMs: 60_000
};

export const DEFAULT_HTTP_MAX_REQUEST_BODY_BYTES = 8 * 1024 * 1024;
export const DEFAULT_HTTP_SESSION_IDLE_TIMEOUT_MS = 10 * 60 * 1000;
export const DEFAULT_HTTP_MAX_SESSIONS = 128;

function parsePositiveInteger(
  value: string | undefined,
  envName: string,
  defaultValue: number
) {
  if (value === undefined) {
    return defaultValue;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${envName} must be a positive integer.`);
  }

  return parsed;
}

function parseReadCacheTtlMs(
  value: string | undefined,
  envName: string
) {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${envName} must be a non-negative number.`);
  }

  return parsed;
}

function parseAllowedOrigins(value: string | undefined, envName: string) {
  if (value === undefined || value.trim().length === 0) {
    return [];
  }

  const origins = new Set<string>();

  for (const rawOrigin of value.split(",")) {
    const trimmed = rawOrigin.trim();

    if (!trimmed) {
      continue;
    }

    try {
      origins.add(new URL(trimmed).origin);
    } catch {
      throw new Error(`${envName} must be a comma-separated list of valid origins.`);
    }
  }

  return [...origins];
}

function parseEnabledProductFamilies(
  value: string | undefined,
  envName: string
): ProductToolFamily[] | undefined {
  if (value === undefined || value.trim().length === 0) {
    return undefined;
  }

  const candidates = [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))];

  if (candidates.length === 0) {
    return undefined;
  }

  const families: ProductToolFamily[] = [];

  for (const family of candidates) {
    if (!isProductToolFamily(family)) {
      throw new Error(
        `${envName} must be a comma-separated list of artifact, build, check, deploy, pipeline, repo, req, testplan.`
      );
    }

    families.push(family);
  }

  return families;
}

function loadReadCacheTtls(
  source: Record<string, string | undefined>
): ReadCacheTtls {
  return resolveReadCacheTtls({
    reqListProjectsMs: parseReadCacheTtlMs(
      source.MCP_REQ_LIST_PROJECTS_CACHE_TTL_MS,
      "MCP_REQ_LIST_PROJECTS_CACHE_TTL_MS"
    ),
    repoListRepositoriesMs: parseReadCacheTtlMs(
      source.MCP_REPO_LIST_REPOSITORIES_CACHE_TTL_MS,
      "MCP_REPO_LIST_REPOSITORIES_CACHE_TTL_MS"
    ),
    pipelineListPipelinesMs: parseReadCacheTtlMs(
      source.MCP_PIPELINE_LIST_PIPELINES_CACHE_TTL_MS,
      "MCP_PIPELINE_LIST_PIPELINES_CACHE_TTL_MS"
    ),
    buildListJobsMs: parseReadCacheTtlMs(
      source.MCP_BUILD_LIST_JOBS_CACHE_TTL_MS,
      "MCP_BUILD_LIST_JOBS_CACHE_TTL_MS"
    )
  });
}

function loadFixedWindowRateLimitConfig(
  source: Record<string, string | undefined>,
  maxRequestsEnvName: string,
  windowMsEnvName: string
): FixedWindowRateLimitConfig {
  return {
    maxRequests: parsePositiveInteger(
      source[maxRequestsEnvName],
      maxRequestsEnvName,
      DEFAULT_HTTP_WRITE_RATE_LIMIT.maxRequests
    ),
    windowMs: parsePositiveInteger(
      source[windowMsEnvName],
      windowMsEnvName,
      DEFAULT_HTTP_WRITE_RATE_LIMIT.windowMs
    )
  };
}

export function loadEnvConfig(source: Record<string, string | undefined> = process.env): AppConfig {
  const parsed = envSchema.parse(source);
  const defaults = mergeSessionEndpointOverrides(resolveRegionDefaults(parsed.HUAWEICLOUD_REGION), {
    req_base_url: source.HUAWEICLOUD_REQ_BASE_URL,
    repo_base_url: source.HUAWEICLOUD_REPO_BASE_URL,
    pipeline_base_url: source.HUAWEICLOUD_PIPELINE_BASE_URL,
    check_base_url: source.HUAWEICLOUD_CHECK_BASE_URL,
    testplan_base_url: source.HUAWEICLOUD_TESTPLAN_BASE_URL,
    deploy_base_url: source.HUAWEICLOUD_DEPLOY_BASE_URL,
    build_base_url: source.HUAWEICLOUD_BUILD_BASE_URL,
    artifact_base_url: source.HUAWEICLOUD_ARTIFACT_BASE_URL
  });

  return {
    baseUrl: parsed.HUAWEICLOUD_BASE_URL ?? resolveCodeArtsBaseUrl(parsed.HUAWEICLOUD_REGION),
    region: parsed.HUAWEICLOUD_REGION,
    accessKey: parsed.HUAWEICLOUD_AK,
    secretKey: parsed.HUAWEICLOUD_SK,
    serverName: parsed.MCP_SERVER_NAME,
    serverVersion: parsed.MCP_SERVER_VERSION,
    reqBaseUrl: defaults.req_base_url,
    repoBaseUrl: defaults.repo_base_url,
    pipelineBaseUrl: defaults.pipeline_base_url,
    checkBaseUrl: defaults.check_base_url,
    testPlanBaseUrl: defaults.testplan_base_url,
    deployBaseUrl: defaults.deploy_base_url,
    buildBaseUrl: defaults.build_base_url,
    artifactBaseUrl: defaults.artifact_base_url,
    readCacheTtls: loadReadCacheTtls(source),
    enabledProductFamilies: parseEnabledProductFamilies(
      source.MCP_ENABLED_PRODUCT_FAMILIES,
      "MCP_ENABLED_PRODUCT_FAMILIES"
    )
  };
}

export function loadServerMetadataConfig(
  source: Record<string, string | undefined> = process.env
): ServerMetadataConfig {
  const serverName = source.MCP_SERVER_NAME;
  const serverVersion = source.MCP_SERVER_VERSION;

  if (!serverName || !serverVersion) {
    throw new Error("MCP_SERVER_NAME and MCP_SERVER_VERSION are required.");
  }

  return {
    serverName,
    serverVersion,
    httpHost: source.MCP_HTTP_HOST ?? "127.0.0.1",
    httpPort: Number(source.MCP_HTTP_PORT ?? "3000"),
    httpAllowedOrigins: parseAllowedOrigins(
      source.MCP_HTTP_ALLOWED_ORIGINS,
      "MCP_HTTP_ALLOWED_ORIGINS"
    ),
    httpSessionIdleTimeoutMs: parsePositiveInteger(
      source.MCP_HTTP_SESSION_IDLE_TIMEOUT_MS,
      "MCP_HTTP_SESSION_IDLE_TIMEOUT_MS",
      DEFAULT_HTTP_SESSION_IDLE_TIMEOUT_MS
    ),
    httpMaxSessions: parsePositiveInteger(
      source.MCP_HTTP_MAX_SESSIONS,
      "MCP_HTTP_MAX_SESSIONS",
      DEFAULT_HTTP_MAX_SESSIONS
    ),
    httpMaxRequestBodyBytes: parsePositiveInteger(
      source.MCP_HTTP_MAX_REQUEST_BODY_BYTES,
      "MCP_HTTP_MAX_REQUEST_BODY_BYTES",
      DEFAULT_HTTP_MAX_REQUEST_BODY_BYTES
    ),
    productWriteRateLimit: loadFixedWindowRateLimitConfig(
      source,
      "MCP_PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS",
      "MCP_PRODUCT_WRITE_RATE_LIMIT_WINDOW_MS"
    ),
    authWriteRateLimit: loadFixedWindowRateLimitConfig(
      source,
      "MCP_AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS",
      "MCP_AUTH_WRITE_RATE_LIMIT_WINDOW_MS"
    ),
    readCacheTtls: loadReadCacheTtls(source),
    enabledProductFamilies: parseEnabledProductFamilies(
      source.MCP_ENABLED_PRODUCT_FAMILIES,
      "MCP_ENABLED_PRODUCT_FAMILIES"
    )
  };
}

export function loadHttpAuthConfig(
  source: Record<string, string | undefined> = process.env
): HttpAuthConfig {
  const masterKey = source.MCP_AUTH_MASTER_KEY;

  if (!masterKey) {
    throw new Error("MCP_AUTH_MASTER_KEY is required in HTTP mode.");
  }

  const staticAuthToken = source.MCP_AUTH_STATIC_TOKEN?.trim() || undefined;
  const staticCredentialValues = {
    accessKey: source.HUAWEICLOUD_AK?.trim(),
    secretKey: source.HUAWEICLOUD_SK?.trim(),
    region: source.HUAWEICLOUD_REGION?.trim()
  };
  const hasStaticCredentials = Object.values(staticCredentialValues).some(Boolean);

  if (staticAuthToken && !hasStaticCredentials) {
    throw new Error(
      "MCP_AUTH_STATIC_TOKEN requires HUAWEICLOUD_AK, HUAWEICLOUD_SK, and HUAWEICLOUD_REGION."
    );
  }

  if (hasStaticCredentials &&
      (!staticAuthToken ||
        !staticCredentialValues.accessKey ||
        !staticCredentialValues.secretKey ||
        !staticCredentialValues.region)) {
    throw new Error(
      "Static HTTP auth requires MCP_AUTH_STATIC_TOKEN, HUAWEICLOUD_AK, HUAWEICLOUD_SK, and HUAWEICLOUD_REGION."
    );
  }

  const staticEndpoints = staticCredentialValues.region
    ? mergeSessionEndpointOverrides(resolveRegionDefaults(staticCredentialValues.region), {
        req_base_url: source.HUAWEICLOUD_REQ_BASE_URL,
        repo_base_url: source.HUAWEICLOUD_REPO_BASE_URL,
        pipeline_base_url: source.HUAWEICLOUD_PIPELINE_BASE_URL,
        check_base_url: source.HUAWEICLOUD_CHECK_BASE_URL,
        testplan_base_url: source.HUAWEICLOUD_TESTPLAN_BASE_URL,
        deploy_base_url: source.HUAWEICLOUD_DEPLOY_BASE_URL,
        build_base_url: source.HUAWEICLOUD_BUILD_BASE_URL,
        artifact_base_url: source.HUAWEICLOUD_ARTIFACT_BASE_URL
      })
    : undefined;

  return {
    masterKey,
    authDataPath: source.MCP_AUTH_DATA_PATH ?? ".codearts-mcp/auth-store.json",
    authCookieName: source.MCP_AUTH_COOKIE_NAME ?? "codearts_mcp_auth",
    authCookieSecure: source.MCP_AUTH_COOKIE_SECURE === "true",
    authTokenTtlSeconds: Number(source.MCP_AUTH_TOKEN_TTL_SECONDS ?? "2592000"),
    allowQueryAuthToken: source.MCP_AUTH_ALLOW_QUERY_TOKEN === "true",
    allowClientCredentialHeaders:
      source.MCP_AUTH_ALLOW_CLIENT_CREDENTIAL_HEADERS === "true",
    ...(staticAuthToken ? { staticAuthToken } : {}),
    ...(staticEndpoints &&
    staticCredentialValues.accessKey &&
    staticCredentialValues.secretKey &&
    staticCredentialValues.region
      ? {
          staticCredentials: {
            accessKey: staticCredentialValues.accessKey,
            secretKey: staticCredentialValues.secretKey,
            region: staticCredentialValues.region,
            reqBaseUrl: staticEndpoints.req_base_url,
            repoBaseUrl: staticEndpoints.repo_base_url,
            pipelineBaseUrl: staticEndpoints.pipeline_base_url,
            checkBaseUrl: staticEndpoints.check_base_url,
            testPlanBaseUrl: staticEndpoints.testplan_base_url,
            deployBaseUrl: staticEndpoints.deploy_base_url,
            buildBaseUrl: staticEndpoints.build_base_url,
            artifactBaseUrl: staticEndpoints.artifact_base_url
          }
        }
      : {})
  };
}
