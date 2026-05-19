import { testPlanListPlanJournalsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListPlanJournalsClient = {
  listPlanJournals: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    journals: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListPlanJournalsHandler(
  client: TestPlanListPlanJournalsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListPlanJournalsInput.parse(input);
    const response = await client.listPlanJournals(parsed);
    const result = mapTestPlanRecordList(
      response.journals,
      response.total,
      "plan journals",
      "journal",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
