import { checkGetTaskRulesetCheckParametersV3Input } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  getTaskRulesetCheckParametersV3: (input: {
    project_id: string;
    task_id: string;
    ruleset_id: string;
  }) => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckGetTaskRulesetCheckParametersV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskRulesetCheckParametersV3Input.parse(input);
    const response = await client.getTaskRulesetCheckParametersV3(parsed);
    const result = mapCheckRecordList(
      response.parameters,
      response.total,
      "task v3 ruleset check parameters",
      "parameter"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
