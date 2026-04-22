import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineSwitchStrategyInput } from "../schemas.js";

export function previewSwitchPipelineStrategy(input: {
  domain_id: string;
  rule_set_id: string;
  is_valid: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: switch pipeline strategy ${input.rule_set_id}`, {
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id,
    isValid: input.is_valid,
    executed: !input.dry_run
  });
}

export function mapSwitchedPipelineStrategy(input: {
  domain_id: string;
  rule_set_id: string;
  is_valid: boolean;
  status?: boolean;
}) {
  return asItemResult(`Switched pipeline strategy ${input.rule_set_id}`, {
    id: input.rule_set_id,
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id,
    isValid: input.is_valid,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineSwitchStrategyClient = {
  switchStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
    is_valid: boolean;
  }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineSwitchStrategyHandler(client: PipelineSwitchStrategyClient) {
  return async (input: unknown) => {
    const parsed = pipelineSwitchStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewSwitchPipelineStrategy(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.switchStrategy(parsed);
    const result = mapSwitchedPipelineStrategy({
      domain_id: parsed.domain_id,
      rule_set_id: response.rule_set_id ?? parsed.rule_set_id,
      is_valid: parsed.is_valid,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
