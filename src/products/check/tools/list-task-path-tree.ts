import { checkListTaskPathTreeInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskPathTree: (input: {
    project_id: string;
    task_id: string;
    current_path?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    nodes: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskPathTreeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskPathTreeInput.parse(input);
    const response = await client.listTaskPathTree(parsed);
    const result = mapCheckRecordList(response.nodes, response.total, "task path tree nodes", "node");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
