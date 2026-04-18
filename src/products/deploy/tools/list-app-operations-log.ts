import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListAppOperationsLogInput } from "../schemas.js";

export function mapDeployAppOperationsLog(
  appId: string,
  items: Array<{
    operator?: string;
    operator_id?: string;
    operation_type?: string;
    data_type?: string;
    operation_time?: string;
  }>,
  pageIndex: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy app operation logs found`,
    items.map((item) => ({
      id: `${item.operator_id ?? ""}:${item.operation_time ?? ""}:${item.operation_type ?? ""}`,
      appId,
      operator: item.operator,
      operatorId: item.operator_id,
      operationType: item.operation_type,
      dataType: item.data_type,
      operationTime: item.operation_time
    })),
    toPageInfo(pageIndex, pageSize, total)
  );
}

type DeployListAppOperationsLogClient = {
  listAppOperationsLog: (input: {
    app_id: string;
    page_size: number;
    page_index: number;
    start_date?: string;
    end_date?: string;
  }) => Promise<{
    logs: Array<{
      operator?: string;
      operator_id?: string;
      operation_type?: string;
      data_type?: string;
      operation_time?: string;
    }>;
    total?: number;
  }>;
};

export function createDeployListAppOperationsLogHandler(client: DeployListAppOperationsLogClient) {
  return async (input: unknown) => {
    const parsed = deployListAppOperationsLogInput.parse(input);
    const response = await client.listAppOperationsLog(parsed);
    const result = mapDeployAppOperationsLog(
      parsed.app_id,
      response.logs,
      parsed.page_index,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
