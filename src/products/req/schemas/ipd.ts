import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const ipdConditionSchema = z
  .object({
    values: z.array(z.string()).optional(),
    operator: z.string().optional()
  })
  .passthrough();

const ipdPagingSchema = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    page_size: z.number().int().positive().max(1000).default(20)
  });

export const reqListIpdProjectsInput = z.object({
  search: z.string().optional(),
  model: z.enum(["10001", "10002", "10003"]).optional()
});

export const reqListIpdProjectUsersInput = z.object({
  project_id: idSchema
});

export const reqGetIpdIssueInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  version: z.enum(["v1", "v2"]).default("v2")
});

export const reqListIpdIssuesInput = ipdPagingSchema.extend({
  project_id: idSchema,
  issue_type: z.string().min(1),
  filter: z.array(z.record(z.string(), ipdConditionSchema)).max(200).optional(),
  filter_mode: z.enum(["OR_AND", "AND_OR"]).default("AND_OR")
});

const ipdSortInfoSchema = z
  .object({
    field: z.string().optional(),
    asc: z.boolean().optional()
  })
  .passthrough();

const ipdDateFilterSchema = z
  .object({
    start_date: z.string().optional(),
    end_date: z.string().optional()
  })
  .passthrough();

export const reqListIpdIssueTreeInput = ipdPagingSchema.extend({
  project_id: idSchema,
  category: z.string().min(1),
  keyword: z.string().optional(),
  number: z.array(z.string()).optional(),
  plan: z
    .array(
      z
        .object({
          plan_pi: z.string().optional(),
          plan_iteration: z.array(z.string()).optional()
        })
        .passthrough()
    )
    .optional(),
  modified_date: ipdDateFilterSchema.optional()
});

export const reqListIpdAttachedWikisInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  category: z.string().optional()
});

export const reqGroupIpdIssuesInput = ipdPagingSchema.extend({
  project_id: idSchema,
  issue_type: z.string().min(1),
  group_field_id: idSchema,
  is_project_group: z.boolean().optional(),
  group_sort: z.enum(["asc", "desc"]).optional(),
  filter: z.array(z.record(z.string(), ipdConditionSchema)).max(200).optional(),
  filter_mode: z.enum(["OR_AND", "AND_OR"]).default("AND_OR"),
  sort: z.array(ipdSortInfoSchema).optional(),
  page_size: z.number().int().positive().max(200).default(20)
});

export const reqListIpdTenantIssuesInput = ipdPagingSchema.extend({
  project_id: z.union([idSchema, z.array(idSchema).max(10)]).optional(),
  issue_type: z.string().min(1),
  filter: z.array(z.record(z.string(), ipdConditionSchema)).max(200).optional(),
  filter_mode: z.enum(["OR_AND", "AND_OR"]).default("AND_OR"),
  sort: z.array(ipdSortInfoSchema).optional(),
  page_size: z.number().int().positive().max(200).default(20)
});

export const reqListIpdModulesInput = ipdPagingSchema.extend({
  project_id: idSchema
});

export const reqListIpdStatusesInput = z.object({
  project_id: idSchema,
  category_id: idSchema.optional()
});

export const reqListIpdIssueRelationConfigInput = z.object({
  project_id: idSchema
});

export const reqListIpdLabelsInput = ipdPagingSchema.extend({
  project_id: idSchema
});

export const reqListIpdProjectFieldsInput = ipdPagingSchema.extend({
  project_id: idSchema
});

export const reqListIpdIssueFieldsInput = z.object({
  project_id: idSchema,
  category_id: idSchema
});

export const reqListIpdTenantFieldsInput = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    page_size: z.number().int().positive().max(200).default(20),
    search: z.string().optional(),
    sort_info: z
      .object({
        field: z.string().optional(),
        asc: z.boolean().optional()
      })
      .optional()
  });

export const reqGetIpdTenantFieldUsedInput = z.object({
  field_id: idSchema
});

export const reqGetIpdTenantFieldOptionUsedInput = z.object({
  code: z.string().min(1)
});

export const reqGetIpdProjectFieldOptionUsedInput = z.object({
  project_id: idSchema,
  code: z.string().min(1)
});

export const reqListIpdWorkflowTemplatesInput = z.object({
  project_id: idSchema,
  category_id: idSchema.optional()
});

export const reqListIpdWorkflowFieldsInput = z.object({
  project_id: idSchema,
  category_id: idSchema
});

export const reqListIpdSnapshotVersionsInput = z.object({
  project_id: idSchema
});

export const reqListIpdFeatureSetsInput = z.object({
  project_id: idSchema,
  snapshot_version_id: idSchema.optional()
});

export const reqListIpdSnapshotFeaturesInput = ipdPagingSchema.extend({
  project_id: idSchema,
  snapshot_version_id: idSchema,
  feature_set_id: idSchema
});

export const reqGetIpdE2EGraphInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  category: z.string().min(1),
  is_src: z.boolean().optional()
});

export const reqListIpdCategoryStatusesInput = z.object({
  project_id: idSchema,
  category_id: idSchema
});

export const reqGetIpdStatisticDashboardInput = z.object({
  project_id: idSchema,
  classification: z.enum(["requirement", "bug"]),
  plan: z
    .object({
      plan_pi: z.string().optional(),
      plan_iteration: z.string().optional()
    })
    .optional(),
  created_date: ipdDateFilterSchema.optional()
});

export const reqGetIpdWorkItemFlowDetailInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  issue_category: z.string().min(1)
});

export const reqTransferIpdWorkItemFlowInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  issue_category: z.string().min(1),
  flow_code: z.string().min(1),
  process_context: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const reqBatchTransferIpdWorkItemFlowInput = z.object({
  project_id: idSchema,
  issue_ids: z.array(idSchema).min(1),
  issue_category: z.string().min(1),
  flow_code: z.string().min(1),
  is_recover: z.boolean().default(false),
  process_context: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

const reqIpdUserEntityInput = z
  .object({
    id: idSchema.optional(),
    name: z.string().optional(),
    nick_name: z.string().optional()
  })
  .passthrough();

const reqIpdLabelEntityInput = z
  .object({
    id: idSchema.optional(),
    label_type: z.string().optional(),
    color: z.string().optional(),
    title: z.string().optional()
  })
  .passthrough();

const reqIpdCustomFieldInput = z.object({
  code: z.string().min(1),
  value: z.union([z.string(), z.number(), z.boolean(), z.null()])
});

const reqIpdIssueUpdateAttributeInput = z
  .object({
    category: z.string().min(1),
    title: z.string().min(1).max(256).optional(),
    description: z.string().min(1).max(50000).optional(),
    parent_id: idSchema.optional(),
    status: z.string().optional(),
    assignee: reqIpdUserEntityInput.optional(),
    assigned_cc: z.array(reqIpdUserEntityInput).max(50).optional(),
    submitted_by: z.array(reqIpdUserEntityInput).optional(),
    recipient: z.array(reqIpdUserEntityInput).optional(),
    labels: z.array(reqIpdLabelEntityInput).optional(),
    custom_fields: z.array(reqIpdCustomFieldInput).optional(),
    priority: z.string().optional(),
    workload: z.string().optional(),
    plan_pi: idSchema.optional(),
    plan_iteration: idSchema.optional(),
    business_domain: z.string().optional(),
    feature_set: idSchema.optional(),
    plan_end_date: z.union([z.string(), z.number().int()]).optional(),
    link: z.string().optional(),
    suspended: z.boolean().optional(),
    break_status: z.string().optional(),
    baseline: z.string().optional(),
    status_modified_time: z.union([z.string(), z.number().int()]).optional(),
    extra_fields: z.record(z.string(), z.unknown()).optional()
  })
  .passthrough();

const reqIpdBatchCreateIssueInput = reqIpdIssueUpdateAttributeInput
  .extend({
    title: z.string().min(1).max(256),
    description: z.string().max(500000),
    category: z.string().min(1),
    status: z.string().min(1),
    assignee: reqIpdUserEntityInput.optional(),
    parent_id: idSchema.optional(),
    children: z.array(z.record(z.string(), z.unknown())).optional(),
    ir2feature: z.string().optional(),
    ir2rr: z.string().optional(),
    related_network_security: z.string().optional(),
    collaboratives: z.string().optional()
  })
  .passthrough();

export const reqCreateIpdIssueInput = z.object({
  project_id: idSchema,
  title: z.string().min(1).max(256),
  description: z.string().max(500000),
  category: z.string().min(1),
  assignee: idSchema,
  status: z.string().optional(),
  src_domain: idSchema.optional(),
  submitted_by: idSchema.optional(),
  domain_id: idSchema.optional(),
  recipient: z.array(idSchema).optional(),
  expect_delivery_time: z.number().int().optional(),
  priority: z.string().optional(),
  assigned_cc: z.array(idSchema).max(50).optional(),
  plan_pi: idSchema.optional(),
  plan_iteration: idSchema.optional(),
  plan_start_date: z.number().int().optional(),
  plan_end_date: z.number().int().optional(),
  workload_man_day: z.number().optional(),
  business_domain: z.string().optional(),
  need_break: z.string().optional(),
  extra_fields: z.record(z.string(), z.unknown()).optional(),
  dry_run: z.boolean().default(true)
});

export const reqBatchCreateIpdIssuesInput = z.object({
  project_id: idSchema,
  issues: z.array(reqIpdBatchCreateIssueInput).min(1),
  dry_run: z.boolean().default(true)
});

export const reqBatchUpdateIpdIssuesInput = z.object({
  project_id: idSchema,
  issue_ids: z.array(idSchema).min(1),
  attribute: reqIpdIssueUpdateAttributeInput,
  dry_run: z.boolean().default(true)
});

export const reqBatchDeleteIpdIssuesInput = z.object({
  project_id: idSchema,
  issue_ids: z.array(idSchema).min(1).max(50),
  is_permanent_delete: z.boolean().optional(),
  src_project_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqUploadIpdIssueAttachmentInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  file_path: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqListIpdIssueAttachmentsInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  source_project_id: idSchema.optional()
});

export const reqDownloadIpdIssueAttachmentInput = z.object({
  project_id: idSchema,
  attachment_id: idSchema
});

export const reqUploadIpdIssueImageInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  file_path: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqDeleteIpdIssueImageInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  file_name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqDownloadIpdIssueImageInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  file_name: z.string().min(1),
  field_code: z.string().max(64).optional()
});

export const reqListIpdWorkHoursInput = ipdPagingSchema.extend({
  project_id: idSchema,
  plan_pi: z.array(idSchema).optional(),
  plan_iteration: z.array(idSchema).optional(),
  workitem_id: z.array(idSchema).optional(),
  created_by: z.array(idSchema).optional(),
  page_size: z.number().int().positive().max(200).default(20)
});

export const reqListIpdWorkHourCategoriesInput = z.object({
  project_id: idSchema,
  display_value: z.string().max(30).optional()
});

export const reqCreateIpdWorkHourInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  work_date_begin: z.string().min(1),
  work_date_end: z.string().min(1),
  work_hours: z.union([z.string(), z.number()]),
  work_hour_type: z.union([z.literal(1), z.literal(2), z.string().min(1)]),
  include_weekend: z.boolean(),
  work_hour_category: z.string().optional(),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateIpdWorkHourInput = z
  .object({
    project_id: idSchema,
    issue_id: idSchema,
    workhour_id: idSchema,
    work_hours: z.union([z.string(), z.number()]).optional(),
    work_hour_category: z.string().optional(),
    description: z.string().optional(),
    dry_run: z.boolean().default(true)
  })
  .refine(
    (value) =>
      typeof value.work_hours !== "undefined" ||
      typeof value.work_hour_category !== "undefined" ||
      typeof value.description !== "undefined",
    {
      message: "At least one of work_hours, work_hour_category or description must be provided"
    }
  );

export const reqDeleteIpdWorkHourInput = z.object({
  project_id: idSchema,
  issue_id: idSchema,
  workhour_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqCreateIpdModuleInput = z.object({
  project_id: idSchema,
  display_value: z.string().min(2).max(30),
  parent_id: idSchema,
  description: z.string().max(255).optional(),
  assignee: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateIpdModuleInput = reqCreateIpdModuleInput.extend({
  module_id: idSchema
});

export const reqDeleteIpdModuleInput = z.object({
  project_id: idSchema,
  module_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqCreateIpdLabelInput = z.object({
  project_id: idSchema,
  label_type: z.string().min(1),
  color: z.string().min(1).max(16),
  title: z.string().min(1).max(15),
  dry_run: z.boolean().default(true)
});

export const reqUpdateIpdLabelInput = z
  .object({
    project_id: idSchema,
    label_id: idSchema,
    label_type: z.string().min(1),
    color: z.string().min(1).max(16).optional(),
    title: z.string().min(1).max(15).optional(),
    dry_run: z.boolean().default(true)
  })
  .refine((value) => typeof value.color !== "undefined" || typeof value.title !== "undefined", {
    message: "At least one of color or title must be provided"
  });

export const reqDeleteIpdLabelInput = z.object({
  project_id: idSchema,
  label_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqCreateIpdFeatureSetInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  parent_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqUpdateIpdFeatureSetInput = z.object({
  project_id: idSchema,
  feature_set_id: idSchema,
  parent_id: idSchema,
  title: z.string().min(1).optional(),
  position_float: z.number().optional(),
  dry_run: z.boolean().default(true)
});

export const reqDeleteIpdFeatureSetInput = z.object({
  project_id: idSchema,
  feature_set_id: idSchema,
  dry_run: z.boolean().default(true)
});

const reqIpdFieldOptionInput = z
  .object({
    id: idSchema.optional(),
    code: z.string().optional(),
    display_value: z.string().optional(),
    value: z.string().optional(),
    level: z.number().int().optional(),
    sequence: z.number().int().optional(),
    parent_id: idSchema.optional()
  })
  .passthrough();

const reqIpdFieldMutationBase = z
  .object({
    id: idSchema.optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    created_by: z.string().optional(),
    field_type: z.string().optional(),
    show_on_card: z.boolean().optional(),
    optional: z.boolean().optional(),
    all_options: z.array(reqIpdFieldOptionInput).optional(),
    default_value: z.string().optional(),
    definition_type: z.string().optional(),
    option: z.union([reqIpdFieldOptionInput, z.array(reqIpdFieldOptionInput)]).optional(),
    field_type_id: z.string().optional(),
    user_visibility: z.boolean().optional(),
    modified_date: z.string().optional(),
    modified_by: z.string().optional(),
    name: z.string().optional(),
    has_same_display_name: z.boolean().optional(),
    field_type_name: z.string().optional(),
    created_date: z.string().optional(),
    extra_fields: z.record(z.string(), z.unknown()).optional(),
    dry_run: z.boolean().default(true)
  })
  .passthrough();

export const reqUpdateIpdTenantFieldInput = reqIpdFieldMutationBase
  .extend({
    field_id: idSchema
  })
  .refine((value) => Object.keys(value).some((key) => !["field_id", "dry_run"].includes(key)), {
    message: "At least one field attribute must be provided"
  });

export const reqUpdateIpdProjectFieldInput = reqIpdFieldMutationBase
  .extend({
    project_id: idSchema,
    field_id: idSchema
  })
  .refine((value) => Object.keys(value).some((key) => !["project_id", "field_id", "dry_run"].includes(key)), {
    message: "At least one field attribute must be provided"
  });
