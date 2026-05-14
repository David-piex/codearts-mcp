import { checkListTaskRulesetsV3Input } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskRulesetsV3: (input: { project_id: string; task_id: string }) => Promise<{
    rulesets: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckListTaskRulesetsV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListTaskRulesetsV3Input.parse(input);
    const response = await client.listTaskRulesetsV3(parsed);
    const result = mapCheckRecordList(response.rulesets, response.total, "task v3 rulesets", "ruleset");

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
