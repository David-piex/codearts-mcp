import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListPlansInput } from "../schemas.js";

export function mapTestPlans(
  items: Array<{
    plan_id: string;
    name: string;
    owner_name?: string;
    status?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plans found`,
    items.map((item) => ({
      id: item.plan_id,
      name: item.name,
      ownerName: item.owner_name,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListPlansClient = {
  listPlans: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    plans: Array<{
      plan_id: string;
      name: string;
      owner_name?: string;
      status?: string;
    }>;
    total?: number;
  }>;
};

export function createTestPlanListPlansHandler(client: TestPlanListPlansClient) {
  return async (input: unknown) => {
    const parsed = testPlanListPlansInput.parse(input);
    const response = await client.listPlans(parsed);
    const result = mapTestPlans(response.plans, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "ownerName", get: (item) => (item as { ownerName?: string }).ownerName },
        { label: "status", get: (item) => (item as { status?: string }).status }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
