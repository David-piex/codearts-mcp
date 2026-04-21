import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListEnvironmentsInput } from "../schemas.js";

export function mapDeployEnvironments(
  applicationId: string,
  projectId: string,
  items: Array<{
    environment_id: string;
    name?: string;
    os_type?: string;
    category?: string;
    instance_count?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy environments found`,
    items.map((item) => ({
      id: item.environment_id,
      applicationId,
      projectId,
      name: item.name,
      osType: item.os_type,
      category: item.category,
      instanceCount: item.instance_count
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListEnvironmentsClient = {
  listEnvironments: (input: {
    application_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    environments: Array<{
      environment_id: string;
      name?: string;
      os_type?: string;
      category?: string;
      instance_count?: number;
    }>;
    total?: number;
  }>;
};

export function createDeployListEnvironmentsHandler(client: DeployListEnvironmentsClient) {
  return async (input: unknown) => {
    const parsed = deployListEnvironmentsInput.parse(input);
    const response = await client.listEnvironments(parsed);
    const result = mapDeployEnvironments(
      parsed.application_id,
      parsed.project_id,
      response.environments,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "deploy environments",
          serviceLabel: "Deploy"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
