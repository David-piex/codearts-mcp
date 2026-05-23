import { pipelineGetPermissionInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getRolePermission: (input: { project_id: string; pipeline_id: string }) => Promise<{
    role_permission: Record<string, unknown>;
  }>;
};

export function createPipelineGetRolePermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetPermissionInput.parse(input);
    const response = await client.getRolePermission(parsed);
    const result = mapPipelineRawItem(
      "Loaded pipeline role permission",
      parsed.pipeline_id,
      "rolePermission",
      response.role_permission
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
