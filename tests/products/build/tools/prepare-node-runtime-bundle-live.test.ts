import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createBuildClient } from "../../../../src/products/build/client.js";
import { createBuildPrepareNodeRuntimeBundleHandler } from "../../../../src/products/build/tools/prepare-node-runtime-bundle.js";

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

function readBuildStepName(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_STEP_NAME?.trim() || "Npm构建";
}

if (hasLiveEnv(process.env)) {
  describe("createBuildPrepareNodeRuntimeBundleHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.buildBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createBuildClient(http);
    const handler = createBuildPrepareNodeRuntimeBundleHandler(client);
    const jobId = readJobId(process.env);
    const stepName = readBuildStepName(process.env);

    it("returns a real dry-run preview for the live bundle step", async () => {
      const result = await handler({
        job_id: jobId,
        step_name: stepName,
        output_file: "codearts-mcp.tgz",
        staging_dir: ".release-bundle"
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: jobId,
        targetStepName: stepName,
        outputFile: "codearts-mcp.tgz",
        stagingDir: ".release-bundle",
        executed: false
      });
      expect(typeof item?.alreadyConfigured).toBe("boolean");
      expect(typeof item?.updatedCommand).toBe("string");
      expect(String(item?.updatedCommand)).toContain("# codex-node-runtime-bundle:start");
    }, 30000);
  });
} else {
  describe.skip("createBuildPrepareNodeRuntimeBundleHandler live", () => {});
}
