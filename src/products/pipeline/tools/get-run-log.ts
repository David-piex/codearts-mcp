import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetRunLogInput } from "../schemas.js";

export function mapPipelineRunLog(runId: string, log: string, truncated = false, status?: string) {
  return asItemResult(`Loaded log for pipeline run ${runId}`, {
    pipelineRunId: runId,
    log,
    size: log.length,
    truncated,
    status
  });
}

type PipelineGetRunLogClient = {
  getRunLog: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    log: string;
    status?: string;
    truncated?: boolean;
  }>;
};

export function createPipelineGetRunLogHandler(client: PipelineGetRunLogClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetRunLogInput.parse(input);
    const response = await client.getRunLog(parsed);
    const result = mapPipelineRunLog(
      parsed.run_id,
      response.log,
      response.truncated ?? false,
      response.status
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
