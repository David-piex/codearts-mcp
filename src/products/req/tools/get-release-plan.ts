import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetReleasePlanInput } from "../schemas.js";
import { toReleasePlanItem, type ReleasePlanMutationResult } from "./release-plan-mappers.js";

export function mapReleasePlan(input: ReleasePlanMutationResult) {
  return asItemResult(`Loaded release plan ${input.plan.id ?? ""}`, {
    projectId: input.project_id,
    status: input.status,
    message: input.message,
    plan: toReleasePlanItem(input.plan)
  });
}

type ReqGetReleasePlanClient = {
  getReleasePlan: (input: { project_id: string; plan_id: string }) => Promise<ReleasePlanMutationResult>;
};

export function createReqGetReleasePlanHandler(client: ReqGetReleasePlanClient) {
  return async (input: unknown) => {
    const parsed = reqGetReleasePlanInput.parse(input);
    const response = await client.getReleasePlan(parsed);
    const result = mapReleasePlan(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
