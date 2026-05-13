import { testPlanListTestcaseReviewsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListTestcaseReviewsClient = {
  listTestcaseReviews: (input: {
    testcase_uri: string;
    project_uuid: string;
    version_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reviews: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestcaseReviewsHandler(
  client: TestPlanListTestcaseReviewsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestcaseReviewsInput.parse(input);
    const response = await client.listTestcaseReviews(parsed);
    const result = mapTestPlanRecordList(
      response.reviews,
      response.total,
      "testcase reviews",
      "review",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
