import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import {
  testPlanGetCaseInput,
  testPlanGetPlanInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListPlansInput,
  testPlanListRunsInput,
  testPlanRunCasesInput
} from "../products/testplan/schemas.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListRunsHandler } from "../products/testplan/tools/list-runs.js";
import { createTestPlanRunCasesHandler } from "../products/testplan/tools/run-cases.js";
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
