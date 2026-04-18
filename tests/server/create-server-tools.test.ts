import { describe, expect, it } from "vitest";
import { createServer } from "../../src/server/create-server.js";
import { collectToolNames } from "../../src/server/register-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

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

describe("createServer tool registration", () => {
  it("registers only the 156 product tools in stdio mode", () => {
    const server = createServer({
      mode: "stdio",
      config: {
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
      }
    });

    const toolNames = readRegisteredToolNames(server);

    expect(toolNames).toEqual(collectToolNames());
    expect(toolNames).toHaveLength(156);
    expect(toolNames).not.toContain("auth_configure_session");
    expect(toolNames).not.toContain("auth_clear_session");
  });

  it("registers 158 tools including auth tools in http mode", () => {
    const server = createServer({
      mode: "http",
      config: {
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000
      },
      sessionStore: createSessionCredentialStore()
    });

    const toolNames = readRegisteredToolNames(server);

    expect(toolNames).toHaveLength(158);
    expect(toolNames).toEqual(
      [...collectToolNames(), "auth_clear_session", "auth_configure_session"].sort()
    );
  });

  it("exposes auth_configure_session with optional endpoint overrides in http mode", () => {
    const server = createServer({
      mode: "http",
      config: {
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000
      },
      sessionStore: createSessionCredentialStore()
    });
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
});
