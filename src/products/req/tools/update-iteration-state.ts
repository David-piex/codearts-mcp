import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateIterationStateInput } from "../schemas.js";

export function previewUpdateIterationState(input: {
  project_id: string;
  iteration_id: string;
  name: string;
  status: string;
  start_date?: string;
  due_date?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update iteration state ${input.iteration_id}`, {
    projectId: input.project_id,
    iterationId: input.iteration_id,
    name: input.name,
    status: input.status,
    startDate: input.start_date,
    dueDate: input.due_date,
    executed: false
  });
}

export function mapUpdatedIterationState(input: {
  project_id: string;
  iteration_id: string;
  name: string;
  status: string;
  start_date?: string;
  due_date?: string;
  result?: string;
  update_status?: string;
}) {
  return asItemResult(`Updated iteration state ${input.iteration_id}`, {
    projectId: input.project_id,
    iterationId: input.iteration_id,
    name: input.name,
    status: input.status,
    startDate: input.start_date,
    dueDate: input.due_date,
    result: input.result,
    updateStatus: input.update_status,
    executed: true
  });
}

type ReqUpdateIterationStateClient = {
  updateIterationState: (input: {
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    start_date?: string;
    due_date?: string;
  }) => Promise<{
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    start_date?: string;
    due_date?: string;
    result?: string;
    update_status?: string;
  }>;
};

export function createReqUpdateIterationStateHandler(client: ReqUpdateIterationStateClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateIterationStateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateIterationState(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateIterationState(parsed);
    const result = mapUpdatedIterationState(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
