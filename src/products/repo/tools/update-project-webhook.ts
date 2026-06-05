import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryWebhook } from "../client.js";
import { repoUpdateProjectWebhookInput } from "../schemas.js";
import { mapRepositoryWebhook, webhookPreview } from "./repository-webhook-result.js";

type RepoUpdateProjectWebhookClient = {
  updateProjectWebhook: (input: {
    project_id: string;
    hook_id: string;
    url?: string;
    name?: string;
    description?: string;
    token?: string;
    token_type?: string;
    push_events?: boolean;
    tag_push_events?: boolean;
    merge_requests_events?: boolean;
    issues_events?: boolean;
    note_events?: boolean;
    job_events?: boolean;
    pipeline_events?: boolean;
    wiki_page_events?: boolean;
    enable_ssl_verification?: boolean;
    branch_filter_strategy?: string;
    push_events_branch_regex_filter?: string;
  }) => Promise<RepoRepositoryWebhook>;
};

export function createRepoUpdateProjectWebhookHandler(client: RepoUpdateProjectWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateProjectWebhookInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update project webhook", webhookPreview(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectWebhook(parsed);
    const result = mapRepositoryWebhook("Updated project webhook", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
