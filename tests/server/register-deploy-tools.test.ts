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
      ["deploy_list_application_permissions", "List CodeArts Deploy application permissions"],
      ["deploy_get_application_messages", "Get CodeArts Deploy application messages"],
      ["deploy_list_application_groups", "List CodeArts Deploy application groups"],
      ["deploy_get_success_rate_metrics", "Get CodeArts Deploy success rate metrics"],
      ["deploy_get_task_success_rate_metrics", "Get CodeArts Deploy task success rate metrics"],
      ["deploy_get_environment_permissions", "Get CodeArts Deploy environment permissions"]
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

  it("registers application environment and permission write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["deploy_get_application_environment", "Get CodeArts Deploy application environment detail"],
      ["deploy_update_application_environment", "Update CodeArts Deploy application environment"],
      ["deploy_delete_application_environment", "Delete CodeArts Deploy application environment"],
      ["deploy_copy_application", "Copy CodeArts Deploy application"],
      ["deploy_batch_delete_applications", "Batch delete CodeArts Deploy applications"],
      ["deploy_update_application_permission_level", "Update CodeArts Deploy application permission level"]
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

  it("registers v2 host group read tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["deploy_list_host_groups_v2", "List CodeArts Deploy v2 host groups"],
      ["deploy_get_host_group_v2", "Get CodeArts Deploy v2 host group detail"],
      ["deploy_list_host_group_hosts_v2", "List CodeArts Deploy v2 hosts in a host group"],
      ["deploy_get_host_group_host", "Get CodeArts Deploy host group host detail"],
      ["deploy_get_host_group_host_v2", "Get CodeArts Deploy v2 host group host detail"],
      ["deploy_get_host_group_permissions", "Get CodeArts Deploy host group permissions"]
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
