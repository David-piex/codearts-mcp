import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListAppsInput } from "../schemas.js";

export function mapDeployApps(
  items: Array<{
    application_id: string;
    name: string;
    project_id?: string;
    deploy_type?: string;
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
      projectId: item.project_id,
      deployType: item.deploy_type,
      taskCount: item.arrange_infos?.length ?? 0,
      taskIds: item.arrange_infos?.map((task) => task.id).filter((id): id is string => Boolean(id)) ?? []
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
      arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
    }>;
    total?: number;
  }>;
};

export function createDeployListAppsHandler(client: DeployListAppsClient) {
  return async (input: unknown) => {
    const parsed = deployListAppsInput.parse(input);
    const response = await client.listApps(parsed);
    const result = mapDeployApps(response.applications, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
