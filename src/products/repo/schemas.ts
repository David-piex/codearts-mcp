import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

const repositoryNameSchema = z
  .string()
  .min(1)
  .max(256)
  .regex(
    /^[A-Za-z0-9_][A-Za-z0-9_.-]*$/,
    "Repository name must start with a letter, number, or underscore and use letters, numbers, dots, hyphens, or underscores"
  )
  .refine((value) => !value.endsWith(".git") && !value.endsWith(".atom") && !value.endsWith("."), {
    message: "Repository name must not end with .git, .atom, or a dot"
  });

export const repoImportSourceType = z.enum([
  "gitee",
  "self_managed_gitlab",
  "gitlab",
  "github",
  "git",
  "svn",
  "coding",
  "bitbucket",
  "gerrit",
  "codeup"
]);

export const repoListRepositoriesInput = pagingSchema.extend({
  project_id: idSchema
});

export const repoListCurrentUserRepositoriesInput = pagingSchema.extend({
  page_size: z.number().int().positive().max(100).default(20),
  order_by: z.enum(["created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  archived: z.boolean().optional(),
  search: z.string().min(1).max(256).optional(),
  starred: z.boolean().optional(),
  membership: z.boolean().optional(),
  user_created: z.boolean().optional(),
  include_abnormal: z.boolean().optional()
});

export const repoListGroupRepositoriesInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).max(256).optional(),
  order_by: z.enum(["id", "name", "created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional()
});

export const repoListRepositoryUserGroupsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).max(256).optional()
});

export const repoListRepositoryMembersInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).max(256).optional(),
  permission: z.enum(["repository", "code", "member", "branch", "tag", "mr", "label"]).optional(),
  action: z.string().min(1).max(64).optional()
});

export const repoListProtectedBranchesInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).optional()
});

const protectedBranchActionSchema = z.object({
  action: z.enum(["push", "merge"]),
  enable: z.boolean().optional(),
  user_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  user_team_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  related_role_ids: z.array(z.string().min(1)).optional(),
  addition_switchers: z.array(z.object({
    name: z.enum(["allowed_force_push"]),
    enable: z.boolean()
  })).optional()
});

export const repoListProjectProtectedBranchesInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).optional(),
  user_actions: z.boolean().optional(),
  view: z.enum(["simple"]).optional()
});

export const repoCreateProjectProtectedBranchesInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).max(1000),
  actions: z.array(protectedBranchActionSchema).optional(),
  dry_run: z.boolean().default(true)
});

export const repoListGroupProtectedBranchesInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).optional(),
  user_actions: z.boolean().optional()
});

export const repoGetProtectedBranchInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1)
});

export const repoBatchCreateProtectedBranchesInput = z.object({
  repository_id: idSchema,
  names: z.array(z.string().min(1)).min(1),
  actions: z.array(protectedBranchActionSchema).optional(),
  dry_run: z.boolean().default(true)
});

export const repoBatchUpdateProtectedBranchesInput = z.object({
  repository_id: idSchema,
  names: z.array(z.string().min(1)).min(1),
  actions: z.array(protectedBranchActionSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoBulkDeleteProtectedBranchesInput = z.object({
  repository_id: idSchema,
  names: z.array(z.string().min(1)).min(1),
  dry_run: z.boolean().default(true)
});

export const repoUpdateProtectedBranchInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1),
  actions: z.array(protectedBranchActionSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoDeleteProtectedBranchInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

const protectedTagActionSchema = z.object({
  action: z.enum(["create"]).default("create"),
  enable: z.boolean().optional(),
  user_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  user_team_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  related_role_ids: z.array(z.string().min(1)).optional()
});

const projectProtectedTagActionSchema = z.object({
  action: z.enum(["read", "create-delete", "create"]).default("create"),
  enable: z.boolean().optional(),
  user_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  user_names: z.array(z.string().min(1)).optional(),
  user_team_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  user_team_names: z.array(z.string().min(1)).optional(),
  related_role_ids: z.array(z.string().min(1)).optional()
});

const protectedRefsUserGroupsListInput = pagingSchema.extend({
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).optional()
});

export const repoCreateProjectProtectedTagsInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).max(1000),
  actions: z.array(projectProtectedTagActionSchema).optional(),
  dry_run: z.boolean().default(true)
});

export const repoListProjectProtectedTagsInput = z.object({
  project_id: idSchema
});

export const repoListRepositoryProtectedRefsUserGroupsInput = protectedRefsUserGroupsListInput.extend({
  repository_id: idSchema
});

export const repoListGroupProtectedRefsUserGroupsInput = protectedRefsUserGroupsListInput.extend({
  group_id: idSchema
});

export const repoListProjectProtectedRefsUserGroupsInput = protectedRefsUserGroupsListInput.extend({
  project_id: idSchema
});

export const repoListProtectedTagsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).optional()
});

export const repoGetProtectedTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1)
});

export const repoBatchCreateProtectedTagsInput = z.object({
  repository_id: idSchema,
  names: z.array(z.string().min(1)).min(1),
  actions: z.array(protectedTagActionSchema).optional(),
  dry_run: z.boolean().default(true)
});

export const repoBatchUpdateProtectedTagsInput = z.object({
  repository_id: idSchema,
  names: z.array(z.string().min(1)).min(1),
  actions: z.array(protectedTagActionSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoBulkDeleteProtectedTagsInput = z.object({
  repository_id: idSchema,
  names: z.array(z.string().min(1)).min(1),
  dry_run: z.boolean().default(true)
});

export const repoUpdateProtectedTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1),
  actions: z.array(protectedTagActionSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoDeleteProtectedTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoListRepositoryLabelsInput = pagingSchema.extend({
  repository_id: idSchema
});

export const repoListRepositoryDeployKeysInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListGroupDeployKeysInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListProjectDeployKeysInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

const filePushPermissionActionSchema = z.object({
  action: z.enum(["push"]).default("push"),
  enable: z.boolean().optional(),
  user_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  user_team_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  related_role_ids: z.array(z.string().min(1)).optional()
});

const filePushPermissionMutationSchema = z.object({
  id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  path: z.string().min(1).optional(),
  actions: z.array(filePushPermissionActionSchema).optional()
});

const repositoryResourceNameSchema = z.enum(["repository", "code", "member", "branch", "tag", "mr", "label"]);
const projectSettingNameSchema = z.enum([
  "protected_branches",
  "protected_tags",
  "repository_settings",
  "push_rules",
  "merge_requests",
  "e2e_settings",
  "watermark",
  "webhook_settings",
  "mr_branch_policies",
  "reviews",
  "deploy_keys"
]);
const projectInheritModeSchema = z.string().min(1);

const resourcePermissionDetailSchema = z.object({
  permission_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  enabled: z.boolean().optional()
});

const resourcePermissionUpdateSchema = z.object({
  role_id: z.string().min(1).optional(),
  role_name: z.string().min(1).optional(),
  permissions: z.array(resourcePermissionDetailSchema).optional()
});

export const repoListRepositoryFilePushPermissionsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).optional()
});

export const repoCreateFilePushPermissionInput = z.object({
  repository_id: idSchema,
  path: z.string().min(1),
  actions: z.array(filePushPermissionActionSchema).optional(),
  dry_run: z.boolean().default(true)
});

export const repoBatchUpdateRepositoryFilePushPermissionsInput = z.object({
  repository_id: idSchema,
  permissions: z.array(filePushPermissionMutationSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoBatchDeleteRepositoryFilePushPermissionsInput = z.object({
  repository_id: idSchema,
  ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).min(1),
  dry_run: z.boolean().default(true)
});

export const repoShowProjectWatermarkInput = z.object({
  project_id: idSchema
});

export const repoUpdateProjectWatermarkInput = z.object({
  project_id: idSchema,
  watermark: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const repoListProjectSubgroupsAndRepositoriesInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  filter: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  order_by: z.enum(["id", "name", "created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  archived: z.boolean().optional()
});

export const repoListRepositoryResourcePermissionsInput = pagingSchema.extend({
  repository_id: idSchema,
  resource_name: repositoryResourceNameSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoUpdateRepositoryResourcePermissionsInput = z.object({
  repository_id: idSchema,
  resource_name: repositoryResourceNameSchema,
  data: z.array(resourcePermissionUpdateSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoUpdateGroupResourcePermissionsInput = z.object({
  group_id: idSchema,
  resource_id: idSchema,
  data: z.array(resourcePermissionUpdateSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoShowResourcePermissionsInput = pagingSchema.extend({
  group_id: idSchema,
  resource_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoUpdateRepositoryPermissionInheritEnabledInput = z.object({
  repository_id: idSchema,
  inherit_parent_permission: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const repoShowRepositoryPermissionInheritEnabledInput = z.object({
  repository_id: idSchema
});

export const repoShowNotificationSubscriptionInput = z.object({
  repository_id: idSchema,
  type: z.enum(["internal_message", "email", "qyweixin", "feishu", "dingding"])
});

export const repoShowNotificationSubscriptionsStatusInput = z.object({
  repository_id: idSchema
});

export const repoShowRepositoryInheritSettingSourceInput = z.object({
  repository_id: idSchema,
  name: z.enum(["protected_branches", "protected_tags", "merge_requests"])
});

export const repoShowRepositoryInheritSettingInput = z.object({
  repository_id: idSchema
});

export const repoShowRepositoryGeneralPolicyInput = z.object({
  repository_id: idSchema
});

export const repoShowRepositoryGeneralCommitRuleInput = z.object({
  repository_id: idSchema
});

export const repoListRepositoryCommitRulesInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoShowRepositoryWatermarkInput = z.object({
  repository_id: idSchema
});

export const repoShowUserRefPermissionInput = z.object({
  repository_id: idSchema,
  target_ref: z.string().min(1).max(210),
  action: z.enum(["read", "review", "approval", "create-change", "merge", "create-delete", "push"]).optional(),
  change_request_iid: z.union([z.string().min(1), z.number().int().positive()]).optional()
});

export const repoListPersonalRecentPushEventsInput = z.object({
  project_id: idSchema.optional(),
  size: z.number().int().positive().max(100).optional()
});

export const repoListRepositoryTemplatesInput = pagingSchema.extend({
  page_size: z.number().int().positive().max(100).default(20),
  type: z.enum(["SYSTEM,USER", "SYSTEM", "USER"]).default("SYSTEM,USER"),
  platform: z.string().min(1).max(64).optional(),
  pipeline: z.enum(["SupportPipeline", "UnsupportedPipeline"]).optional(),
  search: z.string().max(50).optional(),
  enter_type: z.string().min(1).max(64).optional(),
  date_order: z.enum(["up", "down"]).optional(),
  language: z.string().min(1).max(64).optional(),
  project_id: idSchema.optional()
});

export const repoShowProjectSettingsInheritCfgInput = z.object({
  project_id: idSchema
});

export const repoUpdateProjectSettingsInheritCfgInput = z.object({
  project_id: idSchema,
  data: z.array(z.object({
    name: projectSettingNameSchema,
    inherit_mod: projectInheritModeSchema
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const repoShowProjectMemberSettingInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoShowProjectGeneralPolicyInput = z.object({
  project_id: idSchema
});

export const repoShowProjectsGeneralPolicyInput = z.object({
  project_id: idSchema
});

export const repoUpdateProjectGeneralPolicyInput = z.object({
  project_id: idSchema,
  disable_fork: z.boolean().optional(),
  branch_name_regex: z.string().optional(),
  tag_name_regex: z.string().optional(),
  generate_pre_merge_ref: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const repoListItemCommitsInput = pagingSchema.extend({
  project_id: idSchema,
  item_id: z.string().min(1).max(128),
  type: z.enum(["commit", "branch", "mergerequest"]).optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoCheckRepositoryDeployKeyInput = z.object({
  repository_id: idSchema,
  key: z.string().min(1).max(5000),
  dry_run: z.boolean().default(true)
});

export const repoCheckGroupDeployKeyInput = z.object({
  group_id: idSchema,
  key: z.string().min(1).max(5000),
  dry_run: z.boolean().default(true)
});

export const repoRemoveRepositoryDeployKeyInput = z.object({
  repository_id: idSchema,
  key_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListBranchRelatedWorkItemsInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1).max(200)
});

export const repoAssociateBranchWorkItemsInput = z.object({
  project_id: idSchema,
  repository_id: idSchema,
  branch: z.string().min(1).max(200),
  work_item_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const repoListRepositoryWorkItemsInput = pagingSchema.extend({
  repository_id: idSchema,
  project_id: idSchema,
  is_ipd: z.boolean(),
  subject: z.string().min(1).max(200).optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoShowRepositoryE2eSettingInput = z.object({
  repository_id: idSchema,
  take_effect: z.boolean().optional()
});

export const repoShowGroupE2eSettingInput = z.object({
  group_id: idSchema
});

export const repoShowProjectE2eSettingInput = z.object({
  project_id: idSchema
});

const tenantPagingSchema = z.object({
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().positive().max(100).default(20)
});

const tenantRepositoryStatusSchema = z.union([z.literal(0), z.literal(3), z.literal(4), z.literal(5), z.literal(7)]);
const tenantRepositorySortFieldSchema = z.enum([
  "owner",
  "capacity",
  "status",
  "create_time",
  "member_number",
  "repository_name"
]);

export const repoListTenantRepositoriesInput = tenantPagingSchema.extend({
  repository_name: z.string().min(1).max(128).optional(),
  member_number: z.number().int().nonnegative().optional(),
  status: tenantRepositoryStatusSchema.optional(),
  owner: z.string().min(1).max(128).optional(),
  created_after: z.string().min(1).optional(),
  created_before: z.string().min(1).optional(),
  sort: z.enum(["asc", "desc"]).default("desc"),
  sort_field: tenantRepositorySortFieldSchema.default("create_time"),
  locked: z.boolean().optional()
});

export const repoShowTenantDevelopModeInput = z.object({}).default({});

export const repoShowTenantRepoEncryptionSettingInput = z.object({
  tenant_id: idSchema
});

export const repoListTenantCMKsInput = tenantPagingSchema.extend({
  tenant_id: idSchema
});

export const repoListTenantEncryptedRepositoriesInput = tenantPagingSchema.extend({
  tenant_id: idSchema
});

export const repoShowTenantKMSGrantInput = z.object({
  tenant_id: idSchema
});

export const repoShowProjectTenantSettingsInput = z.object({
  project_id: idSchema.optional()
});

export const repoListTenantTrustedIpAddressesInput = tenantPagingSchema;

export const repoExportTenantRepositoriesInput = z.object({
  repository_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoUpdateTenantRepoEncryptionSettingInput = z.object({
  tenant_id: idSchema,
  encryption_type: z.string().min(1).optional(),
  default_encryption_enabled: z.boolean().optional(),
  cmk_key_name: z.string().min(1).optional(),
  cmk_key_id: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoCreateTenantKMSGrantInput = z.object({
  tenant_id: idSchema,
  key: z.union([z.string(), z.null()]).optional(),
  title: z.union([z.string(), z.number()]).optional(),
  dry_run: z.boolean().default(true)
});

export const repoAddTenantTrustedIpAddressInput = z.object({
  ip_type: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
  ip_start: z.string().min(1).optional(),
  ip_end: z.string().min(1).optional(),
  view_flag: z.union([z.literal(0), z.literal(1)]).optional(),
  download_flag: z.union([z.literal(0), z.literal(1)]).optional(),
  upload_flag: z.union([z.literal(0), z.literal(1)]).optional(),
  remark: z.string().max(200).optional(),
  dry_run: z.boolean().default(true)
});

export const repoUpdateTenantTrustedIpAddressInput = repoAddTenantTrustedIpAddressInput.extend({
  ip_id: idSchema
});

export const repoDeleteTenantTrustedIpAddressInput = z.object({
  ip_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListEventsInput = pagingSchema.extend({
  repository_id: idSchema
});

export const repoListRepositoryWebhooksInput = pagingSchema.extend({
  repository_id: idSchema,
  include_system: z.boolean().optional()
});

const repoRepositoryWebhookPayloadInput = z.object({
  url: z.string().min(1),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  token: z.string().min(1).optional(),
  token_type: z.string().min(1).optional(),
  push_events: z.boolean().optional(),
  tag_push_events: z.boolean().optional(),
  merge_requests_events: z.boolean().optional(),
  issues_events: z.boolean().optional(),
  note_events: z.boolean().optional(),
  job_events: z.boolean().optional(),
  pipeline_events: z.boolean().optional(),
  wiki_page_events: z.boolean().optional(),
  enable_ssl_verification: z.boolean().optional(),
  branch_filter_strategy: z.string().min(1).optional(),
  push_events_branch_regex_filter: z.string().min(1).optional()
});

export const repoCreateRepositoryWebhookInput = repoRepositoryWebhookPayloadInput.extend({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoGetRepositoryWebhookInput = z.object({
  repository_id: idSchema,
  hook_id: idSchema
});

export const repoUpdateRepositoryWebhookInput = repoRepositoryWebhookPayloadInput.partial().extend({
  repository_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteRepositoryWebhookInput = z.object({
  repository_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListRepositoryWebhookLogsInput = pagingSchema.extend({
  repository_id: idSchema,
  hook_id: idSchema
});

export const repoGetRepositoryWebhookLogInput = z.object({
  repository_id: idSchema,
  hook_id: idSchema,
  log_id: idSchema
});

export const repoListTagsInput = pagingSchema.extend({
  repository_id: idSchema
});

export const repoCreateTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1),
  ref: z.string().min(1),
  message: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const repoCreateRepositoryInput = z.object({
  project_uuid: idSchema,
  name: repositoryNameSchema,
  import_members: z.number().int().min(0).max(1).optional(),
  template_id: z.string().min(1).optional(),
  visibility_level: z.union([z.literal(0), z.literal(20)]).optional(),
  import_url: z.string().min(1).optional(),
  description: z.string().optional(),
  gitignore_id: z.string().min(1).optional(),
  license_id: z.number().int().positive().optional(),
  enable_readme: z.union([z.boolean(), z.number().int().min(0).max(1)]).optional(),
  caller: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoImportRepositoryInput = z.object({
  project_uuid: idSchema,
  name: repositoryNameSchema,
  source_type: repoImportSourceType,
  source_url: z.string().url().refine((value) => new URL(value).protocol === "https:", {
    message: "Repository import source_url must be an HTTPS URL"
  }),
  source_repo_id: z.string().min(1).optional(),
  source_full_name: z.string().min(1).optional(),
  source_visibility: z.string().min(1).optional(),
  source_username: z.string().min(1).optional(),
  source_token: z.string().min(1).optional(),
  import_type: z.string().min(1).default("git"),
  fetch_refs_type: z.enum(["all", "default"]).default("default"),
  endpoint_uuid: z.string().optional(),
  codecheck: z.number().int().min(0).max(1).default(0),
  group_id: z.union([z.string().min(1), z.number().int().positive(), z.null()]).optional(),
  mirror_repository: z.number().int().min(0).max(1).default(0),
  security_level: z.string().optional(),
  import_members: z.number().int().min(0).max(1).optional(),
  visibility_level: z.union([z.literal(0), z.literal(20)]).optional(),
  description: z.string().optional(),
  caller: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
}).refine((input) => !input.source_token || Boolean(input.source_username), {
  message: "source_username is required when source_token is provided",
  path: ["source_username"]
});

export const repoListPersonalRepositoryImportRecordsInput = pagingSchema.extend({
  state: z.enum(["finished", "fail", "importing"]).optional(),
  source_type: repoImportSourceType.optional(),
  created_after: z.string().min(1).optional(),
  created_before: z.string().min(1).optional(),
  finished_after: z.string().min(1).optional(),
  finished_before: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  order_by: z.enum(["created_at", "source_repo_name", "size"]).optional(),
  sort: z.enum(["asc", "desc"]).optional()
});

export const repoListImpersonationTokensInput = pagingSchema.extend({
  page_size: z.number().int().positive().max(100).default(20),
  state: z.enum(["all", "active", "inactive"]).optional(),
  search: z.string().min(1).optional()
});

export const repoAssociateRemoteMirrorInput = z.object({
  repository_id: idSchema,
  url: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoStartRemoteMirrorSynchronizationInput = z.object({
  repository_id: idSchema,
  username: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
  endpoint_uuid: z.string().min(1).optional(),
  force_fetch: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const repoGetRemoteMirrorInput = z.object({
  repository_id: idSchema
});

export const repoUpdateRemoteMirrorInput = z.object({
  repository_id: idSchema,
  url: z.string().min(1).optional(),
  sync_branch_type: z.enum(["all", "default"]).optional(),
  mirroring_enabled: z.boolean().optional(),
  endpoint_uuid: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoDeleteTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoCreateMergeRequestInput = z.object({
  repository_id: idSchema,
  source_branch: z.string().min(1),
  target_branch: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  target_project_id: idSchema.optional(),
  assignee_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  reviewer_ids: z.array(z.union([z.string().min(1), z.number().int().positive()])).optional(),
  remove_source_branch: z.boolean().optional(),
  squash: z.boolean().optional(),
  draft: z.boolean().optional(),
  labels: z.union([z.string().min(1), z.array(z.string().min(1))]).optional(),
  milestone_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  dry_run: z.boolean().default(true)
});

export const repoListMergeRequestChangesInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoListMergeRequestCommitsInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  view: z.enum(["simple"]).optional()
});

export const repoShowMergeRequestVotesInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoShowMergeRequestStatisticInput = z.object({
  repository_id: idSchema,
  iids: z.string().min(1).max(2000),
  fields: z.string().min(1).max(256).optional()
});

export const repoListMergeRequestDiscussionsInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoCreateMergeRequestDiscussionInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  body: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoMergeMergeRequestInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  squash: z.boolean().optional(),
  force_merge: z.boolean().optional(),
  sha: z.string().min(1).optional(),
  merge_commit_message: z.string().min(1).optional(),
  squash_commit_message: z.string().min(1).optional(),
  should_remove_source_branch: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const repoGetFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1),
  branch: z.string().min(1)
});

export const repoListBranchesInput = pagingSchema.extend({
  repository_id: idSchema
});

export const repoGetBranchInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1)
});

export const repoCompareRefsInput = z.object({
  repository_id: idSchema,
  from: z.string().min(1),
  to: z.string().min(1),
  straight: z.boolean().optional(),
  ignore_whitespace_change: z.boolean().optional(),
  view: z.string().min(1).optional()
});

export const repoGetTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1)
});

export const repoListCommitsInput = pagingSchema.extend({
  repository_id: idSchema,
  ref_name: z.string().optional(),
  since: z.string().optional(),
  until: z.string().optional(),
  order_by_date: z.boolean().optional(),
  with_stats: z.boolean().optional()
});

export const repoGetCommitInput = z.object({
  repository_id: idSchema,
  commit_sha: idSchema
});

export const repoGetRepositoryInput = z.object({
  repository_id: idSchema
});

export const repoShowRepositoryStatisticsStatusInput = z.object({
  repository_id: idSchema
});

export const repoShowLastPushEventInRepositoryInput = z.object({
  repository_id: idSchema
});

export const repoShowRepositoryStatisticsSummaryInput = z.object({
  repository_id: idSchema
});

export const repoShowRepoStatisticsSummaryInput = z.object({
  repository_id: idSchema
});

export const repoShowRepoLastStatisticsInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1).max(2000)
});

export const repoListSubmodulesInput = pagingSchema.extend({
  repository_id: idSchema,
  sha: z.string().min(1),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoShowCommitStatisticsInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1).max(2000)
});

export const repoListRepositoryLanguagesInput = z.object({
  repository_id: idSchema
});

export const repoListRepositoryContributorsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  order_by: z.enum(["name", "email", "commits"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  ref_name: z.string().min(1).max(200).optional(),
  skip_merge: z.boolean().optional(),
  author: z.string().min(1).optional()
});

export const repoListRepositoryForksInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  order_by: z.enum(["created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  view: z.enum(["basic", "least"]).optional()
});

export const repoListMergeRequestsInput = pagingSchema.extend({
  repository_id: idSchema,
  state: z.enum(["all", "opened", "closed", "merged"]).optional()
});

export const repoGetMergeRequestInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoReviewMergeRequestInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  action_type: z.enum(["approve", "reject", "reset"]),
  approver_comment: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const repoCloseMergeRequestInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  dry_run: z.boolean().default(true)
});
