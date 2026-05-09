import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListCustomReportsInput } from "../schemas.js";

export function mapTestPlanCustomReports(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} custom reports found`,
    items.map((item) => ({
      id: String(item.uri ?? item.report_uri ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      report: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListCustomReportsClient = {
  listCustomReports: (input: {
    project_id: string;
    version_uri: string;
    type: string;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListCustomReportsHandler(
  client: TestPlanListCustomReportsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListCustomReportsInput.parse(input);
    const response = await client.listCustomReports(parsed);
    const result = mapTestPlanCustomReports(response.reports, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
