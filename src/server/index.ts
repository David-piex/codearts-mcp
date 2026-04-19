import { pathToFileURL } from "node:url";
import { startHttpServer } from "./http.js";
import { startStdioServer } from "./stdio.js";

export type ServerMode = "stdio" | "http";

export function resolveServerMode(source: Record<string, string | undefined> = process.env): ServerMode {
  return source.MCP_TRANSPORT === "http" ? "http" : "stdio";
}

async function main() {
  const mode = resolveServerMode();

  if (mode === "http") {
    await startHttpServer();
    return;
  }

  await startStdioServer();
}

export { main };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main();
}
