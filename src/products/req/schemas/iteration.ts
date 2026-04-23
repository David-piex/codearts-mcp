import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

export const reqListIterationsInput = pagingSchema.extend({
  project_id: idSchema
});
