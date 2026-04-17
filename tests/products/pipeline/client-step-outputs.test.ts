import { describe, expect, it } from "vitest";
import { createPipelineClient } from "../../../src/products/pipeline/client.js";

describe("createPipelineClient step outputs", () => {
  it("maps step outputs responses", async () => {
    const client = createPipelineClient({
      get: async () => ({
        step_outputs: [
          {
            step_run_id: "step-1",
            output_result: [{ key: "new_issue_count", value: "0" }]
          }
        ],
        current_system_time: 1710153194163
      })
    } as never);

    const result = await client.getStepOutputs({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      step_run_ids: ["step-1"]
    });

    expect(result).toEqual({
      step_outputs: [
        {
          step_run_id: "step-1",
          output_result: [{ key: "new_issue_count", value: "0" }]
        }
      ],
      current_system_time: 1710153194163
    });
  });
});
