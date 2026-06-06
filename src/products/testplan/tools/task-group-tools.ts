import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import {
  testPlanExecuteTaskGroupInput,
  testPlanGetTaskGroupDetailInput,
  testPlanGetTaskGroupHistoryInput
} from "../schemas.js";

type TaskGroupRecord = Record<string, unknown>;

function mapTaskGroupRecord(item: TaskGroupRecord, fallbackId: string) {
  return {
    id: String(item.id ?? item.uri ?? item.taskId ?? item.task_id ?? fallbackId),
    name:
      typeof item.name === "string"
        ? item.name
        : typeof item.task_name === "string"
          ? item.task_name
          : undefined,
    status:
      typeof item.status === "string"
        ? item.status
        : typeof item.status_name === "string"
          ? item.status_name
          : undefined,
    progress: typeof item.progress === "number" ? item.progress : undefined,
    taskGroupDetail: item
  };
}

function pickTaskGroupHistoryItems(raw: TaskGroupRecord): TaskGroupRecord[] {
  const candidate =
    raw.data ??
    raw.items ??
    raw.list ??
    raw.histories ??
    raw.records ??
    raw.value;

  if (Array.isArray(candidate)) {
    return candidate.filter((item): item is TaskGroupRecord => typeof item === "object" && item !== null);
  }

  if (typeof candidate === "object" && candidate !== null) {
    return [candidate as TaskGroupRecord];
  }

  if (Object.keys(raw).length === 0) {
    return [];
  }

  return [raw];
}

function readPageInfo(raw: TaskGroupRecord, itemCount: number) {
  const pageInfoSource =
    typeof raw.pageInfo === "object" && raw.pageInfo !== null
      ? (raw.pageInfo as Record<string, unknown>)
      : typeof raw.page_info === "object" && raw.page_info !== null
        ? (raw.page_info as Record<string, unknown>)
        : undefined;

  const page =
    typeof pageInfoSource?.pageNo === "number"
      ? pageInfoSource.pageNo
      : typeof pageInfoSource?.page_no === "number"
        ? pageInfoSource.page_no
        : 1;
  const pageSize =
    typeof pageInfoSource?.pageSize === "number"
      ? pageInfoSource.pageSize
      : typeof pageInfoSource?.page_size === "number"
        ? pageInfoSource.page_size
        : itemCount || 1;
  const total =
    typeof pageInfoSource?.totalCount === "number"
      ? pageInfoSource.totalCount
      : typeof pageInfoSource?.total_count === "number"
        ? pageInfoSource.total_count
        : typeof raw.total === "number"
          ? raw.total
          : typeof raw.totalCount === "number"
            ? raw.totalCount
            : itemCount;

  return toPageInfo(page, pageSize, total);
}

export function createTestPlanGetTaskGroupDetailHandler(client: {
  getTaskGroupDetail: (
    input: ReturnType<typeof testPlanGetTaskGroupDetailInput.parse>
  ) => Promise<{
    task_id: string;
    tasks: TaskGroupRecord[];
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanGetTaskGroupDetailInput.parse(input);
    const response = await client.getTaskGroupDetail(parsed);
    const result = asListResult(
      `${response.tasks.length} test plan task group detail entries found`,
      response.tasks.map((item) => mapTaskGroupRecord(item, response.task_id)),
      toPageInfo(1, response.tasks.length || 1, response.total ?? response.tasks.length),
      response.raw
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => item.id },
              { label: "name", get: (item) => item.name },
              { label: "status", get: (item) => item.status },
              { label: "progress", get: (item) => item.progress }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}

export function createTestPlanListTaskGroupDetailHistoryHandler(client: {
  getTaskGroupHistory: (
    input: ReturnType<typeof testPlanGetTaskGroupHistoryInput.parse>
  ) => Promise<{
    task_group_id: string;
    test_service_id: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanGetTaskGroupHistoryInput.parse(input);
    const response = await client.getTaskGroupHistory(parsed);
    const items = pickTaskGroupHistoryItems(response.raw);
    const result = asListResult(
      `${items.length} test plan task group detail histories found`,
      items.map((item) => ({
        ...mapTaskGroupRecord(item, response.task_group_id),
        taskGroupHistory: item
      })),
      readPageInfo(response.raw, items.length),
      response.raw
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => item.id },
              { label: "name", get: (item) => item.name },
              { label: "status", get: (item) => item.status },
              { label: "progress", get: (item) => item.progress }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}

export function createTestPlanExecuteTaskGroupHandler(client: {
  executeTaskGroup: (
    input: Omit<ReturnType<typeof testPlanExecuteTaskGroupInput.parse>, "dry_run">
  ) => Promise<{
    value?: unknown;
    task_group_id?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanExecuteTaskGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: execute test plan task group", {
        id: parsed.id ?? parsed.taskGroupName ?? "task-group",
        taskGroupId: parsed.id,
        taskGroupName: parsed.taskGroupName,
        testServiceId: parsed.testServiceId,
        taskCount: parsed.tasks?.length ?? 0,
        scheduledTime: parsed.scheduledTime,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.executeTaskGroup(parsed);
    const result = asItemResult(
      "Executed test plan task group",
      {
        id: response.task_group_id ?? String(response.value ?? parsed.id ?? parsed.taskGroupName ?? "task-group"),
        taskGroupId: response.task_group_id ?? parsed.id,
        taskGroupName: parsed.taskGroupName,
        testServiceId: parsed.testServiceId,
        taskCount: parsed.tasks?.length ?? 0,
        value: response.value,
        executed: true
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
