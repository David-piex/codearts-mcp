import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineTogglePipelineInput } from "../schemas.js";

export function previewEnablePipeline(input: {
  project_id: string;
  pipeline_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: enable pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    executed: !input.dry_run
  });
}

export function mapEnabledPipeline(input: {
  project_id: string;
  pipeline_id: string;
  success: boolean;
}) {
  return asItemResult(`Enabled pipeline ${input.pipeline_id}`, {
    id: input.pipeline_id,
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    success: input.success,
    executed: true
  });
}

type PipelineEnablePipelineClient = {
  enablePipeline: (input: {
    project_id: string;
    pipeline_id: string;
  }) => Promise<{
    pipeline_id: string;
    success: boolean;
  }>;
};

export function createPipelineEnablePipelineHandler(client: PipelineEnablePipelineClient) {
  return async (input: unknown) => {
    const parsed = pipelineTogglePipelineInput.parse(input);

    if (parsed.dry_run) {
      const result = previewEnablePipeline(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.enablePipeline(parsed);
    const result = mapEnabledPipeline({
      project_id: parsed.project_id,
      pipeline_id: response.pipeline_id,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
