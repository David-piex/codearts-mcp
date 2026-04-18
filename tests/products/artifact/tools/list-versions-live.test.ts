import { describe, expect, it } from "vitest";
import { createArtifactListVersionsHandler } from "../../../../src/products/artifact/tools/list-versions.js";

describe("createArtifactListVersionsHandler", () => {
  it("maps artifact versions into MCP output", async () => {
    const handler = createArtifactListVersionsHandler({
      listVersions: async () => ({
        versions: [
          {
            version: "1.2.0",
            repo_name: "release",
            artifact_name: "service-a",
            created_at: "2026-04-16T10:00:00Z",
            files_count: 1,
            category: "test"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "1.2.0",
      versionId: "1.2.0",
      projectId: "project-1",
      version: "1.2.0",
      repoName: "release",
      artifactName: "service-a",
      createdAt: "2026-04-16T10:00:00Z",
      updatedAt: undefined,
      downloads: undefined,
      fileCount: 1,
      category: "test"
    });
  });
});
