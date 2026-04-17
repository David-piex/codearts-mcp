import { describe, expect, it } from "vitest";
import { mapPipelineDetail } from "../../../../src/products/pipeline/tools/get-pipeline.js";

describe("mapPipelineDetail", () => {
  it("returns normalized pipeline detail data", () => {
    const result = mapPipelineDetail({
      id: "pipe-1",
      name: "release-pipeline",
      description: "Release flow",
      manifest_version: "3.0",
      creator_name: "Bob",
      is_publish: true
    });

    expect(result.item).toEqual({
      id: "pipe-1",
      name: "release-pipeline",
      description: "Release flow",
      manifestVersion: "3.0",
      creatorName: "Bob",
      isPublish: true
    });
  });
});
