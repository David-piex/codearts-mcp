import { describe, expect, it, vi } from "vitest";
import { registerCheckTool } from "../../src/server/register-check-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerCheckTool", () => {
  it("registers a known check tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "check_list_tasks",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "check_list_tasks",
      expect.objectContaining({
        title: "check_list_tasks",
        description: "List CodeArts Check tasks"
      }),
      expect.any(Function)
    );
  });

  it("registers a known check tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "check_get_task",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "check_get_task",
      expect.objectContaining({
        title: "check_get_task",
        description: "Get CodeArts Check task detail"
      }),
      expect.any(Function)
    );
  });

  it("registers additional check task metadata read tools", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "check_get_task_resource_pool",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "check_get_task_resource_pool",
      expect.objectContaining({
        title: "check_get_task_resource_pool",
        description: "Get CodeArts Check task resource pool"
      }),
      expect.any(Function)
    );
  });

  it("registers new read-only check tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["check_list_task_files", "List CodeArts Check task files"],
      ["check_list_task_all_files", "List CodeArts Check task all files"],
      ["check_detect_task_language", "Detect CodeArts Check task language"],
      ["check_list_codehub_repositories", "List CodeArts Check CodeHub repositories"],
      ["check_get_domain_checkers_version", "Get CodeArts Check domain checkers version"],
      ["check_list_task_check_records", "List CodeArts Check task check records"],
      ["check_list_rules", "List CodeArts Check rules"],
      ["check_list_default_rulesets", "List CodeArts Check default rulesets"],
      ["check_list_supported_languages", "List CodeArts Check supported languages"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerCheckTool({
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

  it("returns false for non-check tools", () => {
    const registerTool = vi.fn();

    const handled = registerCheckTool({
      toolName: "build_list_jobs",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
