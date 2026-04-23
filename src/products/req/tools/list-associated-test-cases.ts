import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListAssociatedTestCasesInput } from "../schemas.js";

export function mapReqAssociatedTestCases(
  items: Array<{
    case_id: number | string;
    case_level?: string;
    case_name?: string;
    case_num?: string;
    created_time?: number;
    creator?: {
      nick_name?: string;
      user_id?: string;
      user_name?: string;
      user_num_id?: number;
    };
    owner?: {
      nick_name?: string;
      user_id?: string;
      user_name?: string;
      user_num_id?: number;
    };
    project?: {
      project_id?: string;
      project_name?: string;
    };
    status?: {
      id?: string;
      name?: string;
    };
    type?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} associated test cases found`,
    items.map((item) => ({
      id: String(item.case_id),
      number: item.case_num,
      name: item.case_name,
      level: item.case_level,
      createdTime: item.created_time,
      projectId: item.project?.project_id,
      projectName: item.project?.project_name,
      statusId: item.status?.id,
      status: item.status?.name,
      type: item.type,
      creator: item.creator
        ? {
            nickName: item.creator.nick_name,
            userId: item.creator.user_id,
            userName: item.creator.user_name,
            userNumId: item.creator.user_num_id
          }
        : undefined,
      owner: item.owner
        ? {
            nickName: item.owner.nick_name,
            userId: item.owner.user_id,
            userName: item.owner.user_name,
            userNumId: item.owner.user_num_id
          }
        : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListAssociatedTestCasesClient = {
  listAssociatedTestCases: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    test_cases: Array<{
      case_id: number | string;
      case_level?: string;
      case_name?: string;
      case_num?: string;
      created_time?: number;
      creator?: {
        nick_name?: string;
        user_id?: string;
        user_name?: string;
        user_num_id?: number;
      };
      owner?: {
        nick_name?: string;
        user_id?: string;
        user_name?: string;
        user_num_id?: number;
      };
      project?: {
        project_id?: string;
        project_name?: string;
      };
      status?: {
        id?: string;
        name?: string;
      };
      type?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListAssociatedTestCasesHandler(client: ReqListAssociatedTestCasesClient) {
  return async (input: unknown) => {
    const parsed = reqListAssociatedTestCasesInput.parse(input);
    const response = await client.listAssociatedTestCases(parsed);
    const result = mapReqAssociatedTestCases(
      response.test_cases,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "name", get: (item) => (item as { name?: string }).name },
            { label: "status", get: (item) => (item as { status?: string }).status }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "associated test cases",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
