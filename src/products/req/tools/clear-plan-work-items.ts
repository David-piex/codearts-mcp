import { asItemResult } from "../../../contracts/tool-result.js";
import { reqClearPlanWorkItemsInput } from "../schemas.js";

export function previewClearPlanWorkItems(input: {
  project_id: string;
  plan_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: clear work items from plan ${input.plan_id}`, {
    projectId: input.project_id,
    planId: input.plan_id,
    cleared: false,
    executed: false
  });
}

export function mapClearedPlanWorkItems(input: {
  project_id: string;
  plan_id: string;
}) {
  return asItemResult(`Cleared work items from plan ${input.plan_id}`, {
    projectId: input.project_id,
    planId: input.plan_id,
    cleared: true,
    executed: true
  });
}

type ReqClearPlanWorkItemsClient = {
  clearPlanWorkItems: (input: { project_id: string; plan_id: string }) => Promise<{
    project_id: string;
    plan_id: string;
    cleared: true;
  }>;
};

export function createReqClearPlanWorkItemsHandler(client: ReqClearPlanWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqClearPlanWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewClearPlanWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.clearPlanWorkItems(parsed);
    const result = mapClearedPlanWorkItems(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
