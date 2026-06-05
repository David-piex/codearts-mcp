import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryWebhook } from "../client.js";
import { repoCreateProjectWebhookInput } from "../schemas.js";
import { mapRepositoryWebhook, webhookPreview } from "./repository-webhook-result.js";

type RepoCreateProjectWebhookClient = {
  createProjectWebhook: (input: {
    project_id: string;
    url: string;
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

export function createRepoCreateProjectWebhookHandler(client: RepoCreateProjectWebhookClient) {
  return async (input: unknown) => {
    const parsed = repoCreateProjectWebhookInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: create project webhook", webhookPreview(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectWebhook(parsed);
    const result = mapRepositoryWebhook("Created project webhook", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
