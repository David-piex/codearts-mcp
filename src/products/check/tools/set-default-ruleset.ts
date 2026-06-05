import { asItemResult } from "../../../contracts/tool-result.js";
import { checkSetDefaultRulesetInput } from "../schemas.js";

function mapSetDefaultRuleset(input: {
  project_id: string;
  ruleset_id: string;
  language: string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Set" : "Dry run: set"} Check default ruleset ${input.ruleset_id}`,
    {
      id: input.ruleset_id,
      projectId: input.project_id,
      rulesetId: input.ruleset_id,
      language: input.language,
      status: input.status,
      result: input.result,
      raw: input.raw,
      executed: input.executed
    }
  );
}

type Client = {
  setDefaultRuleset: (input: {
    project_id: string;
    ruleset_id: string;
    language: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    ruleset_id: string;
    language: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckSetDefaultRulesetHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkSetDefaultRulesetInput.parse(input);

    if (parsed.dry_run) {
      const result = mapSetDefaultRuleset({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.setDefaultRuleset(parsed);
    const result = mapSetDefaultRuleset({ ...parsed, ...response, executed: true });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
