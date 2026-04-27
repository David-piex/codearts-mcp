import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchUpdateReleasePlanBaselineInput } from "../schemas.js";
import { mapReleasePlanBatch, type ReleasePlanBatchResult } from "./release-plan-mappers.js";

export function previewBatchUpdateReleasePlanBaseline(input: {
  project_id: string;
  plan_ids: string[];
  baseline: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update release plan baseline for ${input.plan_ids.length} plan(s)`, {
    projectId: input.project_id,
    planIds: input.plan_ids,
    baseline: input.baseline,
    executed: false
  });
}

type ReqBatchUpdateReleasePlanBaselineClient = {
  batchUpdateReleasePlanBaseline: (input: {
    project_id: string;
    plan_ids: string[];
    baseline: string;
  }) => Promise<ReleasePlanBatchResult>;
};

export function createReqBatchUpdateReleasePlanBaselineHandler(client: ReqBatchUpdateReleasePlanBaselineClient) {
  return async (input: unknown) => {
    const parsed = reqBatchUpdateReleasePlanBaselineInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchUpdateReleasePlanBaseline(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateReleasePlanBaseline(parsed);
    const result = mapReleasePlanBatch(`Updated release plan baseline for ${response.success_num ?? 0} plan(s)`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
