import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListDevucProjectMembersInput, reqListProjectMembersInput } from "../schemas.js";

export function mapReqProjectMembers(
  items: Array<{
    domain_id?: string;
    domain_name?: string;
    user_id: string;
    user_name?: string;
    user_num_id?: number;
    role_id?: number;
    nick_name?: string;
    role_name?: string;
    user_type?: string;
    forbidden?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project members found`,
    items.map((item) => ({
      id: item.user_id,
      userName: item.user_name,
      userNumId: item.user_num_id,
      nickName: item.nick_name,
      roleId: item.role_id,
      roleName: item.role_name,
      userType: item.user_type,
      forbidden: item.forbidden,
      domainId: item.domain_id,
      domainName: item.domain_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListProjectMembersClient = {
  listProjectMembers: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    members: Array<{
      domain_id?: string;
      domain_name?: string;
      user_id: string;
      user_name?: string;
      user_num_id?: number;
      role_id?: number;
      nick_name?: string;
      role_name?: string;
      user_type?: string;
      forbidden?: number;
    }>;
    total?: number;
  }>;
};

export function createReqListProjectMembersHandler(client: ReqListProjectMembersClient) {
  return async (input: unknown) => {
    const parsed = reqListProjectMembersInput.parse(input);
    const response = await client.listProjectMembers(parsed);
    const result = mapReqProjectMembers(response.members, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.keyword,
          projectId: parsed.project_id,
          resourceLabel: "project members",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

type ReqListDevucProjectMembersClient = {
  listDevucProjectMembers: (input: { project_id: string }) => Promise<{
    members: Array<{
      domain_id?: string;
      domain_name?: string;
      user_id?: string;
      user_name?: string;
      user_num_id?: number;
      role_id?: number;
      nick_name?: string;
      role_name?: string;
      forbidden?: number;
      role_applied?: boolean;
    }>;
  }>;
};

export function createReqListDevucProjectMembersHandler(client: ReqListDevucProjectMembersClient) {
  return async (input: unknown) => {
    const parsed = reqListDevucProjectMembersInput.parse(input);
    const response = await client.listDevucProjectMembers(parsed);
    const result = mapReqProjectMembers(
      response.members.map((member) => ({
        ...member,
        user_id: member.user_id ?? ""
      })),
      1,
      response.members.length || 1,
      response.members.length
    );
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: 1,
          projectId: parsed.project_id,
          resourceLabel: "DevUC project members",
          serviceLabel: "Req / DevUC"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
