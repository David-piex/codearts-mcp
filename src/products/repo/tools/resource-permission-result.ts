import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoRepositoryPermissionInheritSetting,
  RepoResourcePermissionInfo,
  RepoResourcePermissionUpdateInput,
  RepoResourcePermissionUpdateResult
} from "../client.js";

export type ResourcePermissionUpdateInput = RepoResourcePermissionUpdateInput;

function mapPermissionDetail(detail: unknown) {
  if (detail === null || typeof detail !== "object") {
    return detail;
  }

  const permission = detail as Record<string, unknown>;

  return {
    permissionId: permission.permission_id === undefined ? undefined : String(permission.permission_id),
    action: permission.action,
    displayName: permission.display_name,
    displayNameCn: permission.display_name_cn,
    enabled: permission.enabled,
    editable: permission.editable
  };
}

function mapResourcePermissions(resourcePermissions: unknown) {
  if (resourcePermissions === null || typeof resourcePermissions !== "object" || Array.isArray(resourcePermissions)) {
    return resourcePermissions;
  }

  return Object.fromEntries(
    Object.entries(resourcePermissions as Record<string, unknown>).map(([key, value]) => [
      key,
      mapPermissionDetail(value)
    ])
  );
}

export function mapResourcePermission(item: RepoResourcePermissionInfo) {
  return {
    roleId: item.role_id,
    roleName: item.role_name,
    roleNameCn: item.role_name_cn,
    resourcePermissions: mapResourcePermissions(item.resource_permissions)
  };
}

export function mapResourcePermissionList(
  summary: string,
  items: RepoResourcePermissionInfo[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapResourcePermission),
    toPageInfo(page, pageSize, total)
  );
}

export function mapResourcePermissionUpdateResult(
  summary: string,
  item: RepoResourcePermissionUpdateResult
) {
  return asItemResult(summary, {
    status: item.status,
    message: item.message
  });
}

export function mapRepositoryPermissionInheritSetting(
  summary: string,
  item: RepoRepositoryPermissionInheritSetting
) {
  return asItemResult(summary, {
    inheritParentPermission: item.inherit_parent_permission
  });
}

export function previewResourcePermissionMutation(input: {
  repository_id?: string;
  group_id?: string;
  resource_name?: string;
  resource_id?: string;
  data: RepoResourcePermissionUpdateInput[];
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    groupId: input.group_id,
    resourceName: input.resource_name,
    resourceId: input.resource_id,
    roleCount: input.data.length,
    data: input.data.map((item) => ({
      roleId: item.role_id,
      roleName: item.role_name,
      permissionCount: item.permissions?.length ?? 0,
      permissions: (item.permissions ?? []).map((permission) => ({
        permissionId: permission.permission_id === undefined ? undefined : String(permission.permission_id),
        enabled: permission.enabled
      }))
    })),
    executed: !input.dry_run
  };
}

export function previewRepositoryPermissionInheritMutation(input: {
  repository_id: string;
  inherit_parent_permission: boolean;
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    inheritParentPermission: input.inherit_parent_permission,
    executed: !input.dry_run
  };
}
