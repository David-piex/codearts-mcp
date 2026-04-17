import { z } from "zod";

const envSchema = z.object({
  HUAWEICLOUD_BASE_URL: z.string().url(),
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
  governBaseUrl: string;
  inspectorBaseUrl: string;
  perfTestBaseUrl: string;
};

export type ServerMetadataConfig = {
  serverName: string;
  serverVersion: string;
  httpPort: number;
};

export function loadEnvConfig(source: Record<string, string | undefined> = process.env): AppConfig {
  const parsed = envSchema.parse(source);
  const fallbackBaseUrl = parsed.HUAWEICLOUD_BASE_URL;

  return {
    baseUrl: fallbackBaseUrl,
    region: parsed.HUAWEICLOUD_REGION,
    accessKey: parsed.HUAWEICLOUD_AK,
    secretKey: parsed.HUAWEICLOUD_SK,
    serverName: parsed.MCP_SERVER_NAME,
    serverVersion: parsed.MCP_SERVER_VERSION,
    reqBaseUrl: source.HUAWEICLOUD_REQ_BASE_URL ?? fallbackBaseUrl,
    repoBaseUrl: source.HUAWEICLOUD_REPO_BASE_URL ?? fallbackBaseUrl,
    pipelineBaseUrl: source.HUAWEICLOUD_PIPELINE_BASE_URL ?? fallbackBaseUrl,
    checkBaseUrl: source.HUAWEICLOUD_CHECK_BASE_URL ?? fallbackBaseUrl,
    testPlanBaseUrl: source.HUAWEICLOUD_TESTPLAN_BASE_URL ?? fallbackBaseUrl,
    deployBaseUrl: source.HUAWEICLOUD_DEPLOY_BASE_URL ?? fallbackBaseUrl,
    buildBaseUrl: source.HUAWEICLOUD_BUILD_BASE_URL ?? fallbackBaseUrl,
    artifactBaseUrl: source.HUAWEICLOUD_ARTIFACT_BASE_URL ?? fallbackBaseUrl,
    governBaseUrl:
      source.HUAWEICLOUD_GOVERN_BASE_URL ??
      `https://devsecurity.${parsed.HUAWEICLOUD_REGION}.myhuaweicloud.com`,
    inspectorBaseUrl: source.HUAWEICLOUD_INSPECTOR_BASE_URL ?? "https://vss.myhuaweicloud.com",
    perfTestBaseUrl:
      source.HUAWEICLOUD_PERFTEST_BASE_URL ??
      `https://cpts.${parsed.HUAWEICLOUD_REGION}.myhuaweicloud.com`
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
