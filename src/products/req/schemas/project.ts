import { z } from "zod";
import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

export const reqCreateProjectInput = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateProjectInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqDeleteProjectInput = z.object({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqCheckProjectNameInput = z.object({
  name: z.string().min(1)
});

export const reqListNotAddedProjectsInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    page_size: z.number().int().positive().max(100).default(20)
  });

export const reqListProjectsInput = pagingSchema.extend({
  organization_id: idSchema.optional()
});

export const reqGetProjectInput = z.object({
  project_id: idSchema
});
