import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTestReportIssuesInput } from "../schemas.js";

export function mapTestPlanTestReportIssues(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan test report issues found`,
    items.map((item) => ({
      id: String(item.uri ?? item.workitem_id ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      sequenceId: typeof item.sequence_id === "string" ? item.sequence_id : undefined,
      completed: typeof item.completed === "boolean" ? item.completed : undefined,
      issue: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTestReportIssuesClient = {
  listTestReportIssues: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    page: number;
    page_size: number;
    keyword?: string;
    completed?: boolean;
    query?: Record<string, string | number | boolean | string[]>;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestReportIssuesHandler(
  client: TestPlanListTestReportIssuesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestReportIssuesInput.parse(input);
    const response = await client.listTestReportIssues(parsed);
    const result = mapTestPlanTestReportIssues(
      response.issues,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "sequenceId", get: (item) => (item as { sequenceId?: string }).sequenceId }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
