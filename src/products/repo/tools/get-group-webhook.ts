import type { RepoRepositoryWebhook } from "../client.js";
import { repoGetGroupWebhookInput } from "../schemas.js";
import { mapRepositoryWebhook } from "./repository-webhook-result.js";

type RepoGetGroupWebhookClient = {
  getGroupWebhook: (input: {
    group_id: string;
    hook_id: string;
  }) => Promise<RepoRepositoryWebhook>;
};

export function createRepoGetGroupWebhookHandler(client: RepoGetGroupWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoGetGroupWebhookInput.parse(input);
    const response = await client.getGroupWebhook(parsed);
    const result = mapRepositoryWebhook("Fetched group webhook", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
