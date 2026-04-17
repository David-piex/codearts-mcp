import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const pipelineListInput = pagingSchema.extend({
  project_id: idSchema
});

export const pipelineStopRunInput = z.object({
  pipeline_id: idSchema,
  run_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineRetryRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineApproveRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineRejectRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const pipelineRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  branch: z.string().min(1).optional(),
  description: z.string().max(1024).optional(),
  dry_run: z.boolean().default(true)
});

export const pipelineListRunsInput = pagingSchema.extend({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineGetRunInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunDetailInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunParametersInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunLogInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema
});

export const pipelineGetManualReviewContextInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineListArtifactsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetStepOutputsInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  step_run_ids: z.array(idSchema).min(1)
});

export const pipelineGetInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema
});

export const pipelineListTemplatesInput = pagingSchema.extend({
  tenant_id: idSchema,
  language: z.string().optional(),
  is_system: z.boolean().optional()
});
