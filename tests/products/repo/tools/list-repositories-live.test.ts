import { describe, expect, it } from "vitest";
import { createRepoListRepositoriesHandler } from "../../../../src/products/repo/tools/list-repositories.js";
import { createRepoListProjectRepositoriesHandler } from "../../../../src/products/repo/tools/list-project-repositories.js";

describe("createRepoListRepositoriesHandler", () => {
  it("maps repository list responses", async () => {
    const handler = createRepoListRepositoriesHandler({
      listRepositories: async () => ({
        repositories: [{ id: 1, name: "repo-a", ssh_url: "git@example.com:repo-a.git" }],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 repositories");
    expect(result.structuredContent.items![0].name).toBe("repo-a");
    expect(result.content[0]?.text).toContain("id: 1");
    expect(result.content[0]?.text).toContain("name: repo-a");
    expect(result.content[0]?.text).toContain("sshUrl: git@example.com:repo-a.git");
  });

  it("adds a project-scoped hint when the repository list is empty", async () => {
    const handler = createRepoListRepositoriesHandler({
      listRepositories: async () => ({
        repositories: [],
        total: 0
      })
    });

    const result = await handler({ project_id: "project-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 repositories found");
    expect(result.content[0]?.text).toContain("If you expected repositories here");
    expect(result.content[0]?.text).toContain("project-empty");
  });

  it("maps official project repository list responses", async () => {
    const handler = createRepoListProjectRepositoriesHandler({
      listProjectRepositories: async () => ({
        repositories: [{ id: 1, name: "repo-a", ssh_url: "git@example.com:repo-a.git" }],
        total: 1
      })
    });

    const result = await handler({
      x_auth_token: "token-1",
      project_uuid: "project-uuid-1",
      search: "repo",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.summary).toContain("1 repositories");
    expect(result.structuredContent.items![0].name).toBe("repo-a");
    expect(result.content[0]?.text).toContain("name: repo-a");
  });
});
