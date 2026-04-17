import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const inspectorCreateDomainInput = z.object({
  project_id: idSchema,
  domain_name: z.string().url(),
  alias: z.string().min(1).optional()
});

export const inspectorListDomainsInput = pagingSchema.extend({
  project_id: idSchema,
  domain_id: idSchema.optional(),
  auth_status: z.enum(["unauth", "auth", "invalid", "manual", "skip"]).optional()
});

export const inspectorGetTaskInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const inspectorListTaskHistoriesInput = pagingSchema.extend({
  project_id: idSchema,
  domain_id: idSchema
});

export const inspectorListResultsInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema
});

export const inspectorListPortsInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema
});

export const inspectorListBusinessRisksInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema
});

export const inspectorGetReportStatusInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});
