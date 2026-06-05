import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateBranchNameInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoUpdateBranchNameClient = {
  updateBranchName: (input: {
    repository_id: string;
    old_branch: string;
    new_branch: string;
  }) => Promise<{
    old_branch_name?: string;
    old_branch_commit_id?: string;
    new_branch_name?: string;
    new_branch_commit_id?: string;
  }>;
};

export function createRepoUpdateBranchNameHandler(client: RepoUpdateBranchNameClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateBranchNameInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: rename repository branch", {
        repositoryId: parsed.repository_id,
        oldBranch: parsed.old_branch,
        newBranch: parsed.new_branch
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateBranchName(request);
    const result = asItemResult("Renamed repository branch", {
      oldBranchName: response.old_branch_name,
      oldBranchCommitId: response.old_branch_commit_id,
      newBranchName: response.new_branch_name,
      newBranchCommitId: response.new_branch_commit_id,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
