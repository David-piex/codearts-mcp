import { testPlanListApiTestcaseHistoryInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestcaseHistory: (input: {
    project_id: string;
    plan_id?: string;
  }) => Promise<{ histories: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestcaseHistoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestcaseHistoryInput.parse(input);
    const response = await client.listApiTestcaseHistory(parsed);
    const result = mapTestPlanRecordList(
      response.histories,
      response.total,
      "API testcase histories",
      "history"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
