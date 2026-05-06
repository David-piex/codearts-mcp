import type { RepoRepositoryWebhook } from "../client.js";
import { repoGetRepositoryWebhookInput } from "../schemas.js";
import { mapRepositoryWebhook } from "./repository-webhook-result.js";

type RepoGetRepositoryWebhookClient = {
  getRepositoryWebhook: (input: {
    repository_id: string;
    hook_id: string;
  }) => Promise<RepoRepositoryWebhook>;
};

export function createRepoGetRepositoryWebhookHandler(client: RepoGetRepositoryWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoGetRepositoryWebhookInput.parse(input);
    const response = await client.getRepositoryWebhook(parsed);
    const result = mapRepositoryWebhook("Fetched repository webhook", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
