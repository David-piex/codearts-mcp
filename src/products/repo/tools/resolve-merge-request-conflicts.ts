import { asItemResult } from "../../../contracts/tool-result.js";
import { repoResolveMergeRequestConflictsInput } from "../schemas.js";

export function previewResolveMergeRequestConflicts(input: {
  repository_id: string;
  merge_request_iid: string;
  commit_message: string;
  files: Array<{
    old_path: string;
    new_path: string;
    sections?: Record<string, unknown>;
    content?: string;
  }>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: resolve merge request conflicts ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    commitMessage: input.commit_message,
    files: input.files,
    executed: !input.dry_run
  });
}

type RepoResolveMergeRequestConflictsClient = {
  resolveMergeRequestConflicts: (input: {
    repository_id: string;
    merge_request_iid: string;
    commit_message: string;
    files: Array<{
      old_path: string;
      new_path: string;
      sections?: Record<string, unknown>;
      content?: string;
    }>;
  }) => Promise<{
    repository_id: string;
    merge_request_iid: string;
    message?: string;
    resolved: boolean;
  }>;
};

export function createRepoResolveMergeRequestConflictsHandler(
  client: RepoResolveMergeRequestConflictsClient
) {
  return async (input: unknown) => {
    const parsed = repoResolveMergeRequestConflictsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewResolveMergeRequestConflicts(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.resolveMergeRequestConflicts(parsed);
    const result = asItemResult(`Resolved merge request conflicts ${parsed.merge_request_iid}`, {
      repositoryId: response.repository_id,
      mergeRequestIid: response.merge_request_iid,
      message: response.message,
      resolved: response.resolved,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
