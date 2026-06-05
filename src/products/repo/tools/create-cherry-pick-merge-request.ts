import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoCherryPickMergeRequestResult } from "../client.js";
import { repoCreateCherryPickMergeRequestInput } from "../schemas.js";

function previewCreateCherryPickMergeRequest(input: {
  repository_id: string;
  merge_request_iid: string;
  branch: string;
  with_new_merge_request?: boolean;
  message?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: cherry-pick merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    branch: input.branch,
    withNewMergeRequest: input.with_new_merge_request,
    message: input.message,
    executed: !input.dry_run
  });
}

function mapCherryPickMergeRequestResult(input: RepoCherryPickMergeRequestResult) {
  return asItemResult("Cherry-pick merge request executed", {
    state: input.state,
    title: input.title,
    cherryPickBranchName: input.cherry_pick_branch_name,
    executed: true
  });
}

type Client = {
  createCherryPickMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    branch: string;
    with_new_merge_request?: boolean;
    message?: string;
  }) => Promise<RepoCherryPickMergeRequestResult>;
};

export function createRepoCreateCherryPickMergeRequestHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoCreateCherryPickMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateCherryPickMergeRequest(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createCherryPickMergeRequest(parsed);
    const result = mapCherryPickMergeRequestResult(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
