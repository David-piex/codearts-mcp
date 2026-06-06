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

  it("maps capacity, permission, and child proxy repository endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);

        if (path.includes("capacity-notice")) {
          return { result: { capacity_threshold: 80, is_mail_enabled: true } };
        }
        if (path.includes("/privileges")) {
          return { result: { role_name: "developer", operations: ["download"] } };
        }
        if (path.includes("/user/permissions")) {
          return { result: { is_download: true, is_upload: false } };
        }
        if (path.includes("/repositories/user/info")) {
          return { result: { username: "repo-user", password: "secret" } };
        }
        if (path.includes("/repositories/users")) {
          return {
            result: {
              data: [
                {
                  user_id: "user-1",
                  user_name: "repo-user",
                  repo_user_name: "domain_user-1",
                  enabled: "true"
                }
              ],
              total_records: 1
            }
          };
        }
        return {
          result: [
            {
              repository_id: "repo-child-1",
              repository_name: "npm-proxy",
              type: "proxy"
            }
          ]
        };
      }
    });

    await expect(client.showCapacityNoticeSettings()).resolves.toEqual({
      raw: { capacity_threshold: 80, is_mail_enabled: true }
    });
    await expect(client.showUserPrivileges({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      raw: { role_name: "developer", operations: ["download"] }
    });
    await expect(client.showUserPermissions({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      raw: { is_download: true, is_upload: false }
    });
    await expect(client.getRepositoryUserInfo()).resolves.toEqual({
      username: "repo-user",
      raw: { username: "repo-user", password: "secret" }
    });
    await expect(client.listRepositoryUsers({
      page: 2,
      page_size: 10,
      user_name: "repo"
    })).resolves.toEqual({
      users: [
        {
          user_id: "user-1",
          user_name: "repo-user",
          repo_user_name: "domain_user-1",
          enabled: "true"
        }
      ],
      total: 1
    });
    await expect(client.listChildProxyRepositories({
      repo_id: "repo-1",
      type: "npm"
    })).resolves.toEqual({
      repositories: [
        {
          repository_id: "repo-child-1",
          repository_name: "npm-proxy",
          type: "proxy"
        }
      ],
      total: 1
    });
    expect(requests).toEqual([
      "/devreposerver/v5/capacity-notice/settings",
      "/v5/user/project-1/privileges",
      "/devreposerver/v5/user/permissions?project_id=project-1",
      "/cloudartifact/v5/repositories/user/info",
      "/cloudartifact/v5/repositories/users?page_no=2&page_size=10&user_name=repo",
      "/cloudartifact/v5/repositories/proxy?repo_id=repo-1&type=npm"
    ]);
  });

  it("maps additional project settings, role permissions, storage, attention, scan, and opensource endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);

        if (path.includes("/auto-deletion/settings")) {
          return { result: { enabled: true, keep_days: 30 } };
        }
        if (path.includes("/project-role/permissions")) {
          return { result: { permissions: [{ id: "role-1", name: "developer" }], total: 1 } };
        }
        if (path.includes("/storageinfo/statistic")) {
          return { result: { statistics: [{ date: "2026-05-23", used_size: 1024 }], total: 1 } };
        }
        if (path.includes("/attention/artifacts")) {
          return { result: { artifacts: [{ id: "attention-1", name: "pkg" }], total: 1 } };
        }
        if (path.includes("/sec-guard/task/list")) {
          return { result: { task_list: [{ id: "scan-1", status: "finished" }], total: 1 } };
        }

        return { result: { enabled: true } };
      }
    });

    await expect(client.showAutoDeleteJobSettings({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      raw: { enabled: true, keep_days: 30 }
    });
    await expect(client.listProjectRolePermissions({ project_id: "project-1" })).resolves.toEqual({
      permissions: [{ id: "role-1", name: "developer" }],
      total: 1
    });
    await expect(client.listStorageStatistics({
      tenant_id: "tenant-1",
      project_id: "project-1"
    })).resolves.toEqual({
      statistics: [{ date: "2026-05-23", used_size: 1024 }],
      total: 1
    });
    await expect(client.listAttentions({
      project_id: "project-1",
      page: 2,
      page_size: 10
    })).resolves.toEqual({
      attentions: [{ id: "attention-1", name: "pkg" }],
      total: 1
    });
    await expect(client.listSecGuardTasks({
      date: "2026-05-23",
      page: 3,
      page_size: 20
    })).resolves.toEqual({
      tasks: [{ id: "scan-1", status: "finished" }],
      total: 1
    });
    await expect(client.showOpenSourceEnabled()).resolves.toEqual({
      value: true,
      raw: { enabled: true }
    });

    expect(requests).toEqual([
      "/devreposerver/v5/release/project-1/auto-deletion/settings",
      "/devreposerver/v5/project-role/permissions?project_id=project-1",
      "/cloudartifact/v5/tenant-1/project-1/storageinfo/statistic",
      "/cloudartifact/v5/attention/artifacts?page_no=2&page_size=10&project_id=project-1",
      "/cloudartifact/v5/sec-guard/task/list?page_no=3&page_size=20&date=2026-05-23",
      "/cloudartifact/v5/opensource/enabled"
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

  it("uses checksum search and Maven project repository endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/search/checksum")) {
          return {
            result: {
              artifacts: [
                {
                  id: "artifact-1",
                  name: "gateway.jar",
                  path: "/com/demo/gateway.jar"
                }
              ],
              total: 1
            }
          };
        }

        return {
          result: {
            repositories: [
              {
                repository_id: "repo-1",
                repository_name: "libs-release"
              }
            ],
            total_count: 1
          }
        };
      }
    });

    await expect(client.searchByChecksum({
      checksum: "abc123",
      page: 2,
      page_size: 10,
      format: "maven2",
      in_project: true,
      project_id: "project-1"
    })).resolves.toEqual({
      artifacts: [
        {
          id: "artifact-1",
          name: "gateway.jar",
          path: "/com/demo/gateway.jar"
        }
      ],
      total: 1
    });
    await expect(client.listMavenProjectRepositories({
      page: 3,
      page_size: 20,
      search_name: "libs",
      repo_id: "repo-1"
    })).resolves.toEqual({
      repositories: [
        {
          repository_id: "repo-1",
          repository_name: "libs-release"
        }
      ],
      total: 1
    });

    expect(requests).toEqual([
      "/cloudartifact/v5/search/checksum?checksum=abc123&page_no=2&page_size=10&format=maven2&in_project=true&project_id=project-1",
      "/v5/maven/project/repository?offset=40&limit=20&search_name=libs&repo_id=repo-1"
    ]);
  });

  it("uses additional official read endpoints and redacts sensitive fields", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.startsWith("/cloudartifact/v5/maven/list")) {
          return {
            result: [
              {
                id: "repo-1",
                repository_name: "libs-release",
                password: "secret"
              }
            ],
            total: 1
          };
        }
        if (path.startsWith("/cloudartifact/v5/maven/repository/list")) {
          return {
            result: {
              data: [{ id: "repo-list-1", repository_name: "libs-snapshot", password: "secret" }],
              total_records: 1
            }
          };
        }
        if (path.startsWith("/cloudartifact/v5/tenant-1/project-1/repo-1/repositories")) {
          return {
            result: {
              id: "repo-1",
              repository_name: "libs-release",
              password: "secret"
            }
          };
        }
        if (path.startsWith("/v2/project-1/release/files")) {
          return {
            result: {
              data: [{ id: "file-1", path: "/release/app.zip", download_url: "https://example.com/app.zip" }],
              total_records: 1
            }
          };
        }
        if (path.startsWith("/devreposerver/v2/release/project-1/files")) {
          return {
            result: {
              data: [{ id: "file-2", path: "/release/app2.zip" }],
              total_records: 1
            }
          };
        }
        if (path.startsWith("/cloudartifact/v5/projects/project-1/users")) {
          return {
            result: {
              data: [{ id: "user-1", name: "szh", token: "abc" }],
              total_records: 1
            }
          };
        }
        if (path.startsWith("/cloudartifact/v5/domain/ipconfig")) {
          return {
            result: {
              data: [{ id: "ip-1", ip: "192.0.2.1" }],
              total_records: 1
            }
          };
        }
        if (path.startsWith("/cloudartifact/v5/repositories/project-1/repo-1/privileges")) {
          return {
            result: {
              Viewer: [{ role_id: "role-1", operations: "downloadorview" }]
            }
          };
        }
        if (path.startsWith("/cloudartifact/v3/user/project-1/privileges")) {
          return {
            result: {
              role_id: "role-1",
              operations: "editRepository"
            }
          };
        }
        if (path.startsWith("/devreposerver/v5/files/file-1/info")) {
          return {
            result: {
              id: "file-1",
              name: "app.zip",
              password: "secret"
            }
          };
        }
        if (path.startsWith("/devreposerver/v5/files/info")) {
          return {
            result: {
              id: "file-2",
              name: "app2.zip"
            }
          };
        }
        if (path.startsWith("/cloudartifact/v5/ticket")) {
          return {
            result: "ticket-value"
          };
        }
        throw new Error(`unexpected path ${path}`);
      }
    });

    await expect(client.listMavenRepositories({
      project_id: "project-1",
      default: true,
      policy: "release",
      repo_ids: ["repo-1", "repo-2"],
      access: "r"
    })).resolves.toEqual({
      repositories: [
        {
          id: "repo-1",
          repository_name: "libs-release",
          password: "***"
        }
      ],
      total: 1
    });
    await expect(client.listMavenRepositoryList({
      project_id: "project-1",
      policy: "snapshot",
      format: "maven2",
      type: "hosted",
      repo_id: "repo-1",
      search_name: "libs"
    })).resolves.toEqual({
      repositories: [
        {
          id: "repo-list-1",
          repository_name: "libs-snapshot",
          password: "***"
        }
      ],
      total: 1
    });
    await expect(client.getRepositoryDetail({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_id: "repo-1",
      region: "cn-north-4",
      path: "/com/example"
    })).resolves.toEqual({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_id: "repo-1",
      raw: {
        id: "repo-1",
        repository_name: "libs-release",
        password: "***"
      }
    });
    await expect(client.listProjectReleaseFiles({
      project_id: "project-1",
      file_name: "app.zip",
      page: 2,
      page_size: 10
    })).resolves.toEqual({
      files: [{ id: "file-1", path: "/release/app.zip", download_url: "https://example.com/app.zip" }],
      total: 1
    });
    await expect(client.listReleaseFiles({
      project_id: "project-1",
      file_name: "app2.zip",
      page: 1,
      page_size: 20
    })).resolves.toEqual({
      files: [{ id: "file-2", path: "/release/app2.zip" }],
      total: 1
    });
    await expect(client.listProjectUsers({
      project_id: "project-1",
      repo_id: "repo-1",
      scene: "repository",
      page: 3,
      page_size: 20
    })).resolves.toEqual({
      users: [{ id: "user-1", name: "szh", token: "***" }],
      total: 1
    });
    await expect(client.listDomainIpConfigs({ page: 1, page_size: 10 })).resolves.toEqual({
      configs: [{ id: "ip-1", ip: "192.0.2.1" }],
      total: 1
    });
    await expect(client.showRepositoryPrivileges({ project_id: "project-1", repo_id: "repo-1" })).resolves.toEqual({
      project_id: "project-1",
      repo_id: "repo-1",
      raw: {
        Viewer: [{ role_id: "role-1", operations: "downloadorview" }]
      }
    });
    await expect(client.showUserPrivilegesV3({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      raw: {
        role_id: "role-1",
        operations: "editRepository"
      }
    });
    await expect(client.getRepoFileInfoById({ id: "file-1" })).resolves.toEqual({
      id: "file-1",
      name: "app.zip",
      password: "***"
    });
    await expect(client.getRepoFileInfoByName({ file_name: "project-1/app2.zip" })).resolves.toEqual({
      id: "file-2",
      name: "app2.zip"
    });
    await expect(client.showUserTicket()).resolves.toEqual({
      ticket: "ticket-value",
      raw: {
        result: "ticket-value"
      }
    });

    expect(requests).toEqual([
      "/cloudartifact/v5/maven/list?project_id=project-1&default=true&policy=release&repo_ids=repo-1%2Crepo-2&access=r",
      "/cloudartifact/v5/maven/repository/list?project_id=project-1&policy=snapshot&format=maven2&type=hosted&repo_id=repo-1&search_name=libs",
      "/cloudartifact/v5/tenant-1/project-1/repo-1/repositories?region=cn-north-4&path=%2Fcom%2Fexample",
      "/v2/project-1/release/files?file_name=app.zip&offset=10&limit=10",
      "/devreposerver/v2/release/project-1/files?file_name=app2.zip&offset=0&limit=20",
      "/cloudartifact/v5/projects/project-1/users?repo_id=repo-1&page_no=3&page_size=20&scene=repository",
      "/cloudartifact/v5/domain/ipconfig?page_no=1&page_size=10",
      "/cloudartifact/v5/repositories/project-1/repo-1/privileges",
      "/cloudartifact/v3/user/project-1/privileges",
      "/devreposerver/v5/files/file-1/info",
      "/devreposerver/v5/files/info?file_name=project-1%2Fapp2.zip",
      "/cloudartifact/v5/ticket"
    ]);
  });

  it("uses attention and permanent file deletion endpoints", async () => {
    const post = async (path: string, body: Record<string, unknown>) => {
      expect(path).toBe("/cloudartifact/v5/attention");
      expect(body).toEqual({
        format: "npm",
        attention: "1",
        ids: ["pkg-1"]
      });
      return {
        status: "success",
        trace_id: "trace-post",
        result: null
      };
    };
    const del = async (path: string, body?: unknown) => {
      expect(path).toBe("/devreposerver/v5/files/compeletion");
      expect(body).toEqual(["file-1"]);
      return {
        status: "success",
        trace_id: "trace-delete",
        result: {
          success: 1,
          failed: 0,
          success_items: ["file-1"],
          failed_items: [],
          reason: []
        }
      };
    };
    const client = createClient({
      get: async () => ({ result: {} }),
      post,
      delete: del
    });

    await expect(client.createAttention({
      format: "npm",
      attention: "1",
      ids: ["pkg-1"]
    })).resolves.toEqual({
      status: "success",
      trace_id: "trace-post",
      raw: {
        status: "success",
        trace_id: "trace-post",
        result: null
      }
    });
    await expect(client.deleteCompletelyUpdateFileState({ ids: ["file-1"] })).resolves.toEqual({
      status: "success",
      trace_id: "trace-delete",
      raw: {
        success: 1,
        failed: 0,
        success_items: ["file-1"],
        failed_items: [],
        reason: []
      },
      success: 1,
      failed: 0,
      success_items: ["file-1"],
      failed_items: [],
      reason: []
    });
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
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            total_records: 1,
            data: [
              {
                path: "/gateway/1.0.0/gateway.jar",
                file_name: "gateway.jar",
                type: "file",
                size: 2048
              }
            ]
          }
        };
      }
    });

    const result = await client.listFiles(
      createProjectPageInput({
        repo_name: "libs-release",
        parent_id: "0",
        search_name: "gateway",
        search_type: "name",
        extension: "jar",
        order_by: "created_time",
        sort: "desc",
        status: "active",
        category: "prod"
      })
    );

    expect(requestedPath).toBe("/devreposerver/v5/files/list");
    expect(requestedBody).toEqual({
      project_id: "project-1",
      page_no: 1,
      page_size: 20,
      parent_id: "0",
      search_name: "gateway",
      search_type: "name",
      extension: "jar",
      order_by: "created_time",
      sort: "desc",
      status: "active",
      category: "prod"
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
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return (
        JSON.stringify({
          result: {
            total_count: 1,
            data: [
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
        );
      }
    });

    const result = await client.listBuildArchives(createPageInput({
      keyword: "gateway",
      parent_id: "parent-1",
      build_id: "build-1",
      build_no: "3",
      repo_branch: "main"
    }));

    expect(requestedPath).toBe(
      "/devreposerver/v5/files/archives?offset=0&limit=20&search=gateway&parent_id=parent-1&build_id=build-1&build_no=3&repo_branch=main"
    );
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

  it("maps repository mutation endpoints and request bodies", async () => {
    const requests: Array<{ method: string; path: string; body: unknown }> = [];
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requests.push({ method: "POST", path, body });
        return { result: { status: "ok", trace_id: "trace-create" } };
      },
      put: async (path: string, body: unknown) => {
        requests.push({ method: "PUT", path, body });
        return { status: "ok", trace_id: "trace-put" };
      },
      delete: async (path: string, body: unknown) => {
        requests.push({ method: "DELETE", path, body });
        return JSON.stringify({ result: { status: "ok", trace_id: "trace-delete" } });
      }
    });

    await expect(client.createRepository({
      format: "maven2",
      type: "hosted",
      repository_name: "libs-release",
      includes_pattern: "**/*",
      project_id: "project-1",
      description: "release repository",
      share_right: "project",
      params: { custom_flag: true }
    })).resolves.toEqual({
      status: "ok",
      trace_id: "trace-create",
      raw: {
        status: "ok",
        trace_id: "trace-create"
      }
    });

    await expect(client.updateRepository({
      repo_name: "libs-release",
      format: "maven2",
      repository_ids: ["repo-1"],
      includes_pattern: "**/*",
      description: "updated repository",
      deployment_policy: "allow_redeploy",
      auto_clean_snapshot: true,
      snapshot_alive_days: "30",
      params: { custom_flag: false }
    })).resolves.toEqual({
      status: "ok",
      trace_id: "trace-put",
      raw: {
        status: "ok",
        trace_id: "trace-put"
      }
    });

    const trashItems = [
      {
        id: "repo-1",
        format: "maven2",
        uri: "libs-release",
        status: "deleted"
      }
    ];

    await expect(client.restoreTrashRepositories({ items: trashItems })).resolves.toEqual({
      status: "ok",
      trace_id: "trace-put",
      raw: {
        status: "ok",
        trace_id: "trace-put"
      }
    });
    await expect(client.deleteTrashRepositories({ items: trashItems })).resolves.toEqual({
      status: "ok",
      trace_id: "trace-delete",
      raw: {
        status: "ok",
        trace_id: "trace-delete"
      }
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/cloudartifact/v5/artifact/",
        body: {
          custom_flag: true,
          format: "maven2",
          type: "hosted",
          repository_name: "libs-release",
          includes_pattern: "**/*",
          project_id: "project-1",
          description: "release repository",
          share_right: "project"
        }
      },
      {
        method: "PUT",
        path: "/cloudartifact/v5/artifact/",
        body: {
          custom_flag: false,
          repo_name: "libs-release",
          format: "maven2",
          repository_ids: ["repo-1"],
          includes_pattern: "**/*",
          description: "updated repository",
          deployment_policy: "allow_redeploy",
          auto_clean_snapshot: true,
          snapshot_alive_days: "30"
        }
      },
      {
        method: "PUT",
        path: "/cloudartifact/v5/trashes",
        body: trashItems
      },
      {
        method: "DELETE",
        path: "/cloudartifact/v5/trashes",
        body: trashItems
      }
    ]);
  });
});
