import { asListResult } from "../../../contracts/tool-result.js";
import { perftestListOfflineReportsInput } from "../schemas.js";

export function mapPerfTestOfflineReports(
  items: Array<{
    name?: string;
    run_id?: number;
    run_type?: number;
    start_time?: string;
    end_time?: string;
    continue_time?: number;
    temp_names?: Array<{ name?: string }>;
    parallel?: boolean;
  }>
) {
  return asListResult(
    `${items.length} perftest offline reports found`,
    items.map((item) => ({
      id: String(item.run_id ?? 0),
      name: item.name,
      runType: item.run_type,
      startedAt: item.start_time,
      endedAt: item.end_time,
      duration: item.continue_time,
      templates: item.temp_names ?? [],
      parallel: item.parallel
    }))
  );
}

type PerfTestListOfflineReportsClient = {
  listOfflineReports: (input: { project_id: string; task_id: number }) => Promise<{
    log_list: Array<{
      name?: string;
      run_id?: number;
      run_type?: number;
      start_time?: string;
      end_time?: string;
      continue_time?: number;
      temp_names?: Array<{ name?: string }>;
      parallel?: boolean;
    }>;
  }>;
};

export function createPerfTestListOfflineReportsHandler(client: PerfTestListOfflineReportsClient) {
  return async (input: unknown) => {
    const parsed = perftestListOfflineReportsInput.parse(input);
    const response = await client.listOfflineReports(parsed);
    const result = mapPerfTestOfflineReports(response.log_list);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
