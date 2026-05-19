import { testPlanListApiTestBasicAwInfosV2Input } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestBasicAwInfosV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    aw_name?: string;
    parent_id?: string;
  }) => Promise<{ aws: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestBasicAwInfosV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestBasicAwInfosV2Input.parse(input);
    const response = await client.listApiTestBasicAwInfosV2(parsed);
    const result = mapTestPlanRecordList(
      response.aws,
      response.total,
      "API test v2 basic AW info entries",
      "aw",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
