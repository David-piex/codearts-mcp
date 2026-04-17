import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadEnvConfig } from "../core/config/env.js";
import { createServer } from "./create-server.js";

export async function startStdioServer() {
  const server = createServer({ mode: "stdio", config: loadEnvConfig() });
  await server.connect(new StdioServerTransport());
}
