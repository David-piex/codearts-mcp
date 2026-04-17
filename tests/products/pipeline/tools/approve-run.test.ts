import { describe, expect, it } from "vitest";
import {
  mapApproveRunResult,
  previewApproveRun
} from "../../../../src/products/pipeline/tools/approve-run.js";

describe("previewApproveRun", () => {
  it("returns a dry-run summary for approving a pipeline run", () => {
    const result = previewApproveRun({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      executed: false
    });
  });
});

describe("mapApproveRunResult", () => {
  it("returns normalized approve run result", () => {
    const result = mapApproveRunResult({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      pipeline_run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      status: "approved"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      status: "approved",
      executed: true
    });
  });
});
