import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedBranch } from "../client.js";
import { repoUpdateProtectedBranchInput } from "../schemas.js";
import {
  mapProtectedBranchItem,
  previewProtectedBranchMutation,
  type ProtectedBranchActionInput
} from "./protected-branch-result.js";

type RepoUpdateProtectedBranchClient = {
  updateProtectedBranch: (input: {
    repository_id: string;
    branch_name: string;
    actions: ProtectedBranchActionInput[];
  }) => Promise<RepoProtectedBranch>;
};

export function createRepoUpdateProtectedBranchHandler(client: RepoUpdateProtectedBranchClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateProtectedBranchInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update protected branch", previewProtectedBranchMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProtectedBranch(parsed);
    const result = mapProtectedBranchItem("Updated protected branch", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
