import { testPlanListApiTestBasicAwInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestBasicAwInfos: (input: {
    project_id: string;
    page: number;
    page_size: number;
    aw_name?: string;
    parent_id?: string;
  }) => Promise<{ aws: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestBasicAwInfosHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestBasicAwInfosInput.parse(input);
    const response = await client.listApiTestBasicAwInfos(parsed);
    const result = mapTestPlanRecordList(
      response.aws,
      response.total,
      "API test basic AW info entries",
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
