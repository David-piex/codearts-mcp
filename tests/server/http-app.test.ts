import { once } from "node:events";
import { mkdtempSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createHttpApp } from "../../src/server/http-app.js";
import type { HttpAuthConfig } from "../../src/core/config/env.js";

const MCP_PROTOCOL_VERSION = "2025-03-26";

function createTestAuthConfig(): HttpAuthConfig {
  return {
    masterKey: "0123456789abcdef0123456789abcdef",
    authDataPath: join(mkdtempSync(join(tmpdir(), "codearts-mcp-auth-")), "auth-store.json"),
    authCookieName: "codearts_mcp_auth",
    authCookieSecure: false,
    authTokenTtlSeconds: 60
  };
}

async function startServer(
  authConfig?: HttpAuthConfig
): Promise<{ server: ReturnType<typeof createServer>; port: number }> {
  const app = createHttpApp(
    {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    },
    authConfig
  );
  const server = createServer(app);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected an address info object");
  }

  return {
    server,
    port: address.port
  };
}

async function postJsonRpc(
  port: number,
  payload: unknown,
  options?: {
    sessionId?: string;
    cookie?: string;
  }
) {
  const headers: Record<string, string> = {
    accept: "application/json, text/event-stream",
    "content-type": "application/json"
  };

  if (options?.sessionId) {
    headers["mcp-session-id"] = options.sessionId;
    headers["mcp-protocol-version"] = MCP_PROTOCOL_VERSION;
  }

  if (options?.cookie) {
    headers.cookie = options.cookie;
  }

  return fetch(`http://127.0.0.1:${port}/mcp`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
}

async function initializeSession(
  port: number,
  options?: {
    cookie?: string;
  }
) {
  const response = await postJsonRpc(
    port,
    {
      jsonrpc: "2.0",
      id: "init-1",
      method: "initialize",
      params: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: {
          name: "vitest",
          version: "0.1.0"
        }
      }
    },
    options
  );

  return {
    response,
    sessionId: response.headers.get("mcp-session-id")
  };
}

describe("http app", () => {
  const servers: Array<ReturnType<typeof createServer>> = [];

  afterEach(async () => {
    for (const server of servers.splice(0)) {
      server.close();
      await once(server, "close");
    }
  });

  it("serves the health endpoint", async () => {
    const app = createHttpApp({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    });
    const server = createServer(app);
    servers.push(server);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected an address info object");
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = (await response.json()) as { status: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("returns ok on the root path for deploy health probes", async () => {
    const app = createHttpApp({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    });
    const server = createServer(app);
    servers.push(server);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected an address info object");
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/`);
    const body = (await response.json()) as { status: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("sets an auth cookie after configure_session", async () => {
    const authConfig = createTestAuthConfig();
    const { server, port } = await startServer(authConfig);
    servers.push(server);

    const initialized = await initializeSession(port);
    const sessionId = initialized.sessionId;

    expect(initialized.response.status).toBe(200);
    expect(sessionId).toBeTruthy();

    const response = await postJsonRpc(
      port,
      {
        jsonrpc: "2.0",
        id: "call-1",
        method: "tools/call",
        params: {
          name: "auth_configure_session",
          arguments: {
            access_key: "ak-1",
            secret_key: "sk-1",
            region: "cn-north-4"
          }
        }
      },
      {
        sessionId: sessionId ?? undefined
      }
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain(
      `${authConfig.authCookieName}=`
    );
  });

  it("reuses cookie-backed auth after a reconnect", async () => {
    const authConfig = createTestAuthConfig();
    const { server, port } = await startServer(authConfig);
    servers.push(server);

    const firstInit = await initializeSession(port);
    const firstSessionId = firstInit.sessionId;

    expect(firstSessionId).toBeTruthy();

    const configureResponse = await postJsonRpc(
      port,
      {
        jsonrpc: "2.0",
        id: "call-1",
        method: "tools/call",
        params: {
          name: "auth_configure_session",
          arguments: {
            access_key: "ak-1",
            secret_key: "sk-1",
            region: "cn-north-4"
          }
        }
      },
      {
        sessionId: firstSessionId ?? undefined
      }
    );
    const cookie = configureResponse.headers.get("set-cookie");

    expect(cookie).toContain(`${authConfig.authCookieName}=`);

    const reconnectInit = await initializeSession(port, {
      cookie: cookie ?? undefined
    });
    const reconnectSessionId = reconnectInit.sessionId;

    expect(reconnectSessionId).toBeTruthy();
    expect(reconnectSessionId).not.toBe(firstSessionId);

    const clearResponse = await postJsonRpc(
      port,
      {
        jsonrpc: "2.0",
        id: "call-2",
        method: "tools/call",
        params: {
          name: "auth_clear_session",
          arguments: {}
        }
      },
      {
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      }
    );
    const body = (await clearResponse.json()) as {
      result?: {
        structuredContent?: {
          cleared?: boolean;
        };
      };
    };

    expect(clearResponse.status).toBe(200);
    expect(body.result?.structuredContent?.cleared).toBe(true);
    expect(clearResponse.headers.get("set-cookie")).toContain("Max-Age=0");
  });
});
