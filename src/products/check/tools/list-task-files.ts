import { checkListTaskFilesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskFiles: (input: { task_id: string }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskFilesInput.parse(input);
    const response = await client.listTaskFiles(parsed);
    const result = mapCheckRecordList(response.files, response.total, "task files", "file");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
