import { describe, expect, it } from "vitest";
import { mapPipelineStepOutputs } from "../../../../src/products/pipeline/tools/get-step-outputs.js";
import { expectMappedItems } from "./tool-test-helpers.js";

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

    expectMappedItems(result, [
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
