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

type RegisterableServer = Pick<McpServer, "registerTool">;

export function registerProductTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClients?: ReturnType<typeof buildClientsFromCredentialConfig>;
  rateLimiter?: RateLimiter;
}) {
  if (
    registerArtifactTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.artifactClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerBuildTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.buildClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerCheckTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.checkClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerDeployTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.deployClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerReqTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.reqClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerRepoTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.repoClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerPipelineTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.pipelineClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  if (
    registerTestPlanTool({
      toolName: options.toolName,
      server: options.server,
      mode: options.mode,
      sessionStore: options.sessionStore,
      stdioClient: options.stdioClients?.testPlanClient,
      rateLimiter: options.rateLimiter
    })
  ) {
    return true;
  }

  return false;
}
