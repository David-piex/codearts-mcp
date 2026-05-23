import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqFindIterationsInput } from "../schemas.js";

export function mapReqFoundIterations(
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
    undefined,
    { total }
  );
}

type ReqFindIterationsClient = {
  findIterations: (input: { project_id: string; updated_time_interval?: string }) => Promise<{
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

export function createReqFindIterationsHandler(client: ReqFindIterationsClient) {
  return async (input: unknown) => {
    const parsed = reqFindIterationsInput.parse(input);
    const response = await client.findIterations(parsed);
    const result = mapReqFoundIterations(response.iterations, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "updatedTime", get: (item) => (item as { updatedTime?: number }).updatedTime }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
