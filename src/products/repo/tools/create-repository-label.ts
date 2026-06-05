import type { RepoLabelDetail } from "../client.js";
import { repoCreateRepositoryLabelInput } from "../schemas.js";
import {
  mapRepositoryLabelResult,
  previewRepositoryLabelMutation
} from "./repository-settings-result.js";

type RepoCreateRepositoryLabelClient = {
  createRepositoryLabel: (input: {
    repository_id: string;
    name: string;
    color?: string;
    description?: string;
    expires_at?: string;
  }) => Promise<RepoLabelDetail>;
};

export function createRepoCreateRepositoryLabelHandler(client: RepoCreateRepositoryLabelClient) {
  return async (input: unknown) => {
    const parsed = repoCreateRepositoryLabelInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositoryLabelMutation("Dry run: create repository label", {
        repositoryId: parsed.repository_id,
        name: parsed.name,
        color: parsed.color,
        description: parsed.description,
        expiresAt: parsed.expires_at
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createRepositoryLabel(parsed);
    const result = mapRepositoryLabelResult("Created repository label", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
