import { describe, expect, it, vi } from "vitest";
import { registerReqTool } from "../../src/server/register-req-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerReqTool", () => {
  it("registers a known req tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_list_projects",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_list_projects",
      expect.objectContaining({
        title: "req_list_projects",
        description: "List CodeArts Req projects"
      }),
      expect.any(Function)
    );
  });

  it("registers a known req tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_get_work_item",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_get_work_item",
      expect.objectContaining({
        title: "req_get_work_item",
        description: "Get CodeArts Req work item detail"
      }),
      expect.any(Function)
    );
  });

  it("returns false for non-req tools", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "repo_get_repository",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
