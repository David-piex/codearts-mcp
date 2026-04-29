import { describe, expect, it } from "vitest";
import {
  buildRepositoryImportSourceUrl,
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

  it("builds credentialed source URLs before import_url encoding", () => {
    expect(
      buildRepositoryImportSourceUrl({
        source_url: "https://gitee.com/example/demo.git",
        source_username: "source-user",
        source_token: "token-value"
      })
    ).toBe("https://source-user:token-value@gitee.com/example/demo.git");
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
      source_username: "user",
      source_token: "secret",
      import_type: "git",
      fetch_refs_type: "default",
      codecheck: 0,
      mirror_repository: 0,
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
      sourceUsername: "user",
      hasSourceToken: true,
      importType: "git",
      fetchRefsType: "default",
      codecheck: 0,
      mirrorRepository: 0,
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
        source_url: "https://github.com/example/demo.git",
        source_username: "octo",
        source_token: "token-value",
        import_type: "git",
        fetch_refs_type: "default",
        codecheck: 0,
        mirror_repository: 0
      }
    );

    expect(result.item).toEqual({
      id: "repo-uuid-1",
      repositoryUuid: "repo-uuid-1",
      projectUuid: "project-uuid-1",
      name: "demo-repo",
      sourceType: "github",
      sourceUrl: "https://github.com/example/demo.git",
      sourceUsername: "octo",
      hasSourceToken: true,
      importType: "git",
      fetchRefsType: "default",
      codecheck: 0,
      mirrorRepository: 0,
      executed: true
    });
  });
});

describe("createRepoImportRepositoryHandler", () => {
  it("creates a repository import request with encoded import_url", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const handler = createRepoImportRepositoryHandler({
      importRepository: async (input) => {
        requestedBody = input;
        return {
          status: "success",
          project_uuid: "project-uuid-1"
        };
      }
    });

    const result = await handler({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      source_type: "github",
      source_url: "https://github.com/example/demo.git",
      source_repo_id: "123",
      source_full_name: "example/demo",
      source_visibility: "public",
      source_username: "octo",
      source_token: "token-value",
      visibility_level: 20,
      dry_run: false
    });

    expect(requestedBody).toEqual({
      project_uuid: "project-uuid-1",
      import_type: "git",
      codecheck: 0,
      fetch_refs_type: "default",
      endpoint_uuid: undefined,
      source_repo_id: "123",
      source_url: "https://octo:token-value@github.com/example/demo.git",
      source_type: "github",
      source_full_name: "example/demo",
      target_repo_name: "demo-repo",
      visibility_level: 20,
      security_level: undefined,
      group_id: undefined,
      mirror_repository: 0,
      source_visibility: "public"
    });
    expect(result.structuredContent.summary).toContain("Started import");
  });

  it("falls back to CreateRepository import_url when the portal import API is not published", async () => {
    const calls: Array<{ method: string; input: Record<string, unknown> }> = [];
    const handler = createRepoImportRepositoryHandler({
      importRepository: async (input) => {
        calls.push({ method: "importRepository", input });
        throw Object.assign(new Error("not published"), {
          status: 404,
          code: "APIGW.0101"
        });
      },
      createRepository: async (input) => {
        calls.push({ method: "createRepository", input });
        return {
          repository_uuid: "repo-uuid-2",
          project_uuid: "project-uuid-1"
        };
      }
    });

    const result = await handler({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      source_type: "gitee",
      source_url: "https://gitee.com/example/demo.git",
      visibility_level: 0,
      dry_run: false
    });

    expect(calls.map((call) => call.method)).toEqual(["importRepository", "createRepository"]);
    expect(calls[1]?.input).toMatchObject({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      visibility_level: 0,
      import_url: "aHR0cHM6Ly9naXRlZS5jb20vZXhhbXBsZS9kZW1vLmdpdA=="
    });
    expect(result.structuredContent.item).toMatchObject({
      repositoryUuid: "repo-uuid-2"
    });
  });
});
