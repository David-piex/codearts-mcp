import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toJsonSchemaCompat } from "@modelcontextprotocol/sdk/server/zod-json-schema-compat.js";
import { normalizeObjectSchema, objectFromShape } from "@modelcontextprotocol/sdk/server/zod-compat.js";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
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
import { recordRequestPhase } from "./request-context.js";
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

type RegisterableServer = Pick<McpServer, "registerTool">;
type RegisteredToolPlan = {
  name: string;
  config: {
    title?: string;
    description?: string;
    inputSchema?: unknown;
    outputSchema?: unknown;
    annotations?: unknown;
    _meta?: unknown;
  };
  handler: (...args: unknown[]) => unknown;
};

type InternalRegisteredTool = {
  title?: string;
  description?: string;
  inputSchema?: unknown;
  outputSchema?: unknown;
  annotations?: unknown;
  execution?: unknown;
  _meta?: unknown;
  handler: (...args: unknown[]) => unknown;
  enabled: boolean;
  disable: () => void;
  enable: () => void;
  remove: () => void;
  update: (updates: {
    name?: string | null;
    title?: string;
    description?: string;
    paramsSchema?: Record<string, unknown>;
    outputSchema?: Record<string, unknown>;
    callback?: (...args: unknown[]) => unknown;
    annotations?: unknown;
    _meta?: unknown;
    enabled?: boolean;
  }) => void;
};

type InternalToolRegistryServer = McpServer & {
  _registeredTools?: Record<string, InternalRegisteredTool>;
  _toolHandlersInitialized?: boolean;
  setToolRequestHandlers?: () => void;
  sendToolListChanged?: () => void;
};

const EMPTY_OBJECT_JSON_SCHEMA = {
  type: "object",
  properties: {}
};

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

type CreateServerFactoryDependencies = {
  McpServer?: typeof McpServer;
  configureHttpAuthRuntimeConfig?: typeof configureHttpAuthRuntimeConfig;
  buildStdioClients?: typeof buildStdioClients;
  createFixedWindowRateLimiter?: typeof createFixedWindowRateLimiter;
  registerAuthTools?: typeof registerAuthTools;
  registerProductTool?: typeof registerProductTool;
  registerScaffoldTool?: typeof registerScaffoldTool;
  collectToolNames?: typeof collectToolNames;
};

function buildHttpRuntimeConfig(options: CreateServerOptions) {
  return options.mode === "http"
    ? {
        repository: options.authRepository,
        masterKey: options.authMasterKey,
        readCacheTtls: options.config.readCacheTtls
      }
    : {};
}

function isInternalToolRegistryServer(candidate: unknown): candidate is InternalToolRegistryServer {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  const server = candidate as {
    _registeredTools?: unknown;
    setToolRequestHandlers?: unknown;
  };

  return (
    server._registeredTools !== undefined &&
    typeof server._registeredTools === "object" &&
    typeof server.setToolRequestHandlers === "function"
  );
}

function cloneRegisteredTool(
  targetServer: InternalToolRegistryServer,
  name: string,
  templateTool: InternalRegisteredTool,
  options?: {
    invalidateToolsListCache?: () => void;
  }
) {
  const clonedTool: InternalRegisteredTool = {
    title: templateTool.title,
    description: templateTool.description,
    inputSchema: templateTool.inputSchema,
    outputSchema: templateTool.outputSchema,
    annotations: templateTool.annotations,
    execution: templateTool.execution,
    _meta: templateTool._meta,
    handler: templateTool.handler,
    enabled: templateTool.enabled,
    disable: () => {
      clonedTool.update({ enabled: false });
    },
    enable: () => {
      clonedTool.update({ enabled: true });
    },
    remove: () => {
      clonedTool.update({ name: null });
    },
    update: (updates) => {
      const registeredTools = targetServer._registeredTools ?? {};

      if (typeof updates.name !== "undefined" && updates.name !== name) {
        delete registeredTools[name];

        if (updates.name) {
          registeredTools[updates.name] = clonedTool;
        }
      }

      if (typeof updates.title !== "undefined") {
        clonedTool.title = updates.title;
      }
      if (typeof updates.description !== "undefined") {
        clonedTool.description = updates.description;
      }
      if (typeof updates.paramsSchema !== "undefined") {
        clonedTool.inputSchema = objectFromShape(updates.paramsSchema);
      }
      if (typeof updates.outputSchema !== "undefined") {
        clonedTool.outputSchema = objectFromShape(updates.outputSchema);
      }
      if (typeof updates.callback !== "undefined") {
        clonedTool.handler = updates.callback;
      }
      if (typeof updates.annotations !== "undefined") {
        clonedTool.annotations = updates.annotations;
      }
      if (typeof updates._meta !== "undefined") {
        clonedTool._meta = updates._meta;
      }
      if (typeof updates.enabled !== "undefined") {
        clonedTool.enabled = updates.enabled;
      }

      options?.invalidateToolsListCache?.();
      targetServer.sendToolListChanged?.();
    }
  };

  return clonedTool;
}

function buildCachedToolsListResult(registeredTools: Record<string, InternalRegisteredTool>) {
  return {
    tools: Object.entries(registeredTools)
      .filter(([, tool]) => tool.enabled)
      .map(([name, tool]) => {
        const toolDefinition: Record<string, unknown> = {
          name,
          title: tool.title,
          description: tool.description,
          inputSchema: (() => {
            const objectSchema = normalizeObjectSchema(tool.inputSchema);

            return objectSchema
              ? toJsonSchemaCompat(objectSchema, {
                  strictUnions: true,
                  pipeStrategy: "input"
                })
              : EMPTY_OBJECT_JSON_SCHEMA;
          })(),
          annotations: tool.annotations,
          execution: tool.execution,
          _meta: tool._meta
        };

        if (tool.outputSchema) {
          const objectSchema = normalizeObjectSchema(tool.outputSchema);

          if (objectSchema) {
            toolDefinition.outputSchema = toJsonSchemaCompat(objectSchema, {
              strictUnions: true,
              pipeStrategy: "output"
            });
          }
        }

        return toolDefinition;
      })
  };
}

function installCachedListToolsHandler(server: McpServer, options?: { invalidateOnUpdate?: boolean }) {
  if (!isInternalToolRegistryServer(server)) {
    return;
  }

  if (
    !("server" in server) ||
    !server.server ||
    typeof server.server.setRequestHandler !== "function"
  ) {
    return;
  }

  let cachedResult: ReturnType<typeof buildCachedToolsListResult> | undefined;
  const invalidateToolsListCache = () => {
    cachedResult = undefined;
  };

  if (options?.invalidateOnUpdate) {
    for (const [name, tool] of Object.entries(server._registeredTools ?? {})) {
      server._registeredTools![name] = cloneRegisteredTool(server, name, tool, {
        invalidateToolsListCache
      });
    }
  }

  server.server.setRequestHandler(ListToolsRequestSchema, () => {
    if (!cachedResult) {
      cachedResult = buildCachedToolsListResult(server._registeredTools ?? {});
    }

    return cachedResult;
  });
}

function hydrateRegisteredToolsFromTemplate(
  templateServer: McpServer,
  server: McpServer
) {
  if (!isInternalToolRegistryServer(templateServer) || !isInternalToolRegistryServer(server)) {
    return false;
  }

  const hydratedTools = Object.fromEntries(
    Object.entries(templateServer._registeredTools ?? {}).map(([name, tool]) => [
      name,
      cloneRegisteredTool(server, name, tool)
    ])
  );

  server._registeredTools = hydratedTools;
  server._toolHandlersInitialized = false;
  server.setToolRequestHandlers?.();
  installCachedListToolsHandler(server, { invalidateOnUpdate: true });

  return true;
}

function captureRegisteredTools(
  options: CreateServerOptions,
  dependencies: Required<CreateServerFactoryDependencies>,
  stdioClients: ReturnType<typeof buildStdioClients>,
  productWriteRateLimiter: ReturnType<typeof createFixedWindowRateLimiter> | undefined
) {
  const registeredTools: RegisteredToolPlan[] = [];
  const capturingServer: RegisterableServer = {
    registerTool(name, config, handler) {
      registeredTools.push({
        name,
        config,
        handler
      });
    }
  };

  dependencies.registerAuthTools({
    server: capturingServer,
    mode: options.mode,
    sessionStore: options.mode === "http" ? options.sessionStore : undefined
  });

  for (const toolName of dependencies.collectToolNames()) {
    if (
      dependencies.registerProductTool({
        toolName,
        server: capturingServer,
        mode: options.mode,
        sessionStore: options.mode === "http" ? options.sessionStore : undefined,
        stdioClients,
        rateLimiter: productWriteRateLimiter
      })
    ) {
      continue;
    }

    dependencies.registerScaffoldTool({
      toolName,
      server: capturingServer
    });
  }

  return registeredTools;
}

export function createServerFactory(
  options: CreateServerOptions,
  dependencies: CreateServerFactoryDependencies = {}
) {
  const resolvedDependencies: Required<CreateServerFactoryDependencies> = {
    McpServer: dependencies.McpServer ?? McpServer,
    configureHttpAuthRuntimeConfig:
      dependencies.configureHttpAuthRuntimeConfig ?? configureHttpAuthRuntimeConfig,
    buildStdioClients: dependencies.buildStdioClients ?? buildStdioClients,
    createFixedWindowRateLimiter:
      dependencies.createFixedWindowRateLimiter ?? createFixedWindowRateLimiter,
    registerAuthTools: dependencies.registerAuthTools ?? registerAuthTools,
    registerProductTool: dependencies.registerProductTool ?? registerProductTool,
    registerScaffoldTool: dependencies.registerScaffoldTool ?? registerScaffoldTool,
    collectToolNames: dependencies.collectToolNames ?? collectToolNames
  };

  resolvedDependencies.configureHttpAuthRuntimeConfig(buildHttpRuntimeConfig(options));

  const stdioClients = resolvedDependencies.buildStdioClients(options);
  const serverInfo = createServerInfo(options.config);
  const productWriteRateLimiter =
    options.mode === "http"
      ? resolvedDependencies.createFixedWindowRateLimiter({
          maxRequests: PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS,
          windowMs: PRODUCT_WRITE_RATE_LIMIT_WINDOW_MS
        })
      : undefined;
  const registeredToolPlans = captureRegisteredTools(
    options,
    resolvedDependencies,
    stdioClients,
    productWriteRateLimiter
  );
  const templateServer = new resolvedDependencies.McpServer(serverInfo, {
    capabilities: {
      tools: {}
    }
  });

  for (const toolPlan of registeredToolPlans) {
    templateServer.registerTool(toolPlan.name, toolPlan.config, toolPlan.handler);
  }

  return function createPreparedServer() {
    resolvedDependencies.configureHttpAuthRuntimeConfig(buildHttpRuntimeConfig(options));

    const serverCreateStartedAt = Date.now();
    const server = new resolvedDependencies.McpServer(serverInfo, {
      capabilities: {
        tools: {}
      }
    });
    recordRequestPhase("mcp_server_create", Date.now() - serverCreateStartedAt);

    const toolRegistrationStartedAt = Date.now();
    if (!hydrateRegisteredToolsFromTemplate(templateServer, server)) {
      for (const toolPlan of registeredToolPlans) {
        server.registerTool(toolPlan.name, toolPlan.config, toolPlan.handler);
      }

      installCachedListToolsHandler(server);
    }
    recordRequestPhase("tool_registration", Date.now() - toolRegistrationStartedAt);

    return server;
  };
}

export function createServer(options: CreateServerOptions) {
  return createServerFactory(options)();
}
