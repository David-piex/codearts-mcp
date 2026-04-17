import { describe, expect, it } from "vitest";
import { mapPipelineRunParameters } from "../../../../src/products/pipeline/tools/get-run-parameters.js";

describe("mapPipelineRunParameters", () => {
  it("returns normalized runtime variables", () => {
    const result = mapPipelineRunParameters("run-1", [
      { name: "branch", value: "main", is_runtime: true }
    ]);

    expect(result.items).toHaveLength(1);
    expect(result.items?.[0]?.name).toBe("branch");
    expect(result.items?.[0]?.runtime).toBe(true);
  });
});
