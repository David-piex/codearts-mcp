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
  step_states?: Array<{
    id?: number;
    name?: string;
    step_name?: string;
    status?: string;
    region?: string;
    offset?: number;
    current_offset?: number;
    elapsed_time?: number;
    enable?: boolean;
    faq_url?: string;
  }>;
}) {
  return asItemResult(`Loaded deploy history detail ${input.record_id}`, {
    id: input.record_id,
    taskId: input.task_id,
    recordId: input.record_id,
    state: input.state,
    percentage: input.percentage,
    operatorName: input.operator_name,
    startedAt: input.start_time,
    finishedAt: input.end_time,
    stepCount: input.step_states?.length ?? 0,
    stepStates: input.step_states
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
    step_states?: Array<{
      id?: number;
      name?: string;
      step_name?: string;
      status?: string;
      region?: string;
      offset?: number;
      current_offset?: number;
      elapsed_time?: number;
      enable?: boolean;
      faq_url?: string;
    }>;
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
