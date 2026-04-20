import { createServer as createNodeServer } from "node:http";
import { loadHttpAuthConfig, loadServerMetadataConfig } from "../core/config/env.js";
import { createHttpApp, type HttpRequestLogEntry } from "./http-app.js";

const HTTP_SERVER_KEEP_ALIVE_INITIAL_DELAY_MS = 1_000;
const HTTP_SERVER_KEEP_ALIVE_TIMEOUT_MS = 60_000;
const HTTP_SERVER_HEADERS_TIMEOUT_MS = 65_000;

type StartHttpServerDependencies = {
  createHttpApp?: typeof createHttpApp;
  createNodeServer?: typeof createNodeServer;
  loadServerMetadataConfig?: typeof loadServerMetadataConfig;
  loadHttpAuthConfig?: typeof loadHttpAuthConfig;
  requestLogger?: (entry: HttpRequestLogEntry) => void;
};

export async function startHttpServer(
  port?: number,
  dependencies: StartHttpServerDependencies = {}
) {
  const loadMetadata = dependencies.loadServerMetadataConfig ?? loadServerMetadataConfig;
  const metadata = loadMetadata();
  const resolvedPort = port ?? metadata.httpPort;
  const app = (dependencies.createHttpApp ?? createHttpApp)(
    metadata,
    (dependencies.loadHttpAuthConfig ?? loadHttpAuthConfig)(),
    {
      requestLogger:
        dependencies.requestLogger ??
        ((entry) => {
          console.info(JSON.stringify(entry));
        })
    }
  );
  const server = (dependencies.createNodeServer ?? createNodeServer)(
    {
      keepAlive: true,
      keepAliveInitialDelay: HTTP_SERVER_KEEP_ALIVE_INITIAL_DELAY_MS
    },
    app
  );
  server.keepAliveTimeout = HTTP_SERVER_KEEP_ALIVE_TIMEOUT_MS;
  server.headersTimeout = HTTP_SERVER_HEADERS_TIMEOUT_MS;
  server.requestTimeout = 0;
  server.maxRequestsPerSocket = 0;

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(resolvedPort, "0.0.0.0", () => {
      server.off("error", reject);
      resolve();
    });
  });

  return server;
}
