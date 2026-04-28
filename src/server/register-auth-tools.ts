import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  configureSessionInputSchema,
  createClearSessionHandlerWithPersistence,
  createConfigureSessionHandlerWithPersistence
} from "./auth-session-tools.js";
import {
  DEFAULT_HTTP_WRITE_RATE_LIMIT,
  type FixedWindowRateLimitConfig
} from "../core/config/env.js";
import { createFixedWindowRateLimiter, type RateLimiter } from "./rate-limiter.js";
import { readHttpAuthRuntimeConfig } from "./auth-session-runtime.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;

function createAuthWriteRateLimiter(rateLimit = DEFAULT_HTTP_WRITE_RATE_LIMIT) {
  return createFixedWindowRateLimiter({
    maxRequests: rateLimit.maxRequests,
    windowMs: rateLimit.windowMs
  });
}

export function createConfigureSessionHandler(
  store: SessionCredentialStore,
  rateLimiter = createAuthWriteRateLimiter()
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
  rateLimiter = createAuthWriteRateLimiter()
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
  rateLimit?: FixedWindowRateLimitConfig;
}) {
  if (options.mode !== "http") {
    return;
  }

  const rateLimiter: RateLimiter = createAuthWriteRateLimiter(options.rateLimit);

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
