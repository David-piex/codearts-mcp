import { testPlanSearchApiTestBasicAwInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  searchApiTestBasicAwInfos: (input: {
    project_id: string;
    page: number;
    page_size: number;
    parent_id?: string;
    search_type?: string;
    search_value?: string;
  }) => Promise<{ aws: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanSearchApiTestBasicAwInfosHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanSearchApiTestBasicAwInfosInput.parse(input);
    const response = await client.searchApiTestBasicAwInfos(parsed);
    const result = mapTestPlanRecordList(
      response.aws,
      response.total,
      "API test v4 basic AW search entries",
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
