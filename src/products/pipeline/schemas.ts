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

export const pipelineDeletePipelineInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineTogglePipelineInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  dry_run: z.boolean().default(true)
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

export const pipelineGetInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineGetNoticeInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineGetNoticeDetailInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  type: z.string().min(1).optional()
});

export const pipelineGetPermissionInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
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

export const pipelineGetTemplateInput = z.object({
  tenant_id: idSchema,
  template_id: idSchema
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

export const pipelineListChangeRequestsInput = z.object({
  cloud_project_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(200).default(20),
  keyword: z.string().optional(),
  body: pipelineRawQueryInput.optional()
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
