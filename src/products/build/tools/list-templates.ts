import { buildListTemplatesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listTemplates: (input: {
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListTemplatesInput.parse(input);
    const response = await client.listTemplates(parsed);
    const result = mapBuildRecordList(
      response.templates,
      response.total,
      "templates",
      "template",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
