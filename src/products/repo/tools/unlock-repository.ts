import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUnlockRepositoryInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoUnlockRepositoryClient = {
  unlockRepository: (input: {
    project_id: string;
    repository_id: string;
  }) => Promise<{
    repository_id: string;
    locked: boolean;
  }>;
};

export function createRepoUnlockRepositoryHandler(client: RepoUnlockRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoUnlockRepositoryInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: unlock repository", {
        projectId: parsed.project_id,
        repositoryId: parsed.repository_id,
        locked: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.unlockRepository(parsed);
    const result = asItemResult("Unlocked repository", {
      repositoryId: response.repository_id,
      locked: response.locked,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
