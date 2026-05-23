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

export const reqListUserFeaturesInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemQueriesInput = z.object({
  project_id: idSchema
});

export const reqListProjectDemandStatisticsInput = z.object({
  project_id: idSchema
});

export const reqGetProjectSummaryInput = z.object({
  project_id: idSchema
});

export const reqGetProjectBugsPerDeveloperInput = z.object({
  project_id: idSchema
});

export const reqGetProjectCompletionRateInput = z.object({
  project_id: idSchema,
  date_range: z.string().min(1).optional(),
  metric_type: z.string().min(1).optional(),
  sprint_id: idSchema.optional(),
  dividend: z.record(z.string(), z.string()).optional(),
  divisor: z.record(z.string(), z.string()).optional()
});

const reqMetricCustomFieldFilterSchema = z.object({
  name: z.string().min(1).optional(),
  options: z.string().min(1).optional()
});

export const reqGetProjectBugDensityInput = z.object({
  project_id: idSchema,
  date_range: z.string().min(1).optional(),
  metric_type: z.string().min(1).optional(),
  dividend: z
    .object({
      custom_fields: z.array(reqMetricCustomFieldFilterSchema).min(1).optional()
    })
    .optional(),
  divisor: z
    .object({
      custom_fields: z.array(reqMetricCustomFieldFilterSchema).min(1).optional()
    })
    .optional()
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

export const reqListModuleSettingsV2Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    search: z.string().min(1).optional(),
    page_size: z.number().int().positive().max(1000).default(20)
  });

export const reqListProjectDomainsInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    page_size: z.number().int().positive().max(100).default(20)
  });

export const reqListProjectDomainsV2Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    flag: z.number().int().min(0).max(1),
    page_size: z.number().int().positive().max(100).default(20)
  });

export const reqCreateProjectDomainInput = z.object({
  project_id: idSchema,
  domain_name: z.string().min(1).max(31),
  dry_run: z.boolean().default(true)
});

export const reqUpdateProjectDomainInput = z.object({
  project_id: idSchema,
  domain_id: idSchema,
  domain_name: z.string().min(1).max(31),
  dry_run: z.boolean().default(true)
});

export const reqCancelProjectDomainInput = z.object({
  project_id: idSchema,
  domain_id: idSchema,
  dry_run: z.boolean().default(true)
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

export const reqValidateProjectTemplateNameInput = z.object({
  name: z.string().min(1)
});

export const reqDeleteProjectTemplateInput = z.object({
  template_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqUpdateProjectTemplateInput = z
  .object({
    template_id: idSchema,
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    dry_run: z.boolean().default(true)
  })
  .refine((value) => typeof value.name !== "undefined" || typeof value.description !== "undefined", {
    message: "At least one of name or description is required"
  });
