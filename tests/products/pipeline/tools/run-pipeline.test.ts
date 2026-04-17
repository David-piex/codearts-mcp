import { describe, expect, it } from "vitest";
import { previewRunPipeline } from "../../../../src/products/pipeline/tools/run-pipeline.js";

describe("previewRunPipeline", () => {
  it("supports dry-run pipeline triggers", () => {
    const result = previewRunPipeline({
      project_id: "project-1",
      pipeline_id: "pl-1",
      branch: "main",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item?.executed).toBe(false);
  });
});
