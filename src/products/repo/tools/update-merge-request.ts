import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateMergeRequestInput } from "../schemas.js";

export function previewUpdateMergeRequest(input: {
  repository_id: string;
  merge_request_iid: string;
  dry_run: boolean;
  title?: string;
  state_event?: string;
  assignee_ids?: string | Array<string | number>;
  reviewer_ids?: string | Array<string | number>;
  description?: string;
  milestone_id?: string | number;
  labels?: string | string[] | Record<string, unknown>;
  force_remove_source_branch?: boolean;
  squash?: boolean;
  squash_commit_message?: string;
  work_item_ids?: string[];
}) {
  return asItemResult(`Dry run: update merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    title: input.title,
    stateEvent: input.state_event,
    assigneeIds: input.assignee_ids,
    reviewerIds: input.reviewer_ids,
    description: input.description,
    milestoneId: input.milestone_id,
    labels: input.labels,
    forceRemoveSourceBranch: input.force_remove_source_branch,
    squash: input.squash,
    squashCommitMessage: input.squash_commit_message,
    workItemIds: input.work_item_ids,
    executed: !input.dry_run
  });
}

export function mapUpdatedMergeRequest(input: {
  id: number | string;
  iid?: number;
  repository_id?: number | string;
  title?: string;
  description?: string;
  state?: string;
  source_branch?: string;
  target_branch?: string;
  web_url?: string;
}) {
  return asItemResult(`Updated merge request ${input.iid ?? input.id}`, {
    id: String(input.id),
    iid: input.iid,
    repositoryId: input.repository_id === undefined ? undefined : String(input.repository_id),
    title: input.title,
    description: input.description,
    state: input.state,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    webUrl: input.web_url,
    executed: true
  });
}

type RepoUpdateMergeRequestClient = {
  updateMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    title?: string;
    state_event?: string;
    assignee_ids?: string | Array<string | number>;
    reviewer_ids?: string | Array<string | number>;
    description?: string;
    milestone_id?: string | number;
    labels?: string | string[] | Record<string, unknown>;
    force_remove_source_branch?: boolean;
    squash?: boolean;
    squash_commit_message?: string;
    work_item_ids?: string[];
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
};

export function createRepoUpdateMergeRequestHandler(client: RepoUpdateMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateMergeRequest(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateMergeRequest(parsed);
    const result = mapUpdatedMergeRequest(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
