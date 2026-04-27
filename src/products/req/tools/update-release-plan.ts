import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateReleasePlanInput } from "../schemas.js";
import { mapReleasePlanMutation, type ReleasePlanMutationResult } from "./release-plan-mappers.js";

export function previewUpdateReleasePlan(input: {
  project_id: string;
  plan_id: string;
  title?: string;
  category?: string;
  description?: string;
  status?: string;
  plan_start_date?: string | number;
  plan_end_date?: string | number;
  created_date?: number;
  parent_id?: string;
  baseline?: string;
  workload?: string;
  owner?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update release plan ${input.plan_id}`, {
    projectId: input.project_id,
    id: input.plan_id,
    title: input.title,
    category: input.category,
    description: input.description,
    status: input.status,
    planStartDate: input.plan_start_date,
    planEndDate: input.plan_end_date,
    createdDate: input.created_date,
    parentId: input.parent_id,
    baseline: input.baseline,
    workload: input.workload,
    owner: input.owner,
    executed: false
  });
}

type ReqUpdateReleasePlanClient = {
  updateReleasePlan: (input: {
    project_id: string;
    plan_id: string;
    title?: string;
    category?: string;
    description?: string;
    status?: string;
    plan_start_date?: string | number;
    plan_end_date?: string | number;
    created_date?: number;
    parent_id?: string;
    baseline?: string;
    workload?: string;
    owner?: string;
  }) => Promise<ReleasePlanMutationResult>;
};

export function createReqUpdateReleasePlanHandler(client: ReqUpdateReleasePlanClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateReleasePlanInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateReleasePlan(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateReleasePlan(parsed);
    const result = mapReleasePlanMutation(`Updated release plan ${response.plan.id ?? parsed.plan_id}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
