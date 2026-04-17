import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListRunsInput } from "../schemas.js";

export function mapTestPlanRuns(
  items: Array<{ run_id: string; name?: string; status?: string; executor_name?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan runs found`,
    items.map((item) => ({
      id: item.run_id,
      name: item.name,
      status: item.status,
      executorName: item.executor_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListRunsClient = {
  listRuns: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    runs: Array<{ run_id: string; name?: string; status?: string; executor_name?: string }>;
    total?: number;
  }>;
};

export function createTestPlanListRunsHandler(client: TestPlanListRunsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListRunsInput.parse(input);
    const response = await client.listRuns(parsed);
    const result = mapTestPlanRuns(response.runs, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
