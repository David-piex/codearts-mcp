import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

const artifactExtraParamsSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(z.string()), z.array(z.number())])
);

const artifactTrashItemSchema = z.object({
  id: idSchema,
  format: z.string().min(1),
  uri: z.string().min(1),
  status: z.string().min(1),
  include_pattern: z.string().min(1).optional(),
  includes_pattern: z.string().min(1).optional()
}).passthrough();

export const artifactListRepositoriesInput = pagingSchema.extend({
  tenant_id: idSchema,
  project_id: idSchema,
  qname: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  format: z.string().min(1).optional(),
  format_list: z.array(z.string().min(1)).optional(),
  is_recycle_bin: z.boolean().optional()
});

export const artifactGetRepositoryInput = z.object({
  repository_id: idSchema
});

export const artifactListFilesInput = pagingSchema.extend({
  project_id: idSchema,
  repo_name: z.string().min(1).optional(),
  parent_id: idSchema.optional(),
  search_name: z.string().min(1).optional(),
  search_type: z.string().min(1).optional(),
  extension: z.string().min(1).optional(),
  order_by: z.string().min(1).optional(),
  sort: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
  category: z.string().min(1).optional()
});

export const artifactGetFileInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_name: z.string().min(1),
  path: z.string().min(1),
  format: z.string().min(1)
});

export const artifactDeleteFileInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_name: z.string().min(1),
  path: z.string().min(1),
  format: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const artifactCreateRepositoryInput = z.object({
  format: z.string().min(1),
  type: z.string().min(1),
  repository_name: z.string().min(1).max(50),
  includes_pattern: z.string().min(1).max(512),
  project_id: idSchema.optional(),
  description: z.string().max(500).optional(),
  share_right: z.string().min(1).optional(),
  params: artifactExtraParamsSchema.default({}),
  dry_run: z.boolean().default(true)
});

export const artifactUpdateRepositoryInput = z.object({
  repo_name: z.string().min(1).max(50),
  format: z.string().min(1),
  repository_ids: z.array(idSchema).min(1),
  includes_pattern: z.string().min(1).max(512),
  description: z.string().max(500).optional(),
  deployment_policy: z.string().min(1).optional(),
  auto_clean_snapshot: z.boolean().optional(),
  snapshot_alive_days: z.string().min(1).optional(),
  params: artifactExtraParamsSchema.default({}),
  dry_run: z.boolean().default(true)
});

export const artifactRestoreTrashRepositoriesInput = z.object({
  items: z.array(artifactTrashItemSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const artifactDeleteTrashRepositoriesInput = z.object({
  items: z.array(artifactTrashItemSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const artifactGetDownloadUrlInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_name: z.string().min(1),
  path: z.string().min(1),
  format: z.string().min(1)
});

export const artifactListBuildArchivesInput = pagingSchema.extend({
  parent_id: idSchema.optional(),
  build_id: idSchema.optional(),
  build_no: z.string().min(1).optional(),
  repo_branch: z.string().min(1).optional()
});

export const artifactListVersionsInput = pagingSchema.extend({
  project_id: idSchema
});

export const artifactShowProjectVersionsCountInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  status: z.string().min(1).optional()
});

export const artifactGetFileTreeInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_name: z.string().min(1),
  path: z.string().min(1).default("/")
});

export const artifactListLatestVersionFilesInput = pagingSchema.extend({
  project_id: idSchema
});

export const artifactShowLatestVersionFilesCountInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  status: z.string().min(1).optional()
});

export const artifactShowPackageDataDetailInput = z.object({
  project_id: idSchema.optional(),
  status: z.string().min(1).optional()
});

export const artifactShowPackageInfoInput = z.object({
  project_id: idSchema.optional(),
  status: z.string().min(1).optional()
});

export const artifactShowDomainReleaseRepoStorageInput = z.object({
  status: z.string().min(1).optional(),
  package_type: z.string().min(1).optional()
});

export const artifactShowProjectStorageInfoInput = z.object({
  project_id: idSchema,
  status: z.string().min(1).optional()
});

export const artifactShowCapacityNoticeSettingsInput = z.object({});

export const artifactShowAutoDeleteJobSettingsInput = z.object({
  project_id: idSchema
});

export const artifactShowUserPrivilegesInput = z.object({
  project_id: idSchema
});

export const artifactShowUserPermissionsInput = z.object({
  project_id: idSchema
});

export const artifactGetRepositoryUserInfoInput = z.object({});

export const artifactListRepositoryUsersInput = pagingSchema.extend({
  user_name: z.string().min(1).optional()
});

export const artifactListProjectRolePermissionsInput = z.object({
  project_id: idSchema
});

export const artifactListChildProxyRepositoriesInput = z.object({
  repo_id: idSchema,
  type: z.string().min(1).optional()
});

export const artifactListStorageStatisticsInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema
});

export const artifactListAttentionsInput = pagingSchema.extend({
  project_id: idSchema.optional()
});

export const artifactCreateAttentionInput = z.object({
  format: z.string().min(1),
  attention: z.string().min(1),
  ids: z.array(z.string().min(1)).min(1),
  dry_run: z.boolean().default(true)
});

export const artifactListSecGuardTasksInput = pagingSchema.extend({
  date: z.string().min(1).optional()
});

export const artifactShowOpenSourceEnabledInput = z.object({});

export const artifactSearchArtifactsInput = pagingSchema.extend({
  artifact_name: z.string().min(1),
  artifact_type: z.string().min(1).optional(),
  project_id: idSchema.optional(),
  in_project: z.boolean().optional()
});

export const artifactListNetProxyInput = z.object({});

export const artifactSearchByChecksumInput = pagingSchema.extend({
  checksum: z.string().min(1),
  format: z.string().min(1).optional(),
  in_project: z.boolean().optional(),
  project_id: idSchema.optional()
});

export const artifactListMavenProjectRepositoriesInput = pagingSchema.extend({
  search_name: z.string().min(1).optional(),
  repo_id: idSchema.optional()
});

export const artifactListMavenRepositoriesInput = z.object({
  project_id: idSchema.optional(),
  default: z.boolean().optional(),
  policy: z.string().min(1).optional(),
  repo_ids: z.array(idSchema).optional(),
  access: z.string().min(1).optional()
});

export const artifactListMavenRepositoryListInput = z.object({
  project_id: idSchema.optional(),
  policy: z.string().min(1).optional(),
  format: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  repo_id: idSchema.optional(),
  search_name: z.string().min(1).optional()
});

export const artifactGetRepositoryDetailInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_id: idSchema,
  region: z.string().min(1).optional(),
  path: z.string().min(1).optional()
});

export const artifactListProjectReleaseFilesInput = pagingSchema.extend({
  project_id: idSchema,
  file_name: z.string().min(1)
});

export const artifactListReleaseFilesInput = artifactListProjectReleaseFilesInput;

export const artifactListProjectUsersInput = pagingSchema.extend({
  project_id: idSchema,
  repo_id: idSchema,
  scene: z.string().min(1).optional()
});

export const artifactListDomainIpConfigsInput = pagingSchema;

export const artifactShowRepositoryPrivilegesInput = z.object({
  project_id: idSchema,
  repo_id: idSchema
});

export const artifactShowUserPrivilegesV3Input = z.object({
  project_id: idSchema
});

export const artifactGetRepoFileInfoByIdInput = z.object({
  id: idSchema
});

export const artifactGetRepoFileInfoByNameInput = z.object({
  file_name: z.string().min(1)
});

export const artifactShowUserTicketInput = z.object({});

export const artifactDeleteCompletelyUpdateFileStateInput = z.object({
  ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const artifactShowAuditInput = pagingSchema.extend({
  tenant_id: idSchema,
  project_id: idSchema,
  module: z.string().min(1),
  repo: z.string().min(1),
  user_id: z.string().optional(),
  instance_id: z.string().optional(),
  format: z.string().optional(),
  resource_id: z.string().optional()
});
