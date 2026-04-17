import { describe, expect, it } from "vitest";
import { createPipelineGetPipelineHandler } from "../../../../src/products/pipeline/tools/get-pipeline.js";

describe("createPipelineGetPipelineHandler", () => {
  it("maps pipeline detail into MCP output", async () => {
    const handler = createPipelineGetPipelineHandler({
      getPipeline: async () => ({
        id: "pipe-1",
        name: "release-main",
        description: "release flow",
        manifest_version: "3.0",
        creator_name: "yao",
        is_publish: false
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.structuredContent.item).toEqual({
      id: "pipe-1",
      name: "release-main",
      description: "release flow",
      manifestVersion: "3.0",
      creatorName: "yao",
      isPublish: false
    });
  });
});
