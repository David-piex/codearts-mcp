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
  can_add_host?: boolean;
  can_deploy?: boolean;
};

export function mapDeployPermissionRecord(item: DeployPermissionRecord) {
  return {
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
    ...(typeof item.can_add_host !== "undefined" ? { canAddHost: item.can_add_host } : {}),
    ...(typeof item.can_deploy !== "undefined" ? { canDeploy: item.can_deploy } : {}),
    permission: item
  };
}

export function mapDeployPermissions(summary: string, items: DeployPermissionRecord[]) {
  return asListResult(
    summary,
    items.map((item) => mapDeployPermissionRecord(item))
  );
}
