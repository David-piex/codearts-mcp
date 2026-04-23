import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectPublicConfigInput } from "../schemas.js";

type ReqProjectPublicConfig = {
  project_id: string;
  closed_workitem_readonly_mode?: boolean;
};

export function mapReqProjectPublicConfig(input: ReqProjectPublicConfig) {
  return asItemResult(`Loaded project public config for ${input.project_id}`, {
    projectId: input.project_id,
    closedWorkItemReadonlyMode: input.closed_workitem_readonly_mode
  });
}

type ReqGetProjectPublicConfigClient = {
  getProjectPublicConfig: (input: { project_id: string }) => Promise<ReqProjectPublicConfig>;
};

export function createReqGetProjectPublicConfigHandler(client: ReqGetProjectPublicConfigClient) {
  return async (input: unknown) => {
    const parsed = reqGetProjectPublicConfigInput.parse(input);
    const response = await client.getProjectPublicConfig(parsed);
    const result = mapReqProjectPublicConfig(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
