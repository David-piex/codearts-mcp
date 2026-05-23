import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployStartAppHandler } from "../../../../src/products/deploy/tools/start-app.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_TASK_ID?.trim() || "418443e4c4034b54b0bd399412c6e168";
}

function readHostGroup(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_EXECUTION_HOST_GROUP?.trim() || "8db92c3991ea4f51ac6e0cf7a895afde";
}

function readPackageUrl(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_PACKAGE_URL?.trim() || "/codearts-mcp/1.0.0/codearts-mcp.tgz";
}

function readServicePort(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_SERVICE_PORT?.trim() || "3000";
}

if (hasLiveEnv(process.env)) {
  describe("createDeployStartAppHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployStartAppHandler(client);
    const taskId = readTaskId(process.env);

    it("returns a real dry-run preview against the live healthy task", async () => {
      const result = await handler({
        task_id: taskId,
        trigger_source: 1,
        params: [
          { name: "host_group", type: "host_group", value: readHostGroup(process.env) },
          { name: "package_url", type: "text", value: readPackageUrl(process.env) },
          { name: "service_port", type: "text", value: readServicePort(process.env) }
        ]
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: taskId,
        triggerSource: 1,
        paramCount: 3,
        executed: false
      });
      expect("taskName" in (item ?? {})).toBe(true);
    }, 30000);
  });
} else {
  describe.skip("createDeployStartAppHandler live", () => {});
}
