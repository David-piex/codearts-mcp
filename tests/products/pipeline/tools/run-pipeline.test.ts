import { describe, expect, it } from "vitest";
import { previewRunPipeline } from "../../../../src/products/pipeline/tools/run-pipeline.js";
import { expectDryRunPreviewMatch } from "./tool-test-helpers.js";

describe("previewRunPipeline", () => {
  it("supports dry-run pipeline triggers", () => {
    const result = previewRunPipeline({
      project_id: "project-1",
      pipeline_id: "pl-1",
      branch: "main",
      dry_run: true
    });

    expectDryRunPreviewMatch(result, {
      executed: false
    });
  });
});
