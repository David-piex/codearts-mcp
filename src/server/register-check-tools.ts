import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createCheckClient } from "../products/check/client.js";
import {
  checkCreateTaskInput,
  checkDetectTaskLanguageInput,
  checkGetDomainCheckersVersionInput,
  checkGetConsoleLogInput,
  checkGetMetricsInput,
  checkGetTaskCronInput,
  checkGetTaskInput,
  checkGetTaskLogDetailInput,
  checkGetTaskOwnerMatchingSwitchInput,
  checkGetTaskPreCheckScriptInput,
  checkGetTaskProgressInput,
  checkGetTaskResourcePoolInput,
  checkGetTaskRulesetCheckParametersV2Input,
  checkGetTaskRulesetCheckParametersV3Input,
  checkGetTaskSettingsInput,
  checkListCodehubRepositoriesInput,
  checkListDefaultRulesetsInput,
  checkListProjectTaskGroupsInput,
  checkListRulesInput,
  checkListRulesetsInput,
  checkListSupportedLanguagesInput,
  checkListTaskAllFilesInput,
  checkListTaskBranchesInput,
  checkListTaskCheckRecordsInput,
  checkListTaskFilesInput,
  checkListTaskIssuesInput,
  checkListTaskJobsInput,
  checkListTaskLastJobsInput,
  checkListTaskPathTreeInput,
  checkListTaskRulesetsV2Input,
  checkListTaskRulesetsV3Input,
  checkListTasksInput,
  checkRunTaskInput,
  checkStopTaskInput
} from "../products/check/schemas.js";
import { createCheckCreateTaskHandler } from "../products/check/tools/create-task.js";
import { createCheckDetectTaskLanguageHandler } from "../products/check/tools/detect-task-language.js";
import { createCheckGetDomainCheckersVersionHandler } from "../products/check/tools/get-domain-checkers-version.js";
import { createCheckGetConsoleLogHandler } from "../products/check/tools/get-console-log.js";
import { createCheckGetMetricsHandler } from "../products/check/tools/get-metrics.js";
import { createCheckGetTaskHandler } from "../products/check/tools/get-task.js";
import { createCheckGetTaskCronHandler } from "../products/check/tools/get-task-cron.js";
import { createCheckGetTaskLogDetailHandler } from "../products/check/tools/get-task-log-detail.js";
import { createCheckGetTaskOwnerMatchingSwitchHandler } from "../products/check/tools/get-task-owner-matching-switch.js";
import { createCheckGetTaskPreCheckScriptHandler } from "../products/check/tools/get-task-pre-check-script.js";
import { createCheckGetTaskProgressHandler } from "../products/check/tools/get-task-progress.js";
import { createCheckGetTaskResourcePoolHandler } from "../products/check/tools/get-task-resource-pool.js";
import { createCheckGetTaskRulesetCheckParametersV2Handler } from "../products/check/tools/get-task-ruleset-check-parameters-v2.js";
import { createCheckGetTaskRulesetCheckParametersV3Handler } from "../products/check/tools/get-task-ruleset-check-parameters-v3.js";
import { createCheckGetTaskSettingsHandler } from "../products/check/tools/get-task-settings.js";
import { createCheckListCodehubRepositoriesHandler } from "../products/check/tools/list-codehub-repositories.js";
import { createCheckListDefaultRulesetsHandler } from "../products/check/tools/list-default-rulesets.js";
import { createCheckListProjectTaskGroupsHandler } from "../products/check/tools/list-project-task-groups.js";
import { createCheckListRulesHandler } from "../products/check/tools/list-rules.js";
import { createCheckListRulesetsHandler } from "../products/check/tools/list-rulesets.js";
import { createCheckListSupportedLanguagesHandler } from "../products/check/tools/list-supported-languages.js";
import { createCheckListTaskAllFilesHandler } from "../products/check/tools/list-task-all-files.js";
import { createCheckListTaskBranchesHandler } from "../products/check/tools/list-task-branches.js";
import { createCheckListTaskCheckRecordsHandler } from "../products/check/tools/list-task-check-records.js";
import { createCheckListTaskFilesHandler } from "../products/check/tools/list-task-files.js";
import { createCheckListTaskIssuesHandler } from "../products/check/tools/list-task-issues.js";
import { createCheckListTaskJobsHandler } from "../products/check/tools/list-task-jobs.js";
import { createCheckListTaskLastJobsHandler } from "../products/check/tools/list-task-last-jobs.js";
import { createCheckListTaskPathTreeHandler } from "../products/check/tools/list-task-path-tree.js";
import { createCheckListTaskRulesetsV2Handler } from "../products/check/tools/list-task-rulesets-v2.js";
import { createCheckListTaskRulesetsV3Handler } from "../products/check/tools/list-task-rulesets-v3.js";
import { createCheckListTasksHandler } from "../products/check/tools/list-tasks.js";
import { createCheckRunTaskHandler } from "../products/check/tools/run-task.js";
import { createCheckStopTaskHandler } from "../products/check/tools/stop-task.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type CheckStdioClient = ReturnType<typeof createCheckClient>;

const checkToolDefinitions = {
  "check_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Check API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.checkClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
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
  "check_get_task_resource_pool": defineProductTool({
    description: "Get CodeArts Check task resource pool",
    inputSchema: checkGetTaskResourcePoolInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskResourcePoolHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskResourcePoolHandler
  }),
  "check_list_task_jobs": defineProductTool({
    description: "List CodeArts Check task jobs",
    inputSchema: checkListTaskJobsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskJobsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskJobsHandler
  }),
  "check_list_task_last_jobs": defineProductTool({
    description: "List CodeArts Check task last jobs",
    inputSchema: checkListTaskLastJobsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskLastJobsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskLastJobsHandler
  }),
  "check_get_task_pre_check_script": defineProductTool({
    description: "Get CodeArts Check task pre-check script",
    inputSchema: checkGetTaskPreCheckScriptInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskPreCheckScriptHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskPreCheckScriptHandler
  }),
  "check_get_task_owner_matching_switch": defineProductTool({
    description: "Get CodeArts Check task owner matching switch",
    inputSchema: checkGetTaskOwnerMatchingSwitchInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskOwnerMatchingSwitchHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskOwnerMatchingSwitchHandler
  }),
  "check_get_task_cron": defineProductTool({
    description: "Get CodeArts Check task cron",
    inputSchema: checkGetTaskCronInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskCronHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskCronHandler
  }),
  "check_list_project_task_groups": defineProductTool({
    description: "List CodeArts Check project task groups",
    inputSchema: checkListProjectTaskGroupsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListProjectTaskGroupsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListProjectTaskGroupsHandler
  }),
  "check_list_task_files": defineProductTool({
    description: "List CodeArts Check task files",
    inputSchema: checkListTaskFilesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskFilesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskFilesHandler
  }),
  "check_list_task_all_files": defineProductTool({
    description: "List CodeArts Check task all files",
    inputSchema: checkListTaskAllFilesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskAllFilesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskAllFilesHandler
  }),
  "check_detect_task_language": defineProductTool({
    description: "Detect CodeArts Check task language",
    inputSchema: checkDetectTaskLanguageInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckDetectTaskLanguageHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckDetectTaskLanguageHandler
  }),
  "check_list_codehub_repositories": defineProductTool({
    description: "List CodeArts Check CodeHub repositories",
    inputSchema: checkListCodehubRepositoriesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListCodehubRepositoriesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListCodehubRepositoriesHandler
  }),
  "check_get_domain_checkers_version": defineProductTool({
    description: "Get CodeArts Check domain checkers version",
    inputSchema: checkGetDomainCheckersVersionInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetDomainCheckersVersionHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetDomainCheckersVersionHandler
  }),
  "check_list_task_check_records": defineProductTool({
    description: "List CodeArts Check task check records",
    inputSchema: checkListTaskCheckRecordsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskCheckRecordsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskCheckRecordsHandler
  }),
  "check_list_rules": defineProductTool({
    description: "List CodeArts Check rules",
    inputSchema: checkListRulesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListRulesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListRulesHandler
  }),
  "check_list_default_rulesets": defineProductTool({
    description: "List CodeArts Check default rulesets",
    inputSchema: checkListDefaultRulesetsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListDefaultRulesetsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListDefaultRulesetsHandler
  }),
  "check_list_supported_languages": defineProductTool({
    description: "List CodeArts Check supported languages",
    inputSchema: checkListSupportedLanguagesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListSupportedLanguagesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListSupportedLanguagesHandler
  }),
  "check_get_task_progress": defineProductTool({
    description: "Get CodeArts Check task progress",
    inputSchema: checkGetTaskProgressInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskProgressHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskProgressHandler
  }),
  "check_get_task_log_detail": defineProductTool({
    description: "Get CodeArts Check task log detail",
    inputSchema: checkGetTaskLogDetailInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskLogDetailHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskLogDetailHandler
  }),
  "check_list_task_path_tree": defineProductTool({
    description: "List CodeArts Check task path tree nodes",
    inputSchema: checkListTaskPathTreeInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskPathTreeHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskPathTreeHandler
  }),
  "check_get_console_log": defineProductTool({
    description: "Get CodeArts Check console log",
    inputSchema: checkGetConsoleLogInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetConsoleLogHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetConsoleLogHandler
  }),
  "check_list_task_rulesets_v2": defineProductTool({
    description: "List CodeArts Check v2 task rulesets",
    inputSchema: checkListTaskRulesetsV2Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskRulesetsV2Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskRulesetsV2Handler
  }),
  "check_list_task_rulesets_v3": defineProductTool({
    description: "List CodeArts Check v3 task rulesets",
    inputSchema: checkListTaskRulesetsV3Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskRulesetsV3Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskRulesetsV3Handler
  }),
  "check_get_task_ruleset_check_parameters_v2": defineProductTool({
    description: "Get CodeArts Check v2 task ruleset check parameters",
    inputSchema: checkGetTaskRulesetCheckParametersV2Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskRulesetCheckParametersV2Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskRulesetCheckParametersV2Handler
  }),
  "check_get_task_ruleset_check_parameters_v3": defineProductTool({
    description: "Get CodeArts Check v3 task ruleset check parameters",
    inputSchema: checkGetTaskRulesetCheckParametersV3Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskRulesetCheckParametersV3Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskRulesetCheckParametersV3Handler
  }),
  "check_get_task_settings": defineProductTool({
    description: "Get CodeArts Check task settings",
    inputSchema: checkGetTaskSettingsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskSettingsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskSettingsHandler
  }),
  "check_list_task_branches": defineProductTool({
    description: "List CodeArts Check task branches",
    inputSchema: checkListTaskBranchesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskBranchesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskBranchesHandler
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
