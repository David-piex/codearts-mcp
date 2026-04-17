import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetManualReviewContextInput } from "../schemas.js";

type RunDetailSubset = {
  stages?: Array<{
    id?: string;
    name?: string;
    jobs?: Array<{
      id?: string;
      job_run_id?: string;
      name?: string;
      steps?: Array<{
        id?: string;
        step_run_id?: string;
        name?: string;
        status?: string;
        task_type?: string;
        type?: string;
      }>;
    }>;
  }>;
};

export function mapPipelineManualReviewContext(runId: string, detail: RunDetailSubset) {
  const reviews = (detail.stages ?? []).flatMap((stage) =>
    (stage.jobs ?? []).flatMap((job) =>
      (job.steps ?? [])
        .filter((step) => (step.task_type ?? step.type) === "manual_review")
        .map((step) => ({
          jobId: job.job_run_id ?? job.id,
          jobName: job.name,
          stepId: step.step_run_id ?? step.id,
          stepName: step.name,
          stageId: stage.id,
          stageName: stage.name,
          status: step.status,
          type: step.task_type ?? step.type
        }))
    )
  );

  return asItemResult(`Loaded manual review context for pipeline run ${runId}`, {
    pipelineRunId: runId,
    pendingReviewCount: reviews.length,
    reviews
  });
}

type PipelineGetManualReviewContextClient = {
  getRunDetail: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<RunDetailSubset & { id: string }>;
};

export function createPipelineGetManualReviewContextHandler(
  client: PipelineGetManualReviewContextClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetManualReviewContextInput.parse(input);
    const response = await client.getRunDetail(parsed);
    const result = mapPipelineManualReviewContext(parsed.run_id, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
