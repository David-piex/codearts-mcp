import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateMergeRequestInput } from "../schemas.js";

export function previewCreateMergeRequest(input: {
  repository_id: string;
  source_branch: string;
  target_branch: string;
  title: string;
  dry_run: boolean;
  work_item_ids?: string[];
  target_project_id?: string;
  assignee_id?: string | number;
  reviewer_ids?: Array<string | number>;
  remove_source_branch?: boolean;
  squash?: boolean;
  draft?: boolean;
  labels?: string | string[];
  milestone_id?: string | number;
}) {
  return asItemResult(`Dry run: create merge request ${input.title}`, {
    repositoryId: input.repository_id,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    title: input.title,
    workItemIds: input.work_item_ids,
    targetProjectId: input.target_project_id,
    assigneeId: input.assignee_id,
    reviewerIds: input.reviewer_ids,
    removeSourceBranch: input.remove_source_branch,
    squash: input.squash,
    draft: input.draft,
    labels: input.labels,
    milestoneId: input.milestone_id,
    executed: !input.dry_run
  });
}

export function mapCreatedMergeRequest(input: {
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
  return asItemResult(`Created merge request ${input.iid ?? input.id}`, {
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

type RepoCreateMergeRequestClient = {
  createMergeRequest: (input: {
    repository_id: string;
    source_branch: string;
    target_branch: string;
    title: string;
    description?: string;
    work_item_ids?: string[];
    target_project_id?: string;
    assignee_id?: string | number;
    reviewer_ids?: Array<string | number>;
    remove_source_branch?: boolean;
    squash?: boolean;
    draft?: boolean;
    labels?: string | string[];
    milestone_id?: string | number;
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

export function createRepoCreateMergeRequestHandler(client: RepoCreateMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoCreateMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateMergeRequest(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createMergeRequest(parsed);
    const result = mapCreatedMergeRequest(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
