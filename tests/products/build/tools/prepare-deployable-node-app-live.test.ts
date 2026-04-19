import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../../src/core/config/env.js";
import { createHttpClient } from "../../../../src/core/http/client.js";
import { createBuildClient } from "../../../../src/products/build/client.js";
import { createBuildPrepareDeployableNodeAppHandler } from "../../../../src/products/build/tools/prepare-deployable-node-app.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_BUILD_BASE_URL &&
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
  describe("createBuildPrepareDeployableNodeAppHandler live", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.buildBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createBuildClient(http);
    const handler = createBuildPrepareDeployableNodeAppHandler(client);
    const jobId = readJobId(process.env);
    const stepName = readBuildStepName(process.env);

    it("returns a real dry-run preview for the live build step", async () => {
      const result = await handler({
        job_id: jobId,
        step_name: stepName,
        entry_file: "src/server/deploy-entry.ts",
        output_file: "app.js",
        target_runtime: "node20"
      });
      const item = result.structuredContent.item;

      expect(item).toMatchObject({
        id: jobId,
        targetStepName: stepName,
        entryFile: "src/server/deploy-entry.ts",
        outputFile: "app.js",
        targetRuntime: "node20",
        executed: false
      });
      expect(typeof item?.alreadyConfigured).toBe("boolean");
      expect(typeof item?.updatedCommand).toBe("string");
      expect(String(item?.updatedCommand)).toContain("# codex-deployable-node-app:start");
    }, 30000);
  });
} else {
  describe.skip("createBuildPrepareDeployableNodeAppHandler live", () => {});
}
