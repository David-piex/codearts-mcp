import { checkGetTaskRulesetCheckParametersV2Input } from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordList } from "./generic-read-tools.js";

type Client = {
  getTaskRulesetCheckParametersV2: (input: {
    project_id: string;
    task_id: string;
    ruleset_id: string;
  }) => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createCheckGetTaskRulesetCheckParametersV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskRulesetCheckParametersV2Input.parse(input);
    const response = await client.getTaskRulesetCheckParametersV2(parsed);
    const result = mapCheckRecordList(
      response.parameters,
      response.total,
      "task v2 ruleset check parameters",
      "parameter"
    );

    return {
      content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
      structuredContent: result
    };
  };
}
