import type { RepoRepositoryStatisticsSummary } from "../client.js";
import { repoShowRepositoryStatisticsSummaryInput } from "../schemas.js";
import { mapRepositoryStatisticsSummary } from "./repository-statistics-result.js";

type RepoShowRepositoryStatisticsSummaryClient = {
  showRepositoryStatisticsSummary: (input: { repository_id: string }) => Promise<RepoRepositoryStatisticsSummary>;
};

export function createRepoShowRepositoryStatisticsSummaryHandler(client: RepoShowRepositoryStatisticsSummaryClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryStatisticsSummaryInput.parse(input);
    const response = await client.showRepositoryStatisticsSummary(parsed);
    const result = mapRepositoryStatisticsSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
