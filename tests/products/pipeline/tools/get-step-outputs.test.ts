import { describe, expect, it } from "vitest";
import { mapPipelineStepOutputs } from "../../../../src/products/pipeline/tools/get-step-outputs.js";

describe("mapPipelineStepOutputs", () => {
  it("returns normalized pipeline step outputs", () => {
    const result = mapPipelineStepOutputs([
      {
        step_run_id: "step-1",
        output_result: [
          { key: "image", value: "demo:v1" },
          { key: "digest", value: "sha256:123" }
        ]
      }
    ]);

    expect(result.items).toEqual([
      {
        id: "step-1",
        stepRunId: "step-1",
        outputCount: 2,
        outputs: [
          { key: "image", value: "demo:v1" },
          { key: "digest", value: "sha256:123" }
        ]
      }
    ]);
  });
});
