import { z } from "zod";
import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

const reqAddMemberRoleIdSchema = z.union([
  z.literal(-1),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(10),
  z.literal(11)
]);

const reqUpdateMemberRoleIdSchema = z.union([
  z.literal(-1),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9)
]);

export const reqListProjectMembersInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqAddProjectMemberInput = z.object({
  project_id: idSchema,
  user_id: idSchema,
  domain_id: idSchema,
  domain_name: z.string().min(1).optional(),
  role_id: reqAddMemberRoleIdSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqBatchAddProjectMembersInput = z.object({
  project_id: idSchema,
  members: z
    .array(
      z.object({
        user_id: idSchema,
        role_id: reqAddMemberRoleIdSchema.optional()
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
  role_id: reqUpdateMemberRoleIdSchema,
  dry_run: z.boolean().default(true)
});

export const reqLeaveProjectInput = z.object({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});
