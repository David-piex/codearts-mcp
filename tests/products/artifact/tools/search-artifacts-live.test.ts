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
      project_id: "project-1",
      repo_name: "libs-release",
      page: 1,
      page_size: 10
    });

    expect(result.structuredContent.summary).toContain("1 artifacts");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "repo-1:/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      projectId: "project-1",
      name: "gateway-1.0.0.jar",
      path: "/com/demo/gateway/1.0.0",
      repositoryId: "repo-1",
      repositoryName: "libs-release",
      displayName: "gateway-1.0.0.jar",
      repositoryType: "maven2"
    });
  });

  it("falls back to requested project_id and repo_name for artifact search results", async () => {
    const handler = createArtifactSearchArtifactsHandler({
      searchArtifacts: async () => ({
        artifacts: [
          {
            name: "gateway-1.0.1.jar",
            relative_path: "/com/demo/gateway/1.0.1",
            repo: "repo-1",
            display_name: "gateway-1.0.1.jar",
            repo_type: "maven2"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      artifact_name: "gateway",
      project_id: "project-9",
      repo_name: "libs-snapshot",
      page: 1,
      page_size: 10
    });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "repo-1:/com/demo/gateway/1.0.1/gateway-1.0.1.jar",
      projectId: "project-9",
      name: "gateway-1.0.1.jar",
      path: "/com/demo/gateway/1.0.1",
      repositoryId: "repo-1",
      repositoryName: "libs-snapshot",
      displayName: "gateway-1.0.1.jar",
      repositoryType: "maven2"
    });
  });
});
