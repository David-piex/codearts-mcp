import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTestReportQualityAttributesInput } from "../schemas.js";

export function mapTestPlanTestReportQualityAttributes(
  items: Array<Record<string, unknown>>,
  total?: number
) {
  return asListResult(
    `${items.length} test plan test report quality attributes found`,
    items.map((item) => ({
      id: String(item.uri ?? item.id ?? ""),
      testReportUri:
        typeof item.test_report_uri === "string" ? item.test_report_uri : undefined,
      testType: typeof item.test_type === "number" ? item.test_type : undefined,
      attribute: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListTestReportQualityAttributesClient = {
  listTestReportQualityAttributes: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    attributes: Array<Record<string, unknown>>;
    total?: number;
    has_more?: boolean;
  }>;
};

export function createTestPlanListTestReportQualityAttributesHandler(
  client: TestPlanListTestReportQualityAttributesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestReportQualityAttributesInput.parse(input);
    const response = await client.listTestReportQualityAttributes(parsed);
    const result = mapTestPlanTestReportQualityAttributes(
      response.attributes,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        {
          label: "testReportUri",
          get: (item) => (item as { testReportUri?: string }).testReportUri
        },
        { label: "testType", get: (item) => (item as { testType?: number }).testType }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
