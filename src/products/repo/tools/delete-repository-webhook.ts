import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteRepositoryWebhookInput } from "../schemas.js";

export function previewDeleteRepositoryWebhook(input: {
  repository_id: string;
  hook_id: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: delete repository webhook", {
    repositoryId: input.repository_id,
    hookId: input.hook_id,
    executed: !input.dry_run
  });
}

export function mapDeletedRepositoryWebhook(input: { hook_id: string; deleted: boolean }) {
  return asItemResult("Deleted repository webhook", {
    id: input.hook_id,
    hookId: input.hook_id,
    deleted: input.deleted,
    executed: true
  });
}

type RepoDeleteRepositoryWebhookClient = {
  deleteRepositoryWebhook: (input: {
    repository_id: string;
    hook_id: string;
  }) => Promise<{
    hook_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteRepositoryWebhookHandler(client: RepoDeleteRepositoryWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteRepositoryWebhookInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteRepositoryWebhook(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteRepositoryWebhook(parsed);
    const result = mapDeletedRepositoryWebhook(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
