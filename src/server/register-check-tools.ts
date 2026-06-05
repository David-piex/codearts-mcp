import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createCheckClient } from "../products/check/client.js";
import {
  checkCreateRulesetInput,
  checkCreateTaskInput,
  checkCreatePdfAsyncJobInput,
  checkDeleteRulesetInput,
  checkDetectTaskLanguageInput,
  checkDownloadLogFileInput,
  checkExtractTaskAssistantSummaryInput,
  checkGetAsyncJobInput,
  checkGetAsyncJobV2Input,
  checkGetCriterionRuleInput,
  checkGetCriterionsetInput,
  checkGetMeasureDuplicationInfoInput,
  checkGetMeasureTotalInput,
  checkGetCodeHealthSvgInput,
  checkGetCodeSumMeasuresInput,
  checkGetDefectFileContentInput,
  checkGetDefectMetricTrendInput,
  checkGetDefectTaskMeasuresV1Input,
  checkGetDefectTaskStatisticsInput,
  checkGetDomainCheckersVersionInput,
  checkGetConsoleLogInput,
  checkGetMetricsInput,
  checkModifyCriterionsetRelationsInput,
  checkGetPdfFileInput,
  checkGetTaskPdfFileV1Input,
  checkGetProjectConfigInput,
  checkGetSingleDefectInput,
  checkGetTenantPackageStatusInput,
  checkGetTaskByIdInput,
  checkGetTaskCronInput,
  checkGetTaskInput,
  checkGetTaskIssueStatisticsInput,
  checkGetTaskLogDetailInput,
  checkGetTaskMeasuresInput,
  checkGetIssueFilterInput,
  checkGetTaskNotificationInput,
  checkGetTaskOwnerMatchingSwitchInput,
  checkUpdateTaskOwnerMatchingSwitchInput,
  checkGetTaskPreCheckScriptInput,
  checkGetTaskProgressInput,
  checkGetTaskResourcePoolInput,
  checkUpdateTaskResourcePoolInput,
  checkGetTaskRulesetCheckParametersV2Input,
  checkGetTaskRulesetCheckParametersV3Input,
  checkGetTaskSettingsInput,
  checkGetTaskWebhookInfoInput,
  checkGetTaskWebhookInfoV4Input,
  checkUpdateTaskWebhookInput,
  checkUpdateTaskConfigParametersInput,
  checkGetTransmissionNotificationInput,
  checkGetVpcepAuthorizationInput,
  checkListAllCriterionsetsInput,
  checkListConfigItemsInput,
  checkListCriterionFiltersInput,
  checkListCriterionsInput,
  checkListCriterionsetsByLanguageInput,
  checkListCodehubRepositoriesInput,
  checkListDefaultRulesetsInput,
  checkSetDefaultRulesetInput,
  checkListDefectNextStatusesInput,
  checkListIssuesByFilterInput,
  checkListMeasureFilesInput,
  checkListMeasureFilesV2Input,
  checkListTaskMeasureFilesV1Input,
  checkListRelatedDuplicateBlocksInput,
  checkListRelatedDuplicateBlocksV2Input,
  checkListPluginsInput,
  checkListProjectTaskGroupsInput,
  checkListRulesInput,
  checkListRulesetsInput,
  checkListRulesetRulesInput,
  checkListSupportedLanguagesInput,
  checkListTemplateTasksInput,
  checkListThirdToolsInput,
  checkListTaskAllFilesInput,
  checkListTaskAllFilesV4Input,
  checkListTaskBranchesInput,
  checkListTaskBranchesV4Input,
  checkListTaskCheckRecordsInput,
  checkListTaskCheckListInput,
  checkListTaskFileListV4Input,
  checkListTaskFilesInput,
  checkListTaskIssuesInput,
  checkListTaskJobsInput,
  checkListTaskJobsV4Input,
  checkListTaskLastJobsInput,
  checkListTaskLastJobsV4Input,
  checkListTaskPathTreeInput,
  checkListTaskRepositoryBranchesInput,
  checkListTaskRulesetsV2Input,
  checkListTaskRulesetsV3Input,
  checkListTasksInput,
  checkRunTaskInput,
  checkStopTaskInput,
  checkUpdateCheckModeInput,
  checkUpdateCodeGateInput,
  checkUpdateIgnoreFilesInput,
  checkUpdatePipelineTaskInput,
  checkUpdateIssueStatusInput
} from "../products/check/schemas.js";
import { createCheckCreateTaskHandler } from "../products/check/tools/create-task.js";
import { createCheckCreateRulesetHandler } from "../products/check/tools/create-ruleset.js";
import { createCheckCreatePdfAsyncJobHandler } from "../products/check/tools/create-pdf-async-job.js";
import { createCheckDeleteRulesetHandler } from "../products/check/tools/delete-ruleset.js";
import {
  createCheckDownloadLogFileHandler,
  createCheckExtractTaskAssistantSummaryHandler,
  createCheckGetAsyncJobHandler,
  createCheckGetAsyncJobV2Handler,
  createCheckGetDefectFileContentHandler,
  createCheckGetDefectMetricTrendHandler,
  createCheckGetMeasureDuplicationInfoHandler,
  createCheckGetMeasureTotalHandler,
  createCheckGetIssueFilterHandler,
  createCheckGetPdfFileHandler,
  createCheckGetProjectConfigHandler,
  createCheckGetSingleDefectHandler,
  createCheckGetTaskByIdHandler,
  createCheckGetTaskIssueStatisticsHandler,
  createCheckGetTaskMeasuresHandler,
  createCheckListMeasureFilesHandler,
  createCheckListMeasureFilesV2Handler,
  createCheckListIssuesByFilterHandler,
  createCheckListRelatedDuplicateBlocksHandler,
  createCheckListRelatedDuplicateBlocksV2Handler,
  createCheckListConfigItemsHandler,
  createCheckListDefectNextStatusesHandler
} from "../products/check/tools/additional-read-tools.js";
import {
  createCheckGetDefectTaskMeasuresV1Handler,
  createCheckGetTaskPdfFileV1Handler,
  createCheckListTaskMeasureFilesV1Handler
} from "../products/check/tools/official-v1-read-tools.js";
import {
  createCheckGetTaskWebhookInfoV4Handler,
  createCheckListTaskAllFilesV4Handler,
  createCheckListTaskBranchesV4Handler,
  createCheckListTaskFileListV4Handler,
  createCheckListTaskJobsV4Handler,
  createCheckListTaskLastJobsV4Handler
} from "../products/check/tools/official-v4-read-tools.js";
import { createCheckDetectTaskLanguageHandler } from "../products/check/tools/detect-task-language.js";
import { createCheckGetCriterionRuleHandler } from "../products/check/tools/get-criterion-rule.js";
import { createCheckGetCriterionsetHandler } from "../products/check/tools/get-criterionset.js";
import { createCheckGetCodeHealthSvgHandler } from "../products/check/tools/get-code-health-svg.js";
import { createCheckGetCodeSumMeasuresHandler } from "../products/check/tools/get-code-sum-measures.js";
import { createCheckGetDefectTaskStatisticsHandler } from "../products/check/tools/get-defect-task-statistics.js";
import { createCheckGetDomainCheckersVersionHandler } from "../products/check/tools/get-domain-checkers-version.js";
import { createCheckGetConsoleLogHandler } from "../products/check/tools/get-console-log.js";
import { createCheckGetMetricsHandler } from "../products/check/tools/get-metrics.js";
import { createCheckGetTenantPackageStatusHandler } from "../products/check/tools/get-tenant-package-status.js";
import { createCheckGetTaskHandler } from "../products/check/tools/get-task.js";
import { createCheckGetTaskCronHandler } from "../products/check/tools/get-task-cron.js";
import { createCheckGetTaskLogDetailHandler } from "../products/check/tools/get-task-log-detail.js";
import { createCheckGetTaskNotificationHandler } from "../products/check/tools/get-task-notification.js";
import { createCheckGetTaskOwnerMatchingSwitchHandler } from "../products/check/tools/get-task-owner-matching-switch.js";
import { createCheckUpdateTaskOwnerMatchingSwitchHandler } from "../products/check/tools/update-task-owner-matching-switch.js";
import { createCheckGetTaskPreCheckScriptHandler } from "../products/check/tools/get-task-pre-check-script.js";
import { createCheckGetTaskProgressHandler } from "../products/check/tools/get-task-progress.js";
import { createCheckGetTaskResourcePoolHandler } from "../products/check/tools/get-task-resource-pool.js";
import { createCheckUpdateTaskResourcePoolHandler } from "../products/check/tools/update-task-resource-pool.js";
import { createCheckGetTaskRulesetCheckParametersV2Handler } from "../products/check/tools/get-task-ruleset-check-parameters-v2.js";
import { createCheckGetTaskRulesetCheckParametersV3Handler } from "../products/check/tools/get-task-ruleset-check-parameters-v3.js";
import { createCheckGetTaskSettingsHandler } from "../products/check/tools/get-task-settings.js";
import { createCheckGetTaskWebhookInfoHandler } from "../products/check/tools/get-task-webhook-info.js";
import { createCheckUpdateTaskWebhookHandler } from "../products/check/tools/update-task-webhook.js";
import { createCheckUpdateTaskConfigParametersHandler } from "../products/check/tools/update-task-config-parameters.js";
import { createCheckGetTransmissionNotificationHandler } from "../products/check/tools/get-transmission-notification.js";
import { createCheckGetVpcepAuthorizationHandler } from "../products/check/tools/get-vpcep-authorization.js";
import { createCheckListAllCriterionsetsHandler } from "../products/check/tools/list-all-criterionsets.js";
import { createCheckListCriterionFiltersHandler } from "../products/check/tools/list-criterion-filters.js";
import { createCheckListCriterionsHandler } from "../products/check/tools/list-criterions.js";
import { createCheckListCriterionsetsByLanguageHandler } from "../products/check/tools/list-criterionsets-by-language.js";
import { createCheckListCodehubRepositoriesHandler } from "../products/check/tools/list-codehub-repositories.js";
import { createCheckListDefaultRulesetsHandler } from "../products/check/tools/list-default-rulesets.js";
import { createCheckSetDefaultRulesetHandler } from "../products/check/tools/set-default-ruleset.js";
import { createCheckListPluginsHandler } from "../products/check/tools/list-plugins.js";
import { createCheckListProjectTaskGroupsHandler } from "../products/check/tools/list-project-task-groups.js";
import { createCheckListRulesHandler } from "../products/check/tools/list-rules.js";
import { createCheckListRulesetsHandler } from "../products/check/tools/list-rulesets.js";
import { createCheckListRulesetRulesHandler } from "../products/check/tools/list-ruleset-rules.js";
import { createCheckListSupportedLanguagesHandler } from "../products/check/tools/list-supported-languages.js";
import { createCheckListTemplateTasksHandler } from "../products/check/tools/list-template-tasks.js";
import { createCheckListThirdToolsHandler } from "../products/check/tools/list-third-tools.js";
import { createCheckModifyCriterionsetRelationsHandler } from "../products/check/tools/modify-criterionset-relations.js";
import { createCheckListTaskAllFilesHandler } from "../products/check/tools/list-task-all-files.js";
import { createCheckListTaskBranchesHandler } from "../products/check/tools/list-task-branches.js";
import { createCheckListTaskCheckRecordsHandler } from "../products/check/tools/list-task-check-records.js";
import { createCheckListTaskCheckListHandler } from "../products/check/tools/list-task-check-list.js";
import { createCheckListTaskFilesHandler } from "../products/check/tools/list-task-files.js";
import { createCheckListTaskIssuesHandler } from "../products/check/tools/list-task-issues.js";
import { createCheckListTaskJobsHandler } from "../products/check/tools/list-task-jobs.js";
import { createCheckListTaskLastJobsHandler } from "../products/check/tools/list-task-last-jobs.js";
import { createCheckListTaskPathTreeHandler } from "../products/check/tools/list-task-path-tree.js";
import { createCheckListTaskRepositoryBranchesHandler } from "../products/check/tools/list-task-repository-branches.js";
import { createCheckListTaskRulesetsV2Handler } from "../products/check/tools/list-task-rulesets-v2.js";
import { createCheckListTaskRulesetsV3Handler } from "../products/check/tools/list-task-rulesets-v3.js";
import { createCheckListTasksHandler } from "../products/check/tools/list-tasks.js";
import { createCheckRunTaskHandler } from "../products/check/tools/run-task.js";
import { createCheckStopTaskHandler } from "../products/check/tools/stop-task.js";
import { createCheckUpdateCheckModeHandler } from "../products/check/tools/update-check-mode.js";
import { createCheckUpdateCodeGateHandler } from "../products/check/tools/update-code-gate.js";
import { createCheckUpdateIgnoreFilesHandler } from "../products/check/tools/update-ignore-files.js";
import { createCheckUpdateIssueStatusHandler } from "../products/check/tools/update-issue-status.js";
import { createCheckUpdatePipelineTaskHandler } from "../products/check/tools/update-pipeline-task.js";
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
  "check_create_ruleset": defineProductTool({
    description: "Create CodeArts Check ruleset",
    inputSchema: checkCreateRulesetInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckCreateRulesetHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckCreateRulesetHandler
  }),
  "check_delete_ruleset": defineProductTool({
    description: "Delete CodeArts Check ruleset",
    inputSchema: checkDeleteRulesetInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckDeleteRulesetHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckDeleteRulesetHandler
  }),
  "check_get_task": defineProductTool({
    description: "Get CodeArts Check task detail",
    inputSchema: checkGetTaskInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskHandler
  }),
  "check_get_task_by_id": defineProductTool({
    description: "Get CodeArts Check task by ID",
    inputSchema: checkGetTaskByIdInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskByIdHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskByIdHandler
  }),
  "check_get_task_resource_pool": defineProductTool({
    description: "Get CodeArts Check task resource pool",
    inputSchema: checkGetTaskResourcePoolInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskResourcePoolHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskResourcePoolHandler
  }),
  "check_update_task_resource_pool": defineProductTool({
    description: "Update CodeArts Check task resource pool",
    inputSchema: checkUpdateTaskResourcePoolInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateTaskResourcePoolHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateTaskResourcePoolHandler
  }),
  "check_list_task_jobs": defineProductTool({
    description: "List CodeArts Check task jobs",
    inputSchema: checkListTaskJobsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskJobsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskJobsHandler
  }),
  "check_list_task_jobs_v4": defineProductTool({
    description: "List CodeArts Check task jobs via official v4 API",
    inputSchema: checkListTaskJobsV4Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskJobsV4Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskJobsV4Handler
  }),
  "check_list_task_last_jobs": defineProductTool({
    description: "List CodeArts Check task last jobs",
    inputSchema: checkListTaskLastJobsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskLastJobsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskLastJobsHandler
  }),
  "check_list_task_last_jobs_v4": defineProductTool({
    description: "List CodeArts Check task last jobs via official v4 API",
    inputSchema: checkListTaskLastJobsV4Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskLastJobsV4Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskLastJobsV4Handler
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
  "check_update_task_owner_matching_switch": defineProductTool({
    description: "Update CodeArts Check task owner matching switch",
    inputSchema: checkUpdateTaskOwnerMatchingSwitchInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateTaskOwnerMatchingSwitchHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateTaskOwnerMatchingSwitchHandler
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
  "check_list_task_file_list_v4": defineProductTool({
    description: "List CodeArts Check task file list via official v4 API",
    inputSchema: checkListTaskFileListV4Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskFileListV4Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskFileListV4Handler
  }),
  "check_list_task_all_files": defineProductTool({
    description: "List CodeArts Check task all files",
    inputSchema: checkListTaskAllFilesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskAllFilesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskAllFilesHandler
  }),
  "check_list_task_all_files_v4": defineProductTool({
    description: "List CodeArts Check task all files via official v4 API",
    inputSchema: checkListTaskAllFilesV4Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskAllFilesV4Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskAllFilesV4Handler
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
  "check_set_default_ruleset": defineProductTool({
    description: "Set CodeArts Check default ruleset",
    inputSchema: checkSetDefaultRulesetInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckSetDefaultRulesetHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckSetDefaultRulesetHandler
  }),
  "check_list_supported_languages": defineProductTool({
    description: "List CodeArts Check supported languages",
    inputSchema: checkListSupportedLanguagesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListSupportedLanguagesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListSupportedLanguagesHandler
  }),
  "check_get_task_notification": defineProductTool({
    description: "Get CodeArts Check task notification settings",
    inputSchema: checkGetTaskNotificationInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskNotificationHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskNotificationHandler
  }),
  "check_get_code_sum_measures": defineProductTool({
    description: "Get CodeArts Check tenant code sum measures",
    inputSchema: checkGetCodeSumMeasuresInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetCodeSumMeasuresHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetCodeSumMeasuresHandler
  }),
  "check_list_plugins": defineProductTool({
    description: "List CodeArts Check plugins",
    inputSchema: checkListPluginsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListPluginsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListPluginsHandler
  }),
  "check_get_task_webhook_info": defineProductTool({
    description: "Get CodeArts Check task webhook info",
    inputSchema: checkGetTaskWebhookInfoInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskWebhookInfoHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskWebhookInfoHandler
  }),
  "check_get_task_webhook_info_v4": defineProductTool({
    description: "Get CodeArts Check task webhook info via official v4 API",
    inputSchema: checkGetTaskWebhookInfoV4Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskWebhookInfoV4Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskWebhookInfoV4Handler
  }),
  "check_update_task_webhook": defineProductTool({
    description: "Update CodeArts Check task webhook via official v4 API",
    inputSchema: checkUpdateTaskWebhookInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateTaskWebhookHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateTaskWebhookHandler
  }),
  "check_get_code_health_svg": defineProductTool({
    description: "Get CodeArts Check code health SVG",
    inputSchema: checkGetCodeHealthSvgInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetCodeHealthSvgHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetCodeHealthSvgHandler
  }),
  "check_list_task_repository_branches": defineProductTool({
    description: "List CodeArts Check task repository branches",
    inputSchema: checkListTaskRepositoryBranchesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskRepositoryBranchesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskRepositoryBranchesHandler
  }),
  "check_get_transmission_notification": defineProductTool({
    description: "Get CodeArts Check transmission notification settings",
    inputSchema: checkGetTransmissionNotificationInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTransmissionNotificationHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTransmissionNotificationHandler
  }),
  "check_get_tenant_package_status": defineProductTool({
    description: "Get CodeArts Check tenant package status",
    inputSchema: checkGetTenantPackageStatusInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTenantPackageStatusHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTenantPackageStatusHandler
  }),
  "check_list_template_tasks": defineProductTool({
    description: "List CodeArts Check template tasks",
    inputSchema: checkListTemplateTasksInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTemplateTasksHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTemplateTasksHandler
  }),
  "check_list_ruleset_rules": defineProductTool({
    description: "List CodeArts Check ruleset rules",
    inputSchema: checkListRulesetRulesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListRulesetRulesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListRulesetRulesHandler
  }),
  "check_list_criterionsets_by_language": defineProductTool({
    description: "List CodeArts Check criterionsets by language",
    inputSchema: checkListCriterionsetsByLanguageInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListCriterionsetsByLanguageHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListCriterionsetsByLanguageHandler
  }),
  "check_get_criterion_rule": defineProductTool({
    description: "Get CodeArts Check criterion rule",
    inputSchema: checkGetCriterionRuleInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetCriterionRuleHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetCriterionRuleHandler
  }),
  "check_list_third_tools": defineProductTool({
    description: "List CodeArts Check third tools",
    inputSchema: checkListThirdToolsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListThirdToolsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListThirdToolsHandler
  }),
  "check_get_criterionset": defineProductTool({
    description: "Get CodeArts Check criterionset",
    inputSchema: checkGetCriterionsetInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetCriterionsetHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetCriterionsetHandler
  }),
  "check_get_project_config": defineProductTool({
    description: "Get CodeArts Check project config template",
    inputSchema: checkGetProjectConfigInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetProjectConfigHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetProjectConfigHandler
  }),
  "check_list_config_items": defineProductTool({
    description: "List CodeArts Check config items for rulesets",
    inputSchema: checkListConfigItemsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListConfigItemsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListConfigItemsHandler
  }),
  "check_get_measure_total": defineProductTool({
    description: "Get CodeArts Check task measure total",
    inputSchema: checkGetMeasureTotalInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetMeasureTotalHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetMeasureTotalHandler
  }),
  "check_modify_criterionset_relations": defineProductTool({
    description: "Modify CodeArts Check criterionset rule relations",
    inputSchema: checkModifyCriterionsetRelationsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckModifyCriterionsetRelationsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckModifyCriterionsetRelationsHandler
  }),
  "check_list_all_criterionsets": defineProductTool({
    description: "List all CodeArts Check criterionsets",
    inputSchema: checkListAllCriterionsetsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListAllCriterionsetsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListAllCriterionsetsHandler
  }),
  "check_list_criterion_filters": defineProductTool({
    description: "List CodeArts Check criterion filters",
    inputSchema: checkListCriterionFiltersInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListCriterionFiltersHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListCriterionFiltersHandler
  }),
  "check_list_criterions": defineProductTool({
    description: "List CodeArts Check criterions",
    inputSchema: checkListCriterionsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListCriterionsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListCriterionsHandler
  }),
  "check_get_defect_task_statistics": defineProductTool({
    description: "Get CodeArts Check defect task statistics",
    inputSchema: checkGetDefectTaskStatisticsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetDefectTaskStatisticsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetDefectTaskStatisticsHandler
  }),
  "check_get_task_issue_statistics": defineProductTool({
    description: "Get CodeArts Check task issue statistics",
    inputSchema: checkGetTaskIssueStatisticsInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskIssueStatisticsHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskIssueStatisticsHandler
  }),
  "check_get_defect_metric_trend": defineProductTool({
    description: "Get CodeArts Check defect metric trend",
    inputSchema: checkGetDefectMetricTrendInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetDefectMetricTrendHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetDefectMetricTrendHandler
  }),
  "check_list_defect_next_statuses": defineProductTool({
    description: "List CodeArts Check defect next statuses",
    inputSchema: checkListDefectNextStatusesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListDefectNextStatusesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListDefectNextStatusesHandler
  }),
  "check_get_single_defect": defineProductTool({
    description: "Get CodeArts Check single defect detail",
    inputSchema: checkGetSingleDefectInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetSingleDefectHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetSingleDefectHandler
  }),
  "check_list_issues_by_filter": defineProductTool({
    description: "List CodeArts Check issues by filter",
    inputSchema: checkListIssuesByFilterInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListIssuesByFilterHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListIssuesByFilterHandler
  }),
  "check_get_issue_filter": defineProductTool({
    description: "Get CodeArts Check issue filter facets",
    inputSchema: checkGetIssueFilterInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetIssueFilterHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetIssueFilterHandler
  }),
  "check_get_async_job_v2": defineProductTool({
    description: "Get CodeArts Check async job V2 progress",
    inputSchema: checkGetAsyncJobV2Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetAsyncJobV2Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetAsyncJobV2Handler
  }),
  "check_get_async_job": defineProductTool({
    description: "Get CodeArts Check async job progress",
    inputSchema: checkGetAsyncJobInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetAsyncJobHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetAsyncJobHandler
  }),
  "check_get_pdf_file": defineProductTool({
    description: "Download CodeArts Check PDF report content",
    inputSchema: checkGetPdfFileInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetPdfFileHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetPdfFileHandler
  }),
  "check_get_task_pdf_file_v1": defineProductTool({
    description: "Download CodeArts Check task PDF file via official v1 API",
    inputSchema: checkGetTaskPdfFileV1Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskPdfFileV1Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskPdfFileV1Handler
  }),
  "check_extract_task_assistant_summary": defineProductTool({
    description: "Extract CodeArts Check task assistant summary",
    inputSchema: checkExtractTaskAssistantSummaryInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckExtractTaskAssistantSummaryHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckExtractTaskAssistantSummaryHandler
  }),
  "check_get_task_measures": defineProductTool({
    description: "Get CodeArts Check task measures",
    inputSchema: checkGetTaskMeasuresInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetTaskMeasuresHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetTaskMeasuresHandler
  }),
  "check_get_defect_task_measures_v1": defineProductTool({
    description: "Get CodeArts Check defect task measures via official v1 API",
    inputSchema: checkGetDefectTaskMeasuresV1Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetDefectTaskMeasuresV1Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetDefectTaskMeasuresV1Handler
  }),
  "check_list_measure_files": defineProductTool({
    description: "List CodeArts Check task measure files",
    inputSchema: checkListMeasureFilesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListMeasureFilesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListMeasureFilesHandler
  }),
  "check_list_task_measure_files_v1": defineProductTool({
    description: "List CodeArts Check task measure files via official v1 API",
    inputSchema: checkListTaskMeasureFilesV1Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskMeasureFilesV1Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskMeasureFilesV1Handler
  }),
  "check_list_measure_files_v2": defineProductTool({
    description: "List CodeArts Check task measure files V2",
    inputSchema: checkListMeasureFilesV2Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListMeasureFilesV2Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListMeasureFilesV2Handler
  }),
  "check_list_related_duplicate_blocks": defineProductTool({
    description: "List CodeArts Check related duplicate blocks",
    inputSchema: checkListRelatedDuplicateBlocksInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListRelatedDuplicateBlocksHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListRelatedDuplicateBlocksHandler
  }),
  "check_list_related_duplicate_blocks_v2": defineProductTool({
    description: "List CodeArts Check related duplicate blocks V2",
    inputSchema: checkListRelatedDuplicateBlocksV2Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListRelatedDuplicateBlocksV2Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListRelatedDuplicateBlocksV2Handler
  }),
  "check_get_measure_duplication_info": defineProductTool({
    description: "Get CodeArts Check measure duplication info",
    inputSchema: checkGetMeasureDuplicationInfoInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetMeasureDuplicationInfoHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetMeasureDuplicationInfoHandler
  }),
  "check_download_log_file": defineProductTool({
    description: "Get CodeArts Check log file content",
    inputSchema: checkDownloadLogFileInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckDownloadLogFileHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckDownloadLogFileHandler
  }),
  "check_get_defect_file_content": defineProductTool({
    description: "Get CodeArts Check defect source file content",
    inputSchema: checkGetDefectFileContentInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetDefectFileContentHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetDefectFileContentHandler
  }),
  "check_get_vpcep_authorization": defineProductTool({
    description: "Get CodeArts Check VPC endpoint authorization",
    inputSchema: checkGetVpcepAuthorizationInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckGetVpcepAuthorizationHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckGetVpcepAuthorizationHandler
  }),
  "check_list_task_check_list": defineProductTool({
    description: "List CodeArts Check task check list",
    inputSchema: checkListTaskCheckListInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskCheckListHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskCheckListHandler
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
  "check_update_task_config_parameters": defineProductTool({
    description: "Update CodeArts Check task config parameters",
    inputSchema: checkUpdateTaskConfigParametersInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateTaskConfigParametersHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateTaskConfigParametersHandler
  }),
  "check_list_task_branches": defineProductTool({
    description: "List CodeArts Check task branches",
    inputSchema: checkListTaskBranchesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskBranchesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskBranchesHandler
  }),
  "check_list_task_branches_v4": defineProductTool({
    description: "List CodeArts Check task branches via official v4 API",
    inputSchema: checkListTaskBranchesV4Input,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckListTaskBranchesV4Handler>[0] }) => clients.checkClient,
    createProductHandler: createCheckListTaskBranchesV4Handler
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
  }),
  "check_update_issue_status": defineProductTool({
    description: "Update CodeArts Check issue status",
    inputSchema: checkUpdateIssueStatusInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateIssueStatusHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateIssueStatusHandler
  }),
  "check_create_pdf_async_job": defineProductTool({
    description: "Create CodeArts Check PDF report async job",
    inputSchema: checkCreatePdfAsyncJobInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckCreatePdfAsyncJobHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckCreatePdfAsyncJobHandler
  }),
  "check_update_code_gate": defineProductTool({
    description: "Update CodeArts Check code gate configuration",
    inputSchema: checkUpdateCodeGateInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateCodeGateHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateCodeGateHandler
  }),
  "check_update_ignore_files": defineProductTool({
    description: "Update CodeArts Check ignored files",
    inputSchema: checkUpdateIgnoreFilesInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateIgnoreFilesHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateIgnoreFilesHandler
  }),
  "check_update_check_mode": defineProductTool({
    description: "Update CodeArts Check MR check mode",
    inputSchema: checkUpdateCheckModeInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdateCheckModeHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdateCheckModeHandler
  }),
  "check_update_pipeline_task": defineProductTool({
    description: "Update CodeArts Check pipeline task",
    inputSchema: checkUpdatePipelineTaskInput,
    selectHttpClient: (clients: { checkClient: Parameters<typeof createCheckUpdatePipelineTaskHandler>[0] }) => clients.checkClient,
    createProductHandler: createCheckUpdatePipelineTaskHandler
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
