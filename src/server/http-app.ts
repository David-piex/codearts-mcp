import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { loadServerMetadataConfig, type HttpAuthConfig, type ServerMetadataConfig } from "../core/config/env.js";
import { serializeAuthCookie } from "./auth-cookie.js";
import { createAuthContextResolver } from "./auth-context.js";
import { createFileAuthRepository } from "./auth-repository.js";
import { createServer } from "./create-server.js";
import { createSessionCredentialStore } from "./session-store.js";

type SessionTransportMap = Record<string, StreamableHTTPServerTransport>;

export type HttpRequestLogEntry = {
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  sessionId?: string;
  mcpMethod?: string;
  toolName?: string;
};

type HttpAppOptions = {
  requestLogger?: (entry: HttpRequestLogEntry) => void;
};

function writeJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function appendSetCookieHeader(res: ServerResponse, value: string) {
  const current = res.getHeader("set-cookie");

  if (current === undefined) {
    res.setHeader("set-cookie", value);
    return;
  }

  if (Array.isArray(current)) {
    res.setHeader("set-cookie", [...current, value]);
    return;
  }

  res.setHeader("set-cookie", [String(current), value]);
}

function installAuthResponseHooks(
  res: ServerResponse,
  authConfig: HttpAuthConfig,
  state: {
    issuedToken?: string;
    clearCookie: boolean;
    headersApplied: boolean;
  }
) {
  const applyHeaders = () => {
    if (state.headersApplied) {
      return;
    }

    if (state.issuedToken) {
      appendSetCookieHeader(
        res,
        serializeAuthCookie(authConfig.authCookieName, state.issuedToken, {
          secure: authConfig.authCookieSecure,
          maxAgeSeconds: authConfig.authTokenTtlSeconds
        })
      );
      state.headersApplied = true;
      return;
    }

    if (state.clearCookie) {
      appendSetCookieHeader(
        res,
        serializeAuthCookie(authConfig.authCookieName, "", {
          secure: authConfig.authCookieSecure,
          maxAgeSeconds: 0
        })
      );
      state.headersApplied = true;
    }
  };

  const originalWriteHead = res.writeHead.bind(res);
  res.writeHead = ((...args: Parameters<ServerResponse["writeHead"]>) => {
    applyHeaders();
    return originalWriteHead(...args);
  }) as ServerResponse["writeHead"];

  const originalEnd = res.end.bind(res);
  res.end = ((...args: Parameters<ServerResponse["end"]>) => {
    applyHeaders();
    return originalEnd(...args);
  }) as ServerResponse["end"];
}

function installRequestLogging(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
  details: HttpRequestLogEntry,
  requestLogger?: (entry: HttpRequestLogEntry) => void
) {
  if (!requestLogger) {
    return;
  }

  const startedAt = Date.now();
  let logged = false;

  const logRequest = () => {
    if (logged) {
      return;
    }

    logged = true;
    requestLogger({
      ...details,
      method: req.method ?? "UNKNOWN",
      path: pathname,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt
    });
  };

  res.once("finish", logRequest);
  res.once("close", logRequest);
}

function readMcpRequestDetails(payload: unknown): Pick<HttpRequestLogEntry, "mcpMethod" | "toolName"> {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const candidate = payload as {
    method?: unknown;
    params?: {
      name?: unknown;
    };
  };

  const mcpMethod = typeof candidate.method === "string" ? candidate.method : undefined;
  const toolName =
    mcpMethod === "tools/call" && typeof candidate.params?.name === "string"
      ? candidate.params.name
      : undefined;

  return {
    mcpMethod,
    toolName
  };
}

export function createHttpApp(
  config = loadServerMetadataConfig(),
  authConfig?: HttpAuthConfig,
  options: HttpAppOptions = {}
) {
  const transports: SessionTransportMap = {};
  const sessionStore = createSessionCredentialStore({
    ttlMs: authConfig ? authConfig.authTokenTtlSeconds * 1000 : undefined
  });
  const authRepository = authConfig
    ? createFileAuthRepository(authConfig.authDataPath, {
        fileCheckIntervalMs: 1_000
      })
    : undefined;
  const authResolver =
    authConfig && authRepository
      ? createAuthContextResolver({
          authCookieName: authConfig.authCookieName,
          repository: authRepository,
          sessionStore
        })
      : undefined;

  return async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url || !req.method) {
      writeJson(res, 400, { error: "Invalid request." });
      return;
    }

    const url = new URL(req.url, "http://127.0.0.1");
    const sessionIdHeader = req.headers["mcp-session-id"];
    const sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;
    const requestLogDetails: HttpRequestLogEntry = {
      method: req.method,
      path: url.pathname,
      statusCode: 0,
      durationMs: 0,
      sessionId
    };
    installRequestLogging(req, res, url.pathname, requestLogDetails, options.requestLogger);

    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      writeJson(res, 200, { status: "ok" });
      return;
    }

    if (url.pathname !== "/mcp") {
      writeJson(res, 404, { error: "Not found." });
      return;
    }

    const authContext = authResolver
      ? await authResolver.resolve({
          sessionId,
          headers: {
            authorization: normalizeHeaderValue(req.headers.authorization),
            cookie: normalizeHeaderValue(req.headers.cookie)
          },
          queryToken: url.searchParams.get("auth_token") ?? undefined
        })
      : undefined;
    const responseAuthState = {
      issuedToken: undefined as string | undefined,
      clearCookie: false,
      headersApplied: false
    };

    if (authConfig) {
      installAuthResponseHooks(res, authConfig, responseAuthState);
    }

    (
      req as IncomingMessage & {
        auth?: {
          authId?: string;
          rawToken?: string;
          onTokenIssued?: (rawToken: string) => void;
          onAuthCleared?: () => void;
        };
      }
    ).auth = {
      authId: authContext?.authId,
      rawToken: authContext?.rawToken,
      onTokenIssued: (rawToken) => {
        responseAuthState.issuedToken = rawToken;
        responseAuthState.clearCookie = false;
      },
      onAuthCleared: () => {
        responseAuthState.issuedToken = undefined;
        responseAuthState.clearCookie = true;
      }
    };

    try {
      if (req.method === "POST") {
        const parsedBody = await readJsonBody(req);
        Object.assign(requestLogDetails, readMcpRequestDetails(parsedBody));
        let transport = sessionId ? transports[sessionId] : undefined;

        if (transport && authContext?.authId) {
          sessionStore.bind(sessionId!, authContext.authId);
        }

        if (!transport) {
          if (!parsedBody || !isInitializeRequest(parsedBody)) {
            writeJson(res, 400, { error: "Missing or invalid MCP session." });
            return;
          }

          transport = new StreamableHTTPServerTransport({
            enableJsonResponse: true,
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (newSessionId) => {
              transports[newSessionId] = transport!;
              if (authContext?.authId) {
                sessionStore.bind(newSessionId, authContext.authId);
              }
            },
            onsessionclosed: (closedSessionId) => {
              delete transports[closedSessionId];
              sessionStore.clear(closedSessionId);
            }
          });

          const server = createServer({
            mode: "http",
            config,
            sessionStore,
            authRepository,
            authMasterKey: authConfig?.masterKey
          });
          await server.connect(transport);
        }

        await transport.handleRequest(req, res, parsedBody);
        return;
      }

      if (req.method === "GET") {
        if (!sessionId || !transports[sessionId]) {
          writeJson(res, 400, { error: "Invalid or missing session ID." });
          return;
        }

        await transports[sessionId].handleRequest(req, res);
        return;
      }

      if (req.method === "DELETE") {
        if (!sessionId || !transports[sessionId]) {
          writeJson(res, 400, { error: "Invalid or missing session ID." });
          return;
        }

        await transports[sessionId].handleRequest(req, res);
        return;
      }

      writeJson(res, 405, { error: "Method not allowed." });
    } catch (error) {
      writeJson(res, 500, {
        error: error instanceof Error ? error.message : "Internal server error"
      });
    }
  };
}
