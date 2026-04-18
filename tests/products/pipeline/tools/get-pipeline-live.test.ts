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
        is_publish: false,
        project_id: "owner-project",
        project_name: "housekeeper",
        detail_url: "https://example.com/detail",
        modify_url: "https://example.com/modify"
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.structuredContent.item).toEqual({
      id: "pipe-1",
      name: "release-main",
      description: "release flow",
      manifestVersion: "3.0",
      creatorName: "yao",
      isPublish: false,
      projectId: "owner-project",
      projectName: "housekeeper",
      detailUrl: "https://example.com/detail",
      modifyUrl: "https://example.com/modify"
    });
  });
});
