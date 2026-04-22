import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetRuleRelatedInfoInput } from "../schemas.js";

export function mapPipelineRuleRelatedInfo(
  domainId: string,
  ruleId: string,
  input: {
    rule_set_count?: number;
    project_count?: number;
    pipeline_count?: number;
  }
) {
  return asItemResult(`Loaded pipeline rule related info for ${ruleId}`, {
    id: ruleId,
    domainId,
    ruleId,
    ruleSetCount: input.rule_set_count ?? 0,
    projectCount: input.project_count ?? 0,
    pipelineCount: input.pipeline_count ?? 0
  });
}

type PipelineGetRuleRelatedInfoClient = {
  getRuleRelatedInfo: (input: { domain_id: string; rule_id: string }) => Promise<{
    rule_set_count?: number;
    project_count?: number;
    pipeline_count?: number;
  }>;
};

export function createPipelineGetRuleRelatedInfoHandler(
  client: PipelineGetRuleRelatedInfoClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetRuleRelatedInfoInput.parse(input);
    const response = await client.getRuleRelatedInfo(parsed);
    const result = mapPipelineRuleRelatedInfo(parsed.domain_id, parsed.rule_id, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
