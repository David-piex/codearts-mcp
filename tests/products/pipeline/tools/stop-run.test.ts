import { describe, expect, it } from "vitest";
import {
  mapStopRunResult,
  previewStopRun
} from "../../../../src/products/pipeline/tools/stop-run.js";
import {
  expectDryRunPreview,
  expectMappedItem
} from "./tool-test-helpers.js";

describe("previewStopRun", () => {
  it("returns a dry-run summary for stopping a pipeline run", () => {
    const result = previewStopRun({
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      executed: false
    });
  });
});

describe("mapStopRunResult", () => {
  it("returns normalized stop run result", () => {
    const result = mapStopRunResult({
      pipeline_id: "pipe-1",
      pipeline_name: "release-pipeline",
      run_id: "run-1"
    });

    expectMappedItem(result, {
      pipelineId: "pipe-1",
      pipelineName: "release-pipeline",
      pipelineRunId: "run-1",
      executed: true
    });
  });
});
