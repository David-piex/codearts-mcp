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
  ref_name: z.string().optional()
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
