import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const scrumPlanTrackerIdSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(5),
  z.literal(6),
  z.literal(7)
]);

export const reqGetPlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const reqListPlansInput = pagingSchema
  .extend({
    project_id: idSchema,
    status_id: z.number().int().positive().optional(),
    plan_id: idSchema.optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListPlanAddableWorkItemsInput = pagingSchema
  .extend({
    project_id: idSchema,
    plan_id: idSchema,
    subject: z.string().optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListPlanWorkItemsInput = pagingSchema
  .extend({
    project_id: idSchema,
    plan_id: idSchema,
    subject: z.string().optional(),
    show_type: z.enum(["list", "tree"]).default("list"),
    tracker_id: scrumPlanTrackerIdSchema.optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });
