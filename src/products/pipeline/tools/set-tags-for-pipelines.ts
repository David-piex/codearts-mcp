import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineSetTagsForPipelinesInput } from "../schemas.js";

export function previewSetPipelineTagsForPipelines(input: {
  project_id: string;
  pipeline_ids: string[];
  tag_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult("Dry run: set pipeline tags for pipelines", {
    projectId: input.project_id,
    pipelineIds: input.pipeline_ids,
    tagIds: input.tag_ids,
    executed: !input.dry_run
  });
}

export function mapSetPipelineTagsForPipelines(input: {
  project_id: string;
  pipeline_ids: string[];
  tag_ids: string[];
  success?: boolean;
}) {
  return asItemResult("Updated pipeline tags for pipelines", {
    projectId: input.project_id,
    pipelineIds: input.pipeline_ids,
    tagIds: input.tag_ids,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineSetTagsForPipelinesClient = {
  setTagsForPipelines: (input: {
    project_id: string;
    pipeline_ids: string[];
    tag_ids: string[];
  }) => Promise<{
    success: boolean;
    project_id: string;
    pipeline_ids: string[];
    tag_ids: string[];
  }>;
};

export function createPipelineSetTagsForPipelinesHandler(
  client: PipelineSetTagsForPipelinesClient
) {
  return async (input: unknown) => {
    const parsed = pipelineSetTagsForPipelinesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewSetPipelineTagsForPipelines(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.setTagsForPipelines(parsed);
    const result = mapSetPipelineTagsForPipelines(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
