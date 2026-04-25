import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const checkListTasksInput = pagingSchema.extend({
  project_id: idSchema.optional()
});

export const checkGetTaskInput = z.object({
  task_id: idSchema
});

export const checkCreateTaskInput = z.object({
  project_id: idSchema,
  task_name: z.string().min(1),
  git_url: z.string().url(),
  git_branch: z.string().min(1),
  language: z.string().min(1),
  rule_set_id: idSchema.optional(),
  resource_pool_id: idSchema.optional(),
  resource_pool_type: z.enum(["default", "custom"]).optional(),
  include_paths: z.string().min(1).optional(),
  exclude_dir: z.string().min(1).optional(),
  task_type: z.enum(["full", "incremental"]).optional(),
  dry_run: z.boolean().default(true)
});

export const checkRunTaskInput = z.object({
  task_id: idSchema,
  ref: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const checkStopTaskInput = z.object({
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const checkListTaskIssuesInput = pagingSchema.extend({
  task_id: idSchema,
  severity: z.string().min(1).optional(),
  defect_level: z.string().min(1).optional(),
  rule_id: z.string().min(1).optional(),
  rule_name: z.string().min(1).optional(),
  file_path: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
  checker: z.string().min(1).optional()
});

export const checkGetMetricsInput = z.object({
  project_id: idSchema.optional(),
  task_id: idSchema
});

export const checkListRulesetsInput = pagingSchema.extend({
  project_id: idSchema,
  language: z.string().optional()
});
