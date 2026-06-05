import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";
import { normalizeProviderError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";

type PipelineGroup = {
  id?: string;
  domain_id?: string;
  project_id?: string;
  name?: string;
  parent_id?: string;
  path_id?: string;
  ordinal?: number;
  creator?: string;
  updater?: string;
  create_time?: number;
  update_time?: number;
  children?: PipelineGroup[];
};

type PipelineMoveToGroupResult = {
  code?: string;
  pipeline_id?: string;
  pipeline_name?: string;
};

type PipelineVariableGroupVariable = {
  name?: string;
  sequence?: number;
  type?: string;
  value?: string;
  is_secret?: boolean;
  description?: string;
};

type PipelineVariableGroupRelatedPipeline = {
  pipeline_id?: string;
  pipeline_name?: string;
};

type PipelineVariableGroup = {
  id?: string;
  project_id?: string;
  domain_id?: string;
  name?: string;
  description?: string;
  variables?: PipelineVariableGroupVariable[];
  related_pipelines?: PipelineVariableGroupRelatedPipeline[];
  creator_id?: string;
  updater_id?: string;
  creator_name?: string;
  updater_name?: string;
  create_time?: number;
  update_time?: number;
};

type PipelineTag = {
  tag_id?: string;
  name?: string;
  color?: string;
  project_id?: string;
  project_name?: string;
};

type PipelineRuleProperty = {
  key?: string;
  type?: string;
  name?: string;
  operator?: string;
  value?: string;
  value_type?: string;
  is_valid?: boolean;
};

type PipelineRuleContent = {
  group_name?: string;
  can_modify_when_inherit?: boolean;
  editable?: boolean;
  properties?: PipelineRuleProperty[];
};

type PipelineRule = {
  id?: string;
  type?: string;
  name?: string;
  is_valid?: boolean;
  version?: string;
  plugin_id?: string;
  plugin_name?: string;
  plugin_version?: string;
  creator?: string;
  create_time?: string;
  updater?: string;
  update_time?: string;
  content?: PipelineRuleContent[];
};

type PipelineRuleSummary = {
  id?: string;
  type?: string;
  name?: string;
  version?: string;
  operator?: string;
  operate_time?: number;
};

type PipelineRuleMutationResult = {
  status?: boolean;
  rule_id?: string;
};

type PipelineRuleRelatedInfo = {
  rule_set_count?: number;
  project_count?: number;
  pipeline_count?: number;
};

type PipelineRuleType = {
  typeKey?: string;
  typeName?: string;
};

type PipelineStrategyRuleReference = {
  id?: string;
  is_valid?: boolean;
};

type PipelineStrategy = {
  id?: string;
  name?: string;
  type?: string;
  version?: string;
  creator?: string;
  create_time?: string;
  updater?: string;
  update_time?: string;
  is_valid?: boolean;
  level?: string;
  is_public?: boolean;
  rule_instances?: PipelineRule[];
};

type PipelineStrategySummary = {
  id?: string;
  name?: string;
  type?: string;
  version?: string;
  operator?: string;
  operate_time?: number;
  is_valid?: boolean;
  level?: string;
  is_public?: boolean;
  is_legacy?: boolean;
};

type PipelineStrategyMutationResult = {
  status?: boolean;
  rule_set_id?: string;
};

type PipelineStrategyRelatedInfo = {
  project_count?: number;
  pipeline_count?: number;
};

type PipelineExtensionModule = {
  id?: number;
  base_url?: string;
  description?: string;
  location?: string;
  module_id?: string;
  name?: string;
  properties?: Record<string, unknown>;
  publisher?: string;
  type?: string;
  version?: string;
  tags?: string[];
  url_relative?: string;
  properties_list?: unknown[];
  manifest_version?: string;
};

type PipelineExtensionModuleList = {
  data?: PipelineExtensionModule[];
  total?: number;
};

type PipelineExtensionEndpointAuthorization = {
  parameters?: Record<string, unknown>;
  scheme?: string;
};

type PipelineExtensionEndpointCreator = {
  user_id?: string;
  username?: string;
};

type PipelineExtensionEndpoint = {
  authorization?: PipelineExtensionEndpointAuthorization;
  uuid?: string;
  url?: string;
  name?: string;
  project_uuid?: string;
  projectUuid?: string;
  region_name?: string;
  regionName?: string;
  data?: Record<string, unknown>;
  module_id?: string;
  moduleId?: string;
  created_by?: PipelineExtensionEndpointCreator;
};

type PipelinePluginPublisher = {
  publisher_unique_id?: string;
  name?: string;
  en_name?: string;
  auth_status?: string;
  description?: string;
  logo_url?: string;
  [key: string]: unknown;
};

type PipelineStagePlugin = {
  [key: string]: unknown;
};

type PipelineBasePlugin = {
  [key: string]: unknown;
};

type PipelinePlugin = {
  [key: string]: unknown;
};

type PipelinePluginPart = {
  [key: string]: unknown;
};

type PipelinePluginVersion = {
  [key: string]: unknown;
};

type PipelineRawRecord = Record<string, unknown>;

type PipelineRawItemResult = {
  item: PipelineRawRecord;
  raw: PipelineRawRecord;
};

type PipelineRawListResult = {
  records: PipelineRawRecord[];
  total?: number;
  raw: PipelineRawRecord;
};

export type PipelineClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  getRunParameters: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    parameters: Array<{
      name?: string;
      value?: string;
      value_type?: string;
      is_runtime?: boolean;
    }>;
  }>;
  getRunLog: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    log: string;
        status?: string;
      truncated?: boolean;
    }>;
  getExecLog: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
    start_offset?: number;
    end_offset?: number;
    limit?: number;
    sort?: "asc" | "desc";
    offset?: number;
  }) => Promise<{
    log: string;
    has_more?: boolean;
    start_offset?: string;
    end_offset?: string;
    step_run_id?: string;
  }>;
  cancelQueue: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    queue_id: string | number;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
  getStepOutputs: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    step_run_ids: string[];
  }) => Promise<{
      step_outputs: Array<{
        step_run_id?: string;
        output_result?: Array<{ key?: string; value?: string }>;
      }>;
      current_system_time?: number;
    }>;
  getStepJumpLink: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    jump_link?: string;
  }>;
  getRunChangeRequests: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    component_id?: string;
  }) => Promise<{
    records: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  rollbackRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    sources?: Array<Record<string, unknown>>;
    description?: string;
    variables?: Array<Record<string, unknown>>;
    choose_jobs?: string[];
    choose_stages?: string[];
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
  getBatchRunResult: (input: {
    project_id: string;
    query: Array<{
      pipeline_id: string;
      pipeline_run_id: string;
    }>;
  }) => Promise<{
    records: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  listArtifacts: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    artifacts: Array<{
      name?: string;
      artifact_version?: string;
      upload_target?: string;
      artifact_package_type?: string;
      artifact_uri?: string;
      artifact_download_url_with_id?: string;
      artifact_type?: string;
      job_id?: string;
      build_no?: number;
    }>;
  }>;
  getOfficialNotice: (input: { project_id: string; pipeline_id: string }) => Promise<{
    notice: PipelineRawRecord;
  }>;
  getNoticeStatus: (input: { project_id: string; pipeline_id: string }) => Promise<{
    status: PipelineRawRecord;
  }>;
  getNoticeDetail: (input: {
    project_id: string;
    pipeline_id: string;
    type?: string;
  }) => Promise<{
    detail: PipelineRawRecord;
  }>;
  updateOfficialNotice: (input: {
    project_id: string;
    pipeline_id: string;
    event_type: string;
    notice_data: {
      notice_types: string[];
      notice_roles: string[];
    };
  }) => Promise<{
    status: string;
  }>;
  switchNotice: (input: {
    project_id: string;
    pipeline_id: string;
    notice_type: string;
    notice_switch: boolean;
  }) => Promise<{
    status: string;
  }>;
  updateThirdPartyNotice: (input: {
    project_id: string;
    pipeline_id: string;
    notice_id: string;
    notice_type: string;
    notice_status: boolean;
    send_url: string;
    secret_info?: string;
    notice_events?: string[];
    notice_contents?: string[];
    notice_users?: string[];
    sort_index?: number;
  }) => Promise<{
    status: string;
  }>;
  updateNoticeStatus: (input: {
    project_id: string;
    pipeline_id: string;
    type: number;
    enable: boolean;
  }) => Promise<{
    enabled: boolean;
  }>;
  getPermissionSwitch: (input: { project_id: string; pipeline_id: string }) => Promise<{
    permission_switch: PipelineRawRecord;
  }>;
  getRolePermission: (input: { project_id: string; pipeline_id: string }) => Promise<{
    role_permission: PipelineRawRecord;
  }>;
  getUserPermission: (input: { project_id: string; pipeline_id: string }) => Promise<{
    user_permission: PipelineRawRecord;
  }>;
  updateRolePermission: (input: {
    project_id: string;
    pipeline_id: string;
    operation_query: boolean;
    operation_execute: boolean;
    operation_update: boolean;
    operation_delete: boolean;
    operation_authorize: boolean;
    role_id: number;
  }) => Promise<{
    status: string;
  }>;
  updateUserPermission: (input: {
    project_id: string;
    pipeline_id: string;
    operation_query: boolean;
    operation_execute: boolean;
    operation_update: boolean;
    operation_delete: boolean;
    operation_authorize: boolean;
    user_id: string;
  }) => Promise<{
    status: string;
  }>;
  switchPermission: (input: {
    project_id: string;
    pipeline_id: string;
    flag: boolean;
  }) => Promise<{
    status: string;
  }>;
  listQueue: (input: { project_id: string; pipeline_id: string }) => Promise<{
    records: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  listSystemVars: (input: { project_id: string; pipeline_id: string }) => Promise<{
    variables: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  getWebhookInfo: (input: { project_id: string; pipeline_id: string }) => Promise<{
    project_id: string;
    pipeline_id: string;
    webhook: PipelineRawRecord;
  }>;
  listPipelineVars: (input: { project_id: string; pipeline_id: string }) => Promise<{
    project_id: string;
    pipeline_id: string;
    variables: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  listTriggerFailedRecords: (input: {
    project_id: string;
    pipeline_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  listModifyHistory: (input: { project_id: string; pipeline_id: string }) => Promise<{
    records: PipelineRawRecord[];
    total?: number;
    raw: PipelineRawRecord;
  }>;
  rejectRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  retryRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
  approveRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    pipeline_run_id?: string;
    job_id?: string;
    step_id?: string;
    status?: string;
  }>;
  acceptDelayJob: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  rejectDelayJob: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  continueDelayJob: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  acceptCheckpoint: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  rejectCheckpoint: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  resumePipeline: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  stopRun: (input: { pipeline_id: string; run_id: string }) => Promise<{
    pipeline_id?: string;
    pipeline_name?: string;
  }>;
  getRunDetail: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<{
    id: string;
    pipeline_id?: string;
    name?: string;
    status?: string;
    executor_name?: string;
    trigger_type?: string;
    run_number?: number;
    detail_url?: string;
    stages?: Array<{
      id?: string;
      name?: string;
      status?: string;
      jobs?: Array<{
        id?: string;
        job_run_id?: string;
        name?: string;
        status?: string;
        steps?: Array<{
          id?: string;
          step_run_id?: string;
          name?: string;
          status?: string;
          task_type?: string;
          type?: string;
        }>;
      }>;
    }>;
  }>;
  runPipeline: (input: {
    project_id: string;
    pipeline_id: string;
    branch?: string;
    description?: string;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
  deletePipeline: (input: { project_id: string; pipeline_id: string }) => Promise<{
    pipeline_id: string;
    deleted: boolean;
  }>;
  createPipelineByTemplate: (input: {
    project_id: string;
    template_id: string;
    name: string;
    description?: string;
    group_id?: string;
  }) => Promise<{
    pipeline_id?: string;
    name?: string;
  }>;
  createPipeline: (input: {
    project_id: string;
    name: string;
    description?: string;
    manifest_version?: string;
    sources?: Array<Record<string, unknown>>;
    variables?: Array<Record<string, unknown>>;
    parameters?: Array<Record<string, unknown>>;
    definition?: Record<string, unknown>;
  }) => Promise<{
    pipeline_id?: string;
    name?: string;
  }>;
  updatePipelineInfo: (input: {
    project_id: string;
    pipeline_id: string;
    name?: string;
    description?: string;
    is_publish?: boolean;
    manifest_version?: string;
  }) => Promise<{
    pipeline_id: string;
    success: boolean;
  }>;
  batchDeletePipelines: (input: {
    project_id: string;
    pipeline_ids: string[];
  }) => Promise<{
    pipeline_ids: string[];
    deleted: boolean;
  }>;
  batchRunPipelines: (input: {
    project_id: string;
    pipeline_ids: string[];
    branch?: string;
    description?: string;
  }) => Promise<{
    pipeline_ids: string[];
    success: boolean;
  }>;
  disablePipeline: (input: { project_id: string; pipeline_id: string }) => Promise<{
    pipeline_id: string;
    success: boolean;
  }>;
  enablePipeline: (input: { project_id: string; pipeline_id: string }) => Promise<{
    pipeline_id: string;
    success: boolean;
  }>;
  listGroups: (input: { project_id: string }) => Promise<{
    groups: PipelineGroup[];
  }>;
  createGroup: (input: {
    project_id: string;
    name: string;
    parent_id?: string;
  }) => Promise<PipelineGroup>;
  updateGroup: (input: {
    project_id: string;
    id: string;
    name: string;
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
  deleteGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
  movePipelinesToGroup: (input: {
    project_id: string;
    group_id: string;
    pipelines: Array<{
      pipeline_id: string;
      pipeline_name: string;
    }>;
  }) => Promise<{
    results: PipelineMoveToGroupResult[];
  }>;
  createVariableGroup: (input: {
    project_id: string;
    name: string;
    description?: string;
    variables?: PipelineVariableGroupVariable[];
  }) => Promise<PipelineVariableGroup>;
  updateVariableGroup: (input: {
    project_id: string;
    id: string;
    name: string;
    description?: string;
    variables?: PipelineVariableGroupVariable[];
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
  deleteVariableGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
  bindVariableGroupsToPipeline: (input: {
    project_id: string;
    pipeline_id: string;
    pipeline_group_ids: string[];
  }) => Promise<{
    pipeline_id: string;
    pipeline_group_ids: string[];
    success: boolean;
  }>;
  getVariableGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<PipelineVariableGroup>;
  listPipelineVariableGroups: (input: {
    project_id: string;
    pipeline_id: string;
  }) => Promise<{
    groups: PipelineVariableGroup[];
  }>;
  listVariableGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    groups: PipelineVariableGroup[];
    offset: number;
    limit: number;
    total?: number;
  }>;
  listTags: (input: { project_id: string; proj_id?: string }) => Promise<{
    tags: PipelineTag[];
    total: number;
  }>;
  createTag: (input: {
    project_id: string;
    name: string;
    color: string;
  }) => Promise<{
    success: boolean;
    project_id: string;
    name: string;
    color: string;
  }>;
  updateTag: (input: {
    project_id: string;
    tag_id: string;
    name: string;
    color: string;
  }) => Promise<{
    success: boolean;
    project_id: string;
    tag_id: string;
    name: string;
    color: string;
  }>;
  deleteTag: (input: { project_id: string; tag_id: string }) => Promise<{
    success: boolean;
    project_id: string;
    tag_id: string;
  }>;
  setTagsForPipelines: (input: {
    project_id: string;
    pipeline_ids: string[];
    tag_ids: string[];
  }) => Promise<{
    success: boolean;
    project_id: string;
    pipeline_ids: string[];
    tag_ids: string[];
  }>;
  getRule: (input: { domain_id: string; rule_id: string }) => Promise<PipelineRule>;
  listRules: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    cloud_project_id?: string;
    type?: string;
    name?: string;
  }) => Promise<{
    data: PipelineRuleSummary[];
    total?: number;
  }>;
  createRule: (input: {
    domain_id: string;
    name: string;
    type: string;
    layout_content: string;
    plugin_id?: string;
    plugin_name?: string;
    plugin_version?: string;
    content: PipelineRuleContent[];
  }) => Promise<PipelineRuleMutationResult>;
  updateRule: (input: {
    domain_id: string;
    rule_id: string;
    name: string;
    type: string;
    plugin_id?: string;
    plugin_name?: string;
    plugin_version?: string;
    content: PipelineRuleContent[];
  }) => Promise<PipelineRuleMutationResult>;
  deleteRule: (input: { domain_id: string; rule_id: string }) => Promise<PipelineRuleMutationResult>;
  getRuleRelatedInfo: (input: {
    domain_id: string;
    rule_id: string;
  }) => Promise<PipelineRuleRelatedInfo>;
  getStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
    cloud_project_id?: string;
  }) => Promise<PipelineStrategy>;
  listStrategies: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    include_tenant_rule_set?: boolean;
    name?: string;
    is_valid?: boolean;
    type?: string;
  }) => Promise<{
    data: PipelineStrategySummary[];
    total?: number;
  }>;
  createStrategy: (input: {
    domain_id: string;
    name: string;
    rules: PipelineStrategyRuleReference[];
  }) => Promise<PipelineStrategyMutationResult>;
  updateStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
    name: string;
    rules?: PipelineStrategyRuleReference[];
  }) => Promise<PipelineStrategyMutationResult>;
  deleteStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategyMutationResult>;
  switchStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
    is_valid: boolean;
  }) => Promise<PipelineStrategyMutationResult>;
  getStrategyRelatedInfo: (input: {
    domain_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategyRelatedInfo>;
  listStrategyChildren: (input: {
    domain_id: string;
    rule_set_id: string;
    offset?: number;
    limit?: number;
  }) => Promise<{
    data: PipelineStrategySummary[];
    total?: number;
  }>;
  listProjectStrategies: (input: {
    project_id: string;
    offset: number;
    limit: number;
    include_tenant_rule_set?: boolean;
    name?: string;
    is_valid?: boolean;
    type?: string;
  }) => Promise<{
    data: PipelineStrategySummary[];
    total?: number;
  }>;
  getProjectStrategy: (input: {
    project_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategy>;
  getProjectStrategyRelatedInfo: (input: {
    project_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategyRelatedInfo>;
  inheritProjectStrategy: (input: {
    project_id: string;
    name: string;
    parent_id: string;
    rules?: string[];
    is_valid: boolean;
  }) => Promise<PipelineStrategyMutationResult>;
  switchProjectStrategy: (input: {
    project_id: string;
    rule_set_id: string;
    is_valid: boolean;
  }) => Promise<PipelineStrategyMutationResult>;
  deleteProjectStrategy: (input: {
    project_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategyMutationResult>;
  getProjectStrategyDetail: (input: {
    project_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategySummary>;
  updateProjectStrategy: (input: {
    project_id: string;
    rule_set_id: string;
    name: string;
    rules: PipelineStrategyRuleReference[];
  }) => Promise<PipelineStrategyMutationResult>;
  createProjectStrategy: (input: {
    project_id: string;
    name: string;
    rules: PipelineStrategyRuleReference[];
  }) => Promise<PipelineStrategyMutationResult>;
  listPublishers: (input: {
    domain_id: string;
    offset: number;
    limit: number;
  }) => Promise<{
    items: PipelinePluginPublisher[];
    total: number;
  }>;
  uploadPublisherIcon: (input: {
    domain_id: string;
    publisher_en_name: string;
    file_name: string;
    file_content: string;
    content_type?: string;
  }) => Promise<{
    url?: string;
    raw: unknown;
  }>;
  listAvailablePublishers: (input: { domain_id: string }) => Promise<{
    items: PipelinePluginPublisher[];
  }>;
  listStagePlugins: (input: {
    domain_id: string;
    use_condition: string;
    business_type?: string[];
    deploy_type?: string;
    comp_extend_type?: string;
  }) => Promise<{
    items: PipelineStagePlugin[];
  }>;
  listBasePlugins: (input: { domain_id: string }) => Promise<{
    items: PipelineBasePlugin[];
  }>;
  listBasePluginsPaged: (input: {
    domain_id: string;
    offset: number;
    limit: number;
  }) => Promise<{
    items: PipelineBasePlugin[];
    total: number;
  }>;
  listPlugins: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    plugin_attribution?: string;
    business_type?: string[];
    maintainer?: string;
    plugin_name?: string;
  }) => Promise<{
    items: PipelinePlugin[];
    total?: number;
  }>;
  getPluginInputs: (input: {
    domain_id: string;
    plugin_name: string;
    display_name: string;
    version: string;
    plugin_attribution: string;
  }) => Promise<{
    items: PipelinePluginPart[];
  }>;
  getPluginOutputs: (input: {
    domain_id: string;
    plugin_name: string;
    display_name: string;
    version: string;
    plugin_attribution: string;
  }) => Promise<{
    items: PipelinePluginPart[];
  }>;
  listPluginVersions: (input: {
    domain_id: string;
    plugin_name: string;
    offset: number;
    limit: number;
  }) => Promise<{
    items: PipelinePluginVersion[];
    total: number;
  }>;
  getPluginVersion: (input: {
    domain_id: string;
    plugin_name: string;
    version: string;
  }) => Promise<{
    item: PipelinePluginVersion;
  }>;
  listExtensionModules: (input: {
    locations: string[];
    project_id?: string;
    region_name?: string;
    name?: string;
    product_line?: string;
    tags?: string[];
    offset?: number;
    limit?: number;
  }) => Promise<{
    modules: PipelineExtensionModule[];
    total: number;
  }>;
  getExtensionModule: (input: {
    module_id: string;
  }) => Promise<{
    modules: PipelineExtensionModule[];
  }>;
  listExtensionEndpoints: (input: {
    project_id: string;
    region_name: string;
    module_id?: string;
    offset?: number;
    limit?: number;
  }) => Promise<{
    endpoints: PipelineExtensionEndpoint[];
    total: number;
  }>;
  createExtensionEndpoint: (input: {
    project_id?: string;
    region_name?: string;
    module_id?: string;
    name?: string;
    url?: string;
    authorization?: PipelineExtensionEndpointAuthorization;
    data?: Record<string, unknown>;
  }) => Promise<PipelineExtensionEndpoint>;
  updateExtensionEndpoint: (input: {
    uuid: string;
    project_id?: string;
    region_name?: string;
    module_id?: string;
    name?: string;
    url?: string;
    authorization?: PipelineExtensionEndpointAuthorization;
    data?: Record<string, unknown>;
  }) => Promise<PipelineExtensionEndpoint>;
  getExtensionEndpoint: (input: {
    uuid: string;
  }) => Promise<PipelineExtensionEndpoint>;
  deleteExtensionEndpoint: (input: {
    uuid: string;
    project_id?: string;
  }) => Promise<{
    uuid: string;
    success: boolean;
  }>;
  listRuleTypes: (input: { organization_id: string }) => Promise<{
    items: PipelineRuleType[];
  }>;
  listTemplates: (input: {
    tenant_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    language?: string;
    is_system?: boolean;
  }) => Promise<{
    templates: Array<{
      id?: string;
      name?: string;
      icon?: string;
      manifest_version?: string;
      language?: string;
      description?: string;
      is_system?: boolean;
      region?: string;
    }>;
    total?: number;
  }>;
  getTemplate: (input: { tenant_id: string; template_id: string }) => Promise<{
    id?: string;
    name?: string;
    icon?: string;
    manifest_version?: string;
    language?: string;
    description?: string;
    is_system?: boolean;
    region?: string;
    template: PipelineRawRecord;
  }>;
  getPipeline: (input: { project_id: string; pipeline_id: string }) => Promise<{
    id: string;
    name: string;
    description?: string;
    manifest_version?: string;
    creator_name?: string;
    is_publish?: boolean;
    project_id?: string;
    project_name?: string;
    detail_url?: string;
    modify_url?: string;
  }>;
  listPipelines: (input: { project_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    records: Array<{
      pipeline_id: string;
      name: string;
      creator_name?: string;
      project_id?: string;
      project_name?: string;
      manifest_version?: string;
      latest_run?: {
        pipeline_run_id?: string;
        status?: string;
        run_number?: number;
        trigger_type?: string;
      };
    }>;
    total?: number;
  }>;
  getRun: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<{
    pipeline_run_id: string;
    status?: string;
    executor_name?: string;
    trigger_type?: string;
  }>;
  listRuns: (input: { project_id: string; pipeline_id: string; page: number; page_size: number }) => Promise<{
    records: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
    total?: number;
  }>;
  batchGetPipelineStatus: (input: {
    project_id: string;
    pipeline_ids?: string[];
    body?: PipelineRawRecord;
  }) => Promise<PipelineRawListResult>;
  getNoticeMessages: (input: { project_id: string; pipeline_id: string }) => Promise<PipelineRawListResult>;
  checkProject: (input: { project_id: string; type: string }) => Promise<PipelineRawItemResult>;
  checkComponent: (input: {
    project_id: string;
    component_id?: string;
    component_name?: string;
    query?: PipelineRawRecord;
  }) => Promise<PipelineRawItemResult>;
  listExecutionPlans: (input: { project_id: string; pipeline_id: string }) => Promise<PipelineRawListResult>;
  listReusableJobs: (input: {
    project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: PipelineRawRecord;
  }) => Promise<PipelineRawListResult>;
  listDashboardPipelineCounts: (input: {
    tenant_id: string;
    start_time?: string;
    end_time?: string;
    query?: PipelineRawRecord;
  }) => Promise<PipelineRawListResult>;
  getDashboardExecutionsOverview: (input: {
    tenant_id: string;
    start_time?: string;
    end_time?: string;
    query?: PipelineRawRecord;
  }) => Promise<PipelineRawItemResult>;
  getDashboardConcurrency: (input: {
    tenant_id: string;
    start_time?: string;
    end_time?: string;
    query?: PipelineRawRecord;
  }) => Promise<PipelineRawItemResult>;
  listChangeRequests: (input: {
    cloud_project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: PipelineRawRecord;
  }) => Promise<PipelineRawListResult>;
  getChangeRequest: (input: {
    cloud_project_id: string;
    change_request_id: string;
  }) => Promise<PipelineRawItemResult>;
  listComponents: (input: {
    cloud_project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: PipelineRawRecord;
  }) => Promise<PipelineRawListResult>;
  getComponent: (input: {
    cloud_project_id: string;
    component_id: string;
  }) => Promise<PipelineRawItemResult>;
  listPacActions: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: PipelineRawRecord;
  }) => Promise<PipelineRawListResult>;
  getPacAction: (input: {
    domain_id: string;
    pipeline_id: string;
    pipeline_run_id: string;
  }) => Promise<PipelineRawItemResult>;
  getOauthAuthorizationUrl: (input: { query?: PipelineRawRecord }) => Promise<PipelineRawItemResult>;
  getDevucAuth: (input: {
    cloud_project_id: string;
    query?: PipelineRawRecord;
  }) => Promise<PipelineRawItemResult>;
};

type PipelineClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

function unwrapPipelinePayload<T>(input: T): T {
  if (
    input &&
    typeof input === "object" &&
    "error_msg" in input &&
    typeof (input as { error_msg?: unknown }).error_msg === "string"
  ) {
    throw normalizeProviderError({
      status: 400,
      message: String((input as { error_msg: string }).error_msg),
      code:
        "error_code" in input && typeof (input as { error_code?: unknown }).error_code === "string"
          ? String((input as { error_code: string }).error_code)
          : undefined
    });
  }

  return input;
}

function asPipelineRecord(input: unknown): PipelineRawRecord {
  return input && typeof input === "object" && !Array.isArray(input)
    ? (input as PipelineRawRecord)
    : {};
}

function getPipelinePayload(input: unknown): PipelineRawRecord {
  const response = asPipelineRecord(input);
  return asPipelineRecord(response.result ?? response.data ?? response.value ?? response);
}

function readPipelineRecordList(payload: PipelineRawRecord): PipelineRawRecord[] {
  for (const key of ["records", "items", "list", "data", "values", "variables", "historys"]) {
    const value = payload[key];
    if (Array.isArray(value)) {
      return value.filter((item): item is PipelineRawRecord => (
        item !== null && typeof item === "object" && !Array.isArray(item)
      ));
    }
  }

  return [];
}

function readPipelineTotal(payload: PipelineRawRecord, fallback?: number) {
  for (const key of ["total", "total_count", "count"]) {
    const value = payload[key];
    if (typeof value === "number") {
      return value;
    }
  }

  return fallback;
}

function mapPipelineRawListResult(payload: PipelineRawRecord): PipelineRawListResult {
  const records = readPipelineRecordList(payload);

  return {
    records,
    total: readPipelineTotal(payload, records.length),
    raw: payload
  };
}

function mapPipelineRawItemResult(payload: PipelineRawRecord): PipelineRawItemResult {
  return {
    item: payload,
    raw: payload
  };
}

function buildQuery(input: PipelineRawRecord | undefined) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(input ?? {})) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        query.append(key, String(item));
      }
    } else {
      query.set(key, String(value));
    }
  }

  return query.size > 0 ? `?${query.toString()}` : "";
}

function buildPagedBody(input: {
  offset?: number;
  limit?: number;
  keyword?: string;
  body?: PipelineRawRecord;
}) {
  return {
    ...(input.body ?? {}),
    ...(typeof input.offset === "number" ? { offset: input.offset } : {}),
    ...(typeof input.limit === "number" ? { limit: input.limit } : {}),
    ...(input.keyword ? { keyword: input.keyword, name: input.keyword } : {})
  };
}

export function createPipelineClient(
  _http: ReturnTypeCreateHttpClient,
  options: PipelineClientOptions = {}
): PipelineClient {
  const listCacheTtlMs =
    options.listCacheTtlMs ?? DEFAULT_READ_CACHE_TTLS.pipelineListPipelinesMs;
  const now = options.now ?? Date.now;
  const listCache = createReadThroughCache<
    string,
    {
      records: Array<{
        pipeline_id: string;
        name: string;
        creator_name?: string;
        project_id?: string;
        project_name?: string;
        manifest_version?: string;
        latest_run?: {
          pipeline_run_id?: string;
          status?: string;
          run_number?: number;
          trigger_type?: string;
        };
      }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });
  const listCacheKeys = new Set<string>();

  function buildListCacheKey(input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.project_id, input.page, input.page_size, input.keyword ?? ""]);
  }

  function clearProjectListCache(projectId: string) {
    for (const key of listCacheKeys) {
      const [cachedProjectId] = JSON.parse(key) as [string, number, number, string];

      if (cachedProjectId === projectId) {
        listCache.clear(key);
        listCacheKeys.delete(key);
      }
    }
  }

  function normalizeVariableGroup(
    projectId: string,
    group: PipelineVariableGroup
  ): PipelineVariableGroup {
    return {
      id: group.id,
      project_id: group.project_id ?? projectId,
      domain_id: group.domain_id,
      name: group.name,
      description: group.description,
      variables: group.variables,
      related_pipelines: group.related_pipelines,
      creator_id: group.creator_id,
      updater_id: group.updater_id,
      creator_name: group.creator_name,
      updater_name: group.updater_name,
      create_time: group.create_time,
      update_time: group.update_time
    };
  }

  function extractVariableGroups(
    projectId: string,
    response:
      | PipelineVariableGroup[]
      | {
          pipeline_variable_groups?: PipelineVariableGroup[];
          variable_groups?: PipelineVariableGroup[];
          result?:
            | PipelineVariableGroup[]
            | {
                pipeline_variable_groups?: PipelineVariableGroup[];
                variable_groups?: PipelineVariableGroup[];
              };
        }
  ) {
    const rawGroups = Array.isArray(response)
      ? response
      : Array.isArray(response.result)
        ? response.result
        : (response.pipeline_variable_groups ??
          response.variable_groups ??
          response.result?.pipeline_variable_groups ??
          response.result?.variable_groups ??
          []);

    return rawGroups.map((group) => normalizeVariableGroup(projectId, group));
  }

  function normalizeRuleTypes(
    response:
      | PipelineRuleType
      | PipelineRuleType[]
      | {
          data?: PipelineRuleType[];
          result?: PipelineRuleType | PipelineRuleType[];
        }
  ) {
    if (Array.isArray(response)) {
      return response;
    }

    if (response && typeof response === "object") {
      if ("data" in response && Array.isArray(response.data)) {
        return response.data;
      }

      if ("result" in response && Array.isArray(response.result)) {
        return response.result;
      }

      if ("typeKey" in response || "typeName" in response) {
        return [response as PipelineRuleType];
      }

      if ("result" in response && response.result && typeof response.result === "object") {
        return [response.result as PipelineRuleType];
      }
    }

    return [];
  }

  function normalizeExtensionModule(
    module: PipelineExtensionModule,
    fallbackLocation?: string
  ): PipelineExtensionModule {
    return {
      id: module.id,
      base_url: module.base_url,
      description: module.description,
      location: module.location ?? fallbackLocation,
      module_id: module.module_id,
      name: module.name,
      properties: module.properties,
      publisher: module.publisher,
      type: module.type,
      version: module.version,
      tags: module.tags ?? [],
      url_relative: module.url_relative,
      properties_list: module.properties_list,
      manifest_version: module.manifest_version
    };
  }

  function extractExtensionModules(
    response:
      | PipelineExtensionModule[]
      | {
          result?:
            | PipelineExtensionModule[]
            | Record<string, PipelineExtensionModuleList | undefined>;
        }
      | Record<string, PipelineExtensionModuleList | undefined>
  ) {
    const payload =
      response && typeof response === "object" && "result" in response ? response.result : response;

    if (Array.isArray(payload)) {
      return {
        modules: payload.map((item: PipelineExtensionModule) => normalizeExtensionModule(item)),
        total: payload.length
      };
    }

    if (payload && typeof payload === "object") {
      const modules: PipelineExtensionModule[] = [];
      let total = 0;

      for (const [location, list] of Object.entries(payload)) {
        if (!list || typeof list !== "object") {
          continue;
        }

        const items: PipelineExtensionModule[] = Array.isArray(list.data) ? list.data : [];
        modules.push(
          ...items.map((item: PipelineExtensionModule) => normalizeExtensionModule(item, location))
        );
        total += typeof list.total === "number" ? list.total : items.length;
      }

      return {
        modules,
        total
      };
    }

    return {
      modules: [],
      total: 0
    };
  }

  function normalizeExtensionEndpoint(
    endpoint: PipelineExtensionEndpoint,
    fallbackProjectId?: string
  ): PipelineExtensionEndpoint {
    return {
      authorization: endpoint.authorization,
      uuid: endpoint.uuid,
      url: endpoint.url,
      name: endpoint.name,
      project_uuid: endpoint.project_uuid ?? endpoint.projectUuid ?? fallbackProjectId,
      region_name: endpoint.region_name ?? endpoint.regionName,
      data: endpoint.data,
      module_id: endpoint.module_id ?? endpoint.moduleId,
      created_by: endpoint.created_by
    };
  }

  return {
    ...createOfficialApiRequester({
      product: "Pipeline",
      http: _http,
      allowedPrefixes: ["/v1/", "/v2/", "/v3/", "/v5/", "/v6/"]
    }),
    async getRunParameters(input) {
      try {
        const response = (await _http.get(
          `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/run-variables?mode=0`
        )) as
          | Array<{
              name?: string;
              value?: string;
              type?: string;
              is_runtime?: boolean | string;
              latest_value?: string;
            }>
          | {
              variables?: Array<{
                name?: string;
                value?: string;
                type?: string;
                is_runtime?: boolean | string;
                latest_value?: string;
              }>;
            };
        const items = Array.isArray(response) ? response : (response.variables ?? []);

        return {
          parameters: items.map((item) => ({
            name: item.name,
            value: item.value ?? item.latest_value,
            value_type: item.type,
            is_runtime:
              typeof item.is_runtime === "string" ? item.is_runtime === "true" : item.is_runtime
          }))
        };
      } catch {
        const query = new URLSearchParams({
          pipeline_run_id: input.run_id
        });

        const response = (await _http.get(
          `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/list-runtime-vars?${query.toString()}`
        )) as
          | Array<{
              name?: string;
              value?: string;
              value_type?: string;
              is_runtime?: boolean;
            }>
          | {
              variables?: Array<{
                name?: string;
                value?: string;
                value_type?: string;
                is_runtime?: boolean;
              }>;
              runtime_vars?: Array<{
                name?: string;
                value?: string;
                value_type?: string;
                is_runtime?: boolean;
              }>;
            };

        return {
          parameters: Array.isArray(response)
            ? response
            : (response.variables ?? response.runtime_vars ?? [])
        };
      }
    },
    async getRunLog(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/logs`
      )) as {
        log?: string;
        status?: string;
        truncated?: boolean;
        result?: {
          log?: string;
          status?: string;
          truncated?: boolean;
        };
      };

      return {
        log: response.log ?? response.result?.log ?? "",
        status: response.status ?? response.result?.status,
        truncated: response.truncated ?? response.result?.truncated
      };
    },
    async getExecLog(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/exec-log`,
        {
          ...(typeof input.start_offset === "number" ? { start_offset: input.start_offset } : {}),
          ...(typeof input.end_offset === "number" ? { end_offset: input.end_offset } : {}),
          ...(typeof input.limit === "number" ? { limit: input.limit } : {}),
          ...(typeof input.offset === "number" ? { offset: input.offset } : {}),
          ...(input.sort ? { sort: input.sort } : {})
        }
      )) as {
        log?: string;
        has_more?: boolean;
        start_offset?: string;
        end_offset?: string;
        step_run_id?: string;
        result?: {
          log?: string;
          has_more?: boolean;
          start_offset?: string;
          end_offset?: string;
          step_run_id?: string;
        };
      };

      return {
        log: response.log ?? response.result?.log ?? "",
        has_more: response.has_more ?? response.result?.has_more,
        start_offset: response.start_offset ?? response.result?.start_offset,
        end_offset: response.end_offset ?? response.result?.end_offset,
        step_run_id: response.step_run_id ?? response.result?.step_run_id
      };
    },
    async cancelQueue(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/${encodeURIComponent(input.run_id)}/cancel-queuing/${encodeURIComponent(String(input.queue_id))}`
      )) as {
        pipeline_run_id?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id ?? input.run_id
      };
    },
    async getStepOutputs(input) {
      const query = new URLSearchParams({
        pipeline_run_id: input.run_id,
        step_run_ids: input.step_run_ids.join(",")
      });

      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/step-outputs?${query.toString()}`
      )) as {
        step_outputs?: Array<{
          step_run_id?: string;
          output_result?: Array<{ key?: string; value?: string }>;
        }>;
        current_system_time?: number;
      };

      return {
        step_outputs: response.step_outputs ?? [],
        current_system_time: response.current_system_time
      };
    },
    async getStepJumpLink(input) {
      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/jump-link`
      )) as {
        jumpLink?: string;
      };

      return {
        jump_link: response.jumpLink
      };
    },
    async getRunChangeRequests(input) {
      const query = new URLSearchParams();
      if (input.component_id) {
        query.set("component_id", input.component_id);
      }
      const suffix = query.size > 0 ? `?${query.toString()}` : "";
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/query-change-requests${suffix}`
      ));
      const payload = Array.isArray(response) ? { result: response } : getPipelinePayload(response);
      const records = Array.isArray(response)
        ? response
        : Array.isArray(payload.result)
          ? (payload.result as PipelineRawRecord[])
          : readPipelineRecordList(payload);
      return {
        records,
        total: records.length,
        raw: payload as PipelineRawRecord
      };
    },
    async rollbackRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/rollback-run`,
        {
          ...(input.sources ? { sources: input.sources } : {}),
          ...(input.description ? { description: input.description } : {}),
          ...(input.variables ? { variables: input.variables } : {}),
          ...(input.choose_jobs ? { choose_jobs: input.choose_jobs } : {}),
          ...(input.choose_stages ? { choose_stages: input.choose_stages } : {})
        }
      )) as {
        pipeline_run_id?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id
      };
    },
    async getBatchRunResult(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/batch-runs/result`,
        {
          query: input.query
        }
      ));
      const payload = getPipelinePayload(response);
      const records = Array.isArray(payload.result)
        ? (payload.result as PipelineRawRecord[])
        : readPipelineRecordList(payload);
      return {
        records,
        total: records.length,
        raw: payload
      };
    },
    async listArtifacts(input) {
      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/artifacts`
      )) as {
        artifacts?: Array<{
          name?: string;
          artifact_version?: string;
          upload_target?: string;
          artifact_package_type?: string;
          artifact_uri?: string;
          artifact_download_url_with_id?: string;
          artifact_type?: string;
          job_id?: string;
          build_no?: number;
        }>;
        result?: {
          artifacts?: Array<{
            name?: string;
            artifact_version?: string;
            upload_target?: string;
            artifact_package_type?: string;
            artifact_uri?: string;
            artifact_download_url_with_id?: string;
            artifact_type?: string;
            job_id?: string;
            build_no?: number;
          }>;
        };
      };

      return {
        artifacts: response.artifacts ?? response.result?.artifacts ?? []
      };
    },
    async getOfficialNotice(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice`
      ));
      return {
        notice: getPipelinePayload(response)
      };
    },
    async getNoticeStatus(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice/status`
      ));
      return {
        status: getPipelinePayload(response)
      };
    },
    async getNoticeDetail(input) {
      const query = new URLSearchParams();
      if (input.type) {
        query.set("type", input.type);
      }
      const suffix = query.size > 0 ? `?${query.toString()}` : "";
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice/detail${suffix}`
      ));
      return {
        detail: getPipelinePayload(response)
      };
    },
    async updateOfficialNotice(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice`,
        {
          event_type: input.event_type,
          notice_data: input.notice_data
        }
      )) as { status?: string };

      return {
        status: response.status ?? "success"
      };
    },
    async switchNotice(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice/all`,
        {
          notice_type: input.notice_type,
          notice_switch: input.notice_switch
        }
      )) as { status?: string };

      return {
        status: response.status ?? "success"
      };
    },
    async updateThirdPartyNotice(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice/message`,
        {
          notice_id: input.notice_id,
          notice_type: input.notice_type,
          notice_status: input.notice_status,
          send_url: input.send_url,
          ...(input.secret_info ? { secret_info: input.secret_info } : {}),
          ...(input.notice_events ? { notice_events: input.notice_events } : {}),
          ...(input.notice_contents ? { notice_contents: input.notice_contents } : {}),
          ...(input.notice_users ? { notice_users: input.notice_users } : {}),
          ...(typeof input.sort_index === "number" ? { sort_index: input.sort_index } : {})
        }
      )) as { status?: string };

      return {
        status: response.status ?? "success"
      };
    },
    async updateNoticeStatus(input) {
      const response = await _http.put(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice/status`,
        {
          type: input.type,
          enable: input.enable
        }
      ) as boolean;

      return {
        enabled: response
      };
    },
    async getPermissionSwitch(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-permissions/${encodeURIComponent(input.pipeline_id)}/permission-switch`
      ));
      return {
        permission_switch: getPipelinePayload(response)
      };
    },
    async getRolePermission(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-permissions/${encodeURIComponent(input.pipeline_id)}/role-permission`
      ));
      return {
        role_permission: getPipelinePayload(response)
      };
    },
    async getUserPermission(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-permissions/${encodeURIComponent(input.pipeline_id)}/user-permission`
      ));
      return {
        user_permission: getPipelinePayload(response)
      };
    },
    async updateRolePermission(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-permissions/${encodeURIComponent(input.pipeline_id)}/update-role-permission`,
        {
          pipeline_id: input.pipeline_id,
          operation_query: input.operation_query,
          operation_execute: input.operation_execute,
          operation_update: input.operation_update,
          operation_delete: input.operation_delete,
          operation_authorize: input.operation_authorize,
          role_id: input.role_id
        }
      )) as { status?: string };

      return {
        status: response.status ?? "success"
      };
    },
    async updateUserPermission(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-permissions/${encodeURIComponent(input.pipeline_id)}/update-user-permission`,
        {
          pipeline_id: input.pipeline_id,
          operation_query: input.operation_query,
          operation_execute: input.operation_execute,
          operation_update: input.operation_update,
          operation_delete: input.operation_delete,
          operation_authorize: input.operation_authorize,
          user_id: input.user_id
        }
      )) as { status?: string };

      return {
        status: response.status ?? "success"
      };
    },
    async switchPermission(input) {
      const query = new URLSearchParams({
        flag: input.flag ? "true" : "false"
      });
      const response = unwrapPipelinePayload(await _http.put(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-permissions/${encodeURIComponent(input.pipeline_id)}/update-permission-switch?${query.toString()}`
      )) as { status?: string };

      return {
        status: response.status ?? "success"
      };
    },
    async listQueue(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/queued-pipeline`
      ));
      const payload = getPipelinePayload(response);
      const records = readPipelineRecordList(payload);
      return {
        records,
        total: readPipelineTotal(payload, records.length),
        raw: payload
      };
    },
    async listSystemVars(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/list-system-vars`
      ));
      const payload = getPipelinePayload(response);
      const variables = readPipelineRecordList(payload);
      return {
        variables,
        total: readPipelineTotal(payload, variables.length),
        raw: payload
      };
    },
    async getWebhookInfo(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/webhook`
      ));
      const payload = getPipelinePayload(response);

      return {
        project_id: input.project_id,
        pipeline_id: input.pipeline_id,
        webhook: payload
      };
    },
    async listPipelineVars(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/list-pipeline-vars`
      ));
      const payload = getPipelinePayload(response);
      const variables = readPipelineRecordList(payload);

      return {
        project_id: input.project_id,
        pipeline_id: input.pipeline_id,
        variables,
        total: readPipelineTotal(payload, variables.length),
        raw: payload
      };
    },
    async listTriggerFailedRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/trigger-failed-record?${query.toString()}`
      ));
      const payload = getPipelinePayload(response);
      const records = readPipelineRecordList(payload);
      return {
        records,
        total: readPipelineTotal(payload, records.length),
        raw: payload
      };
    },
    async listModifyHistory(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipelines-modify-historys`
      ));
      const payload = getPipelinePayload(response);
      const records = readPipelineRecordList(payload);
      return {
        records,
        total: readPipelineTotal(payload, records.length),
        raw: payload
      };
    },
    async rejectRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/reject`,
        {
          job_run_id: input.job_id,
          step_run_id: input.step_id
        }
      )) as {
        success?: boolean;
      };

      return {
        success: response.success ?? true
      };
    },
    async retryRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/retry`
      )) as {
        pipeline_run_id?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id
      };
    },
    async approveRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/pass`,
        {
          job_run_id: input.job_id,
          step_run_id: input.step_id
        }
      )) as {
        pipeline_run_id?: string;
        job_run_id?: string;
        step_run_id?: string;
        status?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id ?? input.run_id,
        job_id: response.job_run_id ?? input.job_id,
        step_id: response.step_run_id ?? input.step_id,
        status: response.status
      };
    },
    async acceptDelayJob(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/delay-pass`
      )) as { success?: boolean };

      return {
        success: response.success ?? true
      };
    },
    async rejectDelayJob(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/delay-refuse`
      )) as { success?: boolean };

      return {
        success: response.success ?? true
      };
    },
    async continueDelayJob(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/delay`
      )) as { success?: boolean };

      return {
        success: response.success ?? true
      };
    },
    async acceptCheckpoint(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/steps/${encodeURIComponent(input.step_id)}/manual/pass`
      )) as { success?: boolean };

      return {
        success: response.success ?? true
      };
    },
    async rejectCheckpoint(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/steps/${encodeURIComponent(input.step_id)}/manual/refuse`
      )) as { success?: boolean };

      return {
        success: response.success ?? true
      };
    },
    async resumePipeline(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/resume`
      )) as { success?: boolean };

      return {
        success: response.success ?? true
      };
    },
    async stopRun(input) {
      const response = (await _http.post(
        `/v5/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/stop`
      )) as {
        pipeline_id?: string;
        pipeline_name?: string;
      };

      return {
        pipeline_id: response.pipeline_id ?? input.pipeline_id,
        pipeline_name: response.pipeline_name
      };
    },
    async getRunDetail(input) {
      const query = new URLSearchParams({
        pipeline_run_id: input.run_id
      });

      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/detail?${query.toString()}`
      )) as {
        id?: string;
        pipeline_run_id?: string;
        pipeline_id?: string;
        name?: string;
        status?: string;
        executor_name?: string;
        trigger_type?: string;
        run_number?: number;
        detail_url?: string;
        stages?: Array<{
          id?: string;
          name?: string;
          status?: string;
          jobs?: Array<{
            id?: string;
            job_run_id?: string;
            name?: string;
            status?: string;
            steps?: Array<{
              id?: string;
              step_run_id?: string;
              name?: string;
              status?: string;
              task_type?: string;
              type?: string;
            }>;
          }>;
        }>;
      };

      return {
        id: response.id ?? response.pipeline_run_id ?? input.run_id,
        pipeline_id: response.pipeline_id ?? input.pipeline_id,
        name: response.name,
        status: response.status,
        executor_name: response.executor_name,
        trigger_type: response.trigger_type,
        run_number: response.run_number,
        detail_url: response.detail_url,
        stages: response.stages
      };
    },
    async runPipeline(input) {
      clearProjectListCache(input.project_id);
      const body =
        input.branch || input.description
          ? {
              description: input.description,
              ...(input.branch
                ? {
                    sources: [
                      {
                        type: "code",
                        params: {
                          build_params: {
                            build_type: "branch",
                            event_type: "Manual",
                            target_branch: input.branch
                          }
                        }
                      }
                    ]
                  }
                : {})
            }
          : {};

      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/run`,
        body
      )) as {
        pipeline_run_id?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id
      };
    },
    async deletePipeline(input) {
      clearProjectListCache(input.project_id);
      const response = (await _http.delete(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}`
      )) as {
        pipeline_id?: string;
      };

      return {
        pipeline_id: response.pipeline_id ?? input.pipeline_id,
        deleted: true
      };
    },
    async createPipelineByTemplate(input) {
      clearProjectListCache(input.project_id);
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/template/${encodeURIComponent(input.template_id)}`,
        {
          name: input.name,
          ...(input.description ? { description: input.description } : {}),
          ...(input.group_id ? { group_id: input.group_id } : {})
        }
      )) as {
        pipeline_id?: string;
        id?: string;
        name?: string;
      });

      return {
        pipeline_id: response.pipeline_id ?? response.id,
        name: response.name ?? input.name
      };
    },
    async createPipeline(input) {
      clearProjectListCache(input.project_id);
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines`,
        {
          name: input.name,
          ...(input.description ? { description: input.description } : {}),
          ...(input.manifest_version ? { manifest_version: input.manifest_version } : {}),
          ...(input.sources ? { sources: input.sources } : {}),
          ...(input.variables ? { variables: input.variables } : {}),
          ...(input.parameters ? { parameters: input.parameters } : {}),
          ...(input.definition ? { definition: input.definition } : {})
        }
      )) as {
        pipeline_id?: string;
        id?: string;
        name?: string;
      });

      return {
        pipeline_id: response.pipeline_id ?? response.id,
        name: response.name ?? input.name
      };
    },
    async updatePipelineInfo(input) {
      clearProjectListCache(input.project_id);
      const response = unwrapPipelinePayload((await _http.put(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}`,
        {
          ...(input.name ? { name: input.name } : {}),
          ...(input.description ? { description: input.description } : {}),
          ...(typeof input.is_publish === "boolean" ? { is_publish: input.is_publish } : {}),
          ...(input.manifest_version ? { manifest_version: input.manifest_version } : {})
        }
      )) as boolean | { success?: boolean; pipeline_id?: string });

      return {
        pipeline_id:
          typeof response === "object" && response && "pipeline_id" in response && typeof response.pipeline_id === "string"
            ? response.pipeline_id
            : input.pipeline_id,
        success: typeof response === "boolean" ? response : response.success ?? true
      };
    },
    async batchDeletePipelines(input) {
      clearProjectListCache(input.project_id);
      await _http.delete(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/batch`,
        {
          pipeline_ids: input.pipeline_ids
        }
      );

      return {
        pipeline_ids: input.pipeline_ids,
        deleted: true
      };
    },
    async batchRunPipelines(input) {
      clearProjectListCache(input.project_id);
      await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/batch-run`,
        {
          pipeline_ids: input.pipeline_ids,
          ...(input.description ? { description: input.description } : {}),
          ...(input.branch
            ? {
                sources: [
                  {
                    type: "code",
                    params: {
                      build_params: {
                        build_type: "branch",
                        event_type: "Manual",
                        target_branch: input.branch
                      }
                    }
                  }
                ]
              }
            : {})
        }
      );

      return {
        pipeline_ids: input.pipeline_ids,
        success: true
      };
    },
    async disablePipeline(input) {
      clearProjectListCache(input.project_id);
      const response = (await _http.put(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/ban`
      )) as boolean | { success?: boolean };

      return {
        pipeline_id: input.pipeline_id,
        success: typeof response === "boolean" ? response : response.success ?? true
      };
    },
    async enablePipeline(input) {
      clearProjectListCache(input.project_id);
      const response = (await _http.put(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/unban`
      )) as boolean | { success?: boolean };

      return {
        pipeline_id: input.pipeline_id,
        success: typeof response === "boolean" ? response : response.success ?? true
      };
    },
    async listGroups(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-group/tree`
      )) as PipelineGroup[] | { groups?: PipelineGroup[]; result?: PipelineGroup[] });

      return {
        groups: Array.isArray(response) ? response : (response.groups ?? response.result ?? [])
      };
    },
    async createGroup(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-group/create`,
        {
          project_id: input.project_id,
          name: input.name,
          ...(input.parent_id ? { parent_id: input.parent_id } : {})
        }
      )) as PipelineGroup);

      return {
        id: response.id,
        domain_id: response.domain_id,
        project_id: response.project_id ?? input.project_id,
        name: response.name ?? input.name,
        parent_id: response.parent_id ?? input.parent_id,
        path_id: response.path_id,
        ordinal: response.ordinal,
        creator: response.creator,
        updater: response.updater,
        create_time: response.create_time,
        update_time: response.update_time,
        children: response.children
      };
    },
    async updateGroup(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-group/update`,
        {
          id: input.id,
          name: input.name
        }
      )) as {
        success?: boolean;
      });

      return {
        id: input.id,
        success: response.success ?? true
      };
    },
    async deleteGroup(input) {
      const query = new URLSearchParams({
        id: input.id
      });
      const response = unwrapPipelinePayload((await _http.delete(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-group/delete?${query.toString()}`
      )) as {
        success?: boolean;
      });

      return {
        id: input.id,
        success: response.success ?? true
      };
    },
    async movePipelinesToGroup(input) {
      clearProjectListCache(input.project_id);
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-group/pipeline/move`,
        {
          group_id: input.group_id,
          pipelines: input.pipelines
        }
      )) as
        | PipelineMoveToGroupResult[]
        | {
            results?: PipelineMoveToGroupResult[];
          });

      return {
        results: Array.isArray(response) ? response : (response.results ?? [])
      };
    },
    async createVariableGroup(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/create`,
        {
          projectId: input.project_id,
          name: input.name,
          ...(typeof input.description !== "undefined" ? { description: input.description } : {}),
          ...(typeof input.variables !== "undefined" ? { variables: input.variables } : {})
        }
      )) as PipelineVariableGroup);

      return {
        ...normalizeVariableGroup(input.project_id, response),
        name: response.name ?? input.name,
        description: response.description ?? input.description,
        variables: response.variables ?? input.variables
      };
    },
    async updateVariableGroup(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/update`,
        {
          projectId: input.project_id,
          id: input.id,
          name: input.name,
          ...(typeof input.description !== "undefined" ? { description: input.description } : {}),
          ...(typeof input.variables !== "undefined" ? { variables: input.variables } : {})
        }
      )) as boolean | { success?: boolean });

      return {
        id: input.id,
        success: typeof response === "boolean" ? response : response.success ?? true
      };
    },
    async deleteVariableGroup(input) {
      const query = new URLSearchParams({
        id: input.id
      });
      const response = unwrapPipelinePayload((await _http.delete(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/delete?${query.toString()}`
      )) as boolean | { success?: boolean });

      return {
        id: input.id,
        success: typeof response === "boolean" ? response : response.success ?? true
      };
    },
    async bindVariableGroupsToPipeline(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/relation`,
        {
          pipeline_id: input.pipeline_id,
          pipeline_group_ids: input.pipeline_group_ids
        }
      )) as boolean | { success?: boolean });

      return {
        pipeline_id: input.pipeline_id,
        pipeline_group_ids: input.pipeline_group_ids,
        success: typeof response === "boolean" ? response : response.success ?? true
      };
    },
    async getVariableGroup(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/${encodeURIComponent(input.id)}`
      )) as PipelineVariableGroup);

      return normalizeVariableGroup(input.project_id, response);
    },
    async listPipelineVariableGroups(input) {
      const query = new URLSearchParams({
        pipelineId: input.pipeline_id
      });
      const response = unwrapPipelinePayload((await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/pipeline?${query.toString()}`
      )) as
        | PipelineVariableGroup[]
        | {
            pipeline_variable_groups?: PipelineVariableGroup[];
            variable_groups?: PipelineVariableGroup[];
            result?:
              | PipelineVariableGroup[]
              | {
                  pipeline_variable_groups?: PipelineVariableGroup[];
                  variable_groups?: PipelineVariableGroup[];
                };
          });

      return {
        groups: extractVariableGroups(input.project_id, response)
      };
    },
    async listVariableGroups(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline/variable/group/list`,
        {
          offset,
          limit: input.page_size,
          ...(typeof input.name !== "undefined" ? { name: input.name } : {})
        }
      )) as {
        pipeline_variable_groups?: PipelineVariableGroup[];
        variable_groups?: PipelineVariableGroup[];
        offset?: number;
        limit?: number;
        total?: number;
        result?: {
          pipeline_variable_groups?: PipelineVariableGroup[];
          variable_groups?: PipelineVariableGroup[];
          offset?: number;
          limit?: number;
          total?: number;
        };
      });

      return {
        groups: extractVariableGroups(input.project_id, response),
        offset: response.offset ?? response.result?.offset ?? offset,
        limit: response.limit ?? response.result?.limit ?? input.page_size,
        total: response.total ?? response.result?.total
      };
    },
    async listTags(input) {
      const query = new URLSearchParams();

      if (input.proj_id) {
        query.set("proj_id", input.proj_id);
      }

      const suffix = query.size > 0 ? `?${query.toString()}` : "";
      const response = unwrapPipelinePayload((await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-tag/list${suffix}`
      )) as PipelineTag[]);

      return {
        tags: response,
        total: response.length
      };
    },
    async createTag(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-tag/create`,
        {
          name: input.name,
          color: input.color
        }
      )) as boolean | { success?: boolean });

      return {
        success: typeof response === "boolean" ? response : response.success ?? true,
        project_id: input.project_id,
        name: input.name,
        color: input.color
      };
    },
    async updateTag(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-tag/update`,
        {
          name: input.name,
          color: input.color,
          tagId: input.tag_id
        }
      )) as boolean | { success?: boolean });

      return {
        success: typeof response === "boolean" ? response : response.success ?? true,
        project_id: input.project_id,
        tag_id: input.tag_id,
        name: input.name,
        color: input.color
      };
    },
    async deleteTag(input) {
      const query = new URLSearchParams({
        tagId: input.tag_id
      });
      const response = unwrapPipelinePayload((await _http.delete(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-tag/delete?${query.toString()}`
      )) as boolean | { success?: boolean });

      return {
        success: typeof response === "boolean" ? response : response.success ?? true,
        project_id: input.project_id,
        tag_id: input.tag_id
      };
    },
    async setTagsForPipelines(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-tag/set-tags`,
        {
          pipelineList: input.pipeline_ids,
          tagList: input.tag_ids
        }
      )) as boolean | { success?: boolean });

      return {
        success: typeof response === "boolean" ? response : response.success ?? true,
        project_id: input.project_id,
        pipeline_ids: input.pipeline_ids,
        tag_ids: input.tag_ids
      };
    },
    async getRule(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/rules/${encodeURIComponent(input.rule_id)}/detail`
      )) as PipelineRule);

      return response;
    },
    async listRules(input) {
      const query = new URLSearchParams();

      if (input.cloud_project_id) {
        query.set("cloud_project_id", input.cloud_project_id);
      }
      query.set("offset", String(input.offset));
      query.set("limit", String(input.limit));
      if (input.type) {
        query.set("type", input.type);
      }
      if (input.name) {
        query.set("name", input.name);
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/rules/query?${query.toString()}`
      )) as {
        data?: PipelineRuleSummary[];
        total?: number;
      });

      return {
        data: response.data ?? [],
        total: response.total
      };
    },
    async createRule(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v2/${encodeURIComponent(input.domain_id)}/rules/create`,
        {
          name: input.name,
          type: input.type,
          layout_content: input.layout_content,
          ...(input.plugin_id ? { plugin_id: input.plugin_id } : {}),
          ...(input.plugin_name ? { plugin_name: input.plugin_name } : {}),
          ...(input.plugin_version ? { plugin_version: input.plugin_version } : {}),
          content: input.content
        }
      )) as PipelineRuleMutationResult);

      return {
        status: response.status ?? true,
        rule_id: response.rule_id
      };
    },
    async updateRule(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v2/${encodeURIComponent(input.domain_id)}/rules/${encodeURIComponent(input.rule_id)}/update`,
        {
          name: input.name,
          type: input.type,
          ...(input.plugin_id ? { plugin_id: input.plugin_id } : {}),
          ...(input.plugin_name ? { plugin_name: input.plugin_name } : {}),
          ...(input.plugin_version ? { plugin_version: input.plugin_version } : {}),
          content: input.content
        }
      )) as PipelineRuleMutationResult);

      return {
        status: response.status ?? true,
        rule_id: response.rule_id ?? input.rule_id
      };
    },
    async deleteRule(input) {
      const response = unwrapPipelinePayload((await _http.delete(
        `/v2/${encodeURIComponent(input.domain_id)}/rules/${encodeURIComponent(input.rule_id)}/delete`
      )) as PipelineRuleMutationResult);

      return {
        status: response.status ?? true,
        rule_id: response.rule_id ?? input.rule_id
      };
    },
    async getRuleRelatedInfo(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/rules/${encodeURIComponent(input.rule_id)}/related/query`
      )) as PipelineRuleRelatedInfo);

      return {
        rule_set_count: response.rule_set_count,
        project_count: response.project_count,
        pipeline_count: response.pipeline_count
      };
    },
    async getStrategy(input) {
      const query = new URLSearchParams();
      if (input.cloud_project_id) {
        query.set("cloud_project_id", input.cloud_project_id);
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/${encodeURIComponent(input.rule_set_id)}/detail${query.size > 0 ? `?${query.toString()}` : ""}`
      )) as PipelineStrategy);

      return response;
    },
    async listStrategies(input) {
      const query = new URLSearchParams();

      query.set("offset", String(input.offset));
      query.set("limit", String(input.limit));
      query.set(
        "include_tenant_rule_set",
        String(input.include_tenant_rule_set ?? true)
      );
      if (input.name) {
        query.set("name", input.name);
      }
      if (typeof input.is_valid === "boolean") {
        query.set("is_valid", String(input.is_valid));
      }
      if (input.type) {
        query.set("type", input.type);
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/query?${query.toString()}`
      )) as {
        data?: PipelineStrategySummary[];
        total?: number;
      });

      return {
        data: response.data ?? [],
        total: response.total
      };
    },
    async createStrategy(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/create`,
        {
          name: input.name,
          rules: input.rules
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id
      };
    },
    async updateStrategy(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/${encodeURIComponent(input.rule_set_id)}/update`,
        {
          name: input.name,
          ...(input.rules ? { rules: input.rules } : {})
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id ?? input.rule_set_id
      };
    },
    async deleteStrategy(input) {
      const response = unwrapPipelinePayload((await _http.delete(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/${encodeURIComponent(input.rule_set_id)}/delete`
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id ?? input.rule_set_id
      };
    },
    async switchStrategy(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/${encodeURIComponent(input.rule_set_id)}/switch`,
        {
          is_valid: input.is_valid
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id ?? input.rule_set_id
      };
    },
    async getStrategyRelatedInfo(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/${encodeURIComponent(input.rule_set_id)}/related/query`
      )) as PipelineStrategyRelatedInfo);

      return {
        project_count: response.project_count,
        pipeline_count: response.pipeline_count
      };
    },
    async listStrategyChildren(input) {
      const query = new URLSearchParams();

      if (typeof input.offset === "number") {
        query.set("offset", String(input.offset));
      }
      if (typeof input.limit === "number") {
        query.set("limit", String(input.limit));
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.domain_id)}/tenant/rule-sets/${encodeURIComponent(input.rule_set_id)}/children${query.size > 0 ? `?${query.toString()}` : ""}`
      )) as {
        data?: PipelineStrategySummary[];
        total?: number;
      });

      return {
        data: response.data ?? [],
        total: response.total
      };
    },
    async listProjectStrategies(input) {
      const query = new URLSearchParams();

      query.set("offset", String(input.offset));
      query.set("limit", String(input.limit));
      query.set(
        "include_tenant_rule_set",
        String(input.include_tenant_rule_set ?? false)
      );
      if (input.name) {
        query.set("name", input.name);
      }
      if (typeof input.is_valid === "boolean") {
        query.set("is_valid", String(input.is_valid));
      }
      if (input.type) {
        query.set("type", input.type);
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/query?${query.toString()}`
      )) as {
        data?: PipelineStrategySummary[];
        total?: number;
      });

      return {
        data: response.data ?? [],
        total: response.total
      };
    },
    async getProjectStrategy(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/${encodeURIComponent(input.rule_set_id)}/gray/detail`
      )) as PipelineStrategy);

      return response;
    },
    async getProjectStrategyRelatedInfo(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/${encodeURIComponent(input.rule_set_id)}/related/query`
      )) as PipelineStrategyRelatedInfo);

      return {
        project_count: response.project_count,
        pipeline_count: response.pipeline_count
      };
    },
    async inheritProjectStrategy(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/inherit`,
        {
          name: input.name,
          parent_id: input.parent_id,
          cloud_project_id: input.project_id,
          ...(input.rules ? { rules: input.rules } : {}),
          is_valid: input.is_valid
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id
      };
    },
    async switchProjectStrategy(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/${encodeURIComponent(input.rule_set_id)}/switch`,
        {
          is_valid: input.is_valid
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id ?? input.rule_set_id
      };
    },
    async deleteProjectStrategy(input) {
      const response = unwrapPipelinePayload((await _http.delete(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/${encodeURIComponent(input.rule_set_id)}/delete`
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id ?? input.rule_set_id
      };
    },
    async getProjectStrategyDetail(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/${encodeURIComponent(input.rule_set_id)}/detail`
      )) as PipelineStrategySummary);

      return response;
    },
    async updateProjectStrategy(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/${encodeURIComponent(input.rule_set_id)}/update`,
        {
          name: input.name,
          rules: input.rules
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id ?? input.rule_set_id
      };
    },
    async createProjectStrategy(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/rule-sets/create`,
        {
          name: input.name,
          cloud_project_id: input.project_id,
          rules: input.rules
        }
      )) as PipelineStrategyMutationResult);

      return {
        status: response.status ?? true,
        rule_set_id: response.rule_set_id
      };
    },
    async listPublishers(input) {
      const query = new URLSearchParams({
        offset: String(input.offset),
        limit: String(input.limit)
      });
      const response = unwrapPipelinePayload((await _http.get(
        `/v1/${encodeURIComponent(input.domain_id)}/publisher/query-all?${query.toString()}`
      )) as {
        data?: PipelinePluginPublisher[];
        total?: number;
      });

      const items = response.data ?? [];

      return {
        items,
        total: response.total ?? items.length
      };
    },
    async listAvailablePublishers(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v1/${encodeURIComponent(input.domain_id)}/publisher/optional-publisher`
      )) as {
        data?: PipelinePluginPublisher[];
      });

      return {
        items: response.data ?? []
      };
    },
    async uploadPublisherIcon(input) {
      const query = new URLSearchParams({
        publisher_en_name: input.publisher_en_name
      });
      const form = new FormData();
      form.append(
        "upload_file",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );

      const response = unwrapPipelinePayload(
        (await _http.postMultipart(
          `/v1/${encodeURIComponent(input.domain_id)}/common/upload-publisher-icon?${query.toString()}`,
          form
        )) as unknown
      );

      return {
        url: typeof response === "string" ? response : undefined,
        raw: response
      };
    },
    async listStagePlugins(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v1/${encodeURIComponent(input.domain_id)}/relation/stage-plugins`,
        {
          use_condition: input.use_condition,
          ...(input.business_type ? { business_type: input.business_type } : {}),
          ...(input.deploy_type ? { deploy_type: input.deploy_type } : {}),
          ...(input.comp_extend_type ? { comp_extend_type: input.comp_extend_type } : {})
        }
      )) as {
        full_stage_plugins_item_list?: PipelineStagePlugin[];
      });

      return {
        items: response.full_stage_plugins_item_list ?? []
      };
    },
    async listBasePlugins(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v1/${encodeURIComponent(input.domain_id)}/relation/plugin/single`
      )) as {
        data?: PipelineBasePlugin[];
      });

      return {
        items: response.data ?? []
      };
    },
    async listBasePluginsPaged(input) {
      const query = new URLSearchParams({
        offset: String(input.offset),
        limit: String(input.limit)
      });
      const response = unwrapPipelinePayload((await _http.post(
        `/v1/${encodeURIComponent(input.domain_id)}/relation/plugins?${query.toString()}`,
        {}
      )) as {
        data?: PipelineBasePlugin[];
        total?: number;
      });
      const items = response.data ?? [];

      return {
        items,
        total: response.total ?? items.length
      };
    },
    async listPlugins(input) {
      const query = new URLSearchParams({
        offset: String(input.offset),
        limit: String(input.limit)
      });
      const response = unwrapPipelinePayload((await _http.post(
        `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/query-all?${query.toString()}`,
        {
          ...(input.plugin_attribution
            ? { plugin_attribution: input.plugin_attribution }
            : {}),
          ...(input.business_type ? { business_type: input.business_type } : {}),
          ...(input.maintainer ? { maintainer: input.maintainer } : {}),
          ...(input.plugin_name ? { plugin_name: input.plugin_name } : {})
        }
      )) as {
        data?: PipelinePlugin[];
        total?: number;
      });
      const items = response.data ?? [];

      return {
        items,
        total: response.total ?? items.length
      };
    },
    async getPluginInputs(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/plugin-input`,
        {
          plugin_name: input.plugin_name,
          display_name: input.display_name,
          version: input.version,
          plugin_attribution: input.plugin_attribution
        }
      )) as {
        data?: PipelinePluginPart[];
      });

      return {
        items: response.data ?? []
      };
    },
    async getPluginOutputs(input) {
      const response = unwrapPipelinePayload((await _http.post(
        `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/plugin-output`,
        {
          plugin_name: input.plugin_name,
          display_name: input.display_name,
          version: input.version,
          plugin_attribution: input.plugin_attribution
        }
      )) as {
        data?: PipelinePluginPart[];
      });

      return {
        items: response.data ?? []
      };
    },
    async listPluginVersions(input) {
      const query = new URLSearchParams({
        plugin_name: input.plugin_name,
        offset: String(input.offset),
        limit: String(input.limit)
      });
      const response = unwrapPipelinePayload((await _http.get(
        `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/query?${query.toString()}`
      )) as {
        data?: PipelinePluginVersion[];
        total?: number;
      });
      const items = response.data ?? [];

      return {
        items,
        total: response.total ?? items.length
      };
    },
    async getPluginVersion(input) {
      const query = new URLSearchParams({
        plugin_name: input.plugin_name,
        version: input.version
      });
      const response: PipelinePluginVersion | { data?: PipelinePluginVersion } = unwrapPipelinePayload((await _http.get(
        `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/detail?${query.toString()}`
      )) as PipelinePluginVersion | { data?: PipelinePluginVersion });
      const item: PipelinePluginVersion =
        response && typeof response === "object" && "data" in response
          ? (response.data ?? response) as PipelinePluginVersion
          : response;

      return {
        item
      };
    },
    async listExtensionModules(input) {
      const query = new URLSearchParams();

      for (const location of input.locations) {
        query.append("locations", location);
      }
      if (input.project_id) {
        query.set("project_uuid", input.project_id);
      }
      if (input.region_name) {
        query.set("region_name", input.region_name);
      }
      if (input.name) {
        query.set("name", input.name);
      }
      if (input.product_line) {
        query.set("productLine", input.product_line);
      }
      for (const tag of input.tags ?? []) {
        query.append("tags", tag);
      }
      if (typeof input.offset === "number") {
        query.set("offset", String(input.offset));
      }
      if (typeof input.limit === "number") {
        query.set("limit", String(input.limit));
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v2/extensions/modules?${query.toString()}`
      )) as
        | PipelineExtensionModule[]
        | {
            result?: PipelineExtensionModule[] | Record<string, PipelineExtensionModuleList | undefined>;
          }
        | Record<string, PipelineExtensionModuleList | undefined>);
      return extractExtensionModules(response);
    },
    async getExtensionModule(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v1/extensions/modules/${encodeURIComponent(input.module_id)}`
      )) as
        | PipelineExtensionModule[]
        | {
            result?: PipelineExtensionModule | PipelineExtensionModule[];
          });

      if (Array.isArray(response)) {
        return {
          modules: response.map((item) => normalizeExtensionModule(item))
        };
      }

      const payload = Array.isArray(response.result)
        ? response.result
        : response.result
          ? [response.result]
          : [];

      return {
        modules: payload.map((item) => normalizeExtensionModule(item))
      };
    },
    async listExtensionEndpoints(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_id,
        region_name: input.region_name
      });

      if (input.module_id) {
        query.set("module_id", input.module_id);
      }
      if (typeof input.offset === "number") {
        query.set("offset", String(input.offset));
      }
      if (typeof input.limit === "number") {
        query.set("limit", String(input.limit));
      }

      const response = unwrapPipelinePayload((await _http.get(
        `/v1/serviceconnection/endpoints?${query.toString()}`
      )) as {
        result?: {
          endpoints?: PipelineExtensionEndpoint[];
          total?: number;
        };
      });

      return {
        endpoints: (response.result?.endpoints ?? []).map((endpoint) =>
          normalizeExtensionEndpoint(endpoint, input.project_id)
        ),
        total: response.result?.total ?? response.result?.endpoints?.length ?? 0
      };
    },
    async createExtensionEndpoint(input) {
      const response = unwrapPipelinePayload((await _http.post(
        "/v1/serviceconnection/endpoints",
        {
          ...(input.project_id ? { project_uuid: input.project_id } : {}),
          ...(input.region_name ? { region_name: input.region_name } : {}),
          ...(input.module_id ? { module_id: input.module_id } : {}),
          ...(input.name ? { name: input.name } : {}),
          ...(input.url ? { url: input.url } : {}),
          ...(input.authorization ? { authorization: input.authorization } : {}),
          ...(input.data ? { data: input.data } : {})
        }
      )) as {
        result?: PipelineExtensionEndpoint;
      });

      return normalizeExtensionEndpoint(response.result ?? {}, input.project_id);
    },
    async updateExtensionEndpoint(input) {
      const response = unwrapPipelinePayload((await _http.put(
        `/v1/serviceconnection/endpoints/${encodeURIComponent(input.uuid)}`,
        {
          ...(input.project_id ? { project_uuid: input.project_id } : {}),
          ...(input.region_name ? { region_name: input.region_name } : {}),
          ...(input.module_id ? { module_id: input.module_id } : {}),
          ...(input.name ? { name: input.name } : {}),
          ...(input.url ? { url: input.url } : {}),
          ...(input.authorization ? { authorization: input.authorization } : {}),
          ...(input.data ? { data: input.data } : {})
        }
      )) as {
        result?: PipelineExtensionEndpoint;
      });

      return normalizeExtensionEndpoint(
        response.result ?? {
          uuid: input.uuid
        },
        input.project_id
      );
    },
    async getExtensionEndpoint(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v1/serviceconnection/endpoints/${encodeURIComponent(input.uuid)}`
      )) as {
        result?: PipelineExtensionEndpoint;
      });

      return normalizeExtensionEndpoint(
        response.result ?? {
          uuid: input.uuid
        }
      );
    },
    async deleteExtensionEndpoint(input) {
      const query = new URLSearchParams();

      if (input.project_id) {
        query.set("project_uuid", input.project_id);
      }

      const response = unwrapPipelinePayload((await _http.delete(
        `/v1/serviceconnection/endpoints/${encodeURIComponent(input.uuid)}${query.size > 0 ? `?${query.toString()}` : ""}`
      )) as {
        status?: string;
      });

      return {
        uuid: input.uuid,
        success: response.status ? response.status === "success" : true
      };
    },
    async listRuleTypes(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v2/${encodeURIComponent(input.organization_id)}/types/query`
      )) as
        | PipelineRuleType
        | PipelineRuleType[]
        | {
            data?: PipelineRuleType[];
            result?: PipelineRuleType | PipelineRuleType[];
          });

      return {
        items: normalizeRuleTypes(response)
      };
    },
    async listTemplates(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.tenant_id)}/api/pipeline-templates/list`,
        {
          offset,
          limit: input.page_size,
          name: input.keyword,
          language: input.language,
          is_system: input.is_system
        }
      )) as {
        templates?: Array<{
          id?: string;
          name?: string;
          icon?: string;
          manifest_version?: string;
          language?: string;
          description?: string;
          is_system?: boolean;
          region?: string;
        }>;
        total?: number;
      };

      return {
        templates: response.templates ?? [],
        total: response.total
      };
    },
    async getTemplate(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.tenant_id)}/api/pipeline-templates/${encodeURIComponent(input.template_id)}`
      ));
      const payload = getPipelinePayload(response);

      return {
        id: typeof payload.id === "string" ? payload.id : input.template_id,
        name: typeof payload.name === "string" ? payload.name : undefined,
        icon: typeof payload.icon === "string" ? payload.icon : undefined,
        manifest_version: typeof payload.manifest_version === "string" ? payload.manifest_version : undefined,
        language: typeof payload.language === "string" ? payload.language : undefined,
        description: typeof payload.description === "string" ? payload.description : undefined,
        is_system: typeof payload.is_system === "boolean" ? payload.is_system : undefined,
        region: typeof payload.region === "string" ? payload.region : undefined,
        template: payload
      };
    },
    async getPipeline(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}`
      )) as {
        id?: string;
        pipeline_id?: string;
        name?: string;
        description?: string;
        manifest_version?: string;
        creator_name?: string;
        is_publish?: boolean;
        project_id?: string;
        project_name?: string;
        detail_url?: string;
        modify_url?: string;
      });

      return {
        id: response.id ?? response.pipeline_id ?? input.pipeline_id,
        name: response.name ?? "",
        description: response.description,
        manifest_version: response.manifest_version,
        creator_name: response.creator_name,
        is_publish: response.is_publish,
        project_id: response.project_id,
        project_name: response.project_name,
        detail_url: response.detail_url,
        modify_url: response.modify_url
      };
    },
    async listPipelines(input) {
      const cacheKey = buildListCacheKey(input);
      listCacheKeys.add(cacheKey);
      const cached = await listCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const response = unwrapPipelinePayload((await _http.post(
          `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/list`,
          {
            offset,
            limit: input.page_size,
            name: input.keyword
          }
        )) as {
          pipelines?: Array<{
            pipeline_id: string;
            name: string;
            creator_name?: string;
            project_id?: string;
            project_name?: string;
            manifest_version?: string;
            latest_run?: {
              pipeline_run_id?: string;
              status?: string;
              run_number?: number;
              trigger_type?: string;
            };
          }>;
          records?: Array<{
            pipeline_id: string;
            name: string;
            creator_name?: string;
            project_id?: string;
            project_name?: string;
            manifest_version?: string;
            latest_run?: {
              pipeline_run_id?: string;
              status?: string;
              run_number?: number;
              trigger_type?: string;
            };
          }>;
          total?: number;
        });
        const records = (response.records ?? response.pipelines ?? []).filter(
          (item) => !item.project_id || item.project_id === input.project_id
        );
        const filtered = records.length !== (response.records ?? response.pipelines ?? []).length;

        return {
          records,
          total: filtered ? records.length : response.total
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("pipeline_list_pipelines");
      }

      return cached.value;
    },
    async listRuns(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/list`,
        {
          offset,
          limit: input.page_size
        }
      )) as {
        records?: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
        pipeline_runs?: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
        total?: number;
        total_count?: number;
      };

      return {
        records: response.records ?? response.pipeline_runs ?? [],
        total: response.total ?? response.total_count
      };
    },
    async getRun(input) {
      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/detail?pipeline_run_id=${encodeURIComponent(input.run_id)}`
      )) as {
        id?: string;
        pipeline_run_id?: string;
        status?: string;
        executor_name?: string;
        trigger_type?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id ?? response.id ?? input.run_id,
        status: response.status,
        executor_name: response.executor_name,
        trigger_type: response.trigger_type
      };
    },
    async batchGetPipelineStatus(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/status`,
        {
          ...(input.body ?? {}),
          ...(input.pipeline_ids ? { pipeline_ids: input.pipeline_ids } : {})
        }
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async getNoticeMessages(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipeline-notices/${encodeURIComponent(input.pipeline_id)}/notice/message`
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async checkProject(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/check-project/${encodeURIComponent(input.type)}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async checkComponent(input) {
      const suffix = buildQuery({
        ...(input.query ?? {}),
        ...(input.component_id ? { component_id: input.component_id } : {}),
        ...(input.component_name ? { component_name: input.component_name } : {})
      });
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/component/check${suffix}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async listExecutionPlans(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/execution-plan/list`
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async listReusableJobs(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/reusable-jobs/list`,
        buildPagedBody(input)
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async listDashboardPipelineCounts(input) {
      const suffix = buildQuery({
        ...(input.query ?? {}),
        ...(input.start_time ? { start_time: input.start_time } : {}),
        ...(input.end_time ? { end_time: input.end_time } : {})
      });
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.tenant_id)}/api/dashboard/pipeline-count${suffix}`
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async getDashboardExecutionsOverview(input) {
      const suffix = buildQuery({
        ...(input.query ?? {}),
        ...(input.start_time ? { start_time: input.start_time } : {}),
        ...(input.end_time ? { end_time: input.end_time } : {})
      });
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.tenant_id)}/api/dashboard/executions-overview${suffix}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async getDashboardConcurrency(input) {
      const suffix = buildQuery({
        ...(input.query ?? {}),
        ...(input.start_time ? { start_time: input.start_time } : {}),
        ...(input.end_time ? { end_time: input.end_time } : {})
      });
      const response = unwrapPipelinePayload(await _http.get(
        `/v5/${encodeURIComponent(input.tenant_id)}/api/dashboard/concurrency${suffix}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async listChangeRequests(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v2/${encodeURIComponent(input.cloud_project_id)}/change-requests/search`,
        buildPagedBody(input)
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async getChangeRequest(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v2/${encodeURIComponent(input.cloud_project_id)}/change-request/${encodeURIComponent(input.change_request_id)}/query`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async listComponents(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v2/${encodeURIComponent(input.cloud_project_id)}/component/list/query`,
        buildPagedBody(input)
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async getComponent(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v2/${encodeURIComponent(input.cloud_project_id)}/component/${encodeURIComponent(input.component_id)}/query`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async listPacActions(input) {
      const response = unwrapPipelinePayload(await _http.post(
        `/v6/${encodeURIComponent(input.domain_id)}/api/pac/pipelines/actions/list`,
        buildPagedBody(input)
      ));

      return mapPipelineRawListResult(getPipelinePayload(response));
    },
    async getPacAction(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v6/${encodeURIComponent(input.domain_id)}/api/pac/pipelines/actions/${encodeURIComponent(input.pipeline_id)}/${encodeURIComponent(input.pipeline_run_id)}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async getOauthAuthorizationUrl(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v1/serviceconnection/oauth/authorization_url${buildQuery(input.query)}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    },
    async getDevucAuth(input) {
      const response = unwrapPipelinePayload(await _http.get(
        `/v2/${encodeURIComponent(input.cloud_project_id)}/cicd/devuc-auth/query${buildQuery(input.query)}`
      ));

      return mapPipelineRawItemResult(getPipelinePayload(response));
    }
  };
}
