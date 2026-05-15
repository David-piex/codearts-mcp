import type { RepoRepositoryStatisticsStatus } from "../client.js";
import { repoShowRepositoryStatisticsStatusInput } from "../schemas.js";
import { mapRepositoryStatisticsStatus } from "./repository-statistics-result.js";

type RepoShowRepositoryStatisticsStatusClient = {
  showRepositoryStatisticsStatus: (input: { repository_id: string }) => Promise<RepoRepositoryStatisticsStatus>;
};

export function createRepoShowRepositoryStatisticsStatusHandler(client: RepoShowRepositoryStatisticsStatusClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryStatisticsStatusInput.parse(input);
    const response = await client.showRepositoryStatisticsStatus(parsed);
    const result = mapRepositoryStatisticsStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
