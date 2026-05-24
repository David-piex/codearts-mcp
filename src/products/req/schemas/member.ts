import { z } from "zod";
import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

const reqMemberRoleIdSchema = z.union([z.literal(-1), z.number().int().positive()]);

export const reqListProjectMembersInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqListDevucProjectMembersInput = z.object({
  project_id: idSchema
});

export const reqApplyJoinProjectForAgcInput = z.object({
  project_id: idSchema,
  domain_id: idSchema,
  user_id: idSchema,
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqAddProjectMemberInput = z.object({
  project_id: idSchema,
  user_id: idSchema,
  domain_id: idSchema,
  domain_name: z.string().min(1).optional(),
  role_id: reqMemberRoleIdSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqBatchAddProjectMembersInput = z.object({
  project_id: idSchema,
  members: z
    .array(
      z.object({
        user_id: idSchema,
        role_id: reqMemberRoleIdSchema.optional()
      })
    )
    .min(1),
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteProjectMembersInput = z.object({
  project_id: idSchema,
  user_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const reqUpdateProjectMemberRoleInput = z.object({
  project_id: idSchema,
  user_id: idSchema,
  role_id: reqMemberRoleIdSchema,
  dry_run: z.boolean().default(true)
});

export const reqBatchUpdateChildUserNicknamesInput = z.object({
  users: z
    .array(
      z.object({
        user_id: idSchema,
        nick_name: z.string().min(1).max(128)
      })
    )
    .min(1),
  dry_run: z.boolean().default(true)
});

export const reqLeaveProjectInput = z.object({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});
