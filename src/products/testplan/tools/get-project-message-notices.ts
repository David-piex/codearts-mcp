import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanGetProjectMessageNoticesInput } from "../schemas.js";

export function mapTestPlanProjectMessageNotices(
  items: Array<Record<string, unknown>>,
  total?: number
) {
  return asListResult(
    `${items.length} project message notices found`,
    items.map((item) => ({
      id: String(item.id ?? item.uri ?? item.notice_id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      notice: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanGetProjectMessageNoticesClient = {
  getProjectMessageNotices: (input: {
    project_id: string;
  }) => Promise<{
    notices: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanGetProjectMessageNoticesHandler(
  client: TestPlanGetProjectMessageNoticesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectMessageNoticesInput.parse(input);
    const response = await client.getProjectMessageNotices(parsed);
    const result = mapTestPlanProjectMessageNotices(response.notices, response.total);
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
