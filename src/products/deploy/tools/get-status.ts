import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetStatusInput } from "../schemas.js";

export function mapDeployStatus(input: {
  task_id: string;
  state?: string;
  percentage?: number;
  elapsed_time?: number;
  step_states?: Array<{ name?: string; status?: string }>;
}) {
  return asItemResult(`Loaded deploy status ${input.task_id}`, {
    id: input.task_id,
    state: input.state,
    percentage: input.percentage,
    elapsedTime: input.elapsed_time,
    stepCount: input.step_states?.length
  });
}

type DeployGetStatusClient = {
  getStatus: (input: { task_id: string; record_id?: string }) => Promise<{
    task_id: string;
    state?: string;
    percentage?: number;
    elapsed_time?: number;
    step_states?: Array<{ name?: string; status?: string }>;
  }>;
};

export function createDeployGetStatusHandler(client: DeployGetStatusClient) {
  return async (input: unknown) => {
    const parsed = deployGetStatusInput.parse(input);
    const response = await client.getStatus(parsed);
    const result = mapDeployStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
