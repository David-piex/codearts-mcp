import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

const queryValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string())
]);

export const testPlanListPlansInput = pagingSchema.extend({
  project_id: idSchema
});

export const testPlanGetPlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanListCasesInput = pagingSchema.extend({
  project_id: idSchema,
  plan_id: idSchema,
  owner_id: idSchema.optional(),
  status: z.string().min(1).optional(),
  priority: z.string().min(1).optional(),
  module_id: z.string().min(1).optional(),
  label_id: z.string().min(1).optional(),
  test_case_type: z.string().min(1).optional(),
  query: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])
    )
    .optional()
});

export const testPlanListRunsInput = pagingSchema.extend({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanListTasksInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  keyword: z.string().min(1).optional(),
  status_codes: z.array(z.number().int()).optional(),
  executor_ids: z.array(idSchema).optional()
});

export const testPlanGetTaskInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  version_uri: idSchema.optional()
});

export const testPlanGetTesthubTaskInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  version_uri: idSchema.optional()
});

export const testPlanGetApiTestTaskStatusInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const testPlanGetApiTestTaskStatusV2Input = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const testPlanGetTaskExecutionParamInput = z.object({
  task_uri: idSchema,
  project_uuid: idSchema.optional()
});

export const testPlanGetTaskResultDetailInput = pagingSchema.extend({
  project_id: idSchema,
  task_uri: idSchema,
  result_uri: idSchema,
  result: z.string().min(1).optional()
});

export const testPlanGetTestReportInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema
});

export const testPlanListTestReportIssuesInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema,
  completed: z.boolean().optional(),
  query: z.record(z.string(), queryValueSchema).optional()
});

export const testPlanListTestReportDefectsInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema,
  resolved: z.boolean().optional(),
  query: z.record(z.string(), queryValueSchema).optional()
});

export const testPlanListGt3kDefectIteratorsInput = z.object({
  project_id: idSchema,
  defect_id: idSchema
});

export const testPlanListDefectIteratorsInput = z.object({
  project_id: idSchema,
  defect_id: idSchema
});

export const testPlanListTestReportQualityAttributesInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema
});

export const testPlanListCustomReportsInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  type: z.string().min(1)
});

export const testPlanGetCustomTemplateInput = z.object({
  project_id: idSchema,
  version_uri: idSchema
});

export const testPlanListProgressReportsInput = pagingSchema.extend({
  project_uuid: idSchema,
  version_uri: idSchema,
  type: z.string().min(1)
});

export const testPlanListCustomTemplateReportsInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  type: z.string().min(1).optional()
});

export const testPlanListTestReportsInput = pagingSchema.extend({
  project_id: idSchema,
  keyword: z.string().min(1).optional(),
  own: z.boolean().optional()
});

export const testPlanGetRuleCheckTaskReportInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  task_uri: idSchema
});

export const testPlanGetRuleCheckTaskSummaryInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  task_uri: idSchema,
  severity: z.string().min(1).optional(),
  status: z.number().int().optional()
});

export const testPlanGetCaseTemplateInput = z.object({
  project_id: idSchema,
  template_uri: idSchema
});

export const testPlanListTestcaseFieldsInput = z.object({
  project_id: idSchema
});

export const testPlanListTestTypesInput = z.object({
  project_id: idSchema
});

export const testPlanGetTestcaseV4Input = z.object({
  project_uuid: idSchema,
  version_uri: idSchema,
  case_uri: idSchema
});

export const testPlanGetProjectTestcaseInput = z.object({
  project_id: idSchema,
  testcase_id: idSchema
});

export const testPlanGetProjectTestcaseV4Input = z.object({
  project_id: idSchema,
  testcase_uri: idSchema,
  plan_id: idSchema.optional()
});

export const testPlanGetProjectTestcaseByNumberInput = z.object({
  project_id: idSchema,
  testcase_number: z.string().min(1),
  version_uri: idSchema.optional()
});

export const testPlanGetTestDesignTestcaseInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanGetMindmapInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanGetMindmapRecycleInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanGetMindmapBackupInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanGetMindmapStatisticsInput = z.object({
  project_id: idSchema,
  mindmap_id: idSchema
});

export const testPlanListAssetsInput = z.object({
  project_id: idSchema
});

export const testPlanListAssetTreeInput = z.object({
  project_id: idSchema,
  asset_id: idSchema
});

export const testPlanGetFactorInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanGetTestDesignTemplateInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanListTesthubServicesInput = z.object({});

export const testPlanGetTesthubCaseInput = z.object({
  project_id: idSchema,
  case_uri: idSchema
});

export const testPlanGetTesthubCaseByNumberInput = z.object({
  project_id: idSchema,
  testcase_number: z.string().min(1),
  version_uri: idSchema.optional()
});

export const testPlanListAttachmentsInput = z.object({
  project_id: idSchema,
  resource_uri: idSchema,
  resource_type: z.string().min(1)
});

export const testPlanListProjectFieldConfigsInput = z.object({
  project_id: idSchema
});

export const testPlanListV4ProjectFieldConfigsInput = z.object({
  project_id: idSchema
});

export const testPlanListProjectDefectsInput = pagingSchema.extend({
  project_id: idSchema,
  keyword: z.string().min(1).optional(),
  module_id: idSchema.optional(),
  iteration_ids: z.string().min(1).optional()
});

export const testPlanListProjectIssuesInput = pagingSchema.extend({
  project_id: idSchema,
  tracker_id: idSchema.optional(),
  iteration_ids: z.string().min(1).optional(),
  status_id: idSchema.optional(),
  module_id: idSchema.optional(),
  show_page_flag: z.string().min(1).optional(),
  keyword: z.string().min(1).optional()
});

export const testPlanListProjectUsersInput = pagingSchema.extend({
  project_id: idSchema,
  keyword: z.string().min(1).optional()
});

export const testPlanGetCurrentUserPackagePermissionInput = z.object({
  project_id: idSchema,
  package_type: z.string().min(1)
});

export const testPlanGetUserPackagePermissionInput = z.object({
  project_id: idSchema,
  user_id: idSchema,
  package_type: z.string().min(1)
});

export const testPlanGetDomainUserCountInput = z.object({
  project_id: idSchema
});

export const testPlanListProjectTagsInput = z.object({
  project_id: idSchema,
  resource_type: z.string().min(1)
});

export const testPlanGetCustomizedColumnsInput = z.object({
  project_id: idSchema,
  service_type: z.number().int(),
  stage_type: z.number().int()
});

export const testPlanGetProjectDomainDetailInfoInput = z.object({
  project_id: idSchema,
  order_query_type: z.string().min(1).optional()
});

export const testPlanGetProjectAdvancedFeatureTrialInput = z.object({
  project_id: idSchema
});

export const testPlanGetProjectAdvancedFeatureTrustedInput = z.object({
  project_id: idSchema
});

export const testPlanGetDomainFrozenInfoInput = z.object({
  project_uuid: idSchema
});

export const testPlanGetDomainNeedPopupInput = z.object({
  project_uuid: idSchema.optional()
});

export const testPlanGetUserDisclaimerInput = z.object({
  type: z.string().min(1)
});

export const testPlanGetProjectMessageNoticesInput = z.object({
  project_id: idSchema
});

export const testPlanGetProjectIssueUpdateNotificationInput = z.object({
  project_id: idSchema,
  owner_id: idSchema
});

export const testPlanGetProjectMasterVersionInput = z.object({
  project_id: idSchema
});

export const testPlanCheckUserInfoInput = z.object({
  project_id: idSchema
});

export const testPlanGetMindmapCreatorNameInput = z.object({
  project_id: idSchema
});

export const testPlanGetMindmapPermissionInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanCheckUserExistsInput = z.object({});

export const testPlanGetDomainDetailInfoInput = z.object({
  domain_id: idSchema.optional(),
  region: z.string().min(1).optional(),
  order_query_type: z.string().min(1).optional()
});

export const testPlanGetFreeDeclarationInput = z.object({});

export const testPlanGetGt3kUserInfoDomainInput = z.object({});

export const testPlanGetUserInfoDomainInput = z.object({});

export const testPlanListGt3kBranchesInput = z.object({
  project_uuid: idSchema,
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional()
});

export const testPlanListV4BranchesInput = z.object({
  project_uuid: idSchema,
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional()
});

export const testPlanGetGt3kDomainInfoInput = z.object({
  project_uuid: idSchema.optional()
});

export const testPlanListGt3kCurrentUserTestcasesInput = pagingSchema.extend({
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional(),
  keyword: z.string().min(1).optional()
});

export const testPlanListCurrentUserTestcasesInput = pagingSchema.extend({
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional(),
  keyword: z.string().min(1).optional()
});

export const testPlanGetGt3kTestcaseChangeStatisticsInput = z.object({
  project_id: idSchema,
  version_id: idSchema
});

export const testPlanGetTestcaseChangeStatisticsInput = z.object({
  project_id: idSchema,
  version_uri: idSchema
});

export const testPlanListTestcaseCommentsInput = pagingSchema.extend({
  project_id: idSchema,
  testcase_id: idSchema,
  version_uri: idSchema.optional()
});

export const testPlanCheckResourceExistsInput = z.object({
  project_id: idSchema,
  resource_uri: idSchema,
  version_uri: idSchema,
  type: z.number().int()
});

export const testPlanListTestcaseReviewsInput = pagingSchema.extend({
  testcase_uri: idSchema,
  project_uuid: idSchema,
  version_uri: idSchema
});

export const testPlanListReleaseVersionsInput = z.object({
  project_id: idSchema,
  resource_type: z.string().min(1),
  version_uri: idSchema.optional(),
  limit: z.number().int().positive().optional()
});

export const testPlanGetDomainAccessInfoInput = z.object({
  project_uuid: idSchema
});

export const testPlanListRegisteredServicesInput = z.object({});

export const testPlanGetImageCapacityWarningInput = z.object({
  project_id: idSchema
});

export const testPlanCheckUserDefinedConfigUsedInput = z.object({
  project_id: idSchema,
  config_id: idSchema,
  type: z.string().min(1)
});

export const testPlanListServiceOfferingsInput = z.object({
  serviceNames: z.string().min(1).optional()
});

export const testPlanListEnvironmentsInput = pagingSchema.extend({
  project_id: idSchema
});

export const testPlanListIteratorInfosInput = z.object({
  project_id: idSchema
});

export const testPlanListVisibleServicesInput = z.object({
  project_id: idSchema
});

export const testPlanGetLicenseSpecificationInput = z.object({});

export const testPlanListResourceNumberRulesInput = z.object({
  project_id: idSchema
});

export const testPlanGetProjectTestcaseGlobalConfigInput = z.object({
  project_id: idSchema
});

export const testPlanGetProjectLocalConfigInput = z.object({
  project_id: idSchema,
  property: z.string().min(1)
});

export const testPlanGetProjectSystemConfigInput = z.object({
  project_uuid: idSchema,
  owner_id: idSchema,
  feature_name: z.string().min(1)
});

export const testPlanCheckProjectMemberExistsInput = z.object({});

export const testPlanListTestReportCustomInfosInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema
});

export const testPlanListProjectServiceReposInput = pagingSchema.extend({
  project_id: idSchema
});

export const testPlanGetProjectServiceRepoInput = z.object({
  project_id: idSchema,
  service_id: z.union([idSchema, z.number().int()])
});

export const testPlanListTaskDefectsInput = pagingSchema.extend({
  project_id: idSchema,
  task_uri: idSchema,
  version_uri: idSchema.optional()
});

export const testPlanListResourcePoolsInput = z.object({
  project_id: idSchema
});

export const testPlanListDomainUsageInfosInput = z.object({
  project_uuid: idSchema
});

export const testPlanGetGt3kProgressInput = z.object({
  operation_uri: idSchema,
  project_uuid: idSchema
});

export const testPlanGetServiceConfigInput = z.object({
  service_id: idSchema,
  key: z.string().min(1),
  type: z.string().min(1)
});

export const testPlanListAlertTemplatesInput = pagingSchema.extend({
  service_id: idSchema,
  name: z.string().min(1).optional()
});

export const testPlanCheckAlertUserNameInput = z.object({
  service_id: idSchema,
  user_name: z.string().min(1),
  user_id: idSchema.optional()
});

export const testPlanCheckAlertTemplateNameInput = z.object({
  service_id: idSchema,
  name: z.string().min(1),
  id: idSchema.optional()
});

export const testPlanGetDashboardRunPanelInput = z.object({
  service_id: idSchema
});

export const testPlanListDashboardStatisticBlocksInput = pagingSchema.extend({
  service_id: idSchema,
  start_time: z.number().int(),
  end_time: z.number().int(),
  executor_type: z.string().min(1).optional(),
  label: z.string().min(1),
  location_id: idSchema.optional()
});

export const testPlanListDashboardsInput = pagingSchema.extend({
  service_id: idSchema,
  name: z.string().min(1).optional()
});

export const testPlanListApiTestPackageStatusInput = z.object({
  service_id: idSchema
});

export const testPlanGetApiTestConcurrencyPackageStatusInput = z.object({
  test_type: z.string().min(1).optional()
});

export const testPlanGetFunctionalTestParallelSummaryInput = z.object({});

export const testPlanGetFunctionalTestPackageStatusInput = z.object({});

export const testPlanCheckApiTestTaskNameInput = z.object({
  service_id: idSchema,
  task_name: z.string().min(1),
  task_id: idSchema.optional()
});

export const testPlanGetApiTestPackageChargePopupInput = z.object({
  project_id: idSchema
});

export const testPlanListApiTestPackageUsageInput = z.object({
  project_id: idSchema
});

export const testPlanGetApiTestPackageChargeMessageInput = z.object({
  project_id: idSchema
});

export const testPlanGetSuiteInfoPageUrlInput = z.object({
  testServiceId: idSchema,
  suiteId: idSchema
});

export const testPlanGetApiTestDebugLogInput = z.object({
  project_id: idSchema,
  case_id: idSchema,
  task_id: idSchema
});

export const testPlanListApiTestcaseExecuteHistoriesInput = pagingSchema.extend({
  project_id: idSchema,
  testcase_id: idSchema,
  plan_id: idSchema.optional()
});

export const testPlanListApiTestcaseHistoryInput = z.object({
  project_id: idSchema,
  plan_id: idSchema.optional()
});

export const testPlanGetFreeTestTimeInput = z.object({
  testServiceId: idSchema
});

export const testPlanListApiTestsuiteHistoryInput = z.object({
  project_id: idSchema,
  plan_id: idSchema.optional()
});

export const testPlanGetApiTestDnsMappingInput = z.object({
  project_id: idSchema
});

export const testPlanListApiTestGlobalParamNamesInput = z.object({
  project_id: idSchema
});

export const testPlanListApiTestVariablesInput = pagingSchema.extend({
  project_id: idSchema,
  group_id: idSchema
});

export const testPlanGetApiTestBasicAwV3Input = z.object({
  project_id: idSchema,
  aw_id: idSchema
});

export const testPlanListApiTestChildBasicAwsInput = z.object({
  project_id: idSchema,
  parent_id: z.string().min(1),
  aw_name: z.string().optional(),
  source_type: z.union([z.string(), z.number().int()]).optional()
});

export const testPlanListApiTestAwNameViewsInput = z.object({
  project_id: idSchema
});

export const testPlanListApiTestBasicAwParamPropertiesInput = z.object({
  project_id: idSchema,
  aw_id: idSchema
});

export const testPlanListPublicAwLibAndAwsInput = z.object({
  project_id: idSchema
});

export const testPlanGetApiTestAvailableConfigInput = z.object({
  project_id: idSchema
});

export const testPlanGetTestcaseScriptDetailV1Input = z.object({
  project_id: idSchema,
  tmss_case_uri: idSchema
});

export const testPlanGetTestcaseScriptDetailV3Input = z.object({
  project_id: idSchema,
  tmss_case_uri: idSchema,
  task_id: idSchema.optional()
});

export const testPlanGetTestcaseScriptDetailV4Input = z.object({
  project_id: idSchema,
  tmss_case_uri: idSchema,
  task_id: idSchema.optional()
});

export const testPlanListVariableGroupsInput = pagingSchema.extend({
  project_id: idSchema
});

export const testPlanListNoticeConfigsInput = z.object({
  project_id: idSchema
});

export const testPlanListTimeoutSettingsInput = z.object({
  project_id: idSchema
});

export const testPlanListVariablesV3Input = pagingSchema.extend({
  project_id: idSchema,
  group_id: idSchema.optional()
});

export const testPlanListVariablesByGroupInput = pagingSchema.extend({
  project_id: idSchema,
  group_id: idSchema.optional()
});

export const testPlanGetVariableSynchronizationV2Input = z.object({
  project_id: idSchema,
  variable_name: z.string().min(1),
  group_id: idSchema.optional()
});

export const testPlanGetVariableSynchronizationInput = z.object({
  project_id: idSchema,
  variable_name: z.string().min(1),
  group_id: idSchema.optional()
});

export const testPlanGetProgressInput = z.object({
  id: idSchema,
  project_id: idSchema.optional()
});

export const testPlanGetProjectProgressInput = z.object({
  project_id: idSchema,
  operation_uri: idSchema
});

export const testPlanGetTesthubProgressInput = z.object({
  project_uuid: idSchema,
  operation_uri: idSchema
});

export const testPlanListGt3kProjectServiceReposInput = pagingSchema.extend({
  project_uuid: idSchema
});

export const testPlanListGt3kIteratorInfosInput = z.object({
  project_id: idSchema
});

export const testPlanListGt3kVisibleServicesInput = z.object({
  project_id: idSchema
});

export const testPlanListGt3kDomainUsageInfosInput = z.object({
  project_uuid: idSchema
});

export const testPlanListGt3kTestcaseFieldsInput = z.object({
  project_id: idSchema
});

export const testPlanGetGt3kFreeDeclarationInput = z.object({});

export const testPlanListV4TestcaseReviewsInput = pagingSchema.extend({
  testcase_uri: idSchema,
  project_uuid: idSchema,
  version_uri: idSchema
});

export const testPlanGetBranchInput = z.object({
  branch_uri: idSchema,
  project_uuid: idSchema
});

export const testPlanGetGt3kBranchInput = z.object({
  branch_id: idSchema,
  project_uuid: idSchema
});

export const testPlanListIteratorIssueIdsInput = z.object({
  project_id: idSchema,
  iterator_uri: idSchema
});

export const testPlanListFeatureDescendantUrisInput = z.object({
  project_id: idSchema,
  feature_uri: idSchema
});

export const testPlanGetTestcaseFieldInput = z.object({
  project_id: idSchema,
  uri: idSchema
});

export const testPlanListTestexecutorResourcePoolsInput = z.object({
  project_id: idSchema
});

export const testPlanListTesthubBranchesInput = pagingSchema.extend({
  project_id: idSchema,
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional()
});

export const testPlanListTesthubIteratorsInput = pagingSchema.extend({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  current_stage: z.string().min(1).optional(),
  branch_uri: idSchema.optional()
});

export const testPlanListTesthubIteratorsV5Input = pagingSchema.extend({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  current_stage: z.string().min(1).optional(),
  branch_uri: idSchema.optional(),
  fix_version_ids: z.string().min(1).optional(),
  query_all_version: z.boolean().optional()
});

export const testPlanGetIteratorInput = z.object({
  project_uuid: idSchema,
  iterator_uri: idSchema
});

export const testPlanListIteratorIssuesInput = pagingSchema.extend({
  project_id: idSchema,
  iterator_uri: idSchema
});

export const testPlanListIteratorHistoriesInput = pagingSchema.extend({
  project_id: idSchema,
  iterator_uri: idSchema
});

export const testPlanGetTaskSuccessTestCasesCountInput = z.object({
  project_uuid: idSchema,
  version_uri: idSchema,
  task_uri: idSchema
});

export const testPlanCreateTaskInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  uri: idSchema.optional(),
  description: z.string().optional(),
  version_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateTaskInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  name: z.string().min(1),
  uri: idSchema.optional(),
  description: z.string().optional(),
  version_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanBatchDeleteTasksInput = z.object({
  project_id: idSchema,
  task_uris: z.array(idSchema).min(1),
  version_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanCreateTaskRelationsInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  uri: idSchema.optional(),
  stage: z.string().min(1).optional(),
  number: z.string().min(1).optional(),
  tags: z.string().min(1).optional(),
  description: z.string().optional(),
  region: z.string().min(1).optional(),
  version_uri: idSchema.optional(),
  owner_id: idSchema.optional(),
  parent_uri: idSchema.optional(),
  test_case_condition: z.string().min(1).optional(),
  service_type: z.number().int().optional(),
  module_id: idSchema.optional(),
  module_name: z.string().min(1).optional(),
  release_dev: z.string().min(1).optional(),
  status_code: z.number().int().optional(),
  ext_param: z.string().min(1).optional(),
  execute_way: z.number().int().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanInitTaskExecutionInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  release_dev: z.string().min(1).optional(),
  version_uri: idSchema.optional(),
  is_query: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanStopTaskExecutionInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  result_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanListTaskCasesInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema,
  status: z.array(z.string().min(1)).optional(),
  version_uri: idSchema.optional()
});

export const testPlanListTaskCasesV4Input = pagingSchema.extend({
  project_id: idSchema,
  task_uri: idSchema,
  results: z.array(z.string().min(1)).optional(),
  status: z.array(z.string().min(1)).optional(),
  version_uri: idSchema.optional(),
  owners: z.array(idSchema).optional(),
  rank_ids: z.array(idSchema).optional()
});

export const testPlanListTaskResultsInput = pagingSchema.extend({
  project_id: idSchema,
  task_uri: idSchema,
  iterator_uri: idSchema.optional()
});

export const testPlanGetCaseInput = z.object({
  project_id: idSchema,
  case_id: idSchema
});

export const testPlanListIssuesInput = pagingSchema.extend({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanRunCasesInput = z.object({
  project_id: idSchema,
  execute_list: z.array(
    z
      .object({
        case_id: idSchema.optional(),
        testcase_id: idSchema.optional(),
        executor_id: idSchema.optional(),
        execute_id: idSchema.optional(),
        result_id: z.string().min(1).optional(),
        start_time: z.string().min(1).optional(),
        end_time: z.string().min(1).optional(),
        duration: z.number().int().nonnegative().optional(),
        description: z.string().min(1).optional(),
        remark: z.string().min(1).optional()
      })
      .refine((item) => Boolean(item.case_id ?? item.testcase_id), {
        message: "case_id or testcase_id is required"
      })
  ).min(1),
  dry_run: z.boolean().default(true)
});
