import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { inspectorListBusinessRisksInput } from "../schemas.js";

export function mapInspectorBusinessRisks(
  items: Array<{
    risk_id: string;
    risk_url?: string;
    risk_type?: string;
    risk_content?: string;
    risk_status?: string;
    find_time?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} inspector business risks found`,
    items.map((item) => ({
      id: item.risk_id,
      url: item.risk_url,
      type: item.risk_type,
      content: item.risk_content,
      status: item.risk_status,
      foundAt: item.find_time
    })),
    toPageInfo(page, pageSize, total)
  );
}

type InspectorListBusinessRisksClient = {
  listBusinessRisks: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    data: Array<{
      risk_id: string;
      risk_url?: string;
      risk_type?: string;
      risk_content?: string;
      risk_status?: string;
      find_time?: string;
    }>;
  }>;
};

export function createInspectorListBusinessRisksHandler(client: InspectorListBusinessRisksClient) {
  return async (input: unknown) => {
    const parsed = inspectorListBusinessRisksInput.parse(input);
    const response = await client.listBusinessRisks(parsed);
    const result = mapInspectorBusinessRisks(
      response.data,
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
