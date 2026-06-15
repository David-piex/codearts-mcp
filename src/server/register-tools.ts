import type { ProductToolFamily } from "../contracts/product-families.js";
import type { AppConfig } from "../core/config/env.js";
import { collectManifestToolNames } from "./tool-manifest.js";

export function collectToolNames(options?: {
  families?: readonly ProductToolFamily[];
}): string[] {
  return collectManifestToolNames({ kind: "product", families: options?.families });
}

export function createServerInfo(config: Pick<AppConfig, "serverName" | "serverVersion">) {
  return {
    name: config.serverName,
    version: config.serverVersion
  };
}
