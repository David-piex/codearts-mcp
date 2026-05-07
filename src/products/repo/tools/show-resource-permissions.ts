import type { RepoResourcePermissionInfo } from "../client.js";
import { repoShowResourcePermissionsInput } from "../schemas.js";
import { mapResourcePermissionList } from "./resource-permission-result.js";

type RepoShowResourcePermissionsClient = {
  showResourcePermissions: (input: {
    group_id: string;
    resource_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    permissions: RepoResourcePermissionInfo[];
    total?: number;
  }>;
};

export function createRepoShowResourcePermissionsHandler(client: RepoShowResourcePermissionsClient) {
  return async (input: unknown) => {
    const parsed = repoShowResourcePermissionsInput.parse(input);
    const response = await client.showResourcePermissions(parsed);
    const result = mapResourcePermissionList(
      `${response.permissions.length} group resource permission roles found`,
      response.permissions,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
