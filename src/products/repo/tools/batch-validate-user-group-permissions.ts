import { asListResult } from "../../../contracts/tool-result.js";
import { repoBatchValidateUserGroupPermissionsInput } from "../schemas.js";

type RepoBatchValidateUserGroupPermissionsClient = {
  batchValidateUserGroupPermissions: (input: {
    items: Array<{
      group_id: string;
      project_id?: string;
      group_name?: string;
    }>;
  }) => Promise<Array<{
    group_id?: number | string;
    group_visibility?: string;
    can_create_group?: boolean;
    can_craete_project?: boolean;
    can_set_group?: boolean;
  }>>;
};

export function createRepoBatchValidateUserGroupPermissionsHandler(
  client: RepoBatchValidateUserGroupPermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoBatchValidateUserGroupPermissionsInput.parse(input);
    const items = await client.batchValidateUserGroupPermissions(parsed);
    const result = asListResult(
      `${items.length} user group permission results found`,
      items.map((item) => ({
        groupId: item.group_id !== undefined ? String(item.group_id) : undefined,
        groupVisibility: item.group_visibility,
        canCreateGroup: item.can_create_group,
        canCraeteProject: item.can_craete_project,
        canSetGroup: item.can_set_group
      })),
      {
        page: 1,
        pageSize: items.length,
        total: items.length
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
