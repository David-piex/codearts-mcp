import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHistoriesInput } from "../schemas.js";

export function mapDeployHistories(
  items: Array<{ id: string; task_id?: string; operator_name?: string; status?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy histories found`,
    items.map((item) => ({
      id: item.id,
      taskId: item.task_id,
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
    const result = mapDeployHistories(response.histories, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
