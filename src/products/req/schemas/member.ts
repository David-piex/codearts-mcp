import { pagingSchema, idSchema } from "../../../contracts/common-schemas.js";

export const reqListProjectMembersInput = pagingSchema.extend({
  project_id: idSchema
});
