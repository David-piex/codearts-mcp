import { describe, expect, it } from "vitest";
import { createRepoListRepositoriesHandler } from "../../../../src/products/repo/tools/list-repositories.js";

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
});
