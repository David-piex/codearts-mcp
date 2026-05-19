import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoListGroupWebhookLogsInput } from "../schemas.js";
import { mapRepositoryWebhookLogs } from "./list-repository-webhook-logs.js";

type RepoListGroupWebhookLogsClient = {
  listGroupWebhookLogs: (input: {
    group_id: string;
    hook_id: string;
    page: number;
    page_size: number;
    repository_id?: string;
    uuid?: string;
    created_after?: string;
    created_before?: string;
  }) => Promise<{
    logs: RepoRepositoryWebhookLog[];
    total?: number;
  }>;
};

export function createRepoListGroupWebhookLogsHandler(client: RepoListGroupWebhookLogsClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupWebhookLogsInput.parse(input);
    const response = await client.listGroupWebhookLogs(parsed);
    const result = mapRepositoryWebhookLogs(response.logs, parsed.page, parsed.page_size, response.total, "group");

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
