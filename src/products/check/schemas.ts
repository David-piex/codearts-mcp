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

export const checkListTaskJobsInput = z.object({
  task_id: idSchema
});

export const checkListTaskLastJobsInput = z.object({
  task_id: idSchema
});

export const checkGetTaskPreCheckScriptInput = z.object({
  task_id: idSchema
});

export const checkGetTaskOwnerMatchingSwitchInput = z.object({
  task_id: idSchema
});

export const checkGetTaskCronInput = z.object({
  task_id: idSchema
});

export const checkListProjectTaskGroupsInput = z.object({
  project_id: idSchema
});

export const checkListTaskFilesInput = z.object({
  task_id: idSchema
});

export const checkListTaskAllFilesInput = z.object({
  task_id: idSchema,
  file_path: z.string().min(1).optional(),
  get_son: z.boolean().optional()
});

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

export const checkGetCodeHealthSvgInput = z.object({
  task_id: idSchema
});

export const checkListTaskRepositoryBranchesInput = pagingSchema.extend({
  task_id: idSchema,
  is_uncreated_only: z.boolean().optional(),
  search: z.string().min(1).optional(),
  repo_type: z.string().min(1).optional()
});

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

export const checkGetAsyncJobV2Input = z.object({
  task_id: idSchema.optional(),
  async_job_id: idSchema.optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const checkGetTaskMeasuresInput = z.object({
  task_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
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

export const checkRunTaskInput = z.object({
  task_id: idSchema,
  ref: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const checkStopTaskInput = z.object({
  task_id: idSchema,
  dry_run: z.boolean().default(true)
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
