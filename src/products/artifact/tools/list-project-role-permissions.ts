import { artifactListProjectRolePermissionsInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listProjectRolePermissions: (input: { project_id: string }) => Promise<{
    permissions: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListProjectRolePermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListProjectRolePermissionsInput.parse(input);
    const response = await client.listProjectRolePermissions(parsed);
    const result = mapArtifactRecordList(response.permissions, response.total, "project role permissions", "permission");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
