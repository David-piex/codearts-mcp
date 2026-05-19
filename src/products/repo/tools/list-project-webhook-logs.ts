import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoListProjectWebhookLogsInput } from "../schemas.js";
import { mapRepositoryWebhookLogs } from "./list-repository-webhook-logs.js";

type RepoListProjectWebhookLogsClient = {
  listProjectWebhookLogs: (input: {
    project_id: string;
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

export function createRepoListProjectWebhookLogsHandler(client: RepoListProjectWebhookLogsClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectWebhookLogsInput.parse(input);
    const response = await client.listProjectWebhookLogs(parsed);
    const result = mapRepositoryWebhookLogs(response.logs, parsed.page, parsed.page_size, response.total, "project");

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
