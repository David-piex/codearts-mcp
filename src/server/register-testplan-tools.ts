import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import {
  testPlanBatchDeleteTasksInput,
  testPlanCreateTaskInput,
  testPlanCreateTaskRelationsInput,
  testPlanGetCaseTemplateInput,
  testPlanGetCaseInput,
  testPlanGetCustomTemplateInput,
  testPlanGetPlanInput,
  testPlanGetTestReportInput,
  testPlanGetTestcaseV4Input,
  testPlanGetTaskExecutionParamInput,
  testPlanGetTaskInput,
  testPlanGetTaskResultDetailInput,
  testPlanGetTaskSuccessTestCasesCountInput,
  testPlanInitTaskExecutionInput,
  testPlanListCustomReportsInput,
  testPlanListIteratorHistoriesInput,
  testPlanListIteratorIssuesInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListPlansInput,
  testPlanListProgressReportsInput,
  testPlanListRunsInput,
  testPlanListTaskCasesInput,
  testPlanListTaskCasesV4Input,
  testPlanListTaskResultsInput,
  testPlanListTasksInput,
  testPlanListTestTypesInput,
  testPlanListTestReportDefectsInput,
  testPlanListTestReportIssuesInput,
  testPlanListTestReportQualityAttributesInput,
  testPlanListTestcaseFieldsInput,
  testPlanListTesthubBranchesInput,
  testPlanListTesthubIteratorsInput,
  testPlanRunCasesInput,
  testPlanStopTaskExecutionInput,
  testPlanUpdateTaskInput
} from "../products/testplan/schemas.js";
import { createTestPlanBatchDeleteTasksHandler } from "../products/testplan/tools/batch-delete-tasks.js";
import { createTestPlanGetCaseTemplateHandler } from "../products/testplan/tools/get-case-template.js";
import { createTestPlanCreateTaskHandler } from "../products/testplan/tools/create-task.js";
import { createTestPlanCreateTaskRelationsHandler } from "../products/testplan/tools/create-task-relations.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetCustomTemplateHandler } from "../products/testplan/tools/get-custom-template.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanGetTestReportHandler } from "../products/testplan/tools/get-test-report.js";
import { createTestPlanGetTestcaseV4Handler } from "../products/testplan/tools/get-testcase-v4.js";
import { createTestPlanGetTaskExecutionParamHandler } from "../products/testplan/tools/get-task-execution-param.js";
import { createTestPlanGetTaskHandler } from "../products/testplan/tools/get-task.js";
import { createTestPlanGetTaskResultDetailHandler } from "../products/testplan/tools/get-task-result-detail.js";
import { createTestPlanGetTaskSuccessTestCasesCountHandler } from "../products/testplan/tools/get-task-success-testcases-count.js";
import { createTestPlanInitTaskExecutionHandler } from "../products/testplan/tools/init-task-execution.js";
import { createTestPlanListCustomReportsHandler } from "../products/testplan/tools/list-custom-reports.js";
import { createTestPlanListIteratorHistoriesHandler } from "../products/testplan/tools/list-iterator-histories.js";
import { createTestPlanListIteratorIssuesHandler } from "../products/testplan/tools/list-iterator-issues.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListProgressReportsHandler } from "../products/testplan/tools/list-progress-reports.js";
import { createTestPlanListRunsHandler } from "../products/testplan/tools/list-runs.js";
import { createTestPlanListTaskCasesHandler } from "../products/testplan/tools/list-task-cases.js";
import { createTestPlanListTaskCasesV4Handler } from "../products/testplan/tools/list-task-cases-v4.js";
import { createTestPlanListTaskResultsHandler } from "../products/testplan/tools/list-task-results.js";
import { createTestPlanListTasksHandler } from "../products/testplan/tools/list-tasks.js";
import { createTestPlanListTestTypesHandler } from "../products/testplan/tools/list-test-types.js";
import { createTestPlanListTestReportDefectsHandler } from "../products/testplan/tools/list-test-report-defects.js";
import { createTestPlanListTestReportIssuesHandler } from "../products/testplan/tools/list-test-report-issues.js";
import { createTestPlanListTestReportQualityAttributesHandler } from "../products/testplan/tools/list-test-report-quality-attributes.js";
import { createTestPlanListTestcaseFieldsHandler } from "../products/testplan/tools/list-testcase-fields.js";
import { createTestPlanListTesthubBranchesHandler } from "../products/testplan/tools/list-testhub-branches.js";
import { createTestPlanListTesthubIteratorsHandler } from "../products/testplan/tools/list-testhub-iterators.js";
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
  "testplan_get_testcase_v4": defineProductTool({
    description: "Get CodeArts TestPlan v4 testcase detail",
    inputSchema: testPlanGetTestcaseV4Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestcaseV4Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestcaseV4Handler
  }),
  "testplan_get_case_template": defineProductTool({
    description: "Get CodeArts TestPlan case template detail",
    inputSchema: testPlanGetCaseTemplateInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCaseTemplateHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCaseTemplateHandler
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
  "testplan_get_task_execution_param": defineProductTool({
    description: "Get CodeArts TestPlan test suite task execution parameters",
    inputSchema: testPlanGetTaskExecutionParamInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTaskExecutionParamHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTaskExecutionParamHandler
  }),
  "testplan_get_task_result_detail": defineProductTool({
    description: "Get CodeArts TestPlan single test suite execution result detail",
    inputSchema: testPlanGetTaskResultDetailInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTaskResultDetailHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTaskResultDetailHandler
  }),
  "testplan_get_task_success_testcases_count": defineProductTool({
    description: "Get CodeArts TestPlan successful testcase count under a test suite task",
    inputSchema: testPlanGetTaskSuccessTestCasesCountInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTaskSuccessTestCasesCountHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTaskSuccessTestCasesCountHandler
  }),
  "testplan_get_test_report": defineProductTool({
    description: "Get CodeArts TestPlan test report overview",
    inputSchema: testPlanGetTestReportInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestReportHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestReportHandler
  }),
  "testplan_get_custom_template": defineProductTool({
    description: "Get CodeArts TestPlan custom report template",
    inputSchema: testPlanGetCustomTemplateInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCustomTemplateHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCustomTemplateHandler
  }),
  "testplan_list_custom_reports": defineProductTool({
    description: "List CodeArts TestPlan custom reports",
    inputSchema: testPlanListCustomReportsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListCustomReportsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListCustomReportsHandler
  }),
  "testplan_list_progress_reports": defineProductTool({
    description: "List CodeArts TestPlan progress reports",
    inputSchema: testPlanListProgressReportsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProgressReportsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProgressReportsHandler
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
  "testplan_list_task_cases_v4": defineProductTool({
    description: "List CodeArts TestPlan v4 cases assigned to a test suite task",
    inputSchema: testPlanListTaskCasesV4Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTaskCasesV4Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTaskCasesV4Handler
  }),
  "testplan_list_task_results": defineProductTool({
    description: "List CodeArts TestPlan test suite task execution results",
    inputSchema: testPlanListTaskResultsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTaskResultsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTaskResultsHandler
  }),
  "testplan_list_testhub_branches": defineProductTool({
    description: "List CodeArts TestPlan TestHub branches",
    inputSchema: testPlanListTesthubBranchesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTesthubBranchesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTesthubBranchesHandler
  }),
  "testplan_list_testhub_iterators": defineProductTool({
    description: "List CodeArts TestPlan TestHub iterators",
    inputSchema: testPlanListTesthubIteratorsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTesthubIteratorsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTesthubIteratorsHandler
  }),
  "testplan_list_iterator_issues": defineProductTool({
    description: "List CodeArts TestPlan issues under a TestHub iterator",
    inputSchema: testPlanListIteratorIssuesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIteratorIssuesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIteratorIssuesHandler
  }),
  "testplan_list_iterator_histories": defineProductTool({
    description: "List CodeArts TestPlan operation histories under a TestHub iterator",
    inputSchema: testPlanListIteratorHistoriesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIteratorHistoriesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIteratorHistoriesHandler
  }),
  "testplan_list_test_report_issues": defineProductTool({
    description: "List CodeArts TestPlan test report requirement issue details",
    inputSchema: testPlanListTestReportIssuesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestReportIssuesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestReportIssuesHandler
  }),
  "testplan_list_test_report_defects": defineProductTool({
    description: "List CodeArts TestPlan test report defect details",
    inputSchema: testPlanListTestReportDefectsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestReportDefectsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestReportDefectsHandler
  }),
  "testplan_list_test_report_quality_attributes": defineProductTool({
    description: "List CodeArts TestPlan test report quality attributes",
    inputSchema: testPlanListTestReportQualityAttributesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestReportQualityAttributesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestReportQualityAttributesHandler
  }),
  "testplan_list_testcase_fields": defineProductTool({
    description: "List CodeArts TestPlan testcase fields",
    inputSchema: testPlanListTestcaseFieldsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestcaseFieldsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestcaseFieldsHandler
  }),
  "testplan_list_test_types": defineProductTool({
    description: "List CodeArts TestPlan test types",
    inputSchema: testPlanListTestTypesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestTypesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestTypesHandler
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
