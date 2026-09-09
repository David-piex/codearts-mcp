import { randomUUID } from "node:crypto";
import { accessSync, constants as fsConstants, existsSync, statSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { dirname } from "node:path";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import {
  DEFAULT_HTTP_MAX_REQUEST_BODY_BYTES,
  DEFAULT_HTTP_MAX_SESSIONS,
  DEFAULT_HTTP_SESSION_IDLE_TIMEOUT_MS,
  loadServerMetadataConfig,
  type HttpAuthConfig,
  type ServerMetadataConfig
} from "../core/config/env.js";
import { resolveRegionDefaults } from "../core/config/region-defaults.js";
import { serializeAuthCookie } from "./auth-cookie.js";
import { hashAuthToken } from "./auth-token.js";
import { encryptSecretValue } from "./auth-crypto.js";
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
  sessionIdleTimeoutMs?: number;
};

type HttpAppRouteConfig = {
  enabledProductFamilies?: ProductToolFamily[];
};

type ResolvedMcpRoute = {
  routeKey: string;
  path: string;
  enabledProductFamilies?: ProductToolFamily[];
  legacyFamily?: ProductToolFamily;
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

class RequestBodyTooLargeError extends Error {
  readonly statusCode = 413;

  constructor(readonly maxBytes: number) {
    super(`Request body exceeds the ${maxBytes} byte limit.`);
    this.name = "RequestBodyTooLargeError";
  }
}

async function readJsonBody(req: IncomingMessage, maxBytes: number): Promise<unknown> {
  const contentLength = req.headers["content-length"];
  const declaredLength = typeof contentLength === "string" ? Number(contentLength) : undefined;

  if (declaredLength !== undefined && Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    req.resume();
    throw new RequestBodyTooLargeError(maxBytes);
  }

  const chunks: Buffer[] = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.length;

    if (totalBytes > maxBytes) {
      req.resume();
      throw new RequestBodyTooLargeError(maxBytes);
    }

    chunks.push(buffer);
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function readClientCredentialHeaders(req: IncomingMessage) {
  const accessKey = normalizeHeaderValue(req.headers["x-codearts-ak"])?.trim();
  const secretKey = normalizeHeaderValue(req.headers["x-codearts-sk"])?.trim();
  const region = normalizeHeaderValue(req.headers["x-codearts-region"])?.trim();

  if (!accessKey && !secretKey && !region) {
    return undefined;
  }

  if (!accessKey || !secretKey || !region) {
    throw new Error(
      "X-CodeArts-AK, X-CodeArts-SK, and X-CodeArts-Region must be provided together."
    );
  }

  return { accessKey, secretKey, region };
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
  if (/^\/mcp\/?$/.test(pathname)) {
    return {
      routeKey: "all",
      path: "/mcp",
      enabledProductFamilies
    };
  }

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
    enabledProductFamilies: [family],
    legacyFamily: family
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
  const lastActivityByRoute = new Map<string, Map<string, number>>();
  const activeRequestsByRoute = new Map<string, Map<string, number>>();
  const sessionIdleTimeoutMs = options.sessionIdleTimeoutMs ?? config.httpSessionIdleTimeoutMs ?? DEFAULT_HTTP_SESSION_IDLE_TIMEOUT_MS;
  const maxSessions = config.httpMaxSessions ?? DEFAULT_HTTP_MAX_SESSIONS;
  const maxRequestBodyBytes = config.httpMaxRequestBodyBytes ?? DEFAULT_HTTP_MAX_REQUEST_BODY_BYTES;
  const pendingSessionTransports = new Set<StreamableHTTPServerTransport>();
  const serverFactoryByRoute = new Map<string, ReturnType<typeof createServerFactory>>();
  const sessionStore = createSessionCredentialStore({
    ttlMs: authConfig ? authConfig.authTokenTtlSeconds * 1000 : undefined
  });
  const authRepository = authConfig
    ? createFileAuthRepository(authConfig.authDataPath, {
        fileCheckIntervalMs: 1_000
      })
    : undefined;

  function provisionClientCredentialAuth(
    credentials: ReturnType<typeof readClientCredentialHeaders>,
    requestSessionId?: string
  ) {
    if (!credentials) {
      return undefined;
    }

    if (!authConfig || !authRepository) {
      throw new Error("Client credential headers require HTTP auth persistence.");
    }

    if (!authConfig.allowClientCredentialHeaders) {
      throw new Error(
        "Client credential headers are disabled on this server."
      );
    }

    const credentialIdentity =
      `${credentials.accessKey}\u0000${credentials.secretKey}\u0000${credentials.region}`;
    const authId = `header-${hashAuthToken(credentialIdentity).slice(0, 32)}`;
    const boundAuthId = requestSessionId ? sessionStore.getAuthId(requestSessionId) : undefined;

    if (boundAuthId && boundAuthId !== authId) {
      throw new Error("Client credential headers do not match the existing MCP session.");
    }

    if (boundAuthId === authId && authRepository.findActiveByAuthId(authId)) {
      return {
        authId,
        rawToken: undefined
      };
    }

    const endpoints = resolveRegionDefaults(credentials.region);
    const now = new Date().toISOString();
    authRepository.upsert({
      auth_id: authId,
      token_hash: hashAuthToken(
        `header-token:${credentials.accessKey}\u0000${credentials.secretKey}\u0000${credentials.region}`
      ),
      encrypted_access_key: encryptSecretValue(credentials.accessKey, authConfig.masterKey),
      encrypted_secret_key: encryptSecretValue(credentials.secretKey, authConfig.masterKey),
      region: credentials.region,
      ...endpoints,
      created_at: now,
      updated_at: now,
      last_used_at: now,
      expires_at: new Date(
        Date.now() + authConfig.authTokenTtlSeconds * 1000
      ).toISOString()
    });

    return {
      authId,
      rawToken: undefined
    };
  }

  if (authConfig?.staticAuthToken && authConfig.staticCredentials && authRepository) {
    const now = new Date().toISOString();
    const staticAuthId = "static-default";
    authRepository.upsert({
      auth_id: staticAuthId,
      token_hash: hashAuthToken(authConfig.staticAuthToken),
      encrypted_access_key: encryptSecretValue(
        authConfig.staticCredentials.accessKey,
        authConfig.masterKey
      ),
      encrypted_secret_key: encryptSecretValue(
        authConfig.staticCredentials.secretKey,
        authConfig.masterKey
      ),
      region: authConfig.staticCredentials.region,
      req_base_url: authConfig.staticCredentials.reqBaseUrl,
      repo_base_url: authConfig.staticCredentials.repoBaseUrl,
      pipeline_base_url: authConfig.staticCredentials.pipelineBaseUrl,
      check_base_url: authConfig.staticCredentials.checkBaseUrl,
      testplan_base_url: authConfig.staticCredentials.testPlanBaseUrl,
      deploy_base_url: authConfig.staticCredentials.deployBaseUrl,
      build_base_url: authConfig.staticCredentials.buildBaseUrl,
      artifact_base_url: authConfig.staticCredentials.artifactBaseUrl,
      created_at: now,
      updated_at: now,
      last_used_at: now,
      expires_at: new Date(
        Date.now() + authConfig.authTokenTtlSeconds * 1000
      ).toISOString()
    });
  }
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

  function getRouteSessionActivity(routeKey: string) {
    const activity = lastActivityByRoute.get(routeKey);

    if (activity) {
      return activity;
    }

    const created = new Map<string, number>();
    lastActivityByRoute.set(routeKey, created);
    return created;
  }

  function getRouteActiveRequests(routeKey: string) {
    const active = activeRequestsByRoute.get(routeKey);

    if (active) {
      return active;
    }

    const created = new Map<string, number>();
    activeRequestsByRoute.set(routeKey, created);
    return created;
  }

  function countRetainedSessions() {
    let count = pendingSessionTransports.size;

    for (const transports of transportsByRoute.values()) {
      count += Object.keys(transports).length;
    }

    return count;
  }

  if (sessionIdleTimeoutMs > 0) {
    const sessionCleanupTimer = setInterval(() => {
      const now = Date.now();

      for (const [routeKey, transports] of transportsByRoute) {
        const activity = lastActivityByRoute.get(routeKey);
        const activeRequests = activeRequestsByRoute.get(routeKey);

        if (!activity) {
          continue;
        }

        for (const [sessionId, transport] of Object.entries(transports)) {
          const lastActivityAt = activity.get(sessionId) ?? now;
          const activeRequestCount = activeRequests?.get(sessionId) ?? 0;

          if (
            activeRequestCount === 0 &&
            now - lastActivityAt >= sessionIdleTimeoutMs
          ) {
            delete transports[sessionId];
            activity.delete(sessionId);
            activeRequests?.delete(sessionId);
            void transport.close().catch(() => undefined);
          }
        }

        if (Object.keys(transports).length === 0) {
          transportsByRoute.delete(routeKey);
          lastActivityByRoute.delete(routeKey);
          activeRequestsByRoute.delete(routeKey);
        }
      }
    }, Math.min(sessionIdleTimeoutMs, 60_000));
    sessionCleanupTimer.unref?.();
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
        serverName: route.legacyFamily ? `${config.serverName}-${route.routeKey}` : config.serverName
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
      let sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;
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
          diagnostics: {
            ...sessionReuseDiagnostics.snapshot(),
            retainedSessionCount: countRetainedSessions(),
            pendingSessionCount: pendingSessionTransports.size,
            maxSessions,
            sessionIdleTimeoutMs
          }
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

      let clientCredentialAuthContext;
      try {
        clientCredentialAuthContext = provisionClientCredentialAuth(
          readClientCredentialHeaders(req),
          sessionId
        );
      } catch (error) {
        writeJson(res, 401, {
          error: error instanceof Error ? error.message : "Invalid client credentials."
        });
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
      const authContext = clientCredentialAuthContext ?? (authResolver
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
        : undefined);
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
          const parsedBody = await readJsonBody(req, maxRequestBodyBytes);
          recordRequestPhase("request_body_read", Date.now() - bodyReadStartedAt);
          Object.assign(requestLogDetails, readMcpRequestDetails(parsedBody));
          const routeTransports = getRouteTransports(resolvedRoute.routeKey);
          let transport = sessionId ? routeTransports[sessionId] : undefined;

          if (transport && authContext?.authId) {
            sessionStore.bind(sessionId!, authContext.authId);
          }

          // Some clients keep sending the previous MCP session ID on their
          // reconnect initialize request. Treat that request as a fresh
          // session so auth headers/cookies can be reused without a manual
          // auth_configure_session call.
          const staleSessionInitialization =
            sessionId !== undefined && !transport && isInitializeRequest(parsedBody);

          if (sessionId && !transport && !staleSessionInitialization) {
            writeJson(res, 404, { error: "Unknown MCP session ID." });
            return;
          }

          if (staleSessionInitialization) {
            sessionId = undefined;
          }

          if (!transport) {
            if (!parsedBody || !isInitializeRequest(parsedBody)) {
              writeJson(res, 400, { error: "Missing MCP session ID." });
              return;
            }

            if (countRetainedSessions() >= maxSessions) {
              res.setHeader("retry-after", "60");
              writeJson(res, 429, {
                error: "The maximum number of MCP sessions is currently active. Please retry later.",
                max_sessions: maxSessions
              });
              return;
            }

            const transportCreateStartedAt = Date.now();
            transport = new StreamableHTTPServerTransport({
              enableJsonResponse: true,
              sessionIdGenerator: () => randomUUID(),
              onsessioninitialized: (newSessionId) => {
                pendingSessionTransports.delete(transport!);
                requestLogDetails.sessionId = newSessionId;
                routeTransports[newSessionId] = transport!;
                getRouteSessionActivity(resolvedRoute.routeKey).set(newSessionId, Date.now());
                getRouteActiveRequests(resolvedRoute.routeKey).set(newSessionId, 0);
                if (authContext?.authId) {
                  sessionStore.bind(newSessionId, authContext.authId);
                }
              },
              onsessionclosed: (closedSessionId) => {
                pendingSessionTransports.delete(transport!);
                delete routeTransports[closedSessionId];
                lastActivityByRoute.get(resolvedRoute.routeKey)?.delete(closedSessionId);
                activeRequestsByRoute.get(resolvedRoute.routeKey)?.delete(closedSessionId);
                sessionStore.clear(closedSessionId);
              }
            });
            pendingSessionTransports.add(transport);
            recordRequestPhase("transport_create", Date.now() - transportCreateStartedAt);

            const server = getRouteServerFactory(resolvedRoute)();
            const transportConnectStartedAt = Date.now();
            try {
              await server.connect(transport);
            } catch (error) {
              pendingSessionTransports.delete(transport);
              await transport.close().catch(() => undefined);
              throw error;
            }
            recordRequestPhase("transport_connect", Date.now() - transportConnectStartedAt);
          }

          if (sessionId) {
            const activity = getRouteSessionActivity(resolvedRoute.routeKey);
            const activeRequests = getRouteActiveRequests(resolvedRoute.routeKey);
            activity.set(sessionId, Date.now());
            activeRequests.set(sessionId, (activeRequests.get(sessionId) ?? 0) + 1);

            try {
              await transport.handleRequest(req, res, parsedBody);
            } finally {
              activeRequests.set(sessionId, Math.max(0, (activeRequests.get(sessionId) ?? 1) - 1));
              activity.set(sessionId, Date.now());
            }
          } else {
            try {
              await transport.handleRequest(req, res, parsedBody);
            } finally {
              if (pendingSessionTransports.delete(transport)) {
                await transport.close().catch(() => undefined);
              }
            }
          }
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

          const activity = getRouteSessionActivity(resolvedRoute.routeKey);
          const activeRequests = getRouteActiveRequests(resolvedRoute.routeKey);
          activity.set(sessionId, Date.now());
          activeRequests.set(sessionId, (activeRequests.get(sessionId) ?? 0) + 1);

          try {
            await routeTransports[sessionId].handleRequest(req, res);
          } finally {
            activeRequests.set(sessionId, Math.max(0, (activeRequests.get(sessionId) ?? 1) - 1));
            activity.set(sessionId, Date.now());
          }
          return;
        }

        writeJson(res, 405, { error: "Method not allowed." });
      } catch (error) {
        if (error instanceof RequestBodyTooLargeError) {
          writeJson(res, error.statusCode, {
            error: error.message,
            max_request_body_bytes: error.maxBytes
          });
          return;
        }

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
