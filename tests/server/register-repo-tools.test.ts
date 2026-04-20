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
