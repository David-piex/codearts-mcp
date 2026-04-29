import { describe, expect, it } from "vitest";
import {
  createRepoImportRepositoryHandler,
  encodeRepositoryImportUrl,
  mapImportedRepository,
  previewImportRepository,
  validateRepositoryImportSource
} from "../../../../src/products/repo/tools/import-repository.js";

describe("repository import helpers", () => {
  it("encodes source URLs for the CodeArts import_url field", () => {
    expect(encodeRepositoryImportUrl("https://github.com/example/demo.git")).toBe(
      "aHR0cHM6Ly9naXRodWIuY29tL2V4YW1wbGUvZGVtby5naXQ="
    );
  });

  it("validates known hosted source types against their hosts", () => {
    expect(() =>
      validateRepositoryImportSource({
        source_type: "github",
        source_url: "https://github.com/example/demo.git"
      })
    ).not.toThrow();

    expect(() =>
      validateRepositoryImportSource({
        source_type: "gitee",
        source_url: "https://github.com/example/demo.git"
      })
    ).toThrow("does not match source_type gitee");
  });
});

describe("previewImportRepository", () => {
  it("returns a dry-run summary without exposing source credentials", () => {
    const result = previewImportRepository({
      project_uuid: "project-1",
      name: "demo-repo",
      source_type: "git",
      source_url: "https://user:secret@example.com/group/demo.git",
      import_members: 1,
      visibility_level: 20,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toMatchObject({
      projectUuid: "project-1",
      name: "demo-repo",
      sourceType: "git",
      sourceUrl: "https://***:***@example.com/group/demo.git",
      importMembers: 1,
      visibilityLevel: 20,
      importUrlEncoding: "base64",
      executed: false
    });
  });
});

describe("mapImportedRepository", () => {
  it("returns normalized imported repository data", () => {
    const result = mapImportedRepository(
      {
        repository_uuid: "repo-uuid-1",
        project_uuid: "project-uuid-1"
      },
      {
        project_uuid: "project-uuid-1",
        name: "demo-repo",
        source_type: "github",
        source_url: "https://github.com/example/demo.git"
      }
    );

    expect(result.item).toEqual({
      id: "repo-uuid-1",
      repositoryUuid: "repo-uuid-1",
      projectUuid: "project-uuid-1",
      name: "demo-repo",
      sourceType: "github",
      sourceUrl: "https://github.com/example/demo.git",
      executed: true
    });
  });
});

describe("createRepoImportRepositoryHandler", () => {
  it("creates a repository import request with encoded import_url", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const handler = createRepoImportRepositoryHandler({
      createRepository: async (input) => {
        requestedBody = input;
        return {
          repository_uuid: "repo-uuid-1",
          project_uuid: "project-uuid-1"
        };
      }
    });

    const result = await handler({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      source_type: "github",
      source_url: "https://github.com/example/demo.git",
      visibility_level: 20,
      dry_run: false
    });

    expect(requestedBody).toEqual({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      visibility_level: 20,
      import_url: "aHR0cHM6Ly9naXRodWIuY29tL2V4YW1wbGUvZGVtby5naXQ="
    });
    expect(result.structuredContent.summary).toContain("Started import");
  });
});
