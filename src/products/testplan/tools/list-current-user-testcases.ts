import { testPlanListCurrentUserTestcasesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListCurrentUserTestcasesClient = {
  listCurrentUserTestcases: (input: {
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

export function createTestPlanListCurrentUserTestcasesHandler(
  client: TestPlanListCurrentUserTestcasesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListCurrentUserTestcasesInput.parse(input);
    const response = await client.listCurrentUserTestcases(parsed);
    const result = mapTestPlanRecordList(
      response.testcases,
      response.total,
      "current-user testcases",
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
