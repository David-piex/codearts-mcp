import { asItemResult } from "../../../contracts/tool-result.js";
import { repoBulkDeleteProtectedBranchesInput } from "../schemas.js";

export function previewBulkDeleteProtectedBranches(input: {
  repository_id: string;
  names: string[];
  dry_run: boolean;
}) {
  return asItemResult("Dry run: bulk delete protected branches", {
    repositoryId: input.repository_id,
    names: input.names,
    count: input.names.length,
    executed: !input.dry_run
  });
}

export function mapBulkDeletedProtectedBranches(input: { names: string[]; deleted: boolean }) {
  return asItemResult("Deleted protected branches", {
    names: input.names,
    count: input.names.length,
    deleted: input.deleted,
    executed: true
  });
}

type RepoBulkDeleteProtectedBranchesClient = {
  bulkDeleteProtectedBranches: (input: {
    repository_id: string;
    names: string[];
  }) => Promise<{
    names: string[];
    deleted: boolean;
  }>;
};

export function createRepoBulkDeleteProtectedBranchesHandler(client: RepoBulkDeleteProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoBulkDeleteProtectedBranchesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBulkDeleteProtectedBranches(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.bulkDeleteProtectedBranches(parsed);
    const result = mapBulkDeletedProtectedBranches(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
