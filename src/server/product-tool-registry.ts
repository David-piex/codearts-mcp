import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AppError } from "../core/errors/app-error.js";
import { readHttpAuthRequestInfo } from "./auth-session-tools.js";
import type { SessionToolExtra } from "./auth-session-runtime.js";
import type { RateLimiter } from "./rate-limiter.js";
import { createSessionAwareProductToolHandler } from "./session-aware-handler.js";
import type { SessionCredentialStore } from "./session-store.js";
import { formatToolErrorMessage } from "./tool-error-hints.js";
import { classifyToolAccess } from "./tool-manifest.js";

type RegisterableServer = Pick<McpServer, "registerTool">;

type ToolModeOptions<TClient> = {
  toolName: string;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: TClient;
  rateLimiter?: RateLimiter;
};

type ProductToolDefinition<TClient> = {
  description: string;
  inputSchema: any;
  resolveHandler: (options: ToolModeOptions<TClient>) => any;
};

function createToolErrorResult(toolName: string, error: unknown) {
  const appError = error instanceof AppError ? error : undefined;

  return {
    content: [
      {
        type: "text" as const,
        text: formatToolErrorMessage(toolName, error)
      }
    ],
    isError: true,
    structuredContent: {
      category: appError?.category ?? "unknown_error",
      message: appError?.message ?? (error instanceof Error ? error.message : String(error)),
      code: appError?.code,
      requestId: appError?.requestId,
      status: appError?.status
    }
  };
}

function wrapToolHandler<THandler extends (...args: any[]) => any>(
  toolName: string,
  handler: THandler
): THandler {
  return (async (...args: Parameters<THandler>) => {
    try {
      return await handler(...args);
    } catch (error) {
      return createToolErrorResult(toolName, error);
    }
  }) as THandler;
}

function isDryRunInput(input: unknown, inputSchema: { safeParse?: (value: unknown) => { success: boolean; data: unknown } }) {
  if (input && typeof input === "object" && (input as { dry_run?: unknown }).dry_run === true) {
    return true;
  }

  const parsed = inputSchema.safeParse?.(input);

  if (!parsed?.success || !parsed.data || typeof parsed.data !== "object") {
    return false;
  }

  return (parsed.data as { dry_run?: unknown }).dry_run === true;
}

function inferWriteRateLimitAction(toolName: string) {
  return classifyToolAccess(toolName) === "write" ? toolName : undefined;
}

export function defineProductTool<
  THttpClients,
  TClient,
  THandler extends (client: TClient) => (input: any) => any
>(options: {
  description: string;
  inputSchema: any;
  selectHttpClient: (clients: THttpClients) => TClient;
  createProductHandler: THandler;
  rateLimitAction?: string;
}): ProductToolDefinition<TClient> {
  return {
    description: options.description,
    inputSchema: options.inputSchema,
    resolveHandler(resolveOptions) {
      if (resolveOptions.mode === "http") {
        const rateLimitAction =
          options.rateLimitAction ?? inferWriteRateLimitAction(resolveOptions.toolName);

        return createSessionAwareProductToolHandler({
          store: resolveOptions.sessionStore!,
          beforeHandle: rateLimitAction
            ? (input: unknown, extra: SessionToolExtra) => {
                if (isDryRunInput(input, options.inputSchema)) {
                  return;
                }

                const requestAuthInfo = readHttpAuthRequestInfo(extra);
                const identity =
                  extra.sessionId ?? extra.authId ?? requestAuthInfo?.authId;

                if (!identity) {
                  return;
                }

                resolveOptions.rateLimiter?.check(
                  `${rateLimitAction}:${identity}`,
                  rateLimitAction
                );
              }
            : undefined,
          selectClient: options.selectHttpClient as never,
          createProductHandler: options.createProductHandler
        });
      }

      return options.createProductHandler(resolveOptions.stdioClient as TClient);
    }
  };
}

export function registerDefinedTool<
  TDefinitions extends Record<string, ProductToolDefinition<any>>
>(options: {
  toolName: string;
  server: RegisterableServer;
  definitions: TDefinitions;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: unknown;
  rateLimiter?: RateLimiter;
}) {
  const definition = options.definitions[options.toolName as keyof TDefinitions];

  if (!definition) {
    return false;
  }

  options.server.registerTool(
    options.toolName,
    {
      title: options.toolName,
      description: definition.description,
      inputSchema: definition.inputSchema
    },
    wrapToolHandler(
      options.toolName,
      definition.resolveHandler({
        mode: options.mode,
        toolName: options.toolName,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClient,
        rateLimiter: options.rateLimiter
      })
    )
  );

  return true;
}
