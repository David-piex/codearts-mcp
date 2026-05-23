import { checkListTaskCheckRecordsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskCheckRecords: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
    start_time?: string;
    end_time?: string;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskCheckRecordsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskCheckRecordsInput.parse(input);
    const response = await client.listTaskCheckRecords(parsed);
    const result = mapCheckRecordList(
      response.records,
      response.total,
      "task check records",
      "record"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
