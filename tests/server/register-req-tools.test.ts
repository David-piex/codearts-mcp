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

  it("registers the create project tool with rate-limited write metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_create_project",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_create_project",
      expect.objectContaining({
        title: "req_create_project",
        description: "Create CodeArts Req project"
      }),
      expect.any(Function)
    );
  });

  it("registers the add project member tool with the expected metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_add_project_member",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_add_project_member",
      expect.objectContaining({
        title: "req_add_project_member",
        description: "Add member to a CodeArts Req project"
      }),
      expect.any(Function)
    );
  });

  it("enforces rate limiting before handling add project member in http mode", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };

    registerReqTool({
      toolName: "req_add_project_member",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      rateLimiter: rateLimiter as never
    });

    const handler = registerTool.mock.calls[0]?.[2] as
      | ((input: unknown, extra: { sessionId?: string; authId?: string }) => Promise<unknown>)
      | undefined;

    expect(handler).toBeTypeOf("function");

    await handler?.(
      {
        project_id: "project-1",
        user_id: "user-1",
        domain_id: "domain-1",
        dry_run: true
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    await handler?.(
      {
        project_id: "project-1",
        user_id: "user-1",
        domain_id: "domain-1",
        dry_run: false
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    expect(rateLimiter.check).toHaveBeenCalledWith(
      "req_add_project_member:session-1",
      "req_add_project_member"
    );
    expect(rateLimiter.check).toHaveBeenCalledTimes(1);
  });

  it("enforces rate limiting before handling create project in http mode", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };

    registerReqTool({
      toolName: "req_create_project",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      rateLimiter: rateLimiter as never
    });

    const handler = registerTool.mock.calls[0]?.[2] as
      | ((input: unknown, extra: { sessionId?: string; authId?: string }) => Promise<unknown>)
      | undefined;

    expect(handler).toBeTypeOf("function");

    await handler?.(
      {
        name: "Alpha",
        dry_run: false
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    expect(rateLimiter.check).toHaveBeenCalledWith("req_create_project:session-1", "req_create_project");
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
