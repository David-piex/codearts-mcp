import type { RepoStatsSummary } from "../client.js";
import { repoShowRepoStatisticsSummaryInput } from "../schemas.js";
import { mapRepoStatisticsSummary } from "./repository-statistics-result.js";

type RepoShowRepoStatisticsSummaryClient = {
  showRepoStatisticsSummary: (input: { repository_id: string }) => Promise<RepoStatsSummary>;
};

export function createRepoShowRepoStatisticsSummaryHandler(client: RepoShowRepoStatisticsSummaryClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepoStatisticsSummaryInput.parse(input);
    const response = await client.showRepoStatisticsSummary(parsed);
    const result = mapRepoStatisticsSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
