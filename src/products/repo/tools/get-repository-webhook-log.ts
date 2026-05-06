import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoGetRepositoryWebhookLogInput } from "../schemas.js";

export function mapRepositoryWebhookLog(item: RepoRepositoryWebhookLog) {
  return asItemResult("Fetched repository webhook log", {
    id: String(item.id),
    trigger: item.trigger,
    url: item.url,
    requestHeaders: item.request_headers,
    requestData: item.request_data,
    responseHeaders: item.response_headers,
    responseBody: item.response_body,
    responseStatus: item.response_status,
    executionDuration: item.execution_duration,
    createdAt: item.created_at
  });
}

type RepoGetRepositoryWebhookLogClient = {
  getRepositoryWebhookLog: (input: {
    repository_id: string;
    hook_id: string;
    log_id: string;
  }) => Promise<RepoRepositoryWebhookLog>;
};

export function createRepoGetRepositoryWebhookLogHandler(client: RepoGetRepositoryWebhookLogClient) {
  return async (input: unknown) => {
    const parsed = repoGetRepositoryWebhookLogInput.parse(input);
    const response = await client.getRepositoryWebhookLog(parsed);
    const result = mapRepositoryWebhookLog(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
