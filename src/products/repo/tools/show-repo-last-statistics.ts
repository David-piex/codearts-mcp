import type { RepoLastStatistics } from "../client.js";
import { repoShowRepoLastStatisticsInput } from "../schemas.js";
import { mapRepoLastStatistics } from "./repository-statistics-result.js";

type RepoShowRepoLastStatisticsClient = {
  showRepoLastStatistics: (input: { repository_id: string; branch_name: string }) => Promise<RepoLastStatistics>;
};

export function createRepoShowRepoLastStatisticsHandler(client: RepoShowRepoLastStatisticsClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepoLastStatisticsInput.parse(input);
    const response = await client.showRepoLastStatistics(parsed);
    const result = mapRepoLastStatistics(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
