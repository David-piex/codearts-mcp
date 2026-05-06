import { asItemResult } from "../../../contracts/tool-result.js";
import { repoRemoveRepositoryDeployKeyInput } from "../schemas.js";

export function previewRemoveRepositoryDeployKey(input: {
  repository_id: string;
  key_id: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: remove repository deploy key", {
    repositoryId: input.repository_id,
    keyId: input.key_id,
    executed: !input.dry_run
  });
}

export function mapRemovedRepositoryDeployKey(input: { key_id: string; removed: boolean }) {
  return asItemResult("Removed repository deploy key", {
    id: input.key_id,
    keyId: input.key_id,
    removed: input.removed,
    executed: true
  });
}

type RepoRemoveRepositoryDeployKeyClient = {
  removeRepositoryDeployKey: (input: {
    repository_id: string;
    key_id: string;
  }) => Promise<{
    key_id: string;
    removed: boolean;
  }>;
};

export function createRepoRemoveRepositoryDeployKeyHandler(client: RepoRemoveRepositoryDeployKeyClient) {
  return async (input: unknown) => {
    const parsed = repoRemoveRepositoryDeployKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRemoveRepositoryDeployKey(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.removeRepositoryDeployKey(parsed);
    const result = mapRemovedRepositoryDeployKey(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
