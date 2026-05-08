import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTaskCasesV4Input } from "../schemas.js";

type TestPlanTaskCaseV4 = {
  case_id: string;
  name?: string;
  status?: string;
  result?: string;
  executor_id?: string;
  executor_name?: string;
};

export function mapTestPlanTaskCasesV4(
  items: TestPlanTaskCaseV4[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan v4 task cases found`,
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

type TestPlanListTaskCasesV4Client = {
  listTaskCasesV4: (input: {
    project_id: string;
    task_uri: string;
    page: number;
    page_size: number;
    results?: string[];
    status?: string[];
    version_uri?: string;
    owners?: string[];
    rank_ids?: string[];
  }) => Promise<{
    cases: TestPlanTaskCaseV4[];
    total?: number;
  }>;
};

export function createTestPlanListTaskCasesV4Handler(
  client: TestPlanListTaskCasesV4Client
) {
  return async (input: unknown) => {
    const parsed = testPlanListTaskCasesV4Input.parse(input);
    const response = await client.listTaskCasesV4(parsed);
    const result = mapTestPlanTaskCasesV4(
      response.cases,
      parsed.page,
      parsed.page_size,
      response.total
    );
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
