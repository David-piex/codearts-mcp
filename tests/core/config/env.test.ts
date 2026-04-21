import { describe, expect, it } from "vitest";
import {
  loadEnvConfig,
  loadHttpAuthConfig,
  loadServerMetadataConfig
} from "../../../src/core/config/env.js";

describe("loadEnvConfig", () => {
  it("derives standard CodeArts endpoints from region when product urls are omitted", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_REGION: "cn-north-4",
      HUAWEICLOUD_AK: "ak",
      HUAWEICLOUD_SK: "sk",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0"
    });

    expect(config.baseUrl).toBe("https://codearts.cn-north-4.myhuaweicloud.com");
    expect(config.region).toBe("cn-north-4");
    expect(config.serverName).toBe("codearts-mcp");
    expect(config.reqBaseUrl).toBe("https://projectman-ext.cn-north-4.myhuaweicloud.com");
    expect(config.repoBaseUrl).toBe("https://codehub-ext.cn-north-4.myhuaweicloud.com");
    expect(config.pipelineBaseUrl).toBe("https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com");
    expect(config.checkBaseUrl).toBe("https://codecheck-ext.cn-north-4.myhuaweicloud.com");
    expect(config.testPlanBaseUrl).toBe("https://cloudtest-ext.cn-north-4.myhuaweicloud.com");
    expect(config.deployBaseUrl).toBe("https://codearts-deploy.cn-north-4.myhuaweicloud.com");
    expect(config.buildBaseUrl).toBe("https://cloudbuild-ext.cn-north-4.myhuaweicloud.com");
    expect(config.artifactBaseUrl).toBe("https://artifact.cn-north-4.myhuaweicloud.cn");
    expect(config.readCacheTtls).toEqual({
      reqListProjectsMs: 60_000,
      repoListRepositoriesMs: 60_000,
      pipelineListPipelinesMs: 5_000,
      buildListJobsMs: 5_000
    });
  });

  it("allows product-specific base urls to override region defaults", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_REGION: "cn-north-4",
      HUAWEICLOUD_AK: "ak",
      HUAWEICLOUD_SK: "sk",
      HUAWEICLOUD_CHECK_BASE_URL: "https://check.example.com",
      HUAWEICLOUD_TESTPLAN_BASE_URL: "https://testplan.example.com",
      HUAWEICLOUD_DEPLOY_BASE_URL: "https://deploy.example.com",
      HUAWEICLOUD_BUILD_BASE_URL: "https://build.example.com",
      HUAWEICLOUD_ARTIFACT_BASE_URL: "https://artifact.example.com",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0"
    });

    expect(config.checkBaseUrl).toBe("https://check.example.com");
    expect(config.testPlanBaseUrl).toBe("https://testplan.example.com");
    expect(config.deployBaseUrl).toBe("https://deploy.example.com");
    expect(config.buildBaseUrl).toBe("https://build.example.com");
    expect(config.artifactBaseUrl).toBe("https://artifact.example.com");
    expect(config.reqBaseUrl).toBe("https://projectman-ext.cn-north-4.myhuaweicloud.com");
    expect(config.repoBaseUrl).toBe("https://codehub-ext.cn-north-4.myhuaweicloud.com");
  });

  it("allows per-tool read cache TTL overrides", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_REGION: "cn-north-4",
      HUAWEICLOUD_AK: "ak",
      HUAWEICLOUD_SK: "sk",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0",
      MCP_REQ_LIST_PROJECTS_CACHE_TTL_MS: "120000",
      MCP_REPO_LIST_REPOSITORIES_CACHE_TTL_MS: "90000",
      MCP_PIPELINE_LIST_PIPELINES_CACHE_TTL_MS: "3000",
      MCP_BUILD_LIST_JOBS_CACHE_TTL_MS: "2000"
    });

    expect(config.readCacheTtls).toEqual({
      reqListProjectsMs: 120_000,
      repoListRepositoriesMs: 90_000,
      pipelineListPipelinesMs: 3_000,
      buildListJobsMs: 2_000
    });
  });
});

describe("loadServerMetadataConfig", () => {
  it("loads tiered read-cache TTLs for HTTP mode", () => {
    expect(
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_PORT: "3100",
        MCP_REQ_LIST_PROJECTS_CACHE_TTL_MS: "45000",
        MCP_REPO_LIST_REPOSITORIES_CACHE_TTL_MS: "47000",
        MCP_PIPELINE_LIST_PIPELINES_CACHE_TTL_MS: "4000",
        MCP_BUILD_LIST_JOBS_CACHE_TTL_MS: "3500"
      })
    ).toEqual({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 3100,
      readCacheTtls: {
        reqListProjectsMs: 45_000,
        repoListRepositoriesMs: 47_000,
        pipelineListPipelinesMs: 4_000,
        buildListJobsMs: 3_500
      }
    });
  });
});

describe("loadHttpAuthConfig", () => {
  it("loads HTTP auth persistence settings with defaults", () => {
    expect(
      loadHttpAuthConfig({
        MCP_AUTH_MASTER_KEY: "0123456789abcdef0123456789abcdef",
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      })
    ).toEqual({
      masterKey: "0123456789abcdef0123456789abcdef",
      authDataPath: ".codearts-mcp/auth-store.json",
      authCookieName: "codearts_mcp_auth",
      authCookieSecure: false,
      authTokenTtlSeconds: 2592000
    });
  });

  it("rejects missing master key", () => {
    expect(() =>
      loadHttpAuthConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      })
    ).toThrow(/MCP_AUTH_MASTER_KEY/);
  });
});
