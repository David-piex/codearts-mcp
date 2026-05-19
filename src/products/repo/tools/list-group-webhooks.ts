import type { RepoRepositoryWebhook } from "../client.js";
import { repoListGroupWebhooksInput } from "../schemas.js";
import { mapRepositoryWebhooks } from "./list-repository-webhooks.js";

type RepoListGroupWebhooksClient = {
  listGroupWebhooks: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    hooks: RepoRepositoryWebhook[];
    total?: number;
  }>;
};

export function createRepoListGroupWebhooksHandler(client: RepoListGroupWebhooksClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupWebhooksInput.parse(input);
    const response = await client.listGroupWebhooks(parsed);
    const result = mapRepositoryWebhooks(response.hooks, parsed.page, parsed.page_size, response.total, "group");

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
