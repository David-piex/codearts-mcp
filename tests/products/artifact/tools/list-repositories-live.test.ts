import { describe, expect, it } from "vitest";
import { createArtifactListRepositoriesHandler } from "../../../../src/products/artifact/tools/list-repositories.js";

describe("createArtifactListRepositoriesHandler", () => {
  it("maps artifact repositories into MCP output", async () => {
    const handler = createArtifactListRepositoriesHandler({
      listRepositories: async () => ({
        repositories: [
          {
            id: "repo-1",
            name: "libs-release",
            project_id: "project-1",
            format: "maven2"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      tenant_id: "tenant-1",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.summary).toContain("1 artifact repositories");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "repo-1",
      name: "libs-release",
      projectId: "project-1",
      format: "maven2"
    });
  });
});
