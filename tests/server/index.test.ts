import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import * as serverIndex from "../../src/server/index.js";

const runningProcesses: ChildProcess[] = [];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFreePort() {
  const server = createServer();

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Failed to allocate a free test port.");
  }

  const port = address.port;
  await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  return port;
}

async function waitForHealth(url: string, timeoutMs: number, child: ChildProcess) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`HTTP server process exited early with code ${child.exitCode}.`);
    }

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
    const port = await getFreePort();
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
        stdio: ["ignore", "pipe", "pipe"]
      }
    );
    runningProcesses.push(child);

    const response = await waitForHealth(`http://127.0.0.1:${port}/health`, 30000, child);
    const body = (await response.json()) as { status: string };

    expect(body.status).toBe("ok");
  }, 40000);
});
