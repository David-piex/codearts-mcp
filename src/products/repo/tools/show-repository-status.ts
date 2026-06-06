import { repoShowRepositoryStatusInput } from "../schemas.js";
import { mapRepositoryStatus } from "./repository-statistics-result.js";

type RepoShowRepositoryStatusClient = {
  showRepositoryStatus: (input: {
    x_auth_token: string;
    repository_uuid: string;
  }) => Promise<{
    repository_uuid: string;
    result?: number;
    status?: string;
  }>;
};

export function createRepoShowRepositoryStatusHandler(client: RepoShowRepositoryStatusClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryStatusInput.parse(input);
    const response = await client.showRepositoryStatus(parsed);
    const result = mapRepositoryStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
