import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdatePlanInput } from "../schemas.js";

export function previewUpdatePlan(input: {
  project_id: string;
  plan_id: string;
  name: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update plan ${input.plan_id}`, {
    id: input.plan_id,
    projectId: input.project_id,
    name: input.name,
    executed: false
  });
}

export function mapUpdatedPlan(input: {
  id: number | string;
  name: string;
  type?: string;
  project_id?: string;
  img_url?: string;
  creator?: {
    user_id?: string;
    domain_id?: string;
    nick_name?: string;
    first_name?: string;
  };
}) {
  return asItemResult(`Updated plan ${input.id}`, {
    id: String(input.id),
    projectId: input.project_id,
    name: input.name,
    type: input.type,
    imageUrl: input.img_url,
    creator: input.creator,
    executed: true
  });
}

type ReqUpdatePlanClient = {
  updatePlan: (input: {
    project_id: string;
    plan_id: string;
    name: string;
  }) => Promise<{
    id: number | string;
    name: string;
    type?: string;
    project_id?: string;
    img_url?: string;
    creator?: {
      user_id?: string;
      domain_id?: string;
      nick_name?: string;
      first_name?: string;
    };
  }>;
};

export function createReqUpdatePlanHandler(client: ReqUpdatePlanClient) {
  return async (input: unknown) => {
    const parsed = reqUpdatePlanInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePlan(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updatePlan(parsed);
    const result = mapUpdatedPlan(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
