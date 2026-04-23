import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateIterationInput } from "../schemas.js";

export function previewCreateIteration(input: {
  project_id: string;
  name: string;
  begin_time: string;
  end_time: string;
  description?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create iteration ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    beginTime: input.begin_time,
    endTime: input.end_time,
    description: input.description,
    executed: false
  });
}

export function mapCreatedIteration(input: {
  id: number | string;
  project_id: string;
  name: string;
  begin_time: string;
  end_time: string;
  description?: string;
}) {
  return asItemResult(`Created iteration ${input.name}`, {
    id: String(input.id),
    projectId: input.project_id,
    name: input.name,
    beginTime: input.begin_time,
    endTime: input.end_time,
    description: input.description,
    executed: true
  });
}

type ReqCreateIterationClient = {
  createIteration: (input: {
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description?: string;
  }) => Promise<{
    id: number | string;
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description?: string;
  }>;
};

export function createReqCreateIterationHandler(client: ReqCreateIterationClient) {
  return async (input: unknown) => {
    const parsed = reqCreateIterationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateIteration(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createIteration(parsed);
    const result = mapCreatedIteration(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
