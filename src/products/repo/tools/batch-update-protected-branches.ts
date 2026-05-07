import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedBranch } from "../client.js";
import { repoBatchUpdateProtectedBranchesInput } from "../schemas.js";
import {
  mapProtectedBranchList,
  previewProtectedBranchMutation,
  type ProtectedBranchActionInput
} from "./protected-branch-result.js";

type RepoBatchUpdateProtectedBranchesClient = {
  batchUpdateProtectedBranches: (input: {
    repository_id: string;
    names: string[];
    actions: ProtectedBranchActionInput[];
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
};

export function createRepoBatchUpdateProtectedBranchesHandler(client: RepoBatchUpdateProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoBatchUpdateProtectedBranchesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: batch update protected branches", previewProtectedBranchMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateProtectedBranches(parsed);
    const result = mapProtectedBranchList(
      `Updated ${response.branches.length} protected branches`,
      response.branches,
      1,
      response.branches.length || parsed.names.length,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
