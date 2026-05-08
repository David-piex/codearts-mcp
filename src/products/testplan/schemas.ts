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

export const testPlanListTasksInput = pagingSchema.extend({
  project_id: idSchema,
  version_uri: idSchema,
  keyword: z.string().min(1).optional(),
  status_codes: z.array(z.number().int()).optional(),
  executor_ids: z.array(idSchema).optional()
});

export const testPlanGetTaskInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  version_uri: idSchema.optional()
});

export const testPlanCreateTaskInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  uri: idSchema.optional(),
  description: z.string().optional(),
  version_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanUpdateTaskInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  name: z.string().min(1),
  uri: idSchema.optional(),
  description: z.string().optional(),
  version_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanBatchDeleteTasksInput = z.object({
  project_id: idSchema,
  task_uris: z.array(idSchema).min(1),
  version_uri: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanCreateTaskRelationsInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  uri: idSchema.optional(),
  stage: z.string().min(1).optional(),
  number: z.string().min(1).optional(),
  tags: z.string().min(1).optional(),
  description: z.string().optional(),
  region: z.string().min(1).optional(),
  version_uri: idSchema.optional(),
  owner_id: idSchema.optional(),
  parent_uri: idSchema.optional(),
  test_case_condition: z.string().min(1).optional(),
  service_type: z.number().int().optional(),
  module_id: idSchema.optional(),
  module_name: z.string().min(1).optional(),
  release_dev: z.string().min(1).optional(),
  status_code: z.number().int().optional(),
  ext_param: z.string().min(1).optional(),
  execute_way: z.number().int().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanInitTaskExecutionInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  release_dev: z.string().min(1).optional(),
  version_uri: idSchema.optional(),
  is_query: z.boolean().optional(),
  dry_run: z.boolean().default(true)
});

export const testPlanStopTaskExecutionInput = z.object({
  project_id: idSchema,
  task_uri: idSchema,
  result_uri: idSchema,
  dry_run: z.boolean().default(true)
});

export const testPlanListTaskCasesInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema,
  status: z.array(z.string().min(1)).optional(),
  version_uri: idSchema.optional()
});

export const testPlanListTaskResultsInput = pagingSchema.extend({
  project_id: idSchema,
  task_uri: idSchema,
  iterator_uri: idSchema.optional()
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
