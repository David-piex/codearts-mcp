import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreatePlanInput } from "../schemas.js";

export function previewCreatePlan(input: {
  project_id: string;
  name: string;
  type: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create plan ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    type: input.type,
    executed: false
  });
}

export function mapCreatedPlan(input: {
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
  return asItemResult(`Created plan ${input.name}`, {
    id: String(input.id),
    projectId: input.project_id,
    name: input.name,
    type: input.type,
    imageUrl: input.img_url,
    creator: input.creator,
    executed: true
  });
}

type ReqCreatePlanClient = {
  createPlan: (input: {
    project_id: string;
    name: string;
    type: string;
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

export function createReqCreatePlanHandler(client: ReqCreatePlanClient) {
  return async (input: unknown) => {
    const parsed = reqCreatePlanInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePlan(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createPlan(parsed);
    const result = mapCreatedPlan(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
