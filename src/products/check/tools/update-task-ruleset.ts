import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateTaskRulesetInput } from "../schemas.js";

type TaskRuleset = {
  language: string;
  rule_set_id: string;
  if_use: "0" | "1";
  status: string;
};

function mapUpdatedTaskRuleset(input: {
  task_id: string;
  rulesets: TaskRuleset[];
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Updated" : "Dry run: update"} Check task ruleset ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    rulesetCount: input.rulesets.length,
    rulesetIds: input.rulesets.map((item) => item.rule_set_id),
    requestBody: input.rulesets,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  updateTaskRuleset: (input: {
    task_id: string;
    rulesets: TaskRuleset[];
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateTaskRulesetHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateTaskRulesetInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedTaskRuleset({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskRuleset(parsed);
    const result = mapUpdatedTaskRuleset({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
