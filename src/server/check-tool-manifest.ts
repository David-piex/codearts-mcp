import { fileURLToPath } from "node:url";
import { createServer } from "./create-server.js";
import {
  collectManifestToolNames,
  collectProductToolManifest
} from "./tool-manifest.js";
import { createSessionCredentialStore } from "./session-store.js";

function readRegisteredToolNames(server: unknown) {
  const registeredTools = (server as { _registeredTools?: Record<string, unknown> })._registeredTools;

  return Object.keys(registeredTools ?? {}).sort();
}

function createManifestCheckStdioServer() {
  return createServer({
    mode: "stdio",
    config: {
      baseUrl: "https://codearts.cn-north-4.myhuaweicloud.com",
      region: "cn-north-4",
      accessKey: "manifest-check-ak",
      secretKey: "manifest-check-sk",
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      reqBaseUrl: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      repoBaseUrl: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
      pipelineBaseUrl: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
      checkBaseUrl: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
      testPlanBaseUrl: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
      deployBaseUrl: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
      buildBaseUrl: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
      artifactBaseUrl: "https://artifact.cn-north-4.myhuaweicloud.cn"
    }
  });
}

function createManifestCheckHttpServer() {
  return createServer({
    mode: "http",
    config: {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    },
    sessionStore: createSessionCredentialStore()
  });
}

function assertSameToolNames(label: string, actual: string[], expected: string[]) {
  if (actual.join("\n") === expected.join("\n")) {
    return;
  }

  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const missing = expected.filter((name) => !actualSet.has(name));
  const extra = actual.filter((name) => !expectedSet.has(name));

  throw new Error(
    [
      `${label} registered tools do not match the ToolManifest.`,
      missing.length ? `Missing: ${missing.join(", ")}` : undefined,
      extra.length ? `Extra: ${extra.join(", ")}` : undefined
    ]
      .filter(Boolean)
      .join("\n")
  );
}

export function checkToolManifestRegistration() {
  assertSameToolNames(
    "stdio",
    readRegisteredToolNames(createManifestCheckStdioServer()),
    collectProductToolManifest().map((entry) => entry.name)
  );
  assertSameToolNames(
    "http",
    readRegisteredToolNames(createManifestCheckHttpServer()),
    collectManifestToolNames({ mode: "http" })
  );
}

function main() {
  checkToolManifestRegistration();
  process.stdout.write("ToolManifest registration is in sync\n");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
