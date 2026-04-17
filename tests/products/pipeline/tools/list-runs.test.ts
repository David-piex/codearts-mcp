import { describe, expect, it } from "vitest";
import { mapPipelineRuns } from "../../../../src/products/pipeline/tools/list-runs.js";

describe("mapPipelineRuns", () => {
  it("returns normalized pipeline runs with pagination", () => {
    const result = mapPipelineRuns(
      [{ pipeline_run_id: "run-1", status: "success", executor_name: "Bob" }],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "run-1",
        status: "success",
        executorName: "Bob"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});
