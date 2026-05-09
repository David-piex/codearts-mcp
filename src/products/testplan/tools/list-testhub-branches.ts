import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTesthubBranchesInput } from "../schemas.js";

export function mapTestPlanTesthubBranches(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} testhub branches found`,
    items.map((item) => ({
      id: String(item.uri ?? item.branch_uri ?? item.id ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      branch: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTesthubBranchesClient = {
  listTesthubBranches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTesthubBranchesHandler(
  client: TestPlanListTesthubBranchesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTesthubBranchesInput.parse(input);
    const response = await client.listTesthubBranches(parsed);
    const result = mapTestPlanTesthubBranches(
      response.branches,
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
