import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployGetAppLogHandler } from "../../../../src/products/deploy/tools/get-app-log.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readApplicationId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_APPLICATION_ID?.trim() || "4ec9b1c2a08647c385d9a62dd2b1df15";
}

function readRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_RECORD_ID?.trim() || "bf3093a9c392449b99c6b849b49be28e";
}

if (hasLiveEnv(process.env)) {
  describe("createDeployGetAppLogHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployGetAppLogHandler(client);
    const applicationId = readApplicationId(process.env);
    const recordId = readRecordId(process.env);

    it("loads app log text for a real deploy record", async () => {
      const result = await handler({
        application_id: applicationId,
        record_id: recordId,
        offset: "0",
        end_offset: "4000"
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: recordId,
        applicationId,
        recordId
      });
      expect(typeof item?.text).toBe("string");
      expect(String(item?.text).length > 0).toBe(true);
    }, 30000);
  });
} else {
  describe.skip("createDeployGetAppLogHandler live", () => {});
}
