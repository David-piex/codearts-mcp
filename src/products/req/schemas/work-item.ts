import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const scrumTrackerIdSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(5),
  z.literal(6),
  z.literal(7)
]);

export const reqCreateWorkItemInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  description: z.string().optional(),
  priority_id: z.number().int().positive().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateWorkItemInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  title: z.string().min(1).optional(),
  work_item_type: z.string().min(1).optional(),
  description: z.string().optional(),
  status_id: z.number().int().positive().optional(),
  priority_id: z.number().int().positive().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
});

export const reqDeleteWorkItemInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteWorkItemsInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1).max(100),
  dry_run: z.boolean().default(true)
});

export const reqBatchUpdateWorkItemsInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  status_id: z.number().int().positive().optional(),
  priority_id: z.number().int().positive().optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
}).refine(
  (input) =>
    typeof input.status_id !== "undefined" ||
    typeof input.priority_id !== "undefined" ||
    typeof input.severity_id !== "undefined" ||
    typeof input.assigned_id !== "undefined" ||
    typeof input.done_ratio !== "undefined" ||
    typeof input.iteration_id !== "undefined" ||
    typeof input.module_id !== "undefined",
  {
    message:
      "At least one of status_id, priority_id, severity_id, assigned_id, done_ratio, iteration_id, or module_id is required",
    path: ["status_id"]
  }
);

export const reqListWorkItemsInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqListBoardWorkItemsInput = pagingSchema
  .extend({
    project_id: idSchema,
    created_time_interval: z.string().optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqGetWorkItemInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqListBoardWorkItemStatusRecordsInput = pagingSchema
  .extend({
    project_id: idSchema
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListWorkItemRecordsInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema,
    journalized_type: z.string().min(1).default("Issue")
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListAssociatedIssuesInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListAssociatedCommitsInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema,
    type: z.enum(["commit", "branch"]).default("commit")
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListAssociatedTestCasesInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListRelatedUsersInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemStatusesInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemStatusAttributesInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemStatusDetailsInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqListWorkItemStatusConfigsInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqListOptionalWorkItemStatusConfigsInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqGetProjectPublicConfigInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemWorkflowConfigInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqListBoardWorkItemWorkflowConfigInput = z.object({
  project_id: idSchema,
  board_id: idSchema
});

export const reqListJobCacheBoardsInput = z.object({
  project_id: idSchema,
  type: z.string().min(1).default("board"),
  region: z.string().min(1).optional()
});

export const reqListWorkItemTemplatesInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema.optional()
});

export const reqGetWorkItemTemplateConfigInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqListWorkItemCustomFieldsInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema.optional()
});

export const reqGetWorkItemStatusRuleFlagInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqListWorkItemTrackerHandlersInput = z.object({
  project_id: idSchema,
  tracker_id: scrumTrackerIdSchema
});

export const reqListCacheDataInput = z.object({
  project_id: idSchema.optional(),
  type: z.string().min(1).default("backlog")
});

export const reqUpdateCacheDataInput = z
  .object({
    project_id: idSchema,
    type: z.string().min(1).default("backlog"),
    region: z.string().min(1).optional(),
    cache_id: z.number().int().positive().optional(),
    visible_fields: z.array(z.string().min(1)).optional(),
    fields: z
      .array(
        z.object({
          id: z.string().min(1).optional(),
          field: z.string().min(1).optional(),
          header: z.string().min(1).optional(),
          type: z.string().min(1).optional(),
          visible: z.boolean().optional(),
          order: z.number().int().nonnegative().optional()
        })
      )
      .min(1)
      .optional(),
    dry_run: z.boolean().default(true)
  })
  .refine(
    (input) =>
      (input.visible_fields?.length ?? 0) > 0 ||
      (input.fields?.length ?? 0) > 0,
    {
      message: "visible_fields or fields is required",
      path: ["fields"]
    }
  );

export const reqUpdateWorkItemFlowInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  status_id: z.number().int().positive(),
  dry_run: z.boolean().default(true)
});
