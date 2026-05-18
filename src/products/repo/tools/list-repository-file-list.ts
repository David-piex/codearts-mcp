import { repoListRepositoryFileListInput } from "../schemas.js";
import { mapRepositoryFileList } from "./repository-browse-result.js";

type RepoListRepositoryFileListClient = {
  listRepositoryFileList: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    ref_name?: string;
    search?: string;
  }) => Promise<{
    files: string[];
    total?: number;
  }>;
};

export function createRepoListRepositoryFileListHandler(client: RepoListRepositoryFileListClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryFileListInput.parse(input);
    const response = await client.listRepositoryFileList(parsed);
    const result = mapRepositoryFileList(response.files, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
