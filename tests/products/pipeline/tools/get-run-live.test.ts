import { describe, expect, it } from "vitest";
import { createPipelineGetRunHandler } from "../../../../src/products/pipeline/tools/get-run.js";

describe("createPipelineGetRunHandler", () => {
  it("maps pipeline run details into MCP output", async () => {
    const handler = createPipelineGetRunHandler({
      getRun: async () => ({
        pipeline_run_id: "run-1",
        status: "SUCCEEDED",
        executor_name: "yao",
        trigger_type: "MANUAL"
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1", run_id: "run-1" });

    expect(result.structuredContent.item).toEqual({
      id: "run-1",
      status: "SUCCEEDED",
      executorName: "yao",
      triggerType: "MANUAL"
    });
  });
});
