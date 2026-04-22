import { describe, expect, it } from "vitest";
import { mapPipelineRunDetail } from "../../../../src/products/pipeline/tools/get-run.js";
import { expectMappedItem } from "./tool-test-helpers.js";

describe("mapPipelineRunDetail", () => {
  it("returns normalized pipeline run detail data", () => {
    const result = mapPipelineRunDetail({
      pipeline_run_id: "run-1",
      status: "running",
      executor_name: "Bob",
      trigger_type: "manual"
    });

    expectMappedItem(result, {
      id: "run-1",
      status: "running",
      executorName: "Bob",
      triggerType: "manual"
    });
  });
});
