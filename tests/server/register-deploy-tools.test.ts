import { describe, expect, it, vi } from "vitest";
import { registerDeployTool } from "../../src/server/register-deploy-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerDeployTool", () => {
  it("registers a known deploy tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerDeployTool({
      toolName: "deploy_list_apps",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "deploy_list_apps",
      expect.objectContaining({
        title: "deploy_list_apps",
        description: "List CodeArts Deploy applications"
      }),
      expect.any(Function)
    );
  });

  it("registers a known deploy tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerDeployTool({
      toolName: "deploy_get_status",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "deploy_get_status",
      expect.objectContaining({
        title: "deploy_get_status",
        description: "Get CodeArts Deploy task status"
      }),
      expect.any(Function)
    );
  });

  it("registers application permission read tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["deploy_check_application_exists", "Check whether a CodeArts Deploy application name exists"],
      ["deploy_check_application_creatable", "Check whether CodeArts Deploy application creation is allowed"],
      ["deploy_list_application_permissions", "List CodeArts Deploy application permissions"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerDeployTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("returns false for non-deploy tools", () => {
    const registerTool = vi.fn();

    const handled = registerDeployTool({
      toolName: "build_list_jobs",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
