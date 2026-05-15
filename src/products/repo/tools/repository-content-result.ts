import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoCommitStatistics,
  RepoContributor,
  RepoForkRepository,
  RepoRepositoryLanguages,
  RepoSubmodule
} from "../client.js";

function mapCommitStatistic(item: NonNullable<RepoCommitStatistics["statistics"]>[number]) {
  return {
    id: item.id !== undefined ? String(item.id) : undefined,
    projectId: item.project_id !== undefined ? String(item.project_id) : undefined,
    branch: item.branch,
    userName: item.user_name,
    addLines: item.add_lines,
    deleteLines: item.delete_lines,
    commitCount: item.commit_count,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
}

export function mapRepoSubmodules(items: RepoSubmodule[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} submodules found`,
    items.map((item) => ({
      repoId: item.repo_id !== undefined ? String(item.repo_id) : undefined,
      branch: item.branch,
      path: item.path,
      gitUrl: item.git_url,
      submoduleBranch: item.submodule_branch,
      namespaceUuid: item.namespace_uuid,
      submoduleRepoId: item.submodule_repo_id !== undefined ? String(item.submodule_repo_id) : undefined,
      repoName: item.repo_name,
      subCommitId: item.sub_commitId,
      deployKeyStatus: item.deployKey_status,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapCommitStatistics(input: RepoCommitStatistics) {
  return asItemResult("Fetched repository commit statistics", {
    commits: (input.commits ?? []).map((item) => ({
      authorName: item.author_name,
      date: item.date,
      nickName: item.nick_name,
      tenantName: item.tenant_name,
      userName: item.user_name,
      merge: item.is_merge
    })),
    statistics: (input.statistics ?? []).map(mapCommitStatistic),
    total: input.total
  });
}

export function mapRepositoryLanguages(input: RepoRepositoryLanguages) {
  return asItemResult("Fetched repository language statistics", {
    languages: (input.languages ?? []).map((item) => ({
      color: item.color,
      label: item.label,
      value: item.value
    })),
    status: input.status
  });
}

export function mapRepositoryContributors(
  items: RepoContributor[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository contributors found`,
    items.map((item) => ({
      name: item.name,
      email: item.email,
      commits: item.commits,
      nickName: item.nick_name,
      tenantName: item.tenant_name,
      userName: item.user_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryForks(
  items: RepoForkRepository[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository forks found`,
    items.map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      name: item.name,
      archived: item.archived,
      productId: item.product_id,
      productName: item.product_name,
      pathWithNamespace: item.path_with_namespace,
      namespace: item.namespace,
      path: item.path,
      developMode: item.develop_mode,
      visibility: item.visibility,
      security: item.security,
      starCount: item.star_count,
      forksCount: item.forks_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    })),
    toPageInfo(page, pageSize, total)
  );
}
