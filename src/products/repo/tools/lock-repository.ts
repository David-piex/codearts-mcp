import { asItemResult } from "../../../contracts/tool-result.js";
import { repoLockRepositoryInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoLockRepositoryClient = {
  lockRepository: (input: {
    project_id: string;
    repository_id: string;
  }) => Promise<{
    repository_id: string;
    locked: boolean;
  }>;
};

export function createRepoLockRepositoryHandler(client: RepoLockRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoLockRepositoryInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: lock repository", {
        projectId: parsed.project_id,
        repositoryId: parsed.repository_id,
        locked: true
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.lockRepository(parsed);
    const result = asItemResult("Locked repository", {
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
