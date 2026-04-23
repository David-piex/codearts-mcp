import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetIterationInput } from "../schemas.js";

export function mapReqIteration(input: {
  iteration_id: number | string;
  name: string;
  status?: string;
  begin_time?: string;
  end_time?: string;
  description?: string;
  progress?: string;
  total?: number;
  opened_total?: number;
  closed_total?: number;
  have_task?: boolean;
  charts?: Record<string, unknown>;
  created_time?: number;
  updated_time?: number;
}) {
  return asItemResult(`Loaded iteration ${input.iteration_id}`, {
    id: String(input.iteration_id),
    name: input.name,
    status: input.status,
    beginTime: input.begin_time,
    endTime: input.end_time,
    description: input.description,
    progress: input.progress,
    total: input.total,
    openedTotal: input.opened_total,
    closedTotal: input.closed_total,
    haveTask: input.have_task,
    charts: input.charts,
    createdTime: input.created_time,
    updatedTime: input.updated_time
  });
}

type ReqGetIterationClient = {
  getIteration: (input: { iteration_id: string }) => Promise<{
    iteration_id: number | string;
    name: string;
    status?: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    progress?: string;
    total?: number;
    opened_total?: number;
    closed_total?: number;
    have_task?: boolean;
    charts?: Record<string, unknown>;
    created_time?: number;
    updated_time?: number;
  }>;
};

export function createReqGetIterationHandler(client: ReqGetIterationClient) {
  return async (input: unknown) => {
    const parsed = reqGetIterationInput.parse(input);
    const response = await client.getIteration(parsed);
    const result = mapReqIteration(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
