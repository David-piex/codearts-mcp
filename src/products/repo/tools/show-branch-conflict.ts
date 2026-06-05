import type { RepoBranchConflict } from "../client.js";
import { repoShowBranchConflictInput } from "../schemas.js";
import { mapBranchConflict } from "./merge-request-read-result.js";

type RepoShowBranchConflictClient = {
  showBranchConflict: (input: {
    repository_id: string;
    source_repository_id?: string;
    source_branch?: string;
    target_branch?: string;
    target_repository_id?: string;
  }) => Promise<RepoBranchConflict>;
};

export function createRepoShowBranchConflictHandler(client: RepoShowBranchConflictClient) {
  return async (input: unknown) => {
    const parsed = repoShowBranchConflictInput.parse(input);
    const response = await client.showBranchConflict(parsed);
    const result = mapBranchConflict(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
