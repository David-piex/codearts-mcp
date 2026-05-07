import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedBranch } from "../client.js";
import { repoBatchCreateProtectedBranchesInput } from "../schemas.js";
import {
  mapProtectedBranchList,
  previewProtectedBranchMutation,
  type ProtectedBranchActionInput
} from "./protected-branch-result.js";

type RepoBatchCreateProtectedBranchesClient = {
  batchCreateProtectedBranches: (input: {
    repository_id: string;
    names: string[];
    actions?: ProtectedBranchActionInput[];
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
};

export function createRepoBatchCreateProtectedBranchesHandler(client: RepoBatchCreateProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoBatchCreateProtectedBranchesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: batch create protected branches", previewProtectedBranchMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchCreateProtectedBranches(parsed);
    const result = mapProtectedBranchList(
      `Created ${response.branches.length} protected branches`,
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
