import { repoCreateRepositorySystemLabelsInput } from "../schemas.js";
import {
  mapRepositoryLabelsResult,
  previewRepositoryLabelMutation
} from "./repository-settings-result.js";

type RepoCreateRepositorySystemLabelsClient = {
  createRepositorySystemLabels: (input: {
    repository_id: string;
  }) => Promise<{
    labels: import("../client.js").RepoLabelDetail[];
    total?: number;
  }>;
};

export function createRepoCreateRepositorySystemLabelsHandler(
  client: RepoCreateRepositorySystemLabelsClient
) {
  return async (input: unknown) => {
    const parsed = repoCreateRepositorySystemLabelsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositoryLabelMutation("Dry run: create repository system labels", {
        repositoryId: parsed.repository_id
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createRepositorySystemLabels(parsed);
    const result = mapRepositoryLabelsResult("Created repository system labels", response.labels);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
