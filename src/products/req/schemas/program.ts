import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

const programPagingSchema = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    page_size: z.number().int().positive().max(100).default(20)
  });

const largeProgramPagingSchema = pagingSchema
  .pick({
    page: true,
    page_size: true
  })
  .extend({
    page_size: z.number().int().positive().max(1000).default(20)
  });

export const reqListProgramsInput = programPagingSchema.extend({
  search: z.string().min(1).optional(),
  sort_key: z.enum(["name", "created_time"]).optional(),
  sort_dir: z.enum(["ASC", "DESC", "asc", "desc"]).optional(),
  is_watched: z.boolean().optional()
});

export const reqListProgramFieldsInput = z.object({
  program_id: idSchema,
  field_type: z.enum(["IR", "RR"])
});

export const reqGetIrInput = z.object({
  program_id: idSchema,
  ir_id: idSchema
});

export const reqListIrChildrenInput = largeProgramPagingSchema.extend({
  program_id: idSchema,
  ir_id: idSchema,
  query_type: z.enum(["RR", "ITEMS"])
});

export const reqListIrHistoriesInput = largeProgramPagingSchema.extend({
  ir_id: idSchema
});

export const reqListRrStatusesInput = z.object({
  program_id: idSchema,
  rr_ids: z.array(idSchema).min(1).max(100)
});

export const reqListRrsInput = largeProgramPagingSchema.extend({
  program_id: idSchema,
  query_type: z.enum(["ALL", "DST", "SRC"]).default("ALL"),
  include_deleted: z.boolean().optional(),
  updated_time_interval: z.string().min(1).optional()
});

export const reqListRrHistoriesInput = largeProgramPagingSchema.extend({
  rr_id: idSchema
});

export const reqListIssueSeveritiesInput = z.object({});
