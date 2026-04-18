import { describe, expect, it } from "vitest";
import { createArtifactGetFileTreeHandler } from "../../../../src/products/artifact/tools/get-file-tree.js";

describe("createArtifactGetFileTreeHandler", () => {
  it("maps artifact file tree into MCP output", async () => {
    const handler = createArtifactGetFileTreeHandler({
      getFileTree: async () => ({
        root_path: "/",
        nodes: [{ path: "/releases", name: "releases", type: "folder" }]
      })
    });

    const result = await handler({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "release"
    });

    expect(result.structuredContent.item).toEqual({
      id: "release",
      tenantId: "tenant-1",
      projectId: "project-1",
      repoName: "release",
      rootPath: "/",
      nodeCount: 1,
      nodes: [{ path: "/releases", name: "releases", type: "folder" }]
    });
  });
});
