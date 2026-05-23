import { pipelineGetPermissionInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getUserPermission: (input: { project_id: string; pipeline_id: string }) => Promise<{
    user_permission: Record<string, unknown>;
  }>;
};

export function createPipelineGetUserPermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetPermissionInput.parse(input);
    const response = await client.getUserPermission(parsed);
    const result = mapPipelineRawItem(
      "Loaded pipeline user permission",
      parsed.pipeline_id,
      "userPermission",
      response.user_permission
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
