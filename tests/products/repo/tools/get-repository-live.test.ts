import { describe, expect, it } from "vitest";
import { createRepoGetRepositoryHandler } from "../../../../src/products/repo/tools/get-repository.js";

describe("createRepoGetRepositoryHandler", () => {
  it("maps repository detail into MCP output", async () => {
    const handler = createRepoGetRepositoryHandler({
      getRepository: async () => ({
        id: 1001,
        name: "demo-repo",
        description: "Main repository",
        default_branch: "main",
        ssh_url_to_repo: "git@example.com:demo-repo.git",
        http_url_to_repo: "https://example.com/demo-repo.git",
        project_id: "project-1",
        project_name: "Alpha"
      })
    });

    const result = await handler({ repository_id: "1001" });

    expect(result.structuredContent.item).toEqual({
      id: "1001",
      name: "demo-repo",
      description: "Main repository",
      defaultBranch: "main",
      sshUrl: "git@example.com:demo-repo.git",
      httpUrl: "https://example.com/demo-repo.git",
      projectId: "project-1",
      projectName: "Alpha"
    });
  });
});
