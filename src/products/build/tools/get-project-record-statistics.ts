import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetProjectRecordStatisticsInput } from "../schemas.js";

export function mapBuildProjectRecordStatistics(
  projectId: string,
  buildProjectId: string | undefined,
  input: {
    total?: number;
    success?: number;
    failed?: number;
    aborted?: number;
    running?: number;
  }
) {
  return asItemResult(`Loaded build statistics for project ${buildProjectId ?? projectId}`, {
    id: buildProjectId ?? projectId,
    projectId,
    buildProjectId,
    total: input.total,
    success: input.success,
    failed: input.failed,
    aborted: input.aborted,
    running: input.running
  });
}

type BuildGetProjectRecordStatisticsClient = {
  getProjectRecordStatistics: (input: {
    project_id: string;
    build_project_id?: string;
  }) => Promise<{
    total?: number;
    success?: number;
    failed?: number;
    aborted?: number;
    running?: number;
  }>;
};

export function createBuildGetProjectRecordStatisticsHandler(
  client: BuildGetProjectRecordStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = buildGetProjectRecordStatisticsInput.parse(input);
    const response = await client.getProjectRecordStatistics(parsed);
    const result = mapBuildProjectRecordStatistics(
      parsed.project_id,
      parsed.build_project_id,
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
