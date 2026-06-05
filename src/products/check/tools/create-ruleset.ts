import { asItemResult } from "../../../contracts/tool-result.js";
import { checkCreateRulesetInput } from "../schemas.js";

type CheckCreateRulesetClient = {
  createRuleset: (input: {
    project_id: string;
    template_name: string;
    language: string;
    is_default?: "0" | "1";
    rule_ids?: string;
    uncheck_ids?: string;
    template_id?: string;
    custom_attributes?: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id: string;
    ruleset_id: string;
    template_name?: string;
    language?: string;
    is_default?: string;
    raw: Record<string, unknown>;
  }>;
};

function mapRulesetPreview(input: {
  project_id: string;
  template_name: string;
  language: string;
  is_default: "0" | "1";
  rule_ids?: string;
  uncheck_ids?: string;
  template_id?: string;
  custom_attributes?: Array<Record<string, unknown>>;
  executed: boolean;
  ruleset_id?: string;
  raw?: Record<string, unknown>;
}) {
  return asItemResult(
    `${input.executed ? "Created" : "Dry run: create"} Check ruleset ${input.template_name}`,
    {
      id: input.ruleset_id,
      projectId: input.project_id,
      rulesetId: input.ruleset_id,
      name: input.template_name,
      language: input.language,
      isDefault: input.is_default,
      ruleIds: input.rule_ids,
      uncheckIds: input.uncheck_ids,
      templateId: input.template_id,
      customAttributeCount: input.custom_attributes?.length ?? 0,
      raw: input.raw,
      executed: input.executed
    }
  );
}

export function createCheckCreateRulesetHandler(client: CheckCreateRulesetClient) {
  return async (input: unknown) => {
    const parsed = checkCreateRulesetInput.parse(input);

    if (parsed.dry_run) {
      const result = mapRulesetPreview({
        ...parsed,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createRuleset(parsed);
    const result = mapRulesetPreview({
      project_id: response.project_id,
      template_name: response.template_name ?? parsed.template_name,
      language: response.language ?? parsed.language,
      is_default: (response.is_default as "0" | "1" | undefined) ?? parsed.is_default,
      rule_ids: parsed.rule_ids,
      uncheck_ids: parsed.uncheck_ids,
      template_id: parsed.template_id,
      custom_attributes: parsed.custom_attributes,
      ruleset_id: response.ruleset_id,
      raw: response.raw,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
