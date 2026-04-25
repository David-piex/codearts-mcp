import { asItemResult } from "../../../contracts/tool-result.js";
import { repoMergeMergeRequestInput } from "../schemas.js";

export function previewMergeMergeRequest(input: {
  repository_id: string;
  merge_request_iid: string;
  squash?: boolean;
  force_merge?: boolean;
  sha?: string;
  merge_commit_message?: string;
  squash_commit_message?: string;
  should_remove_source_branch?: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: merge merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    squash: input.squash,
    forceMerge: input.force_merge,
    sha: input.sha,
    mergeCommitMessage: input.merge_commit_message,
    squashCommitMessage: input.squash_commit_message,
    shouldRemoveSourceBranch: input.should_remove_source_branch,
    executed: !input.dry_run
  });
}

export function mapMergedMergeRequest(input: {
  id: number | string;
  iid?: number;
  repository_id?: number | string;
  title?: string;
  state?: string;
  source_branch?: string;
  target_branch?: string;
  web_url?: string;
}) {
  return asItemResult(`Merged merge request ${input.iid ?? input.id}`, {
    id: String(input.id),
    iid: input.iid,
    repositoryId: input.repository_id === undefined ? undefined : String(input.repository_id),
    title: input.title,
    state: input.state,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    webUrl: input.web_url,
    executed: true
  });
}

type RepoMergeMergeRequestClient = {
  mergeMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    squash?: boolean;
    force_merge?: boolean;
    sha?: string;
    merge_commit_message?: string;
    squash_commit_message?: string;
    should_remove_source_branch?: boolean;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
};

export function createRepoMergeMergeRequestHandler(client: RepoMergeMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoMergeMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewMergeMergeRequest(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.mergeMergeRequest(parsed);
    const result = mapMergedMergeRequest(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
