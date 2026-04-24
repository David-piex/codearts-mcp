import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProgramsInput } from "../schemas.js";
import type { ReqProgramInfo } from "./program-mappers.js";

type ReqListProgramsClient = {
  listPrograms: (input: {
    page: number;
    page_size: number;
    search?: string;
    sort_key?: "name" | "created_time";
    sort_dir?: string;
    is_watched?: boolean;
  }) => Promise<{
    programs: ReqProgramInfo[];
    total?: number;
  }>;
};

export function mapReqPrograms(items: ReqProgramInfo[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} Req programs found`,
    items.map((item) => ({
      id: item.program_id,
      name: item.name,
      description: item.description,
      projectCount: item.project_count,
      archived: item.is_archived,
      watched: item.is_watched,
      createdTime: item.created_time,
      updatedTime: item.updated_time,
      ownerName: item.owner?.nick_name ?? item.owner?.user_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function createReqListProgramsHandler(client: ReqListProgramsClient) {
  return async (input: unknown) => {
    const parsed = reqListProgramsInput.parse(input);
    const response = await client.listPrograms(parsed);
    const result = mapReqPrograms(response.programs, parsed.page, parsed.page_size, response.total);

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => (item as { id?: string }).id },
              { label: "name", get: (item) => (item as { name?: string }).name },
              { label: "projectCount", get: (item) => (item as { projectCount?: number }).projectCount }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
