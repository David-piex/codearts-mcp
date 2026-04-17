import { describe, expect, it } from "vitest";
import { createArtifactListFilesHandler } from "../../../../src/products/artifact/tools/list-files.js";

describe("createArtifactListFilesHandler", () => {
  it("maps artifact file list into MCP output", async () => {
    const handler = createArtifactListFilesHandler({
      listFiles: async () => ({
        files: [
          {
            path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
            name: "gateway-1.0.0.jar",
            type: "file",
            size: "1024"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      repo_name: "libs-release"
    });

    expect(result.structuredContent.summary).toContain("1 artifact files");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      name: "gateway-1.0.0.jar",
      type: "file",
      size: "1024"
    });
  });
});
