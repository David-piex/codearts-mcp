import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

const pipelineGroupNameSchema = z.string().min(1).max(32);
const pipelineTagNameSchema = z.string().min(1);
const pipelineTagColorSchema = z.string().min(1);
const pipelineVariableGroupNameSchema = z.string().min(1);
const pipelineExtensionObjectSchema = z.record(z.string(), z.unknown());
const pipelineRawQueryInput = z.record(z.string(), z.unknown());
const pipelineExtensionAuthorizationInput = z.object({
  parameters: pipelineExtensionObjectSchema.optional(),
  scheme: z.string().min(1).optional()
});

export const pipelineVariableGroupVariableInput = z.object({
  name: z.string().min(1).optional(),
  sequence: z.number().int().optional(),
  type: z.string().min(1).optional(),
  value: z.string().optional(),
  is_secret: z.boolean().optional(),
  description: z.string().optional()
});

export const pipelineRulePropertyInput = z.object({
  key: z.string().min(1),
  type: z.string().min(1),
  name: z.string().min(1),
  operator: z.string().min(1).optional(),
  value: z.string(),
  value_type: z.string().min(1),
  is_valid: z.boolean().optional()
});

export const pipelineRuleContentInput = z.object({
  group_name: z.string().min(1),
  can_modify_when_inherit: z.boolean().optional(),
  editable: z.boolean().optional(),
  properties: z.array(pipelineRulePropertyInput).min(1)
});

export const pipelineStrategyRuleInput = z.object({
  id: idSchema.optional(),
  is_valid: z.boolean().optional()
});

export const pipelineListInput = pagingSchema.extend({
  project_id: idSchema
});

export const pipelineUploadPublisherIconInput = z.object({
  domain_id: idSchema,
  publisher_en_name: z.string().min(1).max(64),
  file_name: z.string().min(1),
  file_content: z.string().min(1),
  content_type: z.string().min(1).default("application/octet-stream"),
  dry_run: z.boolean().default(true)
});

export const pipelineStopRunInput = z.object({
  pipeline_id: idSchema,
  run_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineRetryRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineApproveRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineRejectRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  branch: z.string().min(1).optional(),
  description: z.string().max(1024).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineCreateByTemplateInput = z.object({
  project_id: idSchema,
  template_id: idSchema,
  name: z.string().min(1),
  description: z.string().max(1024).optional(),
  group_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineCreateInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  description: z.string().max(1024).optional(),
  manifest_version: z.string().min(1).optional(),
  sources: z.array(pipelineExtensionObjectSchema).optional(),
  variables: z.array(pipelineExtensionObjectSchema).optional(),
  parameters: z.array(pipelineExtensionObjectSchema).optional(),
  definition: pipelineExtensionObjectSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineDeletePipelineInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineUpdatePipelineInfoInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  name: z.string().min(1).optional(),
  description: z.string().max(1024).optional(),
  is_publish: z.boolean().optional(),
  manifest_version: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineTogglePipelineInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineBatchDeleteInput = z.object({
  project_id: idSchema,
  pipeline_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineBatchRunInput = z.object({
  project_id: idSchema,
  pipeline_ids: z.array(idSchema).min(1),
  branch: z.string().min(1).optional(),
  description: z.string().max(1024).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineBatchRunResultInput = z.object({
  project_id: idSchema,
  query: z.array(
    z.object({
      pipeline_id: idSchema,
      pipeline_run_id: idSchema
    })
  ).min(1)
});

export const pipelineListRunsInput = pagingSchema.extend({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineGetRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunDetailInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunParametersInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunLogInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema
});

export const pipelineGetExecLogInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema,
  start_offset: z.number().int().nonnegative().optional(),
  end_offset: z.number().int().nonnegative().optional(),
  limit: z.number().int().positive().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  offset: z.number().int().nonnegative().optional()
});

export const pipelineDelayJobInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineCheckpointInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineCancelQueueInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  queue_id: z.union([idSchema, z.number().int()]),
  dry_run: z.boolean().default(true)
});

export const pipelineGetManualReviewContextInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineListArtifactsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetStepOutputsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  step_run_ids: z.array(idSchema).min(1)
});

export const pipelineGetStepJumpLinkInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema
});

export const pipelineGetRunChangeRequestsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  component_id: idSchema.optional()
});

export const pipelineRollbackRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  sources: z.array(pipelineExtensionObjectSchema).optional(),
  description: z.string().max(1024).optional(),
  variables: z.array(pipelineExtensionObjectSchema).optional(),
  choose_jobs: z.array(z.string().min(1)).optional(),
  choose_stages: z.array(z.string().min(1)).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineGetInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineGetNoticeInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineNoticeDataInput = z.object({
  notice_types: z.array(z.string().min(1)).min(1),
  notice_roles: z.array(z.string().min(1)).min(1)
});

export const pipelineGetNoticeDetailInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  type: z.string().min(1).optional()
});

export const pipelineUpdateOfficialNoticeInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  event_type: z.string().min(1),
  notice_data: pipelineNoticeDataInput,
  dry_run: z.boolean().default(true)
});

export const pipelineSwitchNoticeInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  notice_type: z.string().min(1),
  notice_switch: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateThirdPartyNoticeInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  notice_id: idSchema,
  notice_type: z.string().min(1),
  notice_status: z.boolean(),
  send_url: z.string().min(1),
  secret_info: z.string().optional(),
  notice_events: z.array(z.string().min(1)).optional(),
  notice_contents: z.array(z.string().min(1)).optional(),
  notice_users: z.array(z.string().min(1)).optional(),
  sort_index: z.number().int().optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateNoticeStatusInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  type: z.number().int(),
  enable: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineGetPermissionInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelinePermissionMutationInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  operation_query: z.boolean(),
  operation_execute: z.boolean(),
  operation_update: z.boolean(),
  operation_delete: z.boolean(),
  operation_authorize: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateRolePermissionInput = pipelinePermissionMutationInput.extend({
  role_id: z.number().int()
});

export const pipelineUpdateUserPermissionInput = pipelinePermissionMutationInput.extend({
  user_id: idSchema
});

export const pipelineSwitchPermissionInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  flag: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineListQueueInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListSystemVarsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListTriggerFailedRecordsInput = pagingSchema.extend({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListModifyHistoryInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListGroupsInput = z.object({
  project_id: idSchema
});

export const pipelineListTagsInput = z.object({
  project_id: idSchema,
  proj_id: idSchema.optional()
});

export const pipelineCreateTagInput = z.object({
  project_id: idSchema,
  name: pipelineTagNameSchema,
  color: pipelineTagColorSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateTagInput = z.object({
  project_id: idSchema,
  tag_id: idSchema,
  name: pipelineTagNameSchema,
  color: pipelineTagColorSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteTagInput = z.object({
  project_id: idSchema,
  tag_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineSetTagsForPipelinesInput = z.object({
  project_id: idSchema,
  pipeline_ids: z.array(idSchema).min(1),
  tag_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineCreateGroupInput = z.object({
  project_id: idSchema,
  name: pipelineGroupNameSchema,
  parent_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateGroupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  name: pipelineGroupNameSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteGroupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineMovePipelinesToGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  pipelines: z
    .array(
      z.object({
        pipeline_id: idSchema,
        pipeline_name: z.string().min(1)
      })
    )
    .min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineCreateVariableGroupInput = z.object({
  project_id: idSchema,
  name: pipelineVariableGroupNameSchema,
  description: z.string().optional(),
  variables: z.array(pipelineVariableGroupVariableInput).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateVariableGroupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  name: pipelineVariableGroupNameSchema,
  description: z.string().optional(),
  variables: z.array(pipelineVariableGroupVariableInput).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteVariableGroupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineBindVariableGroupsToPipelineInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  pipeline_group_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineGetVariableGroupInput = z.object({
  project_id: idSchema,
  id: idSchema
});

export const pipelineListPipelineVariableGroupsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListVariableGroupsInput = pagingSchema.extend({
  project_id: idSchema,
  name: z.string().min(1).optional()
});

const pipelinePluginAttributionSchema = z.enum(["custom", "official"]);
const pipelinePluginBusinessTypeSchema = z.enum([
  "Build",
  "Gate",
  "Deploy",
  "Test",
  "Normal"
]);

export const pipelineListPublishersInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineListAvailablePublishersInput = z.object({
  domain_id: idSchema
});

export const pipelineListStagePluginsInput = z.object({
  domain_id: idSchema,
  use_condition: z.string().min(1),
  business_type: z.array(pipelinePluginBusinessTypeSchema).optional(),
  deploy_type: z.string().min(1).optional(),
  comp_extend_type: z.string().min(1).optional()
});

export const pipelineListBasePluginsInput = z.object({
  domain_id: idSchema
});

export const pipelineListBasePluginsPagedInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineListPluginsInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20),
  plugin_attribution: pipelinePluginAttributionSchema.optional(),
  business_type: z.array(pipelinePluginBusinessTypeSchema).optional(),
  maintainer: z.string().min(1).optional(),
  plugin_name: z.string().min(1).optional()
});

export const pipelineGetPluginPartsInput = z.object({
  domain_id: idSchema,
  plugin_name: z.string().min(1),
  display_name: z.string().min(1),
  version: z.string().min(1),
  plugin_attribution: pipelinePluginAttributionSchema
});

export const pipelineListPluginVersionsInput = z.object({
  domain_id: idSchema,
  plugin_name: z.string().min(1),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineGetPluginVersionInput = z.object({
  domain_id: idSchema,
  plugin_name: z.string().min(1),
  version: z.string().min(1)
});

export const pipelineListExtensionModulesInput = z.object({
  locations: z.array(z.string().min(1)).min(1),
  project_id: idSchema.optional(),
  region_name: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  product_line: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineGetExtensionModuleInput = z.object({
  module_id: z.string().min(1)
});

export const pipelineListExtensionEndpointsInput = z.object({
  project_id: idSchema,
  region_name: z.string().min(1),
  module_id: z.string().min(1).optional(),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineGetExtensionEndpointInput = z.object({
  uuid: z.string().min(1)
});

export const pipelineCreateExtensionEndpointInput = z.object({
  project_id: idSchema.optional(),
  region_name: z.string().min(1).optional(),
  module_id: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
  authorization: pipelineExtensionAuthorizationInput.optional(),
  data: pipelineExtensionObjectSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateExtensionEndpointInput = z.object({
  uuid: z.string().min(1),
  project_id: idSchema.optional(),
  region_name: z.string().min(1).optional(),
  module_id: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
  authorization: pipelineExtensionAuthorizationInput.optional(),
  data: pipelineExtensionObjectSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteExtensionEndpointInput = z.object({
  uuid: z.string().min(1),
  project_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineGetRuleInput = z.object({
  domain_id: idSchema,
  rule_id: idSchema
});

export const pipelineListRulesInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0),
  limit: z.number().int().min(1).max(100),
  cloud_project_id: idSchema.optional(),
  type: z.string().min(1).optional(),
  name: z.string().min(1).optional()
});

export const pipelineCreateRuleInput = z.object({
  domain_id: idSchema,
  name: z.string().min(1),
  type: z.string().min(1),
  layout_content: z.string().min(1),
  plugin_id: z.string().min(1).optional(),
  plugin_name: z.string().min(1).optional(),
  plugin_version: z.string().min(1).optional(),
  content: z.array(pipelineRuleContentInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateRuleInput = z.object({
  domain_id: idSchema,
  rule_id: idSchema,
  name: z.string().min(1),
  type: z.string().min(1),
  plugin_id: z.string().min(1).optional(),
  plugin_name: z.string().min(1).optional(),
  plugin_version: z.string().min(1).optional(),
  content: z.array(pipelineRuleContentInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteRuleInput = z.object({
  domain_id: idSchema,
  rule_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineGetRuleRelatedInfoInput = z.object({
  domain_id: idSchema,
  rule_id: idSchema
});

export const pipelineGetStrategyInput = z.object({
  domain_id: idSchema,
  rule_set_id: idSchema,
  cloud_project_id: idSchema.optional()
});

export const pipelineListStrategiesInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0),
  limit: z.number().int().min(1).max(100),
  include_tenant_rule_set: z.boolean().default(true),
  name: z.string().min(1).optional(),
  is_valid: z.boolean().optional(),
  type: z.string().min(1).optional()
});

export const pipelineCreateStrategyInput = z.object({
  domain_id: idSchema,
  name: z.string().min(1),
  rules: z.array(pipelineStrategyRuleInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateStrategyInput = z.object({
  domain_id: idSchema,
  rule_set_id: idSchema,
  name: z.string().min(1),
  rules: z.array(pipelineStrategyRuleInput).min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteStrategyInput = z.object({
  domain_id: idSchema,
  rule_set_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineSwitchStrategyInput = z.object({
  domain_id: idSchema,
  rule_set_id: idSchema,
  is_valid: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineGetStrategyRelatedInfoInput = z.object({
  domain_id: idSchema,
  rule_set_id: idSchema
});

export const pipelineListStrategyChildrenInput = z.object({
  domain_id: idSchema,
  rule_set_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineListProjectStrategiesInput = z.object({
  project_id: idSchema,
  offset: z.number().int().min(0),
  limit: z.number().int().min(1).max(100),
  include_tenant_rule_set: z.boolean().default(false),
  name: z.string().min(1).optional(),
  is_valid: z.boolean().optional(),
  type: z.string().min(1).optional()
});

export const pipelineGetProjectStrategyInput = z.object({
  project_id: idSchema,
  rule_set_id: idSchema
});

export const pipelineGetProjectStrategyRelatedInfoInput = z.object({
  project_id: idSchema,
  rule_set_id: idSchema
});

export const pipelineInheritProjectStrategyInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  parent_id: idSchema,
  rules: z.array(idSchema).optional(),
  is_valid: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineSwitchProjectStrategyInput = z.object({
  project_id: idSchema,
  rule_set_id: idSchema,
  is_valid: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteProjectStrategyInput = z.object({
  project_id: idSchema,
  rule_set_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineGetProjectStrategyDetailInput = z.object({
  project_id: idSchema,
  rule_set_id: idSchema
});

export const pipelineUpdateProjectStrategyInput = z.object({
  project_id: idSchema,
  rule_set_id: idSchema,
  name: z.string().min(1),
  rules: z.array(pipelineStrategyRuleInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineCreateProjectStrategyInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  rules: z.array(pipelineStrategyRuleInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineListRuleTypesInput = z.object({
  organization_id: idSchema
});

export const pipelineListTemplatesInput = pagingSchema.extend({
  tenant_id: idSchema,
  language: z.string().optional(),
  is_system: z.boolean().optional()
});

export const pipelineGetWebhookInfoInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListPipelineVarsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListRelatedProjectsInput = z.object({
  tenant_id: idSchema,
  page_index: z.number().int().min(1).default(1),
  page_size: z.number().int().min(1).max(200).default(20),
  search: z.string().optional()
});

export const pipelineListCodeRepositoriesInput = z.object({
  cloud_project_id: idSchema,
  repoType: z.string().min(1).optional(),
  query: z.string().optional(),
  workspace: z.string().optional(),
  authEndpoint: z.string().optional(),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(30)
});

export const pipelineListCodeBranchesInput = z.object({
  cloud_project_id: idSchema,
  repoUrl: z.string().min(1).optional(),
  authEndpoint: z.string().optional(),
  repoId: z.string().min(1).optional(),
  pipelineId: idSchema.optional(),
  search: z.string().optional(),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(30)
}).refine((input) => input.repoUrl !== undefined || input.repoId !== undefined, {
  message: "At least one of repoUrl or repoId is required"
});

export const pipelineGetRepositoryNumberInput = z.object({
  tenant_id: idSchema,
  domain_id: idSchema,
  region: z.string().min(1),
  project_id: idSchema.optional()
});

export const pipelineGetTenantPackageIsFreezeInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema.optional()
});

export const pipelineGetPackageUsageInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema.optional()
});

export const pipelineGetTenantVersionDetailInput = z.object({
  tenant_id: idSchema
});

export const pipelineGetTemplateInput = z.object({
  tenant_id: idSchema,
  template_id: idSchema
});

export const pipelineTemplateVariableInput = z.record(z.string(), z.unknown());

export const pipelineCreateTemplateInput = z.object({
  tenant_id: idSchema,
  name: z.string().min(1),
  description: z.string().optional(),
  language: z.string().min(1),
  variables: z.array(pipelineTemplateVariableInput).optional(),
  definition: z.string().min(1),
  is_system: z.boolean().optional(),
  domain_id: idSchema.optional(),
  is_show_source: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateTemplateInput = z.object({
  tenant_id: idSchema,
  template_id: idSchema,
  name: z.string().min(1),
  description: z.string().optional(),
  language: z.string().min(1),
  variables: z.array(pipelineTemplateVariableInput).optional(),
  definition: z.string().min(1),
  is_system: z.boolean().optional(),
  domain_id: idSchema.optional(),
  is_show_source: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteTemplateInput = z.object({
  tenant_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineFavoriteTemplateInput = z.object({
  tenant_id: idSchema,
  template_id: idSchema,
  flag: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const pipelineBatchGetPipelineStatusInput = z.object({
  project_id: idSchema,
  pipeline_ids: z.array(idSchema).min(1).optional(),
  body: pipelineRawQueryInput.optional()
});

export const pipelineGetNoticeMessagesInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineCheckProjectInput = z.object({
  project_id: idSchema,
  type: z.string().min(1)
});

export const pipelineCheckComponentInput = z.object({
  project_id: idSchema,
  component_id: idSchema.optional(),
  component_name: z.string().min(1).optional(),
  query: pipelineRawQueryInput.optional()
});

export const pipelineListExecutionPlansInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListReusableJobsInput = z.object({
  project_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(20),
  keyword: z.string().optional(),
  body: pipelineRawQueryInput.optional()
});

export const pipelineDashboardQueryInput = z.object({
  tenant_id: idSchema,
  start_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional(),
  query: pipelineRawQueryInput.optional()
});

const pipelineChangeRequestStatusSchema = z.enum([
  "developing",
  "to_be_released",
  "releasing",
  "released",
  "revoked"
]);

export const pipelineChangeRequestRepoInput = z.object({
  repo_id: idSchema,
  http_url: z.string().min(1),
  git_url: z.string().min(1),
  feature_branch: z.string().min(1),
  main_branch: z.string().min(1),
  delete_branch_after_released: z.boolean().optional()
});

export const pipelineCreateChangeRequestInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  title: z.string().min(1),
  type: z.string().min(1).optional(),
  workitem_ids: z.array(idSchema).min(1),
  repos: z.array(pipelineChangeRequestRepoInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateChangeRequestStatusInput = z.object({
  cloud_project_id: idSchema,
  change_request_id: idSchema,
  status: pipelineChangeRequestStatusSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineListChangeRequestOperationLogsInput = z.object({
  cloud_project_id: idSchema,
  change_request_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(20)
});

export const pipelineListChangeRequestWorkItemsInput = z.object({
  cloud_project_id: idSchema,
  change_request_id: idSchema
});

export const pipelineUpdateChangeRequestWorkItemsInput = z.object({
  cloud_project_id: idSchema,
  change_request_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineListChangeRequestsInput = z.object({
  cloud_project_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(20),
  keyword: z.string().optional(),
  body: pipelineRawQueryInput.optional()
});

export const pipelineListChangeRequestCreatorsInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  name: z.string().optional()
});

export const pipelineGetChangeRequestInput = z.object({
  cloud_project_id: idSchema,
  change_request_id: idSchema
});

export const pipelineListComponentsInput = z.object({
  cloud_project_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(20),
  keyword: z.string().optional(),
  body: pipelineRawQueryInput.optional()
});

export const pipelineGetComponentInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema
});

export const pipelineGetComponentFollowStatusInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema
});

export const pipelineCheckVariableGroupRightsInput = z.object({
  project_id: idSchema
});

export const pipelineComponentRepoInput = z.object({
  type: z.string().min(1),
  repo_id: z.string().min(1),
  http_url: z.string().min(1),
  git_url: z.string().min(1),
  branch: z.string().min(1),
  language: z.string().min(1),
  endpoint_id: z.string().optional()
});

export const pipelineCreateComponentInput = z.object({
  cloud_project_id: idSchema,
  name: z.string().min(1),
  type: z.string().min(1),
  parent_id: z.union([idSchema, z.null()]).optional(),
  desc: z.string().optional(),
  repos: z.array(pipelineComponentRepoInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateComponentInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  desc: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineUpdateComponentReposInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  repos: z.array(pipelineComponentRepoInput).min(1),
  dry_run: z.boolean().default(true)
});

export const pipelineFollowComponentInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineUnfollowComponentInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineDeleteComponentInput = z.object({
  cloud_project_id: idSchema,
  component_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineListPacActionsInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(20),
  keyword: z.string().optional(),
  body: pipelineRawQueryInput.optional()
});

export const pipelineGetPacActionInput = z.object({
  domain_id: idSchema,
  pipeline_id: idSchema,
  pipeline_run_id: idSchema
});

export const pipelineGetOauthAuthorizationUrlInput = z.object({
  query: pipelineRawQueryInput.optional()
});

export const pipelineGetDevucAuthInput = z.object({
  cloud_project_id: idSchema,
  query: pipelineRawQueryInput.optional()
});
