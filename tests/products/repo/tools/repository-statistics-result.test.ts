import { describe, expect, it } from "vitest";
import {
  mapLastPushEventInRepository,
  mapRepoLastStatistics,
  mapRepoStatisticsSummary,
  mapRepositoryCommitLines,
  mapRepositoryMaster,
  mapRepositoryStatus,
  mapRepositoryStatisticData,
  mapRepositoryStatisticsStatus,
  mapRepositoryStatisticsSummary
} from "../../../../src/products/repo/tools/repository-statistics-result.js";

describe("repository statistics result mappers", () => {
  it("maps statistics status", () => {
    const result = mapRepositoryStatisticsStatus({
      can_statistics: true,
      reason: 0,
      event: {
        id: 1,
        user_id: 2,
        project_id: 3,
        branch: "master",
        status: "done",
        stat_date: "20260515",
        created_at: "2026-05-15T09:00:00+08:00",
        updated_at: "2026-05-15T09:10:00+08:00"
      }
    });

    expect(result.item).toEqual({
      canStatistics: true,
      reason: 0,
      event: {
        id: "1",
        userId: "2",
        projectId: "3",
        branch: "master",
        status: "done",
        statDate: "20260515",
        createdAt: "2026-05-15T09:00:00+08:00",
        updatedAt: "2026-05-15T09:10:00+08:00"
      }
    });
  });

  it("maps last push and summary responses", () => {
    expect(
      mapLastPushEventInRepository({
        ref: "master",
        created_at: "2026-05-15T09:00:00+08:00",
        repository: {
          id: 100,
          name: "demo",
          path: "demo",
          path_with_namespace: "group/demo",
          project_name: "Demo"
        }
      }).item
    ).toEqual({
      ref: "master",
      createdAt: "2026-05-15T09:00:00+08:00",
      repository: {
        id: "100",
        name: "demo",
        path: "demo",
        pathWithNamespace: "group/demo",
        projectName: "Demo"
      }
    });

    expect(mapRepositoryStatisticsSummary({
      branches_count: 2,
      commits_count: 8,
      members_count: 3,
      tags_count: 1,
      merge_request_count: 4,
      note_count: 5
    }).item).toMatchObject({
      branchesCount: 2,
      commitsCount: 8,
      membersCount: 3,
      tagsCount: 1,
      mergeRequestCount: 4,
      noteCount: 5
    });

    expect(mapRepoStatisticsSummary({
      repo_name: "demo",
      commit_count: 8,
      repo_size: "12 MB",
      last_commit_time: "2026-05-15T01:00:00.000Z",
      code_lines: 120,
      branch_count: 2
    }).item).toMatchObject({
      repoName: "demo",
      commitCount: 8,
      repoSize: "12 MB",
      lastCommitTime: "2026-05-15T01:00:00.000Z",
      codeLines: 120,
      branchCount: 2
    });

    expect(mapRepositoryStatisticData({
      repoName: "demo",
      commitCount: 8,
      archiveUrl: "https://example.com/archive.zip"
    }).item).toMatchObject({
      repoName: "demo",
      commitCount: 8,
      archiveUrl: "https://example.com/archive.zip"
    });

    expect(mapRepositoryMaster(true).item).toEqual({
      isMaster: true
    });

    expect(mapRepositoryStatus({
      repository_uuid: "repo-uuid-1",
      result: 1,
      status: "success"
    }).item).toEqual({
      repositoryUuid: "repo-uuid-1",
      result: 1,
      status: "success"
    });

    expect(mapRepositoryCommitLines({
      additions: 10,
      deletions: 4
    }).item).toEqual({
      additions: 10,
      deletions: 4
    });
  });

  it("maps last statistics details", () => {
    const result = mapRepoLastStatistics({
      total: 1,
      count: 8,
      all_branch_commits_count: 10,
      statistics: [
        {
          id: 1,
          project_id: 100,
          branch: "master",
          user_name: "dev",
          add_lines: 12,
          delete_lines: 3,
          commit_count: 2,
          created_at: "2026-05-15T09:00:00+08:00",
          updated_at: "2026-05-15T09:10:00+08:00"
        }
      ],
      codelines: [{ additions: 12, deletions: 3, date: "20260515" }]
    });

    expect(result.item).toMatchObject({
      total: 1,
      count: 8,
      allBranchCommitsCount: 10,
      statistics: [
        {
          id: "1",
          projectId: "100",
          branch: "master",
          userName: "dev",
          addLines: 12,
          deleteLines: 3,
          commitCount: 2
        }
      ],
      codelines: [{ additions: 12, deletions: 3, date: "20260515" }]
    });
  });
});
