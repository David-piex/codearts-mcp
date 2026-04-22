import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { pipelineMovePipelinesToGroupInput } from "../schemas.js";

export function previewMovePipelinesToGroup(input: {
  project_id: string;
  group_id: string;
  pipelines: Array<{
    pipeline_id: string;
    pipeline_name: string;
  }>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: move ${input.pipelines.length} pipelines to group ${input.group_id}`, {
    projectId: input.project_id,
    groupId: input.group_id,
    pipelineCount: input.pipelines.length,
    executed: !input.dry_run
  });
}

export function mapMovedPipelinesToGroup(
  projectId: string,
  groupId: string,
  results: Array<{
    code?: string;
    pipeline_id?: string;
    pipeline_name?: string;
  }>
) {
  return asListResult(
    `Moved ${results.length} pipelines to group ${groupId}`,
    results.map((item) => ({
      id: item.pipeline_id ?? "",
      projectId,
      groupId,
      code: item.code,
      pipelineId: item.pipeline_id,
      pipelineName: item.pipeline_name
    })),
    {
      page: 1,
      pageSize: results.length,
      total: results.length
    }
  );
}

type PipelineMovePipelinesToGroupClient = {
  movePipelinesToGroup: (input: {
    project_id: string;
    group_id: string;
    pipelines: Array<{
      pipeline_id: string;
      pipeline_name: string;
    }>;
  }) => Promise<{
    results: Array<{
      code?: string;
      pipeline_id?: string;
      pipeline_name?: string;
    }>;
  }>;
};

export function createPipelineMovePipelinesToGroupHandler(
  client: PipelineMovePipelinesToGroupClient
) {
  return async (input: unknown) => {
    const parsed = pipelineMovePipelinesToGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewMovePipelinesToGroup(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.movePipelinesToGroup(parsed);
    const result = mapMovedPipelinesToGroup(
      parsed.project_id,
      parsed.group_id,
      response.results
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
