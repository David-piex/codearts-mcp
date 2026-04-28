import type { AppConfig } from "../core/config/env.js";
import { collectManifestToolNames } from "./tool-manifest.js";

export function collectToolNames(): string[] {
  return collectManifestToolNames({ kind: "product" });
}

export function createServerInfo(config: Pick<AppConfig, "serverName" | "serverVersion">) {
  return {
    name: config.serverName,
    version: config.serverVersion
  };
}
