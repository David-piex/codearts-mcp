import { describe, expect, it, vi } from "vitest";
import { registerBuildTool } from "../../src/server/register-build-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerBuildTool", () => {
  it("registers a known build tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "build_list_jobs",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "build_list_jobs",
      expect.objectContaining({
        title: "build_list_jobs",
        description: "List CodeArts Build jobs"
      }),
      expect.any(Function)
    );
  });

  it("registers a known build tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "build_get_job",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "build_get_job",
      expect.objectContaining({
        title: "build_get_job",
        description: "Get CodeArts Build job detail"
      }),
      expect.any(Function)
    );
  });

  it("returns false for non-build tools", () => {
    const registerTool = vi.fn();

    const handled = registerBuildTool({
      toolName: "artifact_get_file",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
