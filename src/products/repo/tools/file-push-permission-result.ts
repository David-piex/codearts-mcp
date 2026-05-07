import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoRepositoryFilePushPermission } from "../client.js";

export type FilePushPermissionActionInput = {
  action?: "push";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
};

export type FilePushPermissionMutationInput = {
  id?: string | number;
  path?: string;
  actions?: FilePushPermissionActionInput[];
};

function mapAction(action: NonNullable<RepoRepositoryFilePushPermission["actions"]>[number]) {
  return {
    action: action.action,
    enable: action.enable,
    userCount: action.users?.length ?? 0,
    userTeamCount: action.user_teams?.length ?? 0,
    roleCount: action.roles?.length ?? 0,
    users: (action.users ?? []).map((user) => ({
      id: user.id === undefined ? undefined : String(user.id),
      name: user.name,
      username: user.username,
      state: user.state
    })),
    userTeams: (action.user_teams ?? []).map((team) => ({
      id: team.id === undefined ? undefined : String(team.id),
      name: team.name
    })),
    roles: (action.roles ?? []).map((role) => ({
      id: role.id === undefined ? undefined : String(role.id),
      name: role.name,
      relatedRoleId: role.related_role_id,
      chineseName: role.chinese_name
    }))
  };
}

export function mapFilePushPermission(item: RepoRepositoryFilePushPermission) {
  return {
    id: String(item.id),
    path: item.path,
    actionCount: item.actions?.length ?? 0,
    actions: (item.actions ?? []).map(mapAction)
  };
}

export function mapFilePushPermissionItem(summary: string, item: RepoRepositoryFilePushPermission) {
  return asItemResult(summary, mapFilePushPermission(item));
}

export function mapFilePushPermissionList(
  summary: string,
  items: RepoRepositoryFilePushPermission[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapFilePushPermission),
    toPageInfo(page, pageSize, total)
  );
}

export function previewFilePushPermissionMutation(input: {
  repository_id: string;
  path?: string;
  permissions?: FilePushPermissionMutationInput[];
  actions?: FilePushPermissionActionInput[];
  dry_run: boolean;
}) {
  const permissionItems = input.permissions ?? [{ path: input.path, actions: input.actions }];

  return {
    repositoryId: input.repository_id,
    path: input.path,
    permissionCount: permissionItems.length,
    permissions: permissionItems.map((permission) => ({
      id: permission.id === undefined ? undefined : String(permission.id),
      path: permission.path,
      actionCount: permission.actions?.length ?? 0,
      actions: (permission.actions ?? []).map((action) => ({
        action: action.action,
        enable: action.enable,
        userCount: action.user_ids?.length ?? 0,
        userTeamCount: action.user_team_ids?.length ?? 0,
        roleCount: action.related_role_ids?.length ?? 0
      }))
    })),
    executed: !input.dry_run
  };
}
