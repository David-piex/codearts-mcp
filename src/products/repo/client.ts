import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import { normalizeProviderError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";

type RepoRemoteMirror = {
  id?: number | string;
  repository_id?: number | string;
  update_status?: string;
  last_update_at?: string;
  url?: string;
  last_successful_update_at?: string;
  number_of_failures?: number;
  mirroring_enabled?: boolean;
  is_private?: boolean;
  endpoint_uuid?: string;
  last_error?: string;
  sync_branch_type?: string;
};

type RepoImportRecord = {
  id: number | string;
  state?: string;
  repository?: {
    id?: number | string;
    name?: string;
    ssh_url_to_repo?: string;
    http_url_to_repo?: string;
    web_url?: string;
  };
  origin_full_name?: string;
  source_url?: string;
  source_type?: string;
  created_at?: string;
  finished_at?: string;
  target_project_id?: string;
};

type RepoImpersonationToken = {
  id: number | string;
  name?: string;
  revoked?: boolean;
  created_at?: string;
  scopes?: string[];
  active?: boolean;
  expires_at?: string;
  impersonation?: boolean;
  description?: string | null;
};

export type RepoRepositoryWebhook = {
  id: number | string;
  url?: string;
  name?: string;
  description?: string;
  push_events?: boolean;
  tag_push_events?: boolean;
  merge_requests_events?: boolean;
  issues_events?: boolean;
  note_events?: boolean;
  job_events?: boolean;
  pipeline_events?: boolean;
  wiki_page_events?: boolean;
  enable_ssl_verification?: boolean;
  branch_filter_strategy?: string;
  push_events_branch_regex_filter?: string;
  created_at?: string;
  updated_at?: string;
};

type RepoRepositoryWebhookMutationInput = {
  repository_id: string;
  url?: string;
  name?: string;
  description?: string;
  token?: string;
  token_type?: string;
  push_events?: boolean;
  tag_push_events?: boolean;
  merge_requests_events?: boolean;
  issues_events?: boolean;
  note_events?: boolean;
  job_events?: boolean;
  pipeline_events?: boolean;
  wiki_page_events?: boolean;
  enable_ssl_verification?: boolean;
  branch_filter_strategy?: string;
  push_events_branch_regex_filter?: string;
};

export type RepoRepositoryWebhookLog = {
  id: number | string;
  trigger?: string;
  url?: string;
  request_headers?: Record<string, unknown>;
  request_data?: unknown;
  response_headers?: Record<string, unknown>;
  response_body?: unknown;
  response_status?: string;
  execution_duration?: number;
  created_at?: string;
};

export type RepoRepositoryDeployKey = {
  id: number | string;
  title?: string;
  fingerprint?: string;
  created_at?: string;
};

export type RepoRelatedWorkItem = {
  related_id?: number | string;
  related_url?: string;
  id?: number | string;
  subject?: string;
  title?: string;
  url?: string;
};

export type RepoE2eSetting = {
  e2e_policies?: {
    auto_extract?: boolean;
    prefix_symbol?: string;
    separator?: string;
    suffix_symbol?: string;
  };
  req?: {
    active?: boolean;
    branches?: string;
    branches_type?: string;
    project_type?: string;
    categories?: string;
    category_codes?: string;
    exclude_statuses?: string;
    exclude_status_codes?: string;
  };
  link?: {
    active?: boolean;
    url?: string;
    app_auth_type?: string;
    app_ak?: string;
    app_sk?: string;
    categories?: string;
    exclude_statuses?: string;
  };
};

export type RepoTenantRepository = {
  owner?: string;
  capacity?: number;
  status?: number;
  moderation_result?: number;
  create_time?: string;
  member_number?: number;
  repository_id?: number | string;
  repository_name?: string;
  project_name?: string;
  project_id?: string;
  locked?: boolean;
};

export type RepoTenantDevelopMode = {
  cr_enable?: boolean;
  repo_encryption_enabled?: boolean;
};

export type RepoTenantRepoEncryptionSetting = {
  id?: number | string;
  tenant_id?: string;
  encryption_type?: string;
  default_encryption_enabled?: boolean;
  cmk_key_name?: string;
  cmk_key_id?: string;
  key_state?: number;
  region?: string;
  region_type?: string;
};

export type RepoTenantKmsGrant = {
  tenant_id?: string;
  assumed?: boolean;
};

export type RepoProjectTenantSettings = {
  default_encryption_enabled?: boolean;
  encryption_type?: string;
  permit_public?: string;
};

export type RepoTenantCMK = {
  cmk_key_name?: string;
  cmk_key_id?: string;
  key_state?: number;
};

export type RepoTenantEncryptedRepository = {
  repo_id?: number | string;
  repo_name?: string;
  full_path?: string;
  project_id?: string;
  project_name?: string;
  owner_id?: number | string;
  owner_iam_id?: string | null;
  owner_tenant_name?: string;
  owner_nick_name?: string;
  owner_name?: string;
};

export type RepoTenantTrustedIpAddress = {
  id?: number | string;
  user_id?: number | string;
  domain_id?: string;
  ip_range?: string;
  ip_type?: number;
  ip_start?: string;
  ip_end?: string;
  view_flag?: number;
  download_flag?: number;
  upload_flag?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
  order_flag?: number;
};

type RepoTenantTrustedIpAddressMutationInput = {
  ip_type?: 0 | 1 | 2;
  ip_start?: string;
  ip_end?: string;
  view_flag?: 0 | 1;
  download_flag?: 0 | 1;
  upload_flag?: 0 | 1;
  remark?: string;
};

export type RepoRepositoryFilePushPermissionAction = RepoProtectedTagAction & {
  action?: "push" | string;
};

export type RepoRepositoryFilePushPermission = {
  id: number | string;
  path?: string;
  actions?: RepoRepositoryFilePushPermissionAction[];
};

type RepoRepositoryFilePushPermissionActionInput = {
  action?: "push";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
};

type RepoRepositoryFilePushPermissionMutationInput = {
  id?: string | number;
  path?: string;
  actions?: RepoRepositoryFilePushPermissionActionInput[];
};

export type RepoResourcePermissionInfo = {
  order?: number;
  role_id?: string;
  role_name?: string;
  role_name_cn?: string;
  resource_permissions?: unknown;
};

type RepoResourcePermissionDetailInput = {
  permission_id?: string | number;
  enabled?: boolean;
};

export type RepoResourcePermissionUpdateInput = {
  role_id?: string;
  role_name?: string;
  permissions?: RepoResourcePermissionDetailInput[];
};

export type RepoResourcePermissionUpdateResult = {
  status?: number;
  message?: string;
};

export type RepoRepositoryPermissionInheritSetting = {
  inherit_parent_permission?: boolean;
};

export type RepoWatermarkSetting = {
  watermark?: boolean;
  can_update?: boolean;
  view_watermark?: boolean;
};

export type RepoProjectSubgroupOrRepository = {
  id?: number | string;
  name?: string;
  path?: string;
  project_id?: string;
  project_name?: string;
  full_name?: string;
  full_path?: string;
  descendant_type?: string;
  visibility?: string;
  visibility_level?: number;
  archived?: boolean;
  created_at?: string;
  updated_at_timestamp?: string | number;
  subgroup_count?: number;
  project_count?: number;
  http_url_to_repo?: string;
  ssh_url_to_repo?: string;
};

export type RepoProjectSettingsInheritCfg = {
  name?: string;
  inherit_mod?: string;
};

export type RepoProjectMemberSettingRoleSync = {
  id?: number | string;
  role_id?: string;
  role_sync_enabled?: boolean;
  role_name?: string;
  role_type?: string;
  role_chinese_name?: string;
  created_at?: string;
  updated_at?: string;
};

export type RepoProjectMemberSetting = {
  product_id?: string;
  sync_enabled?: boolean;
  sync_all_role_enabled?: boolean;
  role_sync?: RepoProjectMemberSettingRoleSync[];
};

export type RepoProjectGeneralPolicy = {
  disable_fork?: boolean;
  forbidden_developer_create_branch?: boolean;
  forbidden_developer_create_tag?: boolean;
  forbidden_committer_create_branch?: boolean;
  branch_name_regex?: string;
  tag_name_regex?: string;
  generate_pre_merge_ref?: boolean;
  forbidden_gitlab_access?: boolean;
  rebase_disable_trigger_webhook?: boolean;
  open_gpg_verified?: boolean;
};

type RepoProjectGeneralPolicyUpdateInput = {
  project_id: string;
  disable_fork?: boolean;
  branch_name_regex?: string;
  tag_name_regex?: string;
  generate_pre_merge_ref?: boolean;
};

export type RepoItemCommit = {
  id?: string;
  short_id?: string;
  title?: string;
  message?: string;
  author_name?: string;
  author_email?: string;
  committed_date?: string;
  created_at?: string;
};

export type RepoProtectedTagAction = {
  action?: string;
  enable?: boolean;
  users?: Array<{ id?: number | string; name?: string; username?: string; state?: string }>;
  user_teams?: Array<{ id?: number | string; name?: string }>;
  roles?: Array<{ id?: number | string; name?: string; related_role_id?: string; chinese_name?: string }>;
};

export type RepoProtectedTag = {
  id: number | string;
  project_id?: string;
  source?: string | null;
  updated_at?: string;
  name?: string;
  actions?: RepoProtectedTagAction[];
};

type RepoProtectedTagActionInput = {
  action?: "create";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
};

export type RepoProtectedBranchAction = RepoProtectedTagAction & {
  addition_switchers?: Array<{ name?: string; enable?: boolean }>;
};

export type RepoProtectedBranch = {
  id: number | string;
  name?: string;
  actions?: RepoProtectedBranchAction[];
};

type RepoProtectedBranchActionInput = {
  action: "push" | "merge";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
  addition_switchers?: Array<{ name: "allowed_force_push"; enable: boolean }>;
};

type RepoProjectProtectedTagActionInput = RepoProtectedTagActionInput & {
  action?: "read" | "create-delete" | "create";
  user_names?: string[];
  user_team_names?: string[];
};

type RepoProtectedRefsUserGroup = {
  id: number | string;
  name?: string;
};

export type RepoClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  getBranch: (input: { repository_id: string; branch_name: string }) => Promise<{
    name: string;
    protected?: boolean;
    default?: boolean;
    can_push?: boolean;
    web_url?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
  }>;
  compareRefs: (input: {
    repository_id: string;
    from: string;
    to: string;
    straight?: boolean;
    ignore_whitespace_change?: boolean;
    view?: string;
  }) => Promise<{
    from?: string;
    to?: string;
    compare_type?: string;
    compare_timeout?: boolean;
    compare_same_ref?: boolean;
    commits?: Array<{
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    }>;
    diffs?: Array<{
      old_path?: string;
      new_path?: string;
      diff?: string;
      new_file?: boolean;
      deleted_file?: boolean;
      renamed_file?: boolean;
    }>;
  }>;
  getTag: (input: { repository_id: string; tag_name: string }) => Promise<{
    name: string;
    message?: string;
    target?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
  }>;
  listEvents: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    events: Array<{
      id: string;
      action_name?: string;
      ref_name?: string;
      author_name?: string;
      created_at?: string;
    }>;
    total?: number;
  }>;
  listRepositoryDeployKeys: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    keys: RepoRepositoryDeployKey[];
    total?: number;
  }>;
  listGroupDeployKeys: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    keys: RepoRepositoryDeployKey[];
    total?: number;
  }>;
  listProjectDeployKeys: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    keys: RepoRepositoryDeployKey[];
    total?: number;
  }>;
  listRepositoryFilePushPermissions: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    permissions: RepoRepositoryFilePushPermission[];
    total?: number;
  }>;
  createFilePushPermission: (input: {
    repository_id: string;
    path: string;
    actions?: RepoRepositoryFilePushPermissionActionInput[];
  }) => Promise<RepoRepositoryFilePushPermission>;
  batchUpdateRepositoryFilePushPermissions: (input: {
    repository_id: string;
    permissions: RepoRepositoryFilePushPermissionMutationInput[];
  }) => Promise<{
    permissions: RepoRepositoryFilePushPermission[];
    total?: number;
  }>;
  batchDeleteRepositoryFilePushPermissions: (input: {
    repository_id: string;
    ids: Array<string | number>;
  }) => Promise<{
    ids: Array<string | number>;
    deleted: boolean;
  }>;
  showProjectWatermark: (input: {
    project_id: string;
  }) => Promise<RepoWatermarkSetting>;
  updateProjectWatermark: (input: {
    project_id: string;
    watermark: boolean;
  }) => Promise<RepoWatermarkSetting>;
  listProjectSubgroupsAndRepositories: (input: {
    project_id: string;
    page: number;
    page_size: number;
    filter?: string | number;
    order_by?: string;
    sort?: string;
    archived?: boolean;
  }) => Promise<{
    items: RepoProjectSubgroupOrRepository[];
    total?: number;
  }>;
  listRepositoryResourcePermissions: (input: {
    repository_id: string;
    resource_name: string;
    page: number;
    page_size: number;
  }) => Promise<{
    permissions: RepoResourcePermissionInfo[];
    total?: number;
  }>;
  updateRepositoryResourcePermissions: (input: {
    repository_id: string;
    resource_name: string;
    data: RepoResourcePermissionUpdateInput[];
  }) => Promise<RepoResourcePermissionUpdateResult>;
  updateGroupResourcePermissions: (input: {
    group_id: string;
    resource_id: string;
    data: RepoResourcePermissionUpdateInput[];
  }) => Promise<RepoResourcePermissionUpdateResult>;
  showResourcePermissions: (input: {
    group_id: string;
    resource_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    permissions: RepoResourcePermissionInfo[];
    total?: number;
  }>;
  updateRepositoryPermissionInheritEnabled: (input: {
    repository_id: string;
    inherit_parent_permission: boolean;
  }) => Promise<RepoRepositoryPermissionInheritSetting>;
  showRepositoryPermissionInheritEnabled: (input: {
    repository_id: string;
  }) => Promise<RepoRepositoryPermissionInheritSetting>;
  showProjectSettingsInheritCfg: (input: {
    project_id: string;
  }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
  updateProjectSettingsInheritCfg: (input: {
    project_id: string;
    data: RepoProjectSettingsInheritCfg[];
  }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
  showProjectMemberSetting: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<RepoProjectMemberSetting>;
  showProjectGeneralPolicy: (input: {
    project_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
  showProjectsGeneralPolicy: (input: {
    project_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
  updateProjectGeneralPolicy: (input: RepoProjectGeneralPolicyUpdateInput) => Promise<RepoProjectGeneralPolicy>;
  listItemCommits: (input: {
    project_id: string;
    item_id: string;
    page: number;
    page_size: number;
    type?: "commit" | "branch" | "mergerequest";
  }) => Promise<{
    commits: RepoItemCommit[];
    total?: number;
  }>;
  checkRepositoryDeployKey: (input: {
    repository_id: string;
    key: string;
  }) => Promise<{
    exists: boolean;
  }>;
  checkGroupDeployKey: (input: {
    group_id: string;
    key: string;
  }) => Promise<{
    exists: boolean;
  }>;
  removeRepositoryDeployKey: (input: {
    repository_id: string;
    key_id: string;
  }) => Promise<{
    key_id: string;
    removed: boolean;
  }>;
  listBranchRelatedWorkItems: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<{
    work_items: RepoRelatedWorkItem[];
    total?: number;
  }>;
  listRepositoryWorkItems: (input: {
    repository_id: string;
    project_id: string;
    is_ipd: boolean;
    page: number;
    page_size: number;
    subject?: string;
  }) => Promise<{
    work_items: RepoRelatedWorkItem[];
    total?: number;
  }>;
  showRepositoryE2eSetting: (input: {
    repository_id: string;
    take_effect?: boolean;
  }) => Promise<RepoE2eSetting>;
  showGroupE2eSetting: (input: {
    group_id: string;
  }) => Promise<RepoE2eSetting>;
  showProjectE2eSetting: (input: {
    project_id: string;
  }) => Promise<RepoE2eSetting>;
  listRepositoryWebhooks: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    include_system?: boolean;
  }) => Promise<{
    hooks: RepoRepositoryWebhook[];
    total?: number;
  }>;
  createRepositoryWebhook: (input: RepoRepositoryWebhookMutationInput & {
    url: string;
  }) => Promise<RepoRepositoryWebhook>;
  getRepositoryWebhook: (input: {
    repository_id: string;
    hook_id: string;
  }) => Promise<RepoRepositoryWebhook>;
  updateRepositoryWebhook: (input: RepoRepositoryWebhookMutationInput & {
    hook_id: string;
  }) => Promise<RepoRepositoryWebhook>;
  deleteRepositoryWebhook: (input: {
    repository_id: string;
    hook_id: string;
  }) => Promise<{
    hook_id: string;
    deleted: boolean;
  }>;
  listRepositoryWebhookLogs: (input: {
    repository_id: string;
    hook_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    logs: RepoRepositoryWebhookLog[];
    total?: number;
  }>;
  getRepositoryWebhookLog: (input: {
    repository_id: string;
    hook_id: string;
    log_id: string;
  }) => Promise<RepoRepositoryWebhookLog>;
  listTags: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tags: Array<{
      name: string;
      is_double_name?: boolean;
    }>;
    total?: number;
  }>;
  deleteTag: (input: {
    repository_id: string;
    tag_name: string;
  }) => Promise<{
    tag_name: string;
    deleted: boolean;
  }>;
  createTag: (input: {
    repository_id: string;
    tag_name: string;
    ref: string;
    message?: string;
  }) => Promise<{
    tag_name: string;
    ref?: string;
    message?: string;
  }>;
  createRepository: (input: {
    project_uuid: string;
    name: string;
    import_members?: number;
    template_id?: string;
    visibility_level?: number;
    import_url?: string;
    description?: string;
    gitignore_id?: string;
    license_id?: number;
    enable_readme?: boolean | number;
    caller?: string;
  }) => Promise<{
    repository_uuid: string;
    project_uuid?: string;
  }>;
  listPersonalRepositoryImportRecords: (input: {
    page: number;
    page_size: number;
    state?: string;
    source_type?: string;
    created_after?: string;
    created_before?: string;
    finished_after?: string;
    finished_before?: string;
    search?: string;
    order_by?: string;
    sort?: string;
  }) => Promise<{
    records: RepoImportRecord[];
    total?: number;
  }>;
  importRepository: (input: {
    project_uuid: string;
    import_type: string;
    codecheck: number;
    fetch_refs_type: "all" | "default";
    endpoint_uuid?: string;
    source_repo_id?: string;
    source_url: string;
    source_type: string;
    source_full_name?: string;
    target_repo_name: string;
    visibility_level?: number;
    security_level?: string;
    group_id?: string | number | null;
    mirror_repository: number;
    source_visibility?: string;
  }) => Promise<{
    status?: string;
  }>;
  listImpersonationTokens: (input: {
    page: number;
    page_size: number;
    state?: string;
    search?: string;
  }) => Promise<{
    tokens: RepoImpersonationToken[];
    total?: number;
  }>;
  associateRemoteMirror: (input: {
    repository_id: string;
    url: string;
  }) => Promise<RepoRemoteMirror>;
  startRemoteMirrorSynchronization: (input: {
    repository_id: string;
    username?: string;
    password?: string;
    endpoint_uuid?: string;
    force_fetch?: boolean;
  }) => Promise<{
    jid: string;
  }>;
  getRemoteMirror: (input: {
    repository_id: string;
  }) => Promise<RepoRemoteMirror>;
  updateRemoteMirror: (input: {
    repository_id: string;
    url?: string;
    sync_branch_type?: "all" | "default";
    mirroring_enabled?: boolean;
    endpoint_uuid?: string;
  }) => Promise<RepoRemoteMirror>;
  listRepositoryLabels: (input: {
    repository_id: string;
  }) => Promise<{
    labels: Array<{
      id: number | string;
      name?: string;
      color?: string;
      description?: string;
      text_color?: string;
      is_expired?: boolean;
      open_merge_requests_count?: number;
      priority?: number;
      is_repository_label?: boolean;
    }>;
    total?: number;
  }>;
  listProtectedBranches: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
  listProjectProtectedBranches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    search?: string;
    user_actions?: boolean;
    view?: "simple";
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
  createProjectProtectedBranches: (input: {
    project_id: string;
    name: string;
    actions?: RepoProtectedBranchActionInput[];
  }) => Promise<RepoProtectedBranch>;
  listGroupProtectedBranches: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
    user_actions?: boolean;
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
  getProtectedBranch: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<RepoProtectedBranch>;
  batchCreateProtectedBranches: (input: {
    repository_id: string;
    names: string[];
    actions?: RepoProtectedBranchActionInput[];
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
  batchUpdateProtectedBranches: (input: {
    repository_id: string;
    names: string[];
    actions: RepoProtectedBranchActionInput[];
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
  bulkDeleteProtectedBranches: (input: {
    repository_id: string;
    names: string[];
  }) => Promise<{
    names: string[];
    deleted: boolean;
  }>;
  updateProtectedBranch: (input: {
    repository_id: string;
    branch_name: string;
    actions: RepoProtectedBranchActionInput[];
  }) => Promise<RepoProtectedBranch>;
  deleteProtectedBranch: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<{
    branch_name: string;
    deleted: boolean;
  }>;
  listProtectedTags: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
  createProjectProtectedTags: (input: {
    project_id: string;
    name: string;
    actions?: RepoProjectProtectedTagActionInput[];
  }) => Promise<RepoProtectedTag>;
  listProjectProtectedTags: (input: {
    project_id: string;
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
  listRepositoryProtectedRefsUserGroups: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: RepoProtectedRefsUserGroup[];
    total?: number;
  }>;
  listGroupProtectedRefsUserGroups: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: RepoProtectedRefsUserGroup[];
    total?: number;
  }>;
  listProjectProtectedRefsUserGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: RepoProtectedRefsUserGroup[];
    total?: number;
  }>;
  getProtectedTag: (input: {
    repository_id: string;
    tag_name: string;
  }) => Promise<RepoProtectedTag>;
  batchCreateProtectedTags: (input: {
    repository_id: string;
    names: string[];
    actions?: RepoProtectedTagActionInput[];
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
  batchUpdateProtectedTags: (input: {
    repository_id: string;
    names: string[];
    actions: RepoProtectedTagActionInput[];
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
  bulkDeleteProtectedTags: (input: {
    repository_id: string;
    names: string[];
  }) => Promise<{
    names: string[];
    deleted: boolean;
  }>;
  updateProtectedTag: (input: {
    repository_id: string;
    tag_name: string;
    actions: RepoProtectedTagActionInput[];
  }) => Promise<RepoProtectedTag>;
  deleteProtectedTag: (input: {
    repository_id: string;
    tag_name: string;
  }) => Promise<{
    tag_name: string;
    deleted: boolean;
  }>;
  listMergeRequestDiscussions: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    discussions: Array<{
      discussion_id: string;
      body?: string;
      created_at?: string;
      author?: { name?: string; nick_name?: string };
    }>;
    total?: number;
  }>;
  listMergeRequestChanges: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    changes: Array<{
      old_path?: string;
      new_path?: string;
      new_file?: boolean;
      deleted_file?: boolean;
      renamed_file?: boolean;
      diff?: string;
    }>;
    total?: number;
  }>;
  createMergeRequestDiscussion: (input: {
    repository_id: string;
    merge_request_iid: string;
    body: string;
  }) => Promise<{
    discussion_id: string;
    body?: string;
    created_at?: string;
    author?: { name?: string; nick_name?: string };
  }>;
  mergeMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    squash?: boolean;
    force_merge?: boolean;
    sha?: string;
    merge_commit_message?: string;
    squash_commit_message?: string;
    should_remove_source_branch?: boolean;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
  closeMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
  createMergeRequest: (input: {
    repository_id: string;
    source_branch: string;
    target_branch: string;
    title: string;
    description?: string;
    target_project_id?: string;
    assignee_id?: string | number;
    reviewer_ids?: Array<string | number>;
    remove_source_branch?: boolean;
    squash?: boolean;
    draft?: boolean;
    labels?: string | string[];
    milestone_id?: string | number;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
  reviewMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    action_type: "approve" | "reject" | "reset";
    approver_comment?: string;
  }) => Promise<{
    reviewers: Array<{
      id: number | string;
      name?: string;
      nick_name?: string;
      state?: string;
      updated_at?: string;
      approver_comment?: string;
    }>;
  }>;
  getMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    created_at?: string;
    updated_at?: string;
    author?: { name?: string; nick_name?: string };
    web_url?: string;
  }>;
  getRepository: (input: { repository_id: string }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    default_branch?: string;
    ssh_url_to_repo?: string;
    http_url_to_repo?: string;
    project_id?: string;
    project_name?: string;
  }>;
  getCommit: (input: { repository_id: string; commit_sha: string }) => Promise<{
    id: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    message?: string;
  }>;
  getFile: (input: { repository_id: string; file_path: string; branch: string }) => Promise<{
    file_path: string;
    branch_name: string;
    content: string;
  }>;
  listCommits: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    ref_name?: string;
    since?: string;
    until?: string;
    order_by_date?: boolean;
    with_stats?: boolean;
  }) => Promise<{
    commits: Array<{ id: string; short_id?: string; title?: string; author_name?: string }>;
    total?: number;
  }>;
  listBranches: (input: { repository_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    branches: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
    total?: number;
  }>;
  listRepositories: (input: { project_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
    total?: number;
  }>;
  listTenantRepositories: (input: {
    repository_name?: string;
    member_number?: number;
    status?: 0 | 3 | 4 | 5 | 7;
    owner?: string;
    created_after?: string;
    created_before?: string;
    sort?: "asc" | "desc";
    sort_field?: "owner" | "capacity" | "status" | "create_time" | "member_number" | "repository_name";
    locked?: boolean;
    offset: number;
    limit: number;
  }) => Promise<{
    repositories: RepoTenantRepository[];
    total?: number;
  }>;
  showTenantDevelopMode: () => Promise<RepoTenantDevelopMode>;
  showTenantRepoEncryptionSetting: (input: {
    tenant_id: string;
  }) => Promise<RepoTenantRepoEncryptionSetting>;
  listTenantCMKs: (input: {
    tenant_id: string;
    offset: number;
    limit: number;
  }) => Promise<{
    cmks: RepoTenantCMK[];
    total?: number;
  }>;
  listTenantEncryptedRepositories: (input: {
    tenant_id: string;
    offset: number;
    limit: number;
  }) => Promise<{
    repositories: RepoTenantEncryptedRepository[];
    total?: number;
  }>;
  showTenantKMSGrant: (input: {
    tenant_id: string;
  }) => Promise<RepoTenantKmsGrant>;
  showProjectTenantSettings: (input: {
    project_id?: string;
  }) => Promise<RepoProjectTenantSettings>;
  listTenantTrustedIpAddresses: (input: {
    offset: number;
    limit: number;
  }) => Promise<{
    ip_addresses: RepoTenantTrustedIpAddress[];
    total?: number;
  }>;
  exportTenantRepositories: (input: {
    repository_ids?: Array<string | number>;
  }) => Promise<{
    status?: string;
  }>;
  updateTenantRepoEncryptionSetting: (input: {
    tenant_id: string;
    encryption_type?: string;
    default_encryption_enabled?: boolean;
    cmk_key_name?: string;
    cmk_key_id?: string;
  }) => Promise<RepoTenantRepoEncryptionSetting>;
  createTenantKMSGrant: (input: {
    tenant_id: string;
    key?: string | null;
    title?: string | number;
  }) => Promise<RepoTenantKmsGrant>;
  addTenantTrustedIpAddress: (input: RepoTenantTrustedIpAddressMutationInput) => Promise<RepoTenantTrustedIpAddress>;
  updateTenantTrustedIpAddress: (input: RepoTenantTrustedIpAddressMutationInput & { ip_id: string }) => Promise<RepoTenantTrustedIpAddress>;
  deleteTenantTrustedIpAddress: (input: {
    ip_id: string;
  }) => Promise<{
    status?: string;
  }>;
  listMergeRequests: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    state?: string;
  }) => Promise<{
    merge_requests: Array<{
      id: number | string;
      iid?: number;
      title?: string;
      state?: string;
      source_branch?: string;
      target_branch?: string;
      created_at?: string;
      updated_at?: string;
      author?: { name?: string; nick_name?: string };
      web_url?: string;
    }>;
    total?: number;
  }>;
};

function unwrapRepoPayload<T>(input: T): T {
  if (typeof input === "string") {
    const trimmed = input.trim();

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return unwrapRepoPayload(JSON.parse(trimmed)) as T;
      } catch {
        return input;
      }
    }
  }

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

  if (
    input &&
    typeof input === "object" &&
    "error" in input &&
    (input as { error?: unknown }).error &&
    typeof (input as { error?: unknown }).error === "object"
  ) {
    const error = (input as { error: { code?: unknown; message?: unknown; reason?: unknown } }).error;
    const message =
      typeof error.message === "string"
        ? error.message
        : typeof error.reason === "string"
          ? error.reason
          : undefined;
    const code = typeof error.code === "string" ? error.code : undefined;

    if (message || code) {
      throw normalizeProviderError({
        status: 400,
        message: message ?? "Provider request failed",
        code
      });
    }
  }

  return input;
}

function omitUndefinedFields(
  input: Record<string, unknown>
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );
}

function normalizeRepositoryImportUrl(importUrl: string | undefined) {
  if (!importUrl) {
    return undefined;
  }

  try {
    const parsed = new URL(importUrl);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return Buffer.from(importUrl, "utf8").toString("base64");
    }
  } catch {
    return importUrl;
  }

  return importUrl;
}

function appendOptionalQuery(
  query: URLSearchParams,
  input: Record<string, unknown>,
  keys: string[]
) {
  for (const key of keys) {
    const value = input[key];

    if (value !== undefined) {
      query.set(key, String(value));
    }
  }
}

function buildRepositoryWebhookPayload(input: RepoRepositoryWebhookMutationInput) {
  return omitUndefinedFields({
    url: input.url,
    name: input.name,
    description: input.description,
    token: input.token,
    token_type: input.token_type,
    push_events: input.push_events,
    tag_push_events: input.tag_push_events,
    merge_requests_events: input.merge_requests_events,
    issues_events: input.issues_events,
    note_events: input.note_events,
    job_events: input.job_events,
    pipeline_events: input.pipeline_events,
    wiki_page_events: input.wiki_page_events,
    enable_ssl_verification: input.enable_ssl_verification,
    branch_filter_strategy: input.branch_filter_strategy,
    push_events_branch_regex_filter: input.push_events_branch_regex_filter
  });
}

function buildProtectedTagPayload(input: {
  names: string[];
  actions?: RepoProtectedTagActionInput[];
}) {
  return omitUndefinedFields({
    names: input.names,
    actions: input.actions?.map((action) => omitUndefinedFields({
      action: action.action,
      enable: action.enable,
      user_ids: action.user_ids,
      user_team_ids: action.user_team_ids,
      related_role_ids: action.related_role_ids
    }))
  });
}

function mapProtectedBranchActions(actions: RepoProtectedBranchActionInput[]) {
  return actions.map((action) => omitUndefinedFields({
    action: action.action,
    enable: action.enable,
    user_ids: action.user_ids,
    user_team_ids: action.user_team_ids,
    related_role_ids: action.related_role_ids,
    addition_switchers: action.addition_switchers
  }));
}

function buildProtectedBranchPayload(input: {
  names: string[];
  actions?: RepoProtectedBranchActionInput[];
}) {
  return omitUndefinedFields({
    names: input.names,
    actions: input.actions ? mapProtectedBranchActions(input.actions) : undefined
  });
}

function buildProjectProtectedBranchPayload(input: {
  name: string;
  actions?: RepoProtectedBranchActionInput[];
}) {
  return omitUndefinedFields({
    name: input.name,
    actions: input.actions ? mapProtectedBranchActions(input.actions) : undefined
  });
}

function mapProjectProtectedTagActions(actions: RepoProjectProtectedTagActionInput[]) {
  return actions.map((action) => omitUndefinedFields({
    action: action.action,
    enable: action.enable,
    user_ids: action.user_ids,
    user_names: action.user_names,
    user_team_ids: action.user_team_ids,
    user_team_names: action.user_team_names,
    related_role_ids: action.related_role_ids
  }));
}

function buildProjectProtectedTagPayload(input: {
  name: string;
  actions?: RepoProjectProtectedTagActionInput[];
}) {
  return omitUndefinedFields({
    name: input.name,
    actions: input.actions ? mapProjectProtectedTagActions(input.actions) : undefined
  });
}

function buildOffsetLimitQuery(input: {
  page: number;
  page_size: number;
  search?: string;
  user_actions?: boolean;
  view?: string;
}) {
  const offset = (input.page - 1) * input.page_size;
  const query = new URLSearchParams({
    offset: String(offset),
    limit: String(input.page_size)
  });
  appendOptionalQuery(query, input, ["search", "user_actions", "view"]);
  return query;
}

function buildTenantOffsetLimitQuery(input: { offset: number; limit: number }) {
  return new URLSearchParams({
    offset: String(input.offset),
    limit: String(input.limit)
  });
}

function extractTenantRepositoriesResponse(
  response:
    | RepoTenantRepository[]
    | {
        repositories?: RepoTenantRepository[];
        total?: number;
        result?: {
          repositories?: RepoTenantRepository[];
          total?: number;
        };
      }
) {
  const payload = unwrapRepoPayload(response);
  const repositories = Array.isArray(payload) ? payload : payload.result?.repositories ?? payload.repositories ?? [];

  return {
    repositories,
    total: Array.isArray(payload) ? payload.length : payload.result?.total ?? payload.total
  };
}

function extractTenantCMKsResponse(
  response:
    | RepoTenantCMK[]
    | {
        cmks?: RepoTenantCMK[];
        total?: number;
        result?: {
          cmks?: RepoTenantCMK[];
          total?: number;
        };
      }
) {
  const payload = unwrapRepoPayload(response);
  const cmks = Array.isArray(payload) ? payload : payload.result?.cmks ?? payload.cmks ?? [];

  return {
    cmks,
    total: Array.isArray(payload) ? payload.length : payload.result?.total ?? payload.total
  };
}

function extractTenantEncryptedRepositoriesResponse(
  response:
    | RepoTenantEncryptedRepository[]
    | {
        repositories?: RepoTenantEncryptedRepository[];
        total?: number;
        result?: {
          repositories?: RepoTenantEncryptedRepository[];
          total?: number;
        };
      }
) {
  const payload = unwrapRepoPayload(response);
  const repositories = Array.isArray(payload) ? payload : payload.result?.repositories ?? payload.repositories ?? [];

  return {
    repositories,
    total: Array.isArray(payload) ? payload.length : payload.result?.total ?? payload.total
  };
}

function extractTenantTrustedIpAddressesResponse(
  response:
    | RepoTenantTrustedIpAddress[]
    | {
        ip_addresses?: RepoTenantTrustedIpAddress[];
        trusted_ip_addresses?: RepoTenantTrustedIpAddress[];
        total?: number;
        result?: {
          ip_addresses?: RepoTenantTrustedIpAddress[];
          trusted_ip_addresses?: RepoTenantTrustedIpAddress[];
          total?: number;
        };
      }
) {
  const payload = unwrapRepoPayload(response);
  const ipAddresses = Array.isArray(payload)
    ? payload
    : payload.result?.ip_addresses ?? payload.result?.trusted_ip_addresses ?? payload.ip_addresses ?? payload.trusted_ip_addresses ?? [];

  return {
    ip_addresses: ipAddresses,
    total: Array.isArray(payload) ? payload.length : payload.result?.total ?? payload.total
  };
}

function extractTenantTrustedIpAddressResponse(
  response: RepoTenantTrustedIpAddress | { result?: RepoTenantTrustedIpAddress }
) {
  const payload = unwrapRepoPayload(response);
  const address = ("result" in payload && payload.result ? payload.result : payload) as RepoTenantTrustedIpAddress;

  return {
    id: address.id,
    user_id: address.user_id,
    domain_id: address.domain_id,
    ip_range: address.ip_range,
    ip_type: address.ip_type,
    ip_start: address.ip_start,
    ip_end: address.ip_end,
    view_flag: address.view_flag,
    download_flag: address.download_flag,
    upload_flag: address.upload_flag,
    remark: address.remark,
    created_at: address.created_at,
    updated_at: address.updated_at,
    order_flag: address.order_flag
  };
}

function extractTenantDevelopMode(response: RepoTenantDevelopMode | { result?: RepoTenantDevelopMode }) {
  const payload = unwrapRepoPayload(response);
  const setting = ("result" in payload && payload.result ? payload.result : payload) as RepoTenantDevelopMode;

  return {
    cr_enable: setting.cr_enable,
    repo_encryption_enabled: setting.repo_encryption_enabled
  };
}

function extractTenantRepoEncryptionSetting(
  response: RepoTenantRepoEncryptionSetting | { result?: RepoTenantRepoEncryptionSetting }
) {
  const payload = unwrapRepoPayload(response);
  const setting = ("result" in payload && payload.result ? payload.result : payload) as RepoTenantRepoEncryptionSetting;

  return {
    id: setting.id,
    tenant_id: setting.tenant_id,
    encryption_type: setting.encryption_type,
    default_encryption_enabled: setting.default_encryption_enabled,
    cmk_key_name: setting.cmk_key_name,
    cmk_key_id: setting.cmk_key_id,
    key_state: setting.key_state,
    region: setting.region,
    region_type: setting.region_type
  };
}

function extractTenantKmsGrant(response: RepoTenantKmsGrant | { result?: RepoTenantKmsGrant }) {
  const payload = unwrapRepoPayload(response);
  const grant = ("result" in payload && payload.result ? payload.result : payload) as RepoTenantKmsGrant;

  return {
    tenant_id: grant.tenant_id,
    assumed: grant.assumed
  };
}

function extractProjectTenantSettings(response: RepoProjectTenantSettings | { result?: RepoProjectTenantSettings }) {
  const payload = unwrapRepoPayload(response);
  const setting = ("result" in payload && payload.result ? payload.result : payload) as RepoProjectTenantSettings;

  return {
    default_encryption_enabled: setting.default_encryption_enabled,
    encryption_type: setting.encryption_type,
    permit_public: setting.permit_public
  };
}

function extractProtectedBranchesResponse(
  response: RepoProtectedBranch[]
    | {
      protected_branches?: RepoProtectedBranch[];
      branches?: RepoProtectedBranch[];
      total?: number;
      result?: {
        protected_branches?: RepoProtectedBranch[];
        branches?: RepoProtectedBranch[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const items = Array.isArray(payload)
    ? payload
    : payload.result?.protected_branches
      ?? payload.result?.branches
      ?? payload.protected_branches
      ?? payload.branches
      ?? [];

  return {
    branches: items.map((item) => ({
      ...item,
      id: item.id ?? "",
      name: item.name,
      actions: item.actions
    })),
    total: Array.isArray(payload) ? items.length : payload.result?.total ?? payload.total ?? items.length
  };
}

function extractProtectedTagsResponse(
  response: RepoProtectedTag[]
    | {
      protected_tags?: RepoProtectedTag[];
      tags?: RepoProtectedTag[];
      total?: number;
      result?: {
        protected_tags?: RepoProtectedTag[];
        tags?: RepoProtectedTag[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const tags = Array.isArray(payload)
    ? payload
    : payload.result?.protected_tags ?? payload.result?.tags ?? payload.protected_tags ?? payload.tags ?? [];

  return {
    tags,
    total: Array.isArray(payload) ? tags.length : payload.result?.total ?? payload.total ?? tags.length
  };
}

function extractProtectedRefsUserGroupsResponse(
  response: RepoProtectedRefsUserGroup[]
    | {
      user_groups?: RepoProtectedRefsUserGroup[];
      groups?: RepoProtectedRefsUserGroup[];
      total?: number;
      result?: {
        user_groups?: RepoProtectedRefsUserGroup[];
        groups?: RepoProtectedRefsUserGroup[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const groups = Array.isArray(payload)
    ? payload
    : payload.result?.user_groups ?? payload.result?.groups ?? payload.user_groups ?? payload.groups ?? [];

  return {
    groups,
    total: Array.isArray(payload) ? groups.length : payload.result?.total ?? payload.total ?? groups.length
  };
}

function mapFilePushPermissionActions(actions: RepoRepositoryFilePushPermissionActionInput[] | undefined) {
  return actions?.map((action) => omitUndefinedFields({
    action: action.action,
    enable: action.enable,
    user_ids: action.user_ids,
    user_team_ids: action.user_team_ids,
    related_role_ids: action.related_role_ids
  }));
}

function buildFilePushPermissionPayload(input: {
  path: string;
  actions?: RepoRepositoryFilePushPermissionActionInput[];
}) {
  return omitUndefinedFields({
    path: input.path,
    actions: mapFilePushPermissionActions(input.actions)
  });
}

function buildFilePushPermissionUpdatePayload(input: {
  permissions: RepoRepositoryFilePushPermissionMutationInput[];
}) {
  return {
    permissions: input.permissions.map((permission) => omitUndefinedFields({
      id: permission.id,
      path: permission.path,
      actions: mapFilePushPermissionActions(permission.actions)
    }))
  };
}

function extractFilePushPermissionsResponse(
  response: RepoRepositoryFilePushPermission[]
    | {
      permissions?: RepoRepositoryFilePushPermission[];
      file_push_permissions?: RepoRepositoryFilePushPermission[];
      total?: number;
      result?: {
        permissions?: RepoRepositoryFilePushPermission[];
        file_push_permissions?: RepoRepositoryFilePushPermission[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const permissions = Array.isArray(payload)
    ? payload
    : payload.result?.permissions
      ?? payload.result?.file_push_permissions
      ?? payload.permissions
      ?? payload.file_push_permissions
      ?? [];

  return {
    permissions,
    total: Array.isArray(payload) ? permissions.length : payload.result?.total ?? payload.total ?? permissions.length
  };
}

function buildResourcePermissionPayload(input: {
  data: RepoResourcePermissionUpdateInput[];
}) {
  return {
    data: input.data.map((item) => omitUndefinedFields({
      role_id: item.role_id,
      role_name: item.role_name,
      permissions: item.permissions?.map((permission) => omitUndefinedFields({
        permission_id: permission.permission_id,
        enabled: permission.enabled
      }))
    }))
  };
}

function extractResourcePermissionsResponse(
  response: RepoResourcePermissionInfo[]
    | {
      permissions?: RepoResourcePermissionInfo[];
      resource_permissions?: RepoResourcePermissionInfo[];
      total?: number;
      result?: {
        permissions?: RepoResourcePermissionInfo[];
        resource_permissions?: RepoResourcePermissionInfo[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const permissions = Array.isArray(payload)
    ? payload
    : payload.result?.permissions
      ?? payload.result?.resource_permissions
      ?? payload.permissions
      ?? payload.resource_permissions
      ?? [];

  return {
    permissions,
    total: Array.isArray(payload) ? permissions.length : payload.result?.total ?? payload.total ?? permissions.length
  };
}

function extractResourcePermissionUpdateResult(response: RepoResourcePermissionUpdateResult) {
  const payload = unwrapRepoPayload(response);

  return {
    status: payload.status,
    message: payload.message
  };
}

function extractRepositoryPermissionInheritSetting(
  response: RepoRepositoryPermissionInheritSetting
) {
  const payload = unwrapRepoPayload(response);

  return {
    inherit_parent_permission: payload.inherit_parent_permission
  };
}

function extractWatermarkSetting(response: RepoWatermarkSetting) {
  const payload = unwrapRepoPayload(response);

  return {
    watermark: payload.watermark,
    can_update: payload.can_update,
    view_watermark: payload.view_watermark
  };
}

function extractProjectSubgroupsAndRepositoriesResponse(
  response: RepoProjectSubgroupOrRepository[]
    | {
      items?: RepoProjectSubgroupOrRepository[];
      subgroups_and_repositories?: RepoProjectSubgroupOrRepository[];
      total?: number;
      result?: {
        items?: RepoProjectSubgroupOrRepository[];
        subgroups_and_repositories?: RepoProjectSubgroupOrRepository[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const items = Array.isArray(payload)
    ? payload
    : payload.result?.items
      ?? payload.result?.subgroups_and_repositories
      ?? payload.items
      ?? payload.subgroups_and_repositories
      ?? [];

  return {
    items,
    total: Array.isArray(payload) ? items.length : payload.result?.total ?? payload.total ?? items.length
  };
}

function extractProjectSettingsInheritCfgResponse(
  response: RepoProjectSettingsInheritCfg[]
    | {
      settings?: RepoProjectSettingsInheritCfg[];
      data?: RepoProjectSettingsInheritCfg[];
      total?: number;
      result?: {
        settings?: RepoProjectSettingsInheritCfg[];
        data?: RepoProjectSettingsInheritCfg[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const settings = Array.isArray(payload)
    ? payload
    : payload.result?.settings
      ?? payload.result?.data
      ?? payload.settings
      ?? payload.data
      ?? [];

  return {
    settings,
    total: Array.isArray(payload) ? settings.length : payload.result?.total ?? payload.total ?? settings.length
  };
}

function extractProjectMemberSetting(response: RepoProjectMemberSetting | { result?: RepoProjectMemberSetting }) {
  const payload = unwrapRepoPayload(response);
  const setting = ("result" in payload && payload.result ? payload.result : payload) as RepoProjectMemberSetting;

  return {
    product_id: setting.product_id,
    sync_enabled: setting.sync_enabled,
    sync_all_role_enabled: setting.sync_all_role_enabled,
    role_sync: setting.role_sync ?? []
  };
}

function extractProjectGeneralPolicy(response: RepoProjectGeneralPolicy | { result?: RepoProjectGeneralPolicy }) {
  const payload = unwrapRepoPayload(response);
  const policy = ("result" in payload && payload.result ? payload.result : payload) as RepoProjectGeneralPolicy;

  return {
    disable_fork: policy.disable_fork,
    forbidden_developer_create_branch: policy.forbidden_developer_create_branch,
    forbidden_developer_create_tag: policy.forbidden_developer_create_tag,
    forbidden_committer_create_branch: policy.forbidden_committer_create_branch,
    branch_name_regex: policy.branch_name_regex,
    tag_name_regex: policy.tag_name_regex,
    generate_pre_merge_ref: policy.generate_pre_merge_ref,
    forbidden_gitlab_access: policy.forbidden_gitlab_access,
    rebase_disable_trigger_webhook: policy.rebase_disable_trigger_webhook,
    open_gpg_verified: policy.open_gpg_verified
  };
}

function extractItemCommitsResponse(
  response: RepoItemCommit[]
    | {
      commits?: RepoItemCommit[];
      total?: number;
      result?: {
        commits?: RepoItemCommit[];
        total?: number;
      } | RepoItemCommit[];
    }
) {
  const payload = unwrapRepoPayload(response);
  const commits = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.result)
      ? payload.result
      : payload.result?.commits ?? payload.commits ?? [];

  return {
    commits,
    total: Array.isArray(payload)
      ? commits.length
      : Array.isArray(payload.result)
        ? payload.result.length
        : payload.result?.total ?? payload.total ?? commits.length
  };
}

function extractDeployKeysResponse(
  response: RepoRepositoryDeployKey[]
    | {
      deploy_keys?: RepoRepositoryDeployKey[];
      keys?: RepoRepositoryDeployKey[];
      total?: number;
      result?: {
        deploy_keys?: RepoRepositoryDeployKey[];
        keys?: RepoRepositoryDeployKey[];
        total?: number;
      } | RepoRepositoryDeployKey[];
    }
) {
  const payload = unwrapRepoPayload(response);
  const keys = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.result)
      ? payload.result
      : payload.result?.deploy_keys ?? payload.result?.keys ?? payload.deploy_keys ?? payload.keys ?? [];

  return {
    keys,
    total: Array.isArray(payload)
      ? keys.length
      : Array.isArray(payload.result)
        ? payload.result.length
        : payload.result?.total ?? payload.total ?? keys.length
  };
}

function extractDeployKeyCheckResponse(response: { exists?: boolean; result?: { exists?: boolean } }) {
  const payload = unwrapRepoPayload(response);

  return {
    exists: Boolean(payload.result?.exists ?? payload.exists)
  };
}

function extractWorkItemsResponse(
  response: RepoRelatedWorkItem[]
    | {
      work_items?: RepoRelatedWorkItem[];
      items?: RepoRelatedWorkItem[];
      total?: number;
      result?: {
        work_items?: RepoRelatedWorkItem[];
        items?: RepoRelatedWorkItem[];
        total?: number;
      } | RepoRelatedWorkItem[];
    }
) {
  const payload = unwrapRepoPayload(response);
  const workItems = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.result)
      ? payload.result
      : payload.result?.work_items ?? payload.result?.items ?? payload.work_items ?? payload.items ?? [];

  return {
    work_items: workItems,
    total: Array.isArray(payload)
      ? workItems.length
      : Array.isArray(payload.result)
        ? payload.result.length
        : payload.result?.total ?? payload.total ?? workItems.length
  };
}

function extractE2eSetting(response: RepoE2eSetting | { result?: RepoE2eSetting }) {
  const payload = unwrapRepoPayload(response);
  const setting = ("result" in payload && payload.result ? payload.result : payload) as RepoE2eSetting;

  return {
    e2e_policies: setting.e2e_policies,
    req: setting.req,
    link: setting.link
  };
}

type RepoClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

export function createRepoClient(
  _http: ReturnTypeCreateHttpClient,
  options: RepoClientOptions = {}
): RepoClient {
  const listCacheTtlMs =
    options.listCacheTtlMs ?? DEFAULT_READ_CACHE_TTLS.repoListRepositoriesMs;
  const now = options.now ?? Date.now;
  const listRepositoriesCache = createReadThroughCache<
    string,
    {
      repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });

  function buildListRepositoriesCacheKey(input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.project_id, input.page, input.page_size, input.keyword ?? ""]);
  }

  return {
    ...createOfficialApiRequester({
      product: "Repo",
      http: _http,
      allowedPrefixes: ["/v1/","/v2/","/v4/"]
    }),
    async getBranch(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/branch?${query.toString()}`
      )) as {
        name?: string;
        protected?: boolean;
        default?: boolean;
        can_push?: boolean;
        web_url?: string;
        commit?: {
          id?: string;
          short_id?: string;
          title?: string;
          author_name?: string;
          created_at?: string;
        };
      };

      return {
        name: response.name ?? input.branch_name,
        protected: response.protected,
        default: response.default,
        can_push: response.can_push,
        web_url: response.web_url,
        commit: response.commit
      };
    },
    async compareRefs(input) {
      const query = new URLSearchParams({
        from: input.from,
        to: input.to
      });

      if (input.straight !== undefined) {
        query.set("straight", String(input.straight));
      }

      if (input.ignore_whitespace_change !== undefined) {
        query.set("ignore_whitespace_change", String(input.ignore_whitespace_change));
      }

      if (input.view) {
        query.set("view", input.view);
      }

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/compare?${query.toString()}`
      )) as {
        from?: string;
        to?: string;
        compare_type?: string;
        compare_timeout?: boolean;
        compare_same_ref?: boolean;
        commits?: Array<{
          id?: string;
          short_id?: string;
          title?: string;
          author_name?: string;
          created_at?: string;
        }>;
        diffs?: Array<{
          old_path?: string;
          new_path?: string;
          diff?: string;
          new_file?: boolean;
          deleted_file?: boolean;
          renamed_file?: boolean;
        }>;
      };

      return {
        from: response.from ?? input.from,
        to: response.to ?? input.to,
        compare_type: response.compare_type,
        compare_timeout: response.compare_timeout,
        compare_same_ref: response.compare_same_ref,
        commits: response.commits ?? [],
        diffs: response.diffs ?? []
      };
    },
    async getTag(input) {
      const query = new URLSearchParams({
        tag_name: input.tag_name
      });
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/tag?${query.toString()}`
      )) as {
        name?: string;
        message?: string;
        target?: string;
        commit?: {
          id?: string;
          short_id?: string;
          title?: string;
          author_name?: string;
          created_at?: string;
        };
      };

      return {
        name: response.name ?? input.tag_name,
        message: response.message,
        target: response.target,
        commit: response.commit
      };
    },
    async listEvents(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/events?${query.toString()}`
      )) as {
        events?: Array<{
          id?: string | number;
          action_name?: string;
          ref_name?: string;
          author_name?: string;
          created_at?: string;
        }>;
        total?: number;
      };

      return {
        events: (response.events ?? []).map((item) => ({
          id: String(item.id ?? ""),
          action_name: item.action_name,
          ref_name: item.ref_name,
          author_name: item.author_name,
          created_at: item.created_at
        })),
        total: response.total
      };
    },
    async listRepositoryDeployKeys(input) {
      const query = buildOffsetLimitQuery(input);

      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/deploy-keys?${query.toString()}`
      )) as Parameters<typeof extractDeployKeysResponse>[0];

      return extractDeployKeysResponse(rawResponse);
    },
    async listGroupDeployKeys(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/deploy-keys?${query.toString()}`
      )) as Parameters<typeof extractDeployKeysResponse>[0];

      return extractDeployKeysResponse(rawResponse);
    },
    async listProjectDeployKeys(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-keys?${query.toString()}`
      )) as Parameters<typeof extractDeployKeysResponse>[0];

      return extractDeployKeysResponse(rawResponse);
    },
    async listRepositoryFilePushPermissions(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/file-push-permissions?${query.toString()}`
      )) as Parameters<typeof extractFilePushPermissionsResponse>[0];

      return extractFilePushPermissionsResponse(rawResponse);
    },
    async createFilePushPermission(input) {
      const rawResponse = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/file-push-permissions`,
        buildFilePushPermissionPayload(input)
      )) as RepoRepositoryFilePushPermission;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.path,
        path: response.path ?? input.path
      };
    },
    async batchUpdateRepositoryFilePushPermissions(input) {
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/file-push-permissions`,
        buildFilePushPermissionUpdatePayload(input)
      )) as Parameters<typeof extractFilePushPermissionsResponse>[0];

      return extractFilePushPermissionsResponse(rawResponse);
    },
    async batchDeleteRepositoryFilePushPermissions(input) {
      await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/file-push-permissions/batch-delete`,
        { ids: input.ids }
      );

      return {
        ids: input.ids,
        deleted: true
      };
    },
    async showProjectWatermark(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/watermark`
      )) as RepoWatermarkSetting;

      return extractWatermarkSetting(rawResponse);
    },
    async updateProjectWatermark(input) {
      const rawResponse = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/watermark`,
        { watermark: input.watermark }
      )) as RepoWatermarkSetting;

      return extractWatermarkSetting(rawResponse);
    },
    async listProjectSubgroupsAndRepositories(input) {
      const query = buildOffsetLimitQuery(input);

      if (input.filter !== undefined) {
        query.set("filter", String(input.filter));
      }
      if (input.order_by) {
        query.set("order_by", input.order_by);
      }
      if (input.sort) {
        query.set("sort", input.sort);
      }
      if (typeof input.archived !== "undefined") {
        query.set("archived", String(input.archived));
      }

      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/subgroups-and-repositories?${query.toString()}`
      )) as Parameters<typeof extractProjectSubgroupsAndRepositoriesResponse>[0];

      return extractProjectSubgroupsAndRepositoriesResponse(rawResponse);
    },
    async listRepositoryResourcePermissions(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/repository/${encodeURIComponent(input.repository_id)}/permissions/${encodeURIComponent(input.resource_name)}?${query.toString()}`
      )) as Parameters<typeof extractResourcePermissionsResponse>[0];

      return extractResourcePermissionsResponse(rawResponse);
    },
    async updateRepositoryResourcePermissions(input) {
      const rawResponse = (await _http.put(
        `/v4/repository/${encodeURIComponent(input.repository_id)}/permissions/${encodeURIComponent(input.resource_name)}`,
        buildResourcePermissionPayload(input)
      )) as RepoResourcePermissionUpdateResult;

      return extractResourcePermissionUpdateResult(rawResponse);
    },
    async updateGroupResourcePermissions(input) {
      const rawResponse = (await _http.put(
        `/v4/groups/${encodeURIComponent(input.group_id)}/permissions/${encodeURIComponent(input.resource_id)}`,
        buildResourcePermissionPayload(input)
      )) as RepoResourcePermissionUpdateResult;

      return extractResourcePermissionUpdateResult(rawResponse);
    },
    async showResourcePermissions(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/permissions-resources/${encodeURIComponent(input.resource_id)}?${query.toString()}`
      )) as Parameters<typeof extractResourcePermissionsResponse>[0];

      return extractResourcePermissionsResponse(rawResponse);
    },
    async updateRepositoryPermissionInheritEnabled(input) {
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/permission-inherit-setting`,
        { inherit_parent_permission: input.inherit_parent_permission }
      )) as RepoRepositoryPermissionInheritSetting;

      return extractRepositoryPermissionInheritSetting(rawResponse);
    },
    async showRepositoryPermissionInheritEnabled(input) {
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/permission-inherit-setting`
      )) as RepoRepositoryPermissionInheritSetting;

      return extractRepositoryPermissionInheritSetting(rawResponse);
    },
    async showProjectSettingsInheritCfg(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/settings-inherit-cfg`
      )) as Parameters<typeof extractProjectSettingsInheritCfgResponse>[0];

      return extractProjectSettingsInheritCfgResponse(rawResponse);
    },
    async updateProjectSettingsInheritCfg(input) {
      const rawResponse = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/settings-inherit-cfg`,
        { data: input.data }
      )) as Parameters<typeof extractProjectSettingsInheritCfgResponse>[0];

      return extractProjectSettingsInheritCfgResponse(rawResponse);
    },
    async showProjectMemberSetting(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/member-setting?${query.toString()}`
      )) as Parameters<typeof extractProjectMemberSetting>[0];

      return extractProjectMemberSetting(rawResponse);
    },
    async showProjectGeneralPolicy(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/policies/general`
      )) as Parameters<typeof extractProjectGeneralPolicy>[0];

      return extractProjectGeneralPolicy(rawResponse);
    },
    async showProjectsGeneralPolicy(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/general-policy`
      )) as Parameters<typeof extractProjectGeneralPolicy>[0];

      return extractProjectGeneralPolicy(rawResponse);
    },
    async updateProjectGeneralPolicy(input) {
      const rawResponse = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/general-policy`,
        omitUndefinedFields({
          disable_fork: input.disable_fork,
          branch_name_regex: input.branch_name_regex,
          tag_name_regex: input.tag_name_regex,
          generate_pre_merge_ref: input.generate_pre_merge_ref
        })
      )) as Parameters<typeof extractProjectGeneralPolicy>[0];

      return extractProjectGeneralPolicy(rawResponse);
    },
    async listItemCommits(input) {
      const query = buildOffsetLimitQuery(input);

      if (input.type) {
        query.set("type", input.type);
      }

      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/items/${encodeURIComponent(input.item_id)}/commits?${query.toString()}`
      )) as Parameters<typeof extractItemCommitsResponse>[0];

      return extractItemCommitsResponse(rawResponse);
    },
    async checkRepositoryDeployKey(input) {
      const rawResponse = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/deploy-keys/check-key`,
        { key: input.key }
      )) as Parameters<typeof extractDeployKeyCheckResponse>[0];

      return extractDeployKeyCheckResponse(rawResponse);
    },
    async checkGroupDeployKey(input) {
      const rawResponse = (await _http.post(
        `/v4/groups/${encodeURIComponent(input.group_id)}/deploy-keys/check-key`,
        { key: input.key }
      )) as Parameters<typeof extractDeployKeyCheckResponse>[0];

      return extractDeployKeyCheckResponse(rawResponse);
    },
    async removeRepositoryDeployKey(input) {
      await _http.delete?.(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/deploy-keys/${encodeURIComponent(input.key_id)}`
      );

      return {
        key_id: input.key_id,
        removed: true
      };
    },
    async listBranchRelatedWorkItems(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/branch/work-items?${query.toString()}`
      )) as Parameters<typeof extractWorkItemsResponse>[0];

      return extractWorkItemsResponse(rawResponse);
    },
    async listRepositoryWorkItems(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("project_id", input.project_id);
      query.set("is_ipd", String(input.is_ipd));

      if (input.subject) {
        query.set("subject", input.subject);
      }

      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/work-items?${query.toString()}`
      )) as Parameters<typeof extractWorkItemsResponse>[0];

      return extractWorkItemsResponse(rawResponse);
    },
    async showRepositoryE2eSetting(input) {
      const query = new URLSearchParams();

      if (typeof input.take_effect !== "undefined") {
        query.set("take_effect", String(input.take_effect));
      }

      const queryString = query.toString();
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/e2e-setting${queryString ? `?${queryString}` : ""}`
      )) as Parameters<typeof extractE2eSetting>[0];

      return extractE2eSetting(rawResponse);
    },
    async showGroupE2eSetting(input) {
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/e2e-setting`
      )) as Parameters<typeof extractE2eSetting>[0];

      return extractE2eSetting(rawResponse);
    },
    async showProjectE2eSetting(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/e2e-setting`
      )) as Parameters<typeof extractE2eSetting>[0];

      return extractE2eSetting(rawResponse);
    },
    async listRepositoryWebhooks(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        per_page: String(input.page_size)
      });
      appendOptionalQuery(query, input, ["include_system"]);

      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks?${query.toString()}`
      )) as
        | RepoRepositoryWebhook[]
        | {
          hooks?: RepoRepositoryWebhook[];
          total?: number;
          result?: {
            hooks?: RepoRepositoryWebhook[];
            total?: number;
          };
        };
      const response = unwrapRepoPayload(rawResponse);
      const hooks = Array.isArray(response) ? response : response.result?.hooks ?? response.hooks ?? [];

      return {
        hooks,
        total: Array.isArray(response) ? hooks.length : response.result?.total ?? response.total ?? hooks.length
      };
    },
    async createRepositoryWebhook(input) {
      const rawResponse = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks`,
        buildRepositoryWebhookPayload(input)
      )) as RepoRepositoryWebhook;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? ""
      };
    },
    async getRepositoryWebhook(input) {
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks/${encodeURIComponent(input.hook_id)}`
      )) as RepoRepositoryWebhook;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.hook_id
      };
    },
    async updateRepositoryWebhook(input) {
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks/${encodeURIComponent(input.hook_id)}`,
        buildRepositoryWebhookPayload(input)
      )) as RepoRepositoryWebhook;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.hook_id
      };
    },
    async deleteRepositoryWebhook(input) {
      await _http.delete?.(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks/${encodeURIComponent(input.hook_id)}`
      );

      return {
        hook_id: input.hook_id,
        deleted: true
      };
    },
    async listRepositoryWebhookLogs(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        per_page: String(input.page_size)
      });

      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks/${encodeURIComponent(input.hook_id)}/logs?${query.toString()}`
      )) as
        | RepoRepositoryWebhookLog[]
        | {
          logs?: RepoRepositoryWebhookLog[];
          total?: number;
          result?: {
            logs?: RepoRepositoryWebhookLog[];
            total?: number;
          };
        };
      const response = unwrapRepoPayload(rawResponse);
      const logs = Array.isArray(response) ? response : response.result?.logs ?? response.logs ?? [];

      return {
        logs,
        total: Array.isArray(response) ? logs.length : response.result?.total ?? response.total ?? logs.length
      };
    },
    async getRepositoryWebhookLog(input) {
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/hooks/${encodeURIComponent(input.hook_id)}/logs/${encodeURIComponent(input.log_id)}`
      )) as RepoRepositoryWebhookLog;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.log_id
      };
    },
    async listTags(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        per_page: String(input.page_size)
      });

      const rawResponse = (await _http.get(
        `/v2/repositories/${encodeURIComponent(input.repository_id)}/tags?${query.toString()}`
      )) as
        | Array<{
          name?: string;
          is_double_name?: boolean;
        }>
        | {
          total?: number;
          tags?: Array<{
            name?: string;
            is_double_name?: boolean;
          }>;
          result?: {
            total?: number;
            tags?: Array<{
              name?: string;
              is_double_name?: boolean;
            }>;
          };
        };
      const response = unwrapRepoPayload(rawResponse);

      const rawTags = Array.isArray(response) ? response : response.result?.tags ?? response.tags ?? [];

      const tags = rawTags.map((item) => ({
        name: item.name ?? "",
        is_double_name: item.is_double_name
      }));

      return {
        tags,
        total: Array.isArray(response) ? tags.length : response.result?.total ?? response.total ?? tags.length
      };
    },
    async deleteTag(input) {
      await _http.delete?.(
        `/v2/repositories/${encodeURIComponent(input.repository_id)}/tags/${encodeURIComponent(input.tag_name)}`
      );

      return {
        tag_name: input.tag_name,
        deleted: true
      };
    },
    async createTag(input) {
      const response = (await _http.post(
        `/v2/repositories/${encodeURIComponent(input.repository_id)}/tags`,
        {
          tag_name: input.tag_name,
          ref: input.ref,
          message: input.message
        }
      )) as {
        tag_name?: string;
        name?: string;
        ref?: string;
        target?: string;
        message?: string;
      };

      return {
        tag_name: response.tag_name ?? response.name ?? input.tag_name,
        ref: response.ref ?? response.target ?? input.ref,
        message: response.message ?? input.message
      };
    },
    async createRepository(input) {
      const normalizedEnableReadme =
        typeof input.enable_readme === "boolean"
          ? input.enable_readme
            ? 1
            : 0
          : input.enable_readme;
      const rawResponse = (await _http.post(
        `/v1/repositories`,
        omitUndefinedFields({
          project_uuid: input.project_uuid,
          name: input.name,
          import_members: input.import_members,
          template_id: input.template_id,
          visibility_level: input.visibility_level,
          import_url: normalizeRepositoryImportUrl(input.import_url),
          description: input.description,
          gitignore_id: input.gitignore_id,
          license_id: input.license_id,
          enable_readme: normalizedEnableReadme,
          caller: input.caller
        })
      )) as
        | {
          repository_uuid?: string;
          project_uuid?: string;
        }
        | {
          result?: {
            repository_uuid?: string;
            project_uuid?: string;
          };
        };
      const response = unwrapRepoPayload(rawResponse);
      let result: {
        repository_uuid?: string;
        project_uuid?: string;
      };

      if ("result" in response && response.result) {
        result = response.result;
      } else {
        result = response as {
          repository_uuid?: string;
          project_uuid?: string;
        };
      }

      if (!result.repository_uuid) {
        throw normalizeProviderError({
          status: 400,
          message: "CreateRepository response did not include repository_uuid"
        });
      }

      return {
        repository_uuid: result.repository_uuid,
        project_uuid: result.project_uuid ?? input.project_uuid
      };
    },
    async listPersonalRepositoryImportRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      appendOptionalQuery(query, input, [
        "state",
        "source_type",
        "created_after",
        "created_before",
        "finished_after",
        "finished_before",
        "search",
        "order_by",
        "sort"
      ]);

      const response = (await _http.get(
        `/v4/user/repository-import-records?${query.toString()}`
      )) as
        | RepoImportRecord[]
        | {
            records?: RepoImportRecord[];
            repository_import_records?: RepoImportRecord[];
            total?: number;
          };

      const records = Array.isArray(response)
        ? response
        : response.repository_import_records ?? response.records ?? [];

      return {
        records,
        total: Array.isArray(response) ? records.length : response.total ?? records.length
      };
    },
    async importRepository(input) {
      const response = (await _http.post(
        `/v1/repo/repository/importRepository`,
        omitUndefinedFields({
          projectId: input.project_uuid,
          importType: input.import_type,
          codecheck: input.codecheck,
          fetchRefsType: input.fetch_refs_type,
          endpointUUId: input.endpoint_uuid ?? "",
          importRepoList: [
            omitUndefinedFields({
              sourceRepoId: input.source_repo_id,
              sourceUrl: normalizeRepositoryImportUrl(input.source_url),
              sourceType: input.source_type,
              sourceFullName: input.source_full_name,
              targetRepoName: input.target_repo_name,
              visibilityLevel: input.visibility_level ?? 0,
              securityLevel: input.security_level ?? "",
              groupId: input.group_id ?? null,
              mirrorRepository: input.mirror_repository,
              sourceVisibility: input.source_visibility
            })
          ]
        })
      )) as {
        status?: string;
      };

      return {
        status: response.status
      };
    },
    async listImpersonationTokens(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      appendOptionalQuery(query, input, ["state", "search"]);

      const response = (await _http.get(
        `/v4/users/impersonation-tokens?${query.toString()}`
      )) as
        | RepoImpersonationToken[]
        | {
            tokens?: RepoImpersonationToken[];
            impersonation_tokens?: RepoImpersonationToken[];
            total?: number;
          };

      const tokens = Array.isArray(response)
        ? response
        : response.impersonation_tokens ?? response.tokens ?? [];

      return {
        tokens,
        total: Array.isArray(response) ? tokens.length : response.total ?? tokens.length
      };
    },
    async associateRemoteMirror(input) {
      return (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/remote-mirror/associate`,
        {
          url: input.url
        }
      )) as RepoRemoteMirror;
    },
    async startRemoteMirrorSynchronization(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/remote-mirror`,
        omitUndefinedFields({
          username: input.username,
          password: input.password,
          endpoint_uuid: input.endpoint_uuid,
          force_fetch: input.force_fetch
        })
      )) as { jid?: string };

      return {
        jid: response.jid ?? ""
      };
    },
    async getRemoteMirror(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/remote-mirror`
      )) as RepoRemoteMirror;
    },
    async updateRemoteMirror(input) {
      return (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/remote-mirror`,
        omitUndefinedFields({
          url: input.url,
          sync_branch_type: input.sync_branch_type,
          mirroring_enabled: input.mirroring_enabled,
          endpoint_uuid: input.endpoint_uuid
        })
      )) as RepoRemoteMirror;
    },
    async listRepositoryLabels(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/labels`
      )) as Array<{
        id?: number | string;
        name?: string;
        color?: string;
        description?: string;
        text_color?: string;
        is_expired?: boolean;
        open_merge_requests_count?: number;
        priority?: number;
        is_repository_label?: boolean;
      }>;

      const labels = (response ?? []).map((item) => ({
        id: item.id ?? "",
        name: item.name,
        color: item.color,
        description: item.description,
        text_color: item.text_color,
        is_expired: item.is_expired,
        open_merge_requests_count: item.open_merge_requests_count,
        priority: item.priority,
        is_repository_label: item.is_repository_label
      }));

      return {
        labels,
        total: labels.length
      };
    },
    async listProtectedBranches(input) {
      const query = buildOffsetLimitQuery(input);

      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branches?${query.toString()}`
      )) as Parameters<typeof extractProtectedBranchesResponse>[0];

      return extractProtectedBranchesResponse(rawResponse);
    },
    async listProjectProtectedBranches(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/protected-branches?${query.toString()}`
      )) as Parameters<typeof extractProtectedBranchesResponse>[0];

      return extractProtectedBranchesResponse(rawResponse);
    },
    async createProjectProtectedBranches(input) {
      const rawResponse = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/protected-branches`,
        buildProjectProtectedBranchPayload(input)
      )) as RepoProtectedBranch;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.name,
        name: response.name ?? input.name
      };
    },
    async listGroupProtectedBranches(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/protected-branches?${query.toString()}`
      )) as Parameters<typeof extractProtectedBranchesResponse>[0];

      return extractProtectedBranchesResponse(rawResponse);
    },
    async getProtectedBranch(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branch?${query.toString()}`
      )) as RepoProtectedBranch;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.branch_name,
        name: response.name ?? input.branch_name
      };
    },
    async batchCreateProtectedBranches(input) {
      const rawResponse = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branches`,
        buildProtectedBranchPayload(input)
      )) as RepoProtectedBranch[];
      const response = unwrapRepoPayload(rawResponse);
      const branches = Array.isArray(response) ? response : [];

      return {
        branches,
        total: branches.length
      };
    },
    async batchUpdateProtectedBranches(input) {
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branches`,
        buildProtectedBranchPayload(input)
      )) as RepoProtectedBranch[];
      const response = unwrapRepoPayload(rawResponse);
      const branches = Array.isArray(response) ? response : [];

      return {
        branches,
        total: branches.length
      };
    },
    async bulkDeleteProtectedBranches(input) {
      await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branches/bulk-deletion`,
        { names: input.names }
      );

      return {
        names: input.names,
        deleted: true
      };
    },
    async updateProtectedBranch(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branch?${query.toString()}`,
        mapProtectedBranchActions(input.actions)
      )) as RepoProtectedBranch;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.branch_name,
        name: response.name ?? input.branch_name
      };
    },
    async deleteProtectedBranch(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });
      await _http.delete?.(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branch?${query.toString()}`
      );

      return {
        branch_name: input.branch_name,
        deleted: true
      };
    },
    async listProtectedTags(input) {
      const query = buildOffsetLimitQuery(input);

      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tags?${query.toString()}`
      )) as Parameters<typeof extractProtectedTagsResponse>[0];

      return extractProtectedTagsResponse(rawResponse);
    },
    async createProjectProtectedTags(input) {
      const rawResponse = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/protected-tags`,
        buildProjectProtectedTagPayload(input)
      )) as RepoProtectedTag;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.name,
        name: response.name ?? input.name
      };
    },
    async listProjectProtectedTags(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/protected-tags`
      )) as Parameters<typeof extractProtectedTagsResponse>[0];

      return extractProtectedTagsResponse(rawResponse);
    },
    async listRepositoryProtectedRefsUserGroups(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-refs/user-groups?${query.toString()}`
      )) as Parameters<typeof extractProtectedRefsUserGroupsResponse>[0];

      return extractProtectedRefsUserGroupsResponse(rawResponse);
    },
    async listGroupProtectedRefsUserGroups(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/protected-refs/user-groups?${query.toString()}`
      )) as Parameters<typeof extractProtectedRefsUserGroupsResponse>[0];

      return extractProtectedRefsUserGroupsResponse(rawResponse);
    },
    async listProjectProtectedRefsUserGroups(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/protected-refs/user-groups?${query.toString()}`
      )) as Parameters<typeof extractProtectedRefsUserGroupsResponse>[0];

      return extractProtectedRefsUserGroupsResponse(rawResponse);
    },
    async getProtectedTag(input) {
      const query = new URLSearchParams({
        tag_name: input.tag_name
      });
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tag?${query.toString()}`
      )) as RepoProtectedTag;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.tag_name,
        name: response.name ?? input.tag_name
      };
    },
    async batchCreateProtectedTags(input) {
      const rawResponse = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tags`,
        buildProtectedTagPayload(input)
      )) as RepoProtectedTag[];
      const response = unwrapRepoPayload(rawResponse);
      const tags = Array.isArray(response) ? response : [];

      return {
        tags,
        total: tags.length
      };
    },
    async batchUpdateProtectedTags(input) {
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tags`,
        buildProtectedTagPayload(input)
      )) as RepoProtectedTag[];
      const response = unwrapRepoPayload(rawResponse);
      const tags = Array.isArray(response) ? response : [];

      return {
        tags,
        total: tags.length
      };
    },
    async bulkDeleteProtectedTags(input) {
      await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tags/bulk-deletion`,
        { names: input.names }
      );

      return {
        names: input.names,
        deleted: true
      };
    },
    async updateProtectedTag(input) {
      const query = new URLSearchParams({
        tag_name: input.tag_name
      });
      const rawResponse = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tag?${query.toString()}`,
        input.actions.map((action) => omitUndefinedFields({
          action: action.action,
          enable: action.enable,
          user_ids: action.user_ids,
          user_team_ids: action.user_team_ids,
          related_role_ids: action.related_role_ids
        }))
      )) as RepoProtectedTag;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.tag_name,
        name: response.name ?? input.tag_name
      };
    },
    async deleteProtectedTag(input) {
      const query = new URLSearchParams({
        tag_name: input.tag_name
      });
      await _http.delete?.(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-tag?${query.toString()}`
      );

      return {
        tag_name: input.tag_name,
        deleted: true
      };
    },
    async listMergeRequestDiscussions(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/discussions`
      )) as Array<{
        id?: string;
        discussion_id?: string;
        created_at?: string;
        notes?: Array<{
          body?: string;
          created_at?: string;
          author?: { name?: string; nick_name?: string };
        }>;
      }>;

      const discussions = (response ?? []).map((item) => {
        const note = item.notes?.[0];

        return {
          discussion_id: item.discussion_id ?? item.id ?? "",
          body: note?.body,
          created_at: note?.created_at ?? item.created_at,
          author: note?.author
        };
      });

      return {
        discussions,
        total: discussions.length
      };
    },
    async listMergeRequestChanges(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/changes`
      )) as {
        changes?: Array<{
          old_path?: string;
          new_path?: string;
          new_file?: boolean;
          deleted_file?: boolean;
          renamed_file?: boolean;
          diff?: string;
        }>;
      };

      return {
        changes: response.changes ?? [],
        total: response.changes?.length ?? 0
      };
    },
    async createMergeRequestDiscussion(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/discussions`,
        {
          body: input.body
        }
      )) as {
        id?: string;
        discussion_id?: string;
        created_at?: string;
        notes?: Array<{
          body?: string;
          created_at?: string;
          author?: { name?: string; nick_name?: string };
        }>;
      };

      const note = response.notes?.[0];

      return {
        discussion_id: response.discussion_id ?? response.id ?? "",
        body: note?.body ?? input.body,
        created_at: note?.created_at ?? response.created_at,
        author: note?.author
      };
    },
    async mergeMergeRequest(input) {
      const response = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/merge`,
        {
          squash: input.squash,
          force_merge: input.force_merge,
          sha: input.sha,
          merge_commit_message: input.merge_commit_message,
          squash_commit_message: input.squash_commit_message,
          should_remove_source_branch: input.should_remove_source_branch
        }
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        web_url?: string;
      };

      return {
        id: response.id ?? input.merge_request_iid,
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        web_url: response.web_url
      };
    },
    async closeMergeRequest(input) {
      const response = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}`,
        {
          state_event: "close"
        }
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        web_url?: string;
      };

      return {
        id: response.id ?? input.merge_request_iid,
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        web_url: response.web_url
      };
    },
    async createMergeRequest(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests`,
        {
          source_branch: input.source_branch,
          target_branch: input.target_branch,
          title: input.title,
          description: input.description,
          target_project_id: input.target_project_id,
          assignee_id: input.assignee_id,
          reviewer_ids: input.reviewer_ids,
          remove_source_branch: input.remove_source_branch,
          squash: input.squash,
          draft: input.draft,
          labels: Array.isArray(input.labels) ? input.labels.join(",") : input.labels,
          milestone_id: input.milestone_id
        }
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        description?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        web_url?: string;
      };

      return {
        id: response.id ?? "",
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        description: response.description,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        web_url: response.web_url
      };
    },
    async reviewMergeRequest(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/approval`,
        {
          action_type: input.action_type,
          approver_comment: input.approver_comment
        }
      )) as Array<{
        id?: number | string;
        name?: string;
        nick_name?: string;
        state?: string;
        updated_at?: string;
        approver_comment?: string;
      }>;

      return {
        reviewers: (response ?? []).map((item) => ({
          id: item.id ?? "",
          name: item.name,
          nick_name: item.nick_name,
          state: item.state,
          updated_at: item.updated_at,
          approver_comment: item.approver_comment
        }))
      };
    },
    async getRepository(input) {
      const response = (await _http.get(`/v4/repositories/${encodeURIComponent(input.repository_id)}`)) as {
        id?: number | string;
        name?: string;
        description?: string;
        default_branch?: string;
        ssh_url_to_repo?: string;
        http_url_to_repo?: string;
        project_id?: string;
        project_name?: string;
      };

      return {
        id: response.id ?? input.repository_id,
        name: response.name ?? "",
        description: response.description,
        default_branch: response.default_branch,
        ssh_url_to_repo: response.ssh_url_to_repo,
        http_url_to_repo: response.http_url_to_repo,
        project_id: response.project_id,
        project_name: response.project_name
      };
    },
    async getMergeRequest(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}`
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        description?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        created_at?: string;
        updated_at?: string;
        author?: { name?: string; nick_name?: string };
        web_url?: string;
      };

      return {
        id: response.id ?? input.merge_request_iid,
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        description: response.description,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        created_at: response.created_at,
        updated_at: response.updated_at,
        author: response.author,
        web_url: response.web_url
      };
    },
    async getCommit(input) {
      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.repository_id)}/repository/commits/${encodeURIComponent(input.commit_sha)}`
      )) as {
        id?: string;
        short_id?: string;
        title?: string;
        author_name?: string;
        message?: string;
      };

      return {
        id: response.id ?? input.commit_sha,
        short_id: response.short_id,
        title: response.title,
        author_name: response.author_name,
        message: response.message
      };
    },
    async getFile(input) {
      const query = new URLSearchParams({
        file_path: input.file_path,
        ref: input.branch
      });
      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.repository_id)}/repository/files?${query.toString()}`
      )) as {
        file_path?: string;
        branch_name?: string;
        content?: string;
      };

      return {
        file_path: response.file_path ?? input.file_path,
        branch_name: response.branch_name ?? input.branch,
        content: response.content ?? ""
      };
    },
    async listCommits(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      if (input.ref_name) {
        query.set("ref_name", input.ref_name);
      }
      if (input.since) {
        query.set("since", input.since);
      }
      if (input.until) {
        query.set("until", input.until);
      }
      if (typeof input.order_by_date !== "undefined") {
        query.set("order_by_date", String(input.order_by_date));
      }
      if (typeof input.with_stats !== "undefined") {
        query.set("with_stats", String(input.with_stats));
      }

      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.repository_id)}/repository/commits?${query.toString()}`
      )) as {
        commits?: Array<{ id: string; short_id?: string; title?: string; author_name?: string }>;
        total?: number;
      };

      return {
        commits: response.commits ?? [],
        total: response.total
      };
    },
    async listRepositories(input) {
      const cacheKey = buildListRepositoriesCacheKey(input);
      const cached = await listRepositoriesCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const query = new URLSearchParams({
          offset: String(offset),
          limit: String(input.page_size)
        });

        if (input.keyword) {
          query.set("search", input.keyword);
        }

        const response = (await _http.get(
          `/v4/projects/${encodeURIComponent(input.project_id)}/repositories?${query.toString()}`
        )) as
          | Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>
          | {
              repositories?: Array<{
                id: number | string;
                name: string;
                ssh_url?: string;
                http_url?: string;
              }>;
              total?: number;
            };

        const repositories = Array.isArray(response) ? response : (response.repositories ?? []);

        return {
          repositories,
          total: Array.isArray(response) ? response.length : response.total
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("repo_list_repositories");
      }

      return cached.value;
    },
    async listTenantRepositories(input) {
      const query = buildTenantOffsetLimitQuery(input);
      appendOptionalQuery(query, input, [
        "repository_name",
        "member_number",
        "status",
        "owner",
        "created_after",
        "created_before",
        "sort",
        "sort_field",
        "locked"
      ]);

      const rawResponse = (await _http.get(`/v4/tenant/repositories?${query.toString()}`)) as Parameters<
        typeof extractTenantRepositoriesResponse
      >[0];

      return extractTenantRepositoriesResponse(rawResponse);
    },
    async showTenantDevelopMode() {
      const rawResponse = (await _http.get("/v4/tenant/develop-mode")) as Parameters<
        typeof extractTenantDevelopMode
      >[0];

      return extractTenantDevelopMode(rawResponse);
    },
    async showTenantRepoEncryptionSetting(input) {
      const rawResponse = (await _http.get(
        `/v4/tenants/${encodeURIComponent(input.tenant_id)}/repo-encryption/setting`
      )) as Parameters<typeof extractTenantRepoEncryptionSetting>[0];

      return extractTenantRepoEncryptionSetting(rawResponse);
    },
    async listTenantCMKs(input) {
      const query = buildTenantOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/tenants/${encodeURIComponent(input.tenant_id)}/repo-encryption/cmks?${query.toString()}`
      )) as Parameters<typeof extractTenantCMKsResponse>[0];

      return extractTenantCMKsResponse(rawResponse);
    },
    async listTenantEncryptedRepositories(input) {
      const query = buildTenantOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/tenants/${encodeURIComponent(input.tenant_id)}/repo-encryption/repositories?${query.toString()}`
      )) as Parameters<typeof extractTenantEncryptedRepositoriesResponse>[0];

      return extractTenantEncryptedRepositoriesResponse(rawResponse);
    },
    async showTenantKMSGrant(input) {
      const rawResponse = (await _http.get(
        `/v4/tenants/${encodeURIComponent(input.tenant_id)}/repo-encryption/kms-grant`
      )) as Parameters<typeof extractTenantKmsGrant>[0];

      return extractTenantKmsGrant(rawResponse);
    },
    async showProjectTenantSettings(input) {
      const query = new URLSearchParams();

      if (input.project_id) {
        query.set("project_id", input.project_id);
      }

      const rawResponse = (await _http.get(
        `/v4/tenant/setting${query.toString() ? `?${query.toString()}` : ""}`
      )) as Parameters<typeof extractProjectTenantSettings>[0];

      return extractProjectTenantSettings(rawResponse);
    },
    async listTenantTrustedIpAddresses(input) {
      const query = buildTenantOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/tenant/trusted-ip-addresses?${query.toString()}`
      )) as Parameters<typeof extractTenantTrustedIpAddressesResponse>[0];

      return extractTenantTrustedIpAddressesResponse(rawResponse);
    },
    async exportTenantRepositories(input) {
      await _http.post("/v4/tenant/repositories/export", {
        repository_ids: input.repository_ids
      });

      return {
        status: "success"
      };
    },
    async updateTenantRepoEncryptionSetting(input) {
      const rawResponse = (await _http.put(
        `/v4/tenants/${encodeURIComponent(input.tenant_id)}/repo-encryption/setting`,
        omitUndefinedFields({
          tenant_id: input.tenant_id,
          encryption_type: input.encryption_type,
          default_encryption_enabled: input.default_encryption_enabled,
          cmk_key_name: input.cmk_key_name,
          cmk_key_id: input.cmk_key_id
        })
      )) as Parameters<typeof extractTenantRepoEncryptionSetting>[0];

      return extractTenantRepoEncryptionSetting(rawResponse);
    },
    async createTenantKMSGrant(input) {
      const rawResponse = (await _http.post(
        `/v4/tenants/${encodeURIComponent(input.tenant_id)}/repo-encryption/kms-grant`,
        omitUndefinedFields({
          key: input.key,
          title: input.title
        })
      )) as Parameters<typeof extractTenantKmsGrant>[0];

      return extractTenantKmsGrant(rawResponse);
    },
    async addTenantTrustedIpAddress(input) {
      const rawResponse = (await _http.post(
        "/v4/tenant/trusted-ip-addresses",
        omitUndefinedFields({
          ip_type: input.ip_type,
          ip_start: input.ip_start,
          ip_end: input.ip_end,
          view_flag: input.view_flag,
          download_flag: input.download_flag,
          upload_flag: input.upload_flag,
          remark: input.remark
        })
      )) as Parameters<typeof extractTenantTrustedIpAddressResponse>[0];

      return extractTenantTrustedIpAddressResponse(rawResponse);
    },
    async updateTenantTrustedIpAddress(input) {
      const rawResponse = (await _http.put(
        `/v4/tenant/trusted-ip-addresses/${encodeURIComponent(input.ip_id)}`,
        omitUndefinedFields({
          ip_type: input.ip_type,
          ip_start: input.ip_start,
          ip_end: input.ip_end,
          view_flag: input.view_flag,
          download_flag: input.download_flag,
          upload_flag: input.upload_flag,
          remark: input.remark
        })
      )) as Parameters<typeof extractTenantTrustedIpAddressResponse>[0];

      return extractTenantTrustedIpAddressResponse(rawResponse);
    },
    async deleteTenantTrustedIpAddress(input) {
      const response = (await _http.delete(
        `/v4/tenant/trusted-ip-addresses/${encodeURIComponent(input.ip_id)}`
      )) as { status?: string; result?: { status?: string } };
      const payload = unwrapRepoPayload(response);

      return {
        status: payload.result?.status ?? payload.status ?? "success"
      };
    },
    async listMergeRequests(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.state) {
        query.set("state", input.state);
      }

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests?${query.toString()}`
      )) as Array<{
        id: number | string;
        iid?: number;
        title?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        created_at?: string;
        updated_at?: string;
        author?: { name?: string; nick_name?: string };
        web_url?: string;
      }>;

      return {
        merge_requests: response ?? [],
        total: undefined
      };
    },
    async listBranches(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/branches?${query.toString()}`
      )) as
        | Array<{ name: string; commit?: { id?: string }; protected?: boolean }>
        | {
            branches?: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
            total?: number;
            result?: {
              branches?: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
              total?: number;
            };
          };
      const payload = Array.isArray(response) ? response : (response.result?.branches ?? response.branches ?? []);
      const total = Array.isArray(response) ? response.length : (response.result?.total ?? response.total);

      return {
        branches: payload,
        total
      };
    }
  };
}
