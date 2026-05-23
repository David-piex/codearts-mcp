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
  token?: string;
  token_type?: string;
  push_events?: boolean;
  tag_push_events?: boolean;
  merge_requests_events?: boolean;
  issues_events?: boolean;
  note_events?: boolean;
  note_plain_text_filter?: string[];
  job_events?: boolean;
  pipeline_events?: boolean;
  wiki_page_events?: boolean;
  enable_ssl_verification?: boolean;
  branch_filter_strategy?: string;
  push_events_branch_regex_filter?: string;
  event_cfgs?: Array<Record<string, unknown>>;
  project_cfgs?: Array<Record<string, unknown>>;
  branch_cfgs?: Array<Record<string, unknown>>;
  service?: string;
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
  web_hook_id?: number | string;
  trigger?: string;
  url?: string;
  request_headers?: Record<string, unknown>;
  request_data?: unknown;
  response_headers?: Record<string, unknown>;
  response_body?: unknown;
  response_status?: string;
  execution_duration?: number;
  uuid?: string;
  created_at?: string;
  updated_at?: string;
  repository?: {
    id?: number | string;
    namespace?: string;
  };
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

export type RepoStatisticEvent = {
  id?: number | string;
  user_id?: number | string;
  project_id?: number | string;
  branch?: string;
  status?: string;
  stat_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type RepoRepositoryStatisticsStatus = {
  can_statistics?: boolean;
  reason?: number;
  event?: RepoStatisticEvent;
};

export type RepoLastPushEvent = {
  ref?: string;
  created_at?: string;
  repository?: {
    id?: number | string;
    name?: string;
    path?: string;
    path_with_namespace?: string;
    project_name?: string;
  };
};

export type RepoRepositoryStatisticsSummary = {
  branches_count?: number;
  commits_count?: number;
  members_count?: number;
  tags_count?: number;
  merge_request_count?: number;
  note_count?: number;
};

export type RepoStatsSummary = {
  repo_name?: string;
  commit_count?: number;
  repo_size?: string;
  last_commit_time?: string;
  code_lines?: number;
  branch_count?: number;
};

export type RepoLastStatistics = {
  event?: RepoStatisticEvent;
  total?: number;
  statistics?: Array<{
    id?: number | string;
    project_id?: number | string;
    branch?: string;
    user_name?: string;
    add_lines?: number;
    delete_lines?: number;
    commit_count?: number;
    created_at?: string;
    updated_at?: string;
  }>;
  codelines?: Array<{
    additions?: number;
    deletions?: number;
    date?: string;
  }>;
  count?: number;
  all_branch_commits_count?: number;
};

export type RepoSubmodule = {
  repo_id?: number | string;
  branch?: string;
  path?: string;
  git_url?: string;
  submodule_branch?: string;
  namespace_uuid?: string;
  submodule_repo_id?: number | string;
  repo_name?: string;
  sub_commitId?: string;
  deployKey_status?: number;
  status?: number;
};

export type RepoCommitStatistics = {
  commits?: Array<{
    author_name?: string;
    date?: string;
    nick_name?: string;
    tenant_name?: string;
    user_name?: string;
    is_merge?: boolean;
  }>;
  statistics?: Array<{
    id?: number | string;
    project_id?: number | string;
    branch?: string;
    user_name?: string;
    add_lines?: number;
    delete_lines?: number;
    commit_count?: number;
    created_at?: string;
    updated_at?: string;
  }>;
  total?: number;
};

export type RepoRepositoryLanguages = {
  languages?: Array<{
    color?: string;
    label?: string;
    value?: number;
  }>;
  status?: string;
};

export type RepoContributor = {
  name?: string;
  email?: string;
  commits?: number;
  nick_name?: string;
  tenant_name?: string;
  user_name?: string;
};

export type RepoForkRepository = {
  id?: number | string;
  name?: string;
  archived?: boolean;
  product_id?: string;
  product_name?: string;
  path_with_namespace?: string;
  namespace?: string;
  path?: string;
  develop_mode?: string;
  visibility?: string;
  security?: string;
  star_count?: number;
  forks_count?: number;
  created_at?: string;
  updated_at?: string;
};

export type RepoRepositorySummary = {
  id?: number | string;
  name?: string;
  namespace?: string;
  path?: string;
  develop_mode?: string;
  visibility?: string;
  security?: string;
  star_count?: number;
  forks_count?: number;
  open_merge_requests_count?: number;
  starred?: boolean;
  name_with_namespace?: string;
  last_activity_at?: string;
  archived?: boolean;
  member_count?: number;
  uuid?: string;
  description?: string;
  ssh_url_to_repo?: string;
  http_url_to_repo?: string;
  ssh_url?: string;
  http_url?: string;
  status?: number | string;
  project_name?: string;
  project_id?: string;
  creator_id?: number | string;
};

export type RepoRepositoryUserGroup = {
  user_group_name?: string;
  user_group_id?: number | string;
  member_group_name?: string;
  member_group_id?: number | string;
  project_id?: string;
  user_count?: number;
  member_count?: number;
  description?: string;
};

export type RepoRepositoryMember = {
  id?: number | string;
  name?: string;
  name_cn?: string;
  username?: string;
  nick_name?: string;
  email?: string;
  iam_id?: string;
  user_id?: number | string;
  user_iam_id?: string;
  user_name?: string;
  user_nick_name?: string;
  tenant_name?: string;
  tenant_id?: string;
  is_repo_creator?: boolean;
  is_group_creator?: boolean;
  is_Project_admin?: boolean;
  project_role_name?: string;
  repository_role_name?: string;
  repository_role_Id?: string;
  member_source?: string;
  member_group_source?: string;
  member_source_id?: string;
  service_license_status?: number | string;
  action_enabled?: boolean;
};

export type RepoGroupInheritSetting = {
  group_id?: number | string;
  source_setting?: string;
  project_id?: string;
  upward_inherit_editable?: boolean;
};

export type RepoMergeRequestCommit = {
  id?: string;
  short_id?: string;
  title?: string;
  message?: string;
  author_name?: string;
  name?: string;
  user_name?: string;
  tenant_name?: string;
  nick_name?: string;
  authored_date?: string;
  committed_date?: string;
  committer_name?: string;
  gpg_primary_key_id?: string;
  open_gpg_verified?: boolean;
  verification_status?: string;
  parent_ids?: string[];
  created_at?: string;
};

export type RepoMergeRequestVote = {
  id?: number | string;
  score?: number;
  author_name?: string;
  author_username?: string;
  created_at?: string;
  updated_at?: string;
  last_committed_id?: string;
  author_id?: number | string;
  avatar_url?: string;
  nick_name?: string;
  tenant_name?: string;
};

export type RepoMergeRequestVotes = {
  scores?: number;
  merge_request_id?: number | string;
  merge_request_creator?: string;
  votes?: RepoMergeRequestVote[];
};

export type RepoMergeRequestStatistic = {
  id?: number | string;
  iid?: number | string;
  title?: string;
  state?: string;
  commits_count?: number;
  changed_files_count?: number;
  notes_count?: number;
  changed_lines_count?: number;
  merge_error?: string;
  json_merge_error?: unknown;
  votes?: number;
};

export type RepoBlob = {
  size?: number;
  encoding?: string;
  content?: string;
  blob_id?: string;
};

export type RepoDiffLines = {
  text?: string;
};

export type RepoTreeObject = {
  id?: string;
  name?: string;
  type?: string;
  path?: string;
  mode?: string;
  submodule_link?: string;
  submodule_branch?: string;
  md5?: string;
};

export type RepoLogTreeObject = RepoTreeObject & {
  commit?: RepoMergeRequestCommit;
  blob_id?: string;
  submodule_url?: string;
  is_limited?: boolean;
  nick_name?: string;
  tenant_name?: string;
  user_name?: string;
};

export type RepoFileContent = {
  file_path: string;
  sha: string;
  content: string;
};

export type RepoBlameLine = {
  lineNO?: number;
  content?: string;
};

export type RepoBlame = {
  commit?: RepoMergeRequestCommit;
  avatar_url?: string;
  lines?: RepoBlameLine[];
  nick_name?: string;
  tenant_name?: string;
  user_name?: string;
};

export type RepoReadmeFile = {
  blob_id?: string;
  content?: string;
  encoding?: string;
  file_name?: string;
  file_path?: string;
  file_type?: string;
  size?: number;
};

export type RepoReviewCategory = {
  key?: string;
  name_zh?: string;
  name_en?: string;
  sub_categories?: RepoReviewCategory[];
};

export type RepoRequiredAttribute = {
  name?: string;
  is_required?: boolean;
};

export type RepoReviewModule = {
  key?: string;
  name_zh?: string;
  name_en?: string;
};

export type RepoReviewSetting = {
  categories_and_modules_enabled?: boolean;
  secondary_category_enabled?: boolean;
  primary_categories?: RepoReviewCategory[];
  review_default_categories?: RepoReviewCategory[];
  review_customized_categories?: RepoReviewCategory[];
  review_modules?: RepoReviewModule[];
  secondary_category_type?: string;
  secondary_categories?: RepoReviewCategory[];
  note_required_attributes?: RepoRequiredAttribute[];
  codehub_default_categories?: RepoReviewCategory[];
  hicode_default_categories?: RepoReviewCategory[];
};

export type RepoNoteRequiredAttributes = {
  note_required_attributes?: RepoRequiredAttribute[];
};

export type RepoDefaultReviewCategories = {
  codehub_default_categories?: RepoReviewCategory[];
  hicode_default_categories?: RepoReviewCategory[];
};

export type RepoReviewUserBasic = {
  id?: number | string;
  name?: string;
  username?: string;
  state?: string;
  service_license_status?: number | null;
  avatar_url?: string | null;
  avatar_path?: string | null;
  email?: string | null;
  name_cn?: string | null;
  web_url?: string | null;
  nick_name?: string | null;
  tenant_name?: string | null;
  error_message?: string | null;
};

export type RepoReviewPosition = {
  base_sha?: string;
  start_sha?: string;
  head_sha?: string;
  old_path?: string;
  new_path?: string;
  position_type?: string;
  old_line?: number;
  new_line?: number;
};

export type RepoRepositoryReview = {
  id?: number | string;
  type?: string;
  body?: string;
  note?: string;
  author?: RepoReviewUserBasic | null;
  assignee?: RepoReviewUserBasic | null;
  proposer?: RepoReviewUserBasic | null;
  reviewer?: RepoReviewUserBasic | null;
  resolved_by?: RepoReviewUserBasic | null;
  created_at?: string;
  updated_at?: string;
  system?: boolean;
  noteable_id?: number | string;
  noteable_type?: string;
  noteable_iid?: number | string;
  commit_id?: string | null;
  discussion_id?: string;
  repository?: string;
  repository_path?: string;
  repository_id?: number | string;
  diff_file?: string;
  diff?: string;
  archived?: boolean;
  review_categories?: string | null;
  review_categories_cn?: string | null;
  review_categories_en?: string | null;
  review_modules?: string | number | null;
  severity?: string | null;
  severity_cn?: string | null;
  severity_en?: string | null;
  position?: RepoReviewPosition | null;
  resolved?: boolean;
  resolved_at?: string | null;
  resolvable?: boolean;
  is_reply?: boolean;
  is_outdated?: boolean;
  from_robot?: boolean;
  link?: string;
  merge_request_id?: number | string;
  merge_request_iid?: number | string;
  merge_request_title?: string;
  merge_request_state?: string;
  moderation_result?: boolean | null;
  moderation_time?: number | null;
  moderation_status?: number | null;
};

export type RepoNavigationEntry = {
  tag_name?: string;
  file_path?: string;
  blob?: string;
  line_image?: string;
  line_number?: number;
  range?: string;
  syntax_type?: string;
  revision?: string;
  extend?: string;
};

export type RepoNavigationSymbolNode = {
  def?: RepoNavigationEntry;
  children?: RepoNavigationSymbolNode[] | null;
};

export type RepoNavigationReferences = {
  result?: string;
  message?: string;
  defs?: RepoNavigationEntry[];
  refs?: RepoNavigationEntry[];
};

export type RepoNavigationOutline = {
  result?: string;
  message?: string;
  file_path?: string;
  revision?: string;
  symbols?: RepoNavigationSymbolNode[];
};

export type RepoNavigationSchema = {
  version?: string;
  maximum_file_size?: number;
  maximum_line_length?: number;
  maximum_truncate_line?: number;
  create_at?: string;
  update_at?: string;
  rebuild_at?: string;
  last_build_at?: string;
  build_times?: number;
  query_times?: number;
  outline_times?: number;
};

export type RepoNavigationLanguage = {
  name?: string;
  extension_list?: string[];
};

export type RepoNavigationLanguageInfo = {
  result?: string;
  message?: string;
  language_list?: RepoNavigationLanguage[];
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

export type RepoUserGpgKey = {
  id?: number | string;
  created_at?: string;
  emails_with_verified_status?: Record<string, boolean>;
  fingerprint?: string;
  key?: string;
  description?: string;
  title?: string;
  primary_keyid?: string;
  active?: boolean;
  subkeys?: Array<{
    id?: number | string;
    fingerprint?: string;
    gpg_key_id?: number | string;
    keyid?: string;
  }>;
};

export type RepoUserSshKey = {
  id?: number | string;
  title?: string;
  key?: string;
  created_at?: string;
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

export type RepoNotificationSubscription = {
  repository_id?: number | string;
  enabled?: boolean;
  config_source?: string;
  webhook_config?: {
    url?: string;
    mention_users?: string;
    mention_phone?: string;
    has_token?: boolean;
  };
  waring_repo_usage_rate?: number;
  subscript_events?: Array<{
    resource_type?: string;
    action?: string;
    enabled?: boolean;
    role_ids?: string[] | null;
    role_names?: string[] | null;
  }>;
};

export type RepoNotificationSubscriptionState = {
  config_source?: string;
  enabled?: boolean;
};

export type RepoNotificationSubscriptionsStatus = {
  internal_message?: RepoNotificationSubscriptionState;
  email?: RepoNotificationSubscriptionState;
  qyweixin?: RepoNotificationSubscriptionState;
  feishu?: RepoNotificationSubscriptionState;
  dingding?: RepoNotificationSubscriptionState;
};

export type RepoRepositoryInheritSettingSource = {
  source_type?: string;
  source_id?: string;
  upward_inherit_editable?: boolean;
};

export type RepoUserRefPermissionBasic = {
  has_permission?: boolean;
  is_protect?: boolean;
};

export type RepoUserRefPermission = {
  read?: RepoUserRefPermissionBasic;
  review?: RepoUserRefPermissionBasic;
  approval?: RepoUserRefPermissionBasic;
  create_change?: RepoUserRefPermissionBasic;
  merge?: RepoUserRefPermissionBasic;
  create_delete?: RepoUserRefPermissionBasic;
  push?: RepoUserRefPermissionBasic;
};

export type RepoWatermarkSetting = {
  watermark?: boolean;
  can_update?: boolean;
  view_watermark?: boolean;
};

export type RepoRepositoryGeneralCommitRule = {
  reject_unsigned_commits?: boolean;
  reject_not_signed_by_gpg?: boolean;
  deny_delete_tag?: boolean;
  prevent_secrets?: boolean;
  deny_force_push?: boolean;
};

export type RepoRepositoryCommitRule = {
  id?: number | string;
  repository_id?: number | string;
  commit_message_regex?: string;
  commit_message_negative_regex?: string;
  prohibited_file_name_regex?: string;
  author_email_regex?: string;
  max_file_size?: number;
  allowed_max_file_size?: number;
  effective_date?: string;
  binary_gate_enabled?: boolean;
  privileged_users?: Array<{
    id?: number | string;
    name?: string;
    username?: string;
    state?: string;
    service_license_status?: number | null;
    name_cn?: string;
    nick_name?: string;
    tenant_name?: string;
  }>;
  allowed_modify_binary?: boolean;
  allowed_binary_file_name_regex?: string;
  author_regex?: unknown;
  updated_at?: string;
  name?: string;
  branch_name?: string;
  created_at?: string;
  skip_rule_check?: boolean;
  skip_rule_end_date?: string;
};

export type RepoPersonalRecentPushEvent = {
  author?: {
    id?: number | string;
    username?: string;
  };
  repository?: {
    id?: number | string;
    description?: string;
    name?: string;
    name_with_namespace?: string;
    path?: string;
    path_with_namespace?: string;
    created_at?: string;
    updated_at?: string;
    archived?: boolean;
    ssh_url_to_repo?: string;
    http_url_to_repo?: string;
    project_id?: string;
    project_name?: string;
    develop_mode?: string;
    moderation_result?: boolean;
  };
  push_data?: {
    commit_count?: number;
    action?: string;
    ref_type?: string;
    commit_from?: string | null;
    commit_to?: string | null;
    ref?: string;
    commit_title?: string;
  };
  created_at?: string;
};

export type RepoRepositoryTemplate = {
  repository_id?: number | string;
  name?: string;
  system?: boolean;
  tags?: string[];
  description?: string;
  language?: string;
  repository_name?: string;
  brief_introduction?: string;
  created_at?: string;
  used_times?: number;
  liked_times?: number;
  creator_name?: string;
  https_url?: string;
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
  showGroupWatermark: (input: {
    group_id: string;
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
  showGroupPermissionInheritEnabled: (input: {
    group_id: string;
  }) => Promise<RepoRepositoryPermissionInheritSetting>;
  showNotificationSubscription: (input: {
    repository_id: string;
    type: "internal_message" | "email" | "qyweixin" | "feishu" | "dingding";
  }) => Promise<RepoNotificationSubscription>;
  showNotificationSubscriptionsStatus: (input: {
    repository_id: string;
  }) => Promise<RepoNotificationSubscriptionsStatus>;
  showRepositoryInheritSettingSource: (input: {
    repository_id: string;
    name: "protected_branches" | "protected_tags" | "merge_requests";
  }) => Promise<RepoRepositoryInheritSettingSource>;
  showRepositoryInheritSetting: (input: {
    repository_id: string;
  }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
  showRepositoryGeneralPolicy: (input: {
    repository_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
  showRepositoryGeneralCommitRule: (input: {
    repository_id: string;
  }) => Promise<RepoRepositoryGeneralCommitRule>;
  listRepositoryCommitRules: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    rules: RepoRepositoryCommitRule[];
    total?: number;
  }>;
  showRepositoryWatermark: (input: {
    repository_id: string;
  }) => Promise<RepoWatermarkSetting>;
  showUserRefPermission: (input: {
    repository_id: string;
    target_ref: string;
    action?: string;
    change_request_iid?: string | number;
  }) => Promise<RepoUserRefPermission>;
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
  associateBranchWorkItems: (input: {
    project_id: string;
    repository_id: string;
    branch: string;
    work_item_ids: string[];
  }) => Promise<{
    status?: string;
    project_id: string;
    repository_id: string;
    branch: string;
    work_item_ids: string[];
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
  listProjectWebhooks: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    hooks: RepoRepositoryWebhook[];
    total?: number;
  }>;
  listGroupWebhooks: (input: {
    group_id: string;
    page: number;
    page_size: number;
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
  getProjectWebhook: (input: {
    project_id: string;
    hook_id: string;
  }) => Promise<RepoRepositoryWebhook>;
  getGroupWebhook: (input: {
    group_id: string;
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
  listProjectWebhookLogs: (input: {
    project_id: string;
    hook_id: string;
    page: number;
    page_size: number;
    repository_id?: string;
    uuid?: string;
    created_after?: string;
    created_before?: string;
  }) => Promise<{
    logs: RepoRepositoryWebhookLog[];
    total?: number;
  }>;
  listGroupWebhookLogs: (input: {
    group_id: string;
    hook_id: string;
    page: number;
    page_size: number;
    repository_id?: string;
    uuid?: string;
    created_after?: string;
    created_before?: string;
  }) => Promise<{
    logs: RepoRepositoryWebhookLog[];
    total?: number;
  }>;
  getRepositoryWebhookLog: (input: {
    repository_id: string;
    hook_id: string;
    log_id: string;
  }) => Promise<RepoRepositoryWebhookLog>;
  getProjectWebhookLog: (input: {
    project_id: string;
    hook_id: string;
    log_id: string;
  }) => Promise<RepoRepositoryWebhookLog>;
  getGroupWebhookLog: (input: {
    group_id: string;
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
  listMergeRequestCommits: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
    view?: "simple";
  }) => Promise<{
    commits: RepoMergeRequestCommit[];
    total?: number;
  }>;
  showMergeRequestVotes: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<RepoMergeRequestVotes>;
  showMergeRequestStatistic: (input: {
    repository_id: string;
    iids: string;
    fields?: string;
  }) => Promise<{
    statistics: RepoMergeRequestStatistic[];
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
  updateMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    title?: string;
    state_event?: string;
    assignee_ids?: string | Array<string | number>;
    reviewer_ids?: string | Array<string | number>;
    description?: string;
    milestone_id?: string | number;
    labels?: string | string[] | Record<string, unknown>;
    force_remove_source_branch?: boolean;
    squash?: boolean;
    squash_commit_message?: string;
    work_item_ids?: string[];
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
  createMergeRequest: (input: {
    repository_id: string;
    source_branch: string;
    target_branch: string;
    title: string;
    description?: string;
    work_item_ids?: string[];
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
  showRepositoryStatisticsStatus: (input: { repository_id: string }) => Promise<RepoRepositoryStatisticsStatus>;
  showLastPushEventInRepository: (input: { repository_id: string }) => Promise<RepoLastPushEvent>;
  showRepositoryStatisticsSummary: (input: { repository_id: string }) => Promise<RepoRepositoryStatisticsSummary>;
  showRepoStatisticsSummary: (input: { repository_id: string }) => Promise<RepoStatsSummary>;
  showRepoLastStatistics: (input: { repository_id: string; branch_name: string }) => Promise<RepoLastStatistics>;
  listPersonalRecentPushEvents: (input: {
    project_id?: string;
    size?: number;
  }) => Promise<{
    events: RepoPersonalRecentPushEvent[];
    total?: number;
  }>;
  listRepositoryTemplates: (input: {
    page: number;
    page_size: number;
    type: "SYSTEM,USER" | "SYSTEM" | "USER";
    platform?: string;
    pipeline?: "SupportPipeline" | "UnsupportedPipeline";
    search?: string;
    enter_type?: string;
    date_order?: "up" | "down";
    language?: string;
    project_id?: string;
  }) => Promise<{
    templates: RepoRepositoryTemplate[];
    total?: number;
  }>;
  listSubmodules: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
  }) => Promise<{
    submodules: RepoSubmodule[];
    total?: number;
  }>;
  showCommitStatistics: (input: { repository_id: string; branch_name: string }) => Promise<RepoCommitStatistics>;
  listRepositoryLanguages: (input: { repository_id: string }) => Promise<RepoRepositoryLanguages>;
  listRepositoryContributors: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    order_by?: "name" | "email" | "commits";
    sort?: "asc" | "desc";
    ref_name?: string;
    skip_merge?: boolean;
    author?: string;
  }) => Promise<{
    contributors: RepoContributor[];
    total?: number;
  }>;
  listRepositoryForks: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    order_by?: "created_at" | "updated_at";
    sort?: "asc" | "desc";
    view?: "basic" | "least";
  }) => Promise<{
    repositories: RepoForkRepository[];
    total?: number;
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
  listCurrentUserRepositories: (input: {
    page: number;
    page_size: number;
    order_by?: "created_at" | "updated_at";
    sort?: "asc" | "desc";
    archived?: boolean;
    search?: string;
    starred?: boolean;
    membership?: boolean;
    user_created?: boolean;
    include_abnormal?: boolean;
  }) => Promise<{
    repositories: RepoRepositorySummary[];
    total?: number;
  }>;
  listGroups: (input: {
    page: number;
    page_size: number;
    search?: string;
    all_available?: boolean;
    order_by?: "id" | "name" | "path" | "created_at" | "updated_at";
    sort?: "asc" | "desc";
    starred?: boolean;
    owned?: boolean;
  }) => Promise<{
    groups: RepoRepositorySummary[];
    total?: number;
  }>;
  listManageableGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    scope?: "group" | "repository";
  }) => Promise<{
    groups: RepoRepositorySummary[];
    total?: number;
  }>;
  listGroupRepositories: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
    order_by?: "id" | "name" | "created_at" | "updated_at";
    sort?: "asc" | "desc";
  }) => Promise<{
    repositories: RepoRepositorySummary[];
    total?: number;
  }>;
  listGroupMembers: (input: {
    group_id: string;
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
    join_way?: "domain" | "normal" | "inherit";
    access_level?: string | number;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
  listGroupAddableMembers: (input: {
    group_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
  listGroupUserGroups: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
    project_id?: string;
  }) => Promise<{
    groups: RepoRepositoryUserGroup[];
    total?: number;
  }>;
  listGroupAddableUserGroups: (input: {
    group_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    groups: RepoRepositoryUserGroup[];
    total?: number;
  }>;
  listGroupSubgroupsAndRepositories: (input: {
    group_id: string;
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
  showGroupInheritSetting: (input: {
    group_id: string;
    setting_type: string;
  }) => Promise<RepoGroupInheritSetting>;
  listProjectMembers: (input: {
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
  listRepositoryUserGroups: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: RepoRepositoryUserGroup[];
    total?: number;
  }>;
  listRepositoryMembers: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
    permission?: "repository" | "code" | "member" | "branch" | "tag" | "mr" | "label";
    action?: string;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
  showBlobs: (input: { repository_id: string; blob_id: string }) => Promise<{
    blobs: RepoBlob[];
    total?: number;
  }>;
  showDiffLines: (input: {
    repository_id: string;
    file_path: string;
    commit_id: string;
    start: number;
    end: number;
  }) => Promise<RepoDiffLines>;
  listRefs: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    type?: "branch" | "tag";
    search?: string;
  }) => Promise<{
    refs: string[];
    total?: number;
  }>;
  listRepositoryTrees: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    ref?: string;
    path?: string;
    recursive?: boolean;
  }) => Promise<{
    trees: RepoTreeObject[];
    total?: number;
  }>;
  listRepositoryLogsTree: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    ref?: string;
  }) => Promise<{
    trees: RepoLogTreeObject[];
    total?: number;
  }>;
  listRepositoryFileList: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    ref_name?: string;
    search?: string;
  }) => Promise<{
    files: string[];
    total?: number;
  }>;
  getRepositoryFileContentV4: (input: {
    repository_id: string;
    file_path: string;
    sha: string;
  }) => Promise<RepoFileContent>;
  getRepositoryBlame: (input: {
    repository_id: string;
    file_path: string;
    sha: string;
  }) => Promise<{
    blames: RepoBlame[];
    total?: number;
  }>;
  showRepositoryReadmeFile: (input: { repository_id: string }) => Promise<RepoReadmeFile>;
  listCommitAssociatedRefs: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
    type: "branch" | "tag";
  }) => Promise<{
    refs: string[];
    total?: number;
  }>;
  showReviewSetting: (input: {
    repository_id: string;
    with_default_review_categories?: boolean;
  }) => Promise<RepoReviewSetting>;
  showNoteRequiredAttributes: (input: { repository_id: string }) => Promise<RepoNoteRequiredAttributes>;
  listDefaultReviewCategories: () => Promise<RepoDefaultReviewCategories>;
  listRepositoryReviews: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    noteable_type: "Commit" | "MergeRequest";
    search?: string;
    start_date?: string;
    end_date?: string;
    only_count?: boolean;
    review_categories?: string;
    review_modules?: string;
    severity?: string;
    assignee_id?: string | number;
    proposer_id?: string | number;
    target_branch?: string;
    include_reply?: boolean;
    order_by?: "created" | "updated";
    sort?: "asc" | "desc";
  }) => Promise<{
    reviews: RepoRepositoryReview[];
    total?: number;
  }>;
  listRepositoryReviewAuthors: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    noteable_type: "Commit" | "MergeRequest";
    resolved_status: "resolved" | "unresolved" | "all";
    reviewers_filter?: string;
  }) => Promise<{
    authors: RepoReviewUserBasic[];
    total?: number;
  }>;
  listRepositoryNavigationReferences: (input: {
    repository_id: string;
    symbol: string;
    language: string;
    blob: string;
    file_path: string;
    path?: string;
    revision?: string;
    ref?: string;
  }) => Promise<RepoNavigationReferences>;
  showRepositoryNavigationOutline: (input: {
    repository_id: string;
    language: string;
    blob: string;
    file_path: string;
    revision?: string;
    ref?: string;
  }) => Promise<RepoNavigationOutline>;
  showRepositoryNavigationSchema: (input: { repository_id: string }) => Promise<RepoNavigationSchema>;
  showRepositoryNavigationLanguage: (input: { repository_id: string }) => Promise<RepoNavigationLanguageInfo>;
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
  listUserGpgKeys: (input: {
    query?: string;
  }) => Promise<{
    keys: RepoUserGpgKey[];
    total?: number;
  }>;
  listUserSshKeys: (input: {
    page: number;
    page_size: number;
    query?: string;
  }) => Promise<{
    keys: RepoUserSshKey[];
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

function extractArrayWithOptionalTotal<T>(
  response: T[] | { result?: T[]; items?: T[]; records?: T[]; total?: number } | string
) {
  const unwrapped = unwrapRepoPayload(response);
  if (typeof unwrapped === "string") {
    return { items: [] as T[], total: undefined };
  }

  const items = Array.isArray(unwrapped)
    ? unwrapped
    : (unwrapped.result ?? unwrapped.items ?? unwrapped.records ?? []);
  return {
    items,
    total: Array.isArray(unwrapped) ? undefined : unwrapped.total
  };
}

function extractArrayFromFields<T>(
  response: T[] | Record<string, unknown> | string,
  fields: string[]
) {
  const unwrapped = unwrapRepoPayload(response);
  if (typeof unwrapped === "string") {
    return { items: [] as T[], total: undefined };
  }

  if (Array.isArray(unwrapped)) {
    return { items: unwrapped as T[], total: undefined };
  }

  const payload = unwrapped as Record<string, unknown>;
  const result = payload.result;
  const resultObject = result && typeof result === "object" && !Array.isArray(result)
    ? result as Record<string, unknown>
    : undefined;

  const items = Array.isArray(result)
    ? result as T[]
    : (fields.map((field) => resultObject?.[field] ?? payload[field]).find(Array.isArray) as T[] | undefined) ?? [];

  const total = typeof payload.total === "number"
    ? payload.total
    : typeof resultObject?.total === "number"
      ? resultObject.total
      : undefined;

  return { items, total };
}

function buildTenantOffsetLimitQuery(input: { offset: number; limit: number }) {
  return new URLSearchParams({
    offset: String(input.offset),
    limit: String(input.limit)
  });
}

function extractWebhookListResponse(
  response:
    | RepoRepositoryWebhook[]
    | {
      hooks?: RepoRepositoryWebhook[];
      total?: number;
      result?: {
        hooks?: RepoRepositoryWebhook[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const hooks = Array.isArray(payload) ? payload : payload.result?.hooks ?? payload.hooks ?? [];

  return {
    hooks,
    total: Array.isArray(payload) ? hooks.length : payload.result?.total ?? payload.total ?? hooks.length
  };
}

function extractWebhookLogListResponse(
  response:
    | RepoRepositoryWebhookLog[]
    | {
      logs?: RepoRepositoryWebhookLog[];
      total?: number;
      result?: {
        logs?: RepoRepositoryWebhookLog[];
        total?: number;
      };
    }
) {
  const payload = unwrapRepoPayload(response);
  const logs = Array.isArray(payload) ? payload : payload.result?.logs ?? payload.logs ?? [];

  return {
    logs,
    total: Array.isArray(payload) ? logs.length : payload.result?.total ?? payload.total ?? logs.length
  };
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

function extractUserGpgKeysResponse(
  response:
    | RepoUserGpgKey
    | RepoUserGpgKey[]
    | {
        keys?: RepoUserGpgKey[];
        total?: number;
        result?: RepoUserGpgKey | RepoUserGpgKey[] | { keys?: RepoUserGpgKey[]; total?: number };
      }
) {
  const payload = unwrapRepoPayload(response);
  const result = !Array.isArray(payload) && "result" in payload && payload.result ? payload.result : payload;
  const keys = Array.isArray(result)
    ? result
    : "keys" in result && Array.isArray(result.keys)
      ? result.keys
      : [result as RepoUserGpgKey];
  const total = Array.isArray(result)
    ? result.length
    : "total" in result && typeof result.total === "number"
      ? result.total
      : keys.length;

  return { keys, total };
}

function extractUserSshKeysResponse(
  response:
    | RepoUserSshKey[]
    | {
        keys?: RepoUserSshKey[];
        total?: number;
        result?: {
          keys?: RepoUserSshKey[];
          total?: number;
        };
      }
) {
  const payload = unwrapRepoPayload(response);
  const keys = Array.isArray(payload) ? payload : payload.result?.keys ?? payload.keys ?? [];

  return {
    keys,
    total: Array.isArray(payload) ? payload.length : payload.result?.total ?? payload.total
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
    async showGroupWatermark(input) {
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/watermark`
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
    async showGroupPermissionInheritEnabled(input) {
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/permission-inherit-enabled`
      )) as RepoRepositoryPermissionInheritSetting;

      return extractRepositoryPermissionInheritSetting(rawResponse);
    },
    async showNotificationSubscription(input) {
      const query = new URLSearchParams({
        type: input.type
      });
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/notification-subscriptions/subscription?${query.toString()}`
      )) as RepoNotificationSubscription;
    },
    async showNotificationSubscriptionsStatus(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/notification-subscriptions/status`
      )) as RepoNotificationSubscriptionsStatus;
    },
    async showRepositoryInheritSettingSource(input) {
      const query = new URLSearchParams({
        name: input.name
      });
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/inherit-setting-source?${query.toString()}`
      )) as RepoRepositoryInheritSettingSource;
    },
    async showRepositoryInheritSetting(input) {
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/inherit-setting`
      )) as Parameters<typeof extractProjectSettingsInheritCfgResponse>[0];

      return extractProjectSettingsInheritCfgResponse(rawResponse);
    },
    async showRepositoryGeneralPolicy(input) {
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/general-policy`
      )) as Parameters<typeof extractProjectGeneralPolicy>[0];

      return extractProjectGeneralPolicy(rawResponse);
    },
    async showRepositoryGeneralCommitRule(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/general-commit-rule`
      )) as RepoRepositoryGeneralCommitRule;
    },
    async listRepositoryCommitRules(input) {
      const query = buildOffsetLimitQuery(input);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/commit-rules?${query.toString()}`
      );
      const extracted = extractArrayWithOptionalTotal<RepoRepositoryCommitRule>(
        response as RepoRepositoryCommitRule[]
      );

      return {
        rules: extracted.items,
        total: extracted.total
      };
    },
    async showRepositoryWatermark(input) {
      const rawResponse = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/watermark`
      )) as RepoWatermarkSetting;

      return extractWatermarkSetting(rawResponse);
    },
    async showUserRefPermission(input) {
      const query = new URLSearchParams({
        target_ref: input.target_ref
      });
      appendOptionalQuery(query, input, ["action", "change_request_iid"]);

      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/user-ref-permission?${query.toString()}`
      )) as RepoUserRefPermission;
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
    async associateBranchWorkItems(input) {
      const rawResponse = (await _http.post(
        "/v2/projects/issues",
        {
          project_id: input.project_id,
          branch: input.branch,
          repo_id: input.repository_id,
          related_id: input.work_item_ids
        }
      )) as { status?: string };

      return {
        status: rawResponse?.status,
        project_id: input.project_id,
        repository_id: input.repository_id,
        branch: input.branch,
        work_item_ids: input.work_item_ids
      };
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
      )) as Parameters<typeof extractWebhookListResponse>[0];

      return extractWebhookListResponse(rawResponse);
    },
    async listProjectWebhooks(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/hooks?${query.toString()}`
      )) as Parameters<typeof extractWebhookListResponse>[0];

      return extractWebhookListResponse(rawResponse);
    },
    async listGroupWebhooks(input) {
      const query = buildOffsetLimitQuery(input);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/hooks?${query.toString()}`
      )) as Parameters<typeof extractWebhookListResponse>[0];

      return extractWebhookListResponse(rawResponse);
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
    async getProjectWebhook(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/hooks/${encodeURIComponent(input.hook_id)}`
      )) as RepoRepositoryWebhook;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.hook_id
      };
    },
    async getGroupWebhook(input) {
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/hooks/${encodeURIComponent(input.hook_id)}`
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
      )) as Parameters<typeof extractWebhookLogListResponse>[0];

      return extractWebhookLogListResponse(rawResponse);
    },
    async listProjectWebhookLogs(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["repository_id", "uuid", "created_after", "created_before"]);
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/hooks/${encodeURIComponent(input.hook_id)}/logs?${query.toString()}`
      )) as Parameters<typeof extractWebhookLogListResponse>[0];

      return extractWebhookLogListResponse(rawResponse);
    },
    async listGroupWebhookLogs(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["repository_id", "uuid", "created_after", "created_before"]);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/hooks/${encodeURIComponent(input.hook_id)}/logs?${query.toString()}`
      )) as Parameters<typeof extractWebhookLogListResponse>[0];

      return extractWebhookLogListResponse(rawResponse);
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
    async getProjectWebhookLog(input) {
      const rawResponse = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/hooks/${encodeURIComponent(input.hook_id)}/logs/${encodeURIComponent(input.log_id)}`
      )) as RepoRepositoryWebhookLog;
      const response = unwrapRepoPayload(rawResponse);

      return {
        ...response,
        id: response.id ?? input.log_id
      };
    },
    async getGroupWebhookLog(input) {
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/hooks/${encodeURIComponent(input.hook_id)}/logs/${encodeURIComponent(input.log_id)}`
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
    async listMergeRequestCommits(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["view"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/commits?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoMergeRequestCommit>(
        response as RepoMergeRequestCommit[] | Record<string, unknown>,
        ["commits", "items", "records"]
      );

      return {
        commits: extracted.items,
        total: extracted.total
      };
    },
    async showMergeRequestVotes(input) {
      const rawResponse = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/votes`
      );
      const response = unwrapRepoPayload(rawResponse) as Record<string, unknown>;
      const payload = (response.result && typeof response.result === "object"
        ? response.result
        : response) as RepoMergeRequestVotes;

      return {
        scores: payload.scores,
        merge_request_id: payload.merge_request_id,
        merge_request_creator: payload.merge_request_creator,
        votes: payload.votes ?? []
      };
    },
    async showMergeRequestStatistic(input) {
      const query = new URLSearchParams({ iids: input.iids });
      appendOptionalQuery(query, input, ["fields"]);
      const rawResponse = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/statistic?${query.toString()}`
      );
      const response = unwrapRepoPayload(rawResponse);
      if (typeof response === "string") {
        return { statistics: [], total: undefined };
      }

      const payload = response as RepoMergeRequestStatistic[] | Record<string, unknown>;
      const payloadObject = !Array.isArray(payload) ? payload : undefined;
      const resultValue = payloadObject?.result;
      const result = Array.isArray(payload)
        ? payload
        : Array.isArray(resultValue)
          ? resultValue as RepoMergeRequestStatistic[]
          : resultValue && typeof resultValue === "object"
            ? [resultValue as RepoMergeRequestStatistic]
            : Array.isArray(payloadObject?.statistics)
              ? payloadObject.statistics as RepoMergeRequestStatistic[]
              : [payloadObject as RepoMergeRequestStatistic];

      return {
        statistics: result,
        total: Array.isArray(payload)
          ? result.length
          : typeof payloadObject?.total === "number"
            ? payloadObject.total
            : result.length
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
    async updateMergeRequest(input) {
      const response = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}`,
        {
          title: input.title,
          state_event: input.state_event,
          assignee_ids: Array.isArray(input.assignee_ids) ? input.assignee_ids.join(",") : input.assignee_ids,
          reviewer_ids: Array.isArray(input.reviewer_ids) ? input.reviewer_ids.join(",") : input.reviewer_ids,
          description: input.description,
          milestone_id: input.milestone_id,
          labels: Array.isArray(input.labels) ? input.labels.join(",") : input.labels,
          force_remove_source_branch: input.force_remove_source_branch,
          squash: input.squash,
          squash_commit_message: input.squash_commit_message,
          work_item_ids: input.work_item_ids
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
        id: response.id ?? input.merge_request_iid,
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
    async createMergeRequest(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests`,
        {
          source_branch: input.source_branch,
          target_branch: input.target_branch,
          title: input.title,
          description: input.description,
          work_item_ids: input.work_item_ids,
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
    async showRepositoryStatisticsStatus(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/statistics-status`
      )) as RepoRepositoryStatisticsStatus;
    },
    async showLastPushEventInRepository(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/last-push-event`
      )) as RepoLastPushEvent;
    },
    async showRepositoryStatisticsSummary(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/statistics-summary`
      )) as RepoRepositoryStatisticsSummary;
    },
    async showRepoStatisticsSummary(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/stats/summary`
      )) as RepoStatsSummary;
    },
    async showRepoLastStatistics(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });

      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/stats/last-statistics?${query.toString()}`
      )) as RepoLastStatistics;
    },
    async listPersonalRecentPushEvents(input) {
      const query = new URLSearchParams();
      appendOptionalQuery(query, input as Record<string, unknown>, ["project_id", "size"]);
      const queryString = query.toString();
      const response = await _http.get(`/v4/user/recent-push-events${queryString ? `?${queryString}` : ""}`);
      const extracted = extractArrayWithOptionalTotal<RepoPersonalRecentPushEvent>(
        response as RepoPersonalRecentPushEvent[]
      );

      return {
        events: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryTemplates(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("type", input.type);
      appendOptionalQuery(query, input, [
        "platform",
        "pipeline",
        "search",
        "enter_type",
        "date_order",
        "language",
        "project_id"
      ]);
      const response = await _http.get(`/v4/repository-templates?${query.toString()}`);
      const extracted = extractArrayWithOptionalTotal<RepoRepositoryTemplate>(response as RepoRepositoryTemplate[]);

      return {
        templates: extracted.items,
        total: extracted.total
      };
    },
    async listSubmodules(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("sha", input.sha);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/submodules?${query.toString()}`
      );
      const extracted = extractArrayWithOptionalTotal<RepoSubmodule>(response as RepoSubmodule[]);

      return {
        submodules: extracted.items,
        total: extracted.total
      };
    },
    async showCommitStatistics(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });

      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/commit-statistics?${query.toString()}`
      )) as RepoCommitStatistics;
    },
    async listRepositoryLanguages(input) {
      return (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/languages`
      )) as RepoRepositoryLanguages;
    },
    async listRepositoryContributors(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["order_by", "sort", "ref_name", "skip_merge", "author"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/contributors?${query.toString()}`
      );
      const extracted = extractArrayWithOptionalTotal<RepoContributor>(response as RepoContributor[]);

      return {
        contributors: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryForks(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["order_by", "sort", "view"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/forks?${query.toString()}`
      );
      const extracted = extractArrayWithOptionalTotal<RepoForkRepository>(response as RepoForkRepository[]);

      return {
        repositories: extracted.items,
        total: extracted.total
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
    async listCurrentUserRepositories(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, [
        "order_by",
        "sort",
        "archived",
        "search",
        "starred",
        "membership",
        "user_created",
        "include_abnormal"
      ]);
      const response = await _http.get(`/v4/user/repositories?${query.toString()}`);
      const extracted = extractArrayFromFields<RepoRepositorySummary>(
        response as RepoRepositorySummary[] | Record<string, unknown>,
        ["repositories", "items", "records"]
      );

      return {
        repositories: extracted.items,
        total: extracted.total
      };
    },
    async listGroups(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, [
        "search",
        "all_available",
        "order_by",
        "sort",
        "starred",
        "owned"
      ]);
      const response = await _http.get(`/v4/groups/list?${query.toString()}`);
      const extracted = extractArrayFromFields<RepoRepositorySummary>(
        response as RepoRepositorySummary[] | Record<string, unknown>,
        ["groups", "items", "records"]
      );

      return {
        groups: extracted.items,
        total: extracted.total
      };
    },
    async listManageableGroups(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["scope"]);
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/manageable-groups?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositorySummary>(
        response as RepoRepositorySummary[] | Record<string, unknown>,
        ["groups", "items", "records"]
      );

      return {
        groups: extracted.items,
        total: extracted.total
      };
    },
    async listGroupRepositories(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["search", "order_by", "sort"]);
      const response = await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/repositories?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositorySummary>(
        response as RepoRepositorySummary[] | Record<string, unknown>,
        ["repositories", "items", "records"]
      );

      return {
        repositories: extracted.items,
        total: extracted.total
      };
    },
    async listGroupMembers(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("project_id", input.project_id);
      appendOptionalQuery(query, input, ["query", "join_way", "access_level"]);
      const response = await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/members/list?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryMember>(
        response as RepoRepositoryMember[] | Record<string, unknown>,
        ["members", "items", "records"]
      );

      return {
        members: extracted.items,
        total: extracted.total
      };
    },
    async listGroupAddableMembers(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("project_id", input.project_id);
      const response = await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/members/addable-list?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryMember>(
        response as RepoRepositoryMember[] | Record<string, unknown>,
        ["members", "users", "items", "records"]
      );

      return {
        members: extracted.items,
        total: extracted.total
      };
    },
    async listGroupUserGroups(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["search", "project_id"]);
      const response = await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/user-groups?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryUserGroup>(
        response as RepoRepositoryUserGroup[] | Record<string, unknown>,
        ["user_groups", "groups", "items", "records"]
      );

      return {
        groups: extracted.items,
        total: extracted.total
      };
    },
    async listGroupAddableUserGroups(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("project_id", input.project_id);
      const response = await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/user-groups/addable-list?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryUserGroup>(
        response as RepoRepositoryUserGroup[] | Record<string, unknown>,
        ["user_groups", "groups", "items", "records"]
      );

      return {
        groups: extracted.items,
        total: extracted.total
      };
    },
    async listGroupSubgroupsAndRepositories(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["filter", "order_by", "sort", "archived"]);
      const rawResponse = (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/subgroups-and-repositories?${query.toString()}`
      )) as Parameters<typeof extractProjectSubgroupsAndRepositoriesResponse>[0];

      return extractProjectSubgroupsAndRepositoriesResponse(rawResponse);
    },
    async showGroupInheritSetting(input) {
      const query = new URLSearchParams({
        setting_type: input.setting_type
      });

      return (await _http.get(
        `/v4/groups/${encodeURIComponent(input.group_id)}/inherit?${query.toString()}`
      )) as RepoGroupInheritSetting;
    },
    async listProjectMembers(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["query"]);
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/members?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryMember>(
        response as RepoRepositoryMember[] | Record<string, unknown>,
        ["members", "users", "items", "records"]
      );

      return {
        members: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryUserGroups(input) {
      const query = buildOffsetLimitQuery(input);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/user-groups?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryUserGroup>(
        response as RepoRepositoryUserGroup[] | Record<string, unknown>,
        ["user_groups", "groups", "items", "records"]
      );

      return {
        groups: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryMembers(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["permission", "action"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/members?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryMember>(
        response as RepoRepositoryMember[] | Record<string, unknown>,
        ["members", "items", "records"]
      );

      return {
        members: extracted.items,
        total: extracted.total
      };
    },
    async showBlobs(input) {
      const query = new URLSearchParams({ blob_id: input.blob_id });
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/blobs?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoBlob>(response as RepoBlob[] | Record<string, unknown>, [
        "blobs",
        "items",
        "records"
      ]);

      return {
        blobs: extracted.items,
        total: extracted.total
      };
    },
    async showDiffLines(input) {
      const query = new URLSearchParams({
        file_path: input.file_path,
        commit_id: input.commit_id,
        start: String(input.start),
        end: String(input.end)
      });
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/diff-lines?${query.toString()}`
      ));

      if (typeof response === "string") {
        return { text: response };
      }

      const payload = response as Record<string, unknown>;
      const result = payload.result && typeof payload.result === "object"
        ? payload.result as RepoDiffLines
        : undefined;

      return {
        text: typeof payload.text === "string" ? payload.text : result?.text
      };
    },
    async listRefs(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["type"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/refs?${query.toString()}`
      );
      const extracted = extractArrayFromFields<string>(response as string[] | Record<string, unknown>, [
        "refs",
        "items",
        "records"
      ]);

      return {
        refs: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryTrees(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["ref", "path", "recursive"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/trees?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoTreeObject>(response as RepoTreeObject[] | Record<string, unknown>, [
        "trees",
        "items",
        "records"
      ]);

      return {
        trees: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryLogsTree(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["ref"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/logs-tree?${query.toString()}`
      );
      const extracted = extractArrayWithOptionalTotal<RepoLogTreeObject>(response as RepoLogTreeObject[]);

      return {
        trees: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryFileList(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["ref_name", "search"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/file-list?${query.toString()}`
      );
      const extracted = extractArrayFromFields<string>(response as string[] | Record<string, unknown>, [
        "files",
        "file_list",
        "items",
        "records"
      ]);

      return {
        files: extracted.items,
        total: extracted.total
      };
    },
    async getRepositoryFileContentV4(input) {
      const query = new URLSearchParams({
        file_path: input.file_path,
        sha: input.sha
      });
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/file-content?${query.toString()}`
      );

      return {
        file_path: input.file_path,
        sha: input.sha,
        content: typeof response === "string" ? response : JSON.stringify(response)
      };
    },
    async getRepositoryBlame(input) {
      const query = new URLSearchParams({
        file_path: input.file_path,
        sha: input.sha
      });
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/blame?${query.toString()}`
      );
      const extracted = extractArrayWithOptionalTotal<RepoBlame>(response as RepoBlame[]);

      return {
        blames: extracted.items,
        total: extracted.total
      };
    },
    async showRepositoryReadmeFile(input) {
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/readme-file`
      ));
      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoReadmeFile | undefined;

      return payload ?? {};
    },
    async listCommitAssociatedRefs(input) {
      const query = buildOffsetLimitQuery(input);
      query.set("type", input.type);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/commits/${encodeURIComponent(input.sha)}/refs?${query.toString()}`
      );
      const extracted = extractArrayFromFields<string>(response as string[] | Record<string, unknown>, [
        "refs",
        "branches",
        "tags",
        "items",
        "records"
      ]);

      return {
        refs: extracted.items,
        total: extracted.total
      };
    },
    async showReviewSetting(input) {
      const query = new URLSearchParams();
      appendOptionalQuery(query, input, ["with_default_review_categories"]);
      const queryString = query.toString();
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/review-setting${queryString ? `?${queryString}` : ""}`
      ));
      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoReviewSetting | undefined;

      return payload ?? {};
    },
    async showNoteRequiredAttributes(input) {
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/setting/note-required-attributes`
      ));
      if (Array.isArray(response)) {
        return { note_required_attributes: response as RepoRequiredAttribute[] };
      }

      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoNoteRequiredAttributes | RepoRequiredAttribute[] | undefined;

      return Array.isArray(payload) ? { note_required_attributes: payload } : payload ?? {};
    },
    async listDefaultReviewCategories() {
      const response = unwrapRepoPayload(await _http.get("/v4/default-review-categories"));
      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoDefaultReviewCategories | undefined;

      return payload ?? {};
    },
    async listRepositoryReviews(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, [
        "noteable_type",
        "search",
        "start_date",
        "end_date",
        "only_count",
        "review_categories",
        "review_modules",
        "severity",
        "assignee_id",
        "proposer_id",
        "target_branch",
        "include_reply",
        "order_by",
        "sort"
      ]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/reviews?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoRepositoryReview>(response as RepoRepositoryReview[] | Record<string, unknown>, [
        "reviews",
        "items",
        "records"
      ]);

      return {
        reviews: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryReviewAuthors(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["noteable_type", "resolved_status", "reviewers_filter"]);
      const response = await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/review-authors?${query.toString()}`
      );
      const extracted = extractArrayFromFields<RepoReviewUserBasic>(response as RepoReviewUserBasic[] | Record<string, unknown>, [
        "authors",
        "users",
        "items",
        "records"
      ]);

      return {
        authors: extracted.items,
        total: extracted.total
      };
    },
    async listRepositoryNavigationReferences(input) {
      const query = new URLSearchParams({
        symbol: input.symbol,
        language: input.language,
        blob: input.blob,
        file_path: input.file_path
      });
      appendOptionalQuery(query, input, ["path", "revision", "ref"]);
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/nav/references?${query.toString()}`
      ));
      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoNavigationReferences;

      return {
        result: payload.result,
        message: payload.message,
        defs: payload.defs ?? [],
        refs: payload.refs ?? []
      };
    },
    async showRepositoryNavigationOutline(input) {
      const query = new URLSearchParams({
        language: input.language,
        blob: input.blob,
        file_path: input.file_path
      });
      appendOptionalQuery(query, input, ["revision", "ref"]);
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/nav/outline?${query.toString()}`
      ));
      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoNavigationOutline;

      return {
        result: payload.result,
        message: payload.message,
        file_path: payload.file_path,
        revision: payload.revision,
        symbols: payload.symbols ?? []
      };
    },
    async showRepositoryNavigationSchema(input) {
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/nav/schema`
      ));
      const payload = (typeof response === "object" && response && "schema" in response
        ? (response as { schema?: RepoNavigationSchema }).schema
        : typeof response === "object" && response && "result" in response && typeof response.result === "object"
          ? (response.result as { schema?: RepoNavigationSchema }).schema ?? response.result
          : response) as RepoNavigationSchema | undefined;

      return payload ?? {};
    },
    async showRepositoryNavigationLanguage(input) {
      const response = unwrapRepoPayload(await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/nav/language`
      ));
      const payload = (typeof response === "object" && response && "result" in response && typeof response.result === "object"
        ? response.result
        : response) as RepoNavigationLanguageInfo;

      return {
        result: payload.result,
        message: payload.message,
        language_list: payload.language_list ?? []
      };
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
    async listUserGpgKeys(input) {
      const query = new URLSearchParams();
      appendOptionalQuery(query, input as Record<string, unknown>, ["query"]);
      const rawResponse = (await _http.get(
        `/v4/user/gpg-keys${query.toString() ? `?${query.toString()}` : ""}`
      )) as Parameters<typeof extractUserGpgKeysResponse>[0];

      return extractUserGpgKeysResponse(rawResponse);
    },
    async listUserSshKeys(input) {
      const query = buildOffsetLimitQuery(input);
      appendOptionalQuery(query, input, ["query"]);
      const rawResponse = (await _http.get(
        `/v4/user/keys?${query.toString()}`
      )) as Parameters<typeof extractUserSshKeysResponse>[0];

      return extractUserSshKeysResponse(rawResponse);
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
