import { describe, expect, it } from "vitest";
import { createArtifactClient } from "../../../src/products/artifact/client.js";

describe("createArtifactClient", () => {
  it("maps search artifact responses with nested result", async () => {
    const client = createArtifactClient({
      post: async () => ({
        result: {
          artifacts: [
            {
              name: "gateway-1.0.0.jar",
              relativePath: "/com/demo/gateway/1.0.0",
              repo: "repo-1",
              repoName: "libs-release",
              displayName: "gateway-1.0.0.jar",
              repoType: "maven2"
            }
          ],
          total_count: 1
        }
      })
    } as never);

    const result = await client.searchArtifacts({
      artifact_name: "gateway",
      page: 1,
      page_size: 10
    });

    expect(result.artifacts).toEqual([
      {
        name: "gateway-1.0.0.jar",
        relative_path: "/com/demo/gateway/1.0.0",
        repo: "repo-1",
        repo_name: "libs-release",
        display_name: "gateway-1.0.0.jar",
        repo_type: "maven2"
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("uses tenant and project path when listing repositories", async () => {
    let requestedPath = "";
    const client = createArtifactClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          repositories: [{ id: "repo-1", name: "libs-release", package_type: "maven2" }],
          total: 1
        };
      }
    } as never);

    const result = await client.listRepositories({
      tenant_id: "tenant-1",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toContain("/cloudartifact/v5/tenant-1/project-1/repositories?page_no=1&page_size=20");
    expect(result.repositories).toEqual([
      {
        id: "repo-1",
        name: "libs-release",
        project_id: undefined,
        format: "maven2",
        description: undefined
      }
    ]);
    expect(result.total).toBe(1);
  });
});
