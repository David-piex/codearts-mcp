import { describe, expect, it } from "vitest";
import { loadEnvConfig, loadHttpAuthConfig } from "../../../src/core/config/env.js";

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
