import { describe, expect, it, vi } from "vitest";
import { registerRepoTool } from "../../src/server/register-repo-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerRepoTool", () => {
  it("registers a known repo tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerRepoTool({
      toolName: "repo_list_repositories",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "repo_list_repositories",
      expect.objectContaining({
        title: "repo_list_repositories",
        description: "List CodeArts Repo repositories"
      }),
      expect.any(Function)
    );
  });

  it("registers a known repo tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerRepoTool({
      toolName: "repo_merge_merge_request",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "repo_merge_merge_request",
      expect.objectContaining({
        title: "repo_merge_merge_request",
        description: "Merge CodeArts Repo merge request"
      }),
      expect.any(Function)
    );
  });

  it("registers new repo mutation tools", () => {
    const registerTool = vi.fn();

    const handled = registerRepoTool({
      toolName: "repo_validate_https_info",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "repo_validate_https_info",
      expect.objectContaining({
        title: "repo_validate_https_info",
        description: "Validate CodeArts Repo HTTPS credentials through the official ValidateHttpsInfo endpoint"
      }),
      expect.any(Function)
    );
  });

  it("registers newly added repo read tools", () => {
    const registerTool = vi.fn();

    const handled = registerRepoTool({
      toolName: "repo_get_repository_id_by_name",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "repo_get_repository_id_by_name",
      expect.objectContaining({
        title: "repo_get_repository_id_by_name",
        description: "Get CodeArts Repo repository id by group and repository name through the official GetRepositoryIdByName endpoint"
      }),
      expect.any(Function)
    );
  });

  it("returns false for non-repo tools", () => {
    const registerTool = vi.fn();

    const handled = registerRepoTool({
      toolName: "pipeline_list_pipelines",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
