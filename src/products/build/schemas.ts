import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const buildListJobsInput = pagingSchema.extend({
  project_id: idSchema
});

export const buildGetJobInput = z.object({
  job_id: idSchema
});

export const buildGetRecordInput = z.object({
  record_id: idSchema
});

export const buildGetRealTimeLogInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive(),
  offset: z.number().int().min(0)
});

export const buildGetHistoryDetailsInput = z.object({
  job_id: idSchema,
  build_number: z.number().int().positive()
});

export const buildListBuildParametersInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetErrorLogInput = pagingSchema.extend({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetInfoRecordInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive()
});

export const buildGetRecordScriptInput = z.object({
  record_id: idSchema
});

export const buildGetFullStagesInput = z.object({
  record_id: idSchema,
  cascade: z.boolean().default(true)
});

export const buildListRecordsInput = pagingSchema.extend({
  job_id: idSchema
});

export const buildListProjectRecordsInput = pagingSchema.extend({
  project_id: idSchema,
  build_project_id: idSchema.optional()
});

export const buildGetProjectRecordStatisticsInput = z.object({
  project_id: idSchema,
  build_project_id: idSchema.optional()
});

export const buildGetRecordFlowGraphInput = z.object({
  record_id: idSchema
});

export const buildRunJobInput = z.object({
  job_id: idSchema,
  branch: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
});

export const buildStopJobInput = z.object({
  job_id: idSchema,
  build_no: z.number().int().positive(),
  dry_run: z.boolean().default(true)
});
