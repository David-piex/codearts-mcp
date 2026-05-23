import { checkListTaskAllFilesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskAllFiles: (input: {
    task_id: string;
    file_path?: string;
    get_son?: boolean;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskAllFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskAllFilesInput.parse(input);
    const response = await client.listTaskAllFiles(parsed);
    const result = mapCheckRecordList(response.files, response.total, "task files", "file");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
