import { repoCreateCommitRevertInput } from "../schemas.js";
import { mapRepoCommit } from "./get-commit.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoCreateCommitRevertClient = {
  createCommitRevert: (input: {
    repository_id: string;
    sha: string;
    branch: string;
    with_new_merge_request?: boolean;
    message?: string;
  }) => Promise<Parameters<typeof mapRepoCommit>[0]>;
};

export function createRepoCreateCommitRevertHandler(client: RepoCreateCommitRevertClient) {
  return async (input: unknown) => {
    const parsed = repoCreateCommitRevertInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: revert repository commit", {
        repositoryId: parsed.repository_id,
        sha: parsed.sha,
        branch: parsed.branch,
        withNewMergeRequest: parsed.with_new_merge_request,
        message: parsed.message
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createCommitRevert(request);
    const result = mapRepoCommit(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
