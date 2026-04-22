import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateStrategyInput } from "../schemas.js";

type PipelineStrategyRuleReference = {
  id?: string;
  is_valid?: boolean;
};

export function previewCreatePipelineStrategy(input: {
  domain_id: string;
  name: string;
  rules: PipelineStrategyRuleReference[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline strategy ${input.name}`, {
    domainId: input.domain_id,
    name: input.name,
    ruleCount: input.rules.length,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineStrategy(input: {
  domain_id: string;
  rule_set_id?: string;
  status?: boolean;
}) {
  return asItemResult(`Created pipeline strategy ${input.rule_set_id ?? ""}`, {
    id: input.rule_set_id ?? "",
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id ?? "",
    status: input.status ?? true,
    executed: true
  });
}

type PipelineCreateStrategyClient = {
  createStrategy: (input: {
    domain_id: string;
    name: string;
    rules: PipelineStrategyRuleReference[];
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineCreateStrategyHandler(client: PipelineCreateStrategyClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineStrategy(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createStrategy(parsed);
    const result = mapCreatedPipelineStrategy({
      domain_id: parsed.domain_id,
      rule_set_id: response.rule_set_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
