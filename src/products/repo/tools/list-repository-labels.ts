import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListRepositoryLabelsInput } from "../schemas.js";

export function mapRepositoryLabels(
  items: Array<{
    id: number | string;
    name?: string;
    color?: string;
    description?: string;
    text_color?: string;
    is_expired?: boolean;
    open_merge_requests_count?: number;
    priority?: number;
    is_repository_label?: boolean;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository labels found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      color: item.color,
      description: item.description,
      textColor: item.text_color,
      expired: item.is_expired,
      openMergeRequestsCount: item.open_merge_requests_count,
      priority: item.priority,
      repositoryLabel: item.is_repository_label
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListRepositoryLabelsClient = {
  listRepositoryLabels: (input: { repository_id: string }) => Promise<{
    labels: Array<{
      id: number | string;
      name?: string;
      color?: string;
      description?: string;
      text_color?: string;
      is_expired?: boolean;
      open_merge_requests_count?: number;
      priority?: number;
      is_repository_label?: boolean;
    }>;
    total?: number;
  }>;
};

export function createRepoListRepositoryLabelsHandler(client: RepoListRepositoryLabelsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryLabelsInput.parse(input);
    const response = await client.listRepositoryLabels(parsed);
    const offset = (parsed.page - 1) * parsed.page_size;
    const pageItems = response.labels.slice(offset, offset + parsed.page_size);
    const result = mapRepositoryLabels(
      pageItems,
      parsed.page,
      parsed.page_size,
      response.total ?? response.labels.length
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
