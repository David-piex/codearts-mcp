import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const checkListTasksInput = pagingSchema.extend({
  project_id: idSchema
});

export const checkGetTaskInput = z.object({
  task_id: idSchema
});

export const checkGetTaskByIdInput = z.object({
  task_id: idSchema
});

export const checkGetTaskResourcePoolInput = z.object({
  task_id: idSchema
});

export const checkUpdateTaskResourcePoolInput = z.object({
  task_id: idSchema,
  resource_pool_id: idSchema.optional(),
  resource_pool_type: z.enum(["default", "custom"]).optional(),
  body: z.record(z.string(), z.unknown()).default({}),
  dry_run: z.boolean().default(true)
});

export const checkListTaskJobsInput = z.object({
  task_id: idSchema
});

export const checkListTaskJobsV4Input = checkListTaskJobsInput;

export const checkListTaskLastJobsInput = z.object({
  task_id: idSchema
});

export const checkListTaskLastJobsV4Input = checkListTaskLastJobsInput;

export const checkGetTaskPreCheckScriptInput = z.object({
  task_id: idSchema
});

export const checkGetTaskOwnerMatchingSwitchInput = z.object({
  task_id: idSchema
});

export const checkUpdateTaskOwnerMatchingSwitchInput = z.object({
  task_id: idSchema,
  enabled: z.boolean(),
  body: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const checkGetTaskCronInput = z.object({
  task_id: idSchema
});

export const checkUpdatePipelineTaskInput = z.object({
  task_id: idSchema,
  body: z.record(z.string(), z.unknown()).default({}),
  dry_run: z.boolean().default(true)
});

export const checkListProjectTaskGroupsInput = z.object({
  project_id: idSchema
});

export const checkListTaskFilesInput = z.object({
  task_id: idSchema
});

export const checkListTaskFileListV4Input = checkListTaskFilesInput;

export const checkListTaskAllFilesInput = z.object({
  task_id: idSchema,
  file_path: z.string().min(1).optional(),
  get_son: z.boolean().optional()
});

export const checkListTaskAllFilesV4Input = checkListTaskAllFilesInput;

export const checkDetectTaskLanguageInput = z.object({
  task_id: idSchema,
  scan_file: z.boolean().default(true)
});

export const checkListCodehubRepositoriesInput = pagingSchema.extend({
  project_id: idSchema.optional(),
  search: z.string().min(1).optional()
});

export const checkGetDomainCheckersVersionInput = z.object({
  domain_id: idSchema
});

export const checkListTaskCheckRecordsInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema,
  start_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional()
});

export const checkListRulesInput = pagingSchema.extend({
  rule_languages: z.string().min(1).optional(),
  rule_severity: z.string().min(1).optional()
});

export const checkListDefaultRulesetsInput = z.object({
  project_id: idSchema
});

export const checkSetDefaultRulesetInput = z.object({
  project_id: idSchema,
  ruleset_id: idSchema,
  language: z.string().min(1),
  body: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const checkListSupportedLanguagesInput = z.object({});

export const checkGetTaskNotificationInput = z.object({
  task_id: idSchema
});

export const checkGetCodeSumMeasuresInput = z.object({});

export const checkListPluginsInput = z.object({
  id: idSchema,
  name: z.string().min(1).optional(),
  version: z.string().min(1).optional(),
  publisher_name: z.string().min(1).optional()
});

export const checkGetTaskWebhookInfoInput = z.object({
  task_id: idSchema
});

export const checkGetTaskWebhookInfoV4Input = checkGetTaskWebhookInfoInput;

export const checkUpdateTaskWebhookInput = z.object({
  task_id: idSchema,
  body: z.record(z.string(), z.unknown()),
  dry_run: z.boolean().default(true)
});

export const checkGetCodeHealthSvgInput = z.object({
  task_id: idSchema
});

export const checkListTaskRepositoryBranchesInput = pagingSchema.extend({
  task_id: idSchema,
  is_uncreated_only: z.boolean().optional(),
  search: z.string().min(1).optional(),
  repo_type: z.string().min(1).optional()
});

export const checkListTaskBranchesV4Input = checkListTaskRepositoryBranchesInput;

export const checkGetTransmissionNotificationInput = z.object({
  is_check_project: z.union([z.literal(0), z.literal(1)]),
  domain_id: idSchema.optional(),
  project_id: idSchema.optional()
});

export const checkGetTenantPackageStatusInput = z.object({
  project_id: idSchema.optional()
});

export const checkListTemplateTasksInput = pagingSchema.extend({
  project_id: idSchema.optional(),
  search: z.string().min(1).optional()
});

export const checkListRulesetRulesInput = pagingSchema.extend({
  project_id: idSchema,
  ruleset_id: idSchema,
  types: z.string().min(1).default("1"),
  languages: z.string().min(1).optional(),
  tags: z.string().min(1).optional()
});

export const checkListCriterionsetsByLanguageInput = pagingSchema.extend({
  project_id: idSchema,
  language: z.string().min(1),
  search: z.string().min(1).optional()
});

export const checkGetCriterionRuleInput = z.object({
  criterion_rule_id: idSchema
});

export const checkListThirdToolsInput = z.object({
  rule_type: z.union([z.literal(0), z.literal(1), z.literal(3)]),
  language: z.string().min(1).optional()
});

export const checkGetCriterionsetInput = z.object({
  set_id: idSchema,
  operator: z.string().min(1).optional()
});

export const checkGetProjectConfigInput = z.object({
  id: idSchema,
  operator: z.string().min(1).optional()
});

export const checkListConfigItemsInput = z.object({
  ids: z.array(idSchema).min(1)
});

export const checkGetMeasureTotalInput = z.object({
  task_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const checkModifyCriterionsetRelationsInput = z.object({
  set_id: idSchema,
  operator: z.string().min(1).max(128).optional(),
  show_tool_versions: z.array(z.string().min(1)).optional(),
  criterion_ids_list: z.array(z.object({
    id: idSchema,
    status: z.enum(["enable", "disable"]),
    is_support_version: z.string().min(1).optional(),
    params: z.record(z.string(), z.unknown()).optional()
  }).passthrough()).min(1),
  dry_run: z.boolean().default(true)
});

export const checkListAllCriterionsetsInput = pagingSchema.extend({
  languages: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  my_create: z.boolean().optional(),
  project_id: idSchema.optional(),
  is_call_status: z.boolean().optional(),
  sort_field: z.string().min(1).optional(),
  sort_order: z.enum(["up", "down"]).optional(),
  operator: z.string().min(1).optional()
});

export const checkListCriterionsetsByIdsInput = z.object({
  ids: z.array(idSchema).min(1),
  project_id: idSchema.optional(),
  toolVersion: z.string().min(1).optional(),
  arch: z.enum(["X86", "ARM"]).optional()
});

export const checkListCriterionFiltersInput = z.object({
  project_id: idSchema,
  language: z.string().min(1),
  checker_name: z.string().min(1).optional(),
  key: z.string().min(1).optional(),
  operator: z.string().min(1)
});

export const checkListCriterionsInput = pagingSchema.extend({
  languages: z.string().min(1).optional(),
  search: z.string().min(1).optional()
});

export const checkGetDefectTaskStatisticsInput = z.object({
  task_id: idSchema
});

export const checkGetTaskIssueStatisticsInput = z.object({
  task_id: idSchema
});

export const checkGetDefectMetricTrendInput = z.object({
  task_id: idSchema,
  start_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional(),
  metric_type: z.string().min(1).optional(),
  severity: z.string().min(1).optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const checkListDefectNextStatusesInput = z.object({
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const checkGetSingleDefectInput = z.object({
  defect_id: idSchema.optional(),
  issue_id: idSchema.optional(),
  task_id: idSchema.optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
}).refine((input) => input.defect_id || input.issue_id || Object.keys(input.query).length > 0, {
  message: "At least one of defect_id, issue_id, or query must be provided.",
  path: ["defect_id"]
});

const checkIssueFilterFields = {
  task_id: idSchema,
  merge_id: z.string().min(1).optional(),
  job_id: idSchema.optional(),
  languages: z.string().min(1).optional(),
  rule_ids: z.string().min(1).optional(),
  authors: z.string().min(1).optional(),
  is_new: z.string().min(1).optional(),
  status_ids: z.string().min(1).optional(),
  severities: z.string().min(1).optional(),
  delay_status: z.string().min(1).optional(),
  file_names: z.string().min(1).optional(),
  user_tags: z.array(z.string().min(1)).optional(),
  cwes: z.array(z.string().min(1)).optional()
};

export const checkListIssuesByFilterInput = pagingSchema.extend(checkIssueFilterFields);

export const checkGetIssueFilterInput = z.object({
  ...checkIssueFilterFields,
  facets: z.string().min(1)
});

export const checkGetAsyncJobV2Input = z.object({
  task_id: idSchema.optional(),
  async_job_id: idSchema.optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const checkGetAsyncJobInput = z.object({
  task_id: idSchema,
  async_job_id: idSchema
});

export const checkGetPdfFileInput = z.object({
  task_id: idSchema,
  job_file: z.string().min(1)
});

export const checkGetTaskPdfFileV1Input = checkGetPdfFileInput;

export const checkExtractTaskAssistantSummaryInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  merge_id: z.string().min(1).optional(),
  job_id: idSchema.optional()
});

export const checkGetTaskMeasuresInput = z.object({
  task_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const checkGetDefectTaskMeasuresV1Input = checkGetTaskMeasuresInput;

export const checkListMeasureFilesInput = pagingSchema.extend({
  task_id: idSchema,
  job_id: idSchema.optional()
});

export const checkListTaskMeasureFilesV1Input = checkListMeasureFilesInput;

export const checkListMeasureFilesV2Input = pagingSchema.extend({
  task_id: idSchema,
  job_id: idSchema.optional(),
  filter_type: z.string().min(1).optional(),
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional(),
  search: z.string().min(1).optional()
});

export const checkListRelatedDuplicateBlocksInput = z.object({
  task_id: idSchema,
  job_id: idSchema.optional(),
  file_path: z.string().min(1).optional(),
  block_id: idSchema.optional(),
  duplication_type: z.enum(["duplication_code", "duplication_file"]).optional()
}).refine((input) => input.file_path || input.block_id, {
  message: "file_path or block_id must be provided.",
  path: ["file_path"]
});

export const checkListRelatedDuplicateBlocksV2Input = z.object({
  task_id: idSchema,
  job_id: idSchema.optional(),
  file_path: z.string().min(1).optional(),
  block_id: idSchema.optional(),
  start_line: z.number().int().positive().optional(),
  duplication_type: z.string().min(1).optional()
}).refine((input) => input.file_path || input.block_id, {
  message: "file_path or block_id must be provided.",
  path: ["file_path"]
});

export const checkGetMeasureDuplicationInfoInput = z.object({
  task_id: idSchema,
  file_path: z.string().min(1),
  job_id: idSchema.optional(),
  block_id: idSchema.optional(),
  start_line: z.number().int().positive().optional(),
  end_line: z.number().int().positive().optional()
}).refine((input) => input.block_id || (input.start_line !== undefined && input.end_line !== undefined), {
  message: "block_id or both start_line and end_line must be provided.",
  path: ["block_id"]
});

export const checkDownloadLogFileInput = z.object({
  sub_job_id: idSchema.optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
}).refine((input) => input.sub_job_id || Object.keys(input.query).length > 0, {
  message: "sub_job_id or query must be provided.",
  path: ["sub_job_id"]
});

export const checkGetDefectFileContentInput = z.object({
  task_id: idSchema.optional(),
  defect_id: idSchema.optional(),
  file_path: z.string().min(1).optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
}).refine((input) => input.task_id || input.defect_id || input.file_path || Object.keys(input.query).length > 0, {
  message: "At least one locator must be provided.",
  path: ["task_id"]
});

export const checkGetVpcepAuthorizationInput = z.object({
  task_id: idSchema
});

export const checkListTaskCheckListInput = pagingSchema.extend({
  task_id: idSchema,
  check_type: z.enum(["branch", "tag", "cr", "mr"]).default("branch"),
  search: z.string().min(1).optional(),
  time_start: z.string().min(1).optional(),
  time_end: z.string().min(1).optional()
});

export const checkGetTaskProgressInput = z.object({
  task_id: idSchema
});

export const checkGetTaskLogDetailInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  execute_id: idSchema.optional()
});

export const checkListTaskPathTreeInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema,
  current_path: z.string().min(1).optional()
});

export const checkGetConsoleLogInput = z.object({
  job_id: idSchema,
  start_offset: z.number().int().min(0).optional(),
  end_offset: z.number().int().min(0).optional(),
  size: z.number().int().positive().max(5000).optional(),
  sort: z.enum(["asc", "desc"]).optional()
});

export const checkListTaskRulesetsV2Input = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const checkListTaskRulesetsV3Input = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const checkGetTaskRulesetCheckParametersV2Input = z.object({
  project_id: idSchema,
  task_id: idSchema,
  ruleset_id: idSchema
});

export const checkGetTaskRulesetCheckParametersV3Input = z.object({
  project_id: idSchema,
  task_id: idSchema,
  ruleset_id: idSchema
});

export const checkGetTaskSettingsInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const checkDeleteTaskInput = z.object({
  task_id: idSchema,
  x_auth_token: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const checkUpdateTaskSettingsInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  x_auth_token: z.string().min(1),
  task_advanced_settings: z.array(z.object({
    key: z.string().min(1).max(50),
    value: z.string().min(1).max(1000)
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const checkGetTransmissionReviewDataInput = z.object({
  is_check_project: z.union([z.literal(0), z.literal(1)]),
  x_auth_token: z.string().min(1),
  domain_id: idSchema.optional(),
  project_id: idSchema.optional()
});

export const checkRefreshJobResultInput = z.object({
  job_id: idSchema,
  task_id: idSchema.optional(),
  async: z.boolean().default(true),
  x_auth_token: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const checkUpdateTaskConfigParametersInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  body: z.record(z.string(), z.unknown()),
  dry_run: z.boolean().default(true)
});

export const checkListTaskBranchesInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const checkCreateTaskInput = z.object({
  project_id: idSchema,
  task_name: z.string().min(1),
  git_url: z.string().url(),
  git_branch: z.string().min(1),
  language: z.string().min(1),
  rule_set_id: idSchema.optional(),
  resource_pool_id: idSchema.optional(),
  resource_pool_type: z.enum(["default", "custom"]).optional(),
  include_paths: z.string().min(1).optional(),
  exclude_dir: z.string().min(1).optional(),
  task_type: z.enum(["full", "incremental"]).optional(),
  dry_run: z.boolean().default(true)
});

const checkRulesetCustomAttributeRuleConfigInput = z.object({
  id: z.number().int().nonnegative().optional(),
  rule_id: idSchema.optional(),
  default_value: z.string().min(1).optional(),
  option_value: z.string().min(1).optional(),
  option_key: z.string().min(1).optional(),
  option_name: z.string().min(1).optional(),
  template_id: idSchema.optional(),
  description: z.string().min(1).optional()
}).passthrough();

const checkRulesetCustomAttributeRuleInput = z.object({
  rule_id: idSchema,
  value: z.union([z.literal("0"), z.literal("1"), z.literal("2"), z.literal("3")]).optional(),
  rule_config_list: z.array(checkRulesetCustomAttributeRuleConfigInput).optional()
}).passthrough();

const checkRulesetCustomAttributeInput = z.object({
  attribute: z.string().min(1),
  rules: z.array(checkRulesetCustomAttributeRuleInput).min(1)
}).passthrough();

export const checkCreateRulesetInput = z.object({
  project_id: idSchema,
  template_name: z.string().min(1),
  language: z.string().min(1),
  is_default: z.union([z.literal("0"), z.literal("1")]).default("0"),
  rule_ids: z.string().min(1).optional(),
  uncheck_ids: z.string().min(1).optional(),
  template_id: idSchema.optional(),
  custom_attributes: z.array(checkRulesetCustomAttributeInput).optional(),
  dry_run: z.boolean().default(true)
}).refine((input) => input.is_default === "0" || input.template_id, {
  message: "template_id is required when is_default is \"1\".",
  path: ["template_id"]
});

export const checkDeleteRulesetInput = z.object({
  project_id: idSchema,
  ruleset_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const checkRunTaskInput = z.object({
  task_id: idSchema,
  ref: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const checkStopTaskInput = z.object({
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const checkUpdateIssueStatusInput = z.object({
  task_id: idSchema,
  status: z.union([z.literal("0"), z.literal("2"), z.literal("5")]),
  comment: z.string().min(1).max(256),
  merge_key: idSchema,
  merge_id: z.string().min(1).optional(),
  job_id: idSchema.optional(),
  operator: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const checkCreatePdfAsyncJobInput = z.object({
  task_id: idSchema,
  project_name: z.string().min(1).max(128),
  dry_run: z.boolean().default(true)
});

const checkWriteResponseInput = z.object({
  dry_run: z.boolean().default(true)
});

export const checkUpdateCodeGateInput = checkWriteResponseInput.extend({
  task_id: idSchema,
  operator: z.string().min(1).optional(),
  review_data: z.array(z.object({
    compare_type: z.string().min(1),
    is_check: z.union([z.literal(0), z.literal(1)]),
    name: z.string().min(1),
    value: z.number().int().min(0)
  })).min(1)
});

export const checkUpdateIgnoreFilesInput = checkWriteResponseInput.extend({
  task_id: idSchema,
  nodes: z.array(z.object({
    name: z.string().min(1).optional(),
    file_path: z.string().min(1).optional(),
    is_leaf: z.boolean().optional(),
    checkbox_status: z.enum(["unchecked", "all"]).optional()
  })).min(1)
});

export const checkUpdateCheckModeInput = checkWriteResponseInput.extend({
  task_id: idSchema,
  mr_check_mode: z.union([z.literal(0), z.literal(4), z.literal(5)]),
  operator: z.string().min(1).optional()
});

export const checkListTaskIssuesInput = pagingSchema.extend({
  task_id: idSchema,
  severity: z.string().min(1).optional(),
  defect_level: z.string().min(1).optional(),
  status_ids: z.string().min(1).optional(),
  delay_status: z.string().min(1).optional(),
  rule_id: z.string().min(1).optional(),
  rule_name: z.string().min(1).optional(),
  file_path: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
  checker: z.string().min(1).optional()
});

export const checkGetMetricsInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const checkListRulesetsInput = pagingSchema.extend({
  project_id: idSchema,
  language: z.string().optional()
});

export const checkListRulesetsV3Input = z.object({
  project_id: idSchema,
  page: z.number().int().positive().default(1),
  page_size: z.number().int().positive().max(50).default(10),
  category: z.enum(["0", "1", "2"]).optional(),
  need_selected_status: z.enum(["true", "false"]).default("true")
});
