import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetLastRecordDetailInput } from "../schemas.js";

type DeployGetLastRecordDetailClient = {
  getLastRecordDetail: (input: {
    project_id: string;
    orchestration_id: string;
  }) => Promise<{
    project_id: string;
    orchestration_id: string;
    raw: unknown;
  }>;
};

export function createDeployGetLastRecordDetailHandler(client: DeployGetLastRecordDetailClient) {
  return async (input: unknown) => {
    const parsed = deployGetLastRecordDetailInput.parse(input);
    const response = await client.getLastRecordDetail(parsed);
    const raw =
      response.raw && typeof response.raw === "object" && !Array.isArray(response.raw)
        ? (response.raw as {
            id?: string;
            record_id?: string;
            state?: string;
            start_time?: string;
            end_time?: string;
          })
        : undefined;
    const result = asItemResult(
      `Loaded last deploy record detail for orchestration ${response.orchestration_id}`,
      {
        id: raw?.record_id ?? raw?.id,
        projectId: response.project_id,
        orchestrationId: response.orchestration_id,
        recordId: raw?.record_id ?? raw?.id,
        state: raw?.state,
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
