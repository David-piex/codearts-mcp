import { buildListCodeTagsInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listCodeTags: (input: {
    scm_type: string;
    repo_id?: string;
    search?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tags: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListCodeTagsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListCodeTagsInput.parse(input);
    const response = await client.listCodeTags(parsed);
    const result = mapBuildRecordList(response.tags, response.total, "code tags", "tag", parsed.page, parsed.page_size);

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
