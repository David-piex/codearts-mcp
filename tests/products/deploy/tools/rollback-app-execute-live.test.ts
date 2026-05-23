import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployRollbackAppHandler } from "../../../../src/products/deploy/tools/rollback-app.js";

function hasLiveRollbackEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION &&
      source.HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_TASK_ID &&
      source.HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_RECORD_ID
  );
}

function readRollbackTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_TASK_ID!.trim();
}

function readRollbackRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_RECORD_ID!.trim();
}

if (hasLiveRollbackEnv(process.env)) {
  describe("createDeployRollbackAppHandler live execute", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployRollbackAppHandler(client);
    const taskId = readRollbackTaskId(process.env);
    const recordId = readRollbackRecordId(process.env);

    it("executes a real rollback for an explicitly supplied record", async () => {
      const result = await handler({
        task_id: taskId,
        record_id: recordId,
        dry_run: false
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: taskId,
        sourceRecordId: recordId,
        executed: true
      });
      expect(typeof item?.recordId).toBe("string");
      expect(String(item?.recordId)).toMatch(/^[0-9a-f]{32}$/);
    }, 30000);
  });
} else {
  describe.skip("createDeployRollbackAppHandler live execute", () => {});
}
