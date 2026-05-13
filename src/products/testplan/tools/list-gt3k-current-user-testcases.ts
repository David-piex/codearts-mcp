import { testPlanListGt3kCurrentUserTestcasesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kCurrentUserTestcasesClient = {
  listGt3kCurrentUserTestcases: (input: {
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
    keyword?: string;
  }) => Promise<{
    testcases: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kCurrentUserTestcasesHandler(
  client: TestPlanListGt3kCurrentUserTestcasesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kCurrentUserTestcasesInput.parse(input);
    const response = await client.listGt3kCurrentUserTestcases(parsed);
    const result = mapTestPlanRecordList(
      response.testcases,
      response.total,
      "GT3K current-user testcases",
      "testcase",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
