import { asItemResult } from "../../../contracts/tool-result.js";
import { repoReviewMergeRequestInput } from "../schemas.js";

export function previewReviewMergeRequest(input: {
  repository_id: string;
  merge_request_iid: string;
  action_type: "approve" | "reject" | "reset";
  approver_comment?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: ${input.action_type} merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    actionType: input.action_type,
    approverComment: input.approver_comment,
    executed: !input.dry_run
  });
}

export function mapReviewedMergeRequest(
  input: {
    repository_id: string;
    merge_request_iid: string;
    action_type: "approve" | "reject" | "reset";
    approver_comment?: string;
  },
  reviewers: Array<{
    id: number | string;
    name?: string;
    nick_name?: string;
    state?: string;
    updated_at?: string;
    approver_comment?: string;
  }>
) {
  return asItemResult(`${input.action_type} merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    actionType: input.action_type,
    approverComment: input.approver_comment,
    reviewerCount: reviewers.length,
    reviewers: reviewers.map((item) => ({
      id: String(item.id),
      name: item.name,
      nickName: item.nick_name,
      state: item.state,
      updatedAt: item.updated_at,
      approverComment: item.approver_comment
    })),
    executed: true
  });
}

type RepoReviewMergeRequestClient = {
  reviewMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    action_type: "approve" | "reject" | "reset";
    approver_comment?: string;
  }) => Promise<{
    reviewers: Array<{
      id: number | string;
      name?: string;
      nick_name?: string;
      state?: string;
      updated_at?: string;
      approver_comment?: string;
    }>;
  }>;
};

export function createRepoReviewMergeRequestHandler(client: RepoReviewMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoReviewMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewReviewMergeRequest(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.reviewMergeRequest(parsed);
    const result = mapReviewedMergeRequest(parsed, response.reviewers);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
