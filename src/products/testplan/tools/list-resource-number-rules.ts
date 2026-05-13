import { testPlanListResourceNumberRulesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListResourceNumberRulesClient = {
  listResourceNumberRules: (input: { project_id: string }) => Promise<{
    rules: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListResourceNumberRulesHandler(
  client: TestPlanListResourceNumberRulesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListResourceNumberRulesInput.parse(input);
    const response = await client.listResourceNumberRules(parsed);
    const result = mapTestPlanRecordList(response.rules, response.total, "resource number rules", "rule");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
