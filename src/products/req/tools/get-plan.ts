import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetPlanInput } from "../schemas.js";

export function mapReqPlan(input: {
  id: number | string;
  name: string;
  type?: string;
  project_id?: string;
  creator?: string;
  updater?: string;
  created_on?: string;
  updated_on?: string;
}) {
  return asItemResult(`Loaded plan ${input.id}`, {
    id: String(input.id),
    name: input.name,
    type: input.type,
    projectId: input.project_id,
    creator: input.creator,
    updater: input.updater,
    createdOn: input.created_on,
    updatedOn: input.updated_on
  });
}

type ReqGetPlanClient = {
  getPlan: (input: { project_id: string; plan_id: string }) => Promise<{
    id: number | string;
    name: string;
    type?: string;
    project_id?: string;
    creator?: string;
    updater?: string;
    created_on?: string;
    updated_on?: string;
  }>;
};

export function createReqGetPlanHandler(client: ReqGetPlanClient) {
  return async (input: unknown) => {
    const parsed = reqGetPlanInput.parse(input);
    const response = await client.getPlan(parsed);
    const result = mapReqPlan(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
