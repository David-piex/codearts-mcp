import { createServer as createNodeServer } from "node:http";
import { loadServerMetadataConfig } from "../core/config/env.js";
import { createHttpApp } from "./http-app.js";

export async function startHttpServer(port = loadServerMetadataConfig().httpPort) {
  const app = createHttpApp();
  const server = createNodeServer(app);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "0.0.0.0", () => {
      server.off("error", reject);
      resolve();
    });
  });

  return server;
}
