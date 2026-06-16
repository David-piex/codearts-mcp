import { randomUUID } from "node:crypto";
import { accessSync, constants as fsConstants, existsSync, statSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { dirname } from "node:path";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { loadServerMetadataConfig, type HttpAuthConfig, type ServerMetadataConfig } from "../core/config/env.js";
import { serializeAuthCookie } from "./auth-cookie.js";
import { createAuthContextResolver } from "./auth-context.js";
import { createFileAuthRepository } from "./auth-repository.js";
import { createServerFactory } from "./create-server.js";
import {
  getCurrentRequestDiagnostics,
  recordRequestPhase,
  runWithRequestDiagnostics
} from "./request-context.js";
import { createSessionReuseDiagnosticsStore } from "./session-reuse-diagnostics.js";
import { createSessionCredentialStore } from "./session-store.js";
import { isProductToolFamily, type ProductToolFamily } from "../contracts/product-families.js";

type SessionTransportMap = Record<string, StreamableHTTPServerTransport>;

export type HttpRequestLogEntry = {
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  sessionId?: string;
  mcpMethod?: string;
  toolName?: string;
  cacheHits?: string[];
  phaseTimings?: Array<{
    name: string;
    durationMs: number;
  }>;
  upstreamRequestCount?: number;
  upstreamDurationMs?: number;
  upstreamStatusCodes?: number[];
};

type HttpAppOptions = {
  requestLogger?: (entry: HttpRequestLogEntry) => void;
};

type HttpAppRouteConfig = {
  enabledProductFamilies?: ProductToolFamily[];
};

type ResolvedMcpRoute = {
  routeKey: ProductToolFamily;
  path: `/mcp/${ProductToolFamily}`;
  enabledProductFamilies: [ProductToolFamily];
};

export type HttpAppPrewarmResult = {
  warmedComponents: string[];
};

export type HttpApp = ((
  req: IncomingMessage,
  res: ServerResponse
) => Promise<void>) & {
  prewarm?: () => Promise<HttpAppPrewarmResult> | HttpAppPrewarmResult;
};

type ReadinessResponse = {
  statusCode: number;
  body: {
    status: "ready" | "not_ready";
    checks: {
      http: "ok";
      auth_persistence: "ok" | "error" | "skipped";
    };
    details?: {
      authDataPath?: string;
      authPersistenceError?: string;
    };
  };
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

function normalizeOriginHeader(value: string | string[] | undefined) {
  const origin = normalizeHeaderValue(value);

  if (!origin) {
    return undefined;
  }

  try {
    return new URL(origin).origin;
  } catch {
    return "__invalid_origin__";
  }
}

function isOriginAllowed(
  origin: string | undefined,
  allowedOrigins: readonly string[]
) {
  if (!origin) {
    return true;
  }

  return allowedOrigins.includes(origin);
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
  options?: {
    requestLogger?: (entry: HttpRequestLogEntry) => void;
    onRequestCompleted?: (entry: HttpRequestLogEntry) => void;
  }
) {
  if (!options?.requestLogger && !options?.onRequestCompleted) {
    return;
  }

  const startedAt = Date.now();
  let logged = false;

  const logRequest = () => {
    if (logged) {
      return;
    }

    const diagnostics = getCurrentRequestDiagnostics();
    const responseSessionId = normalizeHeaderValue(
      res.getHeader("mcp-session-id") as string | string[] | undefined
    );
    const entry = {
      ...details,
      method: req.method ?? "UNKNOWN",
      path: pathname,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      sessionId: details.sessionId ?? responseSessionId,
      cacheHits: diagnostics?.cacheHits ?? [],
      phaseTimings: diagnostics?.phaseTimings ?? [],
      upstreamRequestCount: diagnostics?.upstreamRequestCount ?? 0,
      upstreamDurationMs: diagnostics?.upstreamDurationMs ?? 0,
      upstreamStatusCodes: diagnostics?.upstreamStatusCodes ?? []
    };

    logged = true;
    options.onRequestCompleted?.(entry);
    options.requestLogger?.(entry);
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

function resolvePersistenceReadiness(authConfig?: HttpAuthConfig): ReadinessResponse {
  if (!authConfig) {
    return {
      statusCode: 200,
      body: {
        status: "ready",
        checks: {
          http: "ok",
          auth_persistence: "skipped"
        }
      }
    };
  }

  const targetPath = authConfig.authDataPath;

  try {
    let currentPath = targetPath;

    if (existsSync(currentPath)) {
      const targetStats = statSync(currentPath);

      if (!targetStats.isFile()) {
        throw new Error("auth data path exists but is not a file");
      }

      accessSync(currentPath, fsConstants.R_OK | fsConstants.W_OK);
    } else {
      currentPath = dirname(targetPath);

      while (!existsSync(currentPath)) {
        const parentPath = dirname(currentPath);

        if (parentPath === currentPath) {
          throw new Error("could not find a writable parent directory for auth persistence");
        }

        currentPath = parentPath;
      }

      const parentStats = statSync(currentPath);

      if (!parentStats.isDirectory()) {
        throw new Error("auth data parent path is not a directory");
      }

      accessSync(currentPath, fsConstants.R_OK | fsConstants.W_OK);
    }

    return {
      statusCode: 200,
      body: {
        status: "ready",
        checks: {
          http: "ok",
          auth_persistence: "ok"
        },
        details: {
          authDataPath: targetPath
        }
      }
    };
  } catch (error) {
    return {
      statusCode: 503,
      body: {
        status: "not_ready",
        checks: {
          http: "ok",
          auth_persistence: "error"
        },
        details: {
          authDataPath: targetPath,
          authPersistenceError: error instanceof Error ? error.message : "unknown error"
        }
      }
    };
  }
}

function resolveMcpRoute(
  pathname: string,
  enabledProductFamilies?: ProductToolFamily[]
): ResolvedMcpRoute | undefined {
  const routeMatch = pathname.match(/^\/mcp\/([a-z]+)\/?$/);
  const family = routeMatch?.[1];

  if (!family || !isProductToolFamily(family)) {
    return undefined;
  }

  if (enabledProductFamilies?.length && !enabledProductFamilies.includes(family)) {
    return undefined;
  }

  return {
    routeKey: family,
    path: `/mcp/${family}`,
    enabledProductFamilies: [family]
  };
}

export function createHttpApp(
  config = loadServerMetadataConfig(),
  authConfig?: HttpAuthConfig,
  options: HttpAppOptions = {},
  routeConfig: HttpAppRouteConfig = {}
): HttpApp {
  const enabledProductFamilies = routeConfig.enabledProductFamilies ?? config.enabledProductFamilies;
  const transportsByRoute = new Map<string, SessionTransportMap>();
  const serverFactoryByRoute = new Map<string, ReturnType<typeof createServerFactory>>();
  const sessionStore = createSessionCredentialStore({
    ttlMs: authConfig ? authConfig.authTokenTtlSeconds * 1000 : undefined
  });
  const authRepository = authConfig
    ? createFileAuthRepository(authConfig.authDataPath, {
        fileCheckIntervalMs: 1_000
      })
    : undefined;
  const sessionReuseDiagnostics = createSessionReuseDiagnosticsStore();
  const authResolver =
    authConfig && authRepository
      ? createAuthContextResolver({
          authCookieName: authConfig.authCookieName,
          repository: authRepository,
          sessionStore,
          authTokenTtlMs: authConfig.authTokenTtlSeconds * 1000
        })
      : undefined;

  function getRouteTransports(routeKey: string) {
    const transports = transportsByRoute.get(routeKey);

    if (transports) {
      return transports;
    }

    const created: SessionTransportMap = {};
    transportsByRoute.set(routeKey, created);
    return created;
  }

  function getRouteServerFactory(route: ResolvedMcpRoute) {
    const cached = serverFactoryByRoute.get(route.routeKey);

    if (cached) {
      return cached;
    }

    const routeServerFactory = createServerFactory({
      mode: "http",
      config: {
        ...config,
        serverName: `${config.serverName}-${route.routeKey}`
      },
      sessionStore,
      authRepository,
      authMasterKey: authConfig?.masterKey,
      enabledProductFamilies: route.enabledProductFamilies
    });

    serverFactoryByRoute.set(route.routeKey, routeServerFactory);
    return routeServerFactory;
  }

  const app = async (req: IncomingMessage, res: ServerResponse) => {
    return await runWithRequestDiagnostics(async () => {
      if (!req.url || !req.method) {
        writeJson(res, 400, { error: "Invalid request." });
        return;
      }

      const url = new URL(req.url, "http://127.0.0.1");
      const resolvedRoute = resolveMcpRoute(url.pathname, enabledProductFamilies);
      const sessionIdHeader = req.headers["mcp-session-id"];
      const sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;
      const requestLogDetails: HttpRequestLogEntry = {
        method: req.method,
        path: url.pathname,
        statusCode: 0,
        durationMs: 0,
        sessionId
      };
      installRequestLogging(req, res, url.pathname, requestLogDetails, {
        requestLogger: options.requestLogger,
        onRequestCompleted: (entry) => {
          sessionReuseDiagnostics.record({
            recordedAt: new Date().toISOString(),
            method: entry.method,
            path: entry.path,
            statusCode: entry.statusCode,
            sessionId: entry.sessionId,
            mcpMethod: entry.mcpMethod,
            toolName: entry.toolName
          });
        }
      });

      if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
        writeJson(res, 200, { status: "ok" });
        return;
      }

      if (req.method === "GET" && url.pathname === "/health/ready") {
        const readiness = resolvePersistenceReadiness(authConfig);
        writeJson(res, readiness.statusCode, readiness.body);
        return;
      }

      if (req.method === "GET" && url.pathname === "/diagnostics/session-reuse") {
        writeJson(res, 200, {
          status: "ok",
          diagnostics: sessionReuseDiagnostics.snapshot()
        });
        return;
      }

      if (!resolvedRoute) {
        writeJson(res, 404, { error: "Not found." });
        return;
      }

      const origin = normalizeOriginHeader(req.headers.origin);
      if (!isOriginAllowed(origin, config.httpAllowedOrigins ?? [])) {
        writeJson(res, 403, { error: "Origin is not allowed for MCP requests." });
        return;
      }

      if (req.method === "GET") {
        res.setHeader("allow", "POST, DELETE");
        writeJson(res, 405, {
          error: `GET ${resolvedRoute.path} SSE is not supported by this deployment. Use POST ${resolvedRoute.path} for MCP requests.`
        });
        return;
      }

      const authResolveStartedAt = Date.now();
      const authContext = authResolver
        ? await authResolver.resolve({
            sessionId,
            headers: {
              authorization: normalizeHeaderValue(req.headers.authorization),
              cookie: normalizeHeaderValue(req.headers.cookie)
            },
            queryToken: authConfig?.allowQueryAuthToken
              ? url.searchParams.get("auth_token") ?? undefined
              : undefined
          })
        : undefined;
      recordRequestPhase("auth_resolve", Date.now() - authResolveStartedAt);
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
          const bodyReadStartedAt = Date.now();
          const parsedBody = await readJsonBody(req);
          recordRequestPhase("request_body_read", Date.now() - bodyReadStartedAt);
          Object.assign(requestLogDetails, readMcpRequestDetails(parsedBody));
          const routeTransports = getRouteTransports(resolvedRoute.routeKey);
          let transport = sessionId ? routeTransports[sessionId] : undefined;

          if (transport && authContext?.authId) {
            sessionStore.bind(sessionId!, authContext.authId);
          }

          if (sessionId && !transport) {
            writeJson(res, 404, { error: "Unknown MCP session ID." });
            return;
          }

          if (!transport) {
            if (!parsedBody || !isInitializeRequest(parsedBody)) {
              writeJson(res, 400, { error: "Missing MCP session ID." });
              return;
            }

            const transportCreateStartedAt = Date.now();
            transport = new StreamableHTTPServerTransport({
              enableJsonResponse: true,
              sessionIdGenerator: () => randomUUID(),
              onsessioninitialized: (newSessionId) => {
                requestLogDetails.sessionId = newSessionId;
                routeTransports[newSessionId] = transport!;
                if (authContext?.authId) {
                  sessionStore.bind(newSessionId, authContext.authId);
                }
              },
              onsessionclosed: (closedSessionId) => {
                delete routeTransports[closedSessionId];
                sessionStore.clear(closedSessionId);
              }
            });
            recordRequestPhase("transport_create", Date.now() - transportCreateStartedAt);

            const server = getRouteServerFactory(resolvedRoute)();
            const transportConnectStartedAt = Date.now();
            await server.connect(transport);
            recordRequestPhase("transport_connect", Date.now() - transportConnectStartedAt);
          }

          await transport.handleRequest(req, res, parsedBody);
          return;
        }

        if (req.method === "DELETE") {
          if (!sessionId) {
            writeJson(res, 400, { error: "Missing MCP session ID." });
            return;
          }

          const routeTransports = getRouteTransports(resolvedRoute.routeKey);

          if (!routeTransports[sessionId]) {
            writeJson(res, 404, { error: "Unknown MCP session ID." });
            return;
          }

          await routeTransports[sessionId].handleRequest(req, res);
          return;
        }

        writeJson(res, 405, { error: "Method not allowed." });
      } catch (error) {
        writeJson(res, 500, {
          error: error instanceof Error ? error.message : "Internal server error"
        });
      }
    });
  };

  return Object.assign(app, {
    prewarm() {
      const warmedComponents: string[] = [];

      if (authRepository?.prewarm) {
        authRepository.prewarm();
        warmedComponents.push("auth_repository");
      }

      return {
        warmedComponents
      };
    }
  });
}
