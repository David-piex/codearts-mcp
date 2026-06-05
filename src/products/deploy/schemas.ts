import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

const deployV4ListBodyInput = z.object({
  limit: z.number().int().positive().max(200).optional(),
  offset: z.number().int().nonnegative().optional(),
  keyword: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  sort_by: z.string().optional(),
  sort_order: z.enum(["asc", "desc"]).optional(),
  body: z.record(z.string(), z.unknown()).default({})
});

const deployV4RecordActionBodyInput = z.object({
  reason: z.string().optional(),
  description: z.string().optional(),
  operator: z.string().optional(),
  body: z.record(z.string(), z.unknown()).default({})
});

export const deployListAppsInput = pagingSchema.extend({
  project_id: idSchema
});

export const deployListV4ApplicationsInput = z.object({
  project_id: idSchema,
  limit: z.number().int().positive().max(200).default(20),
  offset: z.number().int().nonnegative().default(0),
  keyword: z.string().optional()
});

export const deployListV4ClustersInput = deployV4ListBodyInput.extend({
  project_id: idSchema,
  cluster_type: z.enum(["host", "container"])
});

export const deployGetV4ClusterInput = z.object({
  project_id: idSchema,
  cluster_id: idSchema,
  cluster_type: z.enum(["host", "container"])
});

export const deployGetV4ClusterHostInput = z.object({
  project_id: idSchema,
  cluster_id: idSchema,
  host_id: idSchema
});

export const deployDeleteV4ClusterHostsInput = z.object({
  project_id: idSchema,
  cluster_id: idSchema,
  host_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const deployGetV4ClusterCountInput = z.object({
  project_id: idSchema,
  cluster_type: z.enum(["host", "container"])
});

export const deployListV4ClusterHostsInput = deployV4ListBodyInput.extend({
  project_id: idSchema,
  cluster_id: idSchema,
  ip: z.string().optional(),
  os: z.string().optional(),
  connection_status: z.string().optional()
});

export const deployGetV4EnvironmentInput = z.object({
  project_id: idSchema,
  environment_id: idSchema
});

export const deployGetV4EnvironmentResourceDetailInput = z.object({
  project_id: idSchema,
  environment_id: idSchema
});

export const deployListV4EnvironmentHostsInput = z.object({
  project_id: idSchema,
  environment_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const deployAddV4EnvironmentHostsInput = z.object({
  project_id: idSchema,
  environment_id: idSchema,
  cluster_id: idSchema,
  host_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const deployDeleteV4EnvironmentHostsInput = z.object({
  project_id: idSchema,
  environment_id: idSchema,
  host_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const deployListV4EnvironmentsInput = z.object({
  project_id: idSchema,
  limit: z.number().int().positive().max(200).default(20),
  offset: z.number().int().nonnegative().default(0)
});

export const deployListV4EnvironmentApplicationsInput = z.object({
  project_id: idSchema,
  environment_id: idSchema,
  limit: z.number().int().positive().max(200).default(20),
  offset: z.number().int().nonnegative().default(0)
});

export const deployListDeploymentUnitsInput = z.object({
  project_id: idSchema,
  app_id: idSchema
});

export const deployListV4OrchestrationsInput = z.object({
  project_id: idSchema,
  app_id: idSchema,
  limit: z.number().int().positive().max(200).default(20),
  offset: z.number().int().nonnegative().default(0)
});

export const deployListV4DeployRecordsInput = z.object({
  project_id: idSchema,
  limit: z.number().int().positive().max(200).default(20),
  offset: z.number().int().nonnegative().default(0)
});

export const deployGetLastRecordDetailInput = z.object({
  project_id: idSchema,
  orchestration_id: idSchema
});

export const deployGetV4DeployRecordInput = z.object({
  project_id: idSchema,
  record_id: idSchema,
  step_id: idSchema.optional()
});

export const deployGetV4DeployRecordStepDetailInput = z.object({
  project_id: idSchema,
  record_id: idSchema
});

export const deployGetV4DeployRecordStepLogsInput = z.object({
  project_id: idSchema,
  record_id: idSchema,
  step_id: idSchema,
  offset: z.union([z.string(), z.number()]).optional(),
  limit: z.number().int().positive().max(1000).optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  body: z.record(z.string(), z.unknown()).default({})
});

export const deployCancelV4DeployRecordInput = deployV4RecordActionBodyInput.extend({
  project_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployRerunV4DeployRecordInput = deployV4RecordActionBodyInput.extend({
  project_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployRetryV4DeployRecordInput = deployV4RecordActionBodyInput.extend({
  project_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployRollbackV4DeployRecordInput = deployV4RecordActionBodyInput.extend({
  project_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployPassV4ManualCheckInput = z.object({
  project_id: idSchema,
  record_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployRefuseV4ManualCheckInput = z.object({
  project_id: idSchema,
  record_id: idSchema,
  step_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployListAppHostGroupsInput = pagingSchema.extend({
  application_id: idSchema,
  project_id: idSchema
});

export const deployListHostGroupsInput = pagingSchema.extend({
  project_id: idSchema
});

export const deployListHostGroupsV2Input = pagingSchema.extend({
  project_id: idSchema.optional(),
  keyword: z.string().optional(),
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const deployGetHostGroupInput = z.object({
  group_id: idSchema
});

export const deployGetHostGroupV2Input = z.object({
  group_id: idSchema
});

export const deployListHostGroupHostsInput = pagingSchema.extend({
  group_id: idSchema
});

export const deployListHostGroupHostsV2Input = pagingSchema.extend({
  group_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const deployGetHostGroupHostV2Input = z.object({
  group_id: idSchema,
  host_id: idSchema
});

export const deployGetHostGroupHostInput = z.object({
  group_id: idSchema,
  host_id: idSchema
});

export const deployGetHostGroupPermissionsInput = z.object({
  group_id: idSchema
});

export const deployUpdateHostGroupPermissionsInput = z.object({
  group_id: idSchema,
  project_id: idSchema,
  role_id: idSchema,
  permission_name: z.enum([
    "can_view",
    "can_edit",
    "can_delete",
    "can_add_host",
    "can_manage",
    "can_copy"
  ]),
  permission_value: z.boolean(),
  dry_run: z.boolean().default(true)
});

export const deployListHostGroupEnvironmentsInput = pagingSchema.extend({
  group_id: idSchema
});

export const deployCreateEnvironmentInput = z.object({
  application_id: idSchema,
  project_id: idSchema,
  name: z.string().min(1),
  os: z.string().min(1).default("linux"),
  deploy_type: z.number().int().nonnegative().default(0),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const deployGetApplicationEnvironmentInput = z.object({
  application_id: idSchema,
  environment_id: idSchema
});

export const deployUpdateApplicationEnvironmentInput = z
  .object({
    application_id: idSchema,
    environment_id: idSchema,
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    dry_run: z.boolean().default(true)
  })
  .refine((input) => input.name !== undefined || input.description !== undefined, {
    message: "At least one of name or description is required"
  });

export const deployDeleteApplicationEnvironmentInput = z.object({
  application_id: idSchema,
  environment_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployBatchDeleteApplicationsInput = z.object({
  project_id: idSchema,
  application_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const deployUpdateApplicationPermissionLevelInput = z.object({
  project_id: idSchema,
  application_ids: z.array(idSchema).min(1),
  permission_level: z.enum(["project", "instance"]),
  dry_run: z.boolean().default(true)
});

const deployV2OperationInput = z
  .object({
    id: idSchema.optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    code: z.string().optional(),
    params: z.string().optional(),
    entrance: z.string().optional(),
    version: z.string().optional(),
    module_id: z.string().optional()
  })
  .passthrough();

const deployCreateApplicationArrangeInfoInput = z
  .object({
    template_id: idSchema,
    operation_list: z.array(deployV2OperationInput).default([])
  })
  .passthrough();

export const deployCreateApplicationInput = z
  .object({
  project_id: idSchema,
  name: z.string().min(1),
  description: z.string().default(""),
  timeout: z.number().nullable().optional(),
  trigger: z
    .object({
      trigger_source: z.string().default("0"),
      artifact_source_system: z.string().default(""),
      artifact_type: z.string().default("")
    })
    .default({
      trigger_source: "0",
      artifact_source_system: "",
      artifact_type: ""
    }),
  slave_cluster_id: z.string().default(""),
  slave_resource_type: z.string().default(""),
  create_type: z.string().default("template"),
  is_draft: z.boolean().default(false),
  group_id: z.string().optional(),
  agency_urn: z.string().optional(),
  arrange_infos: z
    .array(deployCreateApplicationArrangeInfoInput)
    .min(1),
  dry_run: z.boolean().default(true)
});

const deployModifyApplicationArrangeInfoInput = z
  .object({
    id: idSchema.optional(),
    deploy_system: z.string().optional(),
    template_id: idSchema,
    operation_list: z.array(deployV2OperationInput).default([])
  })
  .passthrough();

export const deployModifyApplicationInput = z
  .object({
  id: idSchema,
  project_id: idSchema,
  name: z.string().min(1),
  description: z.string().default(""),
  timeout: z.number().nullable().optional(),
  trigger: z
    .object({
      trigger_source: z.string().default("0"),
      artifact_source_system: z.string().default(""),
      artifact_type: z.string().default("")
    })
    .default({
      trigger_source: "0",
      artifact_source_system: "",
      artifact_type: ""
    }),
  slave_cluster_id: z.string().default(""),
  slave_resource_type: z.string().default(""),
  create_type: z.string().default("template"),
  is_draft: z.boolean().default(false),
  group_id: z.string().optional(),
  agency_urn: z.string().optional(),
  arrange_infos: z
    .array(deployModifyApplicationArrangeInfoInput)
    .min(1),
  dry_run: z.boolean().default(true)
});

export const deployCreateTaskByTemplateInput = z.object({
  project_id: idSchema,
  project_name: z.string().min(1),
  template_id: idSchema,
  task_name: z.string().min(1),
  configs: z
    .array(
      z.object({
        name: z.string().min(1),
        type: z.string().min(1).optional(),
        description: z.string().optional(),
        value: z.string().optional(),
        static_status: z.number().int().optional(),
        limits: z
          .array(
            z.object({
              name: z.string().min(1),
              value: z.string().optional()
            })
          )
          .optional()
      })
    )
    .default([]),
  dry_run: z.boolean().default(true)
});

export const deployListEnvironmentHostsInput = pagingSchema.extend({
  application_id: idSchema,
  environment_id: idSchema,
  key_field: z.string().min(1).optional(),
  as_proxy: z.boolean().optional()
});

export const deployImportHostsToEnvironmentInput = z.object({
  application_id: idSchema,
  environment_id: idSchema,
  group_id: idSchema,
  host_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const deployListTasksInput = pagingSchema.extend({
  project_id: idSchema
});

export const deployGetAppInput = z.object({
  application_id: idSchema
});

export const deployGetTaskInput = z.object({
  task_id: idSchema
});

export const deployGetDeploySourceDetailInput = z.object({
  task_id: idSchema
});

export const deployGetTemplateDetailInput = z.object({
  template_id: idSchema,
  task_id: idSchema.optional()
});

export const deployListEnvironmentsInput = pagingSchema.extend({
  application_id: idSchema,
  project_id: idSchema
});

export const deployListAppOperationsLogInput = z.object({
  app_id: idSchema,
  page_size: z.number().int().positive().max(100).default(20),
  page_index: z.number().int().positive().default(1),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const deployListHistoriesInput = pagingSchema.extend({
  project_id: idSchema,
  task_id: idSchema,
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const deployGetStatusInput = z.object({
  task_id: idSchema,
  record_id: idSchema.optional()
});

export const deployStartAppInput = z.object({
  task_id: idSchema,
  trigger_source: z.union([z.literal(0), z.literal(1), z.literal("0"), z.literal("1")]).optional(),
  params: z
    .array(
      z.object({
        name: z.string().min(1),
        type: z.string().min(1).optional(),
        value: z.string().optional()
      })
    )
    .default([]),
  dry_run: z.boolean().default(true)
});

export const deployStopAppInput = z.object({
  task_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployRollbackAppInput = z.object({
  task_id: idSchema,
  record_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployGetHistoryDetailInput = z.object({
  task_id: idSchema,
  record_id: idSchema
});

export const deployGetExecutionParamsInput = z.object({
  task_id: idSchema,
  record_id: idSchema
});

export const deployGetRuntimeVariablesInput = z.object({
  project_id: idSchema,
  app_id: idSchema.optional()
});

export const deployQueryVariablesInput = z
  .object({
    project_id: idSchema,
    level: z.enum(["app", "env", "app_env"]),
    app_id: idSchema.optional(),
    env_id: idSchema.optional()
  })
  .superRefine((input, ctx) => {
    if (input.level === "app" && !input.app_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["app_id"],
        message: "app_id is required when level=app"
      });
    }

    if (input.level === "env" && !input.env_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["env_id"],
        message: "env_id is required when level=env"
      });
    }

    if (input.level === "app_env") {
      if (!input.app_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["app_id"],
          message: "app_id is required when level=app_env"
        });
      }

      if (!input.env_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["env_id"],
          message: "env_id is required when level=app_env"
        });
      }
    }
  });

export const deployListVariablesInput = z
  .object({
    project_id: idSchema,
    level: z.enum(["app", "env", "app_env"]),
    app_id: idSchema.optional(),
    env_id: idSchema.optional()
  })
  .superRefine((input, ctx) => {
    if (input.level === "app" && !input.app_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["app_id"],
        message: "app_id is required when level=app"
      });
    }

    if (input.level === "env" && !input.env_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["env_id"],
        message: "env_id is required when level=env"
      });
    }

    if (input.level === "app_env") {
      if (!input.app_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["app_id"],
          message: "app_id is required when level=app_env"
        });
      }

      if (!input.env_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["env_id"],
          message: "env_id is required when level=app_env"
        });
      }
    }
  });

export const deployListVariableHistoryInput = deployListVariablesInput;

export const deployGetAppLogInput = z.object({
  application_id: idSchema,
  record_id: idSchema,
  step_id: idSchema.optional(),
  offset: z.string().default("0"),
  end_offset: z.string().default("0")
});

export const deployListSystemConfigsInput = z.object({});

export const deployCheckApplicationExistsInput = z.object({
  project_id: idSchema,
  name: z.string().min(1)
});

export const deployListApplicationPermissionsInput = z.object({
  app_id: idSchema.optional(),
  project_id: idSchema.optional()
}).refine((input) => Boolean(input.app_id || input.project_id), {
  message: "app_id or project_id is required"
});

export const deployGetApplicationMessagesInput = z.object({
  project_id: idSchema,
  app_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const deployListApplicationGroupsInput = z.object({
  project_id: idSchema
});

export const deployCreateApplicationGroupInput = z.object({
  project_id: idSchema,
  name: z.string().min(1),
  parent_id: idSchema.optional(),
  dry_run: z.boolean().default(true)
});

export const deployUpdateApplicationGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  name: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const deployDeleteApplicationGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const deployMoveApplicationGroupInput = z.object({
  project_id: idSchema,
  id: idSchema,
  movement: z.union([z.literal(1), z.literal(-1)]),
  dry_run: z.boolean().default(true)
});

export const deployMoveApplicationsToGroupInput = z.object({
  project_id: idSchema,
  group_id: idSchema,
  application_ids: z.array(idSchema).min(1),
  dry_run: z.boolean().default(true)
});

export const deployGetSuccessRateMetricsInput = z.object({
  project_id: idSchema,
  query: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({})
});

export const deployGetTaskSuccessRateMetricsInput = z.object({
  project_id: idSchema,
  body: z.record(z.string(), z.unknown()).default({})
});

export const deployGetEnvironmentPermissionsInput = z.object({
  application_id: idSchema,
  environment_id: idSchema
});

export const deployUpdateEnvironmentPermissionsInput = z
  .object({
    application_id: idSchema,
    environment_id: idSchema,
    role_id: idSchema.optional(),
    permission_name: z
      .enum(["can_view", "can_edit", "can_delete", "can_deploy", "can_manage"])
      .optional(),
    permission_value: z.boolean().optional(),
    dry_run: z.boolean().default(true)
  })
  .refine(
    (input) =>
      input.role_id !== undefined ||
      input.permission_name !== undefined ||
      input.permission_value !== undefined,
    {
      message: "At least one of role_id, permission_name, or permission_value is required"
    }
  );

export const deployCheckApplicationCreatableInput = z.object({
  project_id: idSchema
});

export const deployCheckHostGroupCreatableInput = z.object({
  project_id: idSchema
});
