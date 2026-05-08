import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTaskCasesInput } from "../schemas.js";

type TestPlanTaskCase = {
  case_id: string;
  name?: string;
  status?: string;
  result?: string;
  executor_id?: string;
  executor_name?: string;
};

export function mapTestPlanTaskCases(
  items: TestPlanTaskCase[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan task cases found`,
    items.map((item) => ({
      id: item.case_id,
      caseId: item.case_id,
      name: item.name,
      status: item.status,
      result: item.result,
      executorId: item.executor_id,
      executorName: item.executor_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTaskCasesClient = {
  listTaskCases: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
    status?: string[];
    version_uri?: string;
  }) => Promise<{
    cases: TestPlanTaskCase[];
    total?: number;
  }>;
};

export function createTestPlanListTaskCasesHandler(client: TestPlanListTaskCasesClient) {
  return async (input: unknown) => {
    const parsed = testPlanListTaskCasesInput.parse(input);
    const response = await client.listTaskCases(parsed);
    const result = mapTestPlanTaskCases(response.cases, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "executorName", get: (item) => (item as { executorName?: string }).executorName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
