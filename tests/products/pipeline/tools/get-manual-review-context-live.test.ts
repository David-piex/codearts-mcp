import { describe, expect, it } from "vitest";
import { createPipelineGetManualReviewContextHandler } from "../../../../src/products/pipeline/tools/get-manual-review-context.js";

describe("createPipelineGetManualReviewContextHandler", () => {
  it("maps manual review context into MCP output", async () => {
    const handler = createPipelineGetManualReviewContextHandler({
      getRunDetail: async () => ({
        id: "run-1",
        stages: [
          {
            id: "stage-1",
            name: "gate",
            jobs: [
              {
                job_run_id: "job-1",
                name: "manual approval",
                steps: [
                  {
                    step_run_id: "step-1",
                    name: "approve release",
                    task_type: "manual_review",
                    status: "PENDING"
                  }
                ]
              }
            ]
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1"
    });

    expect(result.structuredContent.item?.pendingReviewCount).toBe(1);
    expect(result.structuredContent.item?.reviews?.[0]).toEqual({
      jobId: "job-1",
      jobName: "manual approval",
      stepId: "step-1",
      stepName: "approve release",
      stageId: "stage-1",
      stageName: "gate",
      status: "PENDING",
      type: "manual_review"
    });
  });
});
