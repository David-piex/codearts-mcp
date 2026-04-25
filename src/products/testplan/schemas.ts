import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const testPlanListPlansInput = pagingSchema.extend({
  project_id: idSchema
});

export const testPlanGetPlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanListCasesInput = pagingSchema.extend({
  project_id: idSchema,
  plan_id: idSchema,
  owner_id: idSchema.optional(),
  status: z.string().min(1).optional(),
  priority: z.string().min(1).optional(),
  module_id: z.string().min(1).optional(),
  label_id: z.string().min(1).optional(),
  test_case_type: z.string().min(1).optional(),
  query: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])
    )
    .optional()
});

export const testPlanListRunsInput = pagingSchema.extend({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanGetCaseInput = z.object({
  project_id: idSchema,
  case_id: idSchema
});

export const testPlanListIssuesInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanRunCasesInput = z.object({
  project_id: idSchema,
  execute_list: z.array(
    z.object({
      case_id: idSchema
    })
  ).min(1),
  dry_run: z.boolean().default(true)
});
