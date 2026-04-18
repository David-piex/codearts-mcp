import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHostGroupEnvironmentsInput } from "../schemas.js";

export function mapDeployHostGroupEnvironments(
  groupId: string,
  items: Array<{
    environment_id: string;
    application_id?: string;
    application_name?: string;
    name?: string;
    os?: string;
    host_count?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy environments linked to host group`,
    items.map((item) => ({
      id: item.environment_id,
      groupId,
      name: item.name,
      applicationId: item.application_id,
      applicationName: item.application_name,
      os: item.os,
      hostCount: item.host_count
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListHostGroupEnvironmentsClient = {
  listHostGroupEnvironments: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    environments: Array<{
      environment_id: string;
      application_id?: string;
      application_name?: string;
      name?: string;
      os?: string;
      host_count?: number;
    }>;
    total?: number;
  }>;
};

export function createDeployListHostGroupEnvironmentsHandler(
  client: DeployListHostGroupEnvironmentsClient
) {
  return async (input: unknown) => {
    const parsed = deployListHostGroupEnvironmentsInput.parse(input);
    const response = await client.listHostGroupEnvironments(parsed);
    const result = mapDeployHostGroupEnvironments(
      parsed.group_id,
      response.environments,
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
