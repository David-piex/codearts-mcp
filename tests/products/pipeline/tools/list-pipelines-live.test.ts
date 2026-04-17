import { describe, expect, it } from "vitest";
import { createPipelineListPipelinesHandler } from "../../../../src/products/pipeline/tools/list-pipelines.js";

describe("createPipelineListPipelinesHandler", () => {
  it("maps pipeline list responses into MCP output", async () => {
    const handler = createPipelineListPipelinesHandler({
      listPipelines: async () => ({
        records: [
          {
            pipeline_id: "pipe-1",
            name: "release-main",
            creator_name: "yao"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 pipelines");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "pipe-1",
      name: "release-main",
      creatorName: "yao"
    });
  });
});
