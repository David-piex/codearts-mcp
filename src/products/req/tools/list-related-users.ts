import { asItemResult } from "../../../contracts/tool-result.js";
import { reqListRelatedUsersInput } from "../schemas.js";

function normalizeRelatedUsers(
  items: Array<{
    user_name?: string;
    user_num_id?: number;
    user_id?: string;
    domain_id?: string;
    domain_name?: string;
    nick_name_py?: string;
  }>
) {
  return items.map((item) => ({
    userName: item.user_name,
    userNumId: item.user_num_id,
    userId: item.user_id,
    domainId: item.domain_id,
    domainName: item.domain_name,
    nickNamePy: item.nick_name_py
  }));
}

export function mapReqRelatedUsers(input: {
  project_id: string;
  related_author_list: Array<{
    user_name?: string;
    user_num_id?: number;
    user_id?: string;
    domain_id?: string;
    domain_name?: string;
    nick_name_py?: string;
  }>;
  related_assignee_list: Array<{
    user_name?: string;
    user_num_id?: number;
    user_id?: string;
    domain_id?: string;
    domain_name?: string;
    nick_name_py?: string;
  }>;
  related_developer_list: Array<{
    user_name?: string;
    user_num_id?: number;
    user_id?: string;
    domain_id?: string;
    domain_name?: string;
    nick_name_py?: string;
  }>;
}) {
  const authors = normalizeRelatedUsers(input.related_author_list);
  const assignees = normalizeRelatedUsers(input.related_assignee_list);
  const developers = normalizeRelatedUsers(input.related_developer_list);
  const totalCount = authors.length + assignees.length + developers.length;

  return asItemResult(`Loaded ${totalCount} related users`, {
    projectId: input.project_id,
    authorCount: authors.length,
    assigneeCount: assignees.length,
    developerCount: developers.length,
    totalCount,
    authors,
    assignees,
    developers
  });
}

type ReqListRelatedUsersClient = {
  listRelatedUsers: (input: { project_id: string }) => Promise<{
    project_id: string;
    related_author_list: Array<{
      user_name?: string;
      user_num_id?: number;
      user_id?: string;
      domain_id?: string;
      domain_name?: string;
      nick_name_py?: string;
    }>;
    related_assignee_list: Array<{
      user_name?: string;
      user_num_id?: number;
      user_id?: string;
      domain_id?: string;
      domain_name?: string;
      nick_name_py?: string;
    }>;
    related_developer_list: Array<{
      user_name?: string;
      user_num_id?: number;
      user_id?: string;
      domain_id?: string;
      domain_name?: string;
      nick_name_py?: string;
    }>;
  }>;
};

export function createReqListRelatedUsersHandler(client: ReqListRelatedUsersClient) {
  return async (input: unknown) => {
    const parsed = reqListRelatedUsersInput.parse(input);
    const response = await client.listRelatedUsers(parsed);
    const result = mapReqRelatedUsers(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
