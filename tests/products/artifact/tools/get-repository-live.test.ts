import { describe, expect, it } from "vitest";
import { createArtifactGetRepositoryHandler } from "../../../../src/products/artifact/tools/get-repository.js";

describe("createArtifactGetRepositoryHandler", () => {
  it("maps artifact repository detail into MCP output", async () => {
    const handler = createArtifactGetRepositoryHandler({
      getRepository: async () => ({
        id: "repo-1",
        name: "libs-release",
        project_id: "project-1",
        format: "maven2",
        description: "release repository"
      })
    });

    const result = await handler({ repository_id: "repo-1" });

    expect(result.structuredContent.item).toEqual({
      id: "repo-1",
      name: "libs-release",
      projectId: "project-1",
      format: "maven2",
      description: "release repository"
    });
  });
});
