import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoMergeRequestCommit,
  RepoMergeRequestStatistic,
  RepoMergeRequestVotes
} from "../client.js";

export function mapMergeRequestCommits(
  items: RepoMergeRequestCommit[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request commits found`,
    items.map((item) => ({
      id: item.id,
      shortId: item.short_id,
      title: item.title,
      message: item.message,
      authorName: item.author_name,
      name: item.name,
      userName: item.user_name,
      tenantName: item.tenant_name,
      nickName: item.nick_name,
      authoredDate: item.authored_date,
      committedDate: item.committed_date,
      committerName: item.committer_name,
      gpgPrimaryKeyId: item.gpg_primary_key_id,
      openGpgVerified: item.open_gpg_verified,
      verificationStatus: item.verification_status,
      parentIds: item.parent_ids ?? [],
      createdAt: item.created_at
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapMergeRequestVotes(input: RepoMergeRequestVotes) {
  return asItemResult("Fetched merge request votes", {
    scores: input.scores,
    mergeRequestId: input.merge_request_id !== undefined ? String(input.merge_request_id) : undefined,
    mergeRequestCreator: input.merge_request_creator,
    votes: (input.votes ?? []).map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      score: item.score,
      authorName: item.author_name,
      authorUsername: item.author_username,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      lastCommittedId: item.last_committed_id,
      authorId: item.author_id !== undefined ? String(item.author_id) : undefined,
      avatarUrl: item.avatar_url,
      nickName: item.nick_name,
      tenantName: item.tenant_name
    }))
  });
}

export function mapMergeRequestStatistics(
  items: RepoMergeRequestStatistic[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request statistics found`,
    items.map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      iid: item.iid !== undefined ? String(item.iid) : undefined,
      title: item.title,
      state: item.state,
      commitsCount: item.commits_count,
      changedFilesCount: item.changed_files_count,
      notesCount: item.notes_count,
      changedLinesCount: item.changed_lines_count,
      mergeError: item.merge_error,
      jsonMergeError: item.json_merge_error,
      votes: item.votes
    })),
    toPageInfo(page, pageSize, total)
  );
}
