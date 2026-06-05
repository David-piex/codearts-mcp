import { asItemResult } from "../../../contracts/tool-result.js";
import { repoRemoveDeployKeyFromSubmodulesInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoRemoveDeployKeyFromSubmodulesClient = {
  removeDeployKeyFromSubmodules: (input: {
    repository_id: string;
    key_id: string;
  }) => Promise<{
    repository_id: string;
    key_id: string;
    removed: boolean;
  }>;
};

export function createRepoRemoveDeployKeyFromSubmodulesHandler(
  client: RepoRemoveDeployKeyFromSubmodulesClient
) {
  return async (input: unknown) => {
    const parsed = repoRemoveDeployKeyFromSubmodulesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: remove deploy key from submodules", {
        repositoryId: parsed.repository_id,
        keyId: parsed.key_id,
        removed: true
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.removeDeployKeyFromSubmodules(parsed);
    const result = asItemResult("Removed deploy key from submodules", {
      repositoryId: response.repository_id,
      keyId: response.key_id,
      removed: response.removed,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
