import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployStopAppHandler } from "../../../../src/products/deploy/tools/stop-app.js";

function hasLiveStopExecuteEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_DEPLOY_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION &&
      source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_TASK_ID &&
      source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_HOST_GROUP &&
      source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_PACKAGE_URL &&
      source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_SERVICE_PORT
  );
}

function readTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_TASK_ID!.trim();
}

function readHostGroup(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_HOST_GROUP!.trim();
}

function readPackageUrl(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_PACKAGE_URL!.trim();
}

function readServicePort(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_SERVICE_PORT!.trim();
}

if (hasLiveStopExecuteEnv(process.env)) {
  describe("createDeployStopAppHandler live execute", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployStopAppHandler(client);
    const taskId = readTaskId(process.env);
    const hostGroup = readHostGroup(process.env);
    const packageUrl = readPackageUrl(process.env);
    const servicePort = readServicePort(process.env);

    it("starts a real record and then stops it", async () => {
      const started = await client.startApp({
        task_id: taskId,
        trigger_source: 1,
        params: [
          { name: "host_group", type: "host_group", value: hostGroup },
          { name: "package_url", type: "text", value: packageUrl },
          { name: "service_port", type: "text", value: servicePort }
        ]
      });

      expect(typeof started.record_id).toBe("string");
      expect(String(started.record_id)).toMatch(/^[0-9a-f]{32}$/);

      const result = await handler({
        task_id: taskId,
        record_id: String(started.record_id),
        dry_run: false
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: taskId,
        recordId: String(started.record_id),
        executed: true
      });
    }, 30000);
  });
} else {
  describe.skip("createDeployStopAppHandler live execute", () => {});
}
