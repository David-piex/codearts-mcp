import type { RepoMergeableState } from "../client.js";
import { repoShowMergeableStateOuterInput } from "../schemas.js";
import { mapMergeableState } from "./merge-request-read-result.js";

type Client = {
  showMergeableStateOuter: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<RepoMergeableState>;
};

export function createRepoShowMergeableStateOuterHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowMergeableStateOuterInput.parse(input);
    const response = await client.showMergeableStateOuter(parsed);
    const result = mapMergeableState(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

