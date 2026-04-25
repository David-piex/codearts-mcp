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

export const testPlanListIssuesInput = pagingSchema.extend({
  project_id: idSchema,
  plan_id: idSchema
});

export const testPlanRunCasesInput = z.object({
  project_id: idSchema,
  execute_list: z.array(
    z
      .object({
        case_id: idSchema.optional(),
        testcase_id: idSchema.optional(),
        executor_id: idSchema.optional(),
        execute_id: idSchema.optional(),
        result_id: z.string().min(1).optional(),
        start_time: z.string().min(1).optional(),
        end_time: z.string().min(1).optional(),
        duration: z.number().int().nonnegative().optional(),
        description: z.string().min(1).optional(),
        remark: z.string().min(1).optional()
      })
      .refine((item) => Boolean(item.case_id ?? item.testcase_id), {
        message: "case_id or testcase_id is required"
      })
  ).min(1),
  dry_run: z.boolean().default(true)
});
