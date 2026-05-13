import { testPlanListApiTestcaseExecuteHistoriesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestcaseExecuteHistories: (input: {
    project_id: string;
    testcase_id: string;
    page: number;
    page_size: number;
    plan_id?: string;
  }) => Promise<{ histories: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestcaseExecuteHistoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestcaseExecuteHistoriesInput.parse(input);
    const response = await client.listApiTestcaseExecuteHistories(parsed);
    const result = mapTestPlanRecordList(
      response.histories,
      response.total,
      "API testcase execute histories",
      "history",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
