import { checkListTaskRulesetsV2Input } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskRulesetsV2: (input: { project_id: string; task_id: string }) => Promise<{
    rulesets: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskRulesetsV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskRulesetsV2Input.parse(input);
    const response = await client.listTaskRulesetsV2(parsed);
    const result = mapCheckRecordList(response.rulesets, response.total, "task v2 rulesets", "ruleset");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
