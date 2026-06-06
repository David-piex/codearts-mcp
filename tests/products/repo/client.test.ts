import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../../src/core/errors/app-error.js";
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

  it("uses official repository statistics paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.endsWith("/repository/statistics-status")) {
          return { can_statistics: true, reason: 0 };
        }
        if (path.endsWith("/last-push-event")) {
          return { ref: "master", repository: { id: 100, name: "demo" } };
        }
        if (path.endsWith("/statistics-summary")) {
          return { branches_count: 2, commits_count: 8 };
        }
        if (path.endsWith("/repository/stats/summary")) {
          return { repo_name: "demo", commit_count: 8 };
        }
        if (path.includes("/repository/stats/last-statistics?")) {
          return { total: 1, statistics: [{ id: 1, branch: "master" }] };
        }
        if (path.endsWith("/statistic-data")) {
          return { result: { repoName: "demo", commitCount: 8 } };
        }
        if (path.endsWith("/master")) {
          return { result: true };
        }
        if (path.includes("/repositories/repoid?")) {
          return { result: 100, status: "success" };
        }
        if (path.includes("/commit-lines?")) {
          return { result: { additions: 10, deletions: 4 } };
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.showRepositoryStatisticsStatus({ repository_id: "100" });
    await client.showLastPushEventInRepository({ repository_id: "100" });
    await client.showRepositoryStatisticsSummary({ repository_id: "100" });
    await client.showRepoStatisticsSummary({ repository_id: "100" });
    await client.showRepoLastStatistics({ repository_id: "100", branch_name: "feature/main" });
    await client.showRepositoryStatisticData({ repository_uuid: "repo-uuid-1" });
    await client.showRepositoryMaster({ repository_uuid: "repo-uuid-1" });
    await client.getRepositoryIdByName({ group_name: "demo-group", repository_name: "demo-repo" });
    await client.showRepositoryCommitLines({
      repository_id: "100",
      ref_name: "feature/main",
      begin_date: "2026-06-01",
      end_date: "2026-06-30"
    });

    expect(calls).toEqual([
      "/v4/repositories/100/repository/statistics-status",
      "/v4/repositories/100/last-push-event",
      "/v4/repositories/100/statistics-summary",
      "/v4/repositories/100/repository/stats/summary",
      "/v4/repositories/100/repository/stats/last-statistics?branch_name=feature%2Fmain",
      "/v1/repositories/repo-uuid-1/statistic-data",
      "/v1/repositories/repo-uuid-1/master",
      "/v1/repositories/repoid?group_name=demo-group&repository_name=demo-repo",
      "/v3/repositories/100/commit-lines?ref_name=feature%2Fmain&begin_date=2026-06-01&end_date=2026-06-30"
    ]);
  });

  it("uses official repository template and related commit paths", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown; options?: unknown }> = [];
    const client = createRepoClient({
      get: async (path: string, options?: unknown) => {
        calls.push({ method: "GET", path, options });
        if (path.includes("/repositories/template-status?")) {
          return { result: { repos: [{ uuid: "repo-uuid-1", repo_id: 100 }], total_count: 1 } };
        }
        if (path.includes("/related-commits?")) {
          return { result: { list: [{ id: 1, commitId: "c1" }], total: 1 } };
        }

        throw new Error(`unexpected path: ${path}`);
      },
      put: async (path: string, body: unknown, options?: unknown) => {
        calls.push({ method: "PUT", path, body, options });
        return { result: null, status: "success" };
      }
    } as never);

    await client.listProjectTemplateStatusRepositories({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      page_no: 2,
      page_size: 10
    });
    await client.listRepositoryRelatedCommits({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      type: 1,
      search: "feature",
      page: 3,
      per_page: 5
    });
    await client.updateRepositoryTemplateStatus({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      template_type: "PUBLIC",
      code_title: "Demo Template",
      languages: ["TypeScript"]
    });

    expect(calls).toEqual([
      {
        method: "GET",
        path: "/v2/projects/project-uuid-1/repositories/template-status?page_no=2&page_size=10",
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "GET",
        path: "/v2/repositories/repo-uuid-1/related-commits?type=1&page=3&per_page=5&search=feature",
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "PUT",
        path: "/v2/repositories/repo-uuid-1/template-status",
        body: {
          template_type: "PUBLIC",
          code_title: "Demo Template",
          languages: ["TypeScript"]
        },
        options: { headers: { "X-Auth-Token": "token-1" } }
      }
    ]);
  });

  it("uses official project repository and member management paths", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown; options?: unknown }> = [];
    const client = createRepoClient({
      get: async (path: string, options?: unknown) => {
        calls.push({ method: "GET", path, options });
        if (path.includes("/v2/projects/project-uuid-1/repositories?")) {
          return {
            result: {
              repositories: [{ id: 1, name: "repo-a", ssh_url: "git@example.com:repo-a.git" }],
              total: 1
            }
          };
        }
        if (path.includes("/v1/repositories/repo-uuid-1/members?")) {
          return {
            result: [{ id: "u-1", name: "dev", tenant_name: "tenant-a", status: "active" }],
            total: 1
          };
        }

        throw new Error(`unexpected path: ${path}`);
      },
      post: async (path: string, body?: unknown, options?: unknown) => {
        calls.push({ method: "POST", path, body, options });
        return {
          status: "success",
          result: [{ id: "u-1", name: "dev", status: "success", message: "added" }]
        };
      }
    } as never);

    const repositories = await client.listProjectRepositories({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      page: 2,
      page_size: 10,
      search: "repo"
    });
    const members = await client.listMembers({
      x_auth_token: "token-2",
      repository_uuid: "repo-uuid-1",
      page: 3,
      page_size: 5,
      subject: "dev"
    });
    const added = await client.addRepositoryMembers({
      x_auth_token: "token-3",
      repository_uuid: "repo-uuid-1",
      users: [{ id: "u-1", name: "dev", role: 40, domain_id: "d-1", domain_name: "tenant-a" }]
    });

    expect(repositories).toEqual({
      repositories: [{ id: 1, name: "repo-a", ssh_url: "git@example.com:repo-a.git" }],
      total: 1
    });
    expect(members).toEqual({
      members: [{ id: "u-1", name: "dev", tenant_name: "tenant-a", status: "active" }],
      total: 1
    });
    expect(added).toEqual({
      status: "success",
      result: [{ id: "u-1", name: "dev", status: "success", message: "added" }]
    });
    expect(calls).toEqual([
      {
        method: "GET",
        path: "/v2/projects/project-uuid-1/repositories?page_index=2&page_size=10&search=repo",
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "GET",
        path: "/v1/repositories/repo-uuid-1/members?page_index=3&page_size=5&subject=dev",
        options: { headers: { "X-Auth-Token": "token-2" } }
      },
      {
        method: "POST",
        path: "/v1/repositories/repo-uuid-1/members",
        body: {
          users: [{ id: "u-1", name: "dev", role: 40, domain_id: "d-1", domain_name: "tenant-a" }]
        },
        options: { headers: { "X-Auth-Token": "token-3" } }
      }
    ]);
  });

  it("uses official repository content statistics paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.includes("/repository/submodules?")) {
          return [{ repo_id: 100, path: "libs/core" }];
        }
        if (path.includes("/repository/commit-statistics?")) {
          return { commits: [{ author_name: "dev" }], total: 1 };
        }
        if (path.endsWith("/repository/languages")) {
          return { languages: [{ label: "TypeScript", value: 100 }], status: "success" };
        }
        if (path.includes("/contributors?")) {
          return [{ name: "dev", commits: 10 }];
        }
        if (path.includes("/forks?")) {
          return [{ id: 101, name: "forked" }];
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.listSubmodules({ repository_id: "100", sha: "master", page: 2, page_size: 10 });
    await client.showCommitStatistics({ repository_id: "100", branch_name: "feature/main" });
    await client.listRepositoryLanguages({ repository_id: "100" });
    await client.listRepositoryContributors({
      repository_id: "100",
      page: 1,
      page_size: 20,
      order_by: "commits",
      sort: "desc",
      ref_name: "master",
      skip_merge: true,
      author: "dev"
    });
    await client.listRepositoryForks({
      repository_id: "100",
      page: 1,
      page_size: 20,
      order_by: "updated_at",
      sort: "asc",
      view: "basic"
    });

    expect(calls).toEqual([
      "/v4/repositories/100/repository/submodules?offset=10&limit=10&sha=master",
      "/v4/repositories/100/repository/commit-statistics?branch_name=feature%2Fmain",
      "/v4/repositories/100/repository/languages",
      "/v4/repositories/100/contributors?offset=0&limit=20&order_by=commits&sort=desc&ref_name=master&skip_merge=true&author=dev",
      "/v4/repositories/100/forks?offset=0&limit=20&view=basic&order_by=updated_at&sort=asc"
    ]);
  });

  it("uses official group, project member and user key read paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.includes("/members/addable-list?")) {
          return [{ iam_id: "iam-1", name: "dev", nick_name: "Dev" }];
        }
        if (path.includes("/user-groups/addable-list?")) {
          return [{ id: 7, name: "maintainers", user_group_id: "ug-1" }];
        }
        if (path.includes("/subgroups-and-repositories?")) {
          return [{ id: 11, name: "service", descendant_type: "repository" }];
        }
        if (path.includes("/inherit?")) {
          return { group_id: 9, source_setting: "group", project_id: "project-1" };
        }
        if (path.includes("/projects/project-1/members?")) {
          return [{ id: 17, name: "qa", username: "iam-qa", nick_name: "QA" }];
        }
        if (path.includes("/user/gpg-keys")) {
          return { id: 3, title: "signing", fingerprint: "fp", active: true };
        }
        if (path.includes("/user/keys?")) {
          return { keys: [{ id: 4, title: "laptop", key: "ssh-rsa AAA" }], total: 1 };
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.listGroupAddableMembers({
      group_id: "9",
      project_id: "project-1",
      page: 2,
      page_size: 10
    });
    await client.listGroupAddableUserGroups({
      group_id: "9",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    await client.listGroupSubgroupsAndRepositories({
      group_id: "9",
      page: 1,
      page_size: 20,
      filter: "service",
      order_by: "name",
      sort: "asc",
      archived: false
    });
    await client.showGroupInheritSetting({
      group_id: "9",
      setting_type: "merge_requests"
    });
    await client.listProjectMembers({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      query: "qa"
    });
    await client.listUserGpgKeys({ query: "signing" });
    await client.listUserSshKeys({ page: 2, page_size: 10, query: "laptop" });

    expect(calls).toEqual([
      "/v4/groups/9/members/addable-list?offset=10&limit=10&project_id=project-1",
      "/v4/groups/9/user-groups/addable-list?offset=0&limit=20&project_id=project-1",
      "/v4/groups/9/subgroups-and-repositories?offset=0&limit=20&filter=service&order_by=name&sort=asc&archived=false",
      "/v4/groups/9/inherit?setting_type=merge_requests",
      "/v4/projects/project-1/members?offset=0&limit=20&query=qa",
      "/v4/user/gpg-keys?query=signing",
      "/v4/user/keys?offset=10&limit=10&query=laptop"
    ]);
  });

  it("uses official current user SSH key mutation paths", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createRepoClient({
      post: async (path: string, body?: unknown) => {
        calls.push({ method: "POST", path, body });
        return { id: 123, title: "laptop", key: "ssh-rsa AAA", created_at: "2026-05-24T10:00:00.000+08:00" };
      },
      delete: async (path: string) => {
        calls.push({ method: "DELETE", path });
        return {};
      }
    } as never);

    const created = await client.createUserSshKey({
      title: "laptop",
      key: "ssh-rsa AAA"
    });
    const deleted = await client.deleteUserSshKey({ key_id: "123" });

    expect(created).toMatchObject({
      id: 123,
      title: "laptop"
    });
    expect(deleted).toEqual({
      key_id: "123",
      deleted: true
    });
    expect(calls).toEqual([
      {
        method: "POST",
        path: "/v4/user/keys",
        body: {
          title: "laptop",
          key: "ssh-rsa AAA"
        }
      },
      {
        method: "DELETE",
        path: "/v4/user/keys/123"
      }
    ]);
  });

  it("uses official repository log tree, v4 file content and blame paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.includes("/repository/logs-tree?")) {
          return [{ name: "src", path: "src", type: "tree", blob_id: "blob-1" }];
        }
        if (path.includes("/repository/file-content?")) {
          return "hello";
        }
        if (path.includes("/repository/blame?")) {
          return [{ commit: { id: "abc123", message: "init" }, lines: [{ lineNO: 1, content: "hello" }] }];
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.listRepositoryLogsTree({
      repository_id: "100",
      page: 2,
      page_size: 10,
      ref: "feature/main"
    });
    await client.getRepositoryFileContentV4({
      repository_id: "100",
      file_path: "src/index.ts",
      sha: "feature/main"
    });
    await client.getRepositoryBlame({
      repository_id: "100",
      file_path: "src/index.ts",
      sha: "feature/main"
    });

    expect(calls).toEqual([
      "/v4/repositories/100/repository/logs-tree?offset=10&limit=10&ref=feature%2Fmain",
      "/v4/repositories/100/repository/file-content?file_path=src%2Findex.ts&sha=feature%2Fmain",
      "/v4/repositories/100/repository/blame?file_path=src%2Findex.ts&sha=feature%2Fmain"
    ]);
  });

  it("uses official repository setting read paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.includes("notification-subscriptions")) {
          return { repository_id: 100, enabled: true };
        }
        if (path.includes("inherit-setting-source")) {
          return { source_type: "project", source_id: "project-1", upward_inherit_editable: true };
        }
        if (path.endsWith("/inherit-setting")) {
          return [{ name: "merge_requests", inherit_mod: "inherit" }];
        }
        if (path.endsWith("/general-policy")) {
          return { disable_fork: false, generate_pre_merge_ref: true };
        }
        if (path.includes("/user-ref-permission?")) {
          return { push: { has_permission: true, is_protect: true } };
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.showNotificationSubscription({ repository_id: "100", type: "email" });
    await client.showRepositoryInheritSettingSource({
      repository_id: "100",
      name: "merge_requests"
    });
    await client.showRepositoryInheritSetting({ repository_id: "100" });
    await client.showRepositoryGeneralPolicy({ repository_id: "100" });
    await client.showUserRefPermission({
      repository_id: "100",
      target_ref: "refs/head/master",
      action: "push",
      change_request_iid: 7
    });

    expect(calls).toEqual([
      "/v4/repositories/100/notification-subscriptions/subscription?type=email",
      "/v4/repositories/100/inherit-setting-source?name=merge_requests",
      "/v4/repositories/100/inherit-setting",
      "/v4/repositories/100/general-policy",
      "/v4/repositories/100/user-ref-permission?target_ref=refs%2Fhead%2Fmaster&action=push&change_request_iid=7"
    ]);
  });

  it("uses official repository rule, watermark, push event and template read paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.endsWith("/notification-subscriptions/status")) {
          return { email: { enabled: true, config_source: "repo" } };
        }
        if (path.endsWith("/general-commit-rule")) {
          return { reject_unsigned_commits: true, deny_force_push: false };
        }
        if (path.includes("/commit-rules?")) {
          return [{ id: 1, name: "main", repository_id: 100 }];
        }
        if (path.endsWith("/watermark")) {
          return { watermark: false, view_watermark: true };
        }
        if (path.includes("/merge-requests/7/commits?")) {
          return [{ id: "abc123", title: "Add feature" }];
        }
        if (path.endsWith("/merge-requests/7/votes")) {
          return { scores: 2, votes: [{ id: 1, score: 2 }] };
        }
        if (path.includes("/merge-requests/statistic?")) {
          return { id: 7, iid: 7, commits_count: 2 };
        }
        if (path.startsWith("/v4/user/repositories?")) {
          return [{ id: 100, name: "current-user-repo" }];
        }
        if (path.startsWith("/v4/groups/group-1/repositories?")) {
          return [{ id: 101, name: "group-repo" }];
        }
        if (path.includes("/user-groups?")) {
          return [{ member_group_id: 7, member_group_name: "maintainers" }];
        }
        if (path.includes("/members?")) {
          return [{ user_id: 9, user_name: "dev" }];
        }
        if (path.includes("/repository/blobs?")) {
          return [{ blob_id: "blob-1", encoding: "base64", content: "MTIz" }];
        }
        if (path.includes("/diff-lines?")) {
          return { text: "line 1" };
        }
        if (path.includes("/repository/refs?")) {
          return ["master", "release"];
        }
        if (path.includes("/repository/trees?")) {
          return [{ id: "1", name: "src", type: "tree", path: "src" }];
        }
        if (path.includes("/repository/file-list?")) {
          return ["src/Demo.java"];
        }
        if (path.endsWith("/repository/readme-file")) {
          return { blob_id: "blob-readme", file_name: "README.md", encoding: "base64" };
        }
        if (path.includes("/repository/commits/abc123/refs?")) {
          return ["master"];
        }
        if (path.includes("/review-setting?")) {
          return { categories_and_modules_enabled: true };
        }
        if (path.endsWith("/setting/note-required-attributes")) {
          return { note_required_attributes: [{ name: "Body", is_required: true }] };
        }
        if (path === "/v4/default-review-categories") {
          return { codehub_default_categories: [{ key: "code_style" }] };
        }
        if (path.includes("/reviews?")) {
          return [{ id: 1, body: "please fix", noteable_type: "MergeRequest" }];
        }
        if (path.includes("/review-authors?")) {
          return [{ id: 9124, name: "dev", username: "readyrunning" }];
        }
        if (path.includes("/repository/nav/references?")) {
          return { result: "0", defs: [{ tag_name: "Demo" }], refs: [] };
        }
        if (path.includes("/repository/nav/outline?")) {
          return { result: "0", file_path: "Demo.java", symbols: [] };
        }
        if (path.endsWith("/repository/nav/schema")) {
          return { schema: { version: "VERSION 1.5" } };
        }
        if (path.endsWith("/repository/nav/language")) {
          return { language_list: [{ name: "Java", extension_list: [".java"] }] };
        }
        if (path.startsWith("/v4/user/recent-push-events?")) {
          return [{ created_at: "2026-05-18T00:00:00Z", push_data: { ref: "master" } }];
        }
        if (path.startsWith("/v4/repository-templates?")) {
          return [{ repository_id: 10, name: "Java Web Demo", system: true }];
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.showNotificationSubscriptionsStatus({ repository_id: "100" });
    await client.showRepositoryGeneralCommitRule({ repository_id: "100" });
    await client.listRepositoryCommitRules({ repository_id: "100", page: 2, page_size: 10 });
    await client.showRepositoryWatermark({ repository_id: "100" });
    await client.listMergeRequestCommits({
      repository_id: "100",
      merge_request_iid: "7",
      page: 2,
      page_size: 10,
      view: "simple"
    });
    await client.showMergeRequestVotes({ repository_id: "100", merge_request_iid: "7" });
    await client.showMergeRequestStatistic({
      repository_id: "100",
      iids: "7",
      fields: "commits_count,changed_files_count"
    });
    await client.listCurrentUserRepositories({
      page: 2,
      page_size: 10,
      order_by: "updated_at",
      sort: "desc",
      search: "demo",
      starred: true,
      membership: true,
      user_created: false,
      include_abnormal: true
    });
    await client.listGroupRepositories({
      group_id: "group-1",
      page: 2,
      page_size: 10,
      order_by: "name",
      sort: "asc",
      search: "demo"
    });
    await client.listRepositoryUserGroups({ repository_id: "100", page: 2, page_size: 10, search: "team" });
    await client.listRepositoryMembers({
      repository_id: "100",
      page: 2,
      page_size: 10,
      permission: "mr",
      action: "approve",
      search: "dev"
    });
    await client.showBlobs({ repository_id: "100", blob_id: "blob-1" });
    await client.showDiffLines({
      repository_id: "100",
      file_path: "src/Demo.java",
      commit_id: "abc123",
      start: 1,
      end: 20
    });
    await client.listRefs({ repository_id: "100", page: 2, page_size: 10, type: "tag", search: "v1" });
    await client.listRepositoryTrees({
      repository_id: "100",
      page: 2,
      page_size: 10,
      ref: "master",
      path: "src",
      recursive: true
    });
    await client.listRepositoryFileList({
      repository_id: "100",
      page: 1,
      page_size: 20,
      ref_name: "master",
      search: "Demo"
    });
    await client.showRepositoryReadmeFile({ repository_id: "100" });
    await client.listCommitAssociatedRefs({
      repository_id: "100",
      sha: "abc123",
      page: 1,
      page_size: 20,
      type: "branch"
    });
    await client.showReviewSetting({ repository_id: "100", with_default_review_categories: true });
    await client.showNoteRequiredAttributes({ repository_id: "100" });
    await client.listDefaultReviewCategories();
    await client.listRepositoryReviews({
      repository_id: "100",
      noteable_type: "MergeRequest",
      search: "fix",
      page: 1,
      page_size: 20,
      sort: "desc"
    });
    await client.listRepositoryReviewAuthors({
      repository_id: "100",
      noteable_type: "Commit",
      resolved_status: "all",
      reviewers_filter: "dev",
      page: 2,
      page_size: 10
    });
    await client.listRepositoryNavigationReferences({
      repository_id: "100",
      symbol: "Demo",
      language: "Java",
      blob: "blob-1",
      file_path: "src/Demo.java",
      path: "src/Demo.java",
      revision: "abc123",
      ref: "master"
    });
    await client.showRepositoryNavigationOutline({
      repository_id: "100",
      language: "Java",
      blob: "blob-1",
      file_path: "src/Demo.java",
      revision: "abc123",
      ref: "master"
    });
    await client.showRepositoryNavigationSchema({ repository_id: "100" });
    await client.showRepositoryNavigationLanguage({ repository_id: "100" });
    await client.listPersonalRecentPushEvents({ project_id: "project-uuid-1", size: 5 });
    await client.listRepositoryTemplates({
      page: 1,
      page_size: 20,
      type: "SYSTEM,USER",
      platform: "Web",
      pipeline: "SupportPipeline",
      search: "demo",
      enter_type: "AI",
      date_order: "down",
      language: "Java",
      project_id: "project-uuid-1"
    });

    expect(calls).toEqual([
      "/v4/repositories/100/notification-subscriptions/status",
      "/v4/repositories/100/general-commit-rule",
      "/v4/repositories/100/commit-rules?offset=10&limit=10",
      "/v4/repositories/100/watermark",
      "/v4/repositories/100/merge-requests/7/commits?offset=10&limit=10&view=simple",
      "/v4/repositories/100/merge-requests/7/votes",
      "/v4/repositories/100/merge-requests/statistic?iids=7&fields=commits_count%2Cchanged_files_count",
      "/v4/user/repositories?offset=10&limit=10&search=demo&order_by=updated_at&sort=desc&starred=true&membership=true&user_created=false&include_abnormal=true",
      "/v4/groups/group-1/repositories?offset=10&limit=10&search=demo&order_by=name&sort=asc",
      "/v4/repositories/100/user-groups?offset=10&limit=10&search=team",
      "/v4/repositories/100/members?offset=10&limit=10&search=dev&permission=mr&action=approve",
      "/v4/repositories/100/repository/blobs?blob_id=blob-1",
      "/v4/repositories/100/diff-lines?file_path=src%2FDemo.java&commit_id=abc123&start=1&end=20",
      "/v4/repositories/100/repository/refs?offset=10&limit=10&search=v1&type=tag",
      "/v4/repositories/100/repository/trees?offset=10&limit=10&ref=master&path=src&recursive=true",
      "/v4/repositories/100/repository/file-list?offset=0&limit=20&search=Demo&ref_name=master",
      "/v4/repositories/100/repository/readme-file",
      "/v4/repositories/100/repository/commits/abc123/refs?offset=0&limit=20&type=branch",
      "/v4/repositories/100/review-setting?with_default_review_categories=true",
      "/v4/repositories/100/setting/note-required-attributes",
      "/v4/default-review-categories",
      "/v4/repositories/100/reviews?offset=0&limit=20&search=fix&noteable_type=MergeRequest&sort=desc",
      "/v4/repositories/100/review-authors?offset=10&limit=10&noteable_type=Commit&resolved_status=all&reviewers_filter=dev",
      "/v4/repositories/100/repository/nav/references?symbol=Demo&language=Java&blob=blob-1&file_path=src%2FDemo.java&path=src%2FDemo.java&revision=abc123&ref=master",
      "/v4/repositories/100/repository/nav/outline?language=Java&blob=blob-1&file_path=src%2FDemo.java&revision=abc123&ref=master",
      "/v4/repositories/100/repository/nav/schema",
      "/v4/repositories/100/repository/nav/language",
      "/v4/user/recent-push-events?project_id=project-uuid-1&size=5",
      "/v4/repository-templates?offset=0&limit=20&search=demo&type=SYSTEM%2CUSER&platform=Web&pipeline=SupportPipeline&enter_type=AI&date_order=down&language=Java&project_id=project-uuid-1"
    ]);
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

  it("uses official project and group webhook read paths", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        if (path.includes("/hooks/7/logs/9")) {
          return {
            id: 9,
            web_hook_id: 7,
            request_data: { ref: "master" },
            repository: { id: 100, namespace: "group/demo" }
          };
        }
        if (path.endsWith("/hooks/7")) {
          return { id: 7, name: "audit", token: "******" };
        }
        if (path.includes("/hooks/7/logs?")) {
          return { logs: [{ id: 1, web_hook_id: 7, uuid: "uuid-1" }], total: 1 };
        }
        if (path.includes("/hooks?")) {
          return { hooks: [{ id: 7, name: "audit" }], total: 1 };
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.listProjectWebhooks({ project_id: "project-uuid", page: 2, page_size: 10 });
    await client.getProjectWebhook({ project_id: "project-uuid", hook_id: "7" });
    await client.listProjectWebhookLogs({
      project_id: "project-uuid",
      hook_id: "7",
      page: 3,
      page_size: 20,
      repository_id: "100",
      uuid: "abc",
      created_after: "2026-05-01T00:00:00+08:00",
      created_before: "2026-05-02T00:00:00+08:00"
    });
    await client.getProjectWebhookLog({ project_id: "project-uuid", hook_id: "7", log_id: "9" });
    await client.listGroupWebhooks({ group_id: "group-1", page: 1, page_size: 20 });
    await client.getGroupWebhook({ group_id: "group-1", hook_id: "7" });
    await client.listGroupWebhookLogs({
      group_id: "group-1",
      hook_id: "7",
      page: 1,
      page_size: 20,
      repository_id: "100"
    });
    await client.getGroupWebhookLog({ group_id: "group-1", hook_id: "7", log_id: "9" });

    expect(calls).toEqual([
      "/v4/projects/project-uuid/hooks?offset=10&limit=10",
      "/v4/projects/project-uuid/hooks/7",
      "/v4/projects/project-uuid/hooks/7/logs?offset=40&limit=20&repository_id=100&uuid=abc&created_after=2026-05-01T00%3A00%3A00%2B08%3A00&created_before=2026-05-02T00%3A00%3A00%2B08%3A00",
      "/v4/projects/project-uuid/hooks/7/logs/9",
      "/v4/groups/group-1/hooks?offset=0&limit=20",
      "/v4/groups/group-1/hooks/7",
      "/v4/groups/group-1/hooks/7/logs?offset=0&limit=20&repository_id=100",
      "/v4/groups/group-1/hooks/7/logs/9"
    ]);
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
      work_item_ids: ["70824317"],
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
      work_item_ids: ["70824317"],
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

  it("passes merge request update optional fields", async () => {
    let requestedPath: string | undefined;
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      put: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;
        return { id: 1, iid: 2, title: "Update demo" };
      }
    } as never);

    await client.updateMergeRequest({
      repository_id: "repo-1",
      merge_request_iid: "2",
      title: "Update demo",
      state_event: "reopen",
      assignee_ids: [1001, "1002"],
      reviewer_ids: [1003, "1004"],
      description: "Updated demo",
      milestone_id: 7,
      labels: ["feat", "api"],
      force_remove_source_branch: true,
      squash: true,
      squash_commit_message: "Squash demo",
      work_item_ids: ["70824317"]
    });

    expect(requestedPath).toBe("/v4/repositories/repo-1/merge-requests/2");
    expect(requestedBody).toEqual({
      title: "Update demo",
      state_event: "reopen",
      assignee_ids: "1001,1002",
      reviewer_ids: "1003,1004",
      description: "Updated demo",
      milestone_id: 7,
      labels: "feat,api",
      force_remove_source_branch: true,
      squash: true,
      squash_commit_message: "Squash demo",
      work_item_ids: ["70824317"]
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

  it("uses official resource permission matrix paths and bodies", async () => {
    const calls: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "get", path });
        return [
          {
            role_id: "role-1",
            role_name: "Developer",
            resource_permissions: {
              fork: {
                permission_id: 2,
                enabled: true
              }
            }
          }
        ];
      },
      put: async (path: string, body: Record<string, unknown>) => {
        calls.push({ method: "put", path, body });
        return { status: 200, message: "" };
      }
    } as never);

    const listed = await client.listRepositoryResourcePermissions({
      repository_id: "100",
      resource_name: "repository",
      page: 2,
      page_size: 10
    });
    const updated = await client.updateRepositoryResourcePermissions({
      repository_id: "100",
      resource_name: "repository",
      data: [
        {
          role_id: "role-1",
          permissions: [{ permission_id: 2, enabled: false }]
        }
      ]
    });
    await client.updateGroupResourcePermissions({
      group_id: "200",
      resource_id: "300",
      data: [
        {
          role_name: "Maintainer",
          permissions: [{ permission_id: 3, enabled: true }]
        }
      ]
    });

    expect(listed.permissions[0]?.role_id).toBe("role-1");
    expect(updated.status).toBe(200);
    expect(calls).toEqual([
      {
        method: "get",
        path: "/v4/repository/100/permissions/repository?offset=10&limit=10"
      },
      {
        method: "put",
        path: "/v4/repository/100/permissions/repository",
        body: {
          data: [
            {
              role_id: "role-1",
              permissions: [{ permission_id: 2, enabled: false }]
            }
          ]
        }
      },
      {
        method: "put",
        path: "/v4/groups/200/permissions/300",
        body: {
          data: [
            {
              role_name: "Maintainer",
              permissions: [{ permission_id: 3, enabled: true }]
            }
          ]
        }
      }
    ]);
  });

  it("uses repository permission inherit setting endpoints", async () => {
    const calls: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "get", path });
        return { inherit_parent_permission: true };
      },
      put: async (path: string, body: Record<string, unknown>) => {
        calls.push({ method: "put", path, body });
        return { inherit_parent_permission: body.inherit_parent_permission as boolean };
      }
    } as never);

    const updated = await client.updateRepositoryPermissionInheritEnabled({
      repository_id: "100",
      inherit_parent_permission: false
    });
    const shown = await client.showRepositoryPermissionInheritEnabled({ repository_id: "100" });

    expect(updated.inherit_parent_permission).toBe(false);
    expect(shown.inherit_parent_permission).toBe(true);
    expect(calls).toEqual([
      {
        method: "put",
        path: "/v4/repositories/100/permission-inherit-setting",
        body: { inherit_parent_permission: false }
      },
      {
        method: "get",
        path: "/v4/repositories/100/permission-inherit-setting"
      }
    ]);
  });

  it("uses project settings endpoints and normalized bodies", async () => {
    const calls: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "get", path });
        if (path.endsWith("/watermark")) {
          return { watermark: true, can_update: false };
        }
        if (path.includes("subgroups-and-repositories")) {
          return [{ id: 1, name: "demo", descendant_type: "Group" }];
        }
        if (path.endsWith("settings-inherit-cfg")) {
          return [{ name: "watermark", inherit_mod: "inherit" }];
        }
        return [];
      },
      put: async (path: string, body: Record<string, unknown>) => {
        calls.push({ method: "put", path, body });
        if (path.endsWith("/watermark")) {
          return { watermark: body.watermark as boolean };
        }
        return body.data;
      }
    } as never);

    const watermark = await client.showProjectWatermark({ project_id: "project-uuid-1" });
    const updatedWatermark = await client.updateProjectWatermark({
      project_id: "project-uuid-1",
      watermark: false
    });
    const descendants = await client.listProjectSubgroupsAndRepositories({
      project_id: "project-uuid-1",
      page: 2,
      page_size: 10,
      filter: "demo",
      order_by: "name",
      sort: "asc",
      archived: false
    });
    const settings = await client.showProjectSettingsInheritCfg({ project_id: "project-uuid-1" });
    const updatedSettings = await client.updateProjectSettingsInheritCfg({
      project_id: "project-uuid-1",
      data: [{ name: "watermark", inherit_mod: "inherit" }]
    });

    expect(watermark.can_update).toBe(false);
    expect(updatedWatermark.watermark).toBe(false);
    expect(descendants.items[0]?.name).toBe("demo");
    expect(settings.settings[0]?.name).toBe("watermark");
    expect(updatedSettings.settings[0]?.inherit_mod).toBe("inherit");
    expect(calls).toEqual([
      {
        method: "get",
        path: "/v4/projects/project-uuid-1/watermark"
      },
      {
        method: "put",
        path: "/v4/projects/project-uuid-1/watermark",
        body: { watermark: false }
      },
      {
        method: "get",
        path: "/v4/projects/project-uuid-1/subgroups-and-repositories?offset=10&limit=10&filter=demo&order_by=name&sort=asc&archived=false"
      },
      {
        method: "get",
        path: "/v4/projects/project-uuid-1/settings-inherit-cfg"
      },
      {
        method: "put",
        path: "/v4/projects/project-uuid-1/settings-inherit-cfg",
        body: { data: [{ name: "watermark", inherit_mod: "inherit" }] }
      }
    ]);
  });

  it("uses the group permission-resources endpoint for resource permission lookup", async () => {
    let requestedPath = "";
    const client = createRepoClient({
      get: async (path: string) => {
        requestedPath = path;
        return [
          {
            order: 1,
            role_id: "role-1",
            role_name: "Project manager",
            resource_permissions: {
              create: { permission_id: 1, enabled: true, editable: true }
            }
          }
        ];
      }
    } as never);

    const result = await client.showResourcePermissions({
      group_id: "200",
      resource_id: "300",
      page: 2,
      page_size: 5
    });

    expect(requestedPath).toBe("/v4/groups/200/permissions-resources/300?offset=5&limit=5");
    expect(result.permissions[0]?.role_id).toBe("role-1");
  });

  it("uses project member setting and general policy endpoints", async () => {
    const calls: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "get", path });
        if (path.includes("member-setting")) {
          return {
            product_id: "repo",
            sync_enabled: true,
            sync_all_role_enabled: false,
            role_sync: [{ id: 1, role_id: "role-1", role_sync_enabled: true }]
          };
        }
        return {
          disable_fork: true,
          branch_name_regex: "feature/.*",
          generate_pre_merge_ref: false
        };
      },
      put: async (path: string, body: Record<string, unknown>) => {
        calls.push({ method: "put", path, body });
        return {
          disable_fork: body.disable_fork as boolean,
          branch_name_regex: body.branch_name_regex as string,
          generate_pre_merge_ref: body.generate_pre_merge_ref as boolean
        };
      }
    } as never);

    const memberSetting = await client.showProjectMemberSetting({
      project_id: "project-uuid-1",
      page: 2,
      page_size: 10
    });
    const policyFromPoliciesPath = await client.showProjectGeneralPolicy({
      project_id: "project-uuid-1"
    });
    const policyFromGeneralPath = await client.showProjectsGeneralPolicy({
      project_id: "project-uuid-1"
    });
    const updatedPolicy = await client.updateProjectGeneralPolicy({
      project_id: "project-uuid-1",
      disable_fork: false,
      branch_name_regex: "release/.*",
      generate_pre_merge_ref: true
    });

    expect(memberSetting.role_sync?.[0]?.role_id).toBe("role-1");
    expect(policyFromPoliciesPath.disable_fork).toBe(true);
    expect(policyFromGeneralPath.branch_name_regex).toBe("feature/.*");
    expect(updatedPolicy.generate_pre_merge_ref).toBe(true);
    expect(calls).toEqual([
      {
        method: "get",
        path: "/v4/projects/project-uuid-1/member-setting?offset=10&limit=10"
      },
      {
        method: "get",
        path: "/v4/projects/project-uuid-1/policies/general"
      },
      {
        method: "get",
        path: "/v4/projects/project-uuid-1/general-policy"
      },
      {
        method: "put",
        path: "/v4/projects/project-uuid-1/general-policy",
        body: {
          disable_fork: false,
          branch_name_regex: "release/.*",
          generate_pre_merge_ref: true
        }
      }
    ]);
  });

  it("uses the project item commits endpoint with type filtering", async () => {
    let requestedPath = "";
    const client = createRepoClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          commits: [
            {
              id: "commit-1",
              short_id: "c1",
              title: "Initial commit",
              author_name: "Dev"
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listItemCommits({
      project_id: "project-uuid-1",
      item_id: "item-1",
      type: "branch",
      page: 3,
      page_size: 5
    });

    expect(requestedPath).toBe(
      "/v4/projects/project-uuid-1/items/item-1/commits?offset=10&limit=5&type=branch"
    );
    expect(result.commits[0]?.short_id).toBe("c1");
    expect(result.total).toBe(1);
  });

  it("uses group and project deploy key endpoints", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        return [{ id: 1, title: "demo", fingerprint: "fp" }];
      }
    } as never);

    const groupKeys = await client.listGroupDeployKeys({
      group_id: "100",
      page: 2,
      page_size: 10
    });
    const projectKeys = await client.listProjectDeployKeys({
      project_id: "project-uuid-1",
      page: 1,
      page_size: 20
    });

    expect(groupKeys.keys[0]?.title).toBe("demo");
    expect(projectKeys.keys[0]?.fingerprint).toBe("fp");
    expect(calls).toEqual([
      "/v4/groups/100/deploy-keys?offset=10&limit=10",
      "/v4/projects/project-uuid-1/deploy-keys?offset=0&limit=20"
    ]);
  });

  it("uses group deploy key check endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;
        return { exists: true };
      }
    } as never);

    const result = await client.checkGroupDeployKey({
      group_id: "100",
      key: "ssh-rsa AAAA demo"
    });

    expect(result.exists).toBe(true);
    expect(requestedPath).toBe("/v4/groups/100/deploy-keys/check-key");
    expect(requestedBody).toEqual({ key: "ssh-rsa AAAA demo" });
  });

  it("uses work item endpoints", async () => {
    const calls: string[] = [];
    const bodies: unknown[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        return [{ related_id: "WI-1", related_url: "https://example.com/WI-1" }];
      },
      post: async (path: string, body: unknown) => {
        calls.push(path);
        bodies.push(body);
        return { status: "success" };
      }
    } as never);

    const branchItems = await client.listBranchRelatedWorkItems({
      repository_id: "200",
      branch_name: "feature/demo"
    });
    const repoItems = await client.listRepositoryWorkItems({
      repository_id: "200",
      project_id: "project-uuid-1",
      is_ipd: false,
      subject: "demo",
      page: 2,
      page_size: 5
    });
    const association = await client.associateBranchWorkItems({
      repository_id: "200",
      project_id: "project-uuid-1",
      branch: "feature/demo",
      work_item_ids: ["WI-1", "WI-2"]
    });

    expect(branchItems.work_items[0]?.related_id).toBe("WI-1");
    expect(repoItems.work_items[0]?.related_url).toBe("https://example.com/WI-1");
    expect(association.status).toBe("success");
    expect(calls).toEqual([
      "/v4/repositories/200/branch/work-items?branch_name=feature%2Fdemo",
      "/v4/repositories/200/work-items?offset=5&limit=5&project_id=project-uuid-1&is_ipd=false&subject=demo",
      "/v2/projects/issues"
    ]);
    expect(bodies).toEqual([{
      project_id: "project-uuid-1",
      branch: "feature/demo",
      repo_id: "200",
      related_id: ["WI-1", "WI-2"]
    }]);
  });

  it("uses E2E setting endpoints", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        return {
          e2e_policies: { auto_extract: true },
          req: { active: true },
          link: { active: false }
        };
      }
    } as never);

    const repositorySetting = await client.showRepositoryE2eSetting({
      repository_id: "200",
      take_effect: true
    });
    const groupSetting = await client.showGroupE2eSetting({ group_id: "100" });
    const projectSetting = await client.showProjectE2eSetting({ project_id: "project-uuid-1" });

    expect(repositorySetting.e2e_policies?.auto_extract).toBe(true);
    expect(groupSetting.req?.active).toBe(true);
    expect(projectSetting.link?.active).toBe(false);
    expect(calls).toEqual([
      "/v4/repositories/200/e2e-setting?take_effect=true",
      "/v4/groups/100/e2e-setting",
      "/v4/projects/project-uuid-1/e2e-setting"
    ]);
  });

  it("uses merge request setting, approver setting and template endpoints", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);

        if (path.endsWith("/merge-requests/setting")) {
          return { can_reopen: true };
        }
        if (path.endsWith("/approver-settings")) {
          return { approvers: [{ id: 1, name: "Reviewer" }] };
        }
        if (path.includes("/merge-requests/templates?")) {
          return { templates: [{ id: 7, name: "default" }], total: 1 };
        }
        if (path.includes("/discussion/templates?")) {
          return [{ id: 8, name: "discussion" }];
        }
        if (path.endsWith("/merge-requests/template/template-1")) {
          return { id: "template-1", title: "MR template", content: "## Summary" };
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.showRepositoryMergeRequestSetting({ repository_id: "200" });
    await client.showGroupMergeRequestSetting({ group_id: "100" });
    await client.showProjectMergeRequestSetting({ project_id: "project-uuid-1" });
    await client.showRepositoryApproverSettings({ repository_id: "200" });
    await client.showGroupApproverSettings({ group_id: "100" });
    await client.showProjectApproverSettings({ project_id: "project-uuid-1" });
    const mergeTemplates = await client.listMergeRequestTemplates({
      repository_id: "200",
      page: 2,
      page_size: 10
    });
    const discussionTemplates = await client.listDiscussionTemplates({
      repository_id: "200",
      page: 1,
      page_size: 20
    });
    const template = await client.getMergeRequestTemplate({
      repository_id: "200",
      template_id: "template-1"
    });

    expect(mergeTemplates.templates[0]?.name).toBe("default");
    expect(discussionTemplates.templates[0]?.name).toBe("discussion");
    expect(template.title).toBe("MR template");
    expect(calls).toEqual([
      "/v4/repositories/200/merge-requests/setting",
      "/v4/groups/100/merge-requests/setting",
      "/v4/projects/project-uuid-1/merge-requests/setting",
      "/v4/repositories/200/approver-settings",
      "/v4/groups/100/approver-settings",
      "/v4/projects/project-uuid-1/approver-settings",
      "/v4/repositories/200/merge-requests/templates?offset=10&limit=10",
      "/v4/repositories/200/discussion/templates?offset=0&limit=20",
      "/v4/repositories/200/merge-requests/template/template-1"
    ]);
  });

  it("uses tenant repository, encryption and trusted IP endpoints", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);

        if (path.startsWith("/v4/tenant/repositories?")) {
          return {
            repositories: [
              {
                owner: "owner-a",
                capacity: 12,
                status: 3,
                moderation_result: 0,
                create_time: "2026-05-01T00:00:00Z",
                member_number: 7,
                repository_id: 101,
                repository_name: "repo-a",
                project_name: "project-a",
                project_id: "project-1",
                locked: false
              }
            ],
            total: 1
          };
        }

        if (path === "/v4/tenant/develop-mode") {
          return { cr_enable: true, repo_encryption_enabled: false };
        }

        if (path === "/v4/tenants/tenant-1/repo-encryption/setting") {
          return {
            id: 1,
            tenant_id: "tenant-1",
            encryption_type: "KMS",
            default_encryption_enabled: true,
            cmk_key_name: "cmk-a",
            cmk_key_id: "cmk-1",
            key_state: 2,
            region: "cn-north-4",
            region_type: "public"
          };
        }

        if (path.startsWith("/v4/tenants/tenant-1/repo-encryption/cmks?")) {
          return [{ cmk_key_name: "cmk-a", cmk_key_id: "cmk-1", key_state: 2 }];
        }

        if (path.startsWith("/v4/tenants/tenant-1/repo-encryption/repositories?")) {
          return [
            {
              repo_id: 201,
              repo_name: "repo-b",
              full_path: "project-a/repo-b",
              project_id: "project-1",
              project_name: "project-a",
              owner_id: 301,
              owner_iam_id: "iam-1",
              owner_tenant_name: "tenant-a",
              owner_nick_name: "nick-a",
              owner_name: "owner-a"
            }
          ];
        }

        if (path === "/v4/tenants/tenant-1/repo-encryption/kms-grant") {
          return { tenant_id: "tenant-1", assumed: true };
        }

        if (path === "/v4/tenant/setting?project_id=project-1") {
          return {
            default_encryption_enabled: false,
            encryption_type: "normal",
            permit_public: "allow"
          };
        }

        if (path.startsWith("/v4/tenant/trusted-ip-addresses?")) {
          return {
            ip_addresses: [
              {
                id: 1,
                user_id: 2,
                domain_id: "tenant-1",
                ip_range: "1.1.1.1",
                ip_type: 0,
                ip_start: "1.1.1.1",
                ip_end: "1.1.1.1",
                view_flag: 1,
                download_flag: 1,
                upload_flag: 1,
                remark: "office",
                created_at: "2026-05-01T00:00:00Z",
                updated_at: "2026-05-02T00:00:00Z",
                order_flag: 0
              }
            ],
            total: 1
          };
        }

        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    const repositories = await client.listTenantRepositories({
      repository_name: "repo-a",
      member_number: 7,
      status: 3,
      owner: "owner-a",
      created_after: "2026-05-01T00:00:00Z",
      created_before: "2026-05-31T23:59:59Z",
      sort: "asc",
      sort_field: "owner",
      locked: false,
      offset: 40,
      limit: 10
    });
    const developMode = await client.showTenantDevelopMode();
    const repoEncryptionSetting = await client.showTenantRepoEncryptionSetting({ tenant_id: "tenant-1" });
    const cmks = await client.listTenantCMKs({ tenant_id: "tenant-1", offset: 0, limit: 20 });
    const encryptedRepositories = await client.listTenantEncryptedRepositories({
      tenant_id: "tenant-1",
      offset: 10,
      limit: 10
    });
    const kmsGrant = await client.showTenantKMSGrant({ tenant_id: "tenant-1" });
    const tenantSettings = await client.showProjectTenantSettings({ project_id: "project-1" });
    const trustedIpAddresses = await client.listTenantTrustedIpAddresses({ offset: 20, limit: 10 });

    expect(repositories.repositories[0]?.repository_name).toBe("repo-a");
    expect(developMode.cr_enable).toBe(true);
    expect(repoEncryptionSetting.encryption_type).toBe("KMS");
    expect(cmks.cmks[0]?.cmk_key_id).toBe("cmk-1");
    expect(encryptedRepositories.repositories[0]?.repo_name).toBe("repo-b");
    expect(kmsGrant.assumed).toBe(true);
    expect(tenantSettings.permit_public).toBe("allow");
    expect(trustedIpAddresses.ip_addresses[0]?.ip_range).toBe("1.1.1.1");
    expect(calls).toEqual([
      "/v4/tenant/repositories?offset=40&limit=10&repository_name=repo-a&member_number=7&status=3&owner=owner-a&created_after=2026-05-01T00%3A00%3A00Z&created_before=2026-05-31T23%3A59%3A59Z&sort=asc&sort_field=owner&locked=false",
      "/v4/tenant/develop-mode",
      "/v4/tenants/tenant-1/repo-encryption/setting",
      "/v4/tenants/tenant-1/repo-encryption/cmks?offset=0&limit=20",
      "/v4/tenants/tenant-1/repo-encryption/repositories?offset=10&limit=10",
      "/v4/tenants/tenant-1/repo-encryption/kms-grant",
      "/v4/tenant/setting?project_id=project-1",
      "/v4/tenant/trusted-ip-addresses?offset=20&limit=10"
    ]);
  });

  it("uses repository trusted IP endpoints", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "GET", path });
        return [{
          id: 19324,
          repository_id: 2111897848,
          ip_range: "255.255.255.255",
          ip_start: "255.255.255.255",
          ip_end: "255.255.255.255",
          created_at: "Jul 22, 2024 2:42:46 PM",
          updated_at: "Jul 22, 2024 2:42:46 PM",
          ip_type: 2,
          view_flag: 1,
          download_flag: 1,
          upload_flag: 1,
          order_flag: 0
        }];
      },
      post: async (path: string, body?: unknown) => {
        calls.push({ method: "POST", path, body });
        return {
          id: 19324,
          repository_id: 2111897848,
          ip_range: "255.255.255.255",
          ip_start: "255.255.255.255",
          ip_end: "255.255.255.255",
          ip_type: 2,
          view_flag: 1,
          download_flag: 1,
          upload_flag: 1,
          remark: "office"
        };
      },
      put: async (path: string, body?: unknown) => {
        calls.push({ method: "PUT", path, body });
        return {
          id: 19324,
          repository_id: 2111897848,
          ip_range: "255.255.255.0/24",
          ip_start: "255.255.255.0",
          ip_end: "255.255.255.255",
          ip_type: 2,
          view_flag: 1,
          download_flag: 0,
          upload_flag: 0,
          remark: "updated"
        };
      },
      delete: async (path: string) => {
        calls.push({ method: "DELETE", path });
        return { status: "success" };
      }
    } as never);

    const listed = await client.listTrustedIpAddresses({
      repository_id: "10001",
      page: 2,
      page_size: 10
    });
    const created = await client.addTrustedIpAddress({
      repository_id: "10001",
      ip_type: 2,
      ip_start: "255.255.255.255",
      ip_end: "255.255.255.255",
      view_flag: 1,
      download_flag: 1,
      upload_flag: 1,
      remark: "office"
    });
    const updated = await client.updateTrustedIpAddress({
      repository_id: "10001",
      ip_id: "19324",
      ip_type: 2,
      ip_start: "255.255.255.0",
      ip_end: "255.255.255.255",
      view_flag: 1,
      download_flag: 0,
      upload_flag: 0,
      remark: "updated"
    });
    const deleted = await client.deleteTrustedIpAddress({
      repository_id: "10001",
      ip_id: "19324"
    });

    expect(listed.ip_addresses[0]?.repository_id).toBe(2111897848);
    expect(created.repository_id).toBe(2111897848);
    expect(updated.remark).toBe("updated");
    expect(deleted.status).toBe("success");
    expect(calls).toEqual([
      {
        method: "GET",
        path: "/v4/projects/10001/trusted-ip-addresses?offset=10&limit=10"
      },
      {
        method: "POST",
        path: "/v4/projects/10001/trusted-ip-addresses",
        body: {
          ip_type: 2,
          ip_start: "255.255.255.255",
          ip_end: "255.255.255.255",
          view_flag: 1,
          download_flag: 1,
          upload_flag: 1,
          remark: "office"
        }
      },
      {
        method: "PUT",
        path: "/v4/projects/10001/trusted-ip-addresses/19324",
        body: {
          ip_type: 2,
          ip_start: "255.255.255.0",
          ip_end: "255.255.255.255",
          view_flag: 1,
          download_flag: 0,
          upload_flag: 0,
          remark: "updated"
        }
      },
      {
        method: "DELETE",
        path: "/v4/projects/10001/trusted-ip-addresses/19324"
      }
    ]);
  });

  it("uses official repo commit and pipeline paths", async () => {
    const getCalls: string[] = [];
    const postCalls: Array<{ path: string; body: unknown }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        getCalls.push(path);
        if (path.includes("/repository/commits/diff-metadata?")) {
          return { diffs: [{ old_path: "a.ts", new_path: "a.ts", added_lines: 2 }] };
        }
        if (path.includes("/repository/commits/file-diff?")) {
          return { old_path: "a.ts", new_path: "a.ts", added_lines: 1, removed_lines: 0, diff: "@@" };
        }
        if (path.includes("/repository/commits/diff?")) {
          return { diffs: [{ old_path: "a.ts", new_path: "a.ts", added_lines: 2 }], change_file_count: 1 };
        }
        if (path.includes("/pipelines/p-1/latest-jobs")) {
          return { id: 10, status: "success", stages: [{ id: 1, name: "build", jobs: [{ id: 9, name: "job-1" }] }] };
        }
        if (path.includes("/pipelines/p-1/jobs?")) {
          return [{ id: 9, name: "job-1", stage: "build" }];
        }
        throw new Error(`unexpected path: ${path}`);
      },
      post: async (path: string, body?: unknown) => {
        postCalls.push({ path, body });
        if (path.endsWith("/repository/commits")) {
          return { id: "c1", short_id: "c1", title: "commit" };
        }
        if (path.endsWith("/repository/commits/c1/revert")) {
          return { id: "c2", short_id: "c2", title: "revert" };
        }
        if (path.endsWith("/user/groups/group-permissions")) {
          return [{ group_id: 7, can_create_group: true }];
        }
        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    await client.createCommit({
      repository_id: "100",
      branch: "main",
      commit_message: "msg",
      actions: [{ action: "create", file_path: "a.ts", content: "x" }]
    });
    await client.createCommitRevert({ repository_id: "100", sha: "c1", branch: "main" });
    await client.showCommitDiffMetadata({ repository_id: "100", sha: "c1" });
    await client.showCommitFileDiff({ repository_id: "100", sha: "c1", path: "a.ts" });
    await client.showDiffCommit({ repository_id: "100", sha: "c1", page: 2, page_size: 10 });
    await client.listLatestPipelineJobs({ repository_id: "100", pipeline_id: "p-1" });
    await client.listPipelineJobs({ repository_id: "100", pipeline_id: "p-1", page: 2, page_size: 10 });
    await client.batchValidateUserGroupPermissions({ items: [{ group_id: "7", project_id: "p-1" }] });

    expect(postCalls).toEqual([
      {
        path: "/v4/repositories/100/repository/commits",
        body: {
          branch: "main",
          commit_message: "msg",
          actions: [{ action: "create", file_path: "a.ts", content: "x" }]
        }
      },
      {
        path: "/v4/repositories/100/repository/commits/c1/revert",
        body: { branch: "main", with_new_merge_request: undefined, message: undefined }
      },
      {
        path: "/v4/user/groups/group-permissions",
        body: [{ group_id: "7", project_id: "p-1" }]
      }
    ]);
    expect(getCalls).toEqual([
      "/v4/repositories/100/repository/commits/diff-metadata?sha=c1",
      "/v4/repositories/100/repository/commits/file-diff?sha=c1&path=a.ts",
      "/v4/repositories/100/repository/commits/diff?sha=c1&offset=10&limit=10",
      "/v4/repositories/100/pipelines/p-1/latest-jobs",
      "/v4/repositories/100/pipelines/p-1/jobs?offset=10&limit=10"
    ]);
  });

  it("uses official repository transfer and navigation rebuild paths", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createRepoClient({
      post: async (path: string, body?: unknown) => {
        calls.push({ method: "POST", path, body });
        if (path.endsWith("/transfer")) {
          return { id: 100, name: "demo", namespace: "target-group" };
        }
        if (path.endsWith("/repository/nav/build")) {
          return { result: "success", message: "queued", duration: 12, size: 34 };
        }
        throw new Error(`unexpected path: ${path}`);
      }
    } as never);

    const transferred = await client.transferRepository({
      repository_id: "100",
      namespace: "target-group"
    });
    const rebuilt = await client.rebuildRepositoryNavigation({
      repository_id: "100"
    });

    expect(transferred.namespace).toBe("target-group");
    expect(rebuilt.result).toBe("success");
    expect(calls).toEqual([
      {
        method: "POST",
        path: "/v4/repositories/100/transfer",
        body: { namespace: "target-group" }
      },
      {
        method: "POST",
        path: "/v4/repositories/100/repository/nav/build",
        body: undefined
      }
    ]);
  });

  it("uses official project merge request list and discussion delete paths", async () => {
    const calls: Array<{ method: string; path: string }> = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push({ method: "GET", path });
        return {
          merge_requests: [
            {
              id: 101,
              iid: 7,
              title: "demo",
              state: "opened",
              source_branch: "feature/demo",
              target_branch: "main"
            }
          ],
          total: 1
        };
      },
      delete: async (path: string) => {
        calls.push({ method: "DELETE", path });
        return {};
      }
    } as never);

    const list = await client.listProjectMergeRequests({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      state: "opened",
      order_by: "updated_at",
      sort: "desc",
      author_id: "1001",
      source_branch: "feature/demo",
      target_branch: "main",
      search: "demo",
      source_repository_id: "100"
    });
    const deleted = await client.deleteMergeRequestDiscussion({
      repository_id: "100",
      merge_request_iid: "7",
      discussion_id: "discussion-1",
      note_id: "99"
    });

    expect(list.merge_requests[0]?.iid).toBe(7);
    expect(deleted.deleted).toBe(true);
    expect(calls).toEqual([
      {
        method: "GET",
        path: "/v4/projects/project-1/merge-requests?offset=10&limit=10&state=opened&order_by=updated_at&sort=desc&author_id=1001&source_branch=feature%2Fdemo&target_branch=main&search=demo&source_repository_id=100"
      },
      {
        method: "DELETE",
        path: "/v4/repositories/100/merge-requests/7/discussions/discussion-1/notes/99"
      }
    ]);
  });

  it("uses official granted-user member path", async () => {
    const calls: string[] = [];
    const client = createRepoClient({
      get: async (path: string) => {
        calls.push(path);
        return [{ id: 17, name: "qa", username: "iam-qa", nick_name: "QA" }];
      }
    } as never);

    const result = await client.listProductPermissionResourcesGrantedUsers({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      query: "qa"
    });

    expect(calls).toEqual(["/v4/projects/project-1/members?offset=10&limit=10&query=qa"]);
    expect(result.members[0]?.name).toBe("qa");
  });

  it("uses official deploy key, delete repository and delete member paths", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createRepoClient({
      post: async (path: string, body?: unknown) => {
        calls.push({ method: "POST", path, body });
        return { key_id: 123, key_title: "ci", fingerprint: "fp", can_push: true };
      },
      delete: async (path: string) => {
        calls.push({ method: "DELETE", path });
        return { result: "true", status: "success" };
      }
    } as never);

    const key = await client.addRepositoryDeployKey({
      repository_id: "100",
      key_title: "ci",
      key: "ssh-rsa AAA",
      can_push: true
    });
    const deleted = await client.deleteRepository({ repository_uuid: "repo-uuid-1" });
    const removedMember = await client.deleteRepositoryMember({
      repository_uuid: "repo-uuid-1",
      member_id: "member-1"
    });

    expect(key).toMatchObject({ key_id: 123, key_title: "ci", fingerprint: "fp" });
    expect(deleted).toEqual({ result: "true", status: "success" });
    expect(removedMember).toEqual({
      repository_uuid: "repo-uuid-1",
      member_id: "member-1",
      deleted: true
    });
    expect(calls).toEqual([
      {
        method: "POST",
        path: "/v2/repositories/100/deploy-keys",
        body: {
          key_title: "ci",
          key: "ssh-rsa AAA",
          can_push: true
        }
      },
      {
        method: "DELETE",
        path: "/v1/repositories/repo-uuid-1"
      },
      {
        method: "DELETE",
        path: "/v1/repositories/repo-uuid-1/members/member-1"
      }
    ]);
  });

  it("uses official fork path with project_uuid and falls back on not found", async () => {
    const calls: Array<{ path: string; body?: unknown }> = [];
    const post = vi
      .fn()
      .mockImplementationOnce(async (path: string) => {
        calls.push({ path });
        throw new AppError("not_found", "missing", "404", undefined, 404);
      })
      .mockImplementationOnce(async (path: string, body?: unknown) => {
        calls.push({ path, body });
        return { repository_uuid: "repo-uuid-1", project_uuid: "project-1", name: "demo-repo" };
      });

    const client = createRepoClient({ post } as never);
    const result = await client.forkRepository({
      project_uuid: "project-1",
      project_name: "demo-project",
      repo_name: "demo-repo",
      template_id: "template-1",
      import_members: 1
    });

    expect(result).toMatchObject({
      repository_uuid: "repo-uuid-1",
      project_uuid: "project-1",
      name: "demo-repo"
    });
    expect(calls).toEqual([
      {
        path: "/v2/projects/project-1/repositories/fork"
      },
      {
        path: "/v2/projects/repositories/fork",
        body: {
          project_name: "demo-project",
          repo_name: "demo-repo",
          template_id: "template-1",
          import_members: 1
        }
      }
    ]);
  });

  it("uses official validate https path and falls back to v1 on not found", async () => {
    const calls: Array<{ path: string; body?: unknown }> = [];
    const post = vi
      .fn()
      .mockImplementationOnce(async (path: string) => {
        calls.push({ path });
        throw new AppError("not_found", "missing", "404", undefined, 404);
      })
      .mockImplementationOnce(async (path: string, body?: unknown) => {
        calls.push({ path, body });
        return { result: "true", status: "success" };
      });

    const client = createRepoClient({ post } as never);
    const result = await client.validateHttpsInfo({
      iam_user_uuid: "iam-1",
      pwd: "secret"
    });

    expect(result).toEqual({ result: "true", status: "success" });
    expect(calls).toEqual([
      {
        path: "/v2/user/iam-1/validate-https-info"
      },
      {
        path: "/v1/user/iam-1/validateHttpsInfo",
        body: { pwd: "secret" }
      }
    ]);
  });

  it("uses official repository member update, SSH private key verify and project repository name validation paths", async () => {
    const calls: Array<{
      method: string;
      path: string;
      body?: unknown;
      options?: unknown;
    }> = [];
    const client = createRepoClient({
      put: async (path: string, body?: unknown, options?: unknown) => {
        calls.push({ method: "PUT", path, body, options });
        return { result: {}, status: "success" };
      },
      post: async (path: string, body?: unknown, options?: unknown) => {
        calls.push({ method: "POST", path, body, options });
        return { result: "verificationPassed", status: "success" };
      },
      get: async (path: string, options?: unknown) => {
        calls.push({ method: "GET", path, options });
        return { result: true, status: "success" };
      }
    } as never);

    const updated = await client.updateRepositoryMember({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      member_id: "member-1",
      role: 40
    });
    const verified = await client.verifyUserSshPrivateKey({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      private_key: "-----BEGIN PRIVATE KEY-----demo"
    });
    const validated = await client.validateProjectRepositoryName({
      x_auth_token: "token-1",
      project_uuid: "project-1",
      repository_name: "demo-repo"
    });

    expect(updated).toEqual({
      repository_uuid: "repo-uuid-1",
      member_id: "member-1",
      role: 40,
      status: "success",
      result: {}
    });
    expect(verified).toEqual({
      repository_uuid: "repo-uuid-1",
      result: "verificationPassed",
      status: "success"
    });
    expect(validated).toEqual({
      project_uuid: "project-1",
      repository_name: "demo-repo",
      result: true,
      status: "success"
    });
    expect(calls).toEqual([
      {
        method: "PUT",
        path: "/v1/repositories/repo-uuid-1/members/member-1",
        body: { role: 40 },
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "POST",
        path: "/v1/users/sshkey/privatekey/verify",
        body: {
          repository_uuid: "repo-uuid-1",
          private_key: "-----BEGIN PRIVATE KEY-----demo"
        },
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "GET",
        path: "/v1/projects/project-1/repositories/validation/demo-repo",
        options: { headers: { "X-Auth-Token": "token-1" } }
      }
    ]);
  });

  it("uses official branch file, branch sub-files, repository status and pipeline paths", async () => {
    const calls: Array<{
      method: string;
      path: string;
      body?: unknown;
      options?: unknown;
    }> = [];
    const client = createRepoClient({
      get: async (path: string, options?: unknown) => {
        calls.push({ method: "GET", path, options });
        if (path.includes("/branch/feature%2Fdemo/file?")) {
          return {
            name: "index.ts",
            path: "src/index.ts",
            size: 12,
            encoding: "base64",
            ref: "feature/demo",
            blob_id: "blob-1",
            file_type: "text",
            content: "Y29uc29sZS5sb2coJ29rJyk7"
          };
        }
        if (path.includes("/branch/feature%2Fdemo/sub-files?")) {
          return {
            result: [
              {
                id: "tree-1",
                name: "src",
                type: "tree",
                path: "src",
                blob_id: "blob-tree-1"
              }
            ],
            total: 1,
            status: "success"
          };
        }
        if (path.endsWith("/status")) {
          return { result: 1, status: "success" };
        }

        throw new Error(`unexpected path: ${path}`);
      },
      put: async (path: string, body?: unknown, options?: unknown) => {
        calls.push({ method: "PUT", path, body, options });
        return { result: true, status: "success" };
      }
    } as never);

    const file = await client.showBranchFile({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      branch_name: "feature/demo",
      file_path: "src/index.ts"
    });
    const subFiles = await client.listBranchSubFiles({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      branch_name: "feature/demo",
      path: "src",
      page: 2,
      page_size: 10
    });
    const status = await client.showRepositoryStatus({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1"
    });
    const pipeline = await client.updateRepositoryPipeline({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1"
    });
    const templateStatus = await client.updateRepositoryTemplateStatus({
      x_auth_token: "token-1",
      repository_uuid: "repo-uuid-1",
      template_type: "PUBLIC",
      code_title: "Demo Template",
      languages: ["TypeScript"]
    });

    expect(file).toMatchObject({
      name: "index.ts",
      path: "src/index.ts",
      blob_id: "blob-1",
      content: "Y29uc29sZS5sb2coJ29rJyk7"
    });
    expect(subFiles).toEqual({
      trees: [
        {
          id: "tree-1",
          name: "src",
          type: "tree",
          path: "src",
          blob_id: "blob-tree-1"
        }
      ],
      total: 1
    });
    expect(status).toEqual({
      repository_uuid: "repo-uuid-1",
      result: 1,
      status: "success"
    });
    expect(pipeline).toEqual({
      repository_uuid: "repo-uuid-1",
      result: true,
      status: "success"
    });
    expect(templateStatus).toEqual({
      result: true,
      status: "success"
    });
    expect(calls).toEqual([
      {
        method: "GET",
        path: "/v1/repositories/repo-uuid-1/branch/feature%2Fdemo/file?path=src%2Findex.ts",
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "GET",
        path: "/v1/repositories/repo-uuid-1/branch/feature%2Fdemo/sub-files?offset=10&limit=10&path=src",
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "GET",
        path: "/v1/repositories/repo-uuid-1/status",
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "PUT",
        path: "/v1/repositories/repo-uuid-1/pipeline",
        body: undefined,
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        method: "PUT",
        path: "/v2/repositories/repo-uuid-1/template-status",
        body: {
          template_type: "PUBLIC",
          code_title: "Demo Template",
          languages: ["TypeScript"]
        },
        options: { headers: { "X-Auth-Token": "token-1" } }
      }
    ]);
  });
});
