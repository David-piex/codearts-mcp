import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryWebhook } from "../client.js";

export type RepositoryWebhook = RepoRepositoryWebhook;

export function mapRepositoryWebhook(summary: string, item: RepositoryWebhook) {
  return asItemResult(summary, {
    id: String(item.id),
    name: item.name,
    url: item.url,
    description: item.description,
    tokenMasked: item.token,
    tokenType: item.token_type,
    pushEvents: item.push_events,
    tagPushEvents: item.tag_push_events,
    mergeRequestsEvents: item.merge_requests_events,
    issuesEvents: item.issues_events,
    noteEvents: item.note_events,
    notePlainTextFilter: item.note_plain_text_filter,
    jobEvents: item.job_events,
    pipelineEvents: item.pipeline_events,
    wikiPageEvents: item.wiki_page_events,
    enableSslVerification: item.enable_ssl_verification,
    branchFilterStrategy: item.branch_filter_strategy,
    pushEventsBranchRegexFilter: item.push_events_branch_regex_filter,
    eventConfigs: item.event_cfgs,
    projectConfigs: item.project_cfgs,
    branchConfigs: item.branch_cfgs,
    service: item.service,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  });
}

export function webhookPreview(input: {
  repository_id: string;
  hook_id?: string;
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
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    hookId: input.hook_id,
    url: input.url,
    name: input.name,
    description: input.description,
    tokenProvided: Boolean(input.token),
    tokenType: input.token_type,
    pushEvents: input.push_events,
    tagPushEvents: input.tag_push_events,
    mergeRequestsEvents: input.merge_requests_events,
    issuesEvents: input.issues_events,
    noteEvents: input.note_events,
    jobEvents: input.job_events,
    pipelineEvents: input.pipeline_events,
    wikiPageEvents: input.wiki_page_events,
    enableSslVerification: input.enable_ssl_verification,
    branchFilterStrategy: input.branch_filter_strategy,
    pushEventsBranchRegexFilter: input.push_events_branch_regex_filter,
    executed: !input.dry_run
  };
}
