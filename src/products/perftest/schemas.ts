import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const perftestListProjectsInput = pagingSchema.extend({
  project_id: idSchema
});

export const perftestGetProjectInput = z.object({
  project_id: idSchema,
  test_suite_id: z.number().int().positive()
});

export const perftestListTasksInput = pagingSchema.extend({
  project_id: idSchema,
  test_suite_id: z.number().int().positive()
});

export const perftestGetTaskInput = z.object({
  project_id: idSchema,
  task_id: z.number().int().positive()
});

export const perftestListTaskCasesInput = z.object({
  project_id: idSchema,
  task_id: z.number().int().positive()
});

export const perftestListLatestRunsInput = z.object({
  project_id: idSchema,
  task_id: z.number().int().positive()
});

export const perftestListVariablesInput = z.object({
  project_id: idSchema,
  test_suite_id: z.number().int().positive(),
  variable_type: z.number().int().positive()
});

export const perftestListOfflineReportsInput = z.object({
  project_id: idSchema,
  task_id: z.number().int().positive()
});

export const perftestGetReportInput = z.object({
  project_id: idSchema,
  task_run_id: z.number().int().positive(),
  case_run_id: z.number().int().positive(),
  brokens_limit_count: z.number().int().positive().default(60)
});
