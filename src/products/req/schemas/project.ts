import { z } from "zod";
import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

export const reqListProjectsInput = pagingSchema.extend({
  organization_id: idSchema.optional()
});

export const reqGetProjectInput = z.object({
  project_id: idSchema
});
