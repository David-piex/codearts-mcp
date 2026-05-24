import { asListResult } from "../../../contracts/tool-result.js";

export type DeployPermissionRecord = Record<string, unknown> & {
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

export function mapDeployPermissions(summary: string, items: DeployPermissionRecord[]) {
  return asListResult(
    summary,
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
