import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const reqTrackerIdSchema = z.number().int().positive();

export const reqCreateWorkItemInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  parent_work_item_id: idSchema.optional(),
  description: z.string().optional(),
  priority_id: z.number().int().positive().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  developer_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
});

export const reqCreateSystemWorkItemV4Input = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  parent_work_item_id: idSchema.optional(),
  description: z.string().optional(),
  priority_id: z.number().int().positive().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  developer_id: idSchema.optional(),
  domain_id: z.number().int().positive().optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().nonnegative().optional(),
  actual_work_hours: z.number().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqCreateWorkItemV2Input = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  parent_work_item_id: idSchema.optional(),
  description: z.string().optional(),
  priority_id: z.number().int().positive().optional(),
  iteration_id: idSchema.optional(),
  module_id: idSchema.optional(),
  severity_id: z.number().int().positive().optional(),
  status_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  developer_id: idSchema.optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  start_date: z.number().int().positive().optional(),
  due_date: z.number().int().positive().optional(),
  plan_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqCreateEpicIssueInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema.default(5),
  priority_id: z.number().int().positive().optional(),
  title: z.string().min(1),
  parent_issue_id: z.number().int().positive().optional(),
  description: z.string().optional(),
  due_date: z.number().int().positive().optional(),
  start_date: z.number().int().positive().optional(),
  severity_id: z.number().int().positive().optional(),
  done_ratio: z.number().int().nonnegative().optional(),
  status_id: z.number().int().positive().optional(),
  expected_work_hours: z.number().int().nonnegative().optional(),
  plan_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqQuickCreateChildWorkItemInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  parent_issue_id: z.number().int().positive(),
  tracker_id: z.number().int().positive(),
  assigned_to_id: z.number().int().positive().optional(),
  fixed_version_id: z.string().min(1).optional(),
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
  developer_id: idSchema.optional(),
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

export const reqDeleteWorkItemV3Input = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  type: z.string().min(1).default("scrum"),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteWorkItemsInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1).max(100),
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteWorkItemsV2TokenInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1).max(100),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqCopyWorkItemsInput = z.object({
  from_project_id: idSchema,
  to_project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  copy_comments: z.boolean().default(false),
  copy_work_hours: z.boolean().default(false),
  dry_run: z.boolean().default(true)
});

export const reqBatchUpdateWorkItemsInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1),
  status_id: z.number().int().positive().optional(),
  priority_id: z.number().int().positive().optional(),
  severity_id: z.number().int().positive().optional(),
  assigned_id: idSchema.optional(),
  developer_id: idSchema.optional(),
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
    typeof input.developer_id !== "undefined" ||
    typeof input.done_ratio !== "undefined" ||
    typeof input.iteration_id !== "undefined" ||
    typeof input.module_id !== "undefined",
  {
    message:
      "At least one of status_id, priority_id, severity_id, assigned_id, developer_id, done_ratio, iteration_id, or module_id is required",
    path: ["status_id"]
  }
);

export const reqBatchUpdateWorkItemsV2TokenInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1).max(100),
  x_auth_token: z.string().min(10),
  assigned_to_id: z.string().min(1).optional(),
  dry_run: z.boolean().default(true)
}).refine(
  (input) => typeof input.assigned_to_id !== "undefined",
  {
    message: "At least one token-header mutable field is required; currently supported: assigned_to_id",
    path: ["assigned_to_id"]
  }
);

export const reqListWorkItemsInput = pagingSchema.extend({
  project_id: idSchema
});

export const reqListWorkItemsV3Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    tracker_id: z.string().min(1).optional()
  });

export const reqListWorkItemsV4Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    subject: z.string().min(1).optional(),
    tracker_id: z.string().min(1).optional(),
    status_id: z.string().min(1).optional(),
    assigned_id: z.string().min(1).optional(),
    created_on: z.string().min(1).optional(),
    updated_on: z.string().min(1).optional(),
    due_date: z.string().min(1).optional(),
    custom_fields: z.record(z.string(), z.unknown()).optional()
  });

export const reqListQueryIssuesInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    show_type: z.enum(["kanban", "simpleParam"]).default("kanban"),
    filters: z.array(z.record(z.string(), z.unknown())).max(200).optional(),
    sort: z.array(z.record(z.string(), z.unknown())).max(20).optional()
  });

export const reqExportWorkItemsNewV2Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    fields: z.string().min(1).default(
      "id,subject,tracker,status,priority,severity,assigned_to,created_on,updated_on,start_date,due_date"
    ),
    export_child: z.boolean().default(true),
    type: z.enum(["tree", "list"]).default("list"),
    time_zone: z.number().int().default(8),
    export_all: z.boolean().default(false),
    tracker_id: z.string().min(1).optional(),
    dry_run: z.boolean().default(true)
  });

const reqTodoWorkItemsBaseInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    subject: z.string().min(1).max(100).optional(),
    created_on: z.string().min(1).optional(),
    updated_on: z.string().min(1).optional(),
    closed_on: z.string().min(1).optional(),
    start_date: z.string().min(1).optional(),
    due_date: z.string().min(1).optional(),
    tracker_id: z.string().min(1).optional(),
    status_id: z.string().min(1).optional(),
    author_id: z.string().min(1).optional(),
    developer_id: z.string().min(1).optional(),
    priority_id: z.string().min(1).optional()
  });

export const reqSearchTodoWorkItemsInput = reqTodoWorkItemsBaseInput;

export const reqSearchMyWorkItemsInput = reqTodoWorkItemsBaseInput;

export const reqCountWorkItemTreeInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    tracker_ids: z.array(reqTrackerIdSchema).min(1).optional()
  });

export const reqListWorkItemTreeInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    tracker_ids: z.array(reqTrackerIdSchema).min(1).optional()
  });

export const reqListWorkItemTagsInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    name: z.string().min(1).optional()
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

export const reqListParentWorkItemsInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqListWorkItemStayTimesInput = z.object({
  project_id: idSchema,
  work_item_ids: z.array(idSchema).min(1).max(100)
});

export const reqGetWorkItemIssueDetailsInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  include: z.string().min(1).default("children,parent")
});

export const reqGetWorkItemIndexCountsInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqGetWorkItemCompletionRateInput = z.object({
  project_id: idSchema
});

export const reqGetProjectDueDaysAfterInput = z.object({
  project_id: idSchema
});

export const reqGetProjectWorkhourConfigInput = z.object({
  project_id: idSchema
});

export const reqListProjectWorkHourTypesInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    status: z.number().int().positive().optional()
  });

export const reqListProjectWorkHourTypesV5Input = z.object({
  project_id: idSchema,
  status: z.number().int().min(0).max(2).optional()
});

const reqChildWorkItemQueryTypeSchema = z.string().min(1);

export const reqListChildWorkItemsInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    parent_id: idSchema,
    subject: z.string().optional(),
    query_type: reqChildWorkItemQueryTypeSchema.default("basic")
  });

export const reqListChildWorkItemsV4Input = z.object({
  project_id: idSchema,
  parent_id: idSchema,
  tracker_id: z.string().min(1).optional(),
  query_type: reqChildWorkItemQueryTypeSchema.default("basic")
});

export const reqListChildWorkItemsDirectV4Input = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqListWorkItemAssignedStatusConfigsInput = z.object({
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

export const reqListProjectWorkItemRecordsInput = pagingSchema
  .extend({
    project_id: idSchema,
    operated_time_interval: z.string().min(1).optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListWorkItemWorkHoursInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqGetWorkHourPermissionInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqUploadWorkItemImageInput = z.object({
  project_id: idSchema,
  file_path: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqUploadIssuesImgInput = z.object({
  project_id: idSchema,
  upload_ym: z.string().min(1),
  img_name: z.string().min(1),
  extention: z.string().min(1),
  x_auth_token: z.string().min(10)
});

export const reqUploadWorkItemImageV2Input = z.object({
  project_id: idSchema,
  file_path: z.string().min(1),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqDownloadImageFileInput = z.object({
  project_id: idSchema,
  image_uri: z.string().min(1)
});

export const reqUploadAttachmentInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  file_path: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqUploadAttachmentV3Input = z.object({
  file_path: z.string().min(1),
  tiny_form_datas: z.string().min(1),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqCreateWorkItemWithAttachmentV3Input = z.object({
  issue_call_back_param: z.record(z.string(), z.unknown()),
  type: z.string().min(1).default("scrum"),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqWatchWorkItemInput = z.object({
  work_item_id: idSchema,
  type: z.string().min(1).default("scrum"),
  x_auth_token: z.string().min(10),
  dry_run: z.boolean().default(true)
});

export const reqDownloadAttachmentInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  attachment_id: idSchema
});

const reqWorkHourTimestampSchema = z.union([z.string().min(1), z.number().int().positive()]);

export const reqAddWorkItemWorkHourInput = z
  .object({
    project_id: idSchema,
    work_item_id: idSchema,
    work_hours: z.number().positive(),
    start_date: z.string().min(1).optional(),
    due_date: z.string().min(1).optional(),
    start_date_timestamp: reqWorkHourTimestampSchema.optional(),
    due_date_timestamp: reqWorkHourTimestampSchema.optional(),
    use_timestamp: z.boolean().optional(),
    region: z.string().min(1).optional(),
    dry_run: z.boolean().default(true)
  })
  .refine(
    (input) =>
      (typeof input.start_date !== "undefined" && typeof input.due_date !== "undefined") ||
      (typeof input.start_date_timestamp !== "undefined" &&
        typeof input.due_date_timestamp !== "undefined"),
    {
      message:
        "Provide either start_date and due_date, or start_date_timestamp and due_date_timestamp",
      path: ["start_date"]
    }
  );

export const reqUpdateWorkingHoursInput = z.object({
  project_id: idSchema,
  issue_id: z.union([idSchema, z.number().int().positive()]).transform(String),
  work_hours_id: idSchema,
  summary: z.string().min(1).max(128).optional(),
  work_hours: z.number().nonnegative().max(100000000).optional(),
  work_hour_type: z.number().int().positive().optional(),
  dry_run: z.boolean().default(true)
});

export const reqListProjectWorkHoursInput = pagingSchema
  .extend({
    project_ids: z.array(idSchema).min(1),
    begin_time: z.string().min(1).optional(),
    end_time: z.string().min(1).optional(),
    work_hours_dates: z.string().min(1).optional(),
    work_hours_types: z.string().min(1).optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListProjectUserWorkHoursInput = pagingSchema
  .extend({
    project_id: idSchema,
    user_id: idSchema.optional(),
    user_name: z.string().min(1).optional(),
    begin_time: z.string().min(1).optional(),
    end_time: z.string().min(1).optional(),
    work_hours_dates: z.string().min(1).optional(),
    work_hours_types: z.string().min(1).optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListProjectMemberWorkHoursInput = pagingSchema
  .extend({
    project_id: idSchema.optional(),
    staff_id: idSchema.optional(),
    begin_time: z.string().min(1).optional(),
    end_time: z.string().min(1).optional(),
    work_hours_dates: z.string().min(1).optional(),
    work_hours_types: z.string().min(1).optional()
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqDeleteAttachmentInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  attachment_id: idSchema,
  dry_run: z.boolean().default(true)
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

export const reqListAssociatedIssuesV4Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    work_item_id: idSchema
  });

export const reqListAssociatedCommitsInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema,
    type: z.string().min(1).default("commit")
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListAssociatedCodeV2Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    work_item_id: idSchema,
    type: z.string().min(1).default("commit")
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

export const reqListAssociatedWikisInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqListAssociatedWikisV5Input = z.object({
  project_id: idSchema,
  work_item_id: idSchema
});

export const reqListRelatedUsersInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemStatusesInput = z.object({
  project_id: idSchema
});

export const reqCheckWorkItemStatusNameInput = z.object({
  project_id: idSchema,
  status_name: z.string().min(1).max(15)
});

export const reqCreateProjectStatusConfigInput = z.object({
  project_id: idSchema,
  defined_name: z.string().min(1).max(15),
  status_attribute: z.number().int().positive(),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqBatchCreateTrackerConfigInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema,
  status_config_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const reqUpdateTrackerConfigInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema,
  status_config_id: idSchema,
  new_position: z.number().int().nonnegative(),
  dry_run: z.boolean().default(true)
});

export const reqListWorkItemStatusAttributesInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemStatusDetailsInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
});

export const reqListWorkItemStatusConfigsInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
});

export const reqListOptionalWorkItemStatusConfigsInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
});

export const reqGetProjectPublicConfigInput = z.object({
  project_id: idSchema
});

export const reqListWorkItemWorkflowConfigInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
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
  tracker_id: reqTrackerIdSchema.optional()
});

export const reqListWorkSettingTemplatesV2Input = z.object({
  search: z.string().min(1).optional()
});

const reqCreateWorkItemTemplateFieldConfigInput = z.object({
  field: z.string().min(1).optional(),
  is_required: z.number().int().nonnegative().optional(),
  default_value: z.string().optional(),
  position: z.number().int().nonnegative().optional(),
  is_visible: z.boolean().optional()
});

export const reqCreateWorkItemTemplateInput = z
  .object({
    project_id: idSchema,
    tracker_id: reqTrackerIdSchema,
    description: z.string().optional(),
    issue_field_configs: z.array(reqCreateWorkItemTemplateFieldConfigInput).min(1).optional(),
    dry_run: z.boolean().default(true)
  })
  .refine(
    (input) =>
      typeof input.description !== "undefined" ||
      (input.issue_field_configs?.length ?? 0) > 0,
    {
      message: "description or issue_field_configs is required",
      path: ["description"]
    }
  );

export const reqGetWorkItemTemplateConfigInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
});

export const reqListWorkItemCustomFieldsInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema.optional()
});

export const reqCreateWorkItemCustomFieldInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).max(15),
  type: z.enum(["textArea", "select", "radio", "text", "checkbox", "date", "time_date", "number"]),
  scrum_type: z.enum(["Epic", "Feature", "Story", "Task", "Bug"]),
  memo: z.string().max(255).optional(),
  options: z.string().min(1).max(6000).optional(),
  dry_run: z.boolean().default(true)
});

export const reqListWorkItemCustomFieldsV4Input = z.object({
  project_id: idSchema,
  custom_fields: z.array(z.string().min(1)).min(1).optional(),
  included_not_in_use: z.boolean().optional(),
  names: z.array(z.string().min(1)).min(1).optional()
});

export const reqListWorkItemCommentsV2Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    work_item_id: idSchema,
    type: z.string().min(1).default("scrum"),
    page_size: z.number().int().positive().max(100).default(10)
  });

export const reqListWorkItemRecordsV2Input = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    project_id: idSchema,
    work_item_id: idSchema,
    type: z.string().min(1).default("scrum"),
    page_size: z.number().int().positive().max(1000).default(10)
  });

export const reqGetWorkItemStatusRuleFlagInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
});

export const reqListWorkItemTrackerHandlersInput = z.object({
  project_id: idSchema,
  tracker_id: reqTrackerIdSchema
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

export const reqUpdateCacheSettingInput = z
  .object({
    project_id: idSchema,
    type: z.string().min(1).default("backlog"),
    fields: z.array(z.string().min(1)).min(1),
    dry_run: z.boolean().default(true)
  });

export const reqUpdateWorkItemFlowInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  status_id: z.number().int().positive(),
  dry_run: z.boolean().default(true)
});
