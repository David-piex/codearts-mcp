import {
  mapDeletedRepositoryWebhook,
  previewDeleteRepositoryWebhook,
} from "./delete-repository-webhook.js";
import { repoDeleteProjectWebhookInput } from "../schemas.js";

type RepoDeleteProjectWebhookClient = {
  deleteProjectWebhook: (input: {
    project_id: string;
    hook_id: string;
  }) => Promise<{
    hook_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteProjectWebhookHandler(client: RepoDeleteProjectWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteProjectWebhookInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteRepositoryWebhook({
        repository_id: parsed.project_id,
        hook_id: parsed.hook_id,
        dry_run: parsed.dry_run,
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectWebhook(parsed);
    const result = mapDeletedRepositoryWebhook(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
