import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4DeployRecordsInput } from "../schemas.js";

type DeployListV4DeployRecordsClient = {
  listV4DeployRecords: (input: {
    project_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    total?: number;
    records: Array<{
      id?: string;
      state?: string;
      orchestration_id?: string;
      start_time?: string;
      end_time?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4DeployRecordsHandler(client: DeployListV4DeployRecordsClient) {
  return async (input: unknown) => {
    const parsed = deployListV4DeployRecordsInput.parse(input);
    const response = await client.listV4DeployRecords(parsed);
    const result = asListResult(
      `Loaded ${response.records.length} v4 deploy records`,
      response.records.map((item) => ({
        id: item.id,
        projectId: response.project_id,
        state: item.state,
        orchestrationId: item.orchestration_id,
        startTime: item.start_time,
        endTime: item.end_time
      })),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
        total: response.total
      },
      {
        projectId: response.project_id,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
