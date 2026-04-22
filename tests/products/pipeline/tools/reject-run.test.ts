import { describe, expect, it } from "vitest";
import {
  mapRejectRunResult,
  previewRejectRun
} from "../../../../src/products/pipeline/tools/reject-run.js";
import {
  expectDryRunPreview,
  expectMappedItem
} from "./tool-test-helpers.js";

describe("previewRejectRun", () => {
  it("returns a dry-run summary for rejecting a pipeline run", () => {
    const result = previewRejectRun({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      executed: false
    });
  });
});

describe("mapRejectRunResult", () => {
  it("returns normalized reject run result", () => {
    const result = mapRejectRunResult({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      success: true
    });

    expectMappedItem(result, {
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
