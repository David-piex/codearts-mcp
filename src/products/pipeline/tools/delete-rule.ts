import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteRuleInput } from "../schemas.js";

export function previewDeletePipelineRule(input: {
  domain_id: string;
  rule_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline rule ${input.rule_id}`, {
    domainId: input.domain_id,
    ruleId: input.rule_id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineRule(input: {
  domain_id: string;
  rule_id: string;
  status?: boolean;
}) {
  return asItemResult(`Deleted pipeline rule ${input.rule_id}`, {
    id: input.rule_id,
    domainId: input.domain_id,
    ruleId: input.rule_id,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineDeleteRuleClient = {
  deleteRule: (input: { domain_id: string; rule_id: string }) => Promise<{
    status?: boolean;
    rule_id?: string;
  }>;
};

export function createPipelineDeleteRuleHandler(client: PipelineDeleteRuleClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteRuleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineRule(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteRule(parsed);
    const result = mapDeletedPipelineRule({
      domain_id: parsed.domain_id,
      rule_id: response.rule_id ?? parsed.rule_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
