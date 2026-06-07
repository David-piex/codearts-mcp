import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  clearSessionTool,
  callTool,
  createTestHttpServerRegistry,
  createTestHttpAuthConfig,
  fetchJsonFromTestServer,
  initializeConfiguredSession,
  initializeSession
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

  it("rejects GET /mcp because this deployment only supports JSON-over-POST MCP requests", async () => {
    const { port } = await servers.start();
    const response = await fetch(`http://127.0.0.1:${port}/mcp`);
    const body = (await response.json()) as {
      error?: string;
    };

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST, DELETE");
    expect(body.error).toContain("GET /mcp SSE is not supported");
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
    const missingSessionResponse = await fetch(`http://127.0.0.1:${port}/mcp`, {
      method: "DELETE"
    });
    const missingSessionBody = (await missingSessionResponse.json()) as {
      error?: string;
    };

    expect(missingSessionResponse.status).toBe(400);
    expect(missingSessionBody.error).toBe("Missing MCP session ID.");

    const unknownSessionResponse = await fetch(`http://127.0.0.1:${port}/mcp`, {
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
        path: "/mcp",
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
        path: "/mcp",
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
