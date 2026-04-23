import { z } from "zod";
import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

export const reqListIterationsInput = pagingSchema.extend({
  project_id: idSchema
});

const iterationStatusSchema = z.union([z.literal("0"), z.literal("1"), z.literal("2")]);

export const reqGetIterationInput = z.object({
  iteration_id: idSchema
});

export const reqCreateIterationInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  begin_time: z.string().min(1),
  end_time: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateIterationInput = z.object({
  project_id: idSchema,
  iteration_id: idSchema,
  name: z.string().min(1),
  begin_time: z.string().min(1).optional(),
  end_time: z.string().min(1).optional(),
  description: z.string().optional(),
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
