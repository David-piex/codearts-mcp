import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchDeleteReleasePlansInput } from "../schemas.js";
import { mapReleasePlanBatch, type ReleasePlanBatchResult } from "./release-plan-mappers.js";

export function previewBatchDeleteReleasePlans(input: {
  project_id: string;
  plan_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete ${input.plan_ids.length} release plan(s)`, {
    projectId: input.project_id,
    planIds: input.plan_ids,
    deleted: false,
    executed: false
  });
}

type ReqBatchDeleteReleasePlansClient = {
  batchDeleteReleasePlans: (input: {
    project_id: string;
    plan_ids: string[];
  }) => Promise<ReleasePlanBatchResult>;
};

export function createReqBatchDeleteReleasePlansHandler(client: ReqBatchDeleteReleasePlansClient) {
  return async (input: unknown) => {
    const parsed = reqBatchDeleteReleasePlansInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteReleasePlans(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteReleasePlans(parsed);
    const result = mapReleasePlanBatch(`Deleted ${response.success_num ?? 0} release plan(s)`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
