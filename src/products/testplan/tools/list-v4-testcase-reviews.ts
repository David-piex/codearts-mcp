import { testPlanListV4TestcaseReviewsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListV4TestcaseReviewsClient = {
  listV4TestcaseReviews: (input: {
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

export function createTestPlanListV4TestcaseReviewsHandler(
  client: TestPlanListV4TestcaseReviewsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListV4TestcaseReviewsInput.parse(input);
    const response = await client.listV4TestcaseReviews(parsed);
    const result = mapTestPlanRecordList(
      response.reviews,
      response.total,
      "v4 testcase reviews",
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
