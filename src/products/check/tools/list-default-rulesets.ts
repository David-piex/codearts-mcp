import { checkListDefaultRulesetsInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  listDefaultRulesets: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckListDefaultRulesetsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListDefaultRulesetsInput.parse(input);
    const response = await client.listDefaultRulesets(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check default rulesets ${parsed.project_id}`,
      parsed.project_id,
      "defaultRulesets",
      response.raw,
      { project_id: response.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
