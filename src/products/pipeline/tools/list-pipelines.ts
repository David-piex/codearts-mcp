import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { pipelineListInput } from "../schemas.js";

export function mapPipelineList(
  items: Array<{
    pipeline_id: string;
    name: string;
    creator_name?: string;
    project_id?: string;
    project_name?: string;
    manifest_version?: string;
    latest_run?: {
      pipeline_run_id?: string;
      status?: string;
      run_number?: number;
      trigger_type?: string;
    };
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} pipelines found`,
    items.map((item) => ({
      id: item.pipeline_id,
      name: item.name,
      creatorName: item.creator_name,
      projectId: item.project_id,
      projectName: item.project_name,
      manifestVersion: item.manifest_version,
      latestRunId: item.latest_run?.pipeline_run_id,
      latestRunStatus: item.latest_run?.status,
      latestRunNumber: item.latest_run?.run_number,
      latestRunTriggerType: item.latest_run?.trigger_type
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
    records: Array<{
      pipeline_id: string;
      name: string;
      creator_name?: string;
      project_id?: string;
      project_name?: string;
      manifest_version?: string;
      latest_run?: {
        pipeline_run_id?: string;
        status?: string;
        run_number?: number;
        trigger_type?: string;
      };
    }>;
    total?: number;
  }>;
};

export function createPipelineListPipelinesHandler(client: PipelineListPipelinesClient) {
  return async (input: unknown) => {
    const parsed = pipelineListInput.parse(input);
    const response = await client.listPipelines(parsed);
    const result = mapPipelineList(response.records, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        {
          label: "projectName",
          get: (item) => (item as { projectName?: string }).projectName
        },
        {
          label: "latestRunStatus",
          get: (item) => (item as { latestRunStatus?: string }).latestRunStatus
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
