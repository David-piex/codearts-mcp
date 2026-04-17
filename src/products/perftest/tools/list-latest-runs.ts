import { asListResult } from "../../../contracts/tool-result.js";
import { perftestListLatestRunsInput } from "../schemas.js";

export function mapPerfTestLatestRuns(
  items: Array<{
    task_run_info_id?: number;
    related_temp_running_id?: number;
  }>
) {
  return asListResult(
    `${items.length} perftest latest runs found`,
    items.map((item) => ({
      id: String(item.task_run_info_id ?? item.related_temp_running_id ?? 0),
      taskRunInfoId: item.task_run_info_id,
      relatedTempRunningId: item.related_temp_running_id
    }))
  );
}

type PerfTestListLatestRunsClient = {
  getTask: (input: { project_id: string; task_id: number }) => Promise<{
    related_temp_running_data?: Array<{
      task_run_info_id?: number;
      related_temp_running_id?: number;
    }>;
  }>;
};

export function createPerfTestListLatestRunsHandler(client: PerfTestListLatestRunsClient) {
  return async (input: unknown) => {
    const parsed = perftestListLatestRunsInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapPerfTestLatestRuns(response.related_temp_running_data ?? []);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
