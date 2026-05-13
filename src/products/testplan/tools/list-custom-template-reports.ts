import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListCustomTemplateReportsInput } from "../schemas.js";

export function mapTestPlanCustomTemplateReports(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} custom template reports found`,
    items.map((item) => ({
      id: String(item.uri ?? item.report_uri ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      report: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListCustomTemplateReportsClient = {
  listCustomTemplateReports: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    type?: string;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListCustomTemplateReportsHandler(
  client: TestPlanListCustomTemplateReportsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListCustomTemplateReportsInput.parse(input);
    const response = await client.listCustomTemplateReports(parsed);
    const result = mapTestPlanCustomTemplateReports(
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
