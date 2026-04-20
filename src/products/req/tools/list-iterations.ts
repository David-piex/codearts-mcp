import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListIterationsInput } from "../schemas.js";

export function mapReqIterations(
  items: Array<{
    id: number | string;
    name: string;
    status?: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    updated_time?: number;
    deleted?: boolean;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} iterations found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      status: item.status,
      beginTime: item.begin_time,
      endTime: item.end_time,
      description: item.description,
      updatedTime: item.updated_time,
      deleted: item.deleted
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListIterationsClient = {
  listIterations: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    iterations: Array<{
      id: number | string;
      name: string;
      status?: string;
      begin_time?: string;
      end_time?: string;
      description?: string;
      updated_time?: number;
      deleted?: boolean;
    }>;
    total?: number;
  }>;
};

export function createReqListIterationsHandler(client: ReqListIterationsClient) {
  return async (input: unknown) => {
    const parsed = reqListIterationsInput.parse(input);
    const response = await client.listIterations(parsed);
    const result = mapReqIterations(response.iterations, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "beginTime", get: (item) => (item as { beginTime?: string }).beginTime }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
