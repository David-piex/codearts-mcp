import { buildGetProjectDefaultPermissionInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  getProjectDefaultPermission: (input: { project_id: string }) => Promise<{
    project_id: string;
    permissions: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildGetProjectDefaultPermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetProjectDefaultPermissionInput.parse(input);
    const response = await client.getProjectDefaultPermission(parsed);
    const result = mapBuildRecordList(response.permissions, response.total, "project default permissions", "permission");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
