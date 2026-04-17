import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListTasksInput } from "../schemas.js";

export function mapDeployTasks(
  items: Array<{
    task_id: string;
    application_id?: string;
    application_name?: string;
    project_id?: string;
    status?: string;
    deploy_type?: string;
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
      projectId: item.project_id,
      status: item.status,
      deployType: item.deploy_type
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
    }>;
    total?: number;
  }>;
};

export function createDeployListTasksHandler(client: DeployListTasksClient) {
  return async (input: unknown) => {
    const parsed = deployListTasksInput.parse(input);
    const response = await client.listTasks(parsed);
    const result = mapDeployTasks(response.tasks, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
