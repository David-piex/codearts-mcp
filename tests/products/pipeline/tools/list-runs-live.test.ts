import { describe, expect, it } from "vitest";
import { createPipelineListRunsHandler } from "../../../../src/products/pipeline/tools/list-runs.js";

describe("createPipelineListRunsHandler", () => {
  it("maps pipeline runs into MCP output", async () => {
    const handler = createPipelineListRunsHandler({
      listRuns: async () => ({
        records: [{ pipeline_run_id: "run-1", status: "RUNNING", executor_name: "yao" }],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 runs");
    expect(result.structuredContent.items![0].id).toBe("run-1");
  });
});
