import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createCheckClient } from "../../../src/products/check/client.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_CHECK_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_CHECK_LIVE_PROJECT_ID?.trim() || "b60f3ec187f34c35ad3033d1d6d73876";
}

function readTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_CHECK_LIVE_TASK_ID?.trim() || "d5026e942a7b4d639f4ea6369f45a6f5";
}

if (hasLiveEnv(process.env)) {
  describe("createCheckClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.checkBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createCheckClient(http);
    const projectId = readProjectId(process.env);
    const taskId = readTaskId(process.env);

    it("lists rulesets and tasks for the known project", async () => {
      const [rulesets, tasks] = await Promise.all([
        client.listRulesets({
          project_id: projectId,
          page: 1,
          page_size: 20
        }),
        client.listTasks({
          project_id: projectId,
          page: 1,
          page_size: 20
        })
      ]);

      expect(Array.isArray(rulesets.rulesets)).toBe(true);
      expect(rulesets.rulesets.length).toBeGreaterThan(0);
      expect(Array.isArray(tasks.tasks)).toBe(true);
      expect(tasks.tasks.length).toBeGreaterThan(0);
    }, 30000);

    it("gets metrics and summary for the known live task", async () => {
      const [task, metrics] = await Promise.all([
        client.getTask({
          task_id: taskId
        }),
        client.getMetrics({
          project_id: projectId,
          task_id: taskId
        })
      ]);

      expect(task.task_id).toBe(taskId);
      expect(typeof task.task_name).toBe("string");
      expect(metrics.task_id).toBe(taskId);
    }, 30000);

    it("lists issues for the known live task", async () => {
      const result = await client.listTaskIssues({
        task_id: taskId,
        page: 1,
        page_size: 20
      });

      expect(Array.isArray(result.issues)).toBe(true);
    }, 30000);
  });
} else {
  describe.skip("createCheckClient live smoke", () => {});
}
