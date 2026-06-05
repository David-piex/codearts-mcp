import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoActualHeadPipeline } from "../client.js";
import { repoListLatestPipelineJobsInput } from "../schemas.js";

type RepoListLatestPipelineJobsClient = {
  listLatestPipelineJobs: (input: {
    repository_id: string;
    pipeline_id: string;
  }) => Promise<RepoActualHeadPipeline["data"]>;
};

export function createRepoListLatestPipelineJobsHandler(client: RepoListLatestPipelineJobsClient) {
  return async (input: unknown) => {
    const parsed = repoListLatestPipelineJobsInput.parse(input);
    const pipeline = await client.listLatestPipelineJobs(parsed);

    const result = asItemResult(
      pipeline?.id !== undefined ? `Fetched latest pipeline jobs for pipeline ${pipeline.id}` : "Fetched latest pipeline jobs",
      {
        pipeline: pipeline
          ? {
              id: pipeline.id !== undefined ? String(pipeline.id) : undefined,
              webUrl: pipeline.web_url,
              sha: pipeline.sha,
              ref: pipeline.ref,
              status: pipeline.status,
              createdAt: pipeline.created_at,
              updatedAt: pipeline.updated_at,
              startedAt: pipeline.started_at,
              finishedAt: pipeline.finished_at,
              repositoryId: pipeline.repository_id !== undefined ? String(pipeline.repository_id) : undefined,
              isInvalid: pipeline.is_invalid,
              type: pipeline.type,
              isLatest: pipeline.is_latest,
              triggerUser: pipeline.trigger_user,
              allJobFinished: pipeline.all_job_finished,
              stages: (pipeline.stages ?? []).map((stage) => ({
                id: stage.id !== undefined ? String(stage.id) : undefined,
                repositoryId: stage.repository_id !== undefined ? String(stage.repository_id) : undefined,
                pipelineId: stage.pipeline_id !== undefined ? String(stage.pipeline_id) : undefined,
                name: stage.name,
                sortId: stage.sort_id !== undefined && stage.sort_id !== null ? String(stage.sort_id) : undefined,
                status: stage.status,
                jobs: (stage.jobs ?? []).map((job) => ({
                  id: job.id !== undefined ? String(job.id) : undefined,
                  sha: job.sha,
                  ref: job.ref,
                  status: job.status,
                  name: job.name,
                  targetUrl: job.target_url,
                  createdAt: job.created_at,
                  updatedAt: job.updated_at,
                  startedAt: job.started_at,
                  finishedAt: job.finished_at,
                  thirdBuildId: job.third_build_id
                }))
              }))
            }
          : undefined
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
