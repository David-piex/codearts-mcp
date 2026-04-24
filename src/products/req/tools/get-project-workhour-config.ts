import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetProjectWorkhourConfigInput } from "../schemas.js";

type ReqProjectWorkhourConfig = {
  project_id: string;
  workhour_type_required?: boolean;
  workhour_readonly_mode?: boolean;
};

export function mapReqProjectWorkhourConfig(input: ReqProjectWorkhourConfig) {
  return asItemResult(`Loaded project workhour config for ${input.project_id}`, {
    projectId: input.project_id,
    workhourTypeRequired: input.workhour_type_required,
    workhourReadonlyMode: input.workhour_readonly_mode
  });
}

type ReqGetProjectWorkhourConfigClient = {
  getProjectWorkhourConfig: (input: {
    project_id: string;
  }) => Promise<ReqProjectWorkhourConfig>;
};

export function createReqGetProjectWorkhourConfigHandler(
  client: ReqGetProjectWorkhourConfigClient
) {
  return async (input: unknown) => {
    const parsed = reqGetProjectWorkhourConfigInput.parse(input);
    const response = await client.getProjectWorkhourConfig(parsed);
    const result = mapReqProjectWorkhourConfig(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
