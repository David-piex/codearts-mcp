import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployGetTaskHandler } from "../../../../src/products/deploy/tools/get-task.js";

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

if (hasLiveEnv(process.env)) {
  describe("createDeployGetTaskHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployGetTaskHandler(client);
    const taskId = readTaskId(process.env);

    it("loads the healthy live task metadata from the real service", async () => {
      const result = await handler({ task_id: taskId });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: taskId
      });
      expect(typeof item?.name).toBe("string");
      expect((item?.stepCount as number) > 0).toBe(true);
      expect(typeof item?.parameterCount).toBe("number");
      expect(Array.isArray(item?.parameterNames)).toBe(true);
    }, 30000);
  });
} else {
  describe.skip("createDeployGetTaskHandler live", () => {});
}
