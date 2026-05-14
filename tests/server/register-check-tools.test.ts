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
