import { testPlanListAuthorizedTasksInput } from "../schemas.js";
import { mapTestPlanTasks } from "./list-tasks.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";

type TestPlanAuthorizedTasksClient = {
  listAuthorizedTasks: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    service_type?: number;
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      name?: string;
      version_uri?: string;
      status_code?: number;
      status_name?: string;
      executor_id?: string;
      executor_name?: string;
    }>;
    total?: number;
  }>;
};

export function createTestPlanListAuthorizedTasksHandler(client: TestPlanAuthorizedTasksClient) {
  return async (input: unknown) => {
    const parsed = testPlanListAuthorizedTasksInput.parse(input);
    const response = await client.listAuthorizedTasks(parsed);
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
