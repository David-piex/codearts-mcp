import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetHistoryDetailInput } from "../schemas.js";

export function mapDeployHistoryDetail(input: {
  task_id: string;
  record_id: string;
  state?: string;
  percentage?: number;
  operator_name?: string;
  start_time?: string;
  end_time?: string;
  step_states?: Array<{ step_name?: string; status?: string }>;
}) {
  return asItemResult(`Loaded deploy history detail ${input.record_id}`, {
    id: input.task_id,
    recordId: input.record_id,
    state: input.state,
    percentage: input.percentage,
    operatorName: input.operator_name,
    startedAt: input.start_time,
    finishedAt: input.end_time,
    stepCount: input.step_states?.length ?? 0
  });
}

type DeployGetHistoryDetailClient = {
  getHistoryDetail: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    state?: string;
    percentage?: number;
    operator_name?: string;
    start_time?: string;
    end_time?: string;
    step_states?: Array<{ step_name?: string; status?: string }>;
  }>;
};

export function createDeployGetHistoryDetailHandler(client: DeployGetHistoryDetailClient) {
  return async (input: unknown) => {
    const parsed = deployGetHistoryDetailInput.parse(input);
    const response = await client.getHistoryDetail(parsed);
    const result = mapDeployHistoryDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
