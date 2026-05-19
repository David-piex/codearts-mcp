import type { RepoRepositoryWebhook } from "../client.js";
import { repoGetProjectWebhookInput } from "../schemas.js";
import { mapRepositoryWebhook } from "./repository-webhook-result.js";

type RepoGetProjectWebhookClient = {
  getProjectWebhook: (input: {
    project_id: string;
    hook_id: string;
  }) => Promise<RepoRepositoryWebhook>;
};

export function createRepoGetProjectWebhookHandler(client: RepoGetProjectWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoGetProjectWebhookInput.parse(input);
    const response = await client.getProjectWebhook(parsed);
    const result = mapRepositoryWebhook("Fetched project webhook", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
