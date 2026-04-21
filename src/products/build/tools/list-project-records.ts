import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { buildListProjectRecordsInput } from "../schemas.js";

export function mapBuildProjectRecords(
  items: Array<{
    record_id: string;
    job_id?: string;
    job_name?: string;
    status?: string;
    trigger_type?: string;
    branch?: string;
    commit_id?: string;
    executor?: string;
    start_time?: number;
  }>,
  page = 1,
  pageSize = items.length || 1,
  total?: number
) {
  return asListResult(
    `${items.length} project build records found`,
    items.map((item) => ({
      id: item.record_id,
      recordId: item.record_id,
      jobId: item.job_id,
      jobName: item.job_name,
      status: item.status,
      triggerType: item.trigger_type,
      branch: item.branch,
      commitId: item.commit_id,
      executor: item.executor,
      startTime: item.start_time
    })),
    toPageInfo(page, pageSize, total)
  );
}

type BuildListProjectRecordsClient = {
  listProjectRecords: (input: {
    project_id: string;
    build_project_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{
      record_id: string;
      job_id?: string;
      job_name?: string;
      status?: string;
      trigger_type?: string;
      branch?: string;
      commit_id?: string;
      executor?: string;
      start_time?: number;
    }>;
    total?: number;
  }>;
};

export function createBuildListProjectRecordsHandler(client: BuildListProjectRecordsClient) {
  return async (input: unknown) => {
    const parsed = buildListProjectRecordsInput.parse(input);
    const response = await client.listProjectRecords(parsed);
    const result = mapBuildProjectRecords(
      response.records,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.keyword,
          projectId: parsed.project_id,
          resourceLabel: "project build records",
          serviceLabel: "Build"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
