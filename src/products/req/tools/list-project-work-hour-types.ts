import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProjectWorkHourTypesInput } from "../schemas.js";

export function mapReqProjectWorkHourTypes(
  items: Array<{
    id?: number;
    name?: string;
    status?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project work hour types found`,
    items.map((item) => ({
      id: item.id,
      name: item.name,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListProjectWorkHourTypesClient = {
  listProjectWorkHourTypes: (input: {
    project_id: string;
    page: number;
    page_size: number;
    status?: number;
  }) => Promise<{
    total?: number;
    work_hours_types: Array<{
      id?: number;
      name?: string;
      status?: number;
    }>;
  }>;
};

export function createReqListProjectWorkHourTypesHandler(
  client: ReqListProjectWorkHourTypesClient
) {
  return async (input: unknown) => {
    const parsed = reqListProjectWorkHourTypesInput.parse(input);
    const response = await client.listProjectWorkHourTypes(parsed);
    const result = mapReqProjectWorkHourTypes(
      response.work_hours_types,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: number }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "status", get: (item) => (item as { status?: number }).status }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
