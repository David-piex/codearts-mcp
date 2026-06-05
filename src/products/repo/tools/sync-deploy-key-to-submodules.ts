import { asItemResult } from "../../../contracts/tool-result.js";
import { repoSyncDeployKeyToSubmodulesInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoSyncDeployKeyToSubmodulesClient = {
  syncDeployKeyToSubmodules: (input: {
    repository_id: string;
    key_id: string;
  }) => Promise<{
    repository_id: string;
    key_id: string;
    synced: boolean;
  }>;
};

export function createRepoSyncDeployKeyToSubmodulesHandler(
  client: RepoSyncDeployKeyToSubmodulesClient
) {
  return async (input: unknown) => {
    const parsed = repoSyncDeployKeyToSubmodulesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: sync deploy key to submodules", {
        repositoryId: parsed.repository_id,
        keyId: parsed.key_id,
        synced: true
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.syncDeployKeyToSubmodules(parsed);
    const result = asItemResult("Synced deploy key to submodules", {
      repositoryId: response.repository_id,
      keyId: response.key_id,
      synced: response.synced,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
