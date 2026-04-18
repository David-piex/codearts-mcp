import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4DeployRecordStepLogsInput } from "../schemas.js";

type DeployGetV4DeployRecordStepLogsClient = {
  getV4DeployRecordStepLogs: (input: {
    project_id: string;
    record_id: string;
    step_id: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    record_id: string;
    step_id: string;
    raw: unknown;
  }>;
};

export function createDeployGetV4DeployRecordStepLogsHandler(
  client: DeployGetV4DeployRecordStepLogsClient
) {
  return async (input: unknown) => {
    const parsed = deployGetV4DeployRecordStepLogsInput.parse(input);
    const response = await client.getV4DeployRecordStepLogs(parsed);
    const result = asItemResult(
      `Loaded v4 deploy record step logs for ${response.record_id}/${response.step_id}`,
      {
        projectId: response.project_id,
        recordId: response.record_id,
        stepId: response.step_id
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
