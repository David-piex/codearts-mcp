import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetExecLogInput } from "../schemas.js";

export function mapPipelineExecLog(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  log?: string;
  has_more?: boolean;
  start_offset?: string;
  end_offset?: string;
}) {
  return asItemResult(`Loaded execution log for pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    log: input.log ?? "",
    hasMore: input.has_more ?? false,
    startOffset: input.start_offset,
    endOffset: input.end_offset
  });
}

type PipelineGetExecLogClient = {
  getExecLog: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
    start_offset?: number;
    end_offset?: number;
    offset?: number;
    limit?: number;
    sort?: "asc" | "desc";
  }) => Promise<{
    log?: string;
    has_more?: boolean;
    start_offset?: string;
    end_offset?: string;
  }>;
};

export function createPipelineGetExecLogHandler(client: PipelineGetExecLogClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetExecLogInput.parse(input);
    const response = await client.getExecLog(parsed);
    const result = mapPipelineExecLog({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      run_id: parsed.run_id,
      job_id: parsed.job_id,
      step_id: parsed.step_id,
      log: response.log,
      has_more: response.has_more,
      start_offset: response.start_offset,
      end_offset: response.end_offset
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
