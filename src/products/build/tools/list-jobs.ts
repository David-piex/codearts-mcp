import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
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
    const text = formatListToolText(result, {
      emptyText: formatProjectScopedEmptyText({
        summary: result.summary,
        page: parsed.page,
        keyword: parsed.keyword,
        projectId: parsed.project_id,
        resourceLabel: "build jobs",
        serviceLabel: "Build"
      }),
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        {
          label: "buildProjectId",
          get: (item) => (item as { buildProjectId?: string }).buildProjectId
        },
        {
          label: "isRunning",
          get: (item) => (item as { isRunning?: boolean }).isRunning
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
