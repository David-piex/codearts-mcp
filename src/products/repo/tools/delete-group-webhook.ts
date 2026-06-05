import {
  mapDeletedRepositoryWebhook,
  previewDeleteRepositoryWebhook,
} from "./delete-repository-webhook.js";
import { repoDeleteGroupWebhookInput } from "../schemas.js";

type RepoDeleteGroupWebhookClient = {
  deleteGroupWebhook: (input: {
    group_id: string;
    hook_id: string;
  }) => Promise<{
    hook_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteGroupWebhookHandler(client: RepoDeleteGroupWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteGroupWebhookInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteRepositoryWebhook({
        repository_id: parsed.group_id,
        hook_id: parsed.hook_id,
        dry_run: parsed.dry_run,
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteGroupWebhook(parsed);
    const result = mapDeletedRepositoryWebhook(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
