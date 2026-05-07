import type { RepoProtectedBranch } from "../client.js";
import { repoGetProtectedBranchInput } from "../schemas.js";
import { mapProtectedBranchItem } from "./protected-branch-result.js";

type RepoGetProtectedBranchClient = {
  getProtectedBranch: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<RepoProtectedBranch>;
};

export function createRepoGetProtectedBranchHandler(client: RepoGetProtectedBranchClient) {
  return async (input: unknown) => {
    const parsed = repoGetProtectedBranchInput.parse(input);
    const response = await client.getProtectedBranch(parsed);
    const result = mapProtectedBranchItem("Fetched protected branch", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
