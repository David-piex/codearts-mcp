import { z } from "zod";
import { idSchema } from "../../../contracts/common-schemas.js";

export const reqGetCurrentUserInfoInput = z.object({});

export const reqUpdateCurrentUserNicknameInput = z.object({
  nick_name: z.string().min(1).max(128),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqGetCurrentUserRoleInput = z.object({
  project_id: idSchema
});

export const reqListProjectBugStatisticsInput = z.object({
  project_id: idSchema
});
