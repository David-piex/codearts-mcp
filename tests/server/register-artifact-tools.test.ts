import { describe, expect, it, vi } from "vitest";
import { registerArtifactTool } from "../../src/server/register-artifact-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerArtifactTool", () => {
  it("registers a known artifact tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerArtifactTool({
      toolName: "artifact_list_repositories",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "artifact_list_repositories",
      expect.objectContaining({
        title: "artifact_list_repositories",
        description: "List CodeArts Artifact repositories"
      }),
      expect.any(Function)
    );
  });

  it("registers a known artifact tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerArtifactTool({
      toolName: "artifact_get_file",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "artifact_get_file",
      expect.objectContaining({
        title: "artifact_get_file",
        description: "Get CodeArts Artifact file detail"
      }),
      expect.any(Function)
    );
  });

  it("returns false for non-artifact tools", () => {
    const registerTool = vi.fn();

    const handled = registerArtifactTool({
      toolName: "deploy_list_apps",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
