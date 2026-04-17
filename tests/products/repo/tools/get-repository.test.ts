import { describe, expect, it } from "vitest";
import { mapRepositoryDetail } from "../../../../src/products/repo/tools/get-repository.js";

describe("mapRepositoryDetail", () => {
  it("returns normalized repository detail data", () => {
    const result = mapRepositoryDetail({
      id: 7,
      name: "demo-repo",
      description: "Demo service",
      default_branch: "main",
      ssh_url_to_repo: "git@example.com:demo-repo.git",
      http_url_to_repo: "https://example.com/demo-repo.git",
      project_id: "project-1",
      project_name: "Demo"
    });

    expect(result.item).toEqual({
      id: "7",
      name: "demo-repo",
      description: "Demo service",
      defaultBranch: "main",
      sshUrl: "git@example.com:demo-repo.git",
      httpUrl: "https://example.com/demo-repo.git",
      projectId: "project-1",
      projectName: "Demo"
    });
  });
});
