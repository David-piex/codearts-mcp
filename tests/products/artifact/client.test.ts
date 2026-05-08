import { describe, expect, it } from "vitest";
import { createArtifactClient } from "../../../src/products/artifact/client.js";

function createClient(transport: Record<string, unknown>) {
  return createArtifactClient(transport as never);
}

function createProjectPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createTenantProjectPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    tenant_id: "tenant-1",
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  page: number;
  page_size: number;
} & T {
  return {
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    page: number;
    page_size: number;
  } & T;
}

function createTenantProjectRepoInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  repo_name: string;
} & T {
  return {
    tenant_id: "tenant-1",
    project_id: "project-1",
    repo_name: "libs-release",
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    repo_name: string;
  } & T;
}

function createTenantProjectRepoFileInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  repo_name: string;
  path: string;
  format: string;
} & T {
  return {
    tenant_id: "tenant-1",
    project_id: "project-1",
    repo_name: "libs-release",
    path: "/gateway/1.0.0/gateway.jar",
    format: "maven2",
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  } & T;
}

describe("createArtifactClient", () => {
  it("maps versions when provider returns a bare result array", async () => {
    const client = createClient({
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
    });

    const result = await client.listVersions(createProjectPageInput());

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
    const client = createClient({
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
    });

    const result = await client.listLatestVersionFiles(createProjectPageInput());

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

  it("uses project version count endpoint with optional filters", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            count: 12
          }
        };
      }
    });

    const result = await client.showProjectVersionsCount({
      project_id: "project-1",
      name: "gateway",
      status: "release"
    });

    expect(requestedPath).toBe("/v5/project-1/versions/count?name=gateway&status=release");
    expect(result).toEqual({
      count: 12,
      total: 12,
      raw: {
        count: 12
      }
    });
  });

  it("uses latest version file count endpoint with optional filters", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total_count: 7
        };
      }
    });

    const result = await client.showLatestVersionFilesCount({
      project_id: "project-1",
      name: "gateway"
    });

    expect(requestedPath).toBe(
      "/devreposerver/v5/project-1/files/version/count?name=gateway"
    );
    expect(result).toEqual({
      count: 7,
      total: 7,
      raw: {
        total_count: 7
      }
    });
  });

  it("maps package and storage read endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);

        if (path.startsWith("/devreposerver/v5/data/package/info")) {
          return { result: { enabled: true } };
        }
        if (path.startsWith("/devreposerver/v5/data/package")) {
          return { result: { package_id: "pkg-1" } };
        }
        if (path.startsWith("/devreposerver/v5/project-1/storage")) {
          return { result: { used_storage: 1024, total_storage: 2048, file_count: 3 } };
        }

        return { result: { used_size: 4096, capacity: 8192 } };
      }
    });

    await expect(client.showPackageDataDetail({ project_id: "project-1" })).resolves.toEqual({
      raw: { package_id: "pkg-1" }
    });
    await expect(client.showPackageInfo({ project_id: "project-1", status: "active" })).resolves.toEqual({
      raw: { enabled: true }
    });
    await expect(client.showDomainReleaseRepoStorage({ package_type: "maven2" })).resolves.toEqual({
      used: "4096",
      total: "8192",
      raw: { used_size: 4096, capacity: 8192 }
    });
    await expect(client.showProjectStorageInfo({ project_id: "project-1" })).resolves.toEqual({
      used: "1024",
      total: "2048",
      file_count: 3,
      raw: { used_storage: 1024, total_storage: 2048, file_count: 3 }
    });
    expect(requests).toEqual([
      "/devreposerver/v5/data/package?project_id=project-1",
      "/devreposerver/v5/data/package/info?project_id=project-1&status=active",
      "/devreposerver/v5/storage?package_type=maven2",
      "/devreposerver/v5/project-1/storage"
    ]);
  });

  it("maps search artifact responses with nested result", async () => {
    const client = createClient({
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
    });

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
    const client = createClient({
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
    });

    const result = await client.listRepositories(createTenantProjectPageInput({ qname: "libs", type: "hosted", format: "maven2", format_list: ["maven2", "npm"], is_recycle_bin: false }));

    expect(requestedPath).toContain("/cloudartifact/v5/tenant-1/project-1/repositories?page_no=1&page_size=20&qname=libs&type=hosted&format=maven2&format_list=maven2%2Cnpm&is_recycle_bin=false");
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
    const client = createClient({
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
    });

    const result = await client.listRepositories(createTenantProjectPageInput());

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
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            root_path: "/",
            nodes: []
          }
        };
      }
    });

    const result = await client.getFileTree(createTenantProjectRepoInput({ path: "/com/example" }));

    expect(requestedPath).toBe(
      "/cloudartifact/v5/tenant-1/project-1/libs-release/file-tree?path=%2Fcom%2Fexample"
    );
    expect(result).toEqual({
      root_path: "/",
      nodes: []
    });
  });

  it("supports stringified repository payloads from the provider", async () => {
    const client = createClient({
      get: async () =>
        JSON.stringify({
          result: {
            total: 1,
            repositories: [{ repository_id: "repo-1", name: "libs-release", package_type: "maven2" }]
          }
        })
    });

    const result = await client.listRepositories(createTenantProjectPageInput());

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
    const client = createClient({
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
    });

    const result = await client.listFiles(
      createProjectPageInput({
        repo_name: "libs-release"
      })
    );

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
    const client = createClient({
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
    });

    const result = await client.getFile(createTenantProjectRepoFileInput());

    expect(result).toEqual({
      path: "/gateway/1.0.0/gateway.jar",
      name: "gateway.jar",
      download_uri: "https://example.com/gateway.jar",
      size: "2048",
      md5: "abc123"
    });
  });

  it("supports stringified build archive payloads from the provider", async () => {
    const client = createClient({
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
    });

    const result = await client.listBuildArchives(createPageInput());

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
