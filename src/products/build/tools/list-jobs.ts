import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { buildListJobsInput } from "../schemas.js";

export function mapBuildJobs(
  items: Array<{
    job_id: string;
    name: string;
    project_id?: string;
    build_project_id?: string;
    is_running?: boolean;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} build jobs found`,
    items.map((item) => ({
      id: item.job_id,
      name: item.name,
      projectId: item.project_id,
      buildProjectId: item.build_project_id,
      isRunning: item.is_running
    })),
    toPageInfo(page, pageSize, total)
  );
}

type BuildListJobsClient = {
  listJobs: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    jobs: Array<{
      job_id: string;
      name: string;
      project_id?: string;
      build_project_id?: string;
      is_running?: boolean;
    }>;
    total?: number;
  }>;
};

export function createBuildListJobsHandler(client: BuildListJobsClient) {
  return async (input: unknown) => {
    const parsed = buildListJobsInput.parse(input);
    const response = await client.listJobs(parsed);
    const result = mapBuildJobs(response.jobs, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
