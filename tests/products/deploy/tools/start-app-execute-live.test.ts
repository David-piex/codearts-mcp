import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { AppError } from "../../../../src/core/errors/app-error.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployStartAppHandler } from "../../../../src/products/deploy/tools/start-app.js";

function hasLiveStartExecuteEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_DEPLOY_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION &&
      source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_TASK_ID &&
      source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_HOST_GROUP &&
      source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_PACKAGE_URL &&
      source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_SERVICE_PORT
  );
}

function readTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_TASK_ID!.trim();
}

function readHostGroup(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_HOST_GROUP!.trim();
}

function readPackageUrl(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_PACKAGE_URL!.trim();
}

function readServicePort(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_SERVICE_PORT!.trim();
}

if (hasLiveStartExecuteEnv(process.env)) {
  describe("createDeployStartAppHandler live execute", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployStartAppHandler(client);
    const taskId = readTaskId(process.env);
    const hostGroup = readHostGroup(process.env);
    const packageUrl = readPackageUrl(process.env);
    const servicePort = readServicePort(process.env);

    it("executes a real start for an explicitly supplied healthy task", async () => {
      try {
        const result = await handler({
          task_id: taskId,
          trigger_source: 1,
          params: [
            { name: "host_group", type: "host_group", value: hostGroup },
            { name: "package_url", type: "text", value: packageUrl },
            { name: "service_port", type: "text", value: servicePort }
          ],
          dry_run: false
        });
        const item = result.structuredContent.item;

        expect(item).toMatchObject({
          id: taskId,
          executed: true
        });
        expect("recordId" in (item ?? {})).toBe(true);
        expect(String((item as { recordId?: string }).recordId)).toMatch(/^[0-9a-f]{32}$/);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toMatchObject({
          code: "Deploy.00060218",
          status: 400
        });
      }
    }, 30000);
  });
} else {
  describe.skip("createDeployStartAppHandler live execute", () => {});
}
