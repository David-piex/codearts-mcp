import { describe, expect, it, vi } from "vitest";
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
