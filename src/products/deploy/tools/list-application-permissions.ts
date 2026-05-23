import { asListResult } from "../../../contracts/tool-result.js";
import { deployListApplicationPermissionsInput } from "../schemas.js";

type PermissionRecord = Record<string, unknown> & {
  role_id?: string;
  role_type?: string;
  name?: string;
  region?: string;
  can_modify?: boolean;
  can_delete?: boolean;
  can_view?: boolean;
  can_execute?: boolean;
  can_copy?: boolean;
  can_manage?: boolean;
  can_create_env?: boolean;
  can_disable?: boolean;
};

type Client = {
  listApplicationPermissions: (input: { app_id?: string; project_id?: string }) => Promise<{
    app_id?: string;
    project_id?: string;
    permissions: PermissionRecord[];
    status?: string;
    raw: unknown;
  }>;
};

export function mapDeployApplicationPermissions(items: PermissionRecord[]) {
  return asListResult(
    `${items.length} deploy application permissions found`,
    items.map((item) => ({
      id: String(item.role_id ?? item.name ?? ""),
      roleId: item.role_id,
      roleType: item.role_type,
      name: item.name,
      region: item.region,
      canModify: item.can_modify,
      canDelete: item.can_delete,
      canView: item.can_view,
      canExecute: item.can_execute,
      canCopy: item.can_copy,
      canManage: item.can_manage,
      canCreateEnv: item.can_create_env,
      canDisable: item.can_disable,
      permission: item
    }))
  );
}

export function createDeployListApplicationPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployListApplicationPermissionsInput.parse(input);
    const response = await client.listApplicationPermissions(parsed);
    const result = mapDeployApplicationPermissions(response.permissions);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        appId: response.app_id,
        projectId: response.project_id,
        status: response.status,
        raw: response.raw
      }
    };
  };
}
