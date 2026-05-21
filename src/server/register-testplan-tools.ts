import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import {
  testPlanBatchDeleteTasksInput,
  testPlanCheckAlertTemplateNameInput,
  testPlanCheckAlertUserNameInput,
  testPlanCheckApiTestTaskNameInput,
  testPlanCheckProjectMemberExistsInput,
  testPlanCheckResourceExistsInput,
  testPlanCheckUserDefinedConfigUsedInput,
  testPlanCheckUserInfoInput,
  testPlanCheckUserExistsInput,
  testPlanCreateTaskInput,
  testPlanCreateTaskRelationsInput,
  testPlanGetApiTestAvailableConfigInput,
  testPlanGetApiTestBasicAwV3Input,
  testPlanGetApiTestBasicAwV4Input,
  testPlanGetApiTestConcurrencyPackageStatusInput,
  testPlanGetApiTestDebugLogInput,
  testPlanGetApiTestDnsMappingInput,
  testPlanGetApiTestPackageChargeMessageInput,
  testPlanGetApiTestPackageChargePopupInput,
  testPlanGetApiTestProjectInfoInput,
  testPlanGetApiTestTaskStatusInput,
  testPlanGetApiTestTaskStatusV2Input,
  testPlanGetBackgroundInfoInput,
  testPlanGetDomainAccessInfoInput,
  testPlanGetDomainDetailInfoInput,
  testPlanGetDomainFrozenInfoInput,
  testPlanGetDomainNeedPopupInput,
  testPlanGetBranchInput,
  testPlanGetCaseTemplateInput,
  testPlanListCaseTemplatesInput,
  testPlanGetCaseInput,
  testPlanGetCurrentUserPackagePermissionInput,
  testPlanGetCustomTemplateInput,
  testPlanGetCustomizedColumnsInput,
  testPlanGetDashboardRunPanelInput,
  testPlanListDashboardStatisticBlocksInput,
  testPlanListDashboardsInput,
  testPlanGetDomainUserCountInput,
  testPlanGetFreeDeclarationInput,
  testPlanGetFreeTestTimeInput,
  testPlanGetFunctionalTestPackageStatusInput,
  testPlanGetFunctionalTestParallelSummaryInput,
  testPlanGetGt3kBackgroundInfoInput,
  testPlanGetGt3kBranchInput,
  testPlanGetGt3kDomainInfoInput,
  testPlanGetGt3kFreeDeclarationInput,
  testPlanGetGt3kIteratorInput,
  testPlanGetGt3kProgressInput,
  testPlanGetGt3kTestcaseChangeStatisticsInput,
  testPlanGetGt3kUserInfoDomainInput,
  testPlanGetFactorInput,
  testPlanGetImageCapacityWarningInput,
  testPlanGetIteratorInput,
  testPlanGetLicenseSpecificationInput,
  testPlanGetMindmapInput,
  testPlanGetMindmapBackupInput,
  testPlanGetMindmapCreatorNameInput,
  testPlanGetMindmapPermissionInput,
  testPlanGetMindmapRecycleInput,
  testPlanGetMindmapStatisticsInput,
  testPlanGetPlanInput,
  testPlanGetProjectTestcaseInput,
  testPlanGetProjectTestcaseByNumberInput,
  testPlanGetProjectTestcaseV4Input,
  testPlanGetProjectAdvancedFeatureTrialInput,
  testPlanGetProjectAdvancedFeatureTrustedInput,
  testPlanGetProjectDomainDetailInfoInput,
  testPlanGetProjectIssueUpdateNotificationInput,
  testPlanGetProjectMasterVersionInput,
  testPlanGetProjectMessageNoticesInput,
  testPlanGetProgressInput,
  testPlanGetProjectProgressInput,
  testPlanGetProjectServiceConfigInput,
  testPlanGetProjectServiceRepoInput,
  testPlanGetProjectSystemConfigInput,
  testPlanGetProjectTestcaseGlobalConfigInput,
  testPlanGetProjectLocalConfigInput,
  testPlanGetQualityReportOverviewInput,
  testPlanListRuleCheckTasksInput,
  testPlanGetRuleCheckTaskReportInput,
  testPlanGetRuleCheckTaskSummaryInput,
  testPlanGetServiceTypeOverviewInput,
  testPlanGetTestReportInput,
  testPlanGetTestDesignTemplateInput,
  testPlanGetTestDesignTestcaseInput,
  testPlanGetTestcaseScriptDetailV1Input,
  testPlanGetTestcaseScriptDetailV3Input,
  testPlanGetTestcaseScriptDetailV4Input,
  testPlanGetTestcaseV4Input,
  testPlanGetTesthubCaseByNumberInput,
  testPlanGetTesthubCaseInput,
  testPlanGetTesthubProgressInput,
  testPlanGetTesthubTaskInput,
  testPlanGetTaskExecutionParamInput,
  testPlanGetTaskInput,
  testPlanGetTaskResultDetailInput,
  testPlanGetTaskSuccessTestCasesCountInput,
  testPlanGetTestcaseChangeStatisticsInput,
  testPlanGetUserDisclaimerInput,
  testPlanGetUserInfoDomainInput,
  testPlanGetUserPackagePermissionInput,
  testPlanGetVariableSynchronizationInput,
  testPlanGetVariableSynchronizationV2Input,
  testPlanGetSuiteInfoPageUrlInput,
  testPlanInitTaskExecutionInput,
  testPlanListApiTestAwNameViewsInput,
  testPlanListApiTestBasicAwsBatchInput,
  testPlanListApiTestBasicAwParamPropertiesInput,
  testPlanListApiTestBasicAwInfosInput,
  testPlanListApiTestBasicAwInfosV2Input,
  testPlanListApiTestChildBasicAwsInput,
  testPlanListApiTestGlobalParamNamesInput,
  testPlanListApiTestPackageUsageInput,
  testPlanListApiTestPackageStatusInput,
  testPlanListApiTestVariablesInput,
  testPlanListApiTestcaseExecuteHistoriesInput,
  testPlanListApiTestcaseHistoryInput,
  testPlanListApiTestsuiteHistoryInput,
  testPlanListAttachmentsInput,
  testPlanListAlertTemplatesInput,
  testPlanListAssetsInput,
  testPlanListAssetTreeInput,
  testPlanListAuthorizedTasksInput,
  testPlanListBranchTestcaseDuplicateNumbersInput,
  testPlanListCustomReportsInput,
  testPlanListCustomTemplateReportsInput,
  testPlanListCurrentUserTestcasesInput,
  testPlanListDefectIteratorsInput,
  testPlanListDomainUsageInfosInput,
  testPlanListEnvironmentsInput,
  testPlanListFeatureCaseCountsInput,
  testPlanListFeatureChildrenInput,
  testPlanListFeatureChildrenV5Input,
  testPlanListFeatureDescendantUrisInput,
  testPlanListGt3kFeatureChildrenV5Input,
  testPlanListGt3kBranchesInput,
  testPlanListGt3kCurrentUserTestcasesInput,
  testPlanListGt3kDefectIteratorsInput,
  testPlanListGt3kDomainUsageInfosInput,
  testPlanListGt3kIteratorInfosInput,
  testPlanListGt3kProjectServiceReposInput,
  testPlanListGt3kTestcaseFieldsInput,
  testPlanListGt3kVisibleServicesInput,
  testPlanListIssueCaseCountsInput,
  testPlanListIssueTestcasesInput,
  testPlanListIteratorIssueCasesInput,
  testPlanListIteratorInfosInput,
  testPlanListIteratorHistoriesInput,
  testPlanListIteratorIssueIdsInput,
  testPlanListIteratorIssuesInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListNoticeConfigsInput,
  testPlanListPlanJournalsInput,
  testPlanListPlansInput,
  testPlanListPlansV2Input,
  testPlanListProjectDefectsInput,
  testPlanListProjectFieldConfigsInput,
  testPlanListProjectIssuesInput,
  testPlanListProjectServiceReposInput,
  testPlanListProjectTagsInput,
  testPlanListProjectUsersInput,
  testPlanListPublicAwLibAndAwsInput,
  testPlanListProgressReportsInput,
  testPlanListRequirementsOverviewDetailsInput,
  testPlanListRequirementsOverviewInput,
  testPlanListRegisteredServicesInput,
  testPlanListReleaseVersionsInput,
  testPlanListResourceNumberRulesInput,
  testPlanListResourcePoolsInput,
  testPlanListRunsInput,
  testPlanListServiceOfferingsInput,
  testPlanListTaskCasesInput,
  testPlanListTaskCasesV4Input,
  testPlanListTaskDefectsInput,
  testPlanListTaskResultsInput,
  testPlanListTasksInput,
  testPlanListTestcaseCommentsInput,
  testPlanListTestTypesInput,
  testPlanListTestReportDefectsInput,
  testPlanListTestReportCustomInfosInput,
  testPlanListTestReportIssuesInput,
  testPlanListTestReportQualityAttributesInput,
  testPlanListTestcaseRelationsInput,
  testPlanListTestexecutorResourcePoolsInput,
  testPlanListSolutionTemplatesInput,
  testPlanGetTestcaseFieldInput,
  testPlanListTestcaseFieldsInput,
  testPlanListTestcaseReviewsInput,
  testPlanListTimeoutSettingsInput,
  testPlanListTesthubBranchesInput,
  testPlanListTesthubIteratorsInput,
  testPlanListTesthubIteratorsV5Input,
  testPlanListTesthubServicesInput,
  testPlanListV1BranchesInput,
  testPlanListV4BranchesInput,
  testPlanListV4ProjectFieldConfigsInput,
  testPlanListV4TestcaseReviewsInput,
  testPlanListVariableGroupsInput,
  testPlanListVariablesByGroupInput,
  testPlanListVariablesV3Input,
  testPlanListVisibleServicesInput,
  testPlanListTestReportsInput,
  testPlanGetServiceConfigInput,
  testPlanRunCasesInput,
  testPlanSearchApiTestBasicAwInfosInput,
  testPlanSearchFeaturesByCaseInput,
  testPlanSearchFeaturesInput,
  testPlanStopTaskExecutionInput,
  testPlanUpdateTaskInput
} from "../products/testplan/schemas.js";
import { createTestPlanCheckUserExistsHandler } from "../products/testplan/tools/check-user-exists.js";
import { createTestPlanCheckProjectMemberExistsHandler } from "../products/testplan/tools/check-project-member-exists.js";
import { createTestPlanCheckResourceExistsHandler } from "../products/testplan/tools/check-resource-exists.js";
import { createTestPlanCheckUserDefinedConfigUsedHandler } from "../products/testplan/tools/check-user-defined-config-used.js";
import { createTestPlanCheckUserInfoHandler } from "../products/testplan/tools/check-user-info.js";
import { createTestPlanCheckAlertTemplateNameHandler } from "../products/testplan/tools/check-alert-template-name.js";
import { createTestPlanCheckAlertUserNameHandler } from "../products/testplan/tools/check-alert-user-name.js";
import { createTestPlanCheckApiTestTaskNameHandler } from "../products/testplan/tools/check-api-test-task-name.js";
import { createTestPlanBatchDeleteTasksHandler } from "../products/testplan/tools/batch-delete-tasks.js";
import { createTestPlanGetApiTestAvailableConfigHandler } from "../products/testplan/tools/get-api-test-available-config.js";
import { createTestPlanGetApiTestBasicAwV3Handler } from "../products/testplan/tools/get-api-test-basic-aw-v3.js";
import { createTestPlanGetApiTestBasicAwV4Handler } from "../products/testplan/tools/get-api-test-basic-aw-v4.js";
import { createTestPlanGetApiTestConcurrencyPackageStatusHandler } from "../products/testplan/tools/get-api-test-concurrency-package-status.js";
import { createTestPlanGetApiTestDebugLogHandler } from "../products/testplan/tools/get-api-test-debug-log.js";
import { createTestPlanGetApiTestDnsMappingHandler } from "../products/testplan/tools/get-api-test-dns-mapping.js";
import { createTestPlanGetApiTestPackageChargeMessageHandler } from "../products/testplan/tools/get-api-test-package-charge-message.js";
import { createTestPlanGetApiTestPackageChargePopupHandler } from "../products/testplan/tools/get-api-test-package-charge-popup.js";
import { createTestPlanGetApiTestProjectInfoHandler } from "../products/testplan/tools/get-api-test-project-info.js";
import { createTestPlanGetApiTestTaskStatusHandler } from "../products/testplan/tools/get-api-test-task-status.js";
import { createTestPlanGetApiTestTaskStatusV2Handler } from "../products/testplan/tools/get-api-test-task-status-v2.js";
import { createTestPlanGetBackgroundInfoHandler } from "../products/testplan/tools/get-background-info.js";
import { createTestPlanGetBranchHandler } from "../products/testplan/tools/get-branch.js";
import { createTestPlanGetCaseTemplateHandler } from "../products/testplan/tools/get-case-template.js";
import { createTestPlanCreateTaskHandler } from "../products/testplan/tools/create-task.js";
import { createTestPlanCreateTaskRelationsHandler } from "../products/testplan/tools/create-task-relations.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetCustomTemplateHandler } from "../products/testplan/tools/get-custom-template.js";
import { createTestPlanGetCurrentUserPackagePermissionHandler } from "../products/testplan/tools/get-current-user-package-permission.js";
import { createTestPlanGetCustomizedColumnsHandler } from "../products/testplan/tools/get-customized-columns.js";
import { createTestPlanGetCustomizedColumnsV4Handler } from "../products/testplan/tools/get-customized-columns-v4.js";
import { createTestPlanGetDashboardRunPanelHandler } from "../products/testplan/tools/get-dashboard-run-panel.js";
import { createTestPlanListDashboardStatisticBlocksHandler } from "../products/testplan/tools/list-dashboard-statistic-blocks.js";
import { createTestPlanListDashboardsHandler } from "../products/testplan/tools/list-dashboards.js";
import { createTestPlanGetDomainAccessInfoHandler } from "../products/testplan/tools/get-domain-access-info.js";
import { createTestPlanGetDomainDetailInfoHandler } from "../products/testplan/tools/get-domain-detail-info.js";
import { createTestPlanGetDomainFrozenInfoHandler } from "../products/testplan/tools/get-domain-frozen-info.js";
import { createTestPlanGetDomainNeedPopupHandler } from "../products/testplan/tools/get-domain-need-popup.js";
import { createTestPlanGetDomainUserCountHandler } from "../products/testplan/tools/get-domain-user-count.js";
import { createTestPlanGetFreeDeclarationHandler } from "../products/testplan/tools/get-free-declaration.js";
import { createTestPlanGetFreeTestTimeHandler } from "../products/testplan/tools/get-free-test-time.js";
import { createTestPlanGetFunctionalTestPackageStatusHandler } from "../products/testplan/tools/get-functional-test-package-status.js";
import { createTestPlanGetFunctionalTestParallelSummaryHandler } from "../products/testplan/tools/get-functional-test-parallel-summary.js";
import { createTestPlanGetGt3kBackgroundInfoHandler } from "../products/testplan/tools/get-gt3k-background-info.js";
import { createTestPlanGetGt3kBranchHandler } from "../products/testplan/tools/get-gt3k-branch.js";
import { createTestPlanGetGt3kDomainInfoHandler } from "../products/testplan/tools/get-gt3k-domain-info.js";
import { createTestPlanGetGt3kFreeDeclarationHandler } from "../products/testplan/tools/get-gt3k-free-declaration.js";
import { createTestPlanGetGt3kIteratorHandler } from "../products/testplan/tools/get-gt3k-iterator.js";
import { createTestPlanGetGt3kProgressHandler } from "../products/testplan/tools/get-gt3k-progress.js";
import { createTestPlanGetGt3kTestcaseChangeStatisticsHandler } from "../products/testplan/tools/get-gt3k-testcase-change-statistics.js";
import { createTestPlanGetGt3kUserInfoDomainHandler } from "../products/testplan/tools/get-gt3k-user-info-domain.js";
import { createTestPlanGetFactorHandler } from "../products/testplan/tools/get-factor.js";
import { createTestPlanGetImageCapacityWarningHandler } from "../products/testplan/tools/get-image-capacity-warning.js";
import { createTestPlanGetIteratorHandler } from "../products/testplan/tools/get-iterator.js";
import { createTestPlanGetLicenseSpecificationHandler } from "../products/testplan/tools/get-license-specification.js";
import { createTestPlanGetMindmapHandler } from "../products/testplan/tools/get-mindmap.js";
import { createTestPlanGetMindmapBackupHandler } from "../products/testplan/tools/get-mindmap-backup.js";
import { createTestPlanGetMindmapCreatorNameHandler } from "../products/testplan/tools/get-mindmap-creator-name.js";
import { createTestPlanGetMindmapPermissionHandler } from "../products/testplan/tools/get-mindmap-permission.js";
import { createTestPlanGetMindmapRecycleHandler } from "../products/testplan/tools/get-mindmap-recycle.js";
import { createTestPlanGetMindmapStatisticsHandler } from "../products/testplan/tools/get-mindmap-statistics.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanGetProjectTestcaseHandler } from "../products/testplan/tools/get-project-testcase.js";
import { createTestPlanGetProjectTestcaseByNumberHandler } from "../products/testplan/tools/get-project-testcase-by-number.js";
import { createTestPlanGetProjectTestcaseV4Handler } from "../products/testplan/tools/get-project-testcase-v4.js";
import { createTestPlanGetProjectAdvancedFeatureTrialHandler } from "../products/testplan/tools/get-project-advanced-feature-trial.js";
import { createTestPlanGetProjectAdvancedFeatureTrustedHandler } from "../products/testplan/tools/get-project-advanced-feature-trusted.js";
import { createTestPlanGetProjectDomainDetailInfoHandler } from "../products/testplan/tools/get-project-domain-detail-info.js";
import { createTestPlanGetProjectIssueUpdateNotificationHandler } from "../products/testplan/tools/get-project-issue-update-notification.js";
import { createTestPlanGetProjectMasterVersionHandler } from "../products/testplan/tools/get-project-master-version.js";
import { createTestPlanGetProjectMessageNoticesHandler } from "../products/testplan/tools/get-project-message-notices.js";
import { createTestPlanGetProgressHandler } from "../products/testplan/tools/get-progress.js";
import { createTestPlanGetProjectProgressHandler } from "../products/testplan/tools/get-project-progress.js";
import { createTestPlanGetProjectServiceConfigHandler } from "../products/testplan/tools/get-project-service-config.js";
import { createTestPlanGetProjectServiceRepoHandler } from "../products/testplan/tools/get-project-service-repo.js";
import { createTestPlanGetProjectSystemConfigHandler } from "../products/testplan/tools/get-project-system-config.js";
import { createTestPlanGetProjectTestcaseGlobalConfigHandler } from "../products/testplan/tools/get-project-testcase-global-config.js";
import { createTestPlanGetProjectLocalConfigHandler } from "../products/testplan/tools/get-project-local-config.js";
import { createTestPlanGetQualityReportOverviewHandler } from "../products/testplan/tools/get-quality-report-overview.js";
import { createTestPlanListRuleCheckTasksHandler } from "../products/testplan/tools/list-rule-check-tasks.js";
import { createTestPlanGetRuleCheckTaskReportHandler } from "../products/testplan/tools/get-rule-check-task-report.js";
import { createTestPlanGetRuleCheckTaskSummaryHandler } from "../products/testplan/tools/get-rule-check-task-summary.js";
import { createTestPlanGetServiceTypeOverviewHandler } from "../products/testplan/tools/get-service-type-overview.js";
import { createTestPlanGetTestReportHandler } from "../products/testplan/tools/get-test-report.js";
import { createTestPlanGetTestDesignTemplateHandler } from "../products/testplan/tools/get-test-design-template.js";
import { createTestPlanGetTestDesignTestcaseHandler } from "../products/testplan/tools/get-test-design-testcase.js";
import { createTestPlanGetTestcaseV4Handler } from "../products/testplan/tools/get-testcase-v4.js";
import { createTestPlanGetTesthubCaseByNumberHandler } from "../products/testplan/tools/get-testhub-case-by-number.js";
import { createTestPlanGetTesthubCaseHandler } from "../products/testplan/tools/get-testhub-case.js";
import { createTestPlanGetTesthubProgressHandler } from "../products/testplan/tools/get-testhub-progress.js";
import { createTestPlanGetTesthubTaskHandler } from "../products/testplan/tools/get-testhub-task.js";
import { createTestPlanGetTaskExecutionParamHandler } from "../products/testplan/tools/get-task-execution-param.js";
import { createTestPlanGetTaskHandler } from "../products/testplan/tools/get-task.js";
import { createTestPlanGetTaskResultDetailHandler } from "../products/testplan/tools/get-task-result-detail.js";
import { createTestPlanGetTaskSuccessTestCasesCountHandler } from "../products/testplan/tools/get-task-success-testcases-count.js";
import { createTestPlanGetTestcaseChangeStatisticsHandler } from "../products/testplan/tools/get-testcase-change-statistics.js";
import { createTestPlanGetTestcaseFieldHandler } from "../products/testplan/tools/get-testcase-field.js";
import { createTestPlanGetTestcaseScriptDetailV1Handler } from "../products/testplan/tools/get-testcase-script-detail-v1.js";
import { createTestPlanGetTestcaseScriptDetailV3Handler } from "../products/testplan/tools/get-testcase-script-detail-v3.js";
import { createTestPlanGetTestcaseScriptDetailV4Handler } from "../products/testplan/tools/get-testcase-script-detail-v4.js";
import { createTestPlanGetUserDisclaimerHandler } from "../products/testplan/tools/get-user-disclaimer.js";
import { createTestPlanGetUserInfoDomainHandler } from "../products/testplan/tools/get-user-info-domain.js";
import { createTestPlanGetUserPackagePermissionHandler } from "../products/testplan/tools/get-user-package-permission.js";
import { createTestPlanGetVariableSynchronizationHandler } from "../products/testplan/tools/get-variable-synchronization.js";
import { createTestPlanGetVariableSynchronizationV2Handler } from "../products/testplan/tools/get-variable-synchronization-v2.js";
import { createTestPlanGetSuiteInfoPageUrlHandler } from "../products/testplan/tools/get-suite-info-page-url.js";
import { createTestPlanInitTaskExecutionHandler } from "../products/testplan/tools/init-task-execution.js";
import { createTestPlanListApiTestAwNameViewsHandler } from "../products/testplan/tools/list-api-test-aw-name-views.js";
import { createTestPlanListApiTestBasicAwsBatchHandler } from "../products/testplan/tools/list-api-test-basic-aws-batch.js";
import { createTestPlanListApiTestBasicAwParamPropertiesHandler } from "../products/testplan/tools/list-api-test-basic-aw-param-properties.js";
import { createTestPlanListApiTestBasicAwInfosHandler } from "../products/testplan/tools/list-api-test-basic-aw-infos.js";
import { createTestPlanListApiTestBasicAwInfosV2Handler } from "../products/testplan/tools/list-api-test-basic-aw-infos-v2.js";
import { createTestPlanListApiTestChildBasicAwsHandler } from "../products/testplan/tools/list-api-test-child-basic-aws.js";
import { createTestPlanListApiTestGlobalParamNamesHandler } from "../products/testplan/tools/list-api-test-global-param-names.js";
import { createTestPlanListAlertTemplatesHandler } from "../products/testplan/tools/list-alert-templates.js";
import { createTestPlanListApiTestPackageUsageHandler } from "../products/testplan/tools/list-api-test-package-usage.js";
import { createTestPlanListApiTestPackageStatusHandler } from "../products/testplan/tools/list-api-test-package-status.js";
import { createTestPlanListApiTestVariablesHandler } from "../products/testplan/tools/list-api-test-variables.js";
import { createTestPlanListApiTestcaseExecuteHistoriesHandler } from "../products/testplan/tools/list-api-testcase-execute-histories.js";
import { createTestPlanListApiTestcaseHistoryHandler } from "../products/testplan/tools/list-api-testcase-history.js";
import { createTestPlanListApiTestsuiteHistoryHandler } from "../products/testplan/tools/list-api-testsuite-history.js";
import { createTestPlanListAttachmentsHandler } from "../products/testplan/tools/list-attachments.js";
import { createTestPlanListAssetsHandler } from "../products/testplan/tools/list-assets.js";
import { createTestPlanListAssetTreeHandler } from "../products/testplan/tools/list-asset-tree.js";
import { createTestPlanListAuthorizedTasksHandler } from "../products/testplan/tools/list-authorized-tasks.js";
import { createTestPlanListBranchTestcaseDuplicateNumbersHandler } from "../products/testplan/tools/list-branch-testcase-duplicate-numbers.js";
import { createTestPlanListCaseTemplatesHandler } from "../products/testplan/tools/list-case-templates.js";
import { createTestPlanListCustomReportsHandler } from "../products/testplan/tools/list-custom-reports.js";
import { createTestPlanListCustomTemplateReportsHandler } from "../products/testplan/tools/list-custom-template-reports.js";
import { createTestPlanListCurrentUserTestcasesHandler } from "../products/testplan/tools/list-current-user-testcases.js";
import { createTestPlanListDefectIteratorsHandler } from "../products/testplan/tools/list-defect-iterators.js";
import { createTestPlanListDomainUsageInfosHandler } from "../products/testplan/tools/list-domain-usage-infos.js";
import { createTestPlanListEnvironmentsHandler } from "../products/testplan/tools/list-environments.js";
import { createTestPlanListFeatureCaseCountsHandler } from "../products/testplan/tools/list-feature-case-counts.js";
import {
  createTestPlanListFeatureChildrenHandler,
  createTestPlanListFeatureChildrenV5Handler,
  createTestPlanListGt3kFeatureChildrenHandler,
  createTestPlanListGt3kFeatureChildrenV5Handler
} from "../products/testplan/tools/feature-children.js";
import { createTestPlanListFeatureDescendantUrisHandler } from "../products/testplan/tools/list-feature-descendant-uris.js";
import { createTestPlanListGt3kBranchesHandler } from "../products/testplan/tools/list-gt3k-branches.js";
import { createTestPlanListGt3kCurrentUserTestcasesHandler } from "../products/testplan/tools/list-gt3k-current-user-testcases.js";
import { createTestPlanListGt3kDefectIteratorsHandler } from "../products/testplan/tools/list-gt3k-defect-iterators.js";
import { createTestPlanListGt3kDomainUsageInfosHandler } from "../products/testplan/tools/list-gt3k-domain-usage-infos.js";
import { createTestPlanListGt3kIteratorInfosHandler } from "../products/testplan/tools/list-gt3k-iterator-infos.js";
import { createTestPlanListGt3kProjectServiceReposHandler } from "../products/testplan/tools/list-gt3k-project-service-repos.js";
import { createTestPlanListGt3kTestcaseFieldsHandler } from "../products/testplan/tools/list-gt3k-testcase-fields.js";
import { createTestPlanListGt3kVisibleServicesHandler } from "../products/testplan/tools/list-gt3k-visible-services.js";
import { createTestPlanListIssueCaseCountsHandler } from "../products/testplan/tools/list-issue-case-counts.js";
import { createTestPlanListIssueTestcasesHandler } from "../products/testplan/tools/list-issue-testcases.js";
import { createTestPlanListIteratorIssueCasesHandler } from "../products/testplan/tools/list-iterator-issue-cases.js";
import { createTestPlanListIteratorInfosHandler } from "../products/testplan/tools/list-iterator-infos.js";
import { createTestPlanListIteratorHistoriesHandler } from "../products/testplan/tools/list-iterator-histories.js";
import { createTestPlanListIteratorIssueIdsHandler } from "../products/testplan/tools/list-iterator-issue-ids.js";
import { createTestPlanListIteratorIssuesHandler } from "../products/testplan/tools/list-iterator-issues.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListNoticeConfigsHandler } from "../products/testplan/tools/list-notice-configs.js";
import { createTestPlanListPlanJournalsHandler } from "../products/testplan/tools/list-plan-journals.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListPlansV2Handler } from "../products/testplan/tools/list-plans-v2.js";
import { createTestPlanListProjectDefectsHandler } from "../products/testplan/tools/list-project-defects.js";
import { createTestPlanListProjectFieldConfigsHandler } from "../products/testplan/tools/list-project-field-configs.js";
import { createTestPlanListProjectIssuesHandler } from "../products/testplan/tools/list-project-issues.js";
import { createTestPlanListProjectServiceReposHandler } from "../products/testplan/tools/list-project-service-repos.js";
import { createTestPlanListProjectTagsHandler } from "../products/testplan/tools/list-project-tags.js";
import { createTestPlanListProjectUsersHandler } from "../products/testplan/tools/list-project-users.js";
import { createTestPlanListPublicAwLibAndAwsHandler } from "../products/testplan/tools/list-public-aw-lib-and-aws.js";
import { createTestPlanListProgressReportsHandler } from "../products/testplan/tools/list-progress-reports.js";
import { createTestPlanListRequirementsOverviewDefectsHandler } from "../products/testplan/tools/list-requirements-overview-defects.js";
import { createTestPlanListRequirementsOverviewHandler } from "../products/testplan/tools/list-requirements-overview.js";
import { createTestPlanListRequirementsOverviewTestcasesHandler } from "../products/testplan/tools/list-requirements-overview-testcases.js";
import { createTestPlanListRegisteredServicesHandler } from "../products/testplan/tools/list-registered-services.js";
import { createTestPlanListReleaseVersionsHandler } from "../products/testplan/tools/list-release-versions.js";
import { createTestPlanListResourceNumberRulesHandler } from "../products/testplan/tools/list-resource-number-rules.js";
import { createTestPlanListResourcePoolsHandler } from "../products/testplan/tools/list-resource-pools.js";
import { createTestPlanListRunsHandler } from "../products/testplan/tools/list-runs.js";
import { createTestPlanListServiceOfferingsHandler } from "../products/testplan/tools/list-service-offerings.js";
import { createTestPlanListSolutionTemplatesHandler } from "../products/testplan/tools/list-solution-templates.js";
import { createTestPlanListTaskCasesHandler } from "../products/testplan/tools/list-task-cases.js";
import { createTestPlanListTaskCasesV4Handler } from "../products/testplan/tools/list-task-cases-v4.js";
import { createTestPlanListTaskDefectsHandler } from "../products/testplan/tools/list-task-defects.js";
import { createTestPlanListTaskResultsHandler } from "../products/testplan/tools/list-task-results.js";
import { createTestPlanListTasksHandler } from "../products/testplan/tools/list-tasks.js";
import { createTestPlanListTestTypesHandler } from "../products/testplan/tools/list-test-types.js";
import { createTestPlanListTestReportDefectsHandler } from "../products/testplan/tools/list-test-report-defects.js";
import { createTestPlanListTestReportCustomInfosHandler } from "../products/testplan/tools/list-test-report-custom-infos.js";
import { createTestPlanListTestReportIssuesHandler } from "../products/testplan/tools/list-test-report-issues.js";
import { createTestPlanListTestReportQualityAttributesHandler } from "../products/testplan/tools/list-test-report-quality-attributes.js";
import { createTestPlanListTestcaseRelationsHandler } from "../products/testplan/tools/list-testcase-relations.js";
import { createTestPlanListTestcaseCommentsHandler } from "../products/testplan/tools/list-testcase-comments.js";
import { createTestPlanListTestcaseFieldsHandler } from "../products/testplan/tools/list-testcase-fields.js";
import { createTestPlanListTestcaseReviewsHandler } from "../products/testplan/tools/list-testcase-reviews.js";
import { createTestPlanListTimeoutSettingsHandler } from "../products/testplan/tools/list-timeout-settings.js";
import { createTestPlanListTestexecutorResourcePoolsHandler } from "../products/testplan/tools/list-testexecutor-resource-pools.js";
import { createTestPlanListTesthubBranchesHandler } from "../products/testplan/tools/list-testhub-branches.js";
import { createTestPlanListTesthubIteratorsHandler } from "../products/testplan/tools/list-testhub-iterators.js";
import { createTestPlanListTesthubIteratorsV5Handler } from "../products/testplan/tools/list-testhub-iterators-v5.js";
import { createTestPlanListTesthubServicesHandler } from "../products/testplan/tools/list-testhub-services.js";
import { createTestPlanListTestReportsHandler } from "../products/testplan/tools/list-test-reports.js";
import { createTestPlanListV1BranchesHandler } from "../products/testplan/tools/list-v1-branches.js";
import { createTestPlanListV4BranchesHandler } from "../products/testplan/tools/list-v4-branches.js";
import { createTestPlanListV4ProjectFieldConfigsHandler } from "../products/testplan/tools/list-v4-project-field-configs.js";
import { createTestPlanListV4TestcaseReviewsHandler } from "../products/testplan/tools/list-v4-testcase-reviews.js";
import { createTestPlanListVariableGroupsHandler } from "../products/testplan/tools/list-variable-groups.js";
import { createTestPlanListVariablesByGroupHandler } from "../products/testplan/tools/list-variables-by-group.js";
import { createTestPlanListVariablesV3Handler } from "../products/testplan/tools/list-variables-v3.js";
import { createTestPlanListVisibleServicesHandler } from "../products/testplan/tools/list-visible-services.js";
import { createTestPlanGetServiceConfigHandler } from "../products/testplan/tools/get-service-config.js";
import { createTestPlanRunCasesHandler } from "../products/testplan/tools/run-cases.js";
import { createTestPlanSearchApiTestBasicAwInfosHandler } from "../products/testplan/tools/search-api-test-basic-aw-infos.js";
import { createTestPlanSearchFeaturesByCaseHandler } from "../products/testplan/tools/search-features-by-case.js";
import { createTestPlanSearchFeaturesHandler } from "../products/testplan/tools/search-features.js";
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
  "testplan_list_plans_v2": defineProductTool({
    description: "List CodeArts TestPlan v2 plans with stage, branch, and version filters",
    inputSchema: testPlanListPlansV2Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListPlansV2Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListPlansV2Handler
  }),
  "testplan_get_plan": defineProductTool({
    description: "Get CodeArts TestPlan plan detail",
    inputSchema: testPlanGetPlanInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetPlanHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetPlanHandler
  }),
  "testplan_list_plan_journals": defineProductTool({
    description: "List CodeArts TestPlan plan operation journals",
    inputSchema: testPlanListPlanJournalsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListPlanJournalsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListPlanJournalsHandler
  }),
  "testplan_get_mindmap": defineProductTool({
    description: "Get CodeArts TestPlan mindmap detail",
    inputSchema: testPlanGetMindmapInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetMindmapHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetMindmapHandler
  }),
  "testplan_get_mindmap_creator_name": defineProductTool({
    description: "Get CodeArts TestPlan mindmap creator name",
    inputSchema: testPlanGetMindmapCreatorNameInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetMindmapCreatorNameHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetMindmapCreatorNameHandler
  }),
  "testplan_get_mindmap_permission": defineProductTool({
    description: "Get CodeArts TestPlan mindmap permission detail",
    inputSchema: testPlanGetMindmapPermissionInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetMindmapPermissionHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetMindmapPermissionHandler
  }),
  "testplan_get_mindmap_recycle": defineProductTool({
    description: "Get CodeArts TestPlan recycled mindmap detail",
    inputSchema: testPlanGetMindmapRecycleInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetMindmapRecycleHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetMindmapRecycleHandler
  }),
  "testplan_get_mindmap_backup": defineProductTool({
    description: "Get CodeArts TestPlan mindmap backup detail",
    inputSchema: testPlanGetMindmapBackupInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetMindmapBackupHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetMindmapBackupHandler
  }),
  "testplan_get_mindmap_statistics": defineProductTool({
    description: "Get CodeArts TestPlan mindmap resource statistics",
    inputSchema: testPlanGetMindmapStatisticsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetMindmapStatisticsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetMindmapStatisticsHandler
  }),
  "testplan_get_project_testcase": defineProductTool({
    description: "Get CodeArts TestPlan project testcase detail",
    inputSchema: testPlanGetProjectTestcaseInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectTestcaseHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectTestcaseHandler
  }),
  "testplan_get_project_testcase_by_number": defineProductTool({
    description: "Get CodeArts TestPlan project testcase detail by testcase number",
    inputSchema: testPlanGetProjectTestcaseByNumberInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectTestcaseByNumberHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectTestcaseByNumberHandler
  }),
  "testplan_get_project_testcase_v4": defineProductTool({
    description: "Get CodeArts TestPlan v4 project testcase detail",
    inputSchema: testPlanGetProjectTestcaseV4Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectTestcaseV4Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectTestcaseV4Handler
  }),
  "testplan_get_iterator": defineProductTool({
    description: "Get CodeArts TestPlan iterator detail with summary statistics",
    inputSchema: testPlanGetIteratorInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetIteratorHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetIteratorHandler
  }),
  "testplan_get_gt3k_iterator": defineProductTool({
    description: "Get CodeArts TestPlan GT3K iterator detail with summary statistics",
    inputSchema: testPlanGetGt3kIteratorInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kIteratorHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kIteratorHandler
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
  "testplan_get_test_design_template": defineProductTool({
    description: "Get CodeArts TestPlan test design template detail",
    inputSchema: testPlanGetTestDesignTemplateInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestDesignTemplateHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestDesignTemplateHandler
  }),
  "testplan_get_test_design_testcase": defineProductTool({
    description: "Get CodeArts TestPlan test design testcase detail",
    inputSchema: testPlanGetTestDesignTestcaseInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestDesignTestcaseHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestDesignTestcaseHandler
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
  "testplan_get_testhub_task": defineProductTool({
    description: "Get CodeArts TestPlan TestHub task detail",
    inputSchema: testPlanGetTesthubTaskInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTesthubTaskHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTesthubTaskHandler
  }),
  "testplan_get_testhub_progress": defineProductTool({
    description: "Get CodeArts TestPlan TestHub async progress",
    inputSchema: testPlanGetTesthubProgressInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTesthubProgressHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTesthubProgressHandler
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
  "testplan_get_customized_columns_v4": defineProductTool({
    description: "Get CodeArts TestPlan v4 customized column configuration",
    inputSchema: testPlanGetCustomizedColumnsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCustomizedColumnsV4Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCustomizedColumnsV4Handler
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
  "testplan_list_service_offerings": defineProductTool({
    description: "List CodeArts TestPlan service offering information",
    inputSchema: testPlanListServiceOfferingsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListServiceOfferingsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListServiceOfferingsHandler
  }),
  "testplan_list_environments": defineProductTool({
    description: "List CodeArts TestPlan environment parameter groups",
    inputSchema: testPlanListEnvironmentsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListEnvironmentsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListEnvironmentsHandler
  }),
  "testplan_list_iterator_infos": defineProductTool({
    description: "List CodeArts TestPlan iterator information",
    inputSchema: testPlanListIteratorInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIteratorInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIteratorInfosHandler
  }),
  "testplan_list_gt3k_iterator_infos": defineProductTool({
    description: "List CodeArts TestPlan GT3K iterator information",
    inputSchema: testPlanListGt3kIteratorInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kIteratorInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kIteratorInfosHandler
  }),
  "testplan_list_issue_case_counts": defineProductTool({
    description: "List CodeArts TestPlan testcase counts for requirements or issues",
    inputSchema: testPlanListIssueCaseCountsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIssueCaseCountsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIssueCaseCountsHandler
  }),
  "testplan_list_issue_testcases": defineProductTool({
    description: "List CodeArts TestPlan testcases related to a requirement or issue",
    inputSchema: testPlanListIssueTestcasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIssueTestcasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIssueTestcasesHandler
  }),
  "testplan_list_iterator_issue_cases": defineProductTool({
    description: "List CodeArts TestPlan testcase references related to iterator issues",
    inputSchema: testPlanListIteratorIssueCasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIteratorIssueCasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIteratorIssueCasesHandler
  }),
  "testplan_list_visible_services": defineProductTool({
    description: "List CodeArts TestPlan visible third-party services",
    inputSchema: testPlanListVisibleServicesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListVisibleServicesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListVisibleServicesHandler
  }),
  "testplan_list_gt3k_visible_services": defineProductTool({
    description: "List CodeArts TestPlan GT3K visible third-party services",
    inputSchema: testPlanListGt3kVisibleServicesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kVisibleServicesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kVisibleServicesHandler
  }),
  "testplan_get_license_specification": defineProductTool({
    description: "Get CodeArts TestPlan license specification",
    inputSchema: testPlanGetLicenseSpecificationInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetLicenseSpecificationHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetLicenseSpecificationHandler
  }),
  "testplan_list_resource_number_rules": defineProductTool({
    description: "List CodeArts TestPlan resource number rules",
    inputSchema: testPlanListResourceNumberRulesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListResourceNumberRulesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListResourceNumberRulesHandler
  }),
  "testplan_get_project_testcase_global_config": defineProductTool({
    description: "Get CodeArts TestPlan project testcase global configuration",
    inputSchema: testPlanGetProjectTestcaseGlobalConfigInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectTestcaseGlobalConfigHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectTestcaseGlobalConfigHandler
  }),
  "testplan_get_project_local_config": defineProductTool({
    description: "Get CodeArts TestPlan project local configuration",
    inputSchema: testPlanGetProjectLocalConfigInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectLocalConfigHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectLocalConfigHandler
  }),
  "testplan_get_project_system_config": defineProductTool({
    description: "Get CodeArts TestPlan project feature switch status",
    inputSchema: testPlanGetProjectSystemConfigInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectSystemConfigHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectSystemConfigHandler
  }),
  "testplan_check_project_member_exists": defineProductTool({
    description: "Check whether the current user is a CodeArts TestPlan project member",
    inputSchema: testPlanCheckProjectMemberExistsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckProjectMemberExistsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckProjectMemberExistsHandler
  }),
  "testplan_check_alert_user_name": defineProductTool({
    description: "Check whether a CodeArts TestPlan alert user name is duplicated",
    inputSchema: testPlanCheckAlertUserNameInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckAlertUserNameHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckAlertUserNameHandler
  }),
  "testplan_check_alert_template_name": defineProductTool({
    description: "Check whether a CodeArts TestPlan alert template name is duplicated",
    inputSchema: testPlanCheckAlertTemplateNameInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckAlertTemplateNameHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckAlertTemplateNameHandler
  }),
  "testplan_list_test_report_custom_infos": defineProductTool({
    description: "List CodeArts TestPlan test report custom modules",
    inputSchema: testPlanListTestReportCustomInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestReportCustomInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestReportCustomInfosHandler
  }),
  "testplan_get_api_test_package_charge_popup": defineProductTool({
    description: "Get CodeArts TestPlan API test package charge popup information",
    inputSchema: testPlanGetApiTestPackageChargePopupInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestPackageChargePopupHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestPackageChargePopupHandler
  }),
  "testplan_get_api_test_project_info": defineProductTool({
    description: "Get CodeArts TestPlan API test project information with sensitive fields redacted",
    inputSchema: testPlanGetApiTestProjectInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestProjectInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestProjectInfoHandler
  }),
  "testplan_get_background_info": defineProductTool({
    description: "Get CodeArts TestPlan background information",
    inputSchema: testPlanGetBackgroundInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetBackgroundInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetBackgroundInfoHandler
  }),
  "testplan_list_api_test_package_usage": defineProductTool({
    description: "List CodeArts TestPlan API test package usage information",
    inputSchema: testPlanListApiTestPackageUsageInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestPackageUsageHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestPackageUsageHandler
  }),
  "testplan_list_api_test_package_status": defineProductTool({
    description: "List CodeArts TestPlan API test package status information",
    inputSchema: testPlanListApiTestPackageStatusInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestPackageStatusHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestPackageStatusHandler
  }),
  "testplan_list_api_testcase_execute_histories": defineProductTool({
    description: "List CodeArts TestPlan API testcase execution histories",
    inputSchema: testPlanListApiTestcaseExecuteHistoriesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestcaseExecuteHistoriesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestcaseExecuteHistoriesHandler
  }),
  "testplan_list_api_testcase_history": defineProductTool({
    description: "List CodeArts TestPlan API testcase execution history",
    inputSchema: testPlanListApiTestcaseHistoryInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestcaseHistoryHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestcaseHistoryHandler
  }),
  "testplan_get_free_test_time": defineProductTool({
    description: "Get CodeArts TestPlan free test time information",
    inputSchema: testPlanGetFreeTestTimeInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetFreeTestTimeHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetFreeTestTimeHandler
  }),
  "testplan_list_api_testsuite_history": defineProductTool({
    description: "List CodeArts TestPlan API testsuite execution history",
    inputSchema: testPlanListApiTestsuiteHistoryInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestsuiteHistoryHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestsuiteHistoryHandler
  }),
  "testplan_list_assets": defineProductTool({
    description: "List CodeArts TestPlan test factor center assets",
    inputSchema: testPlanListAssetsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListAssetsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListAssetsHandler
  }),
  "testplan_list_asset_tree": defineProductTool({
    description: "List CodeArts TestPlan test factor center asset tree nodes",
    inputSchema: testPlanListAssetTreeInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListAssetTreeHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListAssetTreeHandler
  }),
  "testplan_list_branch_testcase_duplicate_numbers": defineProductTool({
    description: "List duplicate CodeArts TestPlan testcase numbers under a branch version",
    inputSchema: testPlanListBranchTestcaseDuplicateNumbersInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListBranchTestcaseDuplicateNumbersHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListBranchTestcaseDuplicateNumbersHandler
  }),
  "testplan_get_api_test_package_charge_message": defineProductTool({
    description: "Get CodeArts TestPlan API test package charge message",
    inputSchema: testPlanGetApiTestPackageChargeMessageInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestPackageChargeMessageHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestPackageChargeMessageHandler
  }),
  "testplan_get_api_test_task_status": defineProductTool({
    description: "Get CodeArts TestPlan API test task status",
    inputSchema: testPlanGetApiTestTaskStatusInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestTaskStatusHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestTaskStatusHandler
  }),
  "testplan_get_api_test_task_status_v2": defineProductTool({
    description: "Get CodeArts TestPlan API test v2 task status",
    inputSchema: testPlanGetApiTestTaskStatusV2Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestTaskStatusV2Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestTaskStatusV2Handler
  }),
  "testplan_get_suite_info_page_url": defineProductTool({
    description: "Get CodeArts TestPlan test suite detail page URL",
    inputSchema: testPlanGetSuiteInfoPageUrlInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetSuiteInfoPageUrlHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetSuiteInfoPageUrlHandler
  }),
  "testplan_get_api_test_debug_log": defineProductTool({
    description: "Get CodeArts TestPlan API test debug log",
    inputSchema: testPlanGetApiTestDebugLogInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestDebugLogHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestDebugLogHandler
  }),
  "testplan_get_api_test_dns_mapping": defineProductTool({
    description: "Get CodeArts TestPlan API test DNS mapping",
    inputSchema: testPlanGetApiTestDnsMappingInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestDnsMappingHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestDnsMappingHandler
  }),
  "testplan_list_api_test_global_param_names": defineProductTool({
    description: "List CodeArts TestPlan API test global parameter names",
    inputSchema: testPlanListApiTestGlobalParamNamesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestGlobalParamNamesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestGlobalParamNamesHandler
  }),
  "testplan_list_api_test_variables": defineProductTool({
    description: "List CodeArts TestPlan API test variables",
    inputSchema: testPlanListApiTestVariablesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestVariablesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestVariablesHandler
  }),
  "testplan_get_api_test_basic_aw_v3": defineProductTool({
    description: "Get CodeArts TestPlan API test v3 basic AW detail",
    inputSchema: testPlanGetApiTestBasicAwV3Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestBasicAwV3Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestBasicAwV3Handler
  }),
  "testplan_get_api_test_basic_aw_v4": defineProductTool({
    description: "Get CodeArts TestPlan API test v4 basic AW detail",
    inputSchema: testPlanGetApiTestBasicAwV4Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestBasicAwV4Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestBasicAwV4Handler
  }),
  "testplan_list_api_test_child_basic_aws": defineProductTool({
    description: "List CodeArts TestPlan API test child basic AW entries without script content",
    inputSchema: testPlanListApiTestChildBasicAwsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestChildBasicAwsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestChildBasicAwsHandler
  }),
  "testplan_list_api_test_aw_name_views": defineProductTool({
    description: "List CodeArts TestPlan API test AW name view settings",
    inputSchema: testPlanListApiTestAwNameViewsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestAwNameViewsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestAwNameViewsHandler
  }),
  "testplan_list_api_test_basic_aws_batch": defineProductTool({
    description: "Batch list CodeArts TestPlan API test basic AW entries by AW IDs",
    inputSchema: testPlanListApiTestBasicAwsBatchInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestBasicAwsBatchHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestBasicAwsBatchHandler
  }),
  "testplan_list_api_test_basic_aw_param_properties": defineProductTool({
    description: "List CodeArts TestPlan API test basic AW parameter property names",
    inputSchema: testPlanListApiTestBasicAwParamPropertiesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestBasicAwParamPropertiesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestBasicAwParamPropertiesHandler
  }),
  "testplan_list_api_test_basic_aw_infos": defineProductTool({
    description: "List CodeArts TestPlan API test basic AW information entries with catalog details",
    inputSchema: testPlanListApiTestBasicAwInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestBasicAwInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestBasicAwInfosHandler
  }),
  "testplan_list_api_test_basic_aw_infos_v2": defineProductTool({
    description: "List CodeArts TestPlan API test v2 basic AW information entries with catalog details",
    inputSchema: testPlanListApiTestBasicAwInfosV2Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListApiTestBasicAwInfosV2Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListApiTestBasicAwInfosV2Handler
  }),
  "testplan_list_public_aw_lib_and_aws": defineProductTool({
    description: "List CodeArts TestPlan public AW libraries and AWs",
    inputSchema: testPlanListPublicAwLibAndAwsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListPublicAwLibAndAwsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListPublicAwLibAndAwsHandler
  }),
  "testplan_get_api_test_available_config": defineProductTool({
    description: "Get CodeArts TestPlan API test available configuration",
    inputSchema: testPlanGetApiTestAvailableConfigInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestAvailableConfigHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestAvailableConfigHandler
  }),
  "testplan_get_api_test_concurrency_package_status": defineProductTool({
    description: "Get CodeArts TestPlan API test concurrency package status",
    inputSchema: testPlanGetApiTestConcurrencyPackageStatusInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetApiTestConcurrencyPackageStatusHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetApiTestConcurrencyPackageStatusHandler
  }),
  "testplan_get_functional_test_parallel_summary": defineProductTool({
    description: "Get CodeArts TestPlan functional test parallel summary",
    inputSchema: testPlanGetFunctionalTestParallelSummaryInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetFunctionalTestParallelSummaryHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetFunctionalTestParallelSummaryHandler
  }),
  "testplan_get_functional_test_package_status": defineProductTool({
    description: "Get CodeArts TestPlan functional test package status",
    inputSchema: testPlanGetFunctionalTestPackageStatusInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetFunctionalTestPackageStatusHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetFunctionalTestPackageStatusHandler
  }),
  "testplan_get_testcase_script_detail_v1": defineProductTool({
    description: "Get CodeArts TestPlan v1 testcase script detail",
    inputSchema: testPlanGetTestcaseScriptDetailV1Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestcaseScriptDetailV1Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestcaseScriptDetailV1Handler
  }),
  "testplan_get_testcase_script_detail_v3": defineProductTool({
    description: "Get CodeArts TestPlan v3 testcase script detail",
    inputSchema: testPlanGetTestcaseScriptDetailV3Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestcaseScriptDetailV3Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestcaseScriptDetailV3Handler
  }),
  "testplan_get_testcase_script_detail_v4": defineProductTool({
    description: "Get CodeArts TestPlan v4 testcase script detail",
    inputSchema: testPlanGetTestcaseScriptDetailV4Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestcaseScriptDetailV4Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestcaseScriptDetailV4Handler
  }),
  "testplan_list_variable_groups": defineProductTool({
    description: "List CodeArts TestPlan variable groups",
    inputSchema: testPlanListVariableGroupsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListVariableGroupsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListVariableGroupsHandler
  }),
  "testplan_list_notice_configs": defineProductTool({
    description: "List CodeArts TestPlan notice configurations",
    inputSchema: testPlanListNoticeConfigsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListNoticeConfigsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListNoticeConfigsHandler
  }),
  "testplan_list_timeout_settings": defineProductTool({
    description: "List CodeArts TestPlan timeout settings",
    inputSchema: testPlanListTimeoutSettingsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTimeoutSettingsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTimeoutSettingsHandler
  }),
  "testplan_list_variables_v3": defineProductTool({
    description: "List CodeArts TestPlan v3 variables with sensitive values redacted",
    inputSchema: testPlanListVariablesV3Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListVariablesV3Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListVariablesV3Handler
  }),
  "testplan_list_variables_by_group": defineProductTool({
    description: "List CodeArts TestPlan variables by group with sensitive values redacted",
    inputSchema: testPlanListVariablesByGroupInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListVariablesByGroupHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListVariablesByGroupHandler
  }),
  "testplan_get_variable_synchronization_v2": defineProductTool({
    description: "Get CodeArts TestPlan v2 variable synchronization information",
    inputSchema: testPlanGetVariableSynchronizationV2Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetVariableSynchronizationV2Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetVariableSynchronizationV2Handler
  }),
  "testplan_get_variable_synchronization": defineProductTool({
    description: "Get CodeArts TestPlan variable synchronization information",
    inputSchema: testPlanGetVariableSynchronizationInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetVariableSynchronizationHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetVariableSynchronizationHandler
  }),
  "testplan_get_progress": defineProductTool({
    description: "Get CodeArts TestPlan async progress",
    inputSchema: testPlanGetProgressInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProgressHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProgressHandler
  }),
  "testplan_get_project_progress": defineProductTool({
    description: "Get CodeArts TestPlan project async progress",
    inputSchema: testPlanGetProjectProgressInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectProgressHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectProgressHandler
  }),
  "testplan_list_project_service_repos": defineProductTool({
    description: "List CodeArts TestPlan project service repository information",
    inputSchema: testPlanListProjectServiceReposInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProjectServiceReposHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProjectServiceReposHandler
  }),
  "testplan_list_gt3k_project_service_repos": defineProductTool({
    description: "List CodeArts TestPlan GT3K project service repository information",
    inputSchema: testPlanListGt3kProjectServiceReposInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kProjectServiceReposHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kProjectServiceReposHandler
  }),
  "testplan_get_project_service_repo": defineProductTool({
    description: "Get CodeArts TestPlan project service repository information",
    inputSchema: testPlanGetProjectServiceRepoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectServiceRepoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectServiceRepoHandler
  }),
  "testplan_list_task_defects": defineProductTool({
    description: "List CodeArts TestPlan defects under a test suite task",
    inputSchema: testPlanListTaskDefectsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTaskDefectsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTaskDefectsHandler
  }),
  "testplan_list_gt3k_defect_iterators": defineProductTool({
    description: "List CodeArts TestPlan GT3K iterators for a defect",
    inputSchema: testPlanListGt3kDefectIteratorsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kDefectIteratorsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kDefectIteratorsHandler
  }),
  "testplan_list_defect_iterators": defineProductTool({
    description: "List CodeArts TestPlan iterators for a defect",
    inputSchema: testPlanListDefectIteratorsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListDefectIteratorsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListDefectIteratorsHandler
  }),
  "testplan_list_resource_pools": defineProductTool({
    description: "List CodeArts TestPlan resource pools",
    inputSchema: testPlanListResourcePoolsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListResourcePoolsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListResourcePoolsHandler
  }),
  "testplan_list_testexecutor_resource_pools": defineProductTool({
    description: "List CodeArts TestPlan TestExecutor resource pools",
    inputSchema: testPlanListTestexecutorResourcePoolsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestexecutorResourcePoolsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestexecutorResourcePoolsHandler
  }),
  "testplan_list_domain_usage_infos": defineProductTool({
    description: "List CodeArts TestPlan domain usage warning information",
    inputSchema: testPlanListDomainUsageInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListDomainUsageInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListDomainUsageInfosHandler
  }),
  "testplan_list_gt3k_domain_usage_infos": defineProductTool({
    description: "List CodeArts TestPlan GT3K domain usage warning information",
    inputSchema: testPlanListGt3kDomainUsageInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kDomainUsageInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kDomainUsageInfosHandler
  }),
  "testplan_get_gt3k_progress": defineProductTool({
    description: "Get CodeArts TestPlan GT3K asynchronous operation progress",
    inputSchema: testPlanGetGt3kProgressInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kProgressHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kProgressHandler
  }),
  "testplan_get_service_config": defineProductTool({
    description: "Get CodeArts TestPlan service configuration by key",
    inputSchema: testPlanGetServiceConfigInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetServiceConfigHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetServiceConfigHandler
  }),
  "testplan_get_project_service_config": defineProductTool({
    description: "Get CodeArts TestPlan project service configuration",
    inputSchema: testPlanGetProjectServiceConfigInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetProjectServiceConfigHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetProjectServiceConfigHandler
  }),
  "testplan_list_alert_templates": defineProductTool({
    description: "List CodeArts TestPlan alert templates",
    inputSchema: testPlanListAlertTemplatesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListAlertTemplatesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListAlertTemplatesHandler
  }),
  "testplan_get_dashboard_run_panel": defineProductTool({
    description: "Get CodeArts TestPlan dashboard run panel information",
    inputSchema: testPlanGetDashboardRunPanelInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetDashboardRunPanelHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetDashboardRunPanelHandler
  }),
  "testplan_list_dashboard_statistic_blocks": defineProductTool({
    description: "List CodeArts TestPlan dashboard statistic blocks",
    inputSchema: testPlanListDashboardStatisticBlocksInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListDashboardStatisticBlocksHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListDashboardStatisticBlocksHandler
  }),
  "testplan_list_dashboards": defineProductTool({
    description: "List CodeArts TestPlan dashboards",
    inputSchema: testPlanListDashboardsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListDashboardsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListDashboardsHandler
  }),
  "testplan_check_api_test_task_name": defineProductTool({
    description: "Check whether a CodeArts TestPlan API test task name is duplicated",
    inputSchema: testPlanCheckApiTestTaskNameInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckApiTestTaskNameHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckApiTestTaskNameHandler
  }),
  "testplan_get_domain_detail_info": defineProductTool({
    description: "Get CodeArts TestPlan domain detail information",
    inputSchema: testPlanGetDomainDetailInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetDomainDetailInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetDomainDetailInfoHandler
  }),
  "testplan_get_free_declaration": defineProductTool({
    description: "Get CodeArts TestPlan free declaration record for the current user",
    inputSchema: testPlanGetFreeDeclarationInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetFreeDeclarationHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetFreeDeclarationHandler
  }),
  "testplan_get_gt3k_free_declaration": defineProductTool({
    description: "Get CodeArts TestPlan GT3K free declaration record for the current user",
    inputSchema: testPlanGetGt3kFreeDeclarationInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kFreeDeclarationHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kFreeDeclarationHandler
  }),
  "testplan_get_gt3k_user_info_domain": defineProductTool({
    description: "Get CodeArts TestPlan GT3K encrypted user domain information",
    inputSchema: testPlanGetGt3kUserInfoDomainInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kUserInfoDomainHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kUserInfoDomainHandler
  }),
  "testplan_get_factor": defineProductTool({
    description: "Get CodeArts TestPlan test factor detail",
    inputSchema: testPlanGetFactorInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetFactorHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetFactorHandler
  }),
  "testplan_get_user_info_domain": defineProductTool({
    description: "Get CodeArts TestPlan encrypted user domain information",
    inputSchema: testPlanGetUserInfoDomainInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetUserInfoDomainHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetUserInfoDomainHandler
  }),
  "testplan_list_gt3k_branches": defineProductTool({
    description: "List CodeArts TestPlan GT3K branches",
    inputSchema: testPlanListGt3kBranchesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kBranchesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kBranchesHandler
  }),
  "testplan_get_gt3k_branch": defineProductTool({
    description: "Get CodeArts TestPlan GT3K branch detail",
    inputSchema: testPlanGetGt3kBranchInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kBranchHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kBranchHandler
  }),
  "testplan_get_gt3k_background_info": defineProductTool({
    description: "Get CodeArts TestPlan GT3K background information",
    inputSchema: testPlanGetGt3kBackgroundInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kBackgroundInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kBackgroundInfoHandler
  }),
  "testplan_list_v1_branches": defineProductTool({
    description: "List CodeArts TestPlan v1 branches",
    inputSchema: testPlanListV1BranchesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListV1BranchesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListV1BranchesHandler
  }),
  "testplan_list_v4_branches": defineProductTool({
    description: "List CodeArts TestPlan v4 branches",
    inputSchema: testPlanListV4BranchesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListV4BranchesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListV4BranchesHandler
  }),
  "testplan_get_branch": defineProductTool({
    description: "Get CodeArts TestPlan branch detail",
    inputSchema: testPlanGetBranchInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetBranchHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetBranchHandler
  }),
  "testplan_get_gt3k_domain_info": defineProductTool({
    description: "Get CodeArts TestPlan GT3K domain order information",
    inputSchema: testPlanGetGt3kDomainInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kDomainInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kDomainInfoHandler
  }),
  "testplan_list_gt3k_current_user_testcases": defineProductTool({
    description: "List CodeArts TestPlan GT3K current-user testcases",
    inputSchema: testPlanListGt3kCurrentUserTestcasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kCurrentUserTestcasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kCurrentUserTestcasesHandler
  }),
  "testplan_list_current_user_testcases": defineProductTool({
    description: "List CodeArts TestPlan current-user testcases",
    inputSchema: testPlanListCurrentUserTestcasesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListCurrentUserTestcasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListCurrentUserTestcasesHandler
  }),
  "testplan_get_gt3k_testcase_change_statistics": defineProductTool({
    description: "Get CodeArts TestPlan GT3K testcase change statistics",
    inputSchema: testPlanGetGt3kTestcaseChangeStatisticsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetGt3kTestcaseChangeStatisticsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetGt3kTestcaseChangeStatisticsHandler
  }),
  "testplan_get_testcase_change_statistics": defineProductTool({
    description: "Get CodeArts TestPlan testcase change statistics",
    inputSchema: testPlanGetTestcaseChangeStatisticsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestcaseChangeStatisticsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestcaseChangeStatisticsHandler
  }),
  "testplan_list_testcase_comments": defineProductTool({
    description: "List CodeArts TestPlan testcase comments",
    inputSchema: testPlanListTestcaseCommentsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestcaseCommentsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestcaseCommentsHandler
  }),
  "testplan_check_resource_exists": defineProductTool({
    description: "Check whether a CodeArts TestPlan related resource exists",
    inputSchema: testPlanCheckResourceExistsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckResourceExistsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckResourceExistsHandler
  }),
  "testplan_list_testcase_reviews": defineProductTool({
    description: "List CodeArts TestPlan testcase review records",
    inputSchema: testPlanListTestcaseReviewsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestcaseReviewsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestcaseReviewsHandler
  }),
  "testplan_list_v4_testcase_reviews": defineProductTool({
    description: "List CodeArts TestPlan v4 testcase review records",
    inputSchema: testPlanListV4TestcaseReviewsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListV4TestcaseReviewsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListV4TestcaseReviewsHandler
  }),
  "testplan_list_release_versions": defineProductTool({
    description: "List CodeArts TestPlan release versions for testcase or task resources",
    inputSchema: testPlanListReleaseVersionsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListReleaseVersionsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListReleaseVersionsHandler
  }),
  "testplan_get_domain_access_info": defineProductTool({
    description: "Get CodeArts TestPlan domain access and free quota information",
    inputSchema: testPlanGetDomainAccessInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetDomainAccessInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetDomainAccessInfoHandler
  }),
  "testplan_list_registered_services": defineProductTool({
    description: "List CodeArts TestPlan services registered for the current user",
    inputSchema: testPlanListRegisteredServicesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListRegisteredServicesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListRegisteredServicesHandler
  }),
  "testplan_get_image_capacity_warning": defineProductTool({
    description: "Get CodeArts TestPlan project image capacity warning status",
    inputSchema: testPlanGetImageCapacityWarningInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetImageCapacityWarningHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetImageCapacityWarningHandler
  }),
  "testplan_check_user_defined_config_used": defineProductTool({
    description: "Check whether a CodeArts TestPlan user-defined config is used",
    inputSchema: testPlanCheckUserDefinedConfigUsedInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckUserDefinedConfigUsedHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckUserDefinedConfigUsedHandler
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
  "testplan_check_user_info": defineProductTool({
    description: "Check CodeArts TestPlan user info availability for a project",
    inputSchema: testPlanCheckUserInfoInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanCheckUserInfoHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanCheckUserInfoHandler
  }),
  "testplan_get_case_template": defineProductTool({
    description: "Get CodeArts TestPlan case template detail",
    inputSchema: testPlanGetCaseTemplateInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetCaseTemplateHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetCaseTemplateHandler
  }),
  "testplan_list_case_templates": defineProductTool({
    description: "List CodeArts TestPlan case templates",
    inputSchema: testPlanListCaseTemplatesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListCaseTemplatesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListCaseTemplatesHandler
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
  "testplan_list_v4_project_field_configs": defineProductTool({
    description: "List CodeArts TestPlan v4 project field configurations",
    inputSchema: testPlanListV4ProjectFieldConfigsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListV4ProjectFieldConfigsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListV4ProjectFieldConfigsHandler
  }),
  "testplan_list_project_defects": defineProductTool({
    description: "List CodeArts TestPlan project defects",
    inputSchema: testPlanListProjectDefectsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProjectDefectsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProjectDefectsHandler
  }),
  "testplan_list_project_issues": defineProductTool({
    description: "List CodeArts TestPlan project issues",
    inputSchema: testPlanListProjectIssuesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListProjectIssuesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListProjectIssuesHandler
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
  "testplan_list_authorized_tasks": defineProductTool({
    description: "List CodeArts TestPlan authorized test suite tasks in a project",
    inputSchema: testPlanListAuthorizedTasksInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListAuthorizedTasksHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListAuthorizedTasksHandler
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
  "testplan_list_rule_check_tasks": defineProductTool({
    description: "List CodeArts TestPlan version-level testcase rule check tasks",
    inputSchema: testPlanListRuleCheckTasksInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListRuleCheckTasksHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListRuleCheckTasksHandler
  }),
  "testplan_get_rule_check_task_summary": defineProductTool({
    description: "Get CodeArts TestPlan rule check task summary",
    inputSchema: testPlanGetRuleCheckTaskSummaryInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetRuleCheckTaskSummaryHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetRuleCheckTaskSummaryHandler
  }),
  "testplan_get_quality_report_overview": defineProductTool({
    description: "Get CodeArts TestPlan quality report overview statistics",
    inputSchema: testPlanGetQualityReportOverviewInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetQualityReportOverviewHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetQualityReportOverviewHandler
  }),
  "testplan_get_service_type_overview": defineProductTool({
    description: "Get CodeArts TestPlan quality report overview grouped by service type",
    inputSchema: testPlanGetServiceTypeOverviewInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetServiceTypeOverviewHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetServiceTypeOverviewHandler
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
  "testplan_list_iterator_issue_ids": defineProductTool({
    description: "List CodeArts TestPlan issue IDs under an iterator",
    inputSchema: testPlanListIteratorIssueIdsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListIteratorIssueIdsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListIteratorIssueIdsHandler
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
  "testplan_list_requirements_overview": defineProductTool({
    description: "List CodeArts TestPlan quality report requirements overview entries",
    inputSchema: testPlanListRequirementsOverviewInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListRequirementsOverviewHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListRequirementsOverviewHandler
  }),
  "testplan_list_requirements_overview_defects": defineProductTool({
    description: "List CodeArts TestPlan quality report requirement overview defect details",
    inputSchema: testPlanListRequirementsOverviewDetailsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListRequirementsOverviewDefectsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListRequirementsOverviewDefectsHandler
  }),
  "testplan_list_requirements_overview_testcases": defineProductTool({
    description: "List CodeArts TestPlan quality report requirement overview testcase details",
    inputSchema: testPlanListRequirementsOverviewDetailsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListRequirementsOverviewTestcasesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListRequirementsOverviewTestcasesHandler
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
  "testplan_list_testcase_relations": defineProductTool({
    description: "List CodeArts TestPlan requirement or defect relations for testcases",
    inputSchema: testPlanListTestcaseRelationsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListTestcaseRelationsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListTestcaseRelationsHandler
  }),
  "testplan_list_solution_templates": defineProductTool({
    description: "List CodeArts TestPlan solution templates",
    inputSchema: testPlanListSolutionTemplatesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListSolutionTemplatesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListSolutionTemplatesHandler
  }),
  "testplan_list_gt3k_testcase_fields": defineProductTool({
    description: "List CodeArts TestPlan GT3K testcase fields",
    inputSchema: testPlanListGt3kTestcaseFieldsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kTestcaseFieldsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kTestcaseFieldsHandler
  }),
  "testplan_get_testcase_field": defineProductTool({
    description: "Get CodeArts TestPlan testcase field detail",
    inputSchema: testPlanGetTestcaseFieldInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanGetTestcaseFieldHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanGetTestcaseFieldHandler
  }),
  "testplan_list_feature_case_counts": defineProductTool({
    description: "List CodeArts TestPlan testcase counts grouped by feature",
    inputSchema: testPlanListFeatureCaseCountsInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListFeatureCaseCountsHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListFeatureCaseCountsHandler
  }),
  "testplan_list_feature_children": defineProductTool({
    description: "List CodeArts TestPlan feature tree children",
    inputSchema: testPlanListFeatureChildrenInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListFeatureChildrenHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListFeatureChildrenHandler
  }),
  "testplan_list_feature_children_v5": defineProductTool({
    description: "List CodeArts TestPlan v5 feature tree children",
    inputSchema: testPlanListFeatureChildrenV5Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListFeatureChildrenV5Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListFeatureChildrenV5Handler
  }),
  "testplan_list_gt3k_feature_children": defineProductTool({
    description: "List CodeArts TestPlan GT3K feature tree children",
    inputSchema: testPlanListFeatureChildrenInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kFeatureChildrenHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kFeatureChildrenHandler
  }),
  "testplan_list_gt3k_feature_children_v5": defineProductTool({
    description: "List CodeArts TestPlan GT3K v5 feature tree children",
    inputSchema: testPlanListGt3kFeatureChildrenV5Input,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListGt3kFeatureChildrenV5Handler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListGt3kFeatureChildrenV5Handler
  }),
  "testplan_list_feature_descendant_uris": defineProductTool({
    description: "List CodeArts TestPlan feature descendant URIs",
    inputSchema: testPlanListFeatureDescendantUrisInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanListFeatureDescendantUrisHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanListFeatureDescendantUrisHandler
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
  }),
  "testplan_search_api_test_basic_aw_infos": defineProductTool({
    description: "Search CodeArts TestPlan API test v4 basic AW information entries with catalog details",
    inputSchema: testPlanSearchApiTestBasicAwInfosInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanSearchApiTestBasicAwInfosHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanSearchApiTestBasicAwInfosHandler
  }),
  "testplan_search_features": defineProductTool({
    description: "Search CodeArts TestPlan feature tree nodes",
    inputSchema: testPlanSearchFeaturesInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanSearchFeaturesHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanSearchFeaturesHandler
  }),
  "testplan_search_features_by_case": defineProductTool({
    description: "Search CodeArts TestPlan feature tree nodes for a testcase",
    inputSchema: testPlanSearchFeaturesByCaseInput,
    selectHttpClient: (clients: { testPlanClient: Parameters<typeof createTestPlanSearchFeaturesByCaseHandler>[0] }) => clients.testPlanClient,
    createProductHandler: createTestPlanSearchFeaturesByCaseHandler
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
