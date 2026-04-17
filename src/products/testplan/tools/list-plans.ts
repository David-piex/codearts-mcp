import { asListResult } from "../../../contracts/tool-result.js";
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

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
