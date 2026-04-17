import { z } from "zod";
import { idSchema } from "../../contracts/common-schemas.js";

export const governCreateTaskInput = z.object({
  project_id: idSchema,
  file_path: z.string().min(1).max(128),
  file_name: z.string().min(1).max(128),
  file_size: z.number().int().min(0).max(5368709120),
  dry_run: z.boolean().default(true)
});

export const governCreateTaskMultipartFileInput = z.object({
  project_id: idSchema,
  file_path: z.string().min(1).max(128),
  file_name: z.string().min(1).max(128),
  dry_run: z.boolean().default(true)
});

export const governNotifyTaskMultipartFileInput = z.object({
  project_id: idSchema,
  file_path: z.string().min(1).max(128),
  file_name: z.string().min(1).max(128),
  upload_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const governUploadTaskMultipartFileInput = z.object({
  project_id: idSchema,
  file_path: z.string().min(1).max(128),
  file_name: z.string().min(1).max(128),
  upload_id: idSchema,
  part_number: z.number().int().positive(),
  part_size: z.number().int().positive(),
  local_file: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const governGetTaskStatusInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governStopTaskInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const governDeleteTaskInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const governCreatePdfReportInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const governGetPdfReportStatusInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governDownloadPdfReportInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  local_output: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const governCreateExcelReportInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const governGetExcelReportStatusInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governDownloadExcelReportInput = z.object({
  project_id: idSchema,
  task_id: idSchema,
  local_output: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const governListSbcVulnMapInput = z.object({
  project_id: idSchema,
  start_time: z.string().min(1),
  end_time: z.string().min(1)
});

export const governGetVulnInfoInput = z.object({
  project_id: idSchema,
  cve_id: z.string().min(1)
});

export const governGetUserInfoInput = z.object({
  project_id: idSchema,
  user_id: idSchema
});

export const governGetOpenSourceSummaryInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governGetInfoLeakSummaryInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governGetSecCompileSummaryInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governGetSecConfigSummaryInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governGetOpenSourceReportInput = z.object({
  project_id: idSchema,
  task_id: idSchema
});

export const governGetQuotaInfoInput = z.object({
  project_id: idSchema
});

export const governGetOsiStatisticsInput = z.object({
  project_id: idSchema
});

const governOsiFilterSchema = z
  .object({
    software_name: z.string().min(1).optional(),
    artifact_id: z.string().min(1).optional()
  })
  .refine((value) => value.software_name || value.artifact_id, {
    message: "software_name or artifact_id is required"
  });

const governOsiDetailFilterSchema = z.object({
  software_name: z
    .string({ required_error: "software_name and software_version are required" })
    .min(1, "software_name and software_version are required"),
  software_version: z
    .string({ required_error: "software_name and software_version are required" })
    .min(1, "software_name and software_version are required")
});

export const governListOsiItemNamesInput = z.object({
  project_id: idSchema,
  page: z.number().int().positive(),
  page_size: z.number().int().positive()
}).and(governOsiFilterSchema);

export const governListOsiItemVersionsInput = z.object({
  project_id: idSchema,
  page: z.number().int().positive(),
  page_size: z.number().int().positive()
}).and(governOsiFilterSchema);

export const governGetOsiItemDetailInput = z.object({
  project_id: idSchema
}).and(governOsiDetailFilterSchema);

export const governListOsiItemVulnsInput = z.object({
  project_id: idSchema
}).and(governOsiDetailFilterSchema);

export const governListOsiItemDependencyInput = z.object({
  project_id: idSchema
}).and(governOsiDetailFilterSchema);

export const governAlterQuotaInfoInput = z.object({
  project_id: idSchema,
  resource_id: idSchema.optional(),
  change_mode: z.number().int().optional(),
  cloud_service_type: z.string().min(1).optional(),
  period_type: z.number().int().optional(),
  period_num: z.number().int().optional(),
  product_info: z
    .array(
      z.object({
        order_id: z.string().min(1).optional(),
        job_id: z.string().min(1).optional(),
        region_id: z.string().min(1).optional(),
        charging_mode: z.number().int().optional(),
        period_num: z.number().int().optional(),
        period_type: z.number().int().optional(),
        subscription_num: z.number().int().optional(),
        product_id: z.string().min(1).optional(),
        cloud_service_type: z.string().min(1).optional(),
        resource_type: z.string().min(1).optional(),
        resource_spec_code: z.string().min(1).optional(),
        resource_size: z.number().int().optional(),
        resource_size_measure_id: z.number().int().optional()
      })
    )
    .optional(),
  dry_run: z.boolean().default(true)
});
