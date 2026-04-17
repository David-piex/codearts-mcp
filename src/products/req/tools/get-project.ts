import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectInput } from "../schemas.js";

export function mapReqProject(input: {
  project_id: string;
  name: string;
  project_num_id?: number;
  description?: string;
}) {
  return asItemResult(`Loaded project ${input.project_id}`, {
    id: input.project_id,
    name: input.name,
    numberId: input.project_num_id,
    description: input.description
  });
}

type ReqGetProjectClient = {
  getProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    name: string;
    project_num_id?: number;
    description?: string;
  }>;
};

export function createReqGetProjectHandler(client: ReqGetProjectClient) {
  return async (input: unknown) => {
    const parsed = reqGetProjectInput.parse(input);
    const response = await client.getProject(parsed);
    const result = mapReqProject(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
