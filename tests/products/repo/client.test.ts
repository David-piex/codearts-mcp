import { describe, expect, it, vi } from "vitest";
import { createRepoClient } from "../../../src/products/repo/client.js";

describe("createRepoClient", () => {
  it("supports array responses when listing repositories", async () => {
    const client = createRepoClient({
      get: async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]
    } as never);

    const result = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(result.repositories).toEqual([
      { id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }
    ]);
    expect(result.total).toBe(1);
  });

  it("reuses a short-lived cache for repeated identical repository list calls", async () => {
    let now = 1_000;
    const get = vi.fn(async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });
    now += 1_000;
    const second = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(second).toEqual(first);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("refreshes the repository list cache after the short cache window expires", async () => {
    let now = 1_000;
    const get = vi
      .fn()
      .mockResolvedValueOnce([{ id: 1, name: "sample-1" }])
      .mockResolvedValueOnce([{ id: 2, name: "sample-2" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });
    now += 30_001;
    const second = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(first.repositories[0]?.id).toBe(1);
    expect(second.repositories[0]?.id).toBe(2);
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("deduplicates concurrent listRepositories calls for the same key", async () => {
    const get = vi.fn(async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => 1_000
      }
    );

    const [left, right] = await Promise.all([
      client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 }),
      client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 })
    ]);

    expect(left.total).toBe(1);
    expect(right.total).toBe(1);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("keeps the default repository list cache alive beyond the legacy 15 second window", async () => {
    let now = 1_000;
    const get = vi.fn(async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        now: () => now
      }
    );

    await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });
    now += 20_000;
    await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(get).toHaveBeenCalledTimes(1);
  });

  it("uses repository path when listing branches", async () => {
    let requestedPath = "";
    const client = createRepoClient({
      get: async (path: string) => {
        requestedPath = path;
        return [{ name: "master", protected: true }];
      }
    } as never);

    const result = await client.listBranches({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(requestedPath).toContain("/v4/repositories/repo-1/repository/branches");
    expect(result.branches[0]?.name).toBe("master");
  });

  it("supports wrapped tag responses from the live provider", async () => {
    const client = createRepoClient({
      get: async () => ({
        result: {
          total: 2,
          tags: [
            { name: "v1.0.0", is_double_name: false },
            { name: "v1.1.0", is_double_name: true }
          ]
        }
      })
    } as never);

    const result = await client.listTags({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result).toEqual({
      tags: [
        { name: "v1.0.0", is_double_name: false },
        { name: "v1.1.0", is_double_name: true }
      ],
      total: 2
    });
  });

  it("supports stringified tag payloads from the live provider", async () => {
    const client = createRepoClient({
      get: async () =>
        JSON.stringify({
          result: {
            total: 1,
            tags: [{ name: "v2.0.0", is_double_name: false }]
          }
        })
    } as never);

    const result = await client.listTags({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result).toEqual({
      tags: [{ name: "v2.0.0", is_double_name: false }],
      total: 1
    });
  });

  it("uses the official create repository path and normalizes the response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            repository_uuid: "repo-uuid-1",
            project_uuid: "project-uuid-1"
          }
        };
      }
    } as never);

    const result = await client.createRepository({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      import_members: 1,
      template_id: "template-1",
      visibility_level: 20,
      enable_readme: true,
      description: "demo repository"
    });

    expect(requestedPath).toBe("/v1/repositories");
    expect(requestedBody).toEqual({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      import_members: 1,
      template_id: "template-1",
      visibility_level: 20,
      enable_readme: 1,
      description: "demo repository"
    });
    expect(result).toEqual({
      repository_uuid: "repo-uuid-1",
      project_uuid: "project-uuid-1"
    });
  });

  it("omits undefined optional fields when creating a repository", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return {
          repository_uuid: "repo-uuid-2",
          project_uuid: "project-uuid-2"
        };
      }
    } as never);

    await client.createRepository({
      project_uuid: "project-uuid-2",
      name: "minimal-repo"
    });

    expect(requestedBody).toStrictEqual({
      project_uuid: "project-uuid-2",
      name: "minimal-repo"
    });
  });

  it("encodes HTTPS import_url values when creating a repository", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return {
          repository_uuid: "repo-uuid-5",
          project_uuid: "project-uuid-5"
        };
      }
    } as never);

    await client.createRepository({
      project_uuid: "project-uuid-5",
      name: "imported-repo",
      import_url: "https://github.com/example/demo.git"
    });

    expect(requestedBody).toMatchObject({
      import_url: "aHR0cHM6Ly9naXRodWIuY29tL2V4YW1wbGUvZGVtby5naXQ="
    });
  });

  it("normalizes boolean enable_readme values to provider integers", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return {
          result: {
            repository_uuid: "repo-uuid-3"
          },
          status: "success"
        };
      }
    } as never);

    await client.createRepository({
      project_uuid: "project-uuid-3",
      name: "bool-readme-repo",
      enable_readme: true
    });

    expect(requestedBody).toStrictEqual({
      project_uuid: "project-uuid-3",
      name: "bool-readme-repo",
      enable_readme: 1
    });
  });

  it("throws when the provider returns a failed create repository envelope", async () => {
    const client = createRepoClient({
      post: async () => ({
        error: {
          code: "CH.000001",
          message: "JSON parse error"
        },
        status: "failed"
      })
    } as never);

    await expect(
      client.createRepository({
        project_uuid: "project-uuid-4",
        name: "failed-repo",
        enable_readme: true
      })
    ).rejects.toMatchObject({
      name: "AppError",
      message: "JSON parse error",
      code: "CH.000001"
    });
  });
  it("passes merge request creation optional fields", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return { id: 1, iid: 2, title: "Add demo" };
      }
    } as never);

    await client.createMergeRequest({
      repository_id: "repo-1",
      source_branch: "feature/demo",
      target_branch: "main",
      title: "Add demo",
      description: "Demo",
      target_project_id: "target-project-1",
      assignee_id: 1001,
      reviewer_ids: [1002, "1003"],
      remove_source_branch: true,
      squash: true,
      draft: false,
      labels: ["feat", "api"],
      milestone_id: 7
    });

    expect(requestedBody).toEqual({
      source_branch: "feature/demo",
      target_branch: "main",
      title: "Add demo",
      description: "Demo",
      target_project_id: "target-project-1",
      assignee_id: 1001,
      reviewer_ids: [1002, "1003"],
      remove_source_branch: true,
      squash: true,
      draft: false,
      labels: "feat,api",
      milestone_id: 7
    });
  });

  it("passes merge request merge optional fields", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      put: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return { id: 1, iid: 2, state: "merged" };
      }
    } as never);

    await client.mergeMergeRequest({
      repository_id: "repo-1",
      merge_request_iid: "2",
      squash: true,
      force_merge: false,
      sha: "abc123",
      merge_commit_message: "Merge feature/demo",
      squash_commit_message: "Squash feature/demo",
      should_remove_source_branch: true
    });

    expect(requestedBody).toEqual({
      squash: true,
      force_merge: false,
      sha: "abc123",
      merge_commit_message: "Merge feature/demo",
      squash_commit_message: "Squash feature/demo",
      should_remove_source_branch: true
    });
  });

  it("uses the official personal repository import records path and query", async () => {
    let requestedPath = "";
    const client = createRepoClient({
      get: async (path: string) => {
        requestedPath = path;
        return [
          {
            id: 1,
            state: "finished",
            repository: { id: 2, name: "demo" },
            source_type: "github"
          }
        ];
      }
    } as never);

    const result = await client.listPersonalRepositoryImportRecords({
      page: 2,
      page_size: 50,
      state: "finished",
      source_type: "github",
      search: "demo",
      order_by: "created_at",
      sort: "desc"
    });

    expect(requestedPath).toContain("/v4/user/repository-import-records?");
    expect(requestedPath).toContain("offset=50");
    expect(requestedPath).toContain("limit=50");
    expect(requestedPath).toContain("state=finished");
    expect(requestedPath).toContain("source_type=github");
    expect(requestedPath).toContain("search=demo");
    expect(requestedPath).toContain("order_by=created_at");
    expect(requestedPath).toContain("sort=desc");
    expect(result.records[0]?.repository?.name).toBe("demo");
    expect(result.total).toBe(1);
  });

  it("uses the portal repository import path and HAR-compatible body", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;
        return { status: "success" };
      }
    } as never);

    const result = await client.importRepository({
      project_uuid: "project-uuid-1",
      import_type: "git",
      codecheck: 0,
      fetch_refs_type: "default",
      endpoint_uuid: "",
      source_repo_id: "123456",
      source_url: "https://gitee.com/example/demo.git",
      source_type: "gitee",
      source_full_name: "example/demo",
      target_repo_name: "demo",
      visibility_level: 0,
      security_level: "",
      group_id: null,
      mirror_repository: 0,
      source_visibility: "public"
    });

    expect(requestedPath).toBe("/v1/repo/repository/importRepository");
    expect(requestedBody).toEqual({
      projectId: "project-uuid-1",
      importType: "git",
      codecheck: 0,
      fetchRefsType: "default",
      endpointUUId: "",
      importRepoList: [
        {
          sourceRepoId: "123456",
          sourceUrl: "aHR0cHM6Ly9naXRlZS5jb20vZXhhbXBsZS9kZW1vLmdpdA==",
          sourceType: "gitee",
          sourceFullName: "example/demo",
          targetRepoName: "demo",
          visibilityLevel: 0,
          securityLevel: "",
          groupId: null,
          mirrorRepository: 0,
          sourceVisibility: "public"
        }
      ]
    });
    expect(result.status).toBe("success");
  });

  it("calls remote mirror endpoints with normalized bodies", async () => {
    const calls: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "get", path });
        return { id: 1, repository_id: 2, url: "https://example.com/repo.git" };
      },
      post: async (path: string, body: Record<string, unknown>) => {
        calls.push({ method: "post", path, body });
        return path.endsWith("/associate")
          ? { id: 1, repository_id: 2, url: body.url as string }
          : { jid: "job-1" };
      },
      put: async (path: string, body: Record<string, unknown>) => {
        calls.push({ method: "put", path, body });
        return { url: body.url as string, mirroring_enabled: body.mirroring_enabled as boolean };
      }
    } as never);

    await client.associateRemoteMirror({ repository_id: "repo-1", url: "https://example.com/repo.git" });
    await client.startRemoteMirrorSynchronization({
      repository_id: "repo-1",
      endpoint_uuid: "endpoint-1",
      force_fetch: true
    });
    await client.getRemoteMirror({ repository_id: "repo-1" });
    await client.updateRemoteMirror({
      repository_id: "repo-1",
      url: "https://example.com/updated.git",
      mirroring_enabled: true,
      sync_branch_type: "default"
    });

    expect(calls).toEqual([
      {
        method: "post",
        path: "/v4/repositories/repo-1/remote-mirror/associate",
        body: { url: "https://example.com/repo.git" }
      },
      {
        method: "post",
        path: "/v4/repositories/repo-1/remote-mirror",
        body: { endpoint_uuid: "endpoint-1", force_fetch: true }
      },
      {
        method: "get",
        path: "/v4/repositories/repo-1/remote-mirror"
      },
      {
        method: "put",
        path: "/v4/repositories/repo-1/remote-mirror",
        body: {
          url: "https://example.com/updated.git",
          mirroring_enabled: true,
          sync_branch_type: "default"
        }
      }
    ]);
  });

});
