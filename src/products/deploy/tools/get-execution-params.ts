import { asListResult } from "../../../contracts/tool-result.js";
import { deployGetExecutionParamsInput } from "../schemas.js";

export function mapDeployExecutionParams(
  taskId: string,
  recordId: string,
  items: Array<{ name?: string; type?: string; value?: string }>
) {
  return asListResult(
    `${items.length} deploy execution params found`,
    items.map((item) => ({
      id: item.name ?? "",
      taskId,
      recordId,
      name: item.name,
      type: item.type,
      value: item.value
    }))
  );
}

type DeployGetExecutionParamsClient = {
  getExecutionParams: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    params: Array<{ name?: string; type?: string; value?: string }>;
  }>;
};

export function createDeployGetExecutionParamsHandler(client: DeployGetExecutionParamsClient) {
  return async (input: unknown) => {
    const parsed = deployGetExecutionParamsInput.parse(input);
    const response = await client.getExecutionParams(parsed);
    const result = mapDeployExecutionParams(response.task_id, response.record_id, response.params);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        scope: {
          taskId: response.task_id,
          recordId: response.record_id
        }
      }
    };
  };
}
