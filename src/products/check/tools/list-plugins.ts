import { checkListPluginsInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listPlugins: (input: {
    id: string;
    name?: string;
    version?: string;
    publisher_name?: string;
  }) => Promise<{
    plugins: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListPluginsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListPluginsInput.parse(input);
    const response = await client.listPlugins(parsed);
    const result = mapCheckRecordList(response.plugins, response.total, "plugins", "plugin");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
