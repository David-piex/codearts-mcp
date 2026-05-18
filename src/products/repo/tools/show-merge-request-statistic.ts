import type { RepoMergeRequestStatistic } from "../client.js";
import { repoShowMergeRequestStatisticInput } from "../schemas.js";
import { mapMergeRequestStatistics } from "./merge-request-read-result.js";

type RepoShowMergeRequestStatisticClient = {
  showMergeRequestStatistic: (input: {
    repository_id: string;
    iids: string;
    fields?: string;
  }) => Promise<{
    statistics: RepoMergeRequestStatistic[];
    total?: number;
  }>;
};

export function createRepoShowMergeRequestStatisticHandler(client: RepoShowMergeRequestStatisticClient) {
  return async (input: unknown) => {
    const parsed = repoShowMergeRequestStatisticInput.parse(input);
    const response = await client.showMergeRequestStatistic(parsed);
    const result = mapMergeRequestStatistics(response.statistics, 1, response.statistics.length, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
