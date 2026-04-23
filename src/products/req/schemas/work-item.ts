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
  dry_run: z.boolean().default(true)
});

export const reqDeleteWorkItemInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqBatchUpdateWorkItemsInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  status_id: z.number().int().positive().optional(),
  priority_id: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
}).refine(
  (input) => typeof input.status_id !== "undefined" || typeof input.priority_id !== "undefined",
  {
    message: "At least one of status_id or priority_id is required",
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

export const reqUpdateWorkItemFlowInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  status_id: z.number().int().positive(),
  dry_run: z.boolean().default(true)
});
