import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const repoListRepositoriesInput = pagingSchema.extend({
  project_id: idSchema
});

export const repoListProtectedBranchesInput = pagingSchema.extend({
  repository_id: idSchema
});

export const repoListRepositoryLabelsInput = pagingSchema.extend({
  repository_id: idSchema
});

export const repoListEventsInput = pagingSchema.extend({
  repository_id: idSchema
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
  name: z
    .string()
    .min(1)
    .regex(/^[A-Za-z][A-Za-z0-9_-]*$/, "Repository name must start with a letter and use letters, numbers, hyphens, or underscores"),
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

export const repoListPersonalRepositoryImportRecordsInput = pagingSchema.extend({
  state: z.enum(["finished", "fail", "importing"]).optional(),
  source_type: z
    .enum(["gitee", "self_managed_gitlab", "gitlab", "github", "git", "svn", "coding", "bitbucket", "gerrit", "codeup"])
    .optional(),
  created_after: z.string().min(1).optional(),
  created_before: z.string().min(1).optional(),
  finished_after: z.string().min(1).optional(),
  finished_before: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  order_by: z.enum(["created_at", "source_repo_name", "size"]).optional(),
  sort: z.enum(["asc", "desc"]).optional()
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
