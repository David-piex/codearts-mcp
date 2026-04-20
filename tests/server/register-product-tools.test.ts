import { describe, expect, it, vi } from "vitest";
import { registerProductTool } from "../../src/server/register-product-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerProductTool", () => {
  it("dispatches to the matching product registrar", () => {
    const registerTool = vi.fn();

    const handled = registerProductTool({
      toolName: "pipeline_list_pipelines",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore(),
      stdioClients: undefined
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "pipeline_list_pipelines",
      expect.objectContaining({
        title: "pipeline_list_pipelines"
      }),
      expect.any(Function)
    );
  });

  it("returns false when no product registrar handles the tool", () => {
    const registerTool = vi.fn();

    const handled = registerProductTool({
      toolName: "totally_unknown_tool",
      server: { registerTool },
      mode: "stdio",
      stdioClients: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
