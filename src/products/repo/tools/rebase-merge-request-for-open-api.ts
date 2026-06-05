import { asItemResult } from "../../../contracts/tool-result.js";
import { repoRebaseMergeRequestForOpenApiInput } from "../schemas.js";

export function previewRebaseMergeRequestForOpenApi(input: {
  repository_id: string;
  merge_request_iid: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: rebase merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    executed: !input.dry_run
  });
}

type RepoRebaseMergeRequestForOpenApiClient = {
  rebaseMergeRequestForOpenApi: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    repository_id: string;
    merge_request_iid: string;
    message?: string;
    rebased: boolean;
  }>;
};

export function createRepoRebaseMergeRequestForOpenApiHandler(
  client: RepoRebaseMergeRequestForOpenApiClient
) {
  return async (input: unknown) => {
    const parsed = repoRebaseMergeRequestForOpenApiInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRebaseMergeRequestForOpenApi(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.rebaseMergeRequestForOpenApi(parsed);
    const result = asItemResult(`Rebased merge request ${parsed.merge_request_iid}`, {
      repositoryId: response.repository_id,
      mergeRequestIid: response.merge_request_iid,
      message: response.message,
      rebased: response.rebased,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
