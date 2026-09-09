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
    expect(config.checkBaseUrl).toBe("https://codearts-check.cn-north-4.myhuaweicloud.com");
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

  it("allows filtering enabled product families in local mode", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_REGION: "cn-north-4",
      HUAWEICLOUD_AK: "ak",
      HUAWEICLOUD_SK: "sk",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0",
      MCP_ENABLED_PRODUCT_FAMILIES: "req,repo"
    });

    expect(config.enabledProductFamilies).toEqual(["req", "repo"]);
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
      httpHost: "127.0.0.1",
      httpPort: 3100,
      httpSessionIdleTimeoutMs: 0,
      httpMaxSessions: 128,
      httpMaxRequestBodyBytes: 8 * 1024 * 1024,
      httpAllowedOrigins: [],
      productWriteRateLimit: {
        maxRequests: 3000,
        windowMs: 60_000
      },
      authWriteRateLimit: {
        maxRequests: 3000,
        windowMs: 60_000
      },
      readCacheTtls: {
        reqListProjectsMs: 45_000,
        repoListRepositoriesMs: 47_000,
        pipelineListPipelinesMs: 4_000,
        buildListJobsMs: 3_500
      }
    });
  });

  it("allows HTTP write rate limit overrides", () => {
    expect(
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS: "1200",
        MCP_PRODUCT_WRITE_RATE_LIMIT_WINDOW_MS: "30000",
        MCP_AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS: "600",
        MCP_AUTH_WRITE_RATE_LIMIT_WINDOW_MS: "15000"
      })
    ).toEqual({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpHost: "127.0.0.1",
      httpPort: 3000,
      httpSessionIdleTimeoutMs: 0,
      httpMaxSessions: 128,
      httpMaxRequestBodyBytes: 8 * 1024 * 1024,
      httpAllowedOrigins: [],
      productWriteRateLimit: {
        maxRequests: 1200,
        windowMs: 30_000
      },
      authWriteRateLimit: {
        maxRequests: 600,
        windowMs: 15_000
      },
      readCacheTtls: {
        reqListProjectsMs: 60_000,
        repoListRepositoriesMs: 60_000,
        pipelineListPipelinesMs: 5_000,
        buildListJobsMs: 5_000
      }
    });
  });

  it("rejects invalid HTTP write rate limits", () => {
    expect(() =>
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS: "0"
      })
    ).toThrow(/MCP_PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS/);

    expect(() =>
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_AUTH_WRITE_RATE_LIMIT_WINDOW_MS: "1.5"
      })
    ).toThrow(/MCP_AUTH_WRITE_RATE_LIMIT_WINDOW_MS/);
  });

  it("rejects a non-positive HTTP request body limit", () => {
    expect(() =>
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_MAX_REQUEST_BODY_BYTES: "0"
      })
    ).toThrow("MCP_HTTP_MAX_REQUEST_BODY_BYTES must be a positive integer.");
  });

  it("loads the shared HTTP session safety limits", () => {
    expect(
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_SESSION_IDLE_TIMEOUT_MS: "900000",
        MCP_HTTP_MAX_SESSIONS: "32"
      })
    ).toMatchObject({
      httpSessionIdleTimeoutMs: 900_000,
      httpMaxSessions: 32
    });

    expect(
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_SESSION_IDLE_TIMEOUT_MS: "0"
      }).httpSessionIdleTimeoutMs
    ).toBe(0);

    expect(() =>
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_MAX_SESSIONS: "0"
      })
    ).toThrow("MCP_HTTP_MAX_SESSIONS must be a positive integer.");
  });

  it("loads HTTP host and allowed Origin overrides", () => {
    expect(
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_HOST: "0.0.0.0",
        MCP_HTTP_ALLOWED_ORIGINS:
          "https://allowed.example, https://allowed.example/path, http://localhost:5173"
      })
    ).toMatchObject({
      httpHost: "0.0.0.0",
      httpAllowedOrigins: [
        "https://allowed.example",
        "http://localhost:5173"
      ]
    });
  });

  it("rejects invalid HTTP allowed Origin entries", () => {
    expect(() =>
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_HTTP_ALLOWED_ORIGINS: "not a url"
      })
    ).toThrow(/MCP_HTTP_ALLOWED_ORIGINS/);
  });

  it("loads enabled product family filters for HTTP mode", () => {
    expect(
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_ENABLED_PRODUCT_FAMILIES: "req,repo"
      }).enabledProductFamilies
    ).toEqual(["req", "repo"]);
  });

  it("rejects invalid enabled product families", () => {
    expect(() =>
      loadServerMetadataConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_ENABLED_PRODUCT_FAMILIES: "req,govern"
      })
    ).toThrow(/MCP_ENABLED_PRODUCT_FAMILIES/);
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
      authTokenTtlSeconds: 2592000,
      allowQueryAuthToken: false,
      allowClientCredentialHeaders: false
    });
  });

  it("allows query auth tokens only when explicitly enabled", () => {
    expect(
      loadHttpAuthConfig({
        MCP_AUTH_MASTER_KEY: "0123456789abcdef0123456789abcdef",
        MCP_AUTH_ALLOW_QUERY_TOKEN: "true",
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      }).allowQueryAuthToken
    ).toBe(true);
  });

  it("allows MCP client credential headers only when explicitly enabled", () => {
    expect(
      loadHttpAuthConfig({
        MCP_AUTH_MASTER_KEY: "0123456789abcdef0123456789abcdef",
        MCP_AUTH_ALLOW_CLIENT_CREDENTIAL_HEADERS: "true",
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      }).allowClientCredentialHeaders
    ).toBe(true);
  });

  it("loads optional static HTTP bearer credentials for MCP client configuration", () => {
    const config = loadHttpAuthConfig({
      MCP_AUTH_MASTER_KEY: "0123456789abcdef0123456789abcdef",
      MCP_AUTH_STATIC_TOKEN: "static-token",
      HUAWEICLOUD_AK: "static-ak",
      HUAWEICLOUD_SK: "static-sk",
      HUAWEICLOUD_REGION: "cn-north-4",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0"
    });

    expect(config.staticAuthToken).toBe("static-token");
    expect(config.staticCredentials).toMatchObject({
      accessKey: "static-ak",
      secretKey: "static-sk",
      region: "cn-north-4",
      reqBaseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com"
    });
  });

  it("rejects incomplete static HTTP bearer credentials", () => {
    expect(() =>
      loadHttpAuthConfig({
        MCP_AUTH_MASTER_KEY: "0123456789abcdef0123456789abcdef",
        MCP_AUTH_STATIC_TOKEN: "static-token",
        HUAWEICLOUD_AK: "static-ak",
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      })
    ).toThrow(/Static HTTP auth requires/);
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
