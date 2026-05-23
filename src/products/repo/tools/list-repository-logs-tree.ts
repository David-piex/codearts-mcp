import type { RepoLogTreeObject } from "../client.js";
import { repoListRepositoryLogsTreeInput } from "../schemas.js";
import { mapRepositoryLogsTree } from "./repository-browse-result.js";

type Client = {
  listRepositoryLogsTree: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    ref?: string;
  }) => Promise<{
    trees: RepoLogTreeObject[];
    total?: number;
  }>;
};

export function createRepoListRepositoryLogsTreeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryLogsTreeInput.parse(input);
    const response = await client.listRepositoryLogsTree(parsed);
    const result = mapRepositoryLogsTree(response.trees, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
