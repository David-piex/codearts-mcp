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

export const testPlanListPlansV2Input = pagingSchema.extend({
  project_id: idSchema,
  current_stage: z.string().min(1).optional(),
  fix_version_ids: z.string().min(1).optional(),
  branch_uri: z.string().min(1).optional(),
  query_all_version: z.boolean().optional()
});

export const testPlanGetPlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanListPlanJournalsInput = pagingSchema.extend({
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

export const testPlanListAuthorizedTasksInput = pagingSchema.extend({
  project_id: idSchema,
  keyword: z.string().min(1).optional(),
  service_type: z.number().int().optional()
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

export const testPlanShowTaskStatusInput = testPlanGetApiTestTaskStatusInput;

export const testPlanGetApiTestTaskStatusV2Input = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const testPlanShowTaskStatusTwoInput = testPlanGetApiTestTaskStatusV2Input;

export const testPlanGetTaskExecutionParamInput = z.object({
  task_uri: idSchema,
  project_uuid: idSchema.optional()
});

export const testPlanListTaskParameterTemplatesInput = z.object({
  project_id: idSchema,
  serviceId: idSchema,
  sort_by: z.string().min(1).optional(),
  sort_direction: z.string().min(1).optional(),
  name: z.string().optional()
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

export const testPlanCreateTestReportInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  name: z.string().min(1),
  test_conclusion: z.string().optional(),
  test_conclusion_details: z.string().optional(),
  risk_analysis: z.string().optional(),
  iterator_uris: z.array(z.string().min(1)).optional(),
  body: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateTestReportInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema,
  name: z.string().min(1),
  test_conclusion: z.string().optional(),
  test_conclusion_details: z.string().optional(),
  risk_analysis: z.string().optional(),
  iterator_uris: z.array(z.string().min(1)).optional(),
  body: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateTestReportQualityAttributesInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  report_uri: idSchema,
  body: z.record(z.string(), z.unknown()),
  dry_run: z.boolean().default(true)
});

const testPlanOverviewPiFilterInput = z
  .object({
    all_pi: z.boolean().optional(),
    pi_sprints: z
      .array(
        z.object({
          pi_id: z.string().optional(),
          sprints: z.array(z.string()).optional()
        })
      )
      .optional()
  })
  .passthrough();

const testPlanOverviewFilterInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  module_id: z.string().min(1).optional(),
  fixed_version_id: z.string().min(1).optional(),
  owner_id: z.string().min(1).optional(),
  own: z.boolean().optional(),
  pi_filter: testPlanOverviewPiFilterInput.optional()
});

export const testPlanGetServiceTypeOverviewInput = testPlanOverviewFilterInput;

export const testPlanGetQualityReportOverviewInput = testPlanOverviewFilterInput;

export const testPlanGetHomePageCaseOverviewInput = testPlanOverviewFilterInput;

export const testPlanGetHomePageDefectSeverityOverviewInput = testPlanOverviewFilterInput;

export const testPlanGetHomePageDefectStatusOverviewInput = testPlanOverviewFilterInput;

export const testPlanGetHomePageOverviewV5Input = testPlanOverviewFilterInput;

export const testPlanListUserExecuteTestcaseStatisticsInput = z
  .object({
    project_id: idSchema,
    offset: z.number().int().min(0).default(0),
    limit: z.number().int().min(1).max(100).default(20),
    execute_start_time: z.string().min(1),
    execute_end_time: z.string().min(1)
  })
  .passthrough();

export const testPlanListTestcaseDefectStatisticsInput = z
  .object({
    project_id: idSchema,
    offset: z.number().int().min(0).default(0),
    limit: z.number().int().min(1).max(100).default(20),
    create_testcase_start_time: z.string().min(1),
    create_testcase_end_time: z.string().min(1),
    branch_id: z.string().min(1).optional(),
    associate_defect_start_time: z.string().min(1).optional(),
    associate_defect_end_time: z.string().min(1).optional()
  })
  .passthrough();

export const testPlanCheckTestcaseExistsInput = z.object({
  project_uuid: idSchema,
  case_uris: z.array(z.string().min(1)).min(1),
  version_uri: z.string().min(1).optional()
});

const testPlanSearchConditionInput = z.object({
  field: z.string().min(1).optional(),
  operator: z.string().min(1).optional(),
  value: z.unknown().optional()
}).passthrough();

export const testPlanSearchTestcaseUrisUsedForAutomationInput = pagingSchema.extend({
  project_uuid: idSchema,
  keyword: z.string().min(1).optional(),
  exeplatforms: z.array(z.string().min(1)).optional(),
  own: z.boolean().optional(),
  conditions: z.array(testPlanSearchConditionInput).optional(),
  queryByDisplayCfg: z.boolean().optional(),
  useOffset: z.boolean().optional(),
  version_uri: z.string().min(1).optional(),
  case_uris: z.array(z.string().min(1)).optional(),
  owner_ids: z.array(z.string().min(1)).optional(),
  status_codes: z.array(z.string().min(1)).optional(),
  rank_ids: z.array(z.string().min(1)).optional(),
  module_ids: z.array(z.string().min(1)).optional(),
  issue_id: z.string().min(1).optional(),
  creator_ids: z.array(z.string().min(1)).optional()
}).passthrough();

export const testPlanGetProjectDataDashboardInput = z
  .object({
    project_id: idSchema,
    plan_id: z.string().min(1).optional(),
    branch_id: z.string().min(1).optional(),
    module_id: z.string().min(1).optional(),
    fixed_version_id: z.string().min(1).optional()
  })
  .passthrough();

export const testPlanListRequirementsOverviewInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  fixed_version_id: z.string().min(1).optional(),
  module_id: z.string().min(1).optional(),
  key_word: z.string().optional(),
  pi_filter: testPlanOverviewPiFilterInput.optional()
});

export const testPlanListRequirementsOverviewDetailsInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  work_item_id: z.string().min(1),
  work_item_name: z.string().optional()
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

export const testPlanCreateDefectAssociationInput = z.object({
  project_id: idSchema,
  defect_id: idSchema,
  iterator_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateDefectAssociationInput = z.object({
  project_id: idSchema,
  defect_id: idSchema,
  old_iterator_uri: idSchema,
  new_iterator_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteDefectAssociationInput = z.object({
  project_id: idSchema,
  defect_id: idSchema,
  iterator_uri: idSchema,
  dry_run: z.boolean().default(true)
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

export const testPlanRefreshCustomTemplateReportInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  uri: z.string().min(1).optional(),
  name: z.string().min(1),
  type: z.union([z.string().min(1), z.number().int()]).optional(),
  workpiece_type: z.string().min(1).optional(),
  template_config: z.record(z.string(), z.unknown()).optional(),
  body: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanListTestReportsInput = pagingSchema.extend({
  project_id: idSchema,
  keyword: z.string().min(1).optional(),
  own: z.boolean().optional()
});

export const testPlanListRuleCheckTasksInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  name: z.string().min(1).optional()
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

export const testPlanListBranchTestcaseDuplicateNumbersInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  numbers: z.array(z.string().min(1)).optional(),
  uri_to_number_list: z
    .array(
      z.object({
        uri: z.string().min(1).optional(),
        number: z.string().min(1).optional()
      })
    )
    .optional()
});

export const testPlanGetCaseTemplateInput = z.object({
  project_id: idSchema,
  template_uri: idSchema
});

export const testPlanGetExcelErrorTestcasesInput = z.object({
  project_id: idSchema,
  error_id: idSchema
});

export const testPlanListCaseTemplatesInput = z.object({
  project_id: idSchema,
  name: z.string().optional(),
  is_default: z.boolean().optional(),
  is_recommended: z.boolean().optional(),
  industry_type: z.union([z.string(), z.number().int()]).optional()
});

export const testPlanListSolutionTemplatesInput = z.object({
  project_id: idSchema,
  name: z.string().optional(),
  is_recommended: z.boolean().optional(),
  industry_type: z.union([z.string(), z.number().int()]).optional()
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

export const testPlanListMindmapsV2Input = pagingSchema.extend({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  id_collection: z.array(idSchema).optional(),
  folder_id_collection: z.array(idSchema).optional(),
  folder_root_id: idSchema.optional(),
  creator_name_collection: z.array(z.string().min(1)).optional(),
  updater_name_collection: z.array(z.string().min(1)).optional()
});

export const testPlanListMindmapsV3Input = testPlanListMindmapsV2Input.extend({
  branch_uri: idSchema.optional(),
  iterator_uri: z.string().optional(),
  is_master: z.number().int().optional(),
  confidentiality_code_collection: z.array(z.string().min(1)).optional()
});

export const testPlanListMindmapRecyclesInput = pagingSchema.extend({
  project_id: idSchema,
  creator_num: idSchema.optional(),
  text: z.string().min(1).optional()
});

export const testPlanListMindmapBackupsInput = pagingSchema.extend({
  project_id: idSchema,
  mindmap_id: idSchema.optional(),
  bak_name: z.string().min(1).optional(),
  type: z.string().min(1).optional()
});

export const testPlanCountMindmapsInput = z.object({
  project_id: idSchema,
  parent_folder_id_collection: z.array(idSchema).optional(),
  project_type: z.string().min(1).optional(),
  folder_root_id: idSchema.optional(),
  branch_uri: idSchema.optional(),
  iterator_uri: z.string().optional(),
  is_master: z.number().int().optional(),
  upward_recursion: z.boolean().optional()
});

export const testPlanListAssetsInput = z.object({
  project_id: idSchema
});

export const testPlanListProjectAssetsV1Input = testPlanListAssetsInput;

export const testPlanListAssetTreeInput = z.object({
  project_id: idSchema,
  asset_id: idSchema
});

export const testPlanListFactorsByAssetInput = pagingSchema.extend({
  project_id: idSchema,
  asset_id: idSchema,
  type: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  parent_node_ids: z.array(idSchema).optional(),
  creator_num: idSchema.optional(),
  mindmap_id: idSchema.optional(),
  testpoint_id: idSchema.optional(),
  mindmap_node_id: idSchema.optional()
});

export const testPlanGetFactorInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanDeleteFactorInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanBatchDeleteFactorsInput = z.object({
  project_id: idSchema,
  factor_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteAssetInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanGetTestDesignTemplateInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanDeleteTestDesignTemplateInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanDownloadTestDesignTemplateInput = z.object({
  project_id: idSchema,
  file_name: z.string().min(1).optional()
});

export const testPlanDownloadAssetTemplateInput = z.object({
  project_id: idSchema
});

export const testPlanExportMindmapInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const testPlanDeleteMindmapInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteMindmapRecycleInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteMindmapBackupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
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

export const testPlanDeleteAttachmentInput = z.object({
  project_id: idSchema,
  attachment_uri: idSchema,
  dry_run: z.boolean().default(true)
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

export const testPlanShowMindmapCreatorNameInput = testPlanGetMindmapCreatorNameInput;

export const testPlanListDynamicGlobalVariablesInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const testPlanGetDynamicGlobalVariableInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  key: z.string().min(1)
});

export const testPlanUpdateDynamicGlobalVariableInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  key: z.string().min(1),
  body: z.custom<unknown>((value) => value !== undefined, {
    message: "body is required"
  }),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteDynamicGlobalVariableInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  key: z.string().min(1),
  dry_run: z.boolean().default(true)
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

export const testPlanListV1BranchesInput = pagingSchema.extend({
  project_id: idSchema,
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional()
});

export const testPlanListProjectBranchesV1Input = testPlanListV1BranchesInput;

export const testPlanGetGt3kDomainInfoInput = z.object({
  project_uuid: idSchema.optional()
});

export const testPlanGetGt3kBackgroundInfoInput = z.object({
  project_id: idSchema
});

export const testPlanGetBackgroundInfoInput = z.object({
  project_id: idSchema
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

export const testPlanListTesthubTestcasesInput = pagingSchema.extend({
  project_id: idSchema,
  useOffset: z.boolean().optional(),
  plan_id: idSchema.optional(),
  case_ids: z.array(idSchema).optional(),
  owner_ids: z.array(idSchema).optional(),
  status_ids: z.array(idSchema).optional(),
  rank_ids: z.array(idSchema).optional(),
  module_ids: z.array(idSchema).optional(),
  issue_id: idSchema.optional(),
  creator_ids: z.array(idSchema).optional(),
  result_ids: z.array(idSchema).optional(),
  iteration_ids: z.array(idSchema).optional(),
  start_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional(),
  associate_issue: z.boolean().optional(),
  associated_defects: z.boolean().optional(),
  show_children: z.boolean().optional(),
  label_ids: z.array(idSchema).optional(),
  execute_start_time: z.string().min(1).optional(),
  execute_end_time: z.string().min(1).optional(),
  executor_ids: z.array(idSchema).optional(),
  is_keyword: z.boolean().optional(),
  issue_tree_search: z.boolean().optional(),
  service_id: z.number().int().optional(),
  stage_type: z.number().int().optional(),
  cata_id: idSchema.optional(),
  subject: z.string().min(1).optional(),
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional(),
  associate_issue_detail: z.boolean().optional()
});

export const testPlanListTesthubTestcasesV5Input = pagingSchema.extend({
  project_id: idSchema,
  useOffset: z.boolean().optional(),
  version_id: idSchema.optional(),
  execution_type_id: z.number().int().optional()
});

export const testPlanListTestcaseUrisV4Input = pagingSchema.extend({
  project_id: idSchema,
  keyword: z.string().min(1).optional(),
  useOffset: z.boolean().optional(),
  version_uri: idSchema.optional(),
  case_uris: z.array(idSchema).optional(),
  owner_ids: z.array(idSchema).optional(),
  status_codes: z.array(z.number().int()).optional(),
  rank_ids: z.array(idSchema).optional(),
  module_ids: z.array(idSchema).optional(),
  issue_id: idSchema.optional(),
  creator_ids: z.array(idSchema).optional(),
  result_codes: z.array(z.number().int()).optional(),
  iteration_ids: z.array(idSchema).optional(),
  create_start_time: z.string().min(1).optional(),
  create_end_time: z.string().min(1).optional(),
  associated_issue: z.boolean().optional(),
  associated_defects: z.boolean().optional(),
  include_sub_issue: z.boolean().optional(),
  include_sub_feature: z.boolean().optional(),
  label_ids: z.array(idSchema).optional(),
  execute_start_time: z.string().min(1).optional(),
  execute_end_time: z.string().min(1).optional(),
  executor_ids: z.array(idSchema).optional(),
  test_types: z.array(z.number().int()).optional(),
  is_keyword: z.boolean().optional(),
  issue_tree_search: z.boolean().optional(),
  service_type: z.number().int().optional(),
  service_types: z.array(z.number().int()).optional(),
  stage_type: z.number().int().optional(),
  feature_uri: idSchema.optional(),
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional(),
  case_type: z.number().int().optional(),
  custom_field_info: z.record(z.string(), z.unknown()).optional(),
  task_uri: idSchema.optional(),
  associate_issue_detail: z.boolean().optional(),
  not_assign_task: z.boolean().optional(),
  test_designs: z.array(z.string().min(1)).optional(),
  review_status: z.number().int().optional(),
  just_return_id: z.boolean().optional()
});

export const testPlanListTestcaseUriInfosV5Input = testPlanListTestcaseUrisV4Input;

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

export const testPlanGetProjectServiceConfigInput = z.object({
  project_id: idSchema,
  key: z.string().min(1).optional(),
  type: z.string().min(1).optional()
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

export const testPlanGetCaseLogdataUploadUrlInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  file_type: z.string().min(1),
  case_id: idSchema.optional(),
  filename: z.string().optional(),
  round: z.string().optional()
});

export const testPlanGetCaseLogdataArchiveInput = z.object({
  project_id: idSchema,
  case_id: idSchema,
  task_id: idSchema,
  round: z.string().optional()
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

export const testPlanGetProjectDnsMappingV1Input = testPlanGetApiTestDnsMappingInput;

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

export const testPlanGetApiTestBasicAwV4Input = z.object({
  project_id: idSchema,
  aw_id: idSchema,
  is_api: z.boolean().optional()
});

export const testPlanListApiTestBasicAwInfosInput = pagingSchema.extend({
  project_id: idSchema,
  aw_name: z.string().optional(),
  parent_id: z.string().min(1).optional()
});

export const testPlanListApiTestBasicAwInfosV2Input = pagingSchema.extend({
  project_id: idSchema,
  aw_name: z.string().optional(),
  parent_id: z.string().min(1).optional()
});

export const testPlanSearchApiTestBasicAwInfosInput = pagingSchema.extend({
  project_id: idSchema,
  parent_id: z.string().min(1).optional(),
  search_type: z.string().min(1).optional(),
  search_value: z.string().min(1).optional()
});

export const testPlanListApiTestBasicAwsBatchInput = z.object({
  project_id: idSchema,
  aw_ids: z.array(z.string().min(1)).min(1)
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

export const testPlanShowAwNameViewInput = testPlanListApiTestAwNameViewsInput;

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

export const testPlanGetApiTestProjectInfoInput = z.object({
  project_id: idSchema,
  group_id: idSchema.optional()
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

export const testPlanShowTimeOutViewInput = testPlanListTimeoutSettingsInput;

export const testPlanListVariablesV3Input = pagingSchema.extend({
  project_id: idSchema,
  group_id: idSchema.optional()
});

export const testPlanListVariablesByGroupInput = pagingSchema.extend({
  project_id: idSchema,
  group_id: idSchema.optional()
});

export const testPlanListVariablesByGroupWithSensitiveInput = z.object({
  project_id: idSchema,
  group_id: idSchema.optional()
});

export const testPlanShowSensitivePropertyByIdInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  var_id: idSchema
});

export const testPlanShowVariablesDecryptInput = z.object({
  project_id: idSchema,
  variable_id: idSchema
});

export const testPlanGetVariableSynchronizationV2Input = z.object({
  project_id: idSchema,
  variable_name: z.string().min(1),
  group_id: idSchema.optional()
});

export const testPlanListVariableSynchronizationTwoInput = testPlanGetVariableSynchronizationV2Input;

export const testPlanGetVariableSynchronizationInput = z.object({
  project_id: idSchema,
  variable_name: z.string().min(1),
  group_id: idSchema.optional()
});

export const testPlanListVariableSynchronizationInput = testPlanGetVariableSynchronizationInput;

export const testPlanUpdateAwCataFirstInput = z.object({
  project_id: idSchema,
  cata_id: idSchema,
  cata_name: z.string().min(1),
  parent_id: idSchema.optional(),
  source_type: z.union([z.string().min(1), z.number().int()]).optional(),
  dry_run: z.boolean().default(true)
});

const testPlanAwRequestBodyInput = z.record(z.string(), z.unknown());

const testPlanGenericRequestBodyInput = z.record(z.string(), z.unknown());

export const testPlanBatchSendNotificationsInput = z.object({
  project_id: idSchema,
  type: z.string().min(1).optional(),
  receivers: z.array(z.string().min(1)).optional(),
  comment_id: idSchema.optional(),
  inner_text: z.string().optional(),
  body: testPlanGenericRequestBodyInput.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanCreateResourceUriV4Input = z.object({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanImportTasksInput = z.object({
  source_version_uri: idSchema,
  dest_version_uri: idSchema,
  source_task_uris: z.array(idSchema).min(1),
  project_uuid: idSchema,
  is_copy: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUploadBackgroundInput = z.object({
  project_id: idSchema,
  background_type: z.enum(["cover", "background", "logo"]).default("background"),
  file_path: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const testPlanCreateTestStepByCollectionInput = z.object({
  project_id: idSchema,
  x_auth_token: z.string().min(1),
  file_path: z.string().min(1),
  branch_uri: idSchema.optional(),
  tmss_case_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUploadFileToGitInput = z.object({
  project_id: idSchema,
  x_auth_token: z.string().min(1),
  file_path: z.string().min(1),
  aw_ins_id: idSchema.optional(),
  case_id: idSchema.optional(),
  is_combined_aw: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUploadFileV3Input = z.object({
  project_id: idSchema,
  x_auth_token: z.string().min(1),
  file_path: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const testPlanGetExecutorElementsInput = z.object({
  project_id: idSchema,
  execute_mode: z.string().min(1).optional(),
  testcase_infos: z
    .array(
      z
        .object({
          case_type: z.number().int().optional(),
          script_path: z.string().min(1).optional(),
          uri: z.string().min(1).optional()
        })
        .passthrough()
    )
    .optional(),
  body: testPlanGenericRequestBodyInput.optional()
});

export const testPlanDownloadClassesInput = z.object({
  project_id: idSchema,
  testcase_ids: z.array(idSchema).min(1).optional(),
  body: testPlanGenericRequestBodyInput.optional()
});

export const testPlanUpdateUserInfosInput = z.object({
  project_id: idSchema,
  old_user_num: idSchema.optional(),
  new_user_num: idSchema.optional(),
  update_business_type: z.string().min(1).optional(),
  update_resource_id: idSchema.optional(),
  params: testPlanGenericRequestBodyInput.optional(),
  body: testPlanGenericRequestBodyInput.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanCreateAwCataFirstInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  desc: z.string().optional(),
  parent_id: idSchema.optional(),
  aw_type: z.union([z.string().min(1), z.number().int()]).optional(),
  body: testPlanAwRequestBodyInput.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteAwCatasInput = z.object({
  project_id: idSchema,
  items: z
    .array(
      z
        .object({
          id: idSchema,
          is_folder: z.boolean().optional()
        })
        .passthrough()
    )
    .min(1),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteCustomAwFileInput = z.object({
  project_id: idSchema,
  basic_aw_id: idSchema,
  aw_lib_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateAwNameViewInput = z.object({
  project_id: idSchema,
  name_view: z.string().min(1).optional(),
  source_type: z.union([z.string().min(1), z.number().int()]).optional(),
  body: z.union([z.string().min(1), testPlanAwRequestBodyInput]).optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateTimeOutViewInput = z.object({
  project_id: idSchema,
  time_out: z.union([z.string().min(1), z.number().int().nonnegative()]).optional(),
  source_type: z.union([z.string().min(1), z.number().int()]).optional(),
  body: z.union([z.string().min(1), testPlanAwRequestBodyInput]).optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanSaveAwRefreshToAllInput = z.object({
  project_id: idSchema,
  aw_id: idSchema,
  body: testPlanAwRequestBodyInput,
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteBasicAwsV1Input = z.object({
  project_id: idSchema,
  aw_ids: z.array(idSchema).min(1),
  is_api: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteBasicAwsV2Input = testPlanDeleteBasicAwsV1Input;

export const testPlanDeleteIssueDynamicRecordsInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  owner_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteCustomizedFilterInput = z.object({
  project_id: idSchema,
  filter_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteVectorsInput = z.object({
  project_uuid: idSchema,
  case_uris: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteRecycleResourceInput = z.object({
  project_uuid: idSchema,
  resources: z
    .array(
      z.object({
        resource_type: z.string().min(1),
        resource_uris: z.array(idSchema).min(1)
      })
    )
    .min(1),
  is_async: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanDeleteTestcasesV3Input = z.object({
  project_id: idSchema,
  testcases: z.array(z.record(z.string(), z.unknown())).min(1),
  delete_git_script: z.boolean().optional(),
  iterator_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
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

export const testPlanSearchFeaturesInput = pagingSchema.extend({
  project_uuid: idSchema,
  version_uri: idSchema,
  key_word: z.string().min(1),
  parent_uri: z.string().min(1).optional()
});

export const testPlanSearchFeaturesByCaseInput = z.object({
  project_uuid: idSchema,
  version_uri: idSchema,
  case_uri: idSchema,
  service_types: z.array(z.number().int()).min(1)
});

const testPlanSearchConditionSchema = z.object({
  field_name: z.string().min(1).optional(),
  field_value: z.string().optional(),
  operator: z.string().min(1).optional(),
  sour_value: z.string().optional(),
  tar_value: z.string().optional(),
  field_type: z.string().min(1).optional()
});

export const testPlanListFeatureCaseCountsInput = z.object({
  project_uuid: idSchema,
  version_uri: idSchema,
  contain_root: z.boolean().optional(),
  contain_child: z.boolean().optional(),
  task_uri: idSchema.optional(),
  filter_child: z.boolean().optional(),
  not_in_other_it: z.boolean().optional(),
  condition_type: z.string().min(1).optional(),
  condition_value: z.string().optional(),
  test_case_conditions: z.array(testPlanSearchConditionSchema).optional(),
  feature_uris: z.array(idSchema).optional(),
  upward_recursion: z.boolean().optional()
});

export const testPlanListFeatureChildrenInput = z.object({
  feature_uri: idSchema,
  project_uuid: idSchema,
  owner: z.string().min(1).optional(),
  stage: z.string().min(1).optional(),
  activity: z.string().min(1).optional(),
  version_uri: idSchema.optional(),
  task_uri: idSchema.optional(),
  service_type: z.string().min(1).optional(),
  contain_total: z.boolean().optional(),
  sort_type: z.string().min(1).optional()
});

export const testPlanListFeatureChildrenV5Input = testPlanListFeatureChildrenInput.extend({
  version_uri: idSchema
});

export const testPlanListGt3kFeatureChildrenV5Input = testPlanListFeatureChildrenInput.extend({
  page_number: z.number().int().positive().optional(),
  page_size: z.number().int().positive().optional()
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

export const testPlanGetGt3kIteratorInput = z.object({
  project_uuid: idSchema,
  iterator_id: idSchema
});

export const testPlanListIteratorIssuesInput = pagingSchema.extend({
  project_id: idSchema,
  iterator_uri: idSchema
});

export const testPlanListIteratorIssueCasesInput = z.object({
  project_id: idSchema,
  iterator_uri: idSchema,
  workitem_list: z.array(z.record(z.string(), z.unknown())).min(1)
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

const testPlanTaskCaseExecutionMutationItemInput = z
  .object({
    uri: idSchema.optional(),
    execute_latest_time: z.string().min(1).optional(),
    execute_duration: z.string().min(1).optional(),
    result_code: z.number().int().optional(),
    status_code: z.number().int().optional(),
    execute_times: z.number().int().optional(),
    total_execute_times: z.number().int().optional(),
    success_times: z.union([z.string().min(1), z.number().int()]).optional(),
    executor_id: idSchema.optional(),
    version_uri: idSchema.optional()
  })
  .passthrough();

const testPlanTaskExecutionMutationBodyInput = z.object({
  result_code: z.number().int().optional(),
  status_code: z.number().int().optional(),
  execute_latest_time: z.string().min(1).optional(),
  execute_duration: z.string().min(1).optional(),
  execute_times: z.number().int().optional(),
  total_execute_times: z.number().int().optional(),
  task_uri: idSchema.optional(),
  version_uri: idSchema.optional(),
  executor_id: idSchema.optional(),
  execute_status_code: z.number().int().optional(),
  case_list: z.array(testPlanTaskCaseExecutionMutationItemInput).optional()
});

export const testPlanUpdateTaskExecutionInfoInput = testPlanTaskExecutionMutationBodyInput.extend({
  project_id: idSchema,
  task_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateTaskExecutionStatusInput = testPlanTaskExecutionMutationBodyInput.extend({
  project_id: idSchema,
  task_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanStopTaskExecutionByCaseInput = testPlanTaskExecutionMutationBodyInput.extend({
  project_id: idSchema,
  task_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanBatchUpdateTestcaseExecutionInfoInput = testPlanTaskExecutionMutationBodyInput.extend({
  project_id: idSchema,
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

export const testPlanListIssueTestcasesInput = pagingSchema.extend({
  project_id: idSchema,
  issue_id: idSchema,
  version_uri: idSchema.optional(),
  relate_type: z.string().min(1).optional(),
  key_word: z.string().optional(),
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional(),
  rank_ids: z.array(z.string().min(1)).optional(),
  result_codes: z.array(z.string().min(1)).optional()
});

export const testPlanListIssueCaseCountsInput = z.object({
  project_id: idSchema,
  version_uri: idSchema,
  issue_ids: z.array(idSchema).min(1),
  service_type: z.number().int().optional(),
  service_types: z.array(z.number().int()).optional(),
  parent_id: idSchema.optional(),
  task_uri: idSchema.optional()
});

export const testPlanListTestcaseRelationsInput = pagingSchema.extend({
  project_id: idSchema,
  test_case_uris: z.array(idSchema).min(1),
  version_uri: idSchema.optional(),
  tracker_id: idSchema.optional(),
  relate_type: z.string().min(1).optional(),
  owner: z.array(z.string().min(1)).optional(),
  severity: z.array(z.string().min(1)).optional(),
  status: z.array(z.string().min(1)).optional(),
  findReleaseDev: z.array(z.string().min(1)).optional(),
  keyWord: z.string().optional(),
  ownerContainEmpty: z.boolean().optional(),
  severityContainEmpty: z.boolean().optional(),
  statusContainEmpty: z.boolean().optional()
});

export const testPlanListTaskResultsInput = pagingSchema.extend({
  project_id: idSchema,
  task_uri: idSchema,
  iterator_uri: idSchema.optional()
});

export const testPlanListResourceOperationRecordsInput = pagingSchema.extend({
  project_id: idSchema,
  resource_id: idSchema.optional(),
  resource_type: z.string().min(1).optional(),
  operation_type: z.string().min(1).optional()
});

export const testPlanGetCaseInput = z.object({
  project_id: idSchema,
  case_id: idSchema
});

export const testPlanGetTestcaseDatasetSampleInput = z.object({
  project_id: idSchema
});

export const testPlanGetTestcaseDatasetInput = z.object({
  project_id: idSchema,
  case_uri: idSchema,
  group_id: idSchema
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
