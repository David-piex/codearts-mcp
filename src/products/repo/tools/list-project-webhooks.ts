import type { RepoRepositoryWebhook } from "../client.js";
import { repoListProjectWebhooksInput } from "../schemas.js";
import { mapRepositoryWebhooks } from "./list-repository-webhooks.js";

type RepoListProjectWebhooksClient = {
  listProjectWebhooks: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    hooks: RepoRepositoryWebhook[];
    total?: number;
  }>;
};

export function createRepoListProjectWebhooksHandler(client: RepoListProjectWebhooksClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectWebhooksInput.parse(input);
    const response = await client.listProjectWebhooks(parsed);
    const result = mapRepositoryWebhooks(response.hooks, parsed.page, parsed.page_size, response.total, "project");

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
