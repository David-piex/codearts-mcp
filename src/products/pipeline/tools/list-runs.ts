import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { pipelineListRunsInput } from "../schemas.js";

export function mapPipelineRuns(
  items: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} runs found`,
    items.map((item) => ({
      id: item.pipeline_run_id,
      status: item.status,
      executorName: item.executor_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type PipelineListRunsClient = {
  listRuns: (input: {
    project_id: string;
    pipeline_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
    total?: number;
  }>;
};

export function createPipelineListRunsHandler(client: PipelineListRunsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListRunsInput.parse(input);
    const response = await client.listRuns(parsed);
    const result = mapPipelineRuns(response.records, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "status", get: (item) => (item as { status?: string }).status },
        {
          label: "executorName",
          get: (item) => (item as { executorName?: string }).executorName
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
