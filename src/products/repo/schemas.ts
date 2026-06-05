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

export const repoListGroupsInput = pagingSchema.extend({
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).max(256).optional(),
  all_available: z.boolean().optional(),
  order_by: z.enum(["id", "name", "path", "created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  starred: z.boolean().optional(),
  owned: z.boolean().optional()
});

export const repoListManageableGroupsInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  scope: z.enum(["group", "repository"]).default("repository")
});

export const repoListGroupRepositoriesInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).max(256).optional(),
  order_by: z.enum(["id", "name", "created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional()
});

export const repoListGroupMembersInput = pagingSchema.extend({
  group_id: idSchema,
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  query: z.string().min(1).max(256).optional(),
  join_way: z.enum(["domain", "normal", "inherit"]).optional(),
  access_level: z.union([z.string().min(1), z.number().int()]).optional()
});

export const repoListGroupAddableMembersInput = pagingSchema.extend({
  group_id: idSchema,
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListGroupUserGroupsInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  search: z.string().min(1).max(256).optional(),
  project_id: idSchema.optional()
});

export const repoListGroupAddableUserGroupsInput = pagingSchema.extend({
  group_id: idSchema,
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListGroupSubgroupsAndRepositoriesInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  filter: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  order_by: z.enum(["id", "name", "created_at", "updated_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  archived: z.boolean().optional()
});

export const repoShowGroupInheritSettingInput = z.object({
  group_id: idSchema,
  setting_type: z.enum([
    "protected_branches",
    "protected_tags",
    "push_rules",
    "merge_requests",
    "mr_branch_policies",
    "reviews",
    "e2e_settings",
    "webhook_settings",
    "deploy_keys",
    "watermark",
    "repository_settings"
  ])
});

export const repoListProjectMembersInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  query: z.string().min(1).max(256).optional()
});

export const repoListProductPermissionResourcesGrantedUsersInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  query: z.string().min(1).max(256).optional()
});

export const repoBatchValidateUserGroupPermissionsInput = z.object({
  items: z.array(z.object({
    group_id: idSchema,
    project_id: idSchema.optional(),
    group_name: z.string().min(1).max(256).optional()
  })).min(1)
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

export const repoShowBlobsInput = z.object({
  repository_id: idSchema,
  blob_id: z.string().min(1).max(2000)
});

export const repoShowDiffLinesInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  commit_id: z.string().min(1).max(40),
  start: z.number().int().positive(),
  end: z.number().int().positive()
}).refine((value) => value.end >= value.start, {
  message: "end must be greater than or equal to start",
  path: ["end"]
}).refine((value) => value.end - value.start + 1 <= 1000, {
  message: "diff line range must not exceed 1000 lines",
  path: ["end"]
});

export const repoListRefsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  type: z.enum(["branch", "tag"]).default("branch"),
  search: z.string().min(1).max(256).optional()
});

export const repoListRepositoryTreesInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  ref: z.string().min(1).max(2000).optional(),
  path: z.string().min(1).max(100000).optional(),
  recursive: z.boolean().optional()
});

export const repoListRepositoryLogsTreeInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  ref: z.string().min(1).max(2000).optional()
});

export const repoListRepositoryFileListInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  ref_name: z.string().min(1).max(200).optional(),
  search: z.string().min(1).max(256).optional()
});

export const repoGetRepositoryFileContentV4Input = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  sha: z.string().min(1).max(2000)
});

export const repoGetRepositoryBlameInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  sha: z.string().min(1).max(2000)
});

export const repoShowRepositoryReadmeFileInput = z.object({
  repository_id: idSchema
});

export const repoListCommitAssociatedRefsInput = pagingSchema.extend({
  repository_id: idSchema,
  sha: z.string().min(1).max(2000),
  page_size: z.number().int().positive().max(100).default(20),
  type: z.enum(["branch", "tag"])
});

export const repoShowReviewSettingInput = z.object({
  repository_id: idSchema,
  with_default_review_categories: z.boolean().optional()
});

export const repoShowGroupReviewSettingsInput = z.object({
  group_id: idSchema
});

export const repoShowProjectReviewSettingsInput = z.object({
  project_id: idSchema
});

export const repoShowNoteRequiredAttributesInput = z.object({
  repository_id: idSchema
});

export const repoShowGroupNoteRequiredAttributesInput = z.object({
  group_id: idSchema
});

export const repoListProjectNoteRequiredAttributesInput = z.object({
  project_id: idSchema
});

export const repoListDefaultReviewCategoriesInput = z.object({});

const repoReviewSettingMutationBodySchema = z.object({
  categories_and_modules_enabled: z.boolean().optional(),
  review_modules: z.array(z.string().min(1).max(256)).optional(),
  secondary_category_enabled: z.boolean().optional(),
  review_default_categories: z.array(z.string().min(1).max(256)).optional(),
  review_customized_categories: z.array(z.string().min(1).max(256)).optional(),
  is_assignee_id_required: z.boolean().optional(),
  is_review_categories_required: z.boolean().optional(),
  is_review_modules_required: z.boolean().optional()
});

const repoNoteRequiredAttributesMutationBodySchema = z.object({
  is_assignee_id_required: z.boolean().optional(),
  is_review_categories_required: z.boolean().optional(),
  is_review_modules_required: z.boolean().optional()
});

export const repoCreateReviewSettingInput = repoReviewSettingMutationBodySchema.extend({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateGroupReviewSettingsInput = repoReviewSettingMutationBodySchema.extend({
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateProjectReviewSettingsInput = repoReviewSettingMutationBodySchema.extend({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateGroupNoteRequiredAttributesInput = repoNoteRequiredAttributesMutationBodySchema.extend({
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateProjectNoteRequiredAttributesInput = repoNoteRequiredAttributesMutationBodySchema.extend({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateNoteRequiredAttributesInput = repoNoteRequiredAttributesMutationBodySchema.extend({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

const repoReviewNoteableTypeSchema = z.enum(["Commit", "MergeRequest"]);
const repoReviewUserIdSchema = z.union([z.string().min(1).max(64), z.number().int().positive()]);

export const repoListRepositoryReviewsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  noteable_type: repoReviewNoteableTypeSchema,
  search: z.string().min(1).max(256).optional(),
  start_date: z.string().min(1).max(64).optional(),
  end_date: z.string().min(1).max(64).optional(),
  only_count: z.boolean().optional(),
  review_categories: z.string().min(1).max(200).optional(),
  review_modules: z.string().min(1).max(200).optional(),
  severity: z.string().min(1).max(64).optional(),
  assignee_id: repoReviewUserIdSchema.optional(),
  proposer_id: repoReviewUserIdSchema.optional(),
  target_branch: z.string().min(1).max(2000).optional(),
  include_reply: z.boolean().optional(),
  order_by: z.enum(["created", "updated"]).optional(),
  sort: z.enum(["asc", "desc"]).optional()
});

export const repoListRepositoryReviewAuthorsInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  noteable_type: repoReviewNoteableTypeSchema,
  resolved_status: z.enum(["resolved", "unresolved", "all"]),
  reviewers_filter: z.string().min(1).max(256).optional()
});

export const repoListRepositoryNavigationReferencesInput = z.object({
  repository_id: idSchema,
  path: z.string().min(1).max(100000).optional(),
  revision: z.string().min(1).max(2000).optional(),
  ref: z.string().min(1).max(2000).optional(),
  symbol: z.string().min(1).max(10000),
  language: z.enum(["C", "C++", "Go", "Java", "JavaScript", "PHP", "Python", "Ruby", "Rust"]),
  blob: z.string().min(1).max(2000),
  file_path: z.string().min(1).max(10000)
});

export const repoShowRepositoryNavigationOutlineInput = z.object({
  repository_id: idSchema,
  revision: z.string().min(1).max(2000).optional(),
  ref: z.string().min(1).max(2000).optional(),
  language: z.enum(["C", "C++", "Go", "Java", "JavaScript", "PHP", "Python", "Ruby", "Rust"]),
  blob: z.string().min(1).max(2000),
  file_path: z.string().min(1).max(10000)
});

export const repoShowRepositoryNavigationSchemaInput = z.object({
  repository_id: idSchema
});

export const repoShowRepositoryNavigationLanguageInput = z.object({
  repository_id: idSchema
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
  repository_id: idSchema,
  search: z.string().min(1).max(256).optional(),
  sort: z.enum([
    "name_asc",
    "name_desc",
    "created_asc",
    "created_desc",
    "updated_asc",
    "updated_desc"
  ]).optional(),
  include_expired: z.boolean().optional(),
  view: z.enum(["simple", "basic", "detail"]).optional()
});

const repoLabelColorSchema = z
  .string()
  .regex(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, "Label color must be a hex color like #FFAABB");

export const repoCreateRepositorySystemLabelsInput = z.object({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoCreateRepositoryLabelInput = z.object({
  repository_id: idSchema,
  name: z.string().min(1).max(255),
  color: repoLabelColorSchema.optional(),
  description: z.string().max(1000).optional(),
  expires_at: z.string().min(1).max(64).optional(),
  dry_run: z.boolean().default(true)
});

export const repoUpdateRepositoryLabelInput = z.object({
  repository_id: idSchema,
  name: z.string().min(1).max(255),
  new_name: z.string().min(1).max(255).optional(),
  color: repoLabelColorSchema.optional(),
  description: z.string().max(1000).optional(),
  expires_at: z.string().min(1).max(64).optional(),
  dry_run: z.boolean().default(true)
});

export const repoDeleteRepositoryLabelInput = z.object({
  repository_id: idSchema,
  name: z.string().min(1).max(255),
  dry_run: z.boolean().default(true)
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

export const repoShowGroupWatermarkInput = z.object({
  group_id: idSchema
});

export const repoUpdateProjectWatermarkInput = z.object({
  project_id: idSchema,
  watermark: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const repoUpdateRepositoryWatermarkInput = z.object({
  repository_id: idSchema,
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

export const repoShowGroupPermissionInheritEnabledInput = z.object({
  group_id: idSchema
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

export const repoUpdateRepositoryGeneralPolicyInput = z.object({
  repository_id: idSchema,
  disable_fork: z.boolean().optional(),
  branch_name_regex: z.string().optional(),
  tag_name_regex: z.string().optional(),
  generate_pre_merge_ref: z.boolean().optional(),
  forbidden_developer_create_branch: z.boolean().optional(),
  create_branch_whitelist_user_ids: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const repoShowRepositoryGeneralCommitRuleInput = z.object({
  repository_id: idSchema
});

export const repoUpdateRepositoryGeneralCommitRuleInput = z.object({
  repository_id: idSchema,
  reject_unsigned_commits: z.boolean().optional(),
  reject_not_signed_by_gpg: z.boolean().optional(),
  deny_delete_tag: z.boolean().optional(),
  prevent_secrets: z.boolean().optional(),
  deny_force_push: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

const repoCommitRuleInputBase = z.object({
  name: z.string().min(1).max(255),
  branch_name: z.string().min(1).max(255),
  commit_message_regex: z.string().optional(),
  commit_message_negative_regex: z.string().optional(),
  author_regex: z.string().optional(),
  author_email_regex: z.string().optional(),
  prohibited_file_name_regex: z.string().optional(),
  max_file_size: z.number().int().min(1).max(300).optional(),
  binary_gate_enabled: z.boolean().optional(),
  allowed_modify_binary: z.boolean().optional(),
  allowed_binary_file_name_regex: z.string().optional(),
  privileged_user_ids: z.array(z.number().int().positive()).optional(),
  effective_date: z.string().min(1).max(64).optional(),
  skip_rule_check: z.boolean().optional(),
  skip_rule_end_date: z.string().min(1).max(64).optional()
});

export const repoListRepositoryCommitRulesInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoCreateRepositoryCommitRuleInput = repoCommitRuleInputBase.extend({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateRepositoryCommitRuleInput = repoCommitRuleInputBase.partial().extend({
  repository_id: idSchema,
  commit_rule_id: idSchema,
  dry_run: z.boolean().default(true)
}).refine((value) => {
  const keys = [
    "name",
    "branch_name",
    "commit_message_regex",
    "commit_message_negative_regex",
    "author_regex",
    "author_email_regex",
    "prohibited_file_name_regex",
    "max_file_size",
    "binary_gate_enabled",
    "allowed_modify_binary",
    "allowed_binary_file_name_regex",
    "privileged_user_ids",
    "effective_date",
    "skip_rule_check",
    "skip_rule_end_date"
  ];

  return keys.some((key) => (value as Record<string, unknown>)[key] !== undefined);
}, {
  message: "At least one commit rule field must be provided"
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

export const repoShowGroupGeneralPolicyInput = z.object({
  group_id: idSchema
});

export const repoShowGroupsGeneralPolicyInput = z.object({
  group_id: idSchema
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

export const repoUpdateGroupGeneralPolicyInput = z.object({
  group_id: idSchema,
  disable_fork: z.boolean().optional(),
  branch_name_regex: z.string().optional(),
  tag_name_regex: z.string().optional(),
  generate_pre_merge_ref: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const repoCreateGroupInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).max(255),
  visibility: z.enum(["private", "internal", "public"]),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const repoShowGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema
});

export const repoDeleteGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoAssociateGroupUserGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  user_group_id: z.string().min(1).max(64),
  dry_run: z.boolean().default(true)
});

export const repoShowGroupSettingsInheritCfgInput = z.object({
  group_id: idSchema
});

export const repoUpdateGroupWatermarkInput = z.object({
  group_id: idSchema,
  watermark: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const repoAssociateRepositoryUserGroupInput = z.object({
  project_id: idSchema,
  repository_id: idSchema,
  user_group_id: z.string().min(1).max(64),
  dry_run: z.boolean().default(true)
});

export const repoListGroupPermissionResourcesInput = z.object({
  scope: z.enum(["group", "project", "all"]).default("all")
});

export const repoDownloadArchiveInput = z.object({
  repository_id: idSchema,
  sha: z.string().min(1).max(256).optional(),
  path: z.string().min(1).max(100000).optional(),
  archive_format: z.enum(["zip", "tar.gz", "tar.bz2", "tar"]).optional()
});

export const repoAddSubmoduleInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1).max(100),
  file_path: z.string().min(1).max(100000),
  subrepo_id: z.string().min(1).max(128),
  commit_message: z.string().min(1).max(1000),
  subrepo_branch: z.string().min(1).max(100),
  dry_run: z.boolean().default(true)
});

export const repoShowHttpsPasswordSettingInput = z.object({});

export const repoUpdateHttpsPasswordSettingInput = z.object({
  https_clone_iam_auth: z.union([z.boolean(), z.enum(["true", "false"])]),
  dry_run: z.boolean().default(true)
});

export const repoBatchValidateRepoNamesInput = z.object({
  items: z.array(z.object({
    name: z.string().min(1).max(255),
    project_id: idSchema,
    group_id: idSchema.optional()
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const repoTransferGroupInput = z.object({
  group_id: idSchema,
  owner_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListMembersInput = pagingSchema.extend({
  repository_id: idSchema,
  search: z.string().min(1).max(255).optional(),
  permission: z.enum(["repository", "code", "member", "branch", "tag", "mr", "label"]).optional(),
  action: z.string().min(1).max(64).optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoAddRepositoryMembersInput = z.object({
  repository_id: idSchema,
  users: z.array(z.object({
    user_iam_id: z.string().min(1).max(128).optional(),
    user_name: z.string().min(1).max(255).optional(),
    tenant_name: z.string().min(1).max(255).optional(),
    tenant_id: z.string().min(1).max(128).optional(),
    repository_role_Id: z.string().min(1).max(128).optional()
  }).refine((value) => Boolean(value.user_iam_id || value.user_name), {
    message: "user_iam_id or user_name is required"
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const repoSendUserEmailVerifyCodeInput = z.object({
  email: z.string().min(1).max(1000),
  dry_run: z.boolean().default(true)
});

export const repoUpdateUserEmailsInput = z.object({
  email: z.string().min(1).max(1000),
  verify_code: z.string().min(1).max(1000),
  dry_run: z.boolean().default(true)
});

export const repoShowUserEmailsInput = z.object({});

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

export const repoShowRepositoryMergeRequestSettingInput = z.object({
  repository_id: idSchema
});

export const repoShowGroupMergeRequestSettingInput = z.object({
  group_id: idSchema
});

export const repoShowProjectMergeRequestSettingInput = z.object({
  project_id: idSchema
});

export const repoShowRepositoryApproverSettingsInput = z.object({
  repository_id: idSchema
});

export const repoShowGroupApproverSettingsInput = z.object({
  group_id: idSchema
});

export const repoShowProjectApproverSettingsInput = z.object({
  project_id: idSchema
});

const repoApproverSettingUserSchema = z.record(z.unknown());

const repoApproverSettingPayloadInput = z.object({
  id: idSchema.optional(),
  target: z.string().min(1).max(2000).optional(),
  target_type: z.enum(["branch"]).optional(),
  is_use_approval: z.boolean().optional(),
  approval_required_reviewers: z.number().int().min(0).optional(),
  approval_required_approvers: z.number().int().min(0).optional(),
  reset_approvals_on_push: z.boolean().optional(),
  reset_reviewers_on_push: z.boolean().optional(),
  approvers_from_project: z.boolean().optional(),
  append_reviewer_ids: z.array(idSchema).optional(),
  append_reviewers: z.array(repoApproverSettingUserSchema).optional(),
  append_approver_ids: z.array(idSchema).optional(),
  append_approvers: z.array(repoApproverSettingUserSchema).optional(),
  only_merge_when_pipeline_pass: z.boolean().optional(),
  assignee_ids: z.array(idSchema).optional(),
  assignees: z.array(repoApproverSettingUserSchema).optional(),
  approver_ids: z.array(idSchema).optional(),
  approvers: z.array(repoApproverSettingUserSchema).optional(),
  reviewer_ids: z.array(idSchema).optional(),
  reviewers: z.array(repoApproverSettingUserSchema).optional()
});

export const repoListMergeRequestApproverSettingsInput = z.object({
  repository_id: idSchema
});

export const repoCreateMergeRequestApproverSettingInput = repoApproverSettingPayloadInput.extend({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestApproverSettingInput = repoApproverSettingPayloadInput.extend({
  repository_id: idSchema,
  setting_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteMergeRequestApproverSettingInput = z.object({
  repository_id: idSchema,
  setting_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListGroupMergeRequestApproverSettingsInput = z.object({
  group_id: idSchema
});

export const repoCreateGroupMergeRequestApproverSettingInput = repoApproverSettingPayloadInput.extend({
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateGroupMergeRequestApproverSettingInput = repoApproverSettingPayloadInput.extend({
  group_id: idSchema,
  setting_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteGroupMergeRequestApproverSettingInput = z.object({
  group_id: idSchema,
  setting_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListProjectMergeRequestApproverSettingsInput = z.object({
  project_id: idSchema
});

export const repoCreateProjectMergeRequestApproverSettingInput = repoApproverSettingPayloadInput.extend({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateProjectMergeRequestApproverSettingInput = repoApproverSettingPayloadInput.extend({
  project_id: idSchema,
  setting_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteProjectMergeRequestApproverSettingInput = z.object({
  project_id: idSchema,
  setting_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestSettingInput = z.object({
  repository_id: idSchema,
  settings: z.record(z.unknown()),
  dry_run: z.boolean().default(true)
});

const repoMergeRequestTemplatePayloadInput = z.object({
  template_name: z.string().min(1).max(255),
  merge_request_title: z.string().min(1).max(1000).optional(),
  description: z.string().optional(),
  auto_extract_mr_title: z.number().int().min(0).max(2).optional(),
  is_wip: z.boolean().optional(),
  is_default: z.boolean().optional()
});

export const repoListMergeRequestTemplatesInput = pagingSchema.extend({
  repository_id: idSchema,
  template_name: z.string().min(1).max(100000).optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListDiscussionTemplatesInput = pagingSchema.extend({
  repository_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoGetMergeRequestTemplateInput = z.object({
  repository_id: idSchema,
  template_id: idSchema
});

export const repoCreateMergeRequestTemplateInput = repoMergeRequestTemplatePayloadInput.extend({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestTemplateInput = repoMergeRequestTemplatePayloadInput.extend({
  repository_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteMergeRequestTemplateInput = z.object({
  repository_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListGroupMergeRequestTemplatesInput = pagingSchema.extend({
  group_id: idSchema,
  template_name: z.string().min(1).max(100000).optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoCreateGroupMergeRequestTemplateInput = repoMergeRequestTemplatePayloadInput.extend({
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateGroupMergeRequestTemplateInput = repoMergeRequestTemplatePayloadInput.extend({
  group_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteGroupMergeRequestTemplateInput = z.object({
  group_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListProjectMergeRequestTemplatesInput = pagingSchema.extend({
  project_id: idSchema,
  template_name: z.string().min(1).max(100000).optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoCreateProjectMergeRequestTemplateInput = repoMergeRequestTemplatePayloadInput.extend({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateProjectMergeRequestTemplateInput = repoMergeRequestTemplatePayloadInput.extend({
  project_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteProjectMergeRequestTemplateInput = z.object({
  project_id: idSchema,
  template_id: idSchema,
  dry_run: z.boolean().default(true)
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

export const repoListUserGpgKeysInput = z.object({
  query: z.string().min(1).max(2000).optional()
});

export const repoListUserSshKeysInput = pagingSchema.extend({
  page_size: z.number().int().positive().max(100).default(20),
  query: z.string().min(1).max(2000).optional()
});

export const repoCreateUserSshKeyInput = z.object({
  title: z.union([z.string().min(1).max(1000), z.number()]).optional(),
  key: z.union([z.string().min(1).max(1000), z.null()]).optional(),
  dry_run: z.boolean().default(true)
}).refine((input) => input.title !== undefined || input.key !== undefined, {
  message: "At least one of title or key is required"
});

export const repoDeleteUserSshKeyInput = z.object({
  key_id: z.union([z.string().min(1), z.number().int().positive()]).transform(String),
  dry_run: z.boolean().default(true)
});

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

export const repoListProjectWebhooksInput = pagingSchema.extend({
  project_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListGroupWebhooksInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
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

export const repoCreateProjectWebhookInput = repoRepositoryWebhookPayloadInput.extend({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoCreateGroupWebhookInput = repoRepositoryWebhookPayloadInput.extend({
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoGetRepositoryWebhookInput = z.object({
  repository_id: idSchema,
  hook_id: idSchema
});

export const repoGetProjectWebhookInput = z.object({
  project_id: idSchema,
  hook_id: idSchema
});

export const repoGetGroupWebhookInput = z.object({
  group_id: idSchema,
  hook_id: idSchema
});

export const repoUpdateRepositoryWebhookInput = repoRepositoryWebhookPayloadInput.partial().extend({
  repository_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateProjectWebhookInput = repoRepositoryWebhookPayloadInput.partial().extend({
  project_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateGroupWebhookInput = repoRepositoryWebhookPayloadInput.partial().extend({
  group_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteRepositoryWebhookInput = z.object({
  repository_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteProjectWebhookInput = z.object({
  project_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteGroupWebhookInput = z.object({
  group_id: idSchema,
  hook_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoListRepositoryWebhookLogsInput = pagingSchema.extend({
  repository_id: idSchema,
  hook_id: idSchema
});

const projectOrGroupWebhookLogsQueryInput = pagingSchema.extend({
  hook_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  repository_id: idSchema.optional(),
  uuid: z.string().min(1).max(100).optional(),
  created_after: z.string().min(1).optional(),
  created_before: z.string().min(1).optional()
});

export const repoListProjectWebhookLogsInput = projectOrGroupWebhookLogsQueryInput.extend({
  project_id: idSchema
});

export const repoListGroupWebhookLogsInput = projectOrGroupWebhookLogsQueryInput.extend({
  group_id: idSchema
});

export const repoGetRepositoryWebhookLogInput = z.object({
  repository_id: idSchema,
  hook_id: idSchema,
  log_id: idSchema
});

export const repoGetProjectWebhookLogInput = z.object({
  project_id: idSchema,
  hook_id: idSchema,
  log_id: idSchema
});

export const repoGetGroupWebhookLogInput = z.object({
  group_id: idSchema,
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

export const repoLockRepositoryInput = z.object({
  project_id: idSchema,
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUnlockRepositoryInput = z.object({
  project_id: idSchema,
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

const repoNotificationSubscriptionEventInput = z.object({
  resource_type: z.string().min(1),
  action: z.string().min(1),
  enabled: z.boolean(),
  role_ids: z.array(z.string().min(1)).optional(),
  role_names: z.array(z.string().min(1)).optional()
});

const repoNotificationSubscriptionWebhookConfigInput = z.object({
  url: z.string().min(1).optional(),
  token: z.string().min(1).optional(),
  mention_users: z.string().min(1).optional(),
  mention_phone: z.string().min(1).optional()
}).refine((input) => Object.keys(input).length > 0, {
  message: "At least one webhook_config field is required when webhook_config is provided"
});

export const repoUpdateNotificationSubscriptionInput = z.object({
  repository_id: idSchema,
  enabled: z.boolean().optional(),
  config_source: z.string().min(1).optional(),
  waring_repo_usage_rate: z.number().int().min(0).max(100).optional(),
  webhook_config: repoNotificationSubscriptionWebhookConfigInput.optional(),
  subscript_events: z.array(repoNotificationSubscriptionEventInput).min(1).optional(),
  dry_run: z.boolean().default(true)
}).refine((input) => (
  input.enabled !== undefined
  || input.config_source !== undefined
  || input.waring_repo_usage_rate !== undefined
  || input.webhook_config !== undefined
  || input.subscript_events !== undefined
), {
  message: "At least one notification subscription field is required"
});

export const repoExecuteRepositoryStatisticsInput = z.object({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoCreateDirInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1).max(200),
  file_path: z.string().min(1).max(2000),
  commit_message: z.string().min(1).max(2000),
  dry_run: z.boolean().default(true)
});

export const repoBatchDeleteBranchInput = z.object({
  repository_id: idSchema,
  branches: z.array(z.string().min(1).max(200)).min(1),
  dry_run: z.boolean().default(true)
});

export const repoCreateBranchInput = z.object({
  repository_id: idSchema,
  branch: z.string().min(1).max(200),
  ref: z.string().min(1).max(200),
  description: z.string().min(1).max(2000).optional(),
  related_ids: z.array(idSchema).min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoDeleteBranchInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1).max(2000),
  dry_run: z.boolean().default(true)
});

export const repoUpdateBranchNameInput = z.object({
  repository_id: idSchema,
  old_branch: z.string().min(1).max(200),
  new_branch: z.string().min(1).max(200),
  dry_run: z.boolean().default(true)
});

export const repoUpdateRepositoryInheritSettingInput = z.object({
  repository_id: idSchema,
  data: z.array(z.object({
    name: projectSettingNameSchema,
    inherit_mod: projectInheritModeSchema
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const repoStartHouseKeepingInput = z.object({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoTransferRepositoryInput = z.object({
  repository_id: idSchema,
  namespace: z.string().min(1).max(2000),
  dry_run: z.boolean().default(true)
});

export const repoRebuildRepositoryNavigationInput = z.object({
  repository_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoSyncDeployKeyToSubmodulesInput = z.object({
  repository_id: idSchema,
  key_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoRemoveDeployKeyFromSubmodulesInput = z.object({
  repository_id: idSchema,
  key_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoCreateMergeRequestInput = z.object({
  repository_id: idSchema,
  source_branch: z.string().min(1),
  target_branch: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  work_item_ids: z.array(idSchema).min(1).optional(),
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

export const repoShowActualHeadPipelineInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoListLatestPipelineJobsInput = z.object({
  repository_id: idSchema,
  pipeline_id: idSchema
});

export const repoListPipelineJobsInput = pagingSchema.extend({
  repository_id: idSchema,
  pipeline_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoShowMergeableStateOuterInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoImportMergeRequestInput = z.object({
  repository_id: idSchema,
  iid: z.union([z.string().min(1), z.number().int().positive()]),
  source_uniq_key: z.string().min(1),
  state: z.string().min(1),
  source_branch: z.string().min(1),
  target_branch: z.string().min(1),
  target_repository_id: z.union([z.string().min(1), z.number().int().positive()]),
  diff_refs: z.object({
    base_sha: z.string().min(1),
    start_sha: z.string().min(1),
    head_sha: z.string().min(1)
  }),
  author_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  labels: z.record(z.unknown()).optional(),
  created_at: z.string().min(1).optional(),
  updated_at: z.string().min(1).optional(),
  merged_at: z.string().min(1).optional(),
  closed_at: z.string().min(1).optional(),
  approvers: z.array(z.object({
    approver_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
    code_owner: z.boolean().optional(),
    accept: z.boolean().optional()
  })).optional(),
  squash: z.boolean().optional(),
  remove_source_branch: z.boolean().optional(),
  branch_is_deleted: z.boolean().optional(),
  fork: z.boolean().optional(),
  import_source_from: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoRebaseMergeRequestForOpenApiInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoResolveMergeRequestConflictsInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  commit_message: z.string().min(1),
  files: z.array(z.object({
    old_path: z.string().min(1),
    new_path: z.string().min(1),
    sections: z.record(z.unknown()).optional(),
    content: z.string().optional()
  })).min(1),
  dry_run: z.boolean().default(true)
});

export const repoListMergeRequestConflictFilesInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  hide_content: z.boolean().optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

const repoMergeRequestCandidatesBaseInput = pagingSchema.extend({
  search: z.string().min(1).optional(),
  target_branch: z.string().min(1).optional(),
  source_branch: z.string().min(1).optional(),
  merge_request_iid: idSchema.optional(),
  target_repository_id: idSchema.optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListMergeRequestValidAssignedCandidatesInput = repoMergeRequestCandidatesBaseInput.extend({
  repository_id: idSchema
});

export const repoListGroupMergeRequestValidAssignedCandidatesInput = pagingSchema.extend({
  group_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListProjectMergeRequestCanBeAssignedUsersInput = z.object({
  project_id: idSchema
});

export const repoListGroupMergeRequestCanBeAssignedReviewersInput = z.object({
  group_id: idSchema
});

export const repoListProjectMergeRequestCanBeAssignedReviewersInput = z.object({
  project_id: idSchema
});

export const repoListMergeRequestApproversInput = repoMergeRequestCandidatesBaseInput.extend({
  repository_id: idSchema
});

export const repoListMergeRequestReviewersInput = repoMergeRequestCandidatesBaseInput.extend({
  repository_id: idSchema
});

export const repoUpdateMergeRequestApproversInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  approver_ids: z.union([z.string().min(1), z.array(idSchema).min(1)]),
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestReviewersInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  reviewer_ids: z.union([z.string().min(1), z.array(idSchema).min(1)]),
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestVoteInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  score: z.number().int().min(-2).max(2),
  action: z.string().min(1).max(64).default("vote"),
  dry_run: z.boolean().default(true)
});

export const repoDeleteMergeRequestVoteInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  title: z.string().min(1).optional(),
  state_event: z.string().min(1).optional(),
  assignee_ids: z.union([z.string().min(1), z.array(z.union([z.string().min(1), z.number().int().positive()]))]).optional(),
  reviewer_ids: z.union([z.string().min(1), z.array(z.union([z.string().min(1), z.number().int().positive()]))]).optional(),
  description: z.string().optional(),
  milestone_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  labels: z.union([z.string().min(1), z.array(z.string().min(1)), z.record(z.unknown())]).optional(),
  force_remove_source_branch: z.boolean().optional(),
  squash: z.boolean().optional(),
  squash_commit_message: z.string().min(1).optional(),
  work_item_ids: z.array(idSchema).min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoListMergeRequestChangesInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoListMergeRequestChangesTreesInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  approval_user_id: idSchema.optional(),
  commit_id: z.string().min(1).max(40).optional(),
  from_diff_id: idSchema.optional(),
  to_diff_id: idSchema.optional(),
  page_size: z.number().int().positive().max(100).default(20)
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

export const repoListCommitAssociatedMergeRequestsInput = pagingSchema.extend({
  repository_id: idSchema,
  sha: z.string().min(1).max(64),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListMergeRequestDiscussionsInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

const repoDiscussionMutationBodySchema = z.object({
  body: z.string().min(1).optional(),
  severity: z.enum(["suggestion", "minor", "major", "fatal"]).optional(),
  assignee_id: idSchema.optional(),
  review_categories: z.string().min(1).optional(),
  review_modules: z.string().min(1).optional(),
  proposer_id: idSchema.optional(),
  resolved: z.boolean().optional()
});

export const repoCreateCherryPickMergeRequestInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  branch: z.string().min(1),
  with_new_merge_request: z.boolean().optional(),
  message: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoShowMergeRequestDiscussionInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  discussion_id: z.string().min(1)
});

export const repoUpdateMergeRequestDiscussionInfoInput = repoDiscussionMutationBodySchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  discussion_id: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoShowAverageEvaluationInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoListMergeRequestEvaluationsInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

const repoCommentsByLineQuerySchema = z.object({
  line: z.number().int().positive().optional(),
  with_commit_comments: z.boolean().optional(),
  path: z.string().min(1).optional(),
  view: z.enum(["basic", "sample"]).optional(),
  base_sha: z.string().min(1).max(64).optional(),
  start_sha: z.string().min(1).max(64).optional(),
  head_sha: z.string().min(1).max(64).optional()
});

export const repoShowMergeRequestCommentsByLineInput = repoCommentsByLineQuerySchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema
});

export const repoShowCommitCommentsByLineInput = z.object({
  repository_id: idSchema,
  sha: z.string().min(1).max(64)
});

export const repoListMergeRequestVersionsInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListMergeRequestSystemNotesInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListCommitDiscussionsInput = pagingSchema.extend({
  repository_id: idSchema,
  sha: z.string().min(1).max(64),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoCreateMergeRequestDiscussionInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  body: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoCreateMergeRequestDiscussionResponseInput = repoDiscussionMutationBodySchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  discussion_id: z.string().min(1),
  body: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const repoUpdateMergeRequestDiscussionInput = repoDiscussionMutationBodySchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  discussion_id: z.string().min(1),
  note_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const repoDeleteMergeRequestDiscussionInput = z.object({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  discussion_id: z.string().min(1),
  note_id: idSchema,
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

export const repoListPersonalMergeRequestsInput = pagingSchema.extend({
  state: z.enum(["all", "opened", "closed", "locked", "merged"]).default("all"),
  order_by: z.enum(["created_at", "updated_at", "merged_at"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  labels: z.string().min(1).optional(),
  created_before: z.string().min(1).optional(),
  created_after: z.string().min(1).optional(),
  updated_after: z.string().min(1).optional(),
  updated_before: z.string().min(1).optional(),
  view: z.enum(["simple", "basic"]).optional(),
  author_id: idSchema.optional(),
  scope: z.enum(["created_by_me", "assigned_to_me", "need_my_review", "need_my_approve", "all"]).optional(),
  source_branch: z.string().min(1).optional(),
  target_branch: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  wip: z.string().min(1).optional(),
  merged_by: idSchema.optional(),
  merged_after: z.string().min(1).optional(),
  merged_before: z.string().min(1).optional(),
  only_count: z.boolean().optional(),
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoListMergeRequestParticipantsInput = pagingSchema.extend({
  repository_id: idSchema,
  merge_request_iid: idSchema,
  page_size: z.number().int().positive().max(100).default(20)
});

export const repoShowBranchConflictInput = z.object({
  repository_id: idSchema,
  source_repository_id: idSchema.optional(),
  source_branch: z.string().min(1).optional(),
  target_branch: z.string().min(1).optional(),
  target_repository_id: idSchema.optional()
});

export const repoGetFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1),
  branch: z.string().min(1)
});

export const repoDownloadBlobsRawInput = z.object({
  repository_id: idSchema,
  blob_id: z.string().min(1),
  file_path: z.string().min(1).max(10000),
  file_name: z.string().min(1).optional()
});

export const repoListFileUpperTreeEntriesInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000).optional(),
  ref_name: z.string().min(1).max(200).optional()
});

export const repoShowFileRawInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  ref: z.string().min(1).max(2000).optional()
});

export const repoCreateFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  branch: z.string().min(1).max(2000),
  commit_message: z.string().min(1).max(2000),
  content: z.string().min(1),
  name: z.string().min(1).optional(),
  author_email: z.string().min(1).optional(),
  author_name: z.string().min(1).optional(),
  encoding: z.enum(["text", "base64"]).optional(),
  dry_run: z.boolean().default(true)
});

export const repoShowFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  ref: z.string().min(1).max(2000).optional()
});

export const repoDeleteFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  branch: z.string().min(1).max(2000),
  commit_message: z.string().min(1).max(2000),
  author_name: z.string().min(1).optional(),
  author_email: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoUpdateFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1).max(10000),
  branch: z.string().min(1).max(2000),
  commit_message: z.string().min(1).max(2000),
  content: z.string().min(1),
  name: z.string().min(1).optional(),
  author_email: z.string().min(1).optional(),
  author_name: z.string().min(1).optional(),
  encoding: z.enum(["text", "base64"]).optional(),
  last_commit_id: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const repoRenameFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1),
  previous_path: z.string().min(1),
  branch_name: z.string().min(1),
  commit_message: z.string().min(1),
  start_branch: z.string().min(1).optional(),
  author_email: z.string().min(1).optional(),
  author_name: z.string().min(1).optional(),
  infer_content: z.boolean().optional(),
  content: z.string().optional(),
  encoding: z.enum(["text", "base64"]).optional(),
  last_commit_id: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
}).refine((input) => input.infer_content !== undefined || input.content !== undefined, {
  message: "Either infer_content or content is required"
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

export const repoCreateCommitInput = z.object({
  repository_id: idSchema,
  branch: z.string().min(1).max(2000),
  commit_message: z.string().min(1).max(2000),
  actions: z.array(
    z.object({
      action: z.enum(["create", "create_dir", "update", "move", "delete", "chmod"]),
      file_path: z.string().min(1).max(100000),
      previous_path: z.string().min(1).max(100000).optional(),
      content: z.string().optional(),
      encoding: z.enum(["text", "base64"]).optional(),
      last_commit_id: z.string().min(1).optional(),
      execute_filemode: z.boolean().optional()
    })
  ).min(1),
  start_branch: z.string().min(1).max(2000).optional(),
  author_email: z.string().min(1).max(2000).optional(),
  author_name: z.string().min(1).max(2000).optional(),
  stats: z.boolean().optional(),
  force: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const repoCreateCommitRevertInput = z.object({
  repository_id: idSchema,
  sha: z.string().min(1).max(2000),
  branch: z.string().min(1).max(2000),
  with_new_merge_request: z.boolean().optional(),
  message: z.string().min(1).max(2000).optional(),
  dry_run: z.boolean().default(true)
});

export const repoShowCommitDiffMetadataInput = z.object({
  repository_id: idSchema,
  sha: z.string().min(1).max(2000)
});

export const repoShowCommitFileDiffInput = z.object({
  repository_id: idSchema,
  sha: z.string().min(1).max(2000),
  path: z.string().min(1).max(100000),
  old_path: z.string().min(1).max(100000).optional(),
  ignore_whitespace_change: z.boolean().optional()
});

export const repoShowDiffCommitInput = pagingSchema.extend({
  repository_id: idSchema,
  sha: z.string().min(1).max(2000),
  ignore_whitespace_change: z.boolean().optional(),
  not_statistic: z.boolean().optional(),
  page_size: z.number().int().positive().max(100).default(20)
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

export const repoListProjectMergeRequestsInput = pagingSchema.extend({
  project_id: idSchema,
  state: z.enum(["all", "opened", "closed", "locked", "merged"]).optional(),
  order_by: z.enum(["created_at", "updated_at", "title"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  author_id: z.union([z.string().min(1), z.number().int().positive()]).optional(),
  source_branch: z.string().min(1).optional(),
  target_branch: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  source_repository_id: idSchema.optional()
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
