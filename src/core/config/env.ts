import { z } from "zod";
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
};

export type ServerMetadataConfig = {
  serverName: string;
  serverVersion: string;
  httpPort: number;
};

export type HttpAuthConfig = {
  masterKey: string;
  authDataPath: string;
  authCookieName: string;
  authCookieSecure: boolean;
  authTokenTtlSeconds: number;
};

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
    artifactBaseUrl: defaults.artifact_base_url
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
    httpPort: Number(source.MCP_HTTP_PORT ?? "3000")
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
    authTokenTtlSeconds: Number(source.MCP_AUTH_TOKEN_TTL_SECONDS ?? "2592000")
  };
}
