import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { productToolFamilies } from "../../src/contracts/product-families.js";
import {
  clearSessionTool,
  callTool,
  createTestHttpServerRegistry,
  createTestHttpAuthConfig,
  fetchJsonFromTestServer,
  initializeConfiguredSession,
  initializeSession,
  postJsonRpc,
  MCP_PROTOCOL_VERSION
} from "./http-mcp-test-helpers.js";
import { masterKey } from "./http-test-helpers.js";

describe("http app", () => {
  const servers = createTestHttpServerRegistry();

  async function startConfiguredServer(
    overrides?: Parameters<typeof servers.start>[1]
  ) {
    const authConfig = createTestHttpAuthConfig();
    const server = await servers.start(authConfig, overrides);

    return {
      authConfig,
      ...server
    };
  }

  function createRequestLogCapture() {
    const logs: unknown[] = [];

    return {
      logs,
      requestLogger(entry: unknown) {
        logs.push(entry);
      }
    };
  }

  async function listToolsForPath(port: number, sessionId: string, path: string) {
    const toolsResponse = await postJsonRpc(
      port,
      {
        jsonrpc: "2.0",
        id: `tools-list:${path}`,
        method: "tools/list",
        params: {}
      },
      {
        sessionId,
        path
      }
    );
    const body = (await toolsResponse.json()) as {
      result?: {
        tools?: Array<{ name: string }>;
      };
    };

    return (body.result?.tools ?? []).map((tool) => tool.name);
  }

  afterEach(async () => {
    await servers.closeAll();
  });

  it("serves the health endpoint", async () => {
    const { port } = await servers.start();
    const { response, body } = await fetchJsonFromTestServer<{ status: string }>(port, "/health");

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("serves the readiness endpoint when auth persistence is writable", async () => {
    const { port } = await startConfiguredServer();
    const { response, body } = await fetchJsonFromTestServer<{
      status: string;
      checks: {
        auth_persistence?: string;
      };
    }>(port, "/health/ready");

    expect(response.status).toBe(200);
    expect(body.status).toBe("ready");
    expect(body.checks.auth_persistence).toBe("ok");
  });

  it("serves session reuse diagnostics for recent MCP initialize/auth/tool traffic", async () => {
    const { port } = await startConfiguredServer();
    const {
      sessionId: firstSessionId,
      cookie
    } = await initializeConfiguredSession(port);

    const reconnectInit = await initializeSession(port, {
      cookie: cookie ?? undefined
    });
    const reconnectSessionId = reconnectInit.sessionId;
    const cleared = await clearSessionTool(port, {
      sessionId: reconnectSessionId ?? undefined,
      cookie: cookie ?? undefined
    });

    expect(cleared.response.status).toBe(200);

    const { response, body } = await fetchJsonFromTestServer<{
      status: string;
      diagnostics: {
        totals: {
          initialize: number;
          toolCalls: number;
          authConfigureSession: number;
        };
        ratios: {
          authConfigureSessionToToolCall: number | null;
        };
        sessions: {
          withToolCalls: number;
          withAuthConfigureSession: number;
          reusedForNonAuthToolCalls: number;
        };
        topSessions: Array<{
          sessionId: string;
          authConfigureSessionCalls: number;
        }>;
      };
    }>(port, "/diagnostics/session-reuse");

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.diagnostics.totals).toMatchObject({
      initialize: 2,
      toolCalls: 2,
      authConfigureSession: 1
    });
    expect(body.diagnostics.ratios.authConfigureSessionToToolCall).toBe(0.5);
    expect(body.diagnostics.sessions).toMatchObject({
      withToolCalls: 2,
      withAuthConfigureSession: 1,
      reusedForNonAuthToolCalls: 0
    });
    expect(body.diagnostics.topSessions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sessionId: firstSessionId,
          authConfigureSessionCalls: 1
        })
      ])
    );
  });

  it("returns not ready when the auth persistence parent is invalid", async () => {
    const tempDir = mkdtempSync(join(tmpdir(), "codearts-mcp-ready-"));
    const parentFile = join(tempDir, "not-a-directory");
    writeFileSync(parentFile, "placeholder");

    const { port } = await servers.start({
      masterKey,
      authDataPath: join(parentFile, "auth-store.json"),
      authCookieName: "codearts_mcp_auth",
      authCookieSecure: false,
      authTokenTtlSeconds: 60,
      allowQueryAuthToken: false
    });
    const { response, body } = await fetchJsonFromTestServer<{
      status: string;
      checks: {
        auth_persistence?: string;
      };
    }>(port, "/health/ready");

    expect(response.status).toBe(503);
    expect(body.status).toBe("not_ready");
    expect(body.checks.auth_persistence).toBe("error");
  });

  it("returns ok on the root path for deploy health probes", async () => {
    const { port } = await servers.start();
    const { response, body } = await fetchJsonFromTestServer<{ status: string }>(port, "/");

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("returns 404 for the removed shared /mcp endpoint", async () => {
    const { port } = await servers.start();
    const response = await fetch(`http://127.0.0.1:${port}/mcp`);
    const body = (await response.json()) as {
      error?: string;
    };

    expect(response.status).toBe(404);
    expect(response.headers.get("allow")).toBeNull();
    expect(body.error).toBe("Not found.");
  });

  it("serves all product-scoped MCP routes with only that module plus auth tools", async () => {
    const { port } = await servers.start();
    for (const family of productToolFamilies) {
      const path = `/mcp/${family}`;
      const initialized = await initializeSession(port, {
        path
      });

      expect(initialized.response.status).toBe(200);
      expect(initialized.sessionId).toBeTruthy();

      const toolNames = await listToolsForPath(port, initialized.sessionId!, path);

      expect(toolNames).toContain("auth_configure_session");
      expect(toolNames).toContain("auth_clear_session");
      expect(toolNames.some((name) => name.startsWith(`${family}_`))).toBe(true);
      expect(
        toolNames.every((name) => name.startsWith(`${family}_`) || name.startsWith("auth_"))
      ).toBe(true);
    }
  });

  it("reuses auth across product-scoped routes while keeping MCP sessions route-specific", async () => {
    const { authConfig, port } = await startConfiguredServer();
    const {
      sessionId: reqSessionId,
      authId,
      authToken
    } = await initializeConfiguredSession(port, {
      path: "/mcp/req"
    });

    expect(reqSessionId).toBeTruthy();
    expect(authId).toBeTruthy();
    expect(authToken).toBeTruthy();

    const repoInitialized = await initializeSession(port, {
      path: "/mcp/repo",
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
    const repoSessionId = repoInitialized.sessionId;

    expect(repoInitialized.response.status).toBe(200);
    expect(repoSessionId).toBeTruthy();
    expect(repoSessionId).not.toBe(reqSessionId);

    const wrongRouteResponse = await postJsonRpc(
      port,
      {
        jsonrpc: "2.0",
        id: "cross-route-tools-list",
        method: "tools/list",
        params: {}
      },
      {
        sessionId: reqSessionId ?? undefined,
        path: "/mcp/repo"
      }
    );
    const wrongRouteBody = (await wrongRouteResponse.json()) as {
      error?: string;
    };

    expect(wrongRouteResponse.status).toBe(404);
    expect(wrongRouteBody.error).toBe("Unknown MCP session ID.");

    const cleared = await clearSessionTool(port, {
      sessionId: repoSessionId ?? undefined,
      path: "/mcp/repo"
    });

    expect(cleared.response.status).toBe(200);
    expect(cleared.body.result?.structuredContent?.cleared).toBe(true);

    const authStore = JSON.parse(readFileSync(authConfig.authDataPath, "utf8")) as {
      records?: Array<{
        auth_id: string;
        revoked_at?: string;
      }>;
    };
    const record = authStore.records?.find((item) => item.auth_id === authId);

    expect(record?.revoked_at).toBeTruthy();
  });

  it("returns 404 for unsupported product MCP routes", async () => {
    const response = await fetch(`http://127.0.0.1:${(await servers.start()).port}/mcp/govern`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "init-invalid",
        method: "initialize",
        params: {
          protocolVersion: MCP_PROTOCOL_VERSION,
          capabilities: {},
          clientInfo: {
            name: "vitest",
            version: "0.1.0"
          }
        }
      })
    });
    const body = (await response.json()) as { error?: string };

    expect(response.status).toBe(404);
    expect(body.error).toBe("Not found.");
  });

  it("can restrict available product routes through enabled family config", async () => {
    const { port } = await servers.start(undefined, {
      config: {
        enabledProductFamilies: ["req", "repo"]
      }
    });

    const reqInit = await initializeSession(port, {
      path: "/mcp/req"
    });
    expect(reqInit.response.status).toBe(200);

    const pipelineInit = await initializeSession(port, {
      path: "/mcp/pipeline"
    });
    const pipelineBody = (await pipelineInit.response.json()) as { error?: string };

    expect(pipelineInit.response.status).toBe(404);
    expect(pipelineBody.error).toBe("Not found.");
  });

  it("rejects MCP requests from untrusted browser origins", async () => {
    const { port } = await servers.start();
    const initialized = await initializeSession(port, {
      headers: {
        origin: "https://evil.example"
      }
    });
    const body = (await initialized.response.json()) as {
      error?: string;
    };

    expect(initialized.response.status).toBe(403);
    expect(body.error).toBe("Origin is not allowed for MCP requests.");
    expect(initialized.sessionId).toBeNull();
  });

  it("allows MCP requests from configured browser origins", async () => {
    const { port } = await servers.start(undefined, {
      config: {
        httpAllowedOrigins: ["https://allowed.example"]
      }
    });
    const initialized = await initializeSession(port, {
      headers: {
        origin: "https://allowed.example"
      }
    });

    expect(initialized.response.status).toBe(200);
    expect(initialized.sessionId).toBeTruthy();
  });

  it("distinguishes missing and unknown MCP session IDs for POST requests", async () => {
    const { port } = await servers.start();

    const missingSessionResponse = await callTool(port, {
      id: "missing-session",
      name: "req_list_projects",
      arguments: {}
    });

    expect(missingSessionResponse.response.status).toBe(400);
    expect(missingSessionResponse.body).toEqual({
      error: "Missing MCP session ID."
    });

    const unknownSessionResponse = await callTool(port, {
      id: "unknown-session",
      name: "req_list_projects",
      arguments: {},
      sessionId: "unknown-session-id"
    });

    expect(unknownSessionResponse.response.status).toBe(404);
    expect(unknownSessionResponse.body).toEqual({
      error: "Unknown MCP session ID."
    });
  });

  it("distinguishes missing and unknown MCP session IDs for DELETE requests", async () => {
    const { port } = await servers.start();
    const missingSessionResponse = await fetch(`http://127.0.0.1:${port}/mcp/req`, {
      method: "DELETE"
    });
    const missingSessionBody = (await missingSessionResponse.json()) as {
      error?: string;
    };

    expect(missingSessionResponse.status).toBe(400);
    expect(missingSessionBody.error).toBe("Missing MCP session ID.");

    const unknownSessionResponse = await fetch(`http://127.0.0.1:${port}/mcp/req`, {
      method: "DELETE",
      headers: {
        "mcp-session-id": "unknown-session-id"
      }
    });
    const unknownSessionBody = (await unknownSessionResponse.json()) as {
      error?: string;
    };

    expect(unknownSessionResponse.status).toBe(404);
    expect(unknownSessionBody.error).toBe("Unknown MCP session ID.");
  });

  it("emits a structured request log after the response completes", async () => {
    const { logs, requestLogger } = createRequestLogCapture();
    const { port } = await servers.start(undefined, { requestLogger });
    const { response } = await fetchJsonFromTestServer<{ status: string }>(port, "/health");

    expect(response.status).toBe(200);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual(
      expect.objectContaining({
        method: "GET",
        path: "/health",
        statusCode: 200,
        durationMs: expect.any(Number),
        cacheHits: [],
        phaseTimings: [],
        upstreamRequestCount: 0,
        upstreamDurationMs: 0,
        upstreamStatusCodes: []
      })
    );
  });

  it("logs MCP tool metadata for tools/call requests", async () => {
    const { logs, requestLogger } = createRequestLogCapture();
    const { port } = await startConfiguredServer({ requestLogger });

    const { configured, sessionId } = await initializeConfiguredSession(port);

    expect(configured.response.status).toBe(200);
    expect(logs).toContainEqual(
      expect.objectContaining({
        method: "POST",
        path: "/mcp/req",
        statusCode: 200,
        mcpMethod: "tools/call",
        toolName: "auth_configure_session",
        sessionId
      })
    );
  });

  it("records initialize phase timings in the request log", async () => {
    const { logs, requestLogger } = createRequestLogCapture();
    const { port } = await startConfiguredServer({ requestLogger });
    const initialized = await initializeSession(port);

    expect(initialized.response.status).toBe(200);
    expect(logs).toContainEqual(
      expect.objectContaining({
        method: "POST",
        path: "/mcp/req",
        sessionId: initialized.sessionId,
        mcpMethod: "initialize",
        phaseTimings: expect.arrayContaining([
          expect.objectContaining({ name: "request_body_read", durationMs: expect.any(Number) }),
          expect.objectContaining({ name: "auth_resolve", durationMs: expect.any(Number) }),
          expect.objectContaining({ name: "transport_create", durationMs: expect.any(Number) }),
          expect.objectContaining({ name: "mcp_server_create", durationMs: expect.any(Number) }),
          expect.objectContaining({ name: "tool_registration", durationMs: expect.any(Number) }),
          expect.objectContaining({ name: "transport_connect", durationMs: expect.any(Number) })
        ])
      })
    );
  });

  it("sets an auth cookie after configure_session", async () => {
    const { authConfig, port } = await startConfiguredServer();
    const { initialized, configured, cookie } = await initializeConfiguredSession(port);

    expect(initialized.response.status).toBe(200);
    expect(configured.response.status).toBe(200);
    expect(cookie).toContain(
      `${authConfig.authCookieName}=`
    );
  });

  it("reuses cookie-backed auth after a reconnect", async () => {
    const { authConfig, port } = await startConfiguredServer();
    const { sessionId: firstSessionId, cookie } = await initializeConfiguredSession(port);

    expect(cookie).toContain(`${authConfig.authCookieName}=`);

    const reconnectInit = await initializeSession(port, {
      cookie: cookie ?? undefined
    });
    const reconnectSessionId = reconnectInit.sessionId;

    expect(reconnectSessionId).toBeTruthy();
    expect(reconnectSessionId).not.toBe(firstSessionId);

    const { response: clearResponse, body } = await clearSessionTool(port, {
      sessionId: reconnectSessionId ?? undefined,
      cookie: cookie ?? undefined
    });

    expect(clearResponse.status).toBe(200);
    expect(body.result?.structuredContent?.cleared).toBe(true);
    expect(clearResponse.headers.get("set-cookie")).toContain("Max-Age=0");
  });

  it("ignores query-token-backed auth by default", async () => {
    const { port } = await startConfiguredServer();
    const { sessionId: firstSessionId, authToken } = await initializeConfiguredSession(port);

    expect(authToken).toBeTruthy();

    const reconnectInit = await initializeSession(port, {
      queryToken: authToken
    });
    const reconnectSessionId = reconnectInit.sessionId;

    expect(reconnectSessionId).toBeTruthy();
    expect(reconnectSessionId).not.toBe(firstSessionId);

    const { response: clearResponse, body } = await callTool(port, {
      id: "list-projects",
      name: "req_list_projects",
      arguments: {},
      sessionId: reconnectSessionId ?? undefined,
      queryToken: authToken
    });

    expect(clearResponse.status).toBe(200);
    expect(body.result?.isError).toBe(true);
  });

  it("can opt in to query-token-backed auth for legacy clients", async () => {
    const authConfig = createTestHttpAuthConfig({ allowQueryAuthToken: true });
    const { port } = await servers.start(authConfig);
    const { sessionId: firstSessionId, authToken } = await initializeConfiguredSession(port);

    expect(authToken).toBeTruthy();

    const reconnectInit = await initializeSession(port, {
      queryToken: authToken
    });
    const reconnectSessionId = reconnectInit.sessionId;

    expect(reconnectSessionId).toBeTruthy();
    expect(reconnectSessionId).not.toBe(firstSessionId);

    const { response: clearResponse, body } = await clearSessionTool(port, {
      sessionId: reconnectSessionId ?? undefined,
      queryToken: authToken
    });

    expect(clearResponse.status).toBe(200);
    expect(body.result?.structuredContent?.cleared).toBe(true);
  });
});
