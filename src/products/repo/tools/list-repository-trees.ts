import type { RepoTreeObject } from "../client.js";
import { repoListRepositoryTreesInput } from "../schemas.js";
import { mapRepositoryTrees } from "./repository-browse-result.js";

type RepoListRepositoryTreesClient = {
  listRepositoryTrees: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    ref?: string;
    path?: string;
    recursive?: boolean;
  }) => Promise<{
    trees: RepoTreeObject[];
    total?: number;
  }>;
};

export function createRepoListRepositoryTreesHandler(client: RepoListRepositoryTreesClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryTreesInput.parse(input);
    const response = await client.listRepositoryTrees(parsed);
    const result = mapRepositoryTrees(response.trees, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
