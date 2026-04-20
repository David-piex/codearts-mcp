import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createCheckClient } from "../products/check/client.js";
import {
  checkCreateTaskInput,
  checkGetMetricsInput,
  checkGetTaskInput,
  checkListRulesetsInput,
  checkListTaskIssuesInput,
  checkListTasksInput,
  checkRunTaskInput,
  checkStopTaskInput
} from "../products/check/schemas.js";
import { createCheckCreateTaskHandler } from "../products/check/tools/create-task.js";
import { createCheckGetMetricsHandler } from "../products/check/tools/get-metrics.js";
import { createCheckGetTaskHandler } from "../products/check/tools/get-task.js";
import { createCheckListRulesetsHandler } from "../products/check/tools/list-rulesets.js";
import { createCheckListTaskIssuesHandler } from "../products/check/tools/list-task-issues.js";
import { createCheckListTasksHandler } from "../products/check/tools/list-tasks.js";
import { createCheckRunTaskHandler } from "../products/check/tools/run-task.js";
import { createCheckStopTaskHandler } from "../products/check/tools/stop-task.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type CheckStdioClient = ReturnType<typeof createCheckClient>;

const checkToolDefinitions = {
  "check_list_tasks": defineProductTool({
    description: "List CodeArts Check tasks",
    inputSchema: checkListTasksInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTasksHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTasksHandler
  }),
  "check_create_task": defineProductTool({
    description: "Create CodeArts Check task",
    inputSchema: checkCreateTaskInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckCreateTaskHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckCreateTaskHandler
  }),
  "check_get_task": defineProductTool({
    description: "Get CodeArts Check task detail",
    inputSchema: checkGetTaskInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskHandler
  }),
  "check_list_rulesets": defineProductTool({
    description: "List CodeArts Check rulesets",
    inputSchema: checkListRulesetsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListRulesetsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListRulesetsHandler
  }),
  "check_list_task_issues": defineProductTool({
    description: "List CodeArts Check task issues",
    inputSchema: checkListTaskIssuesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskIssuesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskIssuesHandler
  }),
  "check_get_metrics": defineProductTool({
    description: "Get CodeArts Check task metrics",
    inputSchema: checkGetMetricsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetMetricsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetMetricsHandler
  }),
  "check_run_task": defineProductTool({
    description: "Run CodeArts Check task",
    inputSchema: checkRunTaskInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckRunTaskHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckRunTaskHandler
  }),
  "check_stop_task": defineProductTool({
    description: "Stop CodeArts Check task",
    inputSchema: checkStopTaskInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckStopTaskHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckStopTaskHandler
  })
} as const;

export function registerCheckTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: CheckStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: checkToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
