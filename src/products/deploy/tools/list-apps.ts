import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListAppsInput } from "../schemas.js";

export function mapDeployApps(
  projectId: string,
  items: Array<{
    application_id: string;
    name: string;
    project_id?: string;
    deploy_type?: string;
    description?: string;
    execution_state?: string;
    can_execute?: boolean;
    can_modify?: boolean;
    can_delete?: boolean;
    can_view?: boolean;
    can_manage?: boolean;
    can_create_env?: boolean;
    can_disable?: boolean;
    is_disable?: boolean;
    arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy applications found`,
    items.map((item) => ({
      id: item.application_id,
      name: item.name,
      projectId: item.project_id ?? projectId,
      deployType: item.deploy_type,
      description: item.description,
      executionState: item.execution_state,
      canExecute: item.can_execute,
      canModify: item.can_modify,
      canDelete: item.can_delete,
      canView: item.can_view,
      canManage: item.can_manage,
      canCreateEnv: item.can_create_env,
      canDisable: item.can_disable,
      disabled: item.is_disable,
      taskCount: item.arrange_infos?.length ?? 0,
      taskIds: item.arrange_infos?.map((task) => task.id).filter((id): id is string => Boolean(id)) ?? [],
      tasks:
        item.arrange_infos?.map((task) => ({
          id: task.id,
          applicationId: item.application_id,
          state: task.state,
          deploySystem: task.deploy_system
        })) ?? []
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListAppsClient = {
  listApps: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    applications: Array<{
      application_id: string;
      name: string;
      project_id?: string;
      deploy_type?: string;
      description?: string;
      execution_state?: string;
      can_execute?: boolean;
      can_modify?: boolean;
      can_delete?: boolean;
      can_view?: boolean;
      can_manage?: boolean;
      can_create_env?: boolean;
      can_disable?: boolean;
      is_disable?: boolean;
      arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
    }>;
    total?: number;
  }>;
};

export function createDeployListAppsHandler(client: DeployListAppsClient) {
  return async (input: unknown) => {
    const parsed = deployListAppsInput.parse(input);
    const response = await client.listApps(parsed);
    const result = mapDeployApps(
      parsed.project_id,
      response.applications,
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
          resourceLabel: "deploy applications",
          serviceLabel: "Deploy"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
