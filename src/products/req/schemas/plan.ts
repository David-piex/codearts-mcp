import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const reqPlanTrackerIdSchema = z.number().int().positive();

const reqPlanTypeSchema = z.string().min(1);
const reqReleasePlanCategorySchema = z.enum(["PI", "Iteration", "PlanMilestone"]);
const reqReleasePlanStatusSchema = z.enum(["planned", "going", "ended"]);
const reqReleasePlanBaselineSchema = z.enum(["baselined", "unbaseline", "baseline-reviewing"]);
const reqReleasePlanDateSchema = z.union([z.string().min(1), z.number().int().nonnegative()]);

export const reqGetPlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const reqGetReleasePlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema
});

export const reqCreatePlanInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  type: reqPlanTypeSchema,
  dry_run: z.boolean().default(true)
});

export const reqUpdatePlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqCreateReleasePlanInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  category: reqReleasePlanCategorySchema,
  plan_start_date: reqReleasePlanDateSchema,
  plan_end_date: reqReleasePlanDateSchema,
  description: z.string().optional(),
  parent_id: idSchema.optional(),
  workload: z.string().optional(),
  owner: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateReleasePlanInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  title: z.string().min(1).optional(),
  category: reqReleasePlanCategorySchema.optional(),
  description: z.string().optional(),
  status: reqReleasePlanStatusSchema.optional(),
  plan_start_date: reqReleasePlanDateSchema.optional(),
  plan_end_date: reqReleasePlanDateSchema.optional(),
  created_date: z.number().int().nonnegative().optional(),
  parent_id: idSchema.optional(),
  baseline: reqReleasePlanBaselineSchema.optional(),
  workload: z.string().optional(),
  owner: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteReleasePlansInput = z.object({
  project_id: idSchema,
  plan_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const reqBatchUpdateReleasePlanBaselineInput = z.object({
  project_id: idSchema,
  plan_ids: z.array(idSchema).min(1),
  baseline: reqReleasePlanBaselineSchema,
  dry_run: z.boolean().default(true)
});

export const reqChangeReleasePlanStatusInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  operate: z.string().min(1),
  move_to_sprint_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdatePlanImageInput = z.object({
  project_id: idSchema,
  plan_id: idSchema,
  img_url: z.string().min(1),
  x_auth_token: z.string().min(1).optional(),
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
    type: reqPlanTypeSchema.optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListReleasePlansInput = pagingSchema
  .extend({
    project_id: idSchema,
    key_word: z.string().optional(),
    updated_time_interval: z.string().optional()
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
  developer_id: idSchema.optional(),
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
    tracker_id: reqPlanTrackerIdSchema.optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });
