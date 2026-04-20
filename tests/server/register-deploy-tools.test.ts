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
