import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListRepositoriesInput } from "../schemas.js";

export function mapRepositories(
  items: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repositories found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      sshUrl: item.ssh_url,
      httpUrl: item.http_url
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListRepositoriesClient = {
  listRepositories: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
    total?: number;
  }>;
};

export function createRepoListRepositoriesHandler(client: RepoListRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoriesInput.parse(input);
    const response = await client.listRepositories(parsed);
    const result = mapRepositories(response.repositories, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
