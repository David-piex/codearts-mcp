import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createDeployClient } from "../../../../src/products/deploy/client.js";
import { createDeployListV4ApplicationsHandler } from "../../../../src/products/deploy/tools/list-v4-applications.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_PROJECT_ID?.trim() || "7bd39587c14048aebdadd0f9c22b1402";
}

if (hasLiveEnv(process.env)) {
  describe("createDeployListV4ApplicationsHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const handler = createDeployListV4ApplicationsHandler(client);
    const projectId = readProjectId(process.env);

    it("reaches the published v4 applications route and currently returns an empty list on this tenant", async () => {
      const result = await handler({
        project_id: projectId,
        limit: 20,
        offset: 0
      });

      expect(result.structuredContent.items).toEqual([]);
      expect(result.structuredContent.page_info).toEqual({
        page: 1,
        pageSize: 20,
        total: 0
      });
      expect(result.structuredContent.raw).toEqual({
        total: 0,
        resources: []
      });
    }, 30000);
  });
} else {
  describe.skip("createDeployListV4ApplicationsHandler live", () => {});
}
