import { describe, expect, it } from "vitest";
import { createArtifactSearchArtifactsHandler } from "../../../../src/products/artifact/tools/search-artifacts.js";

describe("createArtifactSearchArtifactsHandler", () => {
  it("maps artifact search results into MCP output", async () => {
    const handler = createArtifactSearchArtifactsHandler({
      searchArtifacts: async () => ({
        artifacts: [
          {
            name: "gateway-1.0.0.jar",
            relative_path: "/com/demo/gateway/1.0.0",
            repo: "repo-1",
            repo_name: "libs-release",
            display_name: "gateway-1.0.0.jar",
            repo_type: "maven2"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      artifact_name: "gateway",
      page: 1,
      page_size: 10
    });

    expect(result.structuredContent.summary).toContain("1 artifacts");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "repo-1:/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      name: "gateway-1.0.0.jar",
      path: "/com/demo/gateway/1.0.0",
      repositoryId: "repo-1",
      repositoryName: "libs-release",
      displayName: "gateway-1.0.0.jar",
      repositoryType: "maven2"
    });
  });
});
