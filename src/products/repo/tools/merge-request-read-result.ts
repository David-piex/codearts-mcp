import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoActualHeadPipeline,
  RepoBranchConflict,
  RepoCommentPath,
  RepoMergeRequestAverageEvaluation,
  RepoMergeRequestEvaluation,
  RepoLineDiscussion,
  RepoMergeableState,
  RepoMergeRequestCandidateUser,
  RepoMergeRequestCommit,
  RepoMergeRequestConflictFile,
  RepoMergeRequestChangesTreeNode,
  RepoMergeRequestChangesTrees,
  RepoMergeRequestParticipant,
  RepoMergeRequestStatistic,
  RepoMergeRequestVersion,
  RepoMergeRequestVoteResult,
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

export function mapAverageEvaluation(input: RepoMergeRequestAverageEvaluation) {
  return asItemResult("Fetched merge request average evaluation", {
    mergeRequestId:
      input.merge_request_id !== undefined ? String(input.merge_request_id) : undefined,
    averageEvaluationLevel: input.average_evaluation_level,
    evaluations: (input.evaluations ?? []).map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      mergeRequestId:
        item.merge_request_id !== undefined ? String(item.merge_request_id) : undefined,
      level: item.level,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      content: item.content,
      user: item.user
        ? {
            id: item.user.id !== undefined ? String(item.user.id) : undefined,
            name: item.user.name,
            username: item.user.username,
            state: item.user.state,
            serviceLicenseStatus: item.user.service_license_status,
            avatarUrl: item.user.avatar_url,
            avatarPath: item.user.avatar_path,
            email: item.user.email,
            nameCn: item.user.name_cn,
            webUrl: item.user.web_url,
            nickName: item.user.nick_name,
            tenantName: item.user.tenant_name
          }
        : undefined,
      customEvaluations: (item.custom_evaluations ?? []).map((custom) => ({
        id: custom.id !== undefined ? String(custom.id) : undefined,
        evaluationTypeId:
          custom.evaluation_type_id !== undefined ? String(custom.evaluation_type_id) : undefined,
        name: custom.name,
        level: custom.level
      }))
    })),
    customEvaluations: (input.custom_evaluations ?? []).map((item) => ({
      evaluationTypeId:
        item.evaluation_type_id !== undefined ? String(item.evaluation_type_id) : undefined,
      name: item.name,
      level: item.level
    }))
  });
}

export function mapMergeRequestEvaluations(
  items: RepoMergeRequestEvaluation[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request evaluations found`,
    items.map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      mergeRequestId:
        item.merge_request_id !== undefined ? String(item.merge_request_id) : undefined,
      level: item.level,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      content: item.content,
      user: item.user
        ? {
            id: item.user.id !== undefined ? String(item.user.id) : undefined,
            name: item.user.name,
            username: item.user.username,
            state: item.user.state,
            serviceLicenseStatus: item.user.service_license_status,
            avatarUrl: item.user.avatar_url,
            avatarPath: item.user.avatar_path,
            email: item.user.email,
            nameCn: item.user.name_cn,
            webUrl: item.user.web_url,
            nickName: item.user.nick_name,
            tenantName: item.user.tenant_name
          }
        : undefined,
      customEvaluations: (item.custom_evaluations ?? []).map((custom) => ({
        id: custom.id !== undefined ? String(custom.id) : undefined,
        evaluationTypeId:
          custom.evaluation_type_id !== undefined ? String(custom.evaluation_type_id) : undefined,
        name: custom.name,
        level: custom.level
      }))
    })),
    toPageInfo(page, pageSize, total)
  );
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

export function mapActualHeadPipeline(input: RepoActualHeadPipeline) {
  const pipeline = input.data;

  return asItemResult(
    pipeline?.id !== undefined ? `Fetched actual head pipeline ${pipeline.id}` : "Fetched actual head pipeline",
    {
      isValid: input.is_valid,
      pipeline: pipeline
        ? {
            id: pipeline.id !== undefined ? String(pipeline.id) : undefined,
            webUrl: pipeline.web_url,
            sha: pipeline.sha,
            ref: pipeline.ref,
            status: pipeline.status,
            createdAt: pipeline.created_at,
            updatedAt: pipeline.updated_at,
            startedAt: pipeline.started_at,
            finishedAt: pipeline.finished_at,
            repositoryId: pipeline.repository_id !== undefined ? String(pipeline.repository_id) : undefined,
            isInvalid: pipeline.is_invalid,
            type: pipeline.type,
            isLatest: pipeline.is_latest,
            triggerUser: pipeline.trigger_user,
            allJobFinished: pipeline.all_job_finished,
            stages: (pipeline.stages ?? []).map((stage) => ({
              id: stage.id !== undefined ? String(stage.id) : undefined,
              repositoryId: stage.repository_id !== undefined ? String(stage.repository_id) : undefined,
              pipelineId: stage.pipeline_id !== undefined ? String(stage.pipeline_id) : undefined,
              name: stage.name,
              sortId: stage.sort_id !== undefined && stage.sort_id !== null ? String(stage.sort_id) : undefined,
              status: stage.status
            }))
          }
        : undefined
    }
  );
}

function mapMergeRequestCandidateUser(input: RepoMergeRequestCandidateUser) {
  return {
    id: input.id !== undefined ? String(input.id) : undefined,
    name: input.name,
    username: input.username,
    state: input.state,
    serviceLicenseStatus: input.service_license_status,
    avatarUrl: input.avatar_url,
    avatarPath: input.avatar_path,
    email: input.email,
    nameCn: input.name_cn,
    webUrl: input.web_url,
    nickName: input.nick_name,
    tenantName: input.tenant_name,
    errorMessage: input.error_message,
    isCommitter: input.is_committer,
    isVerified: input.is_verified,
    hasPermission: input.has_permission
  };
}

export function mapMergeRequestCandidates(
  summary: string,
  items: RepoMergeRequestCandidateUser[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(summary, items.map(mapMergeRequestCandidateUser), toPageInfo(page, pageSize, total));
}

export function mapMergeableState(input: RepoMergeableState) {
  return asItemResult("Fetched merge request mergeable state", {
    mergeRequestId: input.merge_request_id !== undefined ? String(input.merge_request_id) : undefined,
    state: input.state,
    conflictPassed: input.conflict_passed,
    nonFastForwardPassed: input.non_ff_passed,
    mergedByUserPassed: input.merged_by_user_passed,
    workInProgressPassed: input.work_in_progress_passed,
    resolveDiscussionPassed: input.resolve_discussion_passed,
    ciStatePassed: input.ci_state_passed,
    mergeBySelfPassed: input.merge_by_self_passed,
    canForceMerge: input.can_force_merge,
    votePassed: input.vote_passed,
    e2eCheckPassed: input.e2e_check_passed,
    allIssuesPassed: input.all_issues_passed,
    onlyOneIssuePassed: input.only_one_issue_passed,
    approvalReviewersRequiredPassed: input.approval_reviewers_required_passed,
    approvalApproversRequiredPassed: input.approval_approvers_required_passed,
    evaluationPassed: input.evaluation_passed
  });
}

export function mapMergeRequestConflictFiles(
  items: RepoMergeRequestConflictFile[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request conflict files found`,
    items.map((item, index) => ({
      id: item.new_path ?? item.old_path ?? String(index + 1),
      oldPath: item.old_path,
      newPath: item.new_path,
      blobIcon: item.blob_icon,
      blobPath: item.blob_path,
      conflictType: item.conflict_type,
      content: item.content,
      contentPath: item.content_path,
      type: item.type,
      errorMessage: item.error_message,
      sections: (item.sections ?? []).map((section) => ({
        id: section.id,
        conflict: section.conflict,
        lines: (section.lines ?? []).map((line) => ({
          lineCode: line.line_code,
          type: line.type,
          oldLine: line.old_line,
          newLine: line.new_line,
          text: line.text,
          richText: line.rich_text,
          canReceiveSuggestion: line.can_receive_suggestion,
          metaData: line.meta_data
            ? {
                oldPos: line.meta_data.old_pos,
                newPos: line.meta_data.new_pos
              }
            : undefined
        }))
      }))
    })),
    toPageInfo(page, pageSize, total)
  );
}

function mapReviewNote(
  note: NonNullable<NonNullable<RepoLineDiscussion["discussions"]>[number]["notes"]>[number]
) {
  return {
    id: note.id !== undefined ? String(note.id) : undefined,
    type: note.type,
    body: note.body,
    createdAt: note.created_at,
    updatedAt: note.updated_at,
    system: note.system,
    noteableId: note.noteable_id !== undefined ? String(note.noteable_id) : undefined,
    noteableType: note.noteable_type,
    commitId: note.commit_id,
    resolvable: note.resolvable,
    author: note.author
      ? {
          id: note.author.id !== undefined ? String(note.author.id) : undefined,
          name: note.author.name,
          username: note.author.username,
          state: note.author.state,
          serviceLicenseStatus: note.author.service_license_status,
          avatarUrl: note.author.avatar_url,
          avatarPath: note.author.avatar_path,
          email: note.author.email,
          nameCn: note.author.name_cn,
          webUrl: note.author.web_url,
          nickName: note.author.nick_name,
          tenantName: note.author.tenant_name
        }
      : undefined
  };
}

function mapLineDiscussionEntry(entry: NonNullable<RepoLineDiscussion["discussions"]>[number]) {
  return {
    id: entry.id,
    individualNote: entry.individual_note,
    repositoryId: entry.repository_id !== undefined ? String(entry.repository_id) : undefined,
    noteableType: entry.noteable_type,
    commitId: entry.commit_id,
    repositoryFullPath: entry.repository_full_path,
    aMode: entry.a_mode,
    bMode: entry.b_mode,
    deletedFile: entry.deleted_file,
    newFile: entry.new_file,
    resolved: entry.resolved,
    archived: entry.archived,
    reviewCategories: entry.review_categories,
    reviewCategoriesCn: entry.review_categories_cn,
    reviewCategoriesEn: entry.review_categories_en,
    reviewModules: entry.review_modules,
    severity: entry.severity,
    severityCn: entry.severity_cn,
    severityEn: entry.severity_en,
    assignee: entry.assignee
      ? {
          id: entry.assignee.id !== undefined ? String(entry.assignee.id) : undefined,
          name: entry.assignee.name,
          username: entry.assignee.username,
          nickName: entry.assignee.nick_name,
          tenantName: entry.assignee.tenant_name
        }
      : undefined,
    proposer: entry.proposer
      ? {
          id: entry.proposer.id !== undefined ? String(entry.proposer.id) : undefined,
          name: entry.proposer.name,
          username: entry.proposer.username,
          nickName: entry.proposer.nick_name,
          tenantName: entry.proposer.tenant_name
        }
      : undefined,
    mergeRequestVersionParams: entry.merge_request_version_params
      ? {
          diffId:
            entry.merge_request_version_params.diff_id !== undefined
              ? String(entry.merge_request_version_params.diff_id)
              : undefined,
          baseCommitSha: entry.merge_request_version_params.base_commit_sha,
          startCommitSha: entry.merge_request_version_params.start_commit_sha,
          headCommitSha: entry.merge_request_version_params.head_commit_sha
        }
      : undefined,
    diffFile: entry.diff_file,
    addedLines: entry.added_lines,
    removedLines: entry.removed_lines,
    notes: (entry.notes ?? []).map(mapReviewNote)
  };
}

export function mapCommentsByLine(
  items: RepoCommentPath[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} comment paths found`,
    items.map((item, index) => ({
      id: item.path ?? String(index + 1),
      path: item.path,
      new: (item.new ?? []).map((discussion) => ({
        line: discussion.line,
        type: discussion.type,
        discussions: (discussion.discussions ?? []).map(mapLineDiscussionEntry)
      })),
      old: (item.old ?? []).map((discussion) => ({
        line: discussion.line,
        type: discussion.type,
        discussions: (discussion.discussions ?? []).map(mapLineDiscussionEntry)
      }))
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapMergeRequestVersions(
  items: RepoMergeRequestVersion[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request versions found`,
    items.map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      headCommitSha: item.head_commit_sha,
      baseCommitSha: item.base_commit_sha,
      startCommitSha: item.start_commit_sha,
      createdAt: item.created_at,
      mergeRequestId:
        item.merge_request_id !== undefined ? String(item.merge_request_id) : undefined,
      state: item.state,
      realSize: item.real_size !== undefined ? String(item.real_size) : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapMergeRequestVoteResult(input: RepoMergeRequestVoteResult) {
  return asItemResult(
    input.id !== undefined ? `Updated merge request vote ${input.id}` : "Updated merge request vote",
    {
      id: input.id !== undefined ? String(input.id) : undefined,
      mergeRequestId: input.merge_request_id !== undefined ? String(input.merge_request_id) : undefined,
      score: input.score,
      author: input.author
        ? {
            id: input.author.id !== undefined ? String(input.author.id) : undefined,
            name: input.author.name,
            username: input.author.username
          }
        : undefined,
      executed: true
    }
  );
}

function flattenChangesTreeNodes(
  nodes: RepoMergeRequestChangesTreeNode[],
  bucket: Array<{
    id: string;
    title?: string;
    level?: number;
    filePath?: string;
    fileType?: string;
    diff?: RepoMergeRequestChangesTreeNode["diff"];
    childCount: number;
  }>
) {
  for (const node of nodes) {
    bucket.push({
      id: node.file_path ?? node.title ?? `${bucket.length + 1}`,
      title: node.title,
      level: node.level,
      filePath: node.file_path,
      fileType: node.file_type,
      diff: node.diff,
      childCount: node.items?.length ?? 0
    });

    if (node.items?.length) {
      flattenChangesTreeNodes(node.items, bucket);
    }
  }
}

export function mapMergeRequestChangesTrees(
  input: RepoMergeRequestChangesTrees,
  page: number,
  pageSize: number
) {
  const flatItems: Array<{
    id: string;
    title?: string;
    level?: number;
    filePath?: string;
    fileType?: string;
    diff?: RepoMergeRequestChangesTreeNode["diff"];
    childCount: number;
  }> = [];

  flattenChangesTreeNodes(input.tree ?? [], flatItems);

  return asListResult(
    `${flatItems.length} merge request change tree nodes found`,
    flatItems.map((item) => ({
      id: item.id,
      title: item.title,
      level: item.level,
      filePath: item.filePath,
      fileType: item.fileType,
      childCount: item.childCount,
      diff: item.diff
        ? {
            diff: item.diff.diff,
            newPath: item.diff.new_path,
            oldPath: item.diff.old_path,
            aMode: item.diff.a_mode,
            bMode: item.diff.b_mode,
            newFile: item.diff.new_file,
            renamedFile: item.diff.renamed_file,
            deletedFile: item.diff.deleted_file,
            tooLarge: item.diff.too_large
          }
        : undefined
    })),
    toPageInfo(page, pageSize, flatItems.length),
    {
      canShowMyApprovalFiles: input.can_show_my_approval_files,
      tree: input.tree ?? []
    }
  );
}

export function mapMergeRequestParticipants(
  items: RepoMergeRequestParticipant[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request participants found`,
    items.map((item) => ({
      id: item.id !== undefined ? String(item.id) : undefined,
      name: item.name,
      username: item.username,
      state: item.state,
      serviceLicenseStatus: item.service_license_status,
      avatarUrl: item.avatar_url,
      avatarPath: item.avatar_path,
      email: item.email,
      nameCn: item.name_cn,
      webUrl: item.web_url,
      nickName: item.nick_name,
      tenantName: item.tenant_name,
      errorMessage: item.error_message
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapBranchConflict(input: RepoBranchConflict) {
  return asItemResult("Fetched branch conflict state", {
    sourceRepositoryId: input.source_repository_id !== undefined ? String(input.source_repository_id) : undefined,
    targetRepositoryId: input.target_repository_id !== undefined ? String(input.target_repository_id) : undefined,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    isConflict: input.is_conflict
  });
}
