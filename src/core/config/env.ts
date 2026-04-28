import { z } from "zod";
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
};

export type ServerMetadataConfig = {
  serverName: string;
  serverVersion: string;
  httpPort: number;
  productWriteRateLimit?: FixedWindowRateLimitConfig;
  authWriteRateLimit?: FixedWindowRateLimitConfig;
  readCacheTtls?: ReadCacheTtls;
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
};

export const DEFAULT_HTTP_WRITE_RATE_LIMIT: FixedWindowRateLimitConfig = {
  maxRequests: 3000,
  windowMs: 60_000
};

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
    readCacheTtls: loadReadCacheTtls(source)
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
    httpPort: Number(source.MCP_HTTP_PORT ?? "3000"),
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
    readCacheTtls: loadReadCacheTtls(source)
  };
}

export function loadHttpAuthConfig(
  source: Record<string, string | undefined> = process.env
): HttpAuthConfig {
  const masterKey = source.MCP_AUTH_MASTER_KEY;

  if (!masterKey) {
    throw new Error("MCP_AUTH_MASTER_KEY is required in HTTP mode.");
  }

  return {
    masterKey,
    authDataPath: source.MCP_AUTH_DATA_PATH ?? ".codearts-mcp/auth-store.json",
    authCookieName: source.MCP_AUTH_COOKIE_NAME ?? "codearts_mcp_auth",
    authCookieSecure: source.MCP_AUTH_COOKIE_SECURE === "true",
    authTokenTtlSeconds: Number(source.MCP_AUTH_TOKEN_TTL_SECONDS ?? "2592000"),
    allowQueryAuthToken: source.MCP_AUTH_ALLOW_QUERY_TOKEN === "true"
  };
}
