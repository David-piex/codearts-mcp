import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTasksInput } from "../schemas.js";

type TestPlanTask = {
  task_id: string;
  name?: string;
  version_uri?: string;
  status_code?: number;
  status_name?: string;
  executor_id?: string;
  executor_name?: string;
};

export function mapTestPlanTasks(
  items: TestPlanTask[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test plan tasks found`,
    items.map((item) => ({
      id: item.task_id,
      taskId: item.task_id,
      name: item.name,
      versionUri: item.version_uri,
      statusCode: item.status_code,
      statusName: item.status_name,
      executorId: item.executor_id,
      executorName: item.executor_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListTasksClient = {
  listTasks: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    keyword?: string;
    status_codes?: number[];
    executor_ids?: string[];
  }) => Promise<{
    tasks: TestPlanTask[];
    total?: number;
  }>;
};

export function createTestPlanListTasksHandler(client: TestPlanListTasksClient) {
  return async (input: unknown) => {
    const parsed = testPlanListTasksInput.parse(input);
    const response = await client.listTasks(parsed);
    const result = mapTestPlanTasks(response.tasks, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "statusName", get: (item) => (item as { statusName?: string }).statusName },
        { label: "executorName", get: (item) => (item as { executorName?: string }).executorName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
