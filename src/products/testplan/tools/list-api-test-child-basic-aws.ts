import { testPlanListApiTestChildBasicAwsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestChildBasicAws: (input: {
    project_id: string;
    parent_id: string;
    aw_name?: string;
    source_type?: string | number;
  }) => Promise<{ aws: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestChildBasicAwsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestChildBasicAwsInput.parse(input);
    const response = await client.listApiTestChildBasicAws(parsed);
    const result = mapTestPlanRecordList(
      response.aws,
      response.total,
      "API test child basic AW entries",
      "aw"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
