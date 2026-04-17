import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProjectsInput } from "../schemas.js";

export function mapReqProjects(
  items: Array<{ id: string; name: string; project_num_id?: number } | { project_id: string; name: string; project_num_id?: number }>,
  page: number,
  pageSize: number
) {
  return asListResult(
    `${items.length} projects found`,
    items.map((item) => ({
      id: "project_id" in item ? item.project_id : item.id,
      name: item.name,
      numberId: item.project_num_id
    })),
    toPageInfo(page, pageSize)
  );
}

type ReqListProjectsClient = {
  listProjects: (input: { page: number; page_size: number; keyword?: string }) => Promise<{
    projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
    total?: number;
  }>;
};

export function createReqListProjectsHandler(client: ReqListProjectsClient) {
  return async (input: unknown) => {
    const parsed = reqListProjectsInput.parse(input);
    const response = await client.listProjects(parsed);
    const result = mapReqProjects(response.projects, parsed.page, parsed.page_size);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
