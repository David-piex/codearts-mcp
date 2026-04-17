import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { checkListRulesetsInput } from "../schemas.js";

export function mapCheckRulesets(
  items: Array<{ id: string; name: string; language?: string; is_system?: boolean }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} rulesets found`,
    items.map((item) => ({
      id: item.id,
      name: item.name,
      language: item.language,
      system: item.is_system
    })),
    toPageInfo(page, pageSize, total)
  );
}

type CheckListRulesetsClient = {
  listRulesets: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    language?: string;
  }) => Promise<{
    rulesets: Array<{ id: string; name: string; language?: string; is_system?: boolean }>;
    total?: number;
  }>;
};

export function createCheckListRulesetsHandler(client: CheckListRulesetsClient) {
  return async (input: unknown) => {
    const parsed = checkListRulesetsInput.parse(input);
    const response = await client.listRulesets(parsed);
    const result = mapCheckRulesets(response.rulesets, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
