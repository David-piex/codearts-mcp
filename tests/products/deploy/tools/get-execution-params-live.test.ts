import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployGetExecutionParamsHandler } from "../../../../src/products/deploy/tools/get-execution-params.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_DEPLOY_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_TASK_ID?.trim() || "418443e4c4034b54b0bd399412c6e168";
}

function readRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_RECORD_ID?.trim() || "c0efeb5cb77642a4b57da207c8067ef9";
}

if (hasLiveEnv(process.env)) {
  describe("createDeployGetExecutionParamsHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployGetExecutionParamsHandler(client);
    const taskId = readTaskId(process.env);
    const recordId = readRecordId(process.env);

    it("loads live runtime params from a real deploy record", async () => {
      const result = await handler({
        task_id: taskId,
        record_id: recordId
      });

      expect(result.structuredContent.scope).toEqual({
        taskId,
        recordId
      });
      expect(result.structuredContent.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "host_group" }),
          expect.objectContaining({ name: "package_url" }),
          expect.objectContaining({ name: "service_port" })
        ])
      );
    }, 30000);
  });
} else {
  describe.skip("createDeployGetExecutionParamsHandler live", () => {});
}
