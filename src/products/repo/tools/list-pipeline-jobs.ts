import { asListResult } from "../../../contracts/tool-result.js";
import type { RepoPipelineJob } from "../client.js";
import { repoListPipelineJobsInput } from "../schemas.js";

type RepoListPipelineJobsClient = {
  listPipelineJobs: (input: {
    repository_id: string;
    pipeline_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    jobs: RepoPipelineJob[];
    total?: number;
  }>;
};

export function createRepoListPipelineJobsHandler(client: RepoListPipelineJobsClient) {
  return async (input: unknown) => {
    const parsed = repoListPipelineJobsInput.parse(input);
    const response = await client.listPipelineJobs(parsed);
    const result = asListResult(
      `${response.jobs.length} pipeline jobs found`,
      response.jobs.map((job) => ({
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
        thirdBuildId: job.third_build_id,
        stageId: job.stage_id !== undefined ? String(job.stage_id) : undefined,
        stage: job.stage
      })),
      {
        page: parsed.page,
        pageSize: parsed.page_size,
        total: response.total ?? response.jobs.length
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
