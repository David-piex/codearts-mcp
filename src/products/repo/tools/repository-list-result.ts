import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoRepositoryMember,
  RepoRepositorySummary,
  RepoRepositoryUserGroup
} from "../client.js";

function mapRepositorySummary(input: RepoRepositorySummary) {
  return {
    id: input.id !== undefined ? String(input.id) : undefined,
    name: input.name,
    namespace: input.namespace,
    path: input.path,
    developMode: input.develop_mode,
    visibility: input.visibility,
    security: input.security,
    starCount: input.star_count,
    forksCount: input.forks_count,
    openMergeRequestsCount: input.open_merge_requests_count,
    starred: input.starred,
    nameWithNamespace: input.name_with_namespace,
    lastActivityAt: input.last_activity_at,
    archived: input.archived,
    memberCount: input.member_count,
    uuid: input.uuid,
    description: input.description,
    sshUrl: input.ssh_url_to_repo ?? input.ssh_url,
    httpUrl: input.http_url_to_repo ?? input.http_url,
    status: input.status,
    projectName: input.project_name,
    projectId: input.project_id,
    creatorId: input.creator_id !== undefined ? String(input.creator_id) : undefined
  };
}

export function mapRepositorySummaryList(
  summary: string,
  items: RepoRepositorySummary[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapRepositorySummary),
    toPageInfo(page, pageSize, total)
  );
}

export function mapCurrentUserRepositories(
  items: RepoRepositorySummary[],
  page: number,
  pageSize: number,
  total?: number
) {
  return mapRepositorySummaryList(
    `${items.length} current user repositories found`,
    items,
    page,
    pageSize,
    total
  );
}

export function mapGroupRepositories(
  items: RepoRepositorySummary[],
  page: number,
  pageSize: number,
  total?: number
) {
  return mapRepositorySummaryList(
    `${items.length} group repositories found`,
    items,
    page,
    pageSize,
    total
  );
}

export function mapRepositoryUserGroups(
  items: RepoRepositoryUserGroup[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository user groups found`,
    items.map((item) => ({
      id: item.user_group_id !== undefined
        ? String(item.user_group_id)
        : item.member_group_id !== undefined
          ? String(item.member_group_id)
          : undefined,
      name: item.user_group_name ?? item.member_group_name,
      projectId: item.project_id,
      userCount: item.user_count ?? item.member_count,
      description: item.description
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryMembers(
  items: RepoRepositoryMember[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository members found`,
    items.map((item) => ({
      userId: item.user_id !== undefined ? String(item.user_id) : undefined,
      userIamId: item.user_iam_id,
      userName: item.user_name,
      userNickName: item.user_nick_name,
      tenantName: item.tenant_name,
      tenantId: item.tenant_id,
      repoCreator: item.is_repo_creator,
      groupCreator: item.is_group_creator,
      projectAdmin: item.is_Project_admin,
      projectRoleName: item.project_role_name,
      repositoryRoleName: item.repository_role_name,
      repositoryRoleId: item.repository_role_Id,
      memberSource: item.member_source,
      memberGroupSource: item.member_group_source,
      memberSourceId: item.member_source_id,
      serviceLicenseStatus: item.service_license_status,
      actionEnabled: item.action_enabled
    })),
    toPageInfo(page, pageSize, total)
  );
}
