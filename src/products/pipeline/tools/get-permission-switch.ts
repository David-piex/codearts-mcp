import { pipelineGetPermissionInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getPermissionSwitch: (input: { project_id: string; pipeline_id: string }) => Promise<{
    permission_switch: Record<string, unknown>;
  }>;
};

export function createPipelineGetPermissionSwitchHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetPermissionInput.parse(input);
    const response = await client.getPermissionSwitch(parsed);
    const result = mapPipelineRawItem(
      "Loaded pipeline permission switch",
      parsed.pipeline_id,
      "permissionSwitch",
      response.permission_switch
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
