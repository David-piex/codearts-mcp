import type { RepoMergeRequestParticipant } from "../client.js";
import { repoListMergeRequestParticipantsInput } from "../schemas.js";
import { mapMergeRequestParticipants } from "./merge-request-read-result.js";

type RepoListMergeRequestParticipantsClient = {
  listMergeRequestParticipants: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
  }) => Promise<{
    participants: RepoMergeRequestParticipant[];
    total?: number;
  }>;
};

export function createRepoListMergeRequestParticipantsHandler(client: RepoListMergeRequestParticipantsClient) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestParticipantsInput.parse(input);
    const response = await client.listMergeRequestParticipants(parsed);
    const result = mapMergeRequestParticipants(response.participants, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
