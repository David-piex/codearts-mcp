import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import {
  testPlanBatchDeleteTasksInput,
  testPlanCheckUserExistsInput,
  testPlanCreateTaskInput,
  testPlanCreateTaskRelationsInput,
  testPlanGetDomainFrozenInfoInput,
  testPlanGetDomainNeedPopupInput,
  testPlanGetCaseTemplateInput,
  testPlanGetCaseInput,
  testPlanGetCurrentUserPackagePermissionInput,
  testPlanGetCustomTemplateInput,
  testPlanGetCustomizedColumnsInput,
  testPlanGetDomainUserCountInput,
  testPlanGetIteratorInput,
  testPlanGetPlanInput,
  testPlanGetProjectAdvancedFeatureTrialInput,
  testPlanGetProjectAdvancedFeatureTrustedInput,
  testPlanGetProjectDomainDetailInfoInput,
  testPlanGetProjectIssueUpdateNotificationInput,
  testPlanGetProjectMasterVersionInput,
  testPlanGetProjectMessageNoticesInput,
  testPlanGetRuleCheckTaskReportInput,
  testPlanGetRuleCheckTaskSummaryInput,
  testPlanGetTestReportInput,
  testPlanGetTestcaseV4Input,
  testPlanGetTesthubCaseByNumberInput,
  testPlanGetTesthubCaseInput,
  testPlanGetTaskExecutionParamInput,
  testPlanGetTaskInput,
  testPlanGetTaskResultDetailInput,
  testPlanGetTaskSuccessTestCasesCountInput,
  testPlanGetUserDisclaimerInput,
  testPlanGetUserPackagePermissionInput,
  testPlanInitTaskExecutionInput,
  testPlanListAttachmentsInput,
  testPlanListCustomReportsInput,
  testPlanListCustomTemplateReportsInput,
  testPlanListIteratorHistoriesInput,
  testPlanListIteratorIssuesInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListPlansInput,
  testPlanListProjectFieldConfigsInput,
  testPlanListProjectTagsInput,
  testPlanListProjectUsersInput,
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
  testPlanListTesthubIteratorsV5Input,
  testPlanListTesthubServicesInput,
  testPlanListTestReportsInput,
  testPlanRunCasesInput,
  testPlanStopTaskExecutionInput,
  testPlanUpdateTaskInput
} from "../products/testplan/schemas.js";
import { createTestPlanCheckUserExistsHandler } from "../products/testplan/tools/check-user-exists.js";
import { createTestPlanBatchDeleteTasksHandler } from "../products/testplan/tools/batch-delete-tasks.js";
import { createTestPlanGetCaseTemplateHandler } from "../products/testplan/tools/get-case-template.js";
import { createTestPlanCreateTaskHandler } from "../products/testplan/tools/create-task.js";
import { createTestPlanCreateTaskRelationsHandler } from "../products/testplan/tools/create-task-relations.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetCustomTemplateHandler } from "../products/testplan/tools/get-custom-template.js";
import { createTestPlanGetCurrentUserPackagePermissionHandler } from "../products/testplan/tools/get-current-user-package-permission.js";
import { createTestPlanGetCustomizedColumnsHandler } from "../products/testplan/tools/get-customized-columns.js";
import { createTestPlanGetDomainFrozenInfoHandler } from "../products/testplan/tools/get-domain-frozen-info.js";
import { createTestPlanGetDomainNeedPopupHandler } from "../products/testplan/tools/get-domain-need-popup.js";
import { createTestPlanGetDomainUserCountHandler } from "../products/testplan/tools/get-domain-user-count.js";
import { createTestPlanGetIteratorHandler } from "../products/testplan/tools/get-iterator.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanGetProjectAdvancedFeatureTrialHandler } from "../products/testplan/tools/get-project-advanced-feature-trial.js";
import { createTestPlanGetProjectAdvancedFeatureTrustedHandler } from "../products/testplan/tools/get-project-advanced-feature-trusted.js";
import { createTestPlanGetProjectDomainDetailInfoHandler } from "../products/testplan/tools/get-project-domain-detail-info.js";
import { createTestPlanGetProjectIssueUpdateNotificationHandler } from "../products/testplan/tools/get-project-issue-update-notification.js";
import { createTestPlanGetProjectMasterVersionHandler } from "../products/testplan/tools/get-project-master-version.js";
import { createTestPlanGetProjectMessageNoticesHandler } from "../products/testplan/tools/get-project-message-notices.js";
import { createTestPlanGetRuleCheckTaskReportHandler } from "../products/testplan/tools/get-rule-check-task-report.js";
import { createTestPlanGetRuleCheckTaskSummaryHandler } from "../products/testplan/tools/get-rule-check-task-summary.js";
import { createTestPlanGetTestReportHandler } from "../products/testplan/tools/get-test-report.js";
import { createTestPlanGetTestcaseV4Handler } from "../products/testplan/tools/get-testcase-v4.js";
import { createTestPlanGetTesthubCaseByNumberHandler } from "../products/testplan/tools/get-testhub-case-by-number.js";
import { createTestPlanGetTesthubCaseHandler } from "../products/testplan/tools/get-testhub-case.js";
import { createTestPlanGetTaskExecutionParamHandler } from "../products/testplan/tools/get-task-execution-param.js";
import { createTestPlanGetTaskHandler } from "../products/testplan/tools/get-task.js";
import { createTestPlanGetTaskResultDetailHandler } from "../products/testplan/tools/get-task-result-detail.js";
import { createTestPlanGetTaskSuccessTestCasesCountHandler } from "../products/testplan/tools/get-task-success-testcases-count.js";
import { createTestPlanGetUserDisclaimerHandler } from "../products/testplan/tools/get-user-disclaimer.js";
import { createTestPlanGetUserPackagePermissionHandler } from "../products/testplan/tools/get-user-package-permission.js";
import { createTestPlanInitTaskExecutionHandler } from "../products/testplan/tools/init-task-execution.js";
import { createTestPlanListAttachmentsHandler } from "../products/testplan/tools/list-attachments.js";
import { createTestPlanListCustomReportsHandler } from "../products/testplan/tools/list-custom-reports.js";
import { createTestPlanListCustomTemplateReportsHandler } from "../products/testplan/tools/list-custom-template-reports.js";
import { createTestPlanListIteratorHistoriesHandler } from "../products/testplan/tools/list-iterator-histories.js";
import { createTestPlanListIteratorIssuesHandler } from "../products/testplan/tools/list-iterator-issues.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListProjectFieldConfigsHandler } from "../products/testplan/tools/list-project-field-configs.js";
import { createTestPlanListProjectTagsHandler } from "../products/testplan/tools/list-project-tags.js";
import { createTestPlanListProjectUsersHandler } from "../products/testplan/tools/list-project-users.js";
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
import { createTestPlanListTesthubIteratorsV5Handler } from "../products/testplan/tools/list-testhub-iterators-v5.js";
import { createTestPlanListTesthubServicesHandler } from "../products/testplan/tools/list-testhub-services.js";
import { createTestPlanListTestReportsHandler } from "../products/testplan/tools/list-test-reports.js";
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
  "testplan_get_iterator": defineProductTool({
    description: "Get CodeArts TestPlan iterator detail with summary statistics",
    inputSchema: testPlanGetIteratorInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetIteratorHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetIteratorHandler
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
  "testplan_get_testhub_case": defineProductTool({
    description: "Get CodeArts TestPlan TestHub testcase detail",
    inputSchema: testPlanGetTesthubCaseInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTesthubCaseHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTesthubCaseHandler
  }),
  "testplan_get_testhub_case_by_number": defineProductTool({
    description: "Get CodeArts TestPlan TestHub testcase detail by testcase number",
    inputSchema: testPlanGetTesthubCaseByNumberInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTesthubCaseByNumberHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTesthubCaseByNumberHandler
  }),
  "testplan_get_current_user_package_permission": defineProductTool({
    description: "Get CodeArts TestPlan package permission for the current user",
    inputSchema: testPlanGetCurrentUserPackagePermissionInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCurrentUserPackagePermissionHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCurrentUserPackagePermissionHandler
  }),
  "testplan_get_user_package_permission": defineProductTool({
    description: "Get CodeArts TestPlan package permission for a project user",
    inputSchema: testPlanGetUserPackagePermissionInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetUserPackagePermissionHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetUserPackagePermissionHandler
  }),
  "testplan_get_domain_user_count": defineProductTool({
    description: "Get CodeArts TestPlan domain user count for a project",
    inputSchema: testPlanGetDomainUserCountInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetDomainUserCountHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetDomainUserCountHandler
  }),
  "testplan_get_customized_columns": defineProductTool({
    description: "Get CodeArts TestPlan customized column configuration",
    inputSchema: testPlanGetCustomizedColumnsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCustomizedColumnsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCustomizedColumnsHandler
  }),
  "testplan_get_project_domain_detail_info": defineProductTool({
    description: "Get CodeArts TestPlan project domain detail information",
    inputSchema: testPlanGetProjectDomainDetailInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectDomainDetailInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectDomainDetailInfoHandler
  }),
  "testplan_get_project_advanced_feature_trial": defineProductTool({
    description: "Get CodeArts TestPlan project advanced feature trial status",
    inputSchema: testPlanGetProjectAdvancedFeatureTrialInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectAdvancedFeatureTrialHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectAdvancedFeatureTrialHandler
  }),
  "testplan_get_project_advanced_feature_trusted": defineProductTool({
    description: "Get CodeArts TestPlan project advanced feature trusted status",
    inputSchema: testPlanGetProjectAdvancedFeatureTrustedInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectAdvancedFeatureTrustedHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectAdvancedFeatureTrustedHandler
  }),
  "testplan_get_domain_frozen_info": defineProductTool({
    description: "Get CodeArts TestPlan domain frozen status information",
    inputSchema: testPlanGetDomainFrozenInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetDomainFrozenInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetDomainFrozenInfoHandler
  }),
  "testplan_get_domain_need_popup": defineProductTool({
    description: "Get CodeArts TestPlan domain popup reminder status",
    inputSchema: testPlanGetDomainNeedPopupInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetDomainNeedPopupHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetDomainNeedPopupHandler
  }),
  "testplan_get_user_disclaimer": defineProductTool({
    description: "Get CodeArts TestPlan current user disclaimer record",
    inputSchema: testPlanGetUserDisclaimerInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetUserDisclaimerHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetUserDisclaimerHandler
  }),
  "testplan_check_user_exists": defineProductTool({
    description: "Check whether the current user has used CodeArts TestPlan",
    inputSchema: testPlanCheckUserExistsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckUserExistsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckUserExistsHandler
  }),
  "testplan_get_project_message_notices": defineProductTool({
    description: "Get CodeArts TestPlan project message notice configurations",
    inputSchema: testPlanGetProjectMessageNoticesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectMessageNoticesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectMessageNoticesHandler
  }),
  "testplan_get_project_issue_update_notification": defineProductTool({
    description: "Get CodeArts TestPlan project issue update notification setting",
    inputSchema: testPlanGetProjectIssueUpdateNotificationInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectIssueUpdateNotificationHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectIssueUpdateNotificationHandler
  }),
  "testplan_get_project_master_version": defineProductTool({
    description: "Get CodeArts TestPlan project master version URI",
    inputSchema: testPlanGetProjectMasterVersionInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectMasterVersionHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectMasterVersionHandler
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
  "testplan_list_attachments": defineProductTool({
    description: "List CodeArts TestPlan resource attachments",
    inputSchema: testPlanListAttachmentsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListAttachmentsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListAttachmentsHandler
  }),
  "testplan_list_project_field_configs": defineProductTool({
    description: "List CodeArts TestPlan project field configurations",
    inputSchema: testPlanListProjectFieldConfigsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProjectFieldConfigsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProjectFieldConfigsHandler
  }),
  "testplan_list_project_users": defineProductTool({
    description: "List CodeArts TestPlan project users",
    inputSchema: testPlanListProjectUsersInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProjectUsersHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProjectUsersHandler
  }),
  "testplan_list_project_tags": defineProductTool({
    description: "List CodeArts TestPlan project tags by resource type",
    inputSchema: testPlanListProjectTagsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProjectTagsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProjectTagsHandler
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
  "testplan_get_rule_check_task_report": defineProductTool({
    description: "Get CodeArts TestPlan rule check task report",
    inputSchema: testPlanGetRuleCheckTaskReportInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetRuleCheckTaskReportHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetRuleCheckTaskReportHandler
  }),
  "testplan_get_rule_check_task_summary": defineProductTool({
    description: "Get CodeArts TestPlan rule check task summary",
    inputSchema: testPlanGetRuleCheckTaskSummaryInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetRuleCheckTaskSummaryHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetRuleCheckTaskSummaryHandler
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
  "testplan_list_custom_template_reports": defineProductTool({
    description: "List CodeArts TestPlan custom template reports",
    inputSchema: testPlanListCustomTemplateReportsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListCustomTemplateReportsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListCustomTemplateReportsHandler
  }),
  "testplan_list_test_reports": defineProductTool({
    description: "List CodeArts TestPlan test reports",
    inputSchema: testPlanListTestReportsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestReportsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestReportsHandler
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
  "testplan_list_testhub_iterators_v5": defineProductTool({
    description: "List CodeArts TestPlan TestHub v5 iterators",
    inputSchema: testPlanListTesthubIteratorsV5Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTesthubIteratorsV5Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTesthubIteratorsV5Handler
  }),
  "testplan_list_testhub_services": defineProductTool({
    description: "List CodeArts TestPlan TestHub registered services",
    inputSchema: testPlanListTesthubServicesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTesthubServicesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTesthubServicesHandler
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
