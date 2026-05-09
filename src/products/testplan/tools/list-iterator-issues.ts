import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListIteratorIssuesInput } from "../schemas.js";

export function mapTestPlanIteratorIssues(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan iterator issues found`,
    items.map((item) => ({
      id: String(item.uri ?? item.issue_id ?? item.workitem_id ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      subject: typeof item.subject === "string" ? item.subject : undefined,
      issue: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListIteratorIssuesClient = {
  listIteratorIssues: (input: {
    project_id: string;
    iterator_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListIteratorIssuesHandler(
  client: TestPlanListIteratorIssuesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorIssuesInput.parse(input);
    const response = await client.listIteratorIssues(parsed);
    const result = mapTestPlanIteratorIssues(
      response.issues,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "subject", get: (item) => (item as { subject?: string }).subject }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
