import { describe, expect, it } from "vitest";
import { mapPipelineRunExecutionDetail } from "../../../../src/products/pipeline/tools/get-run-detail.js";
import { expectMappedItem } from "./tool-test-helpers.js";

describe("mapPipelineRunExecutionDetail", () => {
  it("returns normalized pipeline execution detail data", () => {
    const result = mapPipelineRunExecutionDetail({
      id: "run-1",
      pipeline_id: "pipe-1",
      name: "release-pipeline",
      status: "success",
      executor_name: "Bob",
      trigger_type: "manual",
      run_number: 42,
      detail_url: "https://example.com/runs/42",
      stages: [{ id: "stage-1" }, { id: "stage-2" }]
    });

    expectMappedItem(result, {
      id: "run-1",
      pipelineId: "pipe-1",
      name: "release-pipeline",
      status: "success",
      executorName: "Bob",
      triggerType: "manual",
      runNumber: 42,
      detailUrl: "https://example.com/runs/42",
      stageCount: 2
    });
  });
});
