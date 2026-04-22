import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineBindVariableGroupsToPipelineInput } from "../schemas.js";

export function previewBindPipelineVariableGroupsToPipeline(input: {
  project_id: string;
  pipeline_id: string;
  pipeline_group_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: bind ${input.pipeline_group_ids.length} pipeline variable groups to ${input.pipeline_id}`,
    {
      projectId: input.project_id,
      pipelineId: input.pipeline_id,
      pipelineGroupIds: input.pipeline_group_ids,
      executed: !input.dry_run
    }
  );
}

export function mapBoundPipelineVariableGroups(input: {
  project_id: string;
  pipeline_id: string;
  pipeline_group_ids: string[];
  success: boolean;
}) {
  return asItemResult(`Bound pipeline variable groups to ${input.pipeline_id}`, {
    id: input.pipeline_id,
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineGroupIds: input.pipeline_group_ids,
    success: input.success,
    executed: true
  });
}

type PipelineBindVariableGroupsClient = {
  bindVariableGroupsToPipeline: (input: {
    project_id: string;
    pipeline_id: string;
    pipeline_group_ids: string[];
  }) => Promise<{
    pipeline_id: string;
    pipeline_group_ids: string[];
    success: boolean;
  }>;
};

export function createPipelineBindVariableGroupsToPipelineHandler(
  client: PipelineBindVariableGroupsClient
) {
  return async (input: unknown) => {
    const parsed = pipelineBindVariableGroupsToPipelineInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBindPipelineVariableGroupsToPipeline(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.bindVariableGroupsToPipeline(parsed);
    const result = mapBoundPipelineVariableGroups({
      project_id: parsed.project_id,
      pipeline_id: response.pipeline_id,
      pipeline_group_ids: response.pipeline_group_ids,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
