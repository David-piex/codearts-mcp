import { describe, it } from "vitest";
import {
  mapCancelQueueResult,
  mapRollbackRunResult,
  mapStepJumpLink,
  previewCancelQueue,
  previewRollbackRun
} from "../../../../src/products/pipeline/tools/manage-run-advanced.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("previewCancelQueue", () => {
  it("returns a dry-run summary for cancel queue", () => {
    const result = previewCancelQueue({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      queue_id: "12",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      queueId: "12",
      executed: false
    });
  });
});

describe("mapCancelQueueResult", () => {
  it("returns normalized cancel queue output", () => {
    const result = mapCancelQueueResult({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      pipeline_run_id: "run-1",
      queue_id: 12
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      queueId: "12",
      executed: true
    });
  });
});

describe("previewRollbackRun", () => {
  it("returns a dry-run summary for rollback", () => {
    const result = previewRollbackRun({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      executed: false
    });
  });
});

describe("mapRollbackRunResult", () => {
  it("returns normalized rollback output", () => {
    const result = mapRollbackRunResult({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      pipeline_run_id: "run-2"
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-2",
      executed: true
    });
  });
});

describe("mapStepJumpLink", () => {
  it("returns normalized step jump link output", () => {
    const result = mapStepJumpLink({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      jump_link: "https://example.com/step"
    });

    expectMappedItem(result, {
      id: "step-1",
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      jumpLink: "https://example.com/step"
    });
  });
});
