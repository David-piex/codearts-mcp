import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4DeployRecordInput } from "../schemas.js";

type DeployGetV4DeployRecordClient = {
  getV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    step_id?: string;
  }) => Promise<{
    project_id: string;
    record_id: string;
    step_id?: string;
    raw: unknown;
  }>;
};

export function createDeployGetV4DeployRecordHandler(client: DeployGetV4DeployRecordClient) {
  return async (input: unknown) => {
    const parsed = deployGetV4DeployRecordInput.parse(input);
    const response = await client.getV4DeployRecord(parsed);
    const raw =
      response.raw && typeof response.raw === "object" && !Array.isArray(response.raw)
        ? (response.raw as {
            id?: string;
            record_id?: string;
            state?: string;
            orchestration_id?: string;
            start_time?: string;
            end_time?: string;
          })
        : undefined;
    const result = asItemResult(
      `Loaded v4 deploy record ${response.record_id}`,
      {
        id: response.record_id,
        projectId: response.project_id,
        recordId: response.record_id,
        stepId: response.step_id,
        state: raw?.state,
        orchestrationId: raw?.orchestration_id,
        startTime: raw?.start_time,
        endTime: raw?.end_time
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
