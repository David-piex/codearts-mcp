import { describe, expect, it } from "vitest";
import { mapPipelineRunLog } from "../../../../src/products/pipeline/tools/get-run-log.js";

describe("mapPipelineRunLog", () => {
  it("returns normalized log payload metadata", () => {
    const result = mapPipelineRunLog("run-1", "line1\nline2");

    expect(result.item?.pipelineRunId).toBe("run-1");
    expect(result.item?.size).toBe(11);
    expect(result.item?.truncated).toBe(false);
  });
});
