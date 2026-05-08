import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTaskResultsInput } from "../schemas.js";

type TestPlanTaskResult = {
  result_id: string;
  name?: string;
  task_uri?: string;
  version_uri?: string;
  executor_id?: string;
  executor_name?: string;
  status?: string;
};

export function mapTestPlanTaskResults(
  items: TestPlanTaskResult[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan task results found`,
    items.map((item) => ({
      id: item.result_id,
      resultId: item.result_id,
      name: item.name,
      taskUri: item.task_uri,
      versionUri: item.version_uri,
      executorId: item.executor_id,
      executorName: item.executor_name,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTaskResultsClient = {
  listTaskResults: (input: {
    project_id: string;
    task_uri: string;
    page: number;
    page_size: number;
    iterator_uri?: string;
  }) => Promise<{
    results: TestPlanTaskResult[];
    total?: number;
  }>;
};

export function createTestPlanListTaskResultsHandler(client: TestPlanListTaskResultsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListTaskResultsInput.parse(input);
    const response = await client.listTaskResults(parsed);
    const result = mapTestPlanTaskResults(
      response.results,
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
