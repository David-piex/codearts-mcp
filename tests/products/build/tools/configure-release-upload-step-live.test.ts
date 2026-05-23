import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createBuildClient } from "../../../../src/products/build/client.js";
import { createBuildConfigureReleaseUploadStepHandler } from "../../../../src/products/build/tools/configure-release-upload-step.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readJobId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_JOB_ID?.trim() || "cb9308bf8ece41909247bacd26b32cad";
}

function readReleaseStepName(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_RELEASE_STEP_NAME?.trim() ||
    "Upload package to release repository";
}

if (hasLiveEnv(process.env)) {
  describe("createBuildConfigureReleaseUploadStepHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.buildBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createBuildClient(http);
    const handler = createBuildConfigureReleaseUploadStepHandler(client);
    const jobId = readJobId(process.env);
    const releaseStepName = readReleaseStepName(process.env);

    it("returns a real dry-run preview for the live release upload step", async () => {
      const result = await handler({
        job_id: jobId,
        step_name: releaseStepName,
        file: "codearts-mcp.tgz",
        package_name: "codearts-mcp",
        build_version: "1.0.0",
        custom_upload_path: "/codearts-mcp/1.0.0"
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: jobId,
        stepName: releaseStepName,
        file: "codearts-mcp.tgz",
        packageName: "codearts-mcp",
        buildVersion: "1.0.0",
        customUploadPath: "/codearts-mcp/1.0.0",
        executed: false
      });
      expect(typeof item?.moduleId).toBe("string");
    }, 30000);
  });
} else {
  describe.skip("createBuildConfigureReleaseUploadStepHandler live", () => {});
}
