import { buildListDomainRelatedProjectsPageInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listDomainRelatedProjectsPage: (input: {
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    projects: Array<Record<string, unknown>>;
    total?: number;
    keep_time?: unknown;
  }>;
};

export function createBuildListDomainRelatedProjectsPageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListDomainRelatedProjectsPageInput.parse(input);
    const response = await client.listDomainRelatedProjectsPage(parsed);
    const result = mapBuildRecordList(
      response.projects,
      response.total,
      "domain related projects",
      "project",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
