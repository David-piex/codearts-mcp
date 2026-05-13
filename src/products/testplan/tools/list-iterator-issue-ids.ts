import { testPlanListIteratorIssueIdsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListIteratorIssueIdsClient = {
  listIteratorIssueIds: (input: {
    project_id: string;
    iterator_uri: string;
  }) => Promise<{
    issue_ids: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListIteratorIssueIdsHandler(
  client: TestPlanListIteratorIssueIdsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorIssueIdsInput.parse(input);
    const response = await client.listIteratorIssueIds(parsed);
    const result = mapTestPlanRecordList(
      response.issue_ids,
      response.total,
      "iterator issue ids",
      "issue"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
