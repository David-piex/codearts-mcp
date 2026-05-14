import { buildListDomainRelatedProjectsInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  getDomainRelatedProjects: () => Promise<{
    projects: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListDomainRelatedProjectsHandler(client: Client) {
  return async (input: unknown) => {
    buildListDomainRelatedProjectsInput.parse(input);
    const response = await client.getDomainRelatedProjects();
    const result = mapBuildRecordList(response.projects, response.total, "domain related projects", "project");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
