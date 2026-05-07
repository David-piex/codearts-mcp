import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteProtectedBranchInput } from "../schemas.js";

export function previewDeleteProtectedBranch(input: {
  repository_id: string;
  branch_name: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: delete protected branch", {
    repositoryId: input.repository_id,
    branchName: input.branch_name,
    executed: !input.dry_run
  });
}

export function mapDeletedProtectedBranch(input: { branch_name: string; deleted: boolean }) {
  return asItemResult("Deleted protected branch", {
    id: input.branch_name,
    branchName: input.branch_name,
    deleted: input.deleted,
    executed: true
  });
}

type RepoDeleteProtectedBranchClient = {
  deleteProtectedBranch: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<{
    branch_name: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteProtectedBranchHandler(client: RepoDeleteProtectedBranchClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteProtectedBranchInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteProtectedBranch(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProtectedBranch(parsed);
    const result = mapDeletedProtectedBranch(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
