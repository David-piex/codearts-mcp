import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildClientsFromCredentialConfig } from "./auth-session-runtime.js";
import { registerArtifactTool } from "./register-artifact-tools.js";
import { registerBuildTool } from "./register-build-tools.js";
import { registerCheckTool } from "./register-check-tools.js";
import { registerDeployTool } from "./register-deploy-tools.js";
import { registerPipelineTool } from "./register-pipeline-tools.js";
import { registerRepoTool } from "./register-repo-tools.js";
import { registerReqTool } from "./register-req-tools.js";
import { registerTestPlanTool } from "./register-testplan-tools.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";
import { findToolManifestEntry } from "./tool-manifest.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
export type ProductToolFamily =
  | "artifact"
  | "build"
  | "check"
  | "deploy"
  | "pipeline"
  | "repo"
  | "req"
  | "testplan";

export function resolveProductToolFamily(toolName: string): ProductToolFamily | undefined {
  const manifestEntry = findToolManifestEntry(toolName);

  if (manifestEntry?.kind === "product") {
    return manifestEntry.family;
  }

  return undefined;
}

export function registerProductTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClients?: ReturnType<typeof buildClientsFromCredentialConfig>;
  rateLimiter?: RateLimiter;
}) {
  switch (resolveProductToolFamily(options.toolName)) {
    case "artifact":
      return registerArtifactTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.artifactClient,
        rateLimiter: options.rateLimiter
      });
    case "build":
      return registerBuildTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.buildClient,
        rateLimiter: options.rateLimiter
      });
    case "check":
      return registerCheckTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.checkClient,
        rateLimiter: options.rateLimiter
      });
    case "deploy":
      return registerDeployTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.deployClient,
        rateLimiter: options.rateLimiter
      });
    case "pipeline":
      return registerPipelineTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.pipelineClient,
        rateLimiter: options.rateLimiter
      });
    case "repo":
      return registerRepoTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.repoClient,
        rateLimiter: options.rateLimiter
      });
    case "req":
      return registerReqTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.reqClient,
        rateLimiter: options.rateLimiter
      });
    case "testplan":
      return registerTestPlanTool({
        toolName: options.toolName,
        server: options.server,
        mode: options.mode,
        sessionStore: options.sessionStore,
        stdioClient: options.stdioClients?.testPlanClient,
        rateLimiter: options.rateLimiter
      });
    default:
      return false;
  }
}
