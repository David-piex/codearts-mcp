import { buildListJobGroupTreeInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listJobGroupTree: (input: { project_id: string }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListJobGroupTreeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobGroupTreeInput.parse(input);
    const response = await client.listJobGroupTree(parsed);
    const result = mapBuildRecordList(response.groups, response.total, "job groups", "group");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
