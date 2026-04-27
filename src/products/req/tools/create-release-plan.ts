import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateReleasePlanInput } from "../schemas.js";
import { mapReleasePlanMutation, type ReleasePlanMutationResult } from "./release-plan-mappers.js";

export function previewCreateReleasePlan(input: {
  project_id: string;
  title: string;
  category: string;
  plan_start_date: string | number;
  plan_end_date: string | number;
  description?: string;
  parent_id?: string;
  workload?: string;
  owner?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create release plan ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    category: input.category,
    planStartDate: input.plan_start_date,
    planEndDate: input.plan_end_date,
    description: input.description,
    parentId: input.parent_id,
    workload: input.workload,
    owner: input.owner,
    executed: false
  });
}

type ReqCreateReleasePlanClient = {
  createReleasePlan: (input: {
    project_id: string;
    title: string;
    category: string;
    plan_start_date: string | number;
    plan_end_date: string | number;
    description?: string;
    parent_id?: string;
    workload?: string;
    owner?: string;
  }) => Promise<ReleasePlanMutationResult>;
};

export function createReqCreateReleasePlanHandler(client: ReqCreateReleasePlanClient) {
  return async (input: unknown) => {
    const parsed = reqCreateReleasePlanInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateReleasePlan(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createReleasePlan(parsed);
    const result = mapReleasePlanMutation(`Created release plan ${response.plan.title ?? ""}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
