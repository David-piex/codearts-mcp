import { checkGetCriterionRuleInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getCriterionRule: (input: { criterion_rule_id: string }) => Promise<{
    criterion_rule_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetCriterionRuleHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetCriterionRuleInput.parse(input);
    const response = await client.getCriterionRule(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check criterion rule ${parsed.criterion_rule_id}`,
      parsed.criterion_rule_id,
      "criterionRule",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
