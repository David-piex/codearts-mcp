import { describe, expect, it } from "vitest";
import {
  mapCommitStatistics,
  mapRepoSubmodules,
  mapRepositoryContributors,
  mapRepositoryForks,
  mapRepositoryLanguages
} from "../../../../src/products/repo/tools/repository-content-result.js";

describe("repository content result mappers", () => {
  it("maps submodules", () => {
    const result = mapRepoSubmodules([
      {
        repo_id: 100,
        branch: "master",
        path: "libs/core",
        git_url: "https://example.com/core.git",
        submodule_branch: "main",
        namespace_uuid: "ns-1",
        submodule_repo_id: 101,
        repo_name: "core",
        sub_commitId: "abc123",
        deployKey_status: 1,
        status: 1
      }
    ], 1, 20, 1);

    expect(result.items?.[0]).toEqual({
      repoId: "100",
      branch: "master",
      path: "libs/core",
      gitUrl: "https://example.com/core.git",
      submoduleBranch: "main",
      namespaceUuid: "ns-1",
      submoduleRepoId: "101",
      repoName: "core",
      subCommitId: "abc123",
      deployKeyStatus: 1,
      status: 1
    });
  });

  it("maps commit statistics and languages", () => {
    expect(mapCommitStatistics({
      commits: [{ author_name: "dev", date: "2026-05-15", is_merge: false }],
      statistics: [{ id: 1, project_id: 100, branch: "master", user_name: "dev", add_lines: 10 }],
      total: 1
    }).item).toMatchObject({
      commits: [{ authorName: "dev", date: "2026-05-15", merge: false }],
      statistics: [{ id: "1", projectId: "100", branch: "master", userName: "dev", addLines: 10 }],
      total: 1
    });

    expect(mapRepositoryLanguages({
      languages: [{ color: "#3178c6", label: "TypeScript", value: 100 }],
      status: "success"
    }).item).toEqual({
      languages: [{ color: "#3178c6", label: "TypeScript", value: 100 }],
      status: "success"
    });
  });

  it("maps contributors and forks", () => {
    expect(mapRepositoryContributors([
      { name: "dev", email: "dev@example.com", commits: 10, nick_name: "Dev", tenant_name: "tenant", user_name: "dev1" }
    ], 1, 20, 1).items?.[0]).toEqual({
      name: "dev",
      email: "dev@example.com",
      commits: 10,
      nickName: "Dev",
      tenantName: "tenant",
      userName: "dev1"
    });

    expect(mapRepositoryForks([
      {
        id: 101,
        name: "forked",
        archived: false,
        product_id: "p1",
        product_name: "Product",
        path_with_namespace: "group/forked",
        namespace: "group",
        path: "forked",
        visibility: "private",
        star_count: 1,
        forks_count: 2
      }
    ], 1, 20, 1).items?.[0]).toMatchObject({
      id: "101",
      name: "forked",
      archived: false,
      productId: "p1",
      productName: "Product",
      pathWithNamespace: "group/forked",
      namespace: "group",
      path: "forked",
      visibility: "private",
      starCount: 1,
      forksCount: 2
    });
  });
});
