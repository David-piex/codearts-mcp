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
            created_at: "2026-04-16T10:00:00Z"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]?.version).toBe("1.2.0");
    expect(result.structuredContent.items?.[0]?.repoName).toBe("release");
  });
});
