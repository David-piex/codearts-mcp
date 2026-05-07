import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoProtectedBranch, RepoProtectedBranchAction } from "../client.js";

export type ProtectedBranchActionInput = {
  action: "push" | "merge";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
  addition_switchers?: Array<{ name: "allowed_force_push"; enable: boolean }>;
};

function mapProtectedBranchAction(action: RepoProtectedBranchAction) {
  return {
    action: action.action,
    enable: action.enable,
    userCount: action.users?.length ?? 0,
    userTeamCount: action.user_teams?.length ?? 0,
    roleCount: action.roles?.length ?? 0,
    additionSwitchers: (action.addition_switchers ?? []).map((switcher) => ({
      name: switcher.name,
      enable: switcher.enable
    })),
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

export function mapProtectedBranch(item: RepoProtectedBranch) {
  return {
    id: String(item.id),
    name: item.name,
    actionCount: item.actions?.length ?? 0,
    actions: (item.actions ?? []).map(mapProtectedBranchAction)
  };
}

export function mapProtectedBranchItem(summary: string, item: RepoProtectedBranch) {
  return asItemResult(summary, mapProtectedBranch(item));
}

export function mapProtectedBranchList(
  summary: string,
  items: RepoProtectedBranch[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapProtectedBranch),
    toPageInfo(page, pageSize, total)
  );
}

export function previewProtectedBranchMutation(input: {
  repository_id: string;
  names?: string[];
  branch_name?: string;
  actions?: ProtectedBranchActionInput[];
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    names: input.names,
    branchName: input.branch_name,
    actionCount: input.actions?.length ?? 0,
    actions: (input.actions ?? []).map((action) => ({
      action: action.action,
      enable: action.enable,
      userCount: action.user_ids?.length ?? 0,
      userTeamCount: action.user_team_ids?.length ?? 0,
      roleCount: action.related_role_ids?.length ?? 0,
      additionSwitcherCount: action.addition_switchers?.length ?? 0
    })),
    executed: !input.dry_run
  };
}
