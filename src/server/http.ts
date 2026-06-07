import { createServer as createNodeServer } from "node:http";
import { loadHttpAuthConfig, loadServerMetadataConfig } from "../core/config/env.js";
import {
  createHttpApp,
  type HttpApp,
  type HttpRequestLogEntry
} from "./http-app.js";
import { createStructuredLogger, type StructuredLogger } from "./logger.js";

const HTTP_SERVER_KEEP_ALIVE_INITIAL_DELAY_MS = 1_000;
const HTTP_SERVER_KEEP_ALIVE_TIMEOUT_MS = 60_000;
const HTTP_SERVER_HEADERS_TIMEOUT_MS = 65_000;

type StartHttpServerDependencies = {
  createHttpApp?: typeof createHttpApp;
  createNodeServer?: typeof createNodeServer;
  loadServerMetadataConfig?: typeof loadServerMetadataConfig;
  loadHttpAuthConfig?: typeof loadHttpAuthConfig;
  requestLogger?: (entry: HttpRequestLogEntry) => void;
  logger?: StructuredLogger;
};

export async function startHttpServer(
  port?: number,
  dependencies: StartHttpServerDependencies = {}
) {
  const loadMetadata = dependencies.loadServerMetadataConfig ?? loadServerMetadataConfig;
  const metadata = loadMetadata();
  const resolvedPort = port ?? metadata.httpPort;
  const resolvedHost = metadata.httpHost ?? "127.0.0.1";
  const logger =
    dependencies.logger ??
    createStructuredLogger({
      component: "http_server"
    });
  const app = (dependencies.createHttpApp ?? createHttpApp)(
    metadata,
    (dependencies.loadHttpAuthConfig ?? loadHttpAuthConfig)(),
    {
      requestLogger:
        dependencies.requestLogger ??
        ((entry) => {
          logger.info({
            event: "http_request_completed",
            message: "HTTP request completed",
            ...entry
          });
        })
    }
  );

  const prewarm = (app as HttpApp).prewarm;

  if (typeof prewarm === "function") {
    const startedAt = Date.now();
    const result = await prewarm();

    logger.info({
      event: "http_server_prewarm_completed",
      message: "HTTP server startup prewarm completed",
      durationMs: Date.now() - startedAt,
      warmedComponents: result?.warmedComponents ?? []
    });
  }

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
    server.listen(resolvedPort, resolvedHost, () => {
      server.off("error", reject);
      logger.info({
        event: "http_server_listening",
        message: "HTTP server listening",
        port: resolvedPort,
        host: resolvedHost
      });
      resolve();
    });
  });

  return server;
}
