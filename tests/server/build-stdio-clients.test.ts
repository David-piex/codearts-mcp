import { describe, expect, it } from "vitest";
import { buildStdioClients } from "../../src/server/build-stdio-clients.js";

describe("buildStdioClients", () => {
  it("returns stdio clients only in stdio mode", () => {
    const clients = buildStdioClients({
      mode: "stdio",
      config: {
        baseUrl: "https://codearts.cn-north-4.myhuaweicloud.com",
        region: "cn-north-4",
        accessKey: "ak",
        secretKey: "sk",
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        reqBaseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
        repoBaseUrl: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
        pipelineBaseUrl: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
        checkBaseUrl: "https://codearts-check.cn-north-4.myhuaweicloud.com",
        testPlanBaseUrl: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
        deployBaseUrl: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
        buildBaseUrl: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
        artifactBaseUrl: "https://artifact.cn-north-4.myhuaweicloud.cn"
      }
    });

    expect(clients).toBeTruthy();
    expect(clients).toHaveProperty("reqClient");
    expect(clients).toHaveProperty("repoClient");
    expect(clients).toHaveProperty("pipelineClient");
  });

  it("returns undefined in http mode", () => {
    const clients = buildStdioClients({
      mode: "http",
      config: {
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000
      }
    });

    expect(clients).toBeUndefined();
  });
});
