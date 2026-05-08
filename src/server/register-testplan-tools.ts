import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import {
  testPlanBatchDeleteTasksInput,
  testPlanCreateTaskInput,
  testPlanCreateTaskRelationsInput,
  testPlanGetCaseInput,
  testPlanGetPlanInput,
  testPlanGetTaskInput,
  testPlanInitTaskExecutionInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListPlansInput,
  testPlanListRunsInput,
  testPlanListTaskCasesInput,
  testPlanListTaskResultsInput,
  testPlanListTasksInput,
  testPlanRunCasesInput,
  testPlanStopTaskExecutionInput,
  testPlanUpdateTaskInput
} from "../products/testplan/schemas.js";
import { createTestPlanBatchDeleteTasksHandler } from "../products/testplan/tools/batch-delete-tasks.js";
import { createTestPlanCreateTaskHandler } from "../products/testplan/tools/create-task.js";
import { createTestPlanCreateTaskRelationsHandler } from "../products/testplan/tools/create-task-relations.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanGetTaskHandler } from "../products/testplan/tools/get-task.js";
import { createTestPlanInitTaskExecutionHandler } from "../products/testplan/tools/init-task-execution.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListRunsHandler } from "../products/testplan/tools/list-runs.js";
import { createTestPlanListTaskCasesHandler } from "../products/testplan/tools/list-task-cases.js";
import { createTestPlanListTaskResultsHandler } from "../products/testplan/tools/list-task-results.js";
import { createTestPlanListTasksHandler } from "../products/testplan/tools/list-tasks.js";
import { createTestPlanRunCasesHandler } from "../products/testplan/tools/run-cases.js";
import { createTestPlanStopTaskExecutionHandler } from "../products/testplan/tools/stop-task-execution.js";
import { createTestPlanUpdateTaskHandler } from "../products/testplan/tools/update-task.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type TestPlanStdioClient = ReturnType<typeof createTestPlanClient>;

const testPlanToolDefinitions = {
  "testplan_request_official_api": defineProductTool({
    description: "Request a documented CodeArts TestPlan API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "testplan_list_plans": defineProductTool({
    description: "List CodeArts TestPlan plans",
    inputSchema: testPlanListPlansInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListPlansHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListPlansHandler
  }),
  "testplan_get_plan": defineProductTool({
    description: "Get CodeArts TestPlan plan detail",
    inputSchema: testPlanGetPlanInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetPlanHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetPlanHandler
  }),
  "testplan_get_case": defineProductTool({
    description: "Get CodeArts TestPlan case detail",
    inputSchema: testPlanGetCaseInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCaseHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCaseHandler
  }),
  "testplan_list_cases": defineProductTool({
    description: "List CodeArts TestPlan cases",
    inputSchema: testPlanListCasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListCasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListCasesHandler
  }),
  "testplan_list_issues": defineProductTool({
    description: "List CodeArts TestPlan requirement tree",
    inputSchema: testPlanListIssuesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIssuesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIssuesHandler
  }),
  "testplan_list_runs": defineProductTool({
    description: "List CodeArts TestPlan runs",
    inputSchema: testPlanListRunsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListRunsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListRunsHandler
  }),
  "testplan_list_tasks": defineProductTool({
    description: "List CodeArts TestPlan test suite tasks",
    inputSchema: testPlanListTasksInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTasksHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTasksHandler
  }),
  "testplan_get_task": defineProductTool({
    description: "Get CodeArts TestPlan test suite task detail",
    inputSchema: testPlanGetTaskInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTaskHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTaskHandler
  }),
  "testplan_create_task": defineProductTool({
    description: "Create CodeArts TestPlan test suite task",
    inputSchema: testPlanCreateTaskInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCreateTaskHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCreateTaskHandler
  }),
  "testplan_create_task_relations": defineProductTool({
    description: "Create CodeArts TestPlan task and case relations",
    inputSchema: testPlanCreateTaskRelationsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCreateTaskRelationsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCreateTaskRelationsHandler
  }),
  "testplan_update_task": defineProductTool({
    description: "Update CodeArts TestPlan test suite task",
    inputSchema: testPlanUpdateTaskInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanUpdateTaskHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanUpdateTaskHandler
  }),
  "testplan_batch_delete_tasks": defineProductTool({
    description: "Batch delete CodeArts TestPlan test suite tasks",
    inputSchema: testPlanBatchDeleteTasksInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanBatchDeleteTasksHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanBatchDeleteTasksHandler
  }),
  "testplan_list_task_cases": defineProductTool({
    description: "List CodeArts TestPlan cases assigned to a test suite task",
    inputSchema: testPlanListTaskCasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTaskCasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTaskCasesHandler
  }),
  "testplan_list_task_results": defineProductTool({
    description: "List CodeArts TestPlan test suite task execution results",
    inputSchema: testPlanListTaskResultsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTaskResultsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTaskResultsHandler
  }),
  "testplan_init_task_execution": defineProductTool({
    description: "Initialize CodeArts TestPlan test suite task execution",
    inputSchema: testPlanInitTaskExecutionInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanInitTaskExecutionHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanInitTaskExecutionHandler
  }),
  "testplan_stop_task_execution": defineProductTool({
    description: "Stop CodeArts TestPlan test suite task execution",
    inputSchema: testPlanStopTaskExecutionInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanStopTaskExecutionHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanStopTaskExecutionHandler
  }),
  "testplan_run_cases": defineProductTool({
    description: "Run CodeArts TestPlan cases",
    inputSchema: testPlanRunCasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanRunCasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanRunCasesHandler
  })
} as const;

export function registerTestPlanTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: TestPlanStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: testPlanToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
