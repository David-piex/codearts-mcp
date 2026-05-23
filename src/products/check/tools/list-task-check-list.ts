import { checkListTaskCheckListInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskCheckList: (input: {
    task_id: string;
    check_type?: "branch" | "tag" | "cr" | "mr";
    page: number;
    page_size: number;
    search?: string;
    time_start?: string;
    time_end?: string;
  }) => Promise<{
    checks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckListTaskCheckListHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskCheckListInput.parse(input);
    const response = await client.listTaskCheckList(parsed);
    const result = mapCheckRecordList(response.checks, response.total, "task checks", "check");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: {
        ...result,
        taskId: parsed.task_id,
        checkType: parsed.check_type,
        raw: response.raw
      }
    };
  };
}
