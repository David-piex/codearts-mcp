import { asItemResult } from "../../../contracts/tool-result.js";
import { repoBatchDeleteBranchInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoBatchDeleteBranchClient = {
  batchDeleteBranch: (input: {
    repository_id: string;
    branches: string[];
  }) => Promise<{
    repository_id: string;
    branches: string[];
    deleted: true;
  }>;
};

export function createRepoBatchDeleteBranchHandler(client: RepoBatchDeleteBranchClient) {
  return async (input: unknown) => {
    const parsed = repoBatchDeleteBranchInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: batch delete repository branches", {
        repositoryId: parsed.repository_id,
        branches: parsed.branches
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.batchDeleteBranch(request);
    const result = asItemResult("Deleted repository branches", {
      repositoryId: response.repository_id,
      branches: response.branches,
      deleted: response.deleted,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
