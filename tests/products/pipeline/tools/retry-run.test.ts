import { describe, expect, it } from "vitest";
import {
  mapRetryRunResult,
  previewRetryRun
} from "../../../../src/products/pipeline/tools/retry-run.js";

describe("previewRetryRun", () => {
  it("returns a dry-run summary for retrying a pipeline run", () => {
    const result = previewRetryRun({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      executed: false
    });
  });
});

describe("mapRetryRunResult", () => {
  it("returns normalized retry run result", () => {
    const result = mapRetryRunResult({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      source_run_id: "run-1",
      pipeline_run_id: "run-2"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      sourceRunId: "run-1",
      pipelineRunId: "run-2",
      executed: true
    });
  });
});
