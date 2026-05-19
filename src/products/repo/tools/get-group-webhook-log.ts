import type { RepoRepositoryWebhookLog } from "../client.js";
import { repoGetGroupWebhookLogInput } from "../schemas.js";
import { mapRepositoryWebhookLog } from "./get-repository-webhook-log.js";

type RepoGetGroupWebhookLogClient = {
  getGroupWebhookLog: (input: {
    group_id: string;
    hook_id: string;
    log_id: string;
  }) => Promise<RepoRepositoryWebhookLog>;
};

export function createRepoGetGroupWebhookLogHandler(client: RepoGetGroupWebhookLogClient) {
  return async (input: unknown) => {
    const parsed = repoGetGroupWebhookLogInput.parse(input);
    const response = await client.getGroupWebhookLog(parsed);
    const result = mapRepositoryWebhookLog(response, "Fetched group webhook log");

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
