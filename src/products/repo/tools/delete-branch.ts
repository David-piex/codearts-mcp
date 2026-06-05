import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteBranchInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoDeleteBranchClient = {
  deleteBranch: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<{
    repository_id: string;
    branch_name: string;
    status?: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteBranchHandler(client: RepoDeleteBranchClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteBranchInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: delete repository branch", {
        repositoryId: parsed.repository_id,
        branchName: parsed.branch_name
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteBranch(request);
    const result = asItemResult("Deleted repository branch", {
      repositoryId: response.repository_id,
      branchName: response.branch_name,
      status: response.status,
      deleted: response.deleted,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
