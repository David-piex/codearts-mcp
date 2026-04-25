import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

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
  repo_name: z.string().min(1)
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

export const artifactGetDownloadUrlInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_name: z.string().min(1),
  path: z.string().min(1),
  format: z.string().min(1)
});

export const artifactListBuildArchivesInput = pagingSchema;

export const artifactListVersionsInput = pagingSchema.extend({
  project_id: idSchema
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

export const artifactSearchArtifactsInput = pagingSchema.extend({
  artifact_name: z.string().min(1),
  repo_name: z.string().optional(),
  project_id: idSchema.optional()
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
