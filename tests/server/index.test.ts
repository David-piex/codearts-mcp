import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import * as serverIndex from "../../src/server/index.js";

const runningProcesses: ChildProcess[] = [];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(url: string, timeoutMs: number) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    } catch {
      // Keep polling until the timeout expires.
    }

    await sleep(200);
  }

  throw new Error(`Timed out waiting for health endpoint ${url}`);
}

describe("server index exports", () => {
  afterEach(async () => {
    for (const child of runningProcesses.splice(0)) {
      if (child.exitCode === null && !child.killed) {
        child.kill("SIGTERM");
      }
      await once(child, "exit").catch(() => undefined);
    }
  });

  it("exports main for deploy-oriented entry points", () => {
    expect(typeof serverIndex.main).toBe("function");
  });

  it("starts the HTTP server when executed as the entry module", async () => {
    const port = 3137;
    const tsxCli = join(process.cwd(), "node_modules", "tsx", "dist", "cli.mjs");
    const child = spawn(
      process.execPath,
      [tsxCli, "src/server/index.ts"],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          MCP_TRANSPORT: "http",
          MCP_HTTP_PORT: String(port),
          MCP_SERVER_NAME: "codearts-mcp",
          MCP_SERVER_VERSION: "0.1.0",
          MCP_AUTH_MASTER_KEY: "test-master-key-0123456789"
        },
        stdio: "ignore"
      }
    );
    runningProcesses.push(child);

    const response = await waitForHealth(`http://127.0.0.1:${port}/health`, 8000);
    const body = (await response.json()) as { status: string };

    expect(body.status).toBe("ok");
  }, 15000);
});
