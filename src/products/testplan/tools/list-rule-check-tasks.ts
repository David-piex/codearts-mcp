import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListRuleCheckTasksInput } from "../schemas.js";

type Client = {
  listRuleCheckTasks: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

function mapRuleCheckTasks(
  tasks: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${tasks.length} TestPlan rule check tasks found`,
    tasks.map((task) => ({
      id: String(task.uri ?? task.id ?? ""),
      name: typeof task.name === "string" ? task.name : undefined,
      status: typeof task.status === "string" ? task.status : undefined,
      creatorName: typeof task.creator_name === "string" ? task.creator_name : undefined,
      task
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function createTestPlanListRuleCheckTasksHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListRuleCheckTasksInput.parse(input);
    const response = await client.listRuleCheckTasks(parsed);
    const result = mapRuleCheckTasks(
      response.tasks,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "creatorName", get: (item) => (item as { creatorName?: string }).creatorName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
