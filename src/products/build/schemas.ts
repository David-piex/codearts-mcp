import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const buildListJobsInput = pagingSchema.extend({
  project_id: idSchema
});

export const buildListProjectJobsV3Input = pagingSchema.extend({
  project_id: idSchema
});

export const buildListAllJobsInput = pagingSchema.extend({
  keyword: z.string().min(1).optional(),
  build_status: z.string().min(1).optional(),
  creator_id: idSchema.optional(),
  sort_field: z.string().min(1).optional(),
  sort_type: z.string().min(1).optional()
});

export const buildListBriefRecordsInput = z.object({
  build_project_ids: z.array(idSchema).min(1),
  body: z.record(z.string(), z.unknown()).default({})
});

export const buildListImageTemplatesInput = z.object({});

export const buildListDefaultParametersInput = z.object({});

export const buildListSystemParametersInput = z.object({});

export const buildListBuildParameterTypesInput = z.object({});

export const buildGetJobInput = z.object({
  job_id: idSchema
});

export const buildGetJobInfoInput = z.object({
  job_id: idSchema
});

export const buildGetBuildDetailsInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetOutputInfoV3Input = buildGetBuildDetailsInput;

export const buildGetRecordInfoV4Input = buildGetBuildDetailsInput;

export const buildGetTaskLogPageInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive(),
  step_id: z.number().int().min(0),
  start_offset: z.number().int().min(0).default(0),
  end_offset: z.number().int().min(0).default(0),
  sort: z.enum(["AES", "DESC"]).default("DESC")
});

export const buildGetJobNoticeInput = z.object({
  job_id: idSchema
});

export const buildListJobNoticesV3Input = z.object({
  job_id: idSchema
});

export const buildGetJobRunningStatusInput = z.object({
  job_id: idSchema
});

export const buildGetJobDisableCheckInput = z.object({
  job_id: idSchema
});

export const buildGetJobCopyNameInput = z.object({
  job_id: idSchema
});

export const buildListJobGroupTreeInput = z.object({
  project_id: idSchema
});

export const buildGetRecordInput = z.object({
  record_id: idSchema
});

export const buildGetRealTimeLogInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive(),
  offset: z.number().int().min(0)
});

export const buildGetHistoryDetailsInput = z.object({
  job_id: idSchema,
  build_number: z.number().int().positive()
});

export const buildListBuildParametersInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildListCodeTagsInput = pagingSchema.extend({
  scm_type: z.string().min(1),
  repo_id: idSchema.optional(),
  search: z.string().min(1).optional()
});

export const buildListReportBranchesInput = z.object({
  job_id: idSchema,
  repository_name: z.string().min(1)
});

export const buildListReportRepositoriesInput = z.object({
  job_id: idSchema
});

export const buildListGitCodeRepositoriesInput = z.object({
  endpoint_id: idSchema
});

export const buildListGitCodeBranchesInput = z.object({
  endpoint_id: idSchema,
  repository_name: z.string().min(1).optional()
});

export const buildListResourceSpecsInput = z.object({
  project_id: idSchema,
  arch: z.string().min(1).default("x86-64")
});

export const buildGetDomainUserPermissionInput = z.object({
  project_id: idSchema
});

export const buildGetDomainPackageQuotaInput = z.object({
  project_id: idSchema
});

export const buildGetDomainChargeTypeInput = z.object({});

export const buildGetDomainFederationInput = z.object({});

export const buildGetDomainStatusInput = z.object({});

export const buildGetDomainJobSummaryInput = z.object({});

export const buildListDomainRelatedProjectsInput = z.object({});

export const buildListDomainRelatedProjectsPageInput = pagingSchema.extend({
  search: z.string().min(1).optional()
});

export const buildListPackageSpecStatusesInput = z.object({
  project_id: idSchema,
  status: z.string().min(1)
});

export const buildGetDockerfileTemplateInput = z.object({
  image_id: idSchema
});

export const buildCheckJobNameExistsInput = z.object({
  project_id: idSchema,
  job_name: z.string().min(1)
});

export const buildGetJobBuildSuccessRatioInput = z.object({
  job_id: idSchema,
  repository_name: z.string().min(1),
  branch: z.string().min(1).default("all"),
  interval: z.number().int().min(1).max(30).default(7)
});

export const buildGetLastHistoryV3Input = z.object({
  project_id: idSchema,
  repository_name: z.string().min(1).max(256)
});

export const buildGetJobSuccessRatioV3Input = z.object({
  job_id: idSchema,
  start_time: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_time: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

export const buildListPeriodHistoryV3Input = pagingSchema.extend({
  job_id: idSchema,
  start_time: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_time: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

export const buildListJobHistoryV3Input = pagingSchema.extend({
  job_id: idSchema,
  interval: z.number().int().positive().optional()
});

export const buildGetJobRunningStatusV3Input = z.object({
  job_id: idSchema
});

const buildDateTimeSchema = z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

export const buildListBuildInfoRecordsV3Input = pagingSchema.extend({
  job_id: idSchema,
  start_time: buildDateTimeSchema,
  end_time: buildDateTimeSchema
});

export const buildGetJobConfigDiffInput = z.object({
  job_id: idSchema,
  revisedl_no: z.number().int().positive(),
  original_no: z.number().int().positive()
});

export const buildListRecyclingJobsInput = pagingSchema.extend({
  search: z.string().min(1).optional()
});

export const buildCheckJobCountLimitInput = z.object({});

export const buildGetReportSummaryInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetJobBuildTimeInput = z.object({
  job_id: idSchema,
  repository_name: z.string().min(1),
  branch: z.string().min(1).default("all"),
  interval: z.number().int().min(1).max(30).default(7)
});

export const buildListJunitCoverageSummariesInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetCoverageMetricsInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive(),
  root_id: idSchema
});

export const buildListJobPermissionRolesInput = z.object({
  job_id: idSchema
});

export const buildGetJobPermissionInternalInput = z.object({});

export const buildGetJobPermissionInput = z.object({
  project_id: idSchema,
  job_id: idSchema
});

export const buildGetProjectDefaultPermissionInput = z.object({
  project_id: idSchema,
  job_id: idSchema
});

export const buildListOfficialTemplatesInput = pagingSchema.extend({
  name: z.string().min(1).optional()
});

export const buildListTemplatesInput = pagingSchema.extend({
  name: z.string().min(1).optional()
});

export const buildListCustomTemplatesInput = pagingSchema.extend({
  name: z.string().min(1).optional(),
  filter: z.string().min(1).optional()
});

export const buildShowPackageSpecCountdownInput = z.object({
  body: z.record(z.string(), z.unknown()).default({})
});

export const buildListJobUpdateHistoryInput = z.object({
  job_id: idSchema
});

export const buildGetJobOutputInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetJobStepStatusInput = z.object({
  job_id: idSchema
});

export const buildGetJobPipelineInfoInput = z.object({
  job_id: idSchema
});

export const buildListProjectEndpointsInput = z.object({
  project_id: idSchema
});

export const buildShowDomainsStatusesInput = z.object({
  body: z.record(z.string(), z.unknown()).default({})
});

export const buildListJobBadgeBranchesInput = z.object({
  job_id: idSchema
});

export const buildGetRunningStepLogInput = z.object({
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const buildGetStageLogPageInput = z.object({
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const buildDownloadFullLogInput = z.object({
  record_id: idSchema
});

export const buildDownloadTaskLogInput = z.object({
  record_id: idSchema
});

const buildLogLevelSchema = z.enum(["INFO", "DEBUG"]).default("INFO");

export const buildDownloadBuildLogV4Input = z.object({
  record_id: idSchema,
  log_level: buildLogLevelSchema
});

export const buildDownloadTaskLogV4Input = z.object({
  record_id: idSchema,
  task_name: z.string().min(1),
  log_level: buildLogLevelSchema
});

export const buildGetTemplateInput = z.object({
  uuid: idSchema
});

export const buildGetYamlTemplateInput = z.object({
  job_id: idSchema
});

export const buildListRecommendedOfficialTemplatesInput = z.object({
  body: z.record(z.string(), z.unknown()).default({})
});

export const buildDownloadKeystoreV2Input = z.object({
  name: z.string().min(1),
  domain_id: idSchema,
  id: idSchema
});

export const buildDownloadKeystoreV3Input = z.object({
  file_name: z.string().min(1),
  domain_id: idSchema
});

export const buildListKeystoreFilesInput = z.object({
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const buildListUsableKeystoreNamesInput = z.object({});

export const buildGetKeystorePermissionInput = z.object({
  keystore_id: idSchema
});

export const buildGetErrorLogInput = pagingSchema.extend({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetInfoRecordInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetRecordScriptInput = z.object({
  record_id: idSchema
});

export const buildGetFullStagesInput = z.object({
  record_id: idSchema,
  cascade: z.boolean().default(true)
});

export const buildListRecordsInput = pagingSchema.extend({
  job_id: idSchema
});

export const buildListProjectRecordsInput = pagingSchema.extend({
  project_id: idSchema,
  build_project_id: idSchema.optional()
});

export const buildGetProjectRecordStatisticsInput = z.object({
  project_id: idSchema,
  build_project_id: idSchema.optional()
});

export const buildGetRecordFlowGraphInput = z.object({
  record_id: idSchema
});

export const buildRunJobInput = z.object({
  job_id: idSchema,
  branch: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const buildDeleteJobInput = z.object({
  job_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildSetKeepTimeInput = z.object({
  keep_time: z.number().int().min(1).max(30),
  dry_run: z.boolean().default(true)
});

export const buildDeleteRecyclingJobsInput = z.object({
  job_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const buildClearRecyclingJobsInput = z.object({
  dry_run: z.boolean().default(true)
});

export const buildRestoreRecyclingJobsInput = z.object({
  job_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const buildFollowJobInput = z.object({
  job_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildUnfollowJobInput = z.object({
  job_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildDeleteTemplateInput = z.object({
  uuid: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildSaveTemplateUsedInfoInput = z.object({
  job_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildFollowCustomTemplateInput = z.object({
  uuid: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildUnfollowCustomTemplateInput = z.object({
  uuid: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildFollowOfficialTemplateInput = z.object({
  uuid: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildUnfollowOfficialTemplateInput = z.object({
  uuid: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildDeleteKeystoreInput = z.object({
  keystore_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildDeleteKeystorePermissionInput = z.object({
  permission_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildDeleteJobV3Input = z.object({
  job_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildRecoverJobV3Input = z.object({
  job_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildCheckWebhookUrlInput = z.object({
  job_id: idSchema,
  notice_type: z.enum(["MESSAGE", "MAIL", "WECOM", "DING_TALK", "FEISHU"]),
  webhook_url: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const buildAutoExecuteJobInput = z.object({
  job_id: idSchema,
  event_type: z.string().min(1).optional(),
  ref: z.string().min(1).optional(),
  after: z.string().min(1).optional(),
  before: z.string().min(1).optional(),
  commits: z.array(z.record(z.string(), z.unknown())).optional(),
  repository: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const buildJobPermissionItemInput = z.object({
  id: z.number().int().optional(),
  role_id: z.number().int(),
  devuc_role_id: z.string().min(1).optional(),
  role_name: z.string().min(1).optional(),
  is_modify: z.boolean().optional(),
  is_delete: z.boolean().optional(),
  is_view: z.boolean().optional(),
  is_execute: z.boolean().optional(),
  is_copy: z.boolean().optional(),
  is_forbidden: z.boolean().optional(),
  is_manager: z.boolean().optional(),
  count: z.number().int().optional()
});

export const buildBatchUpdateJobPermissionsInput = z.object({
  project_id: idSchema,
  job_ids: z.array(idSchema).min(1),
  project_switch: z.boolean().optional(),
  permissions: z.array(buildJobPermissionItemInput).min(1),
  dry_run: z.boolean().default(true)
});

export const buildBatchDeleteJobsInput = z.object({
  job_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const buildBatchSetAgencyInput = z.object({
  job_ids: z.array(idSchema).min(1),
  agency_urn: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const buildUpdateJobRolePermissionInput = z.object({
  job_id: idSchema,
  role_id: z.string().min(1),
  permission_name: z.enum([
    "is_modify",
    "is_delete",
    "is_view",
    "is_execute",
    "is_copy",
    "is_forbidden",
    "is_manager"
  ]),
  permission_value: z.boolean().default(true),
  dry_run: z.boolean().default(true)
});

export const buildMoveJobGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  jobs: z.array(z.object({
    job_id: idSchema,
    job_name: z.string().min(1)
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const buildDeleteJobGroupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildSwapJobGroupInput = z.object({
  project_id: idSchema,
  source_group_id: idSchema,
  target_group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const buildAddKeystorePermissionInput = z.object({
  keystore_id: idSchema,
  user_id: idSchema,
  user_name: z.string().min(1),
  setting: z.boolean().default(true),
  delete: z.boolean().default(false),
  modify: z.boolean().default(true),
  usage: z.boolean().default(true),
  can_absent: z.boolean().default(true),
  dry_run: z.boolean().default(true)
});

export const buildCreateJobInput = z.object({
  project_id: idSchema,
  job_name: z.string().min(1),
  arch: z.string().min(1).optional(),
  auto_update_sub_module: z.boolean().optional(),
  flavor: z.string().min(1).optional(),
  body: z.record(z.string(), z.unknown()).default({}),
  dry_run: z.boolean().default(true)
});

export const buildCopyJobInput = z.object({
  project_id: idSchema,
  copy_job_id: idSchema,
  job_name: z.string().min(1),
  arch: z.string().min(1).optional(),
  auto_update_sub_module: z.boolean().optional(),
  flavor: z.string().min(1).optional(),
  body: z.record(z.string(), z.unknown()).default({}),
  dry_run: z.boolean().default(true)
});

export const buildUpdateJobNoticeInput = z.object({
  job_id: idSchema,
  notice_type: z.enum(["MESSAGE", "MAIL", "WECOM", "DING_TALK", "FEISHU"]),
  enabled_event_type_names: z.array(z.string().min(1)).min(1),
  send_switch: z.string().min(1).optional(),
  webhook_url: z.string().min(1).optional(),
  body: z.record(z.string(), z.unknown()).default({}),
  dry_run: z.boolean().default(true)
});

export const buildCreateJobGroupInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).max(128),
  parent_id: idSchema.optional(),
  id: idSchema.optional(),
  group_id: idSchema.optional(),
  body: z.record(z.string(), z.unknown()).default({}),
  dry_run: z.boolean().default(true)
});

export const buildUploadKeystoreInput = z.object({
  file_path: z.string().min(1),
  privacy: z.boolean().default(true),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const buildStopJobInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive(),
  dry_run: z.boolean().default(true)
});

export const buildUpdateJobStepInput = z
  .object({
    job_id: idSchema,
    step_name: z.string().min(1),
    image: z.string().min(1).optional(),
    command: z.string().min(1).optional(),
    pre_condition: z.string().min(1).optional(),
    dry_run: z.boolean().default(true)
  })
  .refine((input) => input.image || input.command || input.pre_condition, {
    message: "At least one of image, command, or pre_condition must be provided.",
    path: ["image"]
  });

export const buildAppendJobStepInput = z.object({
  job_id: idSchema,
  step_name: z.string().min(1),
  module_id: z.string().min(1),
  enable: z.boolean().default(true),
  version: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  command: z.string().min(1).optional(),
  pre_condition: z.string().min(1).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
  insert_after_step_name: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const buildAppendReleaseUploadStepInput = z.object({
  job_id: idSchema,
  path: z.string().min(1),
  package_name: z.string().min(1).optional(),
  package_version: z.string().min(1).optional(),
  custom_upload_path: z.string().min(1).optional(),
  upload_tool: z.string().min(1).default("curl"),
  continue_on_failure: z.boolean().default(false),
  step_name: z.string().min(1).default("Upload package to release repository"),
  pre_condition: z.string().min(1).default("SUCCESS"),
  insert_after_step_name: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const buildPrepareNodeRuntimeBundleInput = z.object({
  job_id: idSchema,
  step_name: z.string().min(1).optional(),
  output_file: z.string().min(1).default("codearts-mcp.tgz"),
  staging_dir: z.string().min(1).default(".release-bundle"),
  replace_existing: z.boolean().default(false),
  dry_run: z.boolean().default(true)
});

export const buildPrepareDeployableNodeAppInput = z.object({
  job_id: idSchema,
  step_name: z.string().min(1).optional(),
  entry_file: z.string().min(1).default("src/server/deploy-entry.ts"),
  bootstrap_entry_file: z.string().min(1).optional(),
  bootstrap_entry_source: z.string().min(1).optional(),
  output_file: z.string().min(1).default("app.js"),
  target_runtime: z.string().min(1).default("node20"),
  replace_existing: z.boolean().default(false),
  dry_run: z.boolean().default(true)
}).refine(
  (input) => input.bootstrap_entry_file === undefined || input.bootstrap_entry_source !== undefined,
  {
    message: "bootstrap_entry_source is required when bootstrap_entry_file is provided.",
    path: ["bootstrap_entry_source"]
  }
);

export const buildConfigureReleaseUploadStepInput = z.object({
  job_id: idSchema,
  step_name: z.string().min(1).default("Upload package to release repository"),
  file: z.string().min(1),
  package_name: z.string().min(1).optional(),
  build_version: z.string().min(1).optional(),
  custom_upload_path: z.string().optional(),
  upload_tool: z.string().min(1).default("curl"),
  remain_origin_path: z.string().min(1).default("FLAT"),
  pre_condition: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});
