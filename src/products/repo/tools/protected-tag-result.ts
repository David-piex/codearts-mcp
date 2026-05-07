import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoProtectedTag, RepoProtectedTagAction } from "../client.js";

export type ProtectedTagActionInput = {
  action?: "create";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
};

function mapProtectedTagAction(action: RepoProtectedTagAction) {
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

export function mapProtectedTag(item: RepoProtectedTag) {
  return {
    id: String(item.id),
    name: item.name,
    actionCount: item.actions?.length ?? 0,
    actions: (item.actions ?? []).map(mapProtectedTagAction)
  };
}

export function mapProtectedTagItem(summary: string, item: RepoProtectedTag) {
  return asItemResult(summary, mapProtectedTag(item));
}

export function mapProtectedTagList(
  summary: string,
  items: RepoProtectedTag[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapProtectedTag),
    toPageInfo(page, pageSize, total)
  );
}

export function previewProtectedTagMutation(input: {
  repository_id: string;
  names?: string[];
  tag_name?: string;
  actions?: ProtectedTagActionInput[];
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    names: input.names,
    tagName: input.tag_name,
    actionCount: input.actions?.length ?? 0,
    actions: (input.actions ?? []).map((action) => ({
      action: action.action,
      enable: action.enable,
      userCount: action.user_ids?.length ?? 0,
      userTeamCount: action.user_team_ids?.length ?? 0,
      roleCount: action.related_role_ids?.length ?? 0
    })),
    executed: !input.dry_run
  };
}
