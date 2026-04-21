import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListTasksInput } from "../schemas.js";

export function mapDeployTasks(
  projectId: string,
  items: Array<{
    task_id: string;
    application_id?: string;
    application_name?: string;
    project_id?: string;
    status?: string;
    deploy_type?: string;
    execution_state?: string;
    can_execute?: boolean;
    can_modify?: boolean;
    can_delete?: boolean;
    can_view?: boolean;
    can_manage?: boolean;
    can_disable?: boolean;
    is_disable?: boolean;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy tasks found`,
    items.map((item) => ({
      id: item.task_id,
      applicationId: item.application_id,
      name: item.application_name,
      projectId: item.project_id ?? projectId,
      status: item.status,
      deployType: item.deploy_type,
      executionState: item.execution_state,
      canExecute: item.can_execute,
      canModify: item.can_modify,
      canDelete: item.can_delete,
      canView: item.can_view,
      canManage: item.can_manage,
      canDisable: item.can_disable,
      disabled: item.is_disable
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListTasksClient = {
  listTasks: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      application_id?: string;
      application_name?: string;
      project_id?: string;
      status?: string;
      deploy_type?: string;
      execution_state?: string;
      can_execute?: boolean;
      can_modify?: boolean;
      can_delete?: boolean;
      can_view?: boolean;
      can_manage?: boolean;
      can_disable?: boolean;
      is_disable?: boolean;
    }>;
    total?: number;
  }>;
};

export function createDeployListTasksHandler(client: DeployListTasksClient) {
  return async (input: unknown) => {
    const parsed = deployListTasksInput.parse(input);
    const response = await client.listTasks(parsed);
    const result = mapDeployTasks(
      parsed.project_id,
      response.tasks,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.keyword,
          projectId: parsed.project_id,
          resourceLabel: "deploy tasks",
          serviceLabel: "Deploy"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
