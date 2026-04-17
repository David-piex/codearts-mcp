import { describe, expect, it } from "vitest";
import { mapPipelineList } from "../../../../src/products/pipeline/tools/list-pipelines.js";

describe("mapPipelineList", () => {
  it("returns normalized pipelines with pagination", () => {
    const result = mapPipelineList(
      [{ pipeline_id: "pipe-1", name: "release-pipeline", creator_name: "Bob" }],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "pipe-1",
        name: "release-pipeline",
        creatorName: "Bob"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});
