import { checkListRulesetRulesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listRulesetRules: (input: {
    project_id: string;
    ruleset_id: string;
    page: number;
    page_size: number;
    types?: string;
    languages?: string;
    tags?: string;
  }) => Promise<{
    rules: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListRulesetRulesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListRulesetRulesInput.parse(input);
    const response = await client.listRulesetRules(parsed);
    const result = mapCheckRecordList(response.rules, response.total, "ruleset rules", "rule");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
