import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateStrategyInput } from "../schemas.js";

type PipelineStrategyRuleReference = {
  id?: string;
  is_valid?: boolean;
};

export function previewUpdatePipelineStrategy(input: {
  domain_id: string;
  rule_set_id: string;
  name: string;
  rules?: PipelineStrategyRuleReference[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline strategy ${input.rule_set_id}`, {
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id,
    name: input.name,
    ruleCount: input.rules?.length ?? 0,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineStrategy(input: {
  domain_id: string;
  rule_set_id: string;
  status?: boolean;
}) {
  return asItemResult(`Updated pipeline strategy ${input.rule_set_id}`, {
    id: input.rule_set_id,
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineUpdateStrategyClient = {
  updateStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
    name: string;
    rules?: PipelineStrategyRuleReference[];
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineUpdateStrategyHandler(client: PipelineUpdateStrategyClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineStrategy(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateStrategy(parsed);
    const result = mapUpdatedPipelineStrategy({
      domain_id: parsed.domain_id,
      rule_set_id: response.rule_set_id ?? parsed.rule_set_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
