import { once } from "node:events";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { HttpAuthConfig } from "../../src/core/config/env.js";
import { createHttpApp } from "../../src/server/http-app.js";

const MCP_PROTOCOL_VERSION = "2025-03-26";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK
  );
}

function createLiveAuthConfig(): HttpAuthConfig {
  return {
    masterKey: "0123456789abcdef0123456789abcdef",
    authDataPath: join(
      mkdtempSync(join(tmpdir(), "codearts-mcp-http-live-auth-")),
      "auth-store.json"
    ),
    authCookieName: "codearts_mcp_auth",
    authCookieSecure: false,
    authTokenTtlSeconds: 60 * 30
  };
}

async function startServer(
  authConfig: HttpAuthConfig
): Promise<{ server: ReturnType<typeof createServer>; port: number }> {
  const app = createHttpApp(
    {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    },
    authConfig
  );
  const server = createServer(app);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected an address info object");
  }

  return {
    server,
    port: address.port
  };
}

async function postJsonRpc(
  port: number,
  payload: unknown,
  options?: {
    sessionId?: string;
    cookie?: string;
    queryToken?: string;
  }
) {
  const headers: Record<string, string> = {
    accept: "application/json, text/event-stream",
    "content-type": "application/json"
  };

  if (options?.sessionId) {
    headers["mcp-session-id"] = options.sessionId;
    headers["mcp-protocol-version"] = MCP_PROTOCOL_VERSION;
  }

  if (options?.cookie) {
    headers.cookie = options.cookie;
  }

  const url = new URL(`http://127.0.0.1:${port}/mcp`);
  if (options?.queryToken) {
    url.searchParams.set("auth_token", options.queryToken);
  }

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
}

async function initializeSession(
  port: number,
  options?: {
    cookie?: string;
    queryToken?: string;
  }
) {
  const response = await postJsonRpc(
    port,
    {
      jsonrpc: "2.0",
      id: "init-1",
      method: "initialize",
      params: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: {
          name: "vitest-live",
          version: "0.1.0"
        }
      }
    },
    options
  );

  return {
    response,
    sessionId: response.headers.get("mcp-session-id")
  };
}

async function callTool(
  port: number,
  input: {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
    sessionId?: string;
    cookie?: string;
    queryToken?: string;
  }
) {
  const response = await postJsonRpc(
    port,
    {
      jsonrpc: "2.0",
      id: input.id,
      method: "tools/call",
      params: {
        name: input.name,
        arguments: input.arguments
      }
    },
    {
      sessionId: input.sessionId,
      cookie: input.cookie,
      queryToken: input.queryToken
    }
  );
  const body = (await response.json()) as {
    result?: {
      structuredContent?: {
        auth_token?: string;
        auth_id?: string;
        item?: Record<string, unknown>;
        items?: Array<Record<string, unknown>>;
      };
      isError?: boolean;
      content?: Array<{ type?: string; text?: string }>;
    };
  };

  return {
    response,
    body
  };
}

function readReqWritableProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID?.trim() || "7bd39587c14048aebdadd0f9c22b1402";
}

function readDeployTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_TASK_ID?.trim() || "12fd680dd703431da99565be7a9b2014";
}

function readPipelineProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_PIPELINE_LIVE_PROJECT_IDS?.trim();

  if (!raw) {
    return [
      "7bd39587c14048aebdadd0f9c22b1402",
      "b60f3ec187f34c35ad3033d1d6d73876",
      "eed055d650fb49dd88e49e6bdf88d344",
      "eb80951449fa4af8bac57494f0f4defd"
    ];
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readConfiguredPipeline(source: NodeJS.ProcessEnv) {
  const projectId = source.HUAWEICLOUD_PIPELINE_LIVE_PROJECT_ID?.trim();
  const pipelineId = source.HUAWEICLOUD_PIPELINE_LIVE_PIPELINE_ID?.trim();

  if (!projectId || !pipelineId) {
    return undefined;
  }

  return { projectId, pipelineId };
}

function readPipelineBranch(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_PIPELINE_LIVE_BRANCH?.trim() || "master";
}

async function findPipelineViaMcp(
  port: number,
  sessionId: string,
  cookie: string,
  source: NodeJS.ProcessEnv
) {
  const configured = readConfiguredPipeline(source);

  if (configured) {
    return configured;
  }

  for (const projectId of readPipelineProjectIds(source)) {
    const listed = await callTool(port, {
      id: `pipeline-list-${projectId}`,
      name: "pipeline_list_pipelines",
      arguments: {
        project_id: projectId,
        page: 1,
        page_size: 20
      },
      sessionId,
      cookie
    });

    const first = listed.body.result?.structuredContent?.items?.[0];

    if (listed.response.status === 200 && first?.id && typeof first.id === "string") {
      return {
        projectId,
        pipelineId: first.id
      };
    }
  }

  throw new Error("No live pipeline available through the HTTP MCP session.");
}

if (hasLiveEnv(process.env)) {
  describe("http live smoke", () => {
    const servers: Array<ReturnType<typeof createServer>> = [];

    afterEach(async () => {
      for (const server of servers.splice(0)) {
        server.close();
        await once(server, "close");
      }
    });

    it("reuses persisted auth across reconnects and executes req/deploy/pipeline write tools over HTTP", async () => {
      const authConfig = createLiveAuthConfig();
      const { server, port } = await startServer(authConfig);
      servers.push(server);

      const firstInit = await initializeSession(port);
      const firstSessionId = firstInit.sessionId;

      expect(firstInit.response.status).toBe(200);
      expect(firstSessionId).toBeTruthy();

      const configured = await callTool(port, {
        id: "auth-configure",
        name: "auth_configure_session",
        arguments: {
          access_key: process.env.HUAWEICLOUD_AK!,
          secret_key: process.env.HUAWEICLOUD_SK!,
          region: process.env.HUAWEICLOUD_REGION!
        },
        sessionId: firstSessionId ?? undefined
      });

      const cookie = configured.response.headers.get("set-cookie");
      const authToken = configured.body.result?.structuredContent?.auth_token;
      const authId = configured.body.result?.structuredContent?.auth_id;

      expect(configured.response.status).toBe(200);
      expect(cookie).toContain(`${authConfig.authCookieName}=`);
      expect(authToken).toBeTruthy();
      expect(authId).toBeTruthy();
      expect(existsSync(authConfig.authDataPath)).toBe(true);
      expect(readFileSync(authConfig.authDataPath, "utf8")).toContain(String(authId));

      const reconnectInit = await initializeSession(port, {
        cookie: cookie ?? undefined
      });
      const reconnectSessionId = reconnectInit.sessionId;

      expect(reconnectInit.response.status).toBe(200);
      expect(reconnectSessionId).toBeTruthy();
      expect(reconnectSessionId).not.toBe(firstSessionId);

      const reqCreated = await callTool(port, {
        id: "req-create",
        name: "req_create_work_item",
        arguments: {
          project_id: readReqWritableProjectId(process.env),
          title: `mcp-http-live-${Date.now()}`,
          work_item_type: "task",
          dry_run: false
        },
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(reqCreated.response.status).toBe(200);
      expect(reqCreated.body.result?.isError).not.toBe(true);
      expect(reqCreated.body.result?.structuredContent?.item?.executed).toBe(true);
      expect(String(reqCreated.body.result?.structuredContent?.item?.id ?? "")).not.toBe("");

      const pipelineTarget = await findPipelineViaMcp(
        port,
        reconnectSessionId!,
        cookie!,
        process.env
      );
      const pipelineStarted = await callTool(port, {
        id: "pipeline-run",
        name: "pipeline_run_pipeline",
        arguments: {
          project_id: pipelineTarget.projectId,
          pipeline_id: pipelineTarget.pipelineId,
          branch: readPipelineBranch(process.env),
          description: `mcp-http-live-${Date.now()}`,
          dry_run: false
        },
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(pipelineStarted.response.status).toBe(200);
      expect(pipelineStarted.body.result?.isError).not.toBe(true);
      expect(pipelineStarted.body.result?.structuredContent?.item?.executed).toBe(true);
      expect(String(pipelineStarted.body.result?.structuredContent?.item?.pipelineRunId ?? "")).toMatch(
        /^[0-9a-f]{32}$/
      );

      const deployStarted = await callTool(port, {
        id: "deploy-start",
        name: "deploy_start_app",
        arguments: {
          task_id: readDeployTaskId(process.env),
          dry_run: false
        },
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(deployStarted.response.status).toBe(200);
      expect(deployStarted.body.result?.isError).toBe(true);
      expect(deployStarted.body.result?.content?.[0]?.text).toContain("来自流水线");
    }, 120000);
  });
} else {
  describe.skip("http live smoke", () => {});
}
