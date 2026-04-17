import { describe, expect, it } from "vitest";
import { createPipelineGetRunDetailHandler } from "../../../../src/products/pipeline/tools/get-run-detail.js";

describe("createPipelineGetRunDetailHandler", () => {
  it("maps pipeline run detail into MCP output", async () => {
    const handler = createPipelineGetRunDetailHandler({
      getRunDetail: async () => ({
        id: "run-1",
        pipeline_id: "pipe-1",
        name: "release-main",
        status: "RUNNING",
        executor_name: "yao",
        trigger_type: "Manual",
        run_number: 8,
        detail_url: "https://example.com/pipeline/run-1",
        stages: [{ id: "stage-1" }, { id: "stage-2" }]
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "run-1",
      pipelineId: "pipe-1",
      name: "release-main",
      status: "RUNNING",
      executorName: "yao",
      triggerType: "Manual",
      runNumber: 8,
      detailUrl: "https://example.com/pipeline/run-1",
      stageCount: 2
    });
  });
});
