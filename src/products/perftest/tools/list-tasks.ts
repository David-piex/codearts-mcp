import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { perftestListTasksInput } from "../schemas.js";

export function mapPerfTestTasks(
  items: Array<{
    id: number;
    name?: string;
    description?: string;
    bench_concurrent?: number;
    operate_mode?: number;
    parallel?: boolean;
    update_time?: string;
    task_run_info?: {
      id?: number;
      run_type?: number;
    };
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} perftest tasks found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      description: item.description,
      benchConcurrent: item.bench_concurrent,
      operateMode: item.operate_mode,
      parallel: item.parallel,
      updatedAt: item.update_time,
      latestRun: item.task_run_info
    })),
    toPageInfo(page, pageSize, total)
  );
}

type PerfTestListTasksClient = {
  listTasks: (input: {
    project_id: string;
    test_suite_id: number;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    tasks: Array<{
      id: number;
      name?: string;
      description?: string;
      bench_concurrent?: number;
      operate_mode?: number;
      parallel?: boolean;
      update_time?: string;
      task_run_info?: {
        id?: number;
        run_type?: number;
      };
    }>;
  }>;
};

export function createPerfTestListTasksHandler(client: PerfTestListTasksClient) {
  return async (input: unknown) => {
    const parsed = perftestListTasksInput.parse(input);
    const response = await client.listTasks(parsed);
    const result = mapPerfTestTasks(response.tasks, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
