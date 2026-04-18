import { once } from "node:events";
import { createServer } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createHttpApp } from "../../src/server/http-app.js";

describe("http app", () => {
  const servers: Array<ReturnType<typeof createServer>> = [];

  afterEach(async () => {
    for (const server of servers.splice(0)) {
      server.close();
      await once(server, "close");
    }
  });

  it("serves the health endpoint", async () => {
    const app = createHttpApp({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    });
    const server = createServer(app);
    servers.push(server);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected an address info object");
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = (await response.json()) as { status: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("returns ok on the root path for deploy health probes", async () => {
    const app = createHttpApp({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    });
    const server = createServer(app);
    servers.push(server);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected an address info object");
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/`);
    const body = (await response.json()) as { status: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });
});
