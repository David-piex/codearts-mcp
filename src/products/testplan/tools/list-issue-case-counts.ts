import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListIssueCaseCountsInput } from "../schemas.js";

type Client = {
  listIssueCaseCounts: (input: {
    project_id: string;
    version_uri: string;
    issue_ids: string[];
    service_type?: number;
    service_types?: number[];
    parent_id?: string;
    task_uri?: string;
  }) => Promise<{
    counts: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

function mapIssueCaseCounts(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} TestPlan issue case counts found`,
    items.map((item) => ({
      id: String(item.issue_id ?? item.id ?? ""),
      issueId: typeof item.issue_id === "string" ? item.issue_id : undefined,
      caseCount: typeof item.case_count === "number" ? item.case_count : undefined,
      count: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

export function createTestPlanListIssueCaseCountsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListIssueCaseCountsInput.parse(input);
    const response = await client.listIssueCaseCounts(parsed);
    const result = mapIssueCaseCounts(response.counts, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "issueId", get: (item) => (item as { issueId?: string }).issueId },
        { label: "caseCount", get: (item) => (item as { caseCount?: number }).caseCount }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
