import type { RepoMergeRequestEvaluation } from "../client.js";
import { repoListMergeRequestEvaluationsInput } from "../schemas.js";
import { mapMergeRequestEvaluations } from "./merge-request-read-result.js";

type RepoListMergeRequestEvaluationsClient = {
  listMergeRequestEvaluations: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
  }) => Promise<{
    evaluations: RepoMergeRequestEvaluation[];
    total?: number;
  }>;
};

export function createRepoListMergeRequestEvaluationsHandler(
  client: RepoListMergeRequestEvaluationsClient
) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestEvaluationsInput.parse(input);
    const response = await client.listMergeRequestEvaluations(parsed);
    const result = mapMergeRequestEvaluations(
      response.evaluations,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
