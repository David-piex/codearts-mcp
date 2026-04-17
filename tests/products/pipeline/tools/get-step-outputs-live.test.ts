import { describe, expect, it } from "vitest";
import { createPipelineGetStepOutputsHandler } from "../../../../src/products/pipeline/tools/get-step-outputs.js";

describe("createPipelineGetStepOutputsHandler", () => {
  it("maps pipeline step outputs into MCP output", async () => {
    const handler = createPipelineGetStepOutputsHandler({
      getStepOutputs: async () => ({
        step_outputs: [
          {
            step_run_id: "step-1",
            output_result: [
              { key: "new_issue_count", value: "0" },
              { key: "codecheck.deadly", value: "0" }
            ]
          }
        ],
        current_system_time: 1710153194163
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      step_run_ids: ["step-1"]
    });

    expect(result.structuredContent.summary).toContain("1 pipeline step outputs");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "step-1",
      stepRunId: "step-1",
      outputCount: 2,
      outputs: [
        { key: "new_issue_count", value: "0" },
        { key: "codecheck.deadly", value: "0" }
      ]
    });
  });
});
