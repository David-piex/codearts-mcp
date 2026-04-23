import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const scrumPlanTrackerIdSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(5),
  z.literal(6),
  z.literal(7)
]);

const scrumPlanTypeSchema = z.union([z.literal("gantt"), z.literal("mind")]);

export const reqGetPlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const reqCreatePlanInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  type: scrumPlanTypeSchema,
  dry_run: z.boolean().default(true)
});

export const reqUpdatePlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqUpdatePlanImageInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  img_url: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqDeletePlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqAddPlanWorkItemsInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const reqClearPlanWorkItemsInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqListPlansInput = pagingSchema
  .extend({
    project_id: idSchema,
    status_id: z.number().int().positive().optional(),
    plan_id: idSchema.optional(),
    search: z.string().optional(),
    user_ids: z.array(idSchema).optional(),
    sort: z.string().optional(),
    type: scrumPlanTypeSchema.optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqCreatePlanWorkItemInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  parent_work_item_id: idSchema.optional(),
  description: z.string().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  priority_id: z.number().int().positive().optional(),
  severity_id: z.number().int().positive().optional(),
  status_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
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
