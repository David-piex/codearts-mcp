import { z } from "zod";
import { idSchema } from "../../../contracts/common-schemas.js";

export const reqGetCurrentUserInfoInput = z.object({});

export const reqGetCurrentUserRoleInput = z.object({
  project_id: idSchema
});

export const reqListProjectBugStatisticsInput = z.object({
  project_id: idSchema
});
