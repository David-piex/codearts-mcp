import { z } from "zod";
import { idSchema, pagingSchema } from "../../../contracts/common-schemas.js";

export const reqListWorkItemCommentsInput = pagingSchema
  .extend({
    project_id: idSchema,
    work_item_id: idSchema
  })
  .omit({
    keyword: true,
    sort_by: true,
    sort_order: true
  });

export const reqAddWorkItemCommentInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  content: z.string().min(1),
  dry_run: z.boolean().default(true)
});

export const reqUpdateWorkItemCommentInput = z.object({
  project_id: idSchema,
  work_item_id: idSchema,
  comment_id: idSchema,
  content: z.string().min(1),
  dry_run: z.boolean().default(true)
});
