import { z } from "zod";
import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

const reqTrackerIdSchema = z.number().int().positive();

export const reqListIterationsInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqListProjectVersionsInput = z.object({
  project_id: idSchema
});

export const reqFindIterationsInput = z.object({
  project_id: idSchema,
  updated_time_interval: z.string().min(1).optional()
});

const iterationStatusSchema = z.string().min(1);

export const reqGetIterationInput = z.object({
  iteration_id: idSchema
});

export const reqGetVersionDetailV2Input = z.object({
  version_id: idSchema
});

export const reqCreateIterationInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  begin_time: z.string().min(1),
  end_time: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqCreateVersionV2Input = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  start_date: z.number().int().positive(),
  due_date: z.number().int().positive(),
  dry_run: z.boolean().default(true)
});

export const reqCreateIterationWorkItemInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  parent_work_item_id: idSchema.optional(),
  description: z.string().optional(),
  priority_id: z.number().int().positive().optional(),
  module_id: idSchema.optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  developer_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
});

export const reqAddIterationWorkItemsInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const reqUpdateIterationInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  name: z.string().min(1),
  begin_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional(),
  description: z.string().optional(),
  status: iterationStatusSchema.optional(),
  over_type: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const reqDeleteIterationInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteIterationsInput = z.object({
  project_id: idSchema,
  iteration_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const reqUpdateIterationStateInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  name: z.string().min(1),
  status: iterationStatusSchema,
  due_date: z.string().min(1).optional(),
  start_date: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const reqQueryIterationImmovableIssuesInput = z.object({
  project_id: idSchema,
  version_id: idSchema
});

export const reqQueryScrumVersionWorkItemsV2Input = z.object({
  project_id: idSchema,
  fixed_version_id: idSchema.optional(),
  issue_query: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  tracker_id: z.string().min(1).optional(),
  display_mode: z.string().min(1).optional()
});

export const reqListIterationWorkItemsInput = pagingSchema.extend({
  project_id: idSchema,
  iteration_id: idSchema,
  tracker_id: reqTrackerIdSchema.optional(),
  status_id: z.number().int().positive().optional()
});

export const reqListIterationStatusStatisticsInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  tracker_id: z.number().int().positive().optional(),
  status_id: z.number().int().positive()
});
