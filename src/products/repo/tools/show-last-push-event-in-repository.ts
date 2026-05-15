import type { RepoLastPushEvent } from "../client.js";
import { repoShowLastPushEventInRepositoryInput } from "../schemas.js";
import { mapLastPushEventInRepository } from "./repository-statistics-result.js";

type RepoShowLastPushEventInRepositoryClient = {
  showLastPushEventInRepository: (input: { repository_id: string }) => Promise<RepoLastPushEvent>;
};

export function createRepoShowLastPushEventInRepositoryHandler(client: RepoShowLastPushEventInRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoShowLastPushEventInRepositoryInput.parse(input);
    const response = await client.showLastPushEventInRepository(parsed);
    const result = mapLastPushEventInRepository(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
