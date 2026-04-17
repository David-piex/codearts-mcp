import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCloseMergeRequestInput } from "../schemas.js";

export function previewCloseMergeRequest(input: {
  repository_id: string;
  merge_request_iid: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: close merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    stateEvent: "close",
    executed: !input.dry_run
  });
}

export function mapClosedMergeRequest(input: {
  id: number | string;
  iid?: number;
  repository_id?: number | string;
  title?: string;
  state?: string;
  source_branch?: string;
  target_branch?: string;
  web_url?: string;
}) {
  return asItemResult(`Closed merge request ${input.iid ?? input.id}`, {
    id: String(input.id),
    iid: input.iid,
    repositoryId: input.repository_id === undefined ? undefined : String(input.repository_id),
    title: input.title,
    state: input.state,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    webUrl: input.web_url,
    executed: true
  });
}

type RepoCloseMergeRequestClient = {
  closeMergeRequest: (input: { repository_id: string; merge_request_iid: string }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
};

export function createRepoCloseMergeRequestHandler(client: RepoCloseMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoCloseMergeRequestInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCloseMergeRequest(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.closeMergeRequest(parsed);
    const result = mapClosedMergeRequest(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
