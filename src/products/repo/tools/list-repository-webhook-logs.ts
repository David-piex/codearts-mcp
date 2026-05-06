import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoListRepositoryWebhookLogsInput } from "../schemas.js";

export function mapRepositoryWebhookLogs(
  items: RepoRepositoryWebhookLog[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository webhook logs found`,
    items.map((item) => ({
      id: String(item.id),
      trigger: item.trigger,
      url: item.url,
      responseStatus: item.response_status,
      executionDuration: item.execution_duration,
      createdAt: item.created_at
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListRepositoryWebhookLogsClient = {
  listRepositoryWebhookLogs: (input: {
    repository_id: string;
    hook_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    logs: RepoRepositoryWebhookLog[];
    total?: number;
  }>;
};

export function createRepoListRepositoryWebhookLogsHandler(client: RepoListRepositoryWebhookLogsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryWebhookLogsInput.parse(input);
    const response = await client.listRepositoryWebhookLogs(parsed);
    const result = mapRepositoryWebhookLogs(response.logs, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
