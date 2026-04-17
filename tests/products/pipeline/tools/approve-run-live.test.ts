import { describe, expect, it } from "vitest";
import { createPipelineApproveRunHandler } from "../../../../src/products/pipeline/tools/approve-run.js";

describe("createPipelineApproveRunHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createPipelineApproveRunHandler({
      approveRun: async () => {
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

  it("maps approved pipeline run into MCP output", async () => {
    const handler = createPipelineApproveRunHandler({
      approveRun: async () => ({
        pipeline_run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        status: "PASSED"
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
      status: "PASSED",
      executed: true
    });
  });
});
