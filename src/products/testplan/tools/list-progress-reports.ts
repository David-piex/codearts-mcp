import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListProgressReportsInput } from "../schemas.js";

export function mapTestPlanProgressReports(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} progress reports found`,
    items.map((item) => ({
      id: String(item.uri ?? item.report_uri ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      report: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListProgressReportsClient = {
  listProgressReports: (input: {
    project_uuid: string;
    version_uri: string;
    type: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProgressReportsHandler(
  client: TestPlanListProgressReportsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListProgressReportsInput.parse(input);
    const response = await client.listProgressReports(parsed);
    const result = mapTestPlanProgressReports(
      response.reports,
      parsed.page,
      parsed.page_size,
      response.total
    );
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
