import type { RepoRepositoryStatisticData } from "../client.js";
import { repoShowRepositoryStatisticDataInput } from "../schemas.js";
import { mapRepositoryStatisticData } from "./repository-statistics-result.js";

type RepoShowRepositoryStatisticDataClient = {
  showRepositoryStatisticData: (input: { repository_uuid: string }) => Promise<RepoRepositoryStatisticData>;
};

export function createRepoShowRepositoryStatisticDataHandler(client: RepoShowRepositoryStatisticDataClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryStatisticDataInput.parse(input);
    const response = await client.showRepositoryStatisticData(parsed);
    const result = mapRepositoryStatisticData(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
