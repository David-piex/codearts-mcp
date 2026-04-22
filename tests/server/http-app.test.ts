import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  clearSessionTool,
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

  it("returns not ready when the auth persistence parent is invalid", async () => {
    const tempDir = mkdtempSync(join(tmpdir(), "codearts-mcp-ready-"));
    const parentFile = join(tempDir, "not-a-directory");
    writeFileSync(parentFile, "placeholder");

    const { port } = await servers.start({
      masterKey,
      authDataPath: join(parentFile, "auth-store.json"),
      authCookieName: "codearts_mcp_auth",
      authCookieSecure: false,
      authTokenTtlSeconds: 60
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

  it("reuses query-token-backed auth after a reconnect", async () => {
    const { port } = await startConfiguredServer();
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
