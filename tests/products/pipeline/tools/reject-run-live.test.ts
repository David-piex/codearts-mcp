import { describe, expect, it } from "vitest";
import { createPipelineRejectRunHandler } from "../../../../src/products/pipeline/tools/reject-run.js";

describe("createPipelineRejectRunHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createPipelineRejectRunHandler({
      rejectRun: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      executed: false
    });
  });

  it("maps rejected pipeline run into MCP output", async () => {
    const handler = createPipelineRejectRunHandler({
      rejectRun: async () => ({
        success: true
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      success: true,
      executed: true
    });
  });
});
