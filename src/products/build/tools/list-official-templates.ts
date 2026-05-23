import { buildListOfficialTemplatesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listOfficialTemplates: (input: {
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListOfficialTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListOfficialTemplatesInput.parse(input);
    const response = await client.listOfficialTemplates(parsed);
    const result = mapBuildRecordList(
      response.templates,
      response.total,
      "official templates",
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
