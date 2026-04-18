import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { loadServerMetadataConfig, type ServerMetadataConfig } from "../core/config/env.js";
import { createServer } from "./create-server.js";
import { createSessionCredentialStore } from "./session-store.js";

type SessionTransportMap = Record<string, StreamableHTTPServerTransport>;

function writeJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createHttpApp(config = loadServerMetadataConfig()) {
  const transports: SessionTransportMap = {};
  const sessionStore = createSessionCredentialStore();

  return async (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url || !req.method) {
      writeJson(res, 400, { error: "Invalid request." });
      return;
    }

    const url = new URL(req.url, "http://127.0.0.1");

    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      writeJson(res, 200, { status: "ok" });
      return;
    }

    if (url.pathname !== "/mcp") {
      writeJson(res, 404, { error: "Not found." });
      return;
    }

    const sessionIdHeader = req.headers["mcp-session-id"];
    const sessionId = Array.isArray(sessionIdHeader) ? sessionIdHeader[0] : sessionIdHeader;

    try {
      if (req.method === "POST") {
        const parsedBody = await readJsonBody(req);
        let transport = sessionId ? transports[sessionId] : undefined;

        if (!transport) {
          if (!parsedBody || !isInitializeRequest(parsedBody)) {
            writeJson(res, 400, { error: "Missing or invalid MCP session." });
            return;
          }

          transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (newSessionId) => {
              transports[newSessionId] = transport!;
            },
            onsessionclosed: (closedSessionId) => {
              delete transports[closedSessionId];
              sessionStore.clear(closedSessionId);
            }
          });

          const server = createServer({ mode: "http", config, sessionStore });
          await server.connect(transport);
        }

        await transport.handleRequest(req, res, parsedBody);
        return;
      }

      if (req.method === "GET") {
        if (!sessionId || !transports[sessionId]) {
          writeJson(res, 400, { error: "Invalid or missing session ID." });
          return;
        }

        await transports[sessionId].handleRequest(req, res);
        return;
      }

      if (req.method === "DELETE") {
        if (!sessionId || !transports[sessionId]) {
          writeJson(res, 400, { error: "Invalid or missing session ID." });
          return;
        }

        await transports[sessionId].handleRequest(req, res);
        return;
      }

      writeJson(res, 405, { error: "Method not allowed." });
    } catch (error) {
      writeJson(res, 500, {
        error: error instanceof Error ? error.message : "Internal server error"
      });
    }
  };
}
