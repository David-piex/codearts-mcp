import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { inspectorListTaskHistoriesInput } from "../schemas.js";

export function mapInspectorTaskHistories(
  items: Array<{
    task_id: string;
    task_name?: string;
    url?: string;
    task_type?: string;
    domain_name?: string;
    create_time?: string;
    start_time?: string;
    end_time?: string;
    task_status?: string;
    progress?: number;
    score?: number;
    safe_level?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} inspector task histories found`,
    items.map((item) => ({
      id: item.task_id,
      name: item.task_name,
      url: item.url,
      taskType: item.task_type,
      domainName: item.domain_name,
      createdAt: item.create_time,
      startedAt: item.start_time,
      endedAt: item.end_time,
      status: item.task_status,
      progress: item.progress,
      score: item.score,
      safeLevel: item.safe_level
    })),
    toPageInfo(page, pageSize, total)
  );
}

type InspectorListTaskHistoriesClient = {
  listTaskHistories: (input: {
    project_id: string;
    domain_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    data: Array<{
      task_id: string;
      task_name?: string;
      url?: string;
      task_type?: string;
      domain_name?: string;
      create_time?: string;
      start_time?: string;
      end_time?: string;
      task_status?: string;
      progress?: number;
      score?: number;
      safe_level?: string;
    }>;
  }>;
};

export function createInspectorListTaskHistoriesHandler(client: InspectorListTaskHistoriesClient) {
  return async (input: unknown) => {
    const parsed = inspectorListTaskHistoriesInput.parse(input);
    const response = await client.listTaskHistories(parsed);
    const result = mapInspectorTaskHistories(response.data, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
