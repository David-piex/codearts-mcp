import { asItemResult } from "../../../contracts/tool-result.js";
import type {
  RepoCommitLines,
  RepoLastPushEvent,
  RepoLastStatistics,
  RepoRepositoryStatisticData,
  RepoRepositoryStatisticsStatus,
  RepoRepositoryStatisticsSummary,
  RepoStatisticEvent,
  RepoStatsSummary
} from "../client.js";

function mapStatisticEvent(input?: RepoStatisticEvent) {
  if (!input) {
    return undefined;
  }

  return {
    id: input.id !== undefined ? String(input.id) : undefined,
    userId: input.user_id !== undefined ? String(input.user_id) : undefined,
    projectId: input.project_id !== undefined ? String(input.project_id) : undefined,
    branch: input.branch,
    status: input.status,
    statDate: input.stat_date,
    createdAt: input.created_at,
    updatedAt: input.updated_at
  };
}

export function mapRepositoryStatisticsStatus(input: RepoRepositoryStatisticsStatus) {
  return asItemResult("Fetched repository statistics task status", {
    canStatistics: input.can_statistics,
    reason: input.reason,
    event: mapStatisticEvent(input.event)
  });
}

export function mapLastPushEventInRepository(input: RepoLastPushEvent) {
  return asItemResult("Fetched repository last push event", {
    ref: input.ref,
    createdAt: input.created_at,
    repository: input.repository
      ? {
          id: input.repository.id !== undefined ? String(input.repository.id) : undefined,
          name: input.repository.name,
          path: input.repository.path,
          pathWithNamespace: input.repository.path_with_namespace,
          projectName: input.repository.project_name
        }
      : undefined
  });
}

export function mapRepositoryStatisticsSummary(input: RepoRepositoryStatisticsSummary) {
  return asItemResult("Fetched repository statistics summary", {
    branchesCount: input.branches_count,
    commitsCount: input.commits_count,
    membersCount: input.members_count,
    tagsCount: input.tags_count,
    mergeRequestCount: input.merge_request_count,
    noteCount: input.note_count
  });
}

export function mapRepoStatisticsSummary(input: RepoStatsSummary) {
  return asItemResult("Fetched repository statistics overview", {
    repoName: input.repo_name,
    commitCount: input.commit_count,
    repoSize: input.repo_size,
    lastCommitTime: input.last_commit_time,
    codeLines: input.code_lines,
    branchCount: input.branch_count
  });
}

export function mapRepositoryStatisticData(input: RepoRepositoryStatisticData) {
  return asItemResult("Fetched repository statistic data", {
    repoName: input.repoName,
    commitCount: input.commitCount,
    repoSize: input.repoSize,
    lastCommitTime: input.lastCommitTime,
    codeLines: input.codeLines,
    branchCount: input.branchCount,
    archiveUrl: input.archiveUrl
  });
}

export function mapRepositoryMaster(input: boolean) {
  return asItemResult("Fetched repository master flag", {
    isMaster: input
  });
}

export function mapRepositoryCommitLines(input: RepoCommitLines) {
  return asItemResult("Fetched repository commit line statistics", {
    additions: input.additions,
    deletions: input.deletions
  });
}

export function mapRepoLastStatistics(input: RepoLastStatistics) {
  return asItemResult("Fetched repository last commit statistics", {
    event: mapStatisticEvent(input.event),
    total: input.total,
    statistics: (input.statistics ?? []).map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      projectId: item.project_id !== undefined ? String(item.project_id) : undefined,
      branch: item.branch,
      userName: item.user_name,
      addLines: item.add_lines,
      deleteLines: item.delete_lines,
      commitCount: item.commit_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    })),
    codelines: (input.codelines ?? []).map((item) => ({
      additions: item.additions,
      deletions: item.deletions,
      date: item.date
    })),
    count: input.count,
    allBranchCommitsCount: input.all_branch_commits_count
  });
}
