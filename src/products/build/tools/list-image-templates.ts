import { buildListImageTemplatesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listImageTemplates: () => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListImageTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    buildListImageTemplatesInput.parse(input);
    const response = await client.listImageTemplates();
    const result = mapBuildRecordList(response.templates, response.total, "image templates", "template");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
