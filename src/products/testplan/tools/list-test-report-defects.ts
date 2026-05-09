import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTestReportDefectsInput } from "../schemas.js";

export function mapTestPlanTestReportDefects(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan test report defects found`,
    items.map((item) => ({
      id: String(item.uri ?? item.workitem_id ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      statusName: typeof item.status_name === "string" ? item.status_name : undefined,
      ownerName: typeof item.owner_name === "string" ? item.owner_name : undefined,
      defect: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTestReportDefectsClient = {
  listTestReportDefects: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    page: number;
    page_size: number;
    keyword?: string;
    resolved?: boolean;
    query?: Record<string, string | number | boolean | string[]>;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestReportDefectsHandler(
  client: TestPlanListTestReportDefectsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestReportDefectsInput.parse(input);
    const response = await client.listTestReportDefects(parsed);
    const result = mapTestPlanTestReportDefects(
      response.defects,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "statusName", get: (item) => (item as { statusName?: string }).statusName },
        { label: "ownerName", get: (item) => (item as { ownerName?: string }).ownerName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
