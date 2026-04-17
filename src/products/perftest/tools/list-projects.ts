import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { perftestListProjectsInput } from "../schemas.js";

export function mapPerfTestProjects(
  items: Array<{
    id: number;
    name?: string;
    description?: string;
    source?: number;
    CreateTime?: string;
    UpdateTime?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} perftest projects found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      description: item.description,
      source: item.source,
      createdAt: item.CreateTime,
      updatedAt: item.UpdateTime
    })),
    toPageInfo(page, pageSize, total)
  );
}

type PerfTestListProjectsClient = {
  listProjects: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    projects: Array<{
      id: number;
      name?: string;
      description?: string;
      source?: number;
      CreateTime?: string;
      UpdateTime?: string;
    }>;
  }>;
};

export function createPerfTestListProjectsHandler(client: PerfTestListProjectsClient) {
  return async (input: unknown) => {
    const parsed = perftestListProjectsInput.parse(input);
    const response = await client.listProjects(parsed);
    const result = mapPerfTestProjects(response.projects, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
