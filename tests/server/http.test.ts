import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { startHttpServer } from "../../src/server/http.js";

describe("startHttpServer", () => {
  it("configures keep-alive oriented server timeouts for the shared HTTP entrypoint", async () => {
    const app = vi.fn();
    const requestLogger = vi.fn();
    const fakeServer = Object.assign(new EventEmitter(), {
      keepAliveTimeout: 5_000,
      headersTimeout: 60_000,
      requestTimeout: 300_000,
      maxRequestsPerSocket: 0,
      once(event: string, listener: (...args: unknown[]) => void) {
        EventEmitter.prototype.once.call(this, event, listener);
        return this;
      },
      off(event: string, listener: (...args: unknown[]) => void) {
        EventEmitter.prototype.off.call(this, event, listener);
        return this;
      },
      listen(_port: number, _host: string, callback: () => void) {
        callback();
        return this;
      }
    });
    const createNodeServer = vi.fn(() => fakeServer as never);

    const server = await startHttpServer(0, {
      createHttpApp: () => app as never,
      createNodeServer: createNodeServer as never,
      loadServerMetadataConfig: () => ({
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000
      }),
      loadHttpAuthConfig: () => ({
        masterKey: "test-master-key-0123456789",
        authDataPath: ".codearts-mcp/auth-store.json",
        authCookieName: "codearts_mcp_auth",
        authCookieSecure: false,
        authTokenTtlSeconds: 60
      }),
      requestLogger
    });

    expect(createNodeServer).toHaveBeenCalledWith(
      {
        keepAlive: true,
        keepAliveInitialDelay: 1_000
      },
      app
    );
    expect(server).toBe(fakeServer);
    expect(fakeServer.keepAliveTimeout).toBe(60_000);
    expect(fakeServer.headersTimeout).toBe(65_000);
    expect(fakeServer.requestTimeout).toBe(0);
    expect(fakeServer.maxRequestsPerSocket).toBe(0);
  });
});
