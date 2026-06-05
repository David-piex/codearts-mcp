import { asItemResult } from "../../../contracts/tool-result.js";
import { repoImportMergeRequestInput } from "../schemas.js";
import { mapCreatedMergeRequest } from "./create-merge-request.js";

export function previewImportMergeRequest(input: {
  repository_id: string;
  iid: string | number;
  source_uniq_key: string;
  state: string;
  source_branch: string;
  target_branch: string;
  target_repository_id: string | number;
  diff_refs: {
    base_sha: string;
    start_sha: string;
    head_sha: string;
  };
  author_id?: string | number;
  title?: string;
  description?: string;
  labels?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
  merged_at?: string;
  closed_at?: string;
  approvers?: Array<{
    approver_id?: string | number;
    code_owner?: boolean;
    accept?: boolean;
  }>;
  squash?: boolean;
  remove_source_branch?: boolean;
  branch_is_deleted?: boolean;
  fork?: boolean;
  import_source_from?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: import merge request ${input.iid}`, {
    repositoryId: input.repository_id,
    iid: String(input.iid),
    sourceUniqKey: input.source_uniq_key,
    state: input.state,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    targetRepositoryId: String(input.target_repository_id),
    diffRefs: input.diff_refs,
    authorId: input.author_id,
    title: input.title,
    description: input.description,
    labels: input.labels,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    mergedAt: input.merged_at,
    closedAt: input.closed_at,
    approvers: input.approvers,
    squash: input.squash,
    removeSourceBranch: input.remove_source_branch,
    branchIsDeleted: input.branch_is_deleted,
    fork: input.fork,
    importSourceFrom: input.import_source_from,
    executed: !input.dry_run
  });
}

type RepoImportMergeRequestClient = {
  importMergeRequest: (input: {
    repository_id: string;
    iid: string | number;
    source_uniq_key: string;
    state: string;
    source_branch: string;
    target_branch: string;
    target_repository_id: string | number;
    diff_refs: {
      base_sha: string;
      start_sha: string;
      head_sha: string;
    };
    author_id?: string | number;
    title?: string;
    description?: string;
    labels?: Record<string, unknown>;
    created_at?: string;
    updated_at?: string;
    merged_at?: string;
    closed_at?: string;
    approvers?: Array<{
      approver_id?: string | number;
      code_owner?: boolean;
      accept?: boolean;
    }>;
    squash?: boolean;
    remove_source_branch?: boolean;
    branch_is_deleted?: boolean;
    fork?: boolean;
    import_source_from?: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
};

export function createRepoImportMergeRequestHandler(client: RepoImportMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoImportMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewImportMergeRequest(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.importMergeRequest(parsed);
    const result = mapCreatedMergeRequest(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
