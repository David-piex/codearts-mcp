import { testPlanListApiTestBasicAwsBatchInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestBasicAwsBatch: (input: {
    project_id: string;
    aw_ids: string[];
  }) => Promise<{ aws: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestBasicAwsBatchHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestBasicAwsBatchInput.parse(input);
    const response = await client.listApiTestBasicAwsBatch(parsed);
    const result = mapTestPlanRecordList(
      response.aws,
      response.total,
      "API test basic AW batch entries",
      "aw"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
