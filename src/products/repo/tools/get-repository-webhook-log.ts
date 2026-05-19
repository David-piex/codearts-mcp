import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoGetRepositoryWebhookLogInput } from "../schemas.js";

export function mapRepositoryWebhookLog(item: RepoRepositoryWebhookLog, summary = "Fetched repository webhook log") {
  return asItemResult(summary, {
    id: String(item.id),
    webHookId: item.web_hook_id === undefined ? undefined : String(item.web_hook_id),
    trigger: item.trigger,
    url: item.url,
    requestHeaders: item.request_headers,
    requestData: item.request_data,
    responseHeaders: item.response_headers,
    responseBody: item.response_body,
    responseStatus: item.response_status,
    executionDuration: item.execution_duration,
    uuid: item.uuid,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    repository: item.repository
      ? {
          id: item.repository.id === undefined ? undefined : String(item.repository.id),
          namespace: item.repository.namespace
        }
      : undefined
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
