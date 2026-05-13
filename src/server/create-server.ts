import { McpServer, type RegisteredTool as McpRegisteredTool } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toJsonSchemaCompat } from "@modelcontextprotocol/sdk/server/zod-json-schema-compat.js";
import {
  type AnyObjectSchema,
  type AnySchema,
  type ZodRawShapeCompat,
  normalizeObjectSchema,
  objectFromShape
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import {
  DEFAULT_HTTP_WRITE_RATE_LIMIT,
  type AppConfig,
  type ServerMetadataConfig
} from "../core/config/env.js";
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
import { createServerInfo } from "./register-tools.js";
import { recordRequestPhase } from "./request-context.js";
import type { SessionCredentialStore } from "./session-store.js";
import { collectProductToolManifest } from "./tool-manifest.js";

export * from "./session-aware-product-handlers.js";
export {
  createClearSessionHandler,
  createClearSessionHandlerWithPersistence,
  createConfigureSessionHandler,
  createConfigureSessionHandlerWithPersistence
};

type RegisterToolMethod = McpServer["registerTool"];
type ToolSchema = AnySchema | ZodRawShapeCompat;
type ToolHandler = Parameters<RegisterToolMethod>[2];
type ToolConfig = {
  title?: string;
  description?: string;
  inputSchema?: ToolSchema;
  outputSchema?: ToolSchema;
  annotations?: McpRegisteredTool["annotations"];
  _meta?: Record<string, unknown>;
};

type RegisterableServer = {
  registerTool: RegisterToolMethod;
};
type RegisteredToolPlan = {
  name: string;
  config: ToolConfig;
  handler: ToolHandler;
};

type InternalRegisteredTool = {
  title?: string;
  description?: string;
  inputSchema?: ToolSchema;
  outputSchema?: ToolSchema;
  annotations?: McpRegisteredTool["annotations"];
  execution?: McpRegisteredTool["execution"];
  _meta?: Record<string, unknown>;
  handler: ToolHandler;
  enabled: boolean;
  disable: () => void;
  enable: () => void;
  remove: () => void;
  update: (updates: {
    name?: string | null;
    title?: string;
    description?: string;
    paramsSchema?: ZodRawShapeCompat;
    outputSchema?: ZodRawShapeCompat;
    callback?: ToolHandler;
    annotations?: McpRegisteredTool["annotations"];
    _meta?: Record<string, unknown>;
    enabled?: boolean;
  }) => void;
};

export type RegisteredToolInvocationHandler = (
  input: unknown,
  extra: Record<string, unknown>
) => unknown | Promise<unknown>;

export type RegisteredToolInfo = {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: ToolSchema;
  outputSchema?: ToolSchema;
  annotations?: McpRegisteredTool["annotations"];
  _meta?: Record<string, unknown>;
  handler: RegisteredToolInvocationHandler;
  enabled: boolean;
};

type InternalToolRequestHandlerHost = {
  setRequestHandler?: (
    schema: typeof ListToolsRequestSchema,
    handler: () => ReturnType<typeof buildCachedToolsListResult>
  ) => void;
};

type InternalToolRegistryServer = {
  _registeredTools?: Record<string, InternalRegisteredTool>;
  _toolHandlersInitialized?: boolean;
  setToolRequestHandlers?: () => void;
  server?: InternalToolRequestHandlerHost;
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
  collectProductToolManifest?: typeof collectProductToolManifest;
};

function getRecordProperty(value: unknown, key: string) {
  if (!value || typeof value !== "object" || !(key in value)) {
    return undefined;
  }

  return (value as Record<string, unknown>)[key];
}

function getWrappedSchema(schema: unknown) {
  const zodV3Def = getRecordProperty(schema, "_def");
  const zodV4Def = getRecordProperty(getRecordProperty(schema, "_zod"), "def");
  const def = zodV3Def ?? zodV4Def;

  return (
    getRecordProperty(def, "schema") ??
    getRecordProperty(def, "innerType") ??
    getRecordProperty(def, "in")
  );
}

function normalizeToolObjectSchema(schema: ToolSchema | undefined): AnyObjectSchema | undefined {
  let current: unknown = schema;

  for (let depth = 0; depth < 8; depth += 1) {
    const objectSchema = normalizeObjectSchema(current as ToolSchema | undefined);

    if (objectSchema) {
      return objectSchema;
    }

    const wrappedSchema = getWrappedSchema(current);

    if (!wrappedSchema || wrappedSchema === current) {
      return undefined;
    }

    current = wrappedSchema;
  }

  return undefined;
}

function normalizeToolConfigForRegistration(config: ToolConfig): ToolConfig {
  return {
    ...config,
    inputSchema:
      typeof config.inputSchema === "undefined"
        ? undefined
        : normalizeToolObjectSchema(config.inputSchema) ?? config.inputSchema,
    outputSchema:
      typeof config.outputSchema === "undefined"
        ? undefined
        : normalizeToolObjectSchema(config.outputSchema) ?? config.outputSchema
  };
}

function buildHttpRuntimeConfig(options: CreateServerOptions) {
  return options.mode === "http"
    ? {
        repository: options.authRepository,
        masterKey: options.authMasterKey,
        readCacheTtls: options.config.readCacheTtls
      }
    : {};
}

function getInternalToolRegistryServer(candidate: unknown): InternalToolRegistryServer | undefined {
  if (!candidate || typeof candidate !== "object") {
    return undefined;
  }

  const server = candidate as InternalToolRegistryServer;

  if (
    server._registeredTools !== undefined &&
    typeof server._registeredTools === "object" &&
    typeof server.setToolRequestHandlers === "function"
  ) {
    return server;
  }

  return undefined;
}

function createCapturedRegisteredTool(config: ToolConfig, handler: ToolHandler): McpRegisteredTool {
  return {
    title: config.title,
    description: config.description,
    inputSchema: normalizeToolObjectSchema(config.inputSchema),
    outputSchema: normalizeToolObjectSchema(config.outputSchema),
    annotations: config.annotations,
    _meta: config._meta,
    handler: handler as McpRegisteredTool["handler"],
    enabled: true,
    enable() {
      return undefined;
    },
    disable() {
      return undefined;
    },
    update: (() => undefined) as McpRegisteredTool["update"],
    remove() {
      return undefined;
    }
  };
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
            const objectSchema = normalizeToolObjectSchema(tool.inputSchema);

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
          const objectSchema = normalizeToolObjectSchema(tool.outputSchema);

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
  const internalServer = getInternalToolRegistryServer(server);

  if (!internalServer) {
    return;
  }

  if (!internalServer.server || typeof internalServer.server.setRequestHandler !== "function") {
    return;
  }

  let cachedResult: ReturnType<typeof buildCachedToolsListResult> | undefined;
  const invalidateToolsListCache = () => {
    cachedResult = undefined;
  };

  if (options?.invalidateOnUpdate) {
    for (const [name, tool] of Object.entries(internalServer._registeredTools ?? {})) {
      internalServer._registeredTools![name] = cloneRegisteredTool(internalServer, name, tool, {
        invalidateToolsListCache
      });
    }
  }

  internalServer.server.setRequestHandler(ListToolsRequestSchema, () => {
    if (!cachedResult) {
      cachedResult = buildCachedToolsListResult(internalServer._registeredTools ?? {});
    }

    return cachedResult;
  });
}

function hydrateRegisteredToolsFromTemplate(
  templateServer: McpServer,
  server: McpServer
) {
  const templateRegistryServer = getInternalToolRegistryServer(templateServer);
  const targetRegistryServer = getInternalToolRegistryServer(server);

  if (!templateRegistryServer || !targetRegistryServer) {
    return false;
  }

  const hydratedTools = Object.fromEntries(
    Object.entries(templateRegistryServer._registeredTools ?? {}).map(([name, tool]) => [
      name,
      cloneRegisteredTool(targetRegistryServer, name, tool)
    ])
  );

  targetRegistryServer._registeredTools = hydratedTools;
  targetRegistryServer._toolHandlersInitialized = false;
  targetRegistryServer.setToolRequestHandlers?.();
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
    registerTool: ((name: string, config: ToolConfig, handler: ToolHandler) => {
      registeredTools.push({
        name,
        config,
        handler
      });

      return createCapturedRegisteredTool(config, handler);
    }) as RegisterToolMethod
  };

  dependencies.registerAuthTools({
    server: capturingServer,
    mode: options.mode,
    sessionStore: options.mode === "http" ? options.sessionStore : undefined,
    rateLimit:
      options.mode === "http"
        ? options.config.authWriteRateLimit ?? DEFAULT_HTTP_WRITE_RATE_LIMIT
        : undefined
  });

  for (const toolManifestEntry of dependencies.collectProductToolManifest()) {
    const toolName = toolManifestEntry.name;

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
    collectProductToolManifest:
      dependencies.collectProductToolManifest ?? collectProductToolManifest
  };

  resolvedDependencies.configureHttpAuthRuntimeConfig(buildHttpRuntimeConfig(options));

  const stdioClients = resolvedDependencies.buildStdioClients(options);
  const serverInfo = createServerInfo(options.config);
  const productWriteRateLimiter =
    options.mode === "http"
      ? resolvedDependencies.createFixedWindowRateLimiter({
          maxRequests:
            options.config.productWriteRateLimit?.maxRequests ??
            DEFAULT_HTTP_WRITE_RATE_LIMIT.maxRequests,
          windowMs:
            options.config.productWriteRateLimit?.windowMs ??
            DEFAULT_HTTP_WRITE_RATE_LIMIT.windowMs
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
    templateServer.registerTool(
      toolPlan.name,
      normalizeToolConfigForRegistration(toolPlan.config),
      toolPlan.handler
    );
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
        server.registerTool(
          toolPlan.name,
          normalizeToolConfigForRegistration(toolPlan.config),
          toolPlan.handler
        );
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

export function readRegisteredTools(server: unknown): RegisteredToolInfo[] {
  const registryServer = getInternalToolRegistryServer(server);

  if (!registryServer) {
    return [];
  }

  return Object.entries(registryServer._registeredTools ?? {})
    .map(([name, tool]) => ({
      name,
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
      outputSchema: tool.outputSchema,
      annotations: tool.annotations,
      _meta: tool._meta,
      handler: tool.handler as RegisteredToolInvocationHandler,
      enabled: tool.enabled
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}
