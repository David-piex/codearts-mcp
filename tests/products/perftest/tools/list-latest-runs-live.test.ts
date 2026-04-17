import { describe, expect, it } from "vitest";
import { createPerfTestListLatestRunsHandler } from "../../../../src/products/perftest/tools/list-latest-runs.js";

describe("createPerfTestListLatestRunsHandler", () => {
  it("maps perftest latest runs into MCP output", async () => {
    const handler = createPerfTestListLatestRunsHandler({
      getTask: async () => ({
        related_temp_running_data: [{ task_run_info_id: 99, related_temp_running_id: 101 }]
      })
    });

    const result = await handler({ project_id: "project-1", task_id: 11 });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "99", taskRunInfoId: 99 });
  });
});
