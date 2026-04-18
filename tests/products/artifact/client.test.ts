import { describe, expect, it } from "vitest";
import { createArtifactClient } from "../../../src/products/artifact/client.js";

describe("createArtifactClient", () => {
  it("maps versions when provider returns a bare result array", async () => {
    const client = createArtifactClient({
      get: async () => ({
        result: [
          {
            build_version: "1.0.0",
            repo_name: "libs-release",
            artifact_name: "gateway",
            downloads: 3,
            files_count: 1,
            category: "test"
          }
        ]
      })
    } as never);

    const result = await client.listVersions({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.versions).toEqual([
      {
        version: "1.0.0",
        repo_name: "libs-release",
        artifact_name: "gateway",
        created_at: undefined,
        updated_at: undefined,
        downloads: 3,
        files_count: 1,
        category: "test"
      }
    ]);
  });

  it("maps latest version files when provider returns a bare result array", async () => {
    const client = createArtifactClient({
      get: async () => ({
        result: [
          {
            path: "/gateway/1.0.0/gateway.jar",
            name: "gateway.jar",
            version: "1.0.0",
            repo_name: "libs-release",
            size: 1024
          }
        ]
      })
    } as never);

    const result = await client.listLatestVersionFiles({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.files).toEqual([
      {
        path: "/gateway/1.0.0/gateway.jar",
        name: "gateway.jar",
        version: "1.0.0",
        repo_name: "libs-release",
        size: "1024",
        modified_at: undefined
      }
    ]);
  });

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
          repositories: [
            {
              id: "repo-1",
              name: "libs-release",
              package_type: "maven2",
              description: "release repository"
            }
          ],
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
        description: "release repository"
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("reads repositories and total from nested result payload", async () => {
    const client = createArtifactClient({
      get: async () => ({
        result: {
          total: 2,
          repositories: [
            {
              repository_id: "repo-1",
              name: "libs-release",
              package_type: "maven2",
              description: "release repository"
            }
          ]
        }
      })
    } as never);

    const result = await client.listRepositories({
      tenant_id: "tenant-1",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.repositories).toEqual([
      {
        id: "repo-1",
        name: "libs-release",
        project_id: undefined,
        format: "maven2",
        description: "release repository"
      }
    ]);
    expect(result.total).toBe(2);
  });

  it("uses the file-tree endpoint with a root path query", async () => {
    let requestedPath = "";
    const client = createArtifactClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            root_path: "/",
            nodes: []
          }
        };
      }
    } as never);

    const result = await client.getFileTree({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "libs-release"
    });

    expect(requestedPath).toBe(
      "/cloudartifact/v5/tenant-1/project-1/libs-release/file-tree?path=%2F"
    );
    expect(result).toEqual({
      root_path: "/",
      nodes: []
    });
  });

  it("supports stringified repository payloads from the provider", async () => {
    const client = createArtifactClient({
      get: async () =>
        JSON.stringify({
          result: {
            total: 1,
            repositories: [{ repository_id: "repo-1", name: "libs-release", package_type: "maven2" }]
          }
        })
    } as never);

    const result = await client.listRepositories({
      tenant_id: "tenant-1",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

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

  it("reads files and total from nested result payload", async () => {
    const client = createArtifactClient({
      post: async () => ({
        result: {
          total: 1,
          files: [
            {
              path: "/gateway/1.0.0/gateway.jar",
              file_name: "gateway.jar",
              type: "file",
              size: 2048
            }
          ]
        }
      })
    } as never);

    const result = await client.listFiles({
      project_id: "project-1",
      repo_name: "libs-release",
      page: 1,
      page_size: 20
    });

    expect(result.files).toEqual([
      {
        path: "/gateway/1.0.0/gateway.jar",
        name: "gateway.jar",
        type: "file",
        size: "2048"
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("supports stringified file-detail payloads from the provider", async () => {
    const client = createArtifactClient({
      get: async () =>
        JSON.stringify({
          result: {
            path: "/gateway/1.0.0/gateway.jar",
            file_name: "gateway.jar",
            download_url: "https://example.com/gateway.jar",
            size: 2048,
            md5: "abc123"
          }
        })
    } as never);

    const result = await client.getFile({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "libs-release",
      path: "/gateway/1.0.0/gateway.jar",
      format: "maven2"
    });

    expect(result).toEqual({
      path: "/gateway/1.0.0/gateway.jar",
      name: "gateway.jar",
      download_uri: "https://example.com/gateway.jar",
      size: "2048",
      md5: "abc123"
    });
  });

  it("supports stringified build archive payloads from the provider", async () => {
    const client = createArtifactClient({
      get: async () =>
        JSON.stringify({
          result: {
            total_count: 1,
            archives: [
              {
                archive_id: "archive-1",
                file_name: "gateway.zip",
                size: 4096,
                download_url: "https://example.com/gateway.zip",
                md5: "xyz789"
              }
            ]
          }
        })
    } as never);

    const result = await client.listBuildArchives({
      page: 1,
      page_size: 20
    });

    expect(result).toEqual({
      archives: [
        {
          id: "archive-1",
          name: "gateway.zip",
          size: "4096",
          download_url: "https://example.com/gateway.zip",
          md5: "xyz789"
        }
      ],
      total: 1
    });
  });
});
