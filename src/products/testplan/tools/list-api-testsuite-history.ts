import { testPlanListApiTestsuiteHistoryInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestsuiteHistory: (input: {
    project_id: string;
    plan_id?: string;
  }) => Promise<{ histories: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestsuiteHistoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestsuiteHistoryInput.parse(input);
    const response = await client.listApiTestsuiteHistory(parsed);
    const result = mapTestPlanRecordList(
      response.histories,
      response.total,
      "API testsuite histories",
      "history"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
