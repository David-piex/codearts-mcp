import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  configureSessionInputSchema,
  createClearSessionHandlerWithPersistence,
  createConfigureSessionHandlerWithPersistence
} from "./auth-session-tools.js";
import { createFixedWindowRateLimiter, type RateLimiter } from "./rate-limiter.js";
import { readHttpAuthRuntimeConfig } from "./auth-session-runtime.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
const AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS = 3000;
const AUTH_WRITE_RATE_LIMIT_WINDOW_MS = 60_000;

export function createConfigureSessionHandler(
  store: SessionCredentialStore,
  rateLimiter = createFixedWindowRateLimiter({
    maxRequests: AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS,
    windowMs: AUTH_WRITE_RATE_LIMIT_WINDOW_MS
  })
) {
  const httpAuthRuntimeConfig = readHttpAuthRuntimeConfig();
  return createConfigureSessionHandlerWithPersistence({
    sessionStore: store,
    repository: httpAuthRuntimeConfig.repository,
    masterKey: httpAuthRuntimeConfig.masterKey,
    rateLimiter
  });
}

export function createClearSessionHandler(
  store: SessionCredentialStore,
  rateLimiter = createFixedWindowRateLimiter({
    maxRequests: AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS,
    windowMs: AUTH_WRITE_RATE_LIMIT_WINDOW_MS
  })
) {
  const httpAuthRuntimeConfig = readHttpAuthRuntimeConfig();
  return createClearSessionHandlerWithPersistence({
    sessionStore: store,
    repository: httpAuthRuntimeConfig.repository,
    rateLimiter
  });
}

export { createConfigureSessionHandlerWithPersistence, createClearSessionHandlerWithPersistence };

export function registerAuthTools(options: {
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
}) {
  if (options.mode !== "http") {
    return;
  }

  const rateLimiter: RateLimiter = createFixedWindowRateLimiter({
    maxRequests: AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS,
    windowMs: AUTH_WRITE_RATE_LIMIT_WINDOW_MS
  });

  options.server.registerTool(
    "auth_configure_session",
    {
      title: "auth_configure_session",
      description:
        "Configure Huawei Cloud credentials for the current MCP session. Standard CodeArts regions only need access_key, secret_key, and region; *_base_url fields are optional overrides.",
      inputSchema: configureSessionInputSchema
    },
    createConfigureSessionHandler(options.sessionStore!, rateLimiter)
  );

  options.server.registerTool(
    "auth_clear_session",
    {
      title: "auth_clear_session",
      description: "Clear Huawei Cloud credentials for the current MCP session",
      inputSchema: {}
    },
    createClearSessionHandler(options.sessionStore!, rateLimiter)
  );
}
