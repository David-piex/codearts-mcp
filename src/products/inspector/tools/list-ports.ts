import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { inspectorListPortsInput } from "../schemas.js";

export function mapInspectorPorts(
  items: Array<{
    port?: number;
    service?: string;
    protocol?: string;
    status?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} inspector ports found`,
    items.map((item) => ({
      id: String(item.port ?? ""),
      port: item.port,
      service: item.service,
      protocol: item.protocol,
      status: item.status
    })),
    toPageInfo(page, pageSize, total)
  );
}

type InspectorListPortsClient = {
  listPorts: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    data: Array<{
      port?: number;
      service?: string;
      protocol?: string;
      status?: string;
    }>;
  }>;
};

export function createInspectorListPortsHandler(client: InspectorListPortsClient) {
  return async (input: unknown) => {
    const parsed = inspectorListPortsInput.parse(input);
    const response = await client.listPorts(parsed);
    const result = mapInspectorPorts(response.data, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
