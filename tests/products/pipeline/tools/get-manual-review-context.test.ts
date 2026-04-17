import { describe, expect, it } from "vitest";
import { mapPipelineManualReviewContext } from "../../../../src/products/pipeline/tools/get-manual-review-context.js";

describe("mapPipelineManualReviewContext", () => {
  it("extracts actionable manual review nodes from run detail", () => {
    const result = mapPipelineManualReviewContext("run-1", {
      stages: [
        {
          id: "stage-1",
          name: "gate",
          jobs: [
            {
              id: "job-1",
              name: "manual approval",
              steps: [
                {
                  id: "step-1",
                  name: "approve release",
                  task_type: "manual_review",
                  status: "PENDING"
                }
              ]
            }
          ]
        }
      ]
    });

    expect(result.item?.pendingReviewCount).toBe(1);
    expect(result.item?.reviews?.[0]?.jobId).toBe("job-1");
    expect(result.item?.reviews?.[0]?.stepId).toBe("step-1");
  });
});
