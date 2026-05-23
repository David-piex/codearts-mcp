import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { checkListTasksInput } from "../schemas.js";

export function mapCheckTasks(
  items: Array<{
    task_id: string;
    task_name: string;
    project_name?: string;
    repository_name?: string;
    branch_name?: string;
    language?: string;
    status?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} check tasks found`,
    items.map((item) => ({
      id: item.task_id,
      name: item.task_name,
      projectName: item.project_name,
      repositoryName: item.repository_name,
      branchName: item.branch_name,
      language: item.language,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

type CheckListTasksClient = {
  listTasks: (input: {
    page: number;
    page_size: number;
    project_id: string;
    keyword?: string;
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      task_name: string;
      project_name?: string;
      repository_name?: string;
      branch_name?: string;
      language?: string;
      status?: string;
    }>;
    total?: number;
  }>;
};

export function createCheckListTasksHandler(client: CheckListTasksClient) {
  return async (input: unknown) => {
    const parsed = checkListTasksInput.parse(input);
    const response = await client.listTasks(parsed);
    const result = mapCheckTasks(response.tasks, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      emptyText:
        formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.keyword,
          projectId: parsed.project_id,
          resourceLabel: "check tasks",
          serviceLabel: "Check"
        }),
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        {
          label: "repositoryName",
          get: (item) => (item as { repositoryName?: string }).repositoryName
        },
        { label: "status", get: (item) => (item as { status?: string }).status }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
