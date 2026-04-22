import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteStrategyInput } from "../schemas.js";

export function previewDeletePipelineStrategy(input: {
  domain_id: string;
  rule_set_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline strategy ${input.rule_set_id}`, {
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineStrategy(input: {
  domain_id: string;
  rule_set_id: string;
  status?: boolean;
}) {
  return asItemResult(`Deleted pipeline strategy ${input.rule_set_id}`, {
    id: input.rule_set_id,
    domainId: input.domain_id,
    ruleSetId: input.rule_set_id,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineDeleteStrategyClient = {
  deleteStrategy: (input: { domain_id: string; rule_set_id: string }) => Promise<{
    status?: boolean;
    rule_set_id?: string;
  }>;
};

export function createPipelineDeleteStrategyHandler(client: PipelineDeleteStrategyClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteStrategyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineStrategy(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteStrategy(parsed);
    const result = mapDeletedPipelineStrategy({
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
