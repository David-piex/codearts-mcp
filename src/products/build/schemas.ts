import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const buildListJobsInput = pagingSchema.extend({
  project_id: idSchema
});

export const buildListImageTemplatesInput = z.object({});

export const buildListDefaultParametersInput = z.object({});

export const buildListSystemParametersInput = z.object({});

export const buildGetJobInput = z.object({
  job_id: idSchema
});

export const buildGetJobNoticeInput = z.object({
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
