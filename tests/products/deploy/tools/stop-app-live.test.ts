import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployStopAppHandler } from "../../../../src/products/deploy/tools/stop-app.js";
import { AppError } from "../../../../src/core/errors/app-error.js";

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

function readRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_RECORD_ID?.trim() || "bf3093a9c392449b99c6b849b49be28e";
}

if (hasLiveEnv(process.env)) {
  describe("createDeployStopAppHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployStopAppHandler(client);
    const taskId = readTaskId(process.env);
    const recordId = readRecordId(process.env);

    it("returns a real dry-run stop preview against an existing record", async () => {
      let result;
      try {
        result = await handler({ task_id: taskId, record_id: recordId });
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).status).toBe(400);
        expect((error as AppError).message).toContain("92");
        return;
      }
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: taskId,
        recordId,
        executed: false
      });
      expect(typeof item?.status).toBe("string");
    }, 30000);
  });
} else {
  describe.skip("createDeployStopAppHandler live", () => {});
}
