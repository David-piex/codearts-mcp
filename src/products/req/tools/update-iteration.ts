import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateIterationInput } from "../schemas.js";

export function previewUpdateIteration(input: {
  project_id: string;
  iteration_id: string;
  name: string;
  begin_time?: string;
  end_time?: string;
  description?: string;
  status?: string;
  over_type?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update iteration ${input.iteration_id}`, {
    id: input.iteration_id,
    projectId: input.project_id,
    name: input.name,
    beginTime: input.begin_time,
    endTime: input.end_time,
    description: input.description,
    status: input.status,
    overType: input.over_type,
    executed: false
  });
}

export function mapUpdatedIteration(input: {
  project_id: string;
  iteration_id: string;
  name: string;
  begin_time?: string;
  end_time?: string;
  description?: string;
  status?: string;
  over_type?: string;
}) {
  return asItemResult(`Updated iteration ${input.iteration_id}`, {
    id: input.iteration_id,
    projectId: input.project_id,
    name: input.name,
    beginTime: input.begin_time,
    endTime: input.end_time,
    description: input.description,
    status: input.status,
    overType: input.over_type,
    executed: true
  });
}

type ReqUpdateIterationClient = {
  updateIteration: (input: {
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    status?: string;
    over_type?: string;
  }) => Promise<{
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    status?: string;
    over_type?: string;
  }>;
};

export function createReqUpdateIterationHandler(client: ReqUpdateIterationClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateIterationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateIteration(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateIteration(parsed);
    const result = mapUpdatedIteration(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
