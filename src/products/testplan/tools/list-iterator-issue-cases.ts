import { testPlanListIteratorIssueCasesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listIteratorIssueCases: (input: {
    project_id: string;
    iterator_uri: string;
    workitem_list: Array<Record<string, unknown>>;
  }) => Promise<{
    case_ids: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListIteratorIssueCasesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorIssueCasesInput.parse(input);
    const response = await client.listIteratorIssueCases(parsed);
    const result = mapTestPlanRecordList(
      response.case_ids,
      response.total,
      "TestPlan iterator issue testcase references",
      "caseReference"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
