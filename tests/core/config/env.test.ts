import { describe, expect, it } from "vitest";
import { loadEnvConfig } from "../../../src/core/config/env.js";

describe("loadEnvConfig", () => {
  it("loads required Huawei Cloud settings", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_BASE_URL: "https://example.com",
      HUAWEICLOUD_REGION: "cn-north-4",
      HUAWEICLOUD_AK: "ak",
      HUAWEICLOUD_SK: "sk",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0"
    });

    expect(config.baseUrl).toBe("https://example.com");
    expect(config.region).toBe("cn-north-4");
    expect(config.serverName).toBe("codearts-mcp");
    expect(config.checkBaseUrl).toBe("https://example.com");
    expect(config.testPlanBaseUrl).toBe("https://example.com");
    expect(config.deployBaseUrl).toBe("https://example.com");
    expect(config.buildBaseUrl).toBe("https://example.com");
    expect(config.artifactBaseUrl).toBe("https://example.com");
    expect(config.inspectorBaseUrl).toBe("https://vss.myhuaweicloud.com");
  });

  it("allows product-specific base urls to override the fallback url", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_BASE_URL: "https://example.com",
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
  });
});
