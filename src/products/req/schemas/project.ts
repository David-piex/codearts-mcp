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

export const reqListProjectDemandStatisticsInput = z.object({
  project_id: idSchema
});

export const reqGetProjectSummaryInput = z.object({
  project_id: idSchema
});

export const reqListProjectModulesInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    page_size: z.number().int().positive().max(1000).default(20)
  });

export const reqCreateProjectModuleInput = z.object({
  project_id: idSchema,
  module_name: z.string().min(1).max(30),
  owner_user_id: idSchema,
  parent_module_id: z.number().int().positive().optional(),
  description: z.string().max(255).optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateProjectModuleInput = z.object({
  project_id: idSchema,
  module_id: idSchema,
  module_name: z.string().min(1).max(30),
  owner_user_id: idSchema,
  description: z.string().max(255).optional(),
  dry_run: z.boolean().default(true)
});

export const reqDeleteProjectModuleInput = z.object({
  project_id: idSchema,
  module_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqValidateModuleNameInput = z.object({
  project_id: idSchema,
  module_name: z.string().min(1).max(30)
});
