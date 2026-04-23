import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeletePlanInput } from "../schemas.js";

export function previewDeletePlan(input: {
  project_id: string;
  plan_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete plan ${input.plan_id}`, {
    id: input.plan_id,
    projectId: input.project_id,
    deleted: false,
    executed: false
  });
}

export function mapDeletedPlan(input: {
  project_id: string;
  plan_id: string;
}) {
  return asItemResult(`Deleted plan ${input.plan_id}`, {
    id: input.plan_id,
    projectId: input.project_id,
    deleted: true,
    executed: true
  });
}

type ReqDeletePlanClient = {
  deletePlan: (input: { project_id: string; plan_id: string }) => Promise<{
    project_id: string;
    plan_id: string;
    deleted: true;
  }>;
};

export function createReqDeletePlanHandler(client: ReqDeletePlanClient) {
  return async (input: unknown) => {
    const parsed = reqDeletePlanInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePlan(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deletePlan(parsed);
    const result = mapDeletedPlan(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
