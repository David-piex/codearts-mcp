import { asItemResult } from "../../../contracts/tool-result.js";
import { reqChangeReleasePlanStatusInput } from "../schemas.js";

export function previewChangeReleasePlanStatus(input: {
  project_id: string;
  plan_id: string;
  operate: string;
  move_to_sprint_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: change release plan status ${input.plan_id}`, {
    projectId: input.project_id,
    id: input.plan_id,
    operate: input.operate,
    moveToSprintId: input.move_to_sprint_id,
    executed: false
  });
}

type ReqChangeReleasePlanStatusClient = {
  changeReleasePlanStatus: (input: {
    project_id: string;
    plan_id: string;
    operate: string;
    move_to_sprint_id?: string;
  }) => Promise<{
    project_id: string;
    plan_id: string;
    operate: string;
    move_to_sprint_id?: string;
    status?: string;
    message?: string;
    result?: unknown;
  }>;
};

export function createReqChangeReleasePlanStatusHandler(client: ReqChangeReleasePlanStatusClient) {
  return async (input: unknown) => {
    const parsed = reqChangeReleasePlanStatusInput.parse(input);

    if (parsed.dry_run) {
      const result = previewChangeReleasePlanStatus(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.changeReleasePlanStatus(parsed);
    const result = asItemResult(`Changed release plan status ${response.plan_id}`, {
      projectId: response.project_id,
      id: response.plan_id,
      operate: response.operate,
      moveToSprintId: response.move_to_sprint_id,
      status: response.status,
      message: response.message,
      result: response.result,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
