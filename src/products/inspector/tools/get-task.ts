import { asItemResult } from "../../../contracts/tool-result.js";
import { inspectorGetTaskInput } from "../schemas.js";

export function mapInspectorTask(input: {
  task_id: string;
  task_name?: string;
  url?: string;
  task_type?: string;
  domain_name?: string;
  create_time?: string;
  start_time?: string;
  end_time?: string;
  task_status?: string;
  schedule_status?: string;
  progress?: number;
  reason?: string;
  pack_num?: number;
  score?: number;
  safe_level?: string;
  statistics?: {
    high?: number;
    middle?: number;
    low?: number;
    hint?: number;
  };
}) {
  return asItemResult(`Loaded inspector task ${input.task_id}`, {
    id: input.task_id,
    name: input.task_name,
    url: input.url,
    taskType: input.task_type,
    domainName: input.domain_name,
    createdAt: input.create_time,
    startedAt: input.start_time,
    endedAt: input.end_time,
    status: input.task_status,
    scheduleStatus: input.schedule_status,
    progress: input.progress,
    reason: input.reason,
    packCount: input.pack_num,
    score: input.score,
    safeLevel: input.safe_level,
    vulnerabilityStats: input.statistics
  });
}

type InspectorGetTaskClient = {
  getTask: (input: { project_id: string; task_id: string }) => Promise<{
    task_id: string;
    task_name?: string;
    url?: string;
    task_type?: string;
    domain_name?: string;
    create_time?: string;
    start_time?: string;
    end_time?: string;
    task_status?: string;
    schedule_status?: string;
    progress?: number;
    reason?: string;
    pack_num?: number;
    score?: number;
    safe_level?: string;
    statistics?: {
      high?: number;
      middle?: number;
      low?: number;
      hint?: number;
    };
  }>;
};

export function createInspectorGetTaskHandler(client: InspectorGetTaskClient) {
  return async (input: unknown) => {
    const parsed = inspectorGetTaskInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapInspectorTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
