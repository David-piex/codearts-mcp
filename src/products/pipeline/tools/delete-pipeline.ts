import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeletePipelineInput } from "../schemas.js";

export function previewDeletePipeline(input: {
  project_id: string;
  pipeline_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipeline(input: {
  project_id: string;
  pipeline_id: string;
}) {
  return asItemResult(`Deleted pipeline ${input.pipeline_id}`, {
    id: input.pipeline_id,
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    deleted: true,
    executed: true
  });
}

type PipelineDeletePipelineClient = {
  deletePipeline: (input: {
    project_id: string;
    pipeline_id: string;
  }) => Promise<{
    pipeline_id: string;
    deleted: boolean;
  }>;
};

export function createPipelineDeletePipelineHandler(client: PipelineDeletePipelineClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeletePipelineInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipeline(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deletePipeline(parsed);
    const result = mapDeletedPipeline({
      project_id: parsed.project_id,
      pipeline_id: response.pipeline_id
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
