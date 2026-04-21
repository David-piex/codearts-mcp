import type { AppConfig, ServerMetadataConfig } from "../core/config/env.js";
import { buildClientsFromCredentialConfig } from "./auth-session-runtime.js";

export function buildStdioClients(options:
  | {
      mode: "stdio";
      config: AppConfig;
    }
  | {
      mode: "http";
      config: ServerMetadataConfig;
    }) {
  if (options.mode !== "stdio") {
    return undefined;
  }

  return buildClientsFromCredentialConfig({
    accessKey: options.config.accessKey,
    secretKey: options.config.secretKey,
    reqBaseUrl: options.config.reqBaseUrl,
    repoBaseUrl: options.config.repoBaseUrl,
    pipelineBaseUrl: options.config.pipelineBaseUrl,
    checkBaseUrl: options.config.checkBaseUrl,
    testPlanBaseUrl: options.config.testPlanBaseUrl,
    deployBaseUrl: options.config.deployBaseUrl,
    buildBaseUrl: options.config.buildBaseUrl,
    artifactBaseUrl: options.config.artifactBaseUrl,
    readCacheTtls: options.config.readCacheTtls
  });
}
