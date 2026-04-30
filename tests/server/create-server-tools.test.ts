import { describe, expect, it, vi } from "vitest";
import { createServer, createServerFactory } from "../../src/server/create-server.js";
import { collectToolNames } from "../../src/server/register-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";
import {
  collectManifestToolNames,
  collectProductToolManifest,
  type ToolManifestEntry
} from "../../src/server/tool-manifest.js";

const httpConfig = {
  serverName: "codearts-mcp",
  serverVersion: "0.1.0",
  httpPort: 3000
};

const stdioConfig = {
  baseUrl: "https://codearts.cn-north-4.myhuaweicloud.com",
  region: "cn-north-4",
  accessKey: "ak",
  secretKey: "sk",
  serverName: "codearts-mcp",
  serverVersion: "0.1.0",
  reqBaseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
  repoBaseUrl: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
  pipelineBaseUrl: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
  checkBaseUrl: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
  testPlanBaseUrl: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
  deployBaseUrl: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
  buildBaseUrl: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
  artifactBaseUrl: "https://artifact.cn-north-4.myhuaweicloud.cn"
};

function createHttpServer() {
  return createServer({
    mode: "http",
    config: httpConfig,
    sessionStore: createSessionCredentialStore()
  });
}

function createStdioServer() {
  return createServer({
    mode: "stdio",
    config: stdioConfig
  });
}

function readRegisteredToolNames(server: unknown) {
  const registeredTools = (server as { _registeredTools?: Record<string, unknown> })._registeredTools;

  return Object.keys(registeredTools ?? {}).sort();
}

function readRegisteredTool(server: unknown, name: string) {
  const registeredTools = (server as { _registeredTools?: Record<string, unknown> })._registeredTools;

  return registeredTools?.[name] as
    | {
        description?: string;
        inputSchema?: {
          _def?: {
            shape?: () => Record<string, { isOptional?: () => boolean }>;
          };
        };
      }
    | undefined;
}

async function invokeInternalListToolsHandler(server: unknown) {
  const requestHandlers = (
    server as {
      server?: {
        _requestHandlers?: Map<string, (request: unknown, extra: unknown) => Promise<unknown>>;
      };
    }
  ).server?._requestHandlers;
  const handler = requestHandlers?.get("tools/list");

  if (!handler) {
    throw new Error("Expected tools/list handler to be registered");
  }

  return handler(
    {
      jsonrpc: "2.0",
      id: "tools-list-1",
      method: "tools/list",
      params: {}
    },
    {}
  );
}

describe("createServer tool registration", () => {
  it("registers only product manifest tools in stdio mode", () => {
    const server = createStdioServer();

    const toolNames = readRegisteredToolNames(server);

    expect(toolNames).toEqual(collectToolNames());
    expect(toolNames).toHaveLength(collectProductToolManifest().length);
    expect(toolNames).not.toContain("auth_configure_session");
    expect(toolNames).not.toContain("auth_clear_session");
  });

  it("registers the HTTP manifest including auth tools in http mode", () => {
    const server = createHttpServer();

    const toolNames = readRegisteredToolNames(server);

    expect(toolNames).toHaveLength(collectManifestToolNames({ mode: "http" }).length);
    expect(toolNames).toEqual(collectManifestToolNames({ mode: "http" }));
  });

  it("exposes auth_configure_session with optional endpoint overrides in http mode", () => {
    const server = createHttpServer();
    const tool = readRegisteredTool(server, "auth_configure_session");
    const shape = tool?.inputSchema?._def?.shape?.();

    expect(tool?.description).toContain("only need access_key, secret_key, and region");
    expect(shape?.region?.isOptional?.()).toBe(false);
    expect(shape?.req_base_url?.isOptional?.()).toBe(true);
    expect(shape?.repo_base_url?.isOptional?.()).toBe(true);
    expect(shape?.pipeline_base_url?.isOptional?.()).toBe(true);
    expect(shape?.check_base_url?.isOptional?.()).toBe(true);
    expect(shape?.testplan_base_url?.isOptional?.()).toBe(true);
    expect(shape?.deploy_base_url?.isOptional?.()).toBe(true);
    expect(shape?.build_base_url?.isOptional?.()).toBe(true);
    expect(shape?.artifact_base_url?.isOptional?.()).toBe(true);
  });

  it("reuses a cached tools/list result across repeated requests", async () => {
    const server = createHttpServer();

    const firstResult = await invokeInternalListToolsHandler(server);
    const secondResult = await invokeInternalListToolsHandler(server);

    expect(firstResult).toBe(secondResult);
    expect((firstResult as { tools?: unknown[] }).tools).toHaveLength(
      collectManifestToolNames({ mode: "http" }).length
    );
  });

  it("preserves refined object schema properties in tools/list", async () => {
    const server = createHttpServer();
    const result = (await invokeInternalListToolsHandler(server)) as {
      tools?: Array<{
        name: string;
        inputSchema?: {
          properties?: Record<string, unknown>;
          required?: string[];
        };
      }>;
    };
    const importRepositoryTool = result.tools?.find((tool) => tool.name === "repo_import_repository");
    const batchUpdateTool = result.tools?.find(
      (tool) => tool.name === "req_batch_update_work_items"
    );

    expect(importRepositoryTool?.inputSchema?.properties).toHaveProperty("project_uuid");
    expect(importRepositoryTool?.inputSchema?.properties).toHaveProperty("source_token");
    expect(importRepositoryTool?.inputSchema?.required).toEqual(
      expect.arrayContaining(["project_uuid", "name", "source_type", "source_url"])
    );
    expect(batchUpdateTool?.inputSchema?.properties).toHaveProperty("work_item_ids");
    expect(batchUpdateTool?.inputSchema?.properties).toHaveProperty("status_id");
    expect(batchUpdateTool?.inputSchema?.required).toEqual(
      expect.arrayContaining(["project_id", "work_item_ids"])
    );
  });

  it("captures tool registrations once and hydrates later server instances from a template", () => {
    const collectProductToolManifestMock = vi.fn(
      (): ToolManifestEntry[] => [
        {
          name: "req_list_projects",
          kind: "product",
          module: "Req",
          transport: "all",
          access: "read",
          supportsDryRun: false,
          liveStatus: "partial",
          docGroup: "req:project",
          riskLevel: "low",
          requiresExplicitLiveSample: false,
          family: "req"
        },
        {
          name: "repo_list_repositories",
          kind: "product",
          module: "Repo",
          transport: "all",
          access: "read",
          supportsDryRun: false,
          liveStatus: "validated",
          docGroup: "repo",
          riskLevel: "low",
          requiresExplicitLiveSample: false,
          family: "repo"
        }
      ]
    );
    const registerAuthToolsMock = vi.fn((options: {
      server: { registerTool: (name: string, config: unknown, handler: unknown) => void };
    }) => {
      options.server.registerTool(
        "auth_configure_session",
        {
          title: "auth_configure_session"
        },
        async () => ({})
      );
    });
    const registerProductToolMock = vi.fn((options: {
      toolName: string;
      server: { registerTool: (name: string, config: unknown, handler: unknown) => void };
    }) => {
      options.server.registerTool(
        options.toolName,
        {
          title: options.toolName
        },
        async () => ({})
      );
      return true;
    });
    const registerScaffoldToolMock = vi.fn();
    const createFixedWindowRateLimiterMock = vi.fn(() => ({ check: vi.fn() }));
    const createdServers: Array<{
      _registeredTools: Record<string, unknown>;
      registerToolCalls: string[];
      _toolHandlersInitialized: boolean;
      setToolRequestHandlers: ReturnType<typeof vi.fn>;
      sendToolListChanged: ReturnType<typeof vi.fn>;
    }> = [];
    const McpServerMock = vi.fn(function MockMcpServer() {
      const registeredTools: Record<string, unknown> = {};
      const registerToolCalls: string[] = [];
      const server = {
        _registeredTools: registeredTools,
        _toolHandlersInitialized: false,
        registerTool(name: string, config: unknown) {
          registerToolCalls.push(name);
          registeredTools[name] = config;
        },
        setToolRequestHandlers: vi.fn(() => {
          server._toolHandlersInitialized = true;
        }),
        sendToolListChanged: vi.fn(() => {
          return undefined;
        })
      };
      createdServers.push({
        ...server,
        registerToolCalls
      });
      return server;
    });

    const factory = createServerFactory(
      {
        mode: "http",
        config: {
          ...httpConfig,
          readCacheTtls: {
            reqListProjectsMs: 60_000,
            repoListRepositoriesMs: 60_000,
            pipelineListPipelinesMs: 5_000,
            buildListJobsMs: 5_000
          },
          productWriteRateLimit: {
            maxRequests: 1200,
            windowMs: 30_000
          },
          authWriteRateLimit: {
            maxRequests: 600,
            windowMs: 15_000
          }
        },
        sessionStore: createSessionCredentialStore()
      },
      {
        McpServer: McpServerMock as never,
        collectProductToolManifest: collectProductToolManifestMock,
        registerAuthTools: registerAuthToolsMock as never,
        registerProductTool: registerProductToolMock as never,
        registerScaffoldTool: registerScaffoldToolMock as never,
        createFixedWindowRateLimiter: createFixedWindowRateLimiterMock as never
      }
    );

    const first = factory();
    const second = factory();

    expect(collectProductToolManifestMock).toHaveBeenCalledTimes(1);
    expect(registerAuthToolsMock).toHaveBeenCalledTimes(1);
    expect(registerAuthToolsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        rateLimit: {
          maxRequests: 600,
          windowMs: 15_000
        }
      })
    );
    expect(createFixedWindowRateLimiterMock).toHaveBeenCalledWith({
      maxRequests: 1200,
      windowMs: 30_000
    });
    expect(registerProductToolMock).toHaveBeenCalledTimes(2);
    expect(registerScaffoldToolMock).not.toHaveBeenCalled();
    expect(McpServerMock).toHaveBeenCalledTimes(3);
    expect(createdServers[0]?.registerToolCalls).toEqual([
      "auth_configure_session",
      "req_list_projects",
      "repo_list_repositories"
    ]);
    expect(createdServers[1]?.registerToolCalls).toEqual([]);
    expect(createdServers[2]?.registerToolCalls).toEqual([]);
    expect(createdServers[1]?.setToolRequestHandlers).toHaveBeenCalledTimes(1);
    expect(createdServers[2]?.setToolRequestHandlers).toHaveBeenCalledTimes(1);
    expect(readRegisteredToolNames(first)).toEqual([
      "auth_configure_session",
      "repo_list_repositories",
      "req_list_projects"
    ]);
    expect(readRegisteredToolNames(second)).toEqual([
      "auth_configure_session",
      "repo_list_repositories",
      "req_list_projects"
    ]);
  });
});
