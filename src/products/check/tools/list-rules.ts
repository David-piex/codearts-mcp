import { checkListRulesInput } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listRules: (input: {
    page: number;
    page_size: number;
    rule_languages?: string;
    rule_severity?: string;
    keyword?: string;
  }) => Promise<{
    rules: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListRulesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListRulesInput.parse(input);
    const response = await client.listRules(parsed);
    const result = mapCheckRecordList(
      response.rules,
      response.total,
      "rules",
      "rule"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
