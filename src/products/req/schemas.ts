import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const reqListProjectsInput = pagingSchema.extend({
  organization_id: idSchema.optional()
});

export const reqCreateWorkItemInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateWorkItemInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  title: z.string().min(1).optional(),
  work_item_type: z.string().min(1).optional(),
  description: z.string().optional(),
  status_id: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
});

export const reqListWorkItemsInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqGetWorkItemInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqGetProjectInput = z.object({
  project_id: idSchema
});

export const reqListIterationsInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqListProjectMembersInput = pagingSchema.extend({
  project_id: idSchema
});
