import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../src/core/errors/app-error.js";
import {
  defineProductTool,
  registerDefinedTool
} from "../../src/server/product-tool-registry.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("product tool registry helper", () => {
  it("registers a known tool in stdio mode and resolves the stdio client", async () => {
    const registerTool = vi.fn();
    const demoToolDefinitions = {
      "demo_tool": defineProductTool({
        description: "Demo tool",
        inputSchema: { kind: "schema" },
        selectHttpClient: (clients: { demoClient: { id: string } }) => clients.demoClient,
        createProductHandler: (client: { id: string }) => async () => ({
          structuredContent: {
            clientId: client.id
          }
        })
      })
    } as const;

    const handled = registerDefinedTool({
      toolName: "demo_tool",
      server: { registerTool },
      definitions: demoToolDefinitions,
      mode: "stdio",
      stdioClient: { id: "stdio-client" }
    });

    expect(handled).toBe(true);
    const handler = registerTool.mock.calls[0][2] as () => Promise<{
      structuredContent: { clientId: string };
    }>;
    await expect(handler()).resolves.toMatchObject({
      structuredContent: {
        clientId: "stdio-client"
      }
    });
  });

  it("registers a known tool in http mode", () => {
    const registerTool = vi.fn();
    const demoToolDefinitions = {
      "demo_tool": defineProductTool({
        description: "Demo tool",
        inputSchema: { kind: "schema" },
        selectHttpClient: (clients: { demoClient: { id: string } }) => clients.demoClient,
        createProductHandler: (client: { id: string }) => async () => ({
          structuredContent: {
            clientId: client.id
          }
        })
      })
    } as const;

    const handled = registerDefinedTool({
      toolName: "demo_tool",
      server: { registerTool },
      definitions: demoToolDefinitions,
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "demo_tool",
      expect.objectContaining({
        title: "demo_tool",
        description: "Demo tool",
        inputSchema: { kind: "schema" }
      }),
      expect.any(Function)
    );
  });

  it("rate limits inferred write tools before resolving session clients", async () => {
    const registerTool = vi.fn();
    const rateLimiter = {
      check: vi.fn(() => {
        throw new Error("limited");
      })
    };
    const demoToolDefinitions = {
      "demo_create_item": defineProductTool({
        description: "Demo write tool",
        inputSchema: {
          safeParse: () => ({ success: true, data: {} })
        },
        selectHttpClient: (clients: { demoClient: { id: string } }) => clients.demoClient,
        createProductHandler: (client: { id: string }) => async () => ({
          structuredContent: {
            clientId: client.id
          }
        })
      })
    } as const;

    registerDefinedTool({
      toolName: "demo_create_item",
      server: { registerTool },
      definitions: demoToolDefinitions,
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      rateLimiter: rateLimiter as never
    });

    const handler = registerTool.mock.calls[0][2] as (
      input: unknown,
      extra: { sessionId?: string }
    ) => Promise<{ isError?: boolean }>;

    await expect(handler({}, { sessionId: "session-1" })).resolves.toMatchObject({
      isError: true
    });
    expect(rateLimiter.check).toHaveBeenCalledWith(
      "demo_create_item:session-1",
      "demo_create_item"
    );
  });

  it("does not rate limit inferred write tools for dry-run input", async () => {
    const registerTool = vi.fn();
    const rateLimiter = { check: vi.fn() };
    const demoToolDefinitions = {
      "demo_create_item": defineProductTool({
        description: "Demo write tool",
        inputSchema: {
          safeParse: () => ({ success: true, data: { dry_run: true } })
        },
        selectHttpClient: (clients: { demoClient: { id: string } }) => clients.demoClient,
        createProductHandler: () => async () => ({
          structuredContent: {
            dryRun: true
          }
        })
      })
    } as const;

    registerDefinedTool({
      toolName: "demo_create_item",
      server: { registerTool },
      definitions: demoToolDefinitions,
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      rateLimiter: rateLimiter as never
    });

    const handler = registerTool.mock.calls[0][2] as (
      input: unknown,
      extra: { sessionId?: string }
    ) => Promise<{ isError?: boolean }>;

    await expect(handler({}, { sessionId: "session-1" })).resolves.toMatchObject({
      isError: true
    });
    expect(rateLimiter.check).not.toHaveBeenCalled();
  });

  it("wraps product handler failures into tool error results", async () => {
    const registerTool = vi.fn();
    const demoToolDefinitions = {
      "demo_tool": defineProductTool({
        description: "Demo tool",
        inputSchema: { kind: "schema" },
        selectHttpClient: (clients: { demoClient: { id: string } }) => clients.demoClient,
        createProductHandler: () => async () => {
          throw new AppError("provider_error", "demo boom");
        }
      })
    } as const;

    registerDefinedTool({
      toolName: "demo_tool",
      server: { registerTool },
      definitions: demoToolDefinitions,
      mode: "stdio",
      stdioClient: { id: "stdio-client" }
    });

    const handler = registerTool.mock.calls[0][2] as () => Promise<{
      isError?: boolean;
      content?: Array<{ type: string; text: string }>;
    }>;

    await expect(handler()).resolves.toEqual({
      content: [{ type: "text", text: "demo boom" }],
      isError: true
    });
  });

  it("enriches tool error text with actionable hints when a known pattern matches", async () => {
    const registerTool = vi.fn();
    const demoToolDefinitions = {
      "repo_list_repositories": defineProductTool({
        description: "Demo tool",
        inputSchema: { kind: "schema" },
        selectHttpClient: (clients: { demoClient: { id: string } }) => clients.demoClient,
        createProductHandler: () => async () => {
          throw new AppError(
            "auth_error",
            "Insufficient permissions. Apply for the required permission and try again.",
            undefined,
            undefined,
            403
          );
        }
      })
    } as const;

    registerDefinedTool({
      toolName: "repo_list_repositories",
      server: { registerTool },
      definitions: demoToolDefinitions,
      mode: "stdio",
      stdioClient: { id: "stdio-client" }
    });

    const handler = registerTool.mock.calls[0][2] as () => Promise<{
      isError?: boolean;
      content?: Array<{ type: string; text: string }>;
    }>;

    await expect(handler()).resolves.toMatchObject({
      isError: true,
      content: [
        {
          type: "text",
          text: expect.stringContaining("Check that `project_id` belongs to a project where the current account can access CodeArts Repo")
        }
      ]
    });
  });

  it("returns false for unknown tools", () => {
    const registerTool = vi.fn();

    const handled = registerDefinedTool({
      toolName: "missing_tool",
      server: { registerTool },
      definitions: {},
      mode: "stdio"
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
