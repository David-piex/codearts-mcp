import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateRuleInput } from "../schemas.js";

type PipelineRuleProperty = {
  key?: string;
  type?: string;
  name?: string;
  operator?: string;
  value?: string;
  value_type?: string;
  is_valid?: boolean;
};

type PipelineRuleContent = {
  group_name?: string;
  can_modify_when_inherit?: boolean;
  editable?: boolean;
  properties?: PipelineRuleProperty[];
};

export function previewUpdatePipelineRule(input: {
  domain_id: string;
  rule_id: string;
  name: string;
  type: string;
  content: PipelineRuleContent[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline rule ${input.rule_id}`, {
    domainId: input.domain_id,
    ruleId: input.rule_id,
    name: input.name,
    type: input.type,
    groupCount: input.content.length,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineRule(input: {
  domain_id: string;
  rule_id: string;
  status?: boolean;
}) {
  return asItemResult(`Updated pipeline rule ${input.rule_id}`, {
    id: input.rule_id,
    domainId: input.domain_id,
    ruleId: input.rule_id,
    status: input.status ?? true,
    executed: true
  });
}

type PipelineUpdateRuleClient = {
  updateRule: (input: {
    domain_id: string;
    rule_id: string;
    name: string;
    type: string;
    plugin_id?: string;
    plugin_name?: string;
    plugin_version?: string;
    content: PipelineRuleContent[];
  }) => Promise<{
    status?: boolean;
    rule_id?: string;
  }>;
};

export function createPipelineUpdateRuleHandler(client: PipelineUpdateRuleClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateRuleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineRule(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRule(parsed);
    const result = mapUpdatedPipelineRule({
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
