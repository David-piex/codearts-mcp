import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListRepositoriesInput } from "../schemas.js";

export function mapRepositories(
  items: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined ? `${items.length} repositories found in this page (total: ${total})` : `${items.length} repositories found`;
  return asListResult(
    summary,
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
    const text = formatListToolText(result, {
      emptyText: formatProjectScopedEmptyText({
        summary: result.summary,
        page: parsed.page,
        keyword: parsed.keyword,
        projectId: parsed.project_id,
        resourceLabel: "repositories",
        serviceLabel: "Repo"
      }),
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "sshUrl", get: (item) => (item as { sshUrl?: string }).sshUrl },
        { label: "httpUrl", get: (item) => (item as { httpUrl?: string }).httpUrl }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
