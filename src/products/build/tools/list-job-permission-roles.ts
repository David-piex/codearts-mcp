import { buildListJobPermissionRolesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listJobPermissionRoles: (input: { job_id: string }) => Promise<{
    roles: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListJobPermissionRolesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobPermissionRolesInput.parse(input);
    const response = await client.listJobPermissionRoles(parsed);
    const result = mapBuildRecordList(response.roles, response.total, "job permission roles", "role");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
