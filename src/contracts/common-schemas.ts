import { z } from "zod";

export const idSchema = z.string().min(1);

export const pagingSchema = z.object({
  page: z.number().int().positive().default(1),
  page_size: z.number().int().positive().max(200).default(20),
  keyword: z.string().optional(),
  sort_by: z.string().optional(),
  sort_order: z.enum(["asc", "desc"]).optional()
});
