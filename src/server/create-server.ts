import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AppConfig, ServerMetadataConfig } from "../core/config/env.js";
import { configureHttpAuthRuntimeConfig } from "./auth-session-runtime.js";
import { buildStdioClients } from "./build-stdio-clients.js";
import { type AuthRepository } from "./auth-session-tools.js";
import {
  createClearSessionHandler,
  createClearSessionHandlerWithPersistence,
  createConfigureSessionHandler,
  createConfigureSessionHandlerWithPersistence,
  registerAuthTools
} from "./register-auth-tools.js";
import { registerProductTool } from "./register-product-tools.js";
import { createFixedWindowRateLimiter } from "./rate-limiter.js";
import { registerScaffoldTool } from "./register-scaffold-tool.js";
import { collectToolNames, createServerInfo } from "./register-tools.js";
import type { SessionCredentialStore } from "./session-store.js";

export * from "./session-aware-product-handlers.js";
export {
  createClearSessionHandler,
  createClearSessionHandlerWithPersistence,
  createConfigureSessionHandler,
  createConfigureSessionHandlerWithPersistence
};

const PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS = 5;
const PRODUCT_WRITE_RATE_LIMIT_WINDOW_MS = 60_000;

type CreateServerOptions =
  | {
      mode: "stdio";
      config: AppConfig;
    }
  | {
      mode: "http";
      config: ServerMetadataConfig;
      sessionStore: SessionCredentialStore;
      authRepository?: AuthRepository;
      authMasterKey?: string;
    };

export function createServer(options: CreateServerOptions) {
  configureHttpAuthRuntimeConfig(
    options.mode === "http"
      ? {
          repository: options.authRepository,
          masterKey: options.authMasterKey
        }
      : {}
  );

  const server = new McpServer(createServerInfo(options.config), {
    capabilities: {
      tools: {}
    }
  });

  const stdioClients = buildStdioClients(options);
  const productWriteRateLimiter =
    options.mode === "http"
      ? createFixedWindowRateLimiter({
          maxRequests: PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS,
          windowMs: PRODUCT_WRITE_RATE_LIMIT_WINDOW_MS
        })
      : undefined;

  registerAuthTools({
    server,
    mode: options.mode,
    sessionStore: options.mode === "http" ? options.sessionStore : undefined
  });

  for (const toolName of collectToolNames()) {
    if (registerProductTool({
      toolName,
      server,
      mode: options.mode,
      sessionStore: options.mode === "http" ? options.sessionStore : undefined,
      stdioClients,
      rateLimiter: productWriteRateLimiter
    })) {
      continue;
    }

    registerScaffoldTool({
      toolName,
      server
    });
  }

  return server;
}
