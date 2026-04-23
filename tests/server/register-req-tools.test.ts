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

  it("registers the create iteration tool with the expected metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_create_iteration",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_create_iteration",
      expect.objectContaining({
        title: "req_create_iteration",
        description: "Create CodeArts Req iteration"
      }),
      expect.any(Function)
    );
  });

  it("registers the delete work item tool with rate-limited metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_delete_work_item",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_delete_work_item",
      expect.objectContaining({
        title: "req_delete_work_item",
        description: "Delete CodeArts Req work item"
      }),
      expect.any(Function)
    );
  });

  it("registers the batch update work items tool with rate-limited metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_batch_update_work_items",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_batch_update_work_items",
      expect.objectContaining({
        title: "req_batch_update_work_items",
        description: "Batch update CodeArts Req work items"
      }),
      expect.any(Function)
    );
  });

  it("registers the list work item records tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_list_work_item_records",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_list_work_item_records",
      expect.objectContaining({
        title: "req_list_work_item_records",
        description: "List CodeArts Req work item records"
      }),
      expect.any(Function)
    );
  });

  it("registers the query iteration immovable issues tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_query_iteration_immovable_issues",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_query_iteration_immovable_issues",
      expect.objectContaining({
        title: "req_query_iteration_immovable_issues",
        description: "Query CodeArts Req iteration immovable issues"
      }),
      expect.any(Function)
    );
  });

  it("registers the list work item comments tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_list_work_item_comments",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_list_work_item_comments",
      expect.objectContaining({
        title: "req_list_work_item_comments",
        description: "List CodeArts Req work item comments"
      }),
      expect.any(Function)
    );
  });

  it("registers the add work item comment tool with rate-limited metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_add_work_item_comment",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_add_work_item_comment",
      expect.objectContaining({
        title: "req_add_work_item_comment",
        description: "Add comment to a CodeArts Req work item"
      }),
      expect.any(Function)
    );
  });

  it("registers the update work item comment tool with rate-limited metadata", () => {
    const registerTool = vi.fn();

    const handled = registerReqTool({
      toolName: "req_update_work_item_comment",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "req_update_work_item_comment",
      expect.objectContaining({
        title: "req_update_work_item_comment",
        description: "Update a CodeArts Req work item comment"
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

  it("enforces rate limiting before handling create iteration in http mode", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };

    registerReqTool({
      toolName: "req_create_iteration",
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
        name: "Sprint 4",
        dry_run: false
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    expect(rateLimiter.check).toHaveBeenCalledWith(
      "req_create_iteration:session-1",
      "req_create_iteration"
    );
  });

  it("enforces rate limiting before handling delete work item in http mode", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };

    registerReqTool({
      toolName: "req_delete_work_item",
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
        work_item_id: "wi-9",
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
        work_item_id: "wi-9",
        dry_run: false
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    expect(rateLimiter.check).toHaveBeenCalledWith(
      "req_delete_work_item:session-1",
      "req_delete_work_item"
    );
    expect(rateLimiter.check).toHaveBeenCalledTimes(1);
  });

  it.each([
    {
      toolName: "req_delete_work_item",
      input: {
        project_id: "project-1",
        work_item_id: "wi-9"
      }
    },
    {
      toolName: "req_batch_update_work_items",
      input: {
        project_id: "project-1",
        work_item_ids: ["wi-9", "wi-10"],
        status_id: 3
      }
    },
    {
      toolName: "req_add_work_item_comment",
      input: {
        project_id: "project-1",
        work_item_id: "wi-9",
        content: "First comment"
      }
    },
    {
      toolName: "req_update_work_item_comment",
      input: {
        project_id: "project-1",
        work_item_id: "wi-9",
        comment_id: "comment-1",
        content: "Updated comment"
      }
    }
  ])(
    "does not consume rate limit when $toolName omits dry_run and falls back to default dry-run behavior",
    async ({ toolName, input }) => {
      const registerTool = vi.fn();
      const rateLimiter = { check: vi.fn() };

      registerReqTool({
        toolName,
        server: { registerTool },
        mode: "http",
        sessionStore: createSessionCredentialStore(),
        rateLimiter: rateLimiter as never
      });

      const handler = registerTool.mock.calls[0]?.[2] as
        | ((input: unknown, extra: { sessionId?: string; authId?: string }) => Promise<unknown>)
        | undefined;

      expect(handler).toBeTypeOf("function");

      await handler?.(input, {
        sessionId: "session-1",
        authId: "auth-1"
      });

      expect(rateLimiter.check).not.toHaveBeenCalled();
    }
  );

  it("enforces rate limiting before handling add work item comment in http mode", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };

    registerReqTool({
      toolName: "req_add_work_item_comment",
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
        work_item_id: "wi-9",
        content: "First comment",
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
        work_item_id: "wi-9",
        content: "First comment",
        dry_run: false
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    expect(rateLimiter.check).toHaveBeenCalledWith(
      "req_add_work_item_comment:session-1",
      "req_add_work_item_comment"
    );
    expect(rateLimiter.check).toHaveBeenCalledTimes(1);
  });

  it("enforces rate limiting before handling update work item comment in http mode", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };

    registerReqTool({
      toolName: "req_update_work_item_comment",
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
        work_item_id: "wi-9",
        comment_id: "comment-1",
        content: "Updated comment",
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
        work_item_id: "wi-9",
        comment_id: "comment-1",
        content: "Updated comment",
        dry_run: false
      },
      {
        sessionId: "session-1",
        authId: "auth-1"
      }
    );

    expect(rateLimiter.check).toHaveBeenCalledWith(
      "req_update_work_item_comment:session-1",
      "req_update_work_item_comment"
    );
    expect(rateLimiter.check).toHaveBeenCalledTimes(1);
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
