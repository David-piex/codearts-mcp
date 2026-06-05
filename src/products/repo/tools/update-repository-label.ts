import type { RepoLabelDetail } from "../client.js";
import { repoUpdateRepositoryLabelInput } from "../schemas.js";
import {
  mapRepositoryLabelResult,
  previewRepositoryLabelMutation
} from "./repository-settings-result.js";

type RepoUpdateRepositoryLabelClient = {
  updateRepositoryLabel: (input: {
    repository_id: string;
    name: string;
    new_name?: string;
    color?: string;
    description?: string;
    expires_at?: string;
  }) => Promise<RepoLabelDetail>;
};

export function createRepoUpdateRepositoryLabelHandler(client: RepoUpdateRepositoryLabelClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryLabelInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositoryLabelMutation("Dry run: update repository label", {
        repositoryId: parsed.repository_id,
        name: parsed.name,
        newName: parsed.new_name,
        color: parsed.color,
        description: parsed.description,
        expiresAt: parsed.expires_at
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryLabel(parsed);
    const result = mapRepositoryLabelResult("Updated repository label", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
