import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateRuleInput } from "../schemas.js";

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

export function previewCreatePipelineRule(input: {
  domain_id: string;
  name: string;
  type: string;
  layout_content: string;
  content: PipelineRuleContent[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline rule ${input.name}`, {
    domainId: input.domain_id,
    name: input.name,
    type: input.type,
    layoutContent: input.layout_content,
    groupCount: input.content.length,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineRule(input: {
  domain_id: string;
  rule_id?: string;
  status?: boolean;
}) {
  return asItemResult(`Created pipeline rule ${input.rule_id ?? ""}`, {
    id: input.rule_id ?? "",
    domainId: input.domain_id,
    ruleId: input.rule_id ?? "",
    status: input.status ?? true,
    executed: true
  });
}

type PipelineCreateRuleClient = {
  createRule: (input: {
    domain_id: string;
    name: string;
    type: string;
    layout_content: string;
    plugin_id?: string;
    plugin_name?: string;
    plugin_version?: string;
    content: PipelineRuleContent[];
  }) => Promise<{
    status?: boolean;
    rule_id?: string;
  }>;
};

export function createPipelineCreateRuleHandler(client: PipelineCreateRuleClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateRuleInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineRule(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createRule(parsed);
    const result = mapCreatedPipelineRule({
      domain_id: parsed.domain_id,
      rule_id: response.rule_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
