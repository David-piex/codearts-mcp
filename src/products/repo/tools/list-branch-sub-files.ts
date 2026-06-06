import type { RepoLogTreeObject } from "../client.js";
import { repoListBranchSubFilesInput } from "../schemas.js";
import { mapRepositoryLogsTree } from "./repository-browse-result.js";

type RepoListBranchSubFilesClient = {
  listBranchSubFiles: (input: {
    x_auth_token: string;
    repository_uuid: string;
    branch_name: string;
    path?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    trees: RepoLogTreeObject[];
    total?: number;
  }>;
};

export function createRepoListBranchSubFilesHandler(client: RepoListBranchSubFilesClient) {
  return async (input: unknown) => {
    const parsed = repoListBranchSubFilesInput.parse(input);
    const response = await client.listBranchSubFiles(parsed);
    const result = mapRepositoryLogsTree(response.trees, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
