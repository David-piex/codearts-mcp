import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHistoriesInput } from "../schemas.js";

export function mapDeployHistories(
  projectId: string,
  taskId: string,
  items: Array<{ id: string; task_id?: string; operator_name?: string; status?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy histories found`,
    items.map((item) => ({
      id: item.id,
      projectId,
      taskId: item.task_id ?? taskId,
      operatorName: item.operator_name,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListHistoriesClient = {
  listHistories: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    histories: Array<{ id: string; task_id?: string; operator_name?: string; status?: string }>;
    total?: number;
  }>;
};

export function createDeployListHistoriesHandler(client: DeployListHistoriesClient) {
  return async (input: unknown) => {
    const parsed = deployListHistoriesInput.parse(input);
    const response = await client.listHistories(parsed);
    const result = mapDeployHistories(
      parsed.project_id,
      parsed.task_id,
      response.histories,
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
          resourceLabel: "deploy histories",
          serviceLabel: "Deploy"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
