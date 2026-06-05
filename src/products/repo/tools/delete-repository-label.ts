import { repoDeleteRepositoryLabelInput } from "../schemas.js";
import { previewRepositoryDeleteMutation } from "./repository-settings-result.js";

type RepoDeleteRepositoryLabelClient = {
  deleteRepositoryLabel: (input: {
    repository_id: string;
    name: string;
  }) => Promise<{
    repository_id: string;
    name: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteRepositoryLabelHandler(client: RepoDeleteRepositoryLabelClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteRepositoryLabelInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositoryDeleteMutation("Dry run: delete repository label", {
        repositoryId: parsed.repository_id,
        name: parsed.name
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteRepositoryLabel(parsed);
    const result = {
      summary: "Deleted repository label",
      repositoryId: response.repository_id,
      name: response.name,
      deleted: response.deleted
    };

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
