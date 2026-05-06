import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoRepositoryWebhook } from "../client.js";
import { repoListRepositoryWebhooksInput } from "../schemas.js";

export function mapRepositoryWebhooks(
  items: RepoRepositoryWebhook[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository webhooks found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      url: item.url,
      description: item.description,
      pushEvents: item.push_events,
      tagPushEvents: item.tag_push_events,
      mergeRequestsEvents: item.merge_requests_events,
      issuesEvents: item.issues_events,
      noteEvents: item.note_events,
      jobEvents: item.job_events,
      pipelineEvents: item.pipeline_events,
      wikiPageEvents: item.wiki_page_events,
      enableSslVerification: item.enable_ssl_verification,
      branchFilterStrategy: item.branch_filter_strategy,
      pushEventsBranchRegexFilter: item.push_events_branch_regex_filter,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListRepositoryWebhooksClient = {
  listRepositoryWebhooks: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    include_system?: boolean;
  }) => Promise<{
    hooks: RepoRepositoryWebhook[];
    total?: number;
  }>;
};

export function createRepoListRepositoryWebhooksHandler(client: RepoListRepositoryWebhooksClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryWebhooksInput.parse(input);
    const response = await client.listRepositoryWebhooks(parsed);
    const result = mapRepositoryWebhooks(response.hooks, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
