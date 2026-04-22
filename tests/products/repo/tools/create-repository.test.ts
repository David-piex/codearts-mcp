import { describe, expect, it } from "vitest";
import { repoCreateRepositoryInput } from "../../../../src/products/repo/schemas.js";
import {
  mapCreatedRepository,
  previewCreateRepository
} from "../../../../src/products/repo/tools/create-repository.js";

describe("repoCreateRepositoryInput", () => {
  it("accepts the official string template_id field", () => {
    const parsed = repoCreateRepositoryInput.parse({
      project_uuid: "project-1",
      name: "demo-repo",
      template_id: "template-1"
    });

    expect(parsed.template_id).toBe("template-1");
  });
});

describe("previewCreateRepository", () => {
  it("returns a dry-run summary for creating a repository", () => {
    const result = previewCreateRepository({
      project_uuid: "project-1",
      name: "demo-repo",
      import_members: 1,
      visibility_level: 20,
      enable_readme: true,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectUuid: "project-1",
      name: "demo-repo",
      importMembers: 1,
      visibilityLevel: 20,
      enableReadme: true,
      executed: false
    });
  });
});

describe("mapCreatedRepository", () => {
  it("returns normalized created repository data", () => {
    const result = mapCreatedRepository(
      {
        repository_uuid: "repo-uuid-1",
        project_uuid: "project-uuid-1"
      },
      {
        project_uuid: "project-uuid-1",
        name: "demo-repo"
      }
    );

    expect(result.item).toEqual({
      id: "repo-uuid-1",
      repositoryUuid: "repo-uuid-1",
      projectUuid: "project-uuid-1",
      name: "demo-repo",
      executed: true
    });
  });
});
