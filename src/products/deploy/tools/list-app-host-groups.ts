import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListAppHostGroupsInput } from "../schemas.js";

export function mapDeployAppHostGroups(
  applicationId: string,
  projectId: string,
  items: Array<{
    group_id: string;
    name: string;
    project_id?: string;
    os?: string;
    host_count?: number;
    env_count?: number;
    description?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy host groups available to the application`,
    items.map((item) => ({
      id: item.group_id,
      applicationId,
      name: item.name,
      projectId: item.project_id ?? projectId,
      os: item.os,
      hostCount: item.host_count,
      environmentCount: item.env_count,
      description: item.description
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListAppHostGroupsClient = {
  listAppHostGroups: (input: {
    application_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    host_groups: Array<{
      group_id: string;
      name: string;
      project_id?: string;
      os?: string;
      host_count?: number;
      env_count?: number;
      description?: string;
    }>;
    total?: number;
  }>;
};

export function createDeployListAppHostGroupsHandler(client: DeployListAppHostGroupsClient) {
  return async (input: unknown) => {
    const parsed = deployListAppHostGroupsInput.parse(input);
    const response = await client.listAppHostGroups(parsed);
    const result = mapDeployAppHostGroups(
      parsed.application_id,
      parsed.project_id,
      response.host_groups,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
