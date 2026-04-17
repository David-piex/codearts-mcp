import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { pipelineListInput } from "../schemas.js";

export function mapPipelineList(
  items: Array<{ pipeline_id: string; name: string; creator_name?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} pipelines found`,
    items.map((item) => ({
      id: item.pipeline_id,
      name: item.name,
      creatorName: item.creator_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type PipelineListPipelinesClient = {
  listPipelines: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    records: Array<{ pipeline_id: string; name: string; creator_name?: string }>;
    total?: number;
  }>;
};

export function createPipelineListPipelinesHandler(client: PipelineListPipelinesClient) {
  return async (input: unknown) => {
    const parsed = pipelineListInput.parse(input);
    const response = await client.listPipelines(parsed);
    const result = mapPipelineList(response.records, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
