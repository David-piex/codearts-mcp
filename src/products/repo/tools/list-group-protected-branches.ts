import type { RepoProtectedBranch } from "../client.js";
import { repoListGroupProtectedBranchesInput } from "../schemas.js";
import { mapProtectedBranchList } from "./protected-branch-result.js";

type RepoListGroupProtectedBranchesClient = {
  listGroupProtectedBranches: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
    user_actions?: boolean;
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
};

export function createRepoListGroupProtectedBranchesHandler(client: RepoListGroupProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupProtectedBranchesInput.parse(input);
    const response = await client.listGroupProtectedBranches(parsed);
    const result = mapProtectedBranchList(
      `${response.branches.length} group protected branches found`,
      response.branches,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
