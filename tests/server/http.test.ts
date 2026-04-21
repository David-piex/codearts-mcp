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

  it("uses the shared structured logger when no custom requestLogger is provided", async () => {
    const app = vi.fn();
    const logger = {
      info: vi.fn(),
      error: vi.fn()
    };
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
    const createHttpApp = vi.fn(() => app as never);

    await startHttpServer(0, {
      createHttpApp: createHttpApp as never,
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
      logger: logger as never
    });

    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "http_server_listening",
        message: "HTTP server listening",
        port: 0
      })
    );

    const createHttpAppArgs = createHttpApp.mock.calls[0];
    const requestLogger = createHttpAppArgs?.[2]?.requestLogger as
      | ((entry: {
          method: string;
          path: string;
          statusCode: number;
          durationMs: number;
        }) => void)
      | undefined;

    expect(typeof requestLogger).toBe("function");

    requestLogger?.({
      method: "GET",
      path: "/health",
      statusCode: 200,
      durationMs: 12
    });

    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "http_request_completed",
        message: "HTTP request completed",
        method: "GET",
        path: "/health",
        statusCode: 200,
        durationMs: 12
      })
    );
  });

  it("awaits app prewarm before the HTTP server starts listening", async () => {
    const events: string[] = [];
    const app = Object.assign(vi.fn(), {
      prewarm: vi.fn(async () => {
        events.push("prewarm:start");
        await Promise.resolve();
        events.push("prewarm:end");
      })
    });
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
        events.push("listen");
        callback();
        return this;
      }
    });

    await startHttpServer(0, {
      createHttpApp: () => app as never,
      createNodeServer: (() => fakeServer) as never,
      loadServerMetadataConfig: () => ({
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000,
        readCacheTtls: {
          reqListProjectsMs: 60_000,
          repoListRepositoriesMs: 60_000,
          pipelineListPipelinesMs: 5_000,
          buildListJobsMs: 5_000
        }
      }),
      loadHttpAuthConfig: () => ({
        masterKey: "test-master-key-0123456789",
        authDataPath: ".codearts-mcp/auth-store.json",
        authCookieName: "codearts_mcp_auth",
        authCookieSecure: false,
        authTokenTtlSeconds: 60
      })
    });

    expect(app.prewarm).toHaveBeenCalledTimes(1);
    expect(events).toEqual(["prewarm:start", "prewarm:end", "listen"]);
  });
});
