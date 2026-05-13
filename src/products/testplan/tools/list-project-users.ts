import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListProjectUsersInput } from "../schemas.js";

export function mapTestPlanProjectUsers(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project users found`,
    items.map((item) => ({
      id: String(item.user_id ?? item.id ?? item.account_id ?? ""),
      name:
        typeof item.user_name === "string"
          ? item.user_name
          : typeof item.nick_name === "string"
            ? item.nick_name
            : typeof item.name === "string"
              ? item.name
              : undefined,
      user: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListProjectUsersClient = {
  listProjectUsers: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    users: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProjectUsersHandler(
  client: TestPlanListProjectUsersClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectUsersInput.parse(input);
    const response = await client.listProjectUsers(parsed);
    const result = mapTestPlanProjectUsers(
      response.users,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
