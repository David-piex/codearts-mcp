import { repoShowRepositoryMasterInput } from "../schemas.js";
import { mapRepositoryMaster } from "./repository-statistics-result.js";

type RepoShowRepositoryMasterClient = {
  showRepositoryMaster: (input: { repository_uuid: string }) => Promise<boolean>;
};

export function createRepoShowRepositoryMasterHandler(client: RepoShowRepositoryMasterClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryMasterInput.parse(input);
    const response = await client.showRepositoryMaster(parsed);
    const result = mapRepositoryMaster(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
