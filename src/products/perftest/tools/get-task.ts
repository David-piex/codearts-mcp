import { asItemResult } from "../../../contracts/tool-result.js";
import { perftestGetTaskInput } from "../schemas.js";

export function mapPerfTestTask(input: {
  id: number;
  name?: string;
  description?: string;
  project_id?: number;
  create_time?: string;
  update_time?: string;
  operate_mode?: number;
  parallel?: boolean;
  run_status?: number;
  bench_concurrent?: number;
  related_temp_running_data?: Array<{
    task_run_info_id?: number;
    related_temp_running_id?: number;
  }>;
}) {
  return asItemResult(`Loaded perftest task ${input.id}`, {
    id: String(input.id),
    name: input.name,
    description: input.description,
    projectId: input.project_id,
    createdAt: input.create_time,
    updatedAt: input.update_time,
    operateMode: input.operate_mode,
    parallel: input.parallel,
    runStatus: input.run_status,
    benchConcurrent: input.bench_concurrent,
    relatedRuns: input.related_temp_running_data ?? []
  });
}

type PerfTestGetTaskClient = {
  getTask: (input: { project_id: string; task_id: number }) => Promise<{
    id: number;
    name?: string;
    description?: string;
    project_id?: number;
    create_time?: string;
    update_time?: string;
    operate_mode?: number;
    parallel?: boolean;
    run_status?: number;
    bench_concurrent?: number;
    related_temp_running_data?: Array<{
      task_run_info_id?: number;
      related_temp_running_id?: number;
    }>;
  }>;
};

export function createPerfTestGetTaskHandler(client: PerfTestGetTaskClient) {
  return async (input: unknown) => {
    const parsed = perftestGetTaskInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapPerfTestTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
