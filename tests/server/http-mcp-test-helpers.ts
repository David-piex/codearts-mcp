import { once } from "node:events";
import { mkdtempSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { HttpAuthConfig, ServerMetadataConfig } from "../../src/core/config/env.js";
import { createHttpApp } from "../../src/server/http-app.js";
import { DEFAULT_MCP_PROTOCOL_VERSION } from "../../src/server/mcp-protocol.js";
import { masterKey } from "./http-test-helpers.js";

export const MCP_PROTOCOL_VERSION = DEFAULT_MCP_PROTOCOL_VERSION;

type TestHttpServer = Awaited<ReturnType<typeof startTestHttpServer>>;

export function createTestHttpAuthConfig(options?: {
  prefix?: string;
  ttlSeconds?: number;
  allowQueryAuthToken?: boolean;
}): HttpAuthConfig {
  return {
    masterKey,
    authDataPath: join(
      mkdtempSync(join(tmpdir(), options?.prefix ?? "codearts-mcp-auth-")),
      "auth-store.json"
    ),
    authCookieName: "codearts_mcp_auth",
    authCookieSecure: false,
    authTokenTtlSeconds: options?.ttlSeconds ?? 60,
    allowQueryAuthToken: options?.allowQueryAuthToken ?? false
  };
}

export async function startTestHttpServer(
  authConfig?: HttpAuthConfig,
  options?: {
    requestLogger?: (entry: unknown) => void;
    config?: Partial<ServerMetadataConfig>;
  }
): Promise<{ server: ReturnType<typeof createServer>; port: number }> {
  const { config: configOverrides, ...appOptions } = options ?? {};
  const app = createHttpApp(
    {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpHost: "127.0.0.1",
      httpAllowedOrigins: [],
      httpPort: 0,
      ...configOverrides
    },
    authConfig,
    appOptions
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

export function createTestHttpServerRegistry() {
  const servers: Array<TestHttpServer["server"]> = [];

  return {
    async start(
      authConfig?: HttpAuthConfig,
      options?: {
        requestLogger?: (entry: unknown) => void;
        config?: Partial<ServerMetadataConfig>;
      }
    ) {
      const started = await startTestHttpServer(authConfig, options);
      servers.push(started.server);
      return started;
    },
    async closeAll() {
      for (const server of servers.splice(0)) {
        server.close();
        await once(server, "close");
      }
    }
  };
}

export async function fetchJsonFromTestServer<T>(
  port: number,
  path: string
) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`);

  return {
    response,
    body: (await response.json()) as T
  };
}

export async function postJsonRpc(
  port: number,
  payload: unknown,
  options?: {
    sessionId?: string;
    cookie?: string;
    queryToken?: string;
    headers?: Record<string, string>;
    path?: string;
  }
) {
  const headers: Record<string, string> = {
    accept: "application/json, text/event-stream",
    "content-type": "application/json",
    ...options?.headers
  };

  if (options?.sessionId) {
    headers["mcp-session-id"] = options.sessionId;
    headers["mcp-protocol-version"] = MCP_PROTOCOL_VERSION;
  }

  if (options?.cookie) {
    headers.cookie = options.cookie;
  }

  const url = new URL(`http://127.0.0.1:${port}${options?.path ?? "/mcp"}`);
  if (options?.queryToken) {
    url.searchParams.set("auth_token", options.queryToken);
  }

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
}

export async function initializeSession(
  port: number,
  options?: {
    cookie?: string;
    queryToken?: string;
    clientName?: string;
    headers?: Record<string, string>;
    path?: string;
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
          name: options?.clientName ?? "vitest",
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

export async function callTool(
  port: number,
  input: {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
    sessionId?: string;
    cookie?: string;
    queryToken?: string;
    path?: string;
  }
) {
  const response = await postJsonRpc(
    port,
    {
      jsonrpc: "2.0",
      id: input.id,
      method: "tools/call",
      params: {
        name: input.name,
        arguments: input.arguments
      }
    },
    {
      sessionId: input.sessionId,
      cookie: input.cookie,
      queryToken: input.queryToken,
      path: input.path
    }
  );
  const body = (await response.json()) as {
    result?: {
      structuredContent?: {
        auth_token?: string;
        auth_id?: string;
        cleared?: boolean;
        item?: Record<string, unknown>;
        items?: Array<Record<string, unknown>>;
      };
      isError?: boolean;
      content?: Array<{ type?: string; text?: string }>;
    };
  };

  return {
    response,
    body
  };
}

export async function configureSessionTool(
  port: number,
  options?: {
    sessionId?: string;
    cookie?: string;
    queryToken?: string;
    accessKey?: string;
    secretKey?: string;
    region?: string;
    path?: string;
  }
) {
  return callTool(port, {
    id: "configure-session",
    name: "auth_configure_session",
    arguments: {
      access_key: options?.accessKey ?? "ak-1",
      secret_key: options?.secretKey ?? "sk-1",
      region: options?.region ?? "cn-north-4"
    },
    sessionId: options?.sessionId,
    cookie: options?.cookie,
    queryToken: options?.queryToken,
    path: options?.path
  });
}

export async function initializeConfiguredSession(
  port: number,
  options?: {
    cookie?: string;
    queryToken?: string;
    clientName?: string;
    accessKey?: string;
    secretKey?: string;
    region?: string;
    path?: string;
  }
) {
  const initialized = await initializeSession(port, {
    cookie: options?.cookie,
    queryToken: options?.queryToken,
    clientName: options?.clientName,
    path: options?.path
  });
  const sessionId = initialized.sessionId;

  if (!sessionId) {
    throw new Error("Expected the HTTP MCP initialize call to return a session id.");
  }

  const configured = await configureSessionTool(port, {
    sessionId,
    cookie: options?.cookie,
      queryToken: options?.queryToken,
      accessKey: options?.accessKey,
      secretKey: options?.secretKey,
      region: options?.region,
      path: options?.path
    });

  return {
    initialized,
    configured,
    sessionId,
    authToken: configured.body.result?.structuredContent?.auth_token,
    authId: configured.body.result?.structuredContent?.auth_id,
    cookie: configured.response.headers.get("set-cookie")
  };
}

export async function clearSessionTool(
  port: number,
  options?: {
    sessionId?: string;
    cookie?: string;
    queryToken?: string;
    path?: string;
  }
) {
  return callTool(port, {
    id: "clear-session",
    name: "auth_clear_session",
    arguments: {},
    sessionId: options?.sessionId,
    cookie: options?.cookie,
    queryToken: options?.queryToken,
    path: options?.path
  });
}
