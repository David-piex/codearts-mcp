import { asItemResult } from "../../../contracts/tool-result.js";
import { checkDeleteRulesetInput } from "../schemas.js";

type CheckDeleteRulesetClient = {
  deleteRuleset: (input: {
    project_id: string;
    ruleset_id: string;
  }) => Promise<{
    project_id: string;
    ruleset_id: string;
    raw?: Record<string, unknown>;
  }>;
};

function mapDeletedRuleset(input: {
  project_id: string;
  ruleset_id: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Deleted" : "Dry run: delete"} Check ruleset ${input.ruleset_id}`,
    {
      id: input.ruleset_id,
      projectId: input.project_id,
      rulesetId: input.ruleset_id,
      raw: input.raw,
      executed: input.executed
    }
  );
}

export function createCheckDeleteRulesetHandler(client: CheckDeleteRulesetClient) {
  return async (input: unknown) => {
    const parsed = checkDeleteRulesetInput.parse(input);

    if (parsed.dry_run) {
      const result = mapDeletedRuleset({
        ...parsed,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteRuleset(parsed);
    const result = mapDeletedRuleset({
      ...response,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
