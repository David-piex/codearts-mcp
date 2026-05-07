import type { RepoProtectedBranch } from "../client.js";
import { repoListProjectProtectedBranchesInput } from "../schemas.js";
import { mapProtectedBranchList } from "./protected-branch-result.js";

type RepoListProjectProtectedBranchesClient = {
  listProjectProtectedBranches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    search?: string;
    user_actions?: boolean;
    view?: "simple";
  }) => Promise<{
    branches: RepoProtectedBranch[];
    total?: number;
  }>;
};

export function createRepoListProjectProtectedBranchesHandler(client: RepoListProjectProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectProtectedBranchesInput.parse(input);
    const response = await client.listProjectProtectedBranches(parsed);
    const result = mapProtectedBranchList(
      `${response.branches.length} project protected branches found`,
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
