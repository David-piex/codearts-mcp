import type { RepoMergeRequestAverageEvaluation } from "../client.js";
import { repoShowAverageEvaluationInput } from "../schemas.js";
import { mapAverageEvaluation } from "./merge-request-read-result.js";

type RepoShowAverageEvaluationClient = {
  showAverageEvaluation: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<RepoMergeRequestAverageEvaluation>;
};

export function createRepoShowAverageEvaluationHandler(client: RepoShowAverageEvaluationClient) {
  return async (input: unknown) => {
    const parsed = repoShowAverageEvaluationInput.parse(input);
    const response = await client.showAverageEvaluation(parsed);
    const result = mapAverageEvaluation(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
