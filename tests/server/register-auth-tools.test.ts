import { describe, expect, it, vi } from "vitest";
import {
  createClearSessionHandler,
  createConfigureSessionHandler,
  registerAuthTools
} from "../../src/server/register-auth-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerAuthTools", () => {
  it("registers auth tools in http mode", () => {
    const registerTool = vi.fn();

    registerAuthTools({
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(registerTool).toHaveBeenCalledTimes(2);
    expect(registerTool).toHaveBeenNthCalledWith(
      1,
      "auth_configure_session",
      expect.objectContaining({
        title: "auth_configure_session"
      }),
      expect.any(Function)
    );
    expect(registerTool).toHaveBeenNthCalledWith(
      2,
      "auth_clear_session",
      expect.objectContaining({
        title: "auth_clear_session"
      }),
      expect.any(Function)
    );
  });

  it("does not register auth tools in stdio mode", () => {
    const registerTool = vi.fn();

    registerAuthTools({
      server: { registerTool },
      mode: "stdio"
    });

    expect(registerTool).not.toHaveBeenCalled();
  });

  it("exports configure and clear session handlers", () => {
    expect(createConfigureSessionHandler).toBeTypeOf("function");
    expect(createClearSessionHandler).toBeTypeOf("function");
  });
});
