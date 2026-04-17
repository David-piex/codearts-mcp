import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineRunInput } from "../schemas.js";

export function previewRunPipeline(input: {
  project_id: string;
  pipeline_id: string;
  branch?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: run pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    branch: input.branch,
    executed: !input.dry_run
  });
}

export function mapRunPipelineResult(input: {
  project_id: string;
  pipeline_id: string;
  pipeline_run_id?: string;
  branch?: string;
}) {
  return asItemResult(`Executed pipeline ${input.pipeline_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.pipeline_run_id,
    branch: input.branch,
    executed: true
  });
}

type PipelineRunPipelineClient = {
  runPipeline: (input: {
    project_id: string;
    pipeline_id: string;
    branch?: string;
    description?: string;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
};

export function createPipelineRunPipelineHandler(client: PipelineRunPipelineClient) {
  return async (input: unknown) => {
    const parsed = pipelineRunInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRunPipeline(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.runPipeline(parsed);
    const result = mapRunPipelineResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      pipeline_run_id: response.pipeline_run_id,
      branch: parsed.branch
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
