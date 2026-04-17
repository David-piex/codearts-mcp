import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const deployListAppsInput = pagingSchema.extend({
  project_id: idSchema
});

export const deployListTasksInput = pagingSchema.extend({
  project_id: idSchema
});

export const deployGetAppInput = z.object({
  application_id: idSchema
});

export const deployGetTaskInput = z.object({
  task_id: idSchema
});

export const deployListAppOperationsLogInput = z.object({
  app_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  page_index: z.number().int().positive().default(1),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const deployListHistoriesInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema,
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const deployGetStatusInput = z.object({
  task_id: idSchema,
  record_id: idSchema.optional()
});

export const deployStartAppInput = z.object({
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployStopAppInput = z.object({
  task_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployRollbackAppInput = z.object({
  task_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployGetHistoryDetailInput = z.object({
  task_id: idSchema,
  record_id: idSchema
});

export const deployGetExecutionParamsInput = z.object({
  task_id: idSchema,
  record_id: idSchema
});

export const deployGetAppLogInput = z.object({
  application_id: idSchema,
  record_id: idSchema,
  step_id: idSchema.optional(),
  offset: z.string().default("0"),
  end_offset: z.string().default("0")
});
