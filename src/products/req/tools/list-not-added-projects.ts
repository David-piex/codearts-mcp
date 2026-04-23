import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListNotAddedProjectsInput } from "../schemas.js";

export function mapReqNotAddedProjects(
  items: Array<{
    project_id: string;
    project_name?: string;
    name?: string;
    project_num_id?: number;
    description?: string;
    project_type?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} not-added projects found`,
    items.map((item) => ({
      id: item.project_id,
      name: item.project_name ?? item.name ?? "",
      numberId: item.project_num_id,
      description: item.description,
      type: item.project_type
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListNotAddedProjectsClient = {
  listNotAddedProjects: (input: { page: number; page_size: number }) => Promise<{
    projects: Array<{
      project_id: string;
      project_name: string;
      project_num_id?: number;
      description?: string;
      project_type?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListNotAddedProjectsHandler(client: ReqListNotAddedProjectsClient) {
  return async (input: unknown) => {
    const parsed = reqListNotAddedProjectsInput.parse(input);
    const response = await client.listNotAddedProjects(parsed);
    const result = mapReqNotAddedProjects(response.projects, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "project_id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "numberId", get: (item) => (item as { numberId?: number }).numberId },
        { label: "type", get: (item) => (item as { type?: string }).type }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
