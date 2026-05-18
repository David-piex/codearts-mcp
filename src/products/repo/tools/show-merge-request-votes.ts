import type { RepoMergeRequestVotes } from "../client.js";
import { repoShowMergeRequestVotesInput } from "../schemas.js";
import { mapMergeRequestVotes } from "./merge-request-read-result.js";

type RepoShowMergeRequestVotesClient = {
  showMergeRequestVotes: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<RepoMergeRequestVotes>;
};

export function createRepoShowMergeRequestVotesHandler(client: RepoShowMergeRequestVotesClient) {
  return async (input: unknown) => {
    const parsed = repoShowMergeRequestVotesInput.parse(input);
    const response = await client.showMergeRequestVotes(parsed);
    const result = mapMergeRequestVotes(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
