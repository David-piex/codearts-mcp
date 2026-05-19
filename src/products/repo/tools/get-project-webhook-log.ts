import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoGetProjectWebhookLogInput } from "../schemas.js";
import { mapRepositoryWebhookLog } from "./get-repository-webhook-log.js";

type RepoGetProjectWebhookLogClient = {
  getProjectWebhookLog: (input: {
    project_id: string;
    hook_id: string;
    log_id: string;
  }) => Promise<RepoRepositoryWebhookLog>;
};

export function createRepoGetProjectWebhookLogHandler(client: RepoGetProjectWebhookLogClient) {
  return async (input: unknown) => {
    const parsed = repoGetProjectWebhookLogInput.parse(input);
    const response = await client.getProjectWebhookLog(parsed);
    const result = mapRepositoryWebhookLog(response, "Fetched project webhook log");

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
