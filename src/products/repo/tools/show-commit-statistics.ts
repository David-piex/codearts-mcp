import type { RepoCommitStatistics } from "../client.js";
import { repoShowCommitStatisticsInput } from "../schemas.js";
import { mapCommitStatistics } from "./repository-content-result.js";

type RepoShowCommitStatisticsClient = {
  showCommitStatistics: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<RepoCommitStatistics>;
};

export function createRepoShowCommitStatisticsHandler(client: RepoShowCommitStatisticsClient) {
  return async (input: unknown) => {
    const parsed = repoShowCommitStatisticsInput.parse(input);
    const response = await client.showCommitStatistics(parsed);
    const result = mapCommitStatistics(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
