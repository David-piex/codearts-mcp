import { testPlanListTestcaseCommentsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListTestcaseCommentsClient = {
  listTestcaseComments: (input: {
    project_id: string;
    testcase_id: string;
    page: number;
    page_size: number;
    version_uri?: string;
  }) => Promise<{
    comments: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestcaseCommentsHandler(
  client: TestPlanListTestcaseCommentsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestcaseCommentsInput.parse(input);
    const response = await client.listTestcaseComments(parsed);
    const result = mapTestPlanRecordList(
      response.comments,
      response.total,
      "testcase comments",
      "comment",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
