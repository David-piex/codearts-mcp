import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetStrategyRelatedInfoInput } from "../schemas.js";

export function mapPipelineStrategyRelatedInfo(
  domainId: string,
  ruleSetId: string,
  input: {
    project_count?: number;
    pipeline_count?: number;
  }
) {
  return asItemResult(`Loaded pipeline strategy related info for ${ruleSetId}`, {
    id: ruleSetId,
    domainId,
    ruleSetId,
    projectCount: input.project_count ?? 0,
    pipelineCount: input.pipeline_count ?? 0
  });
}

type PipelineGetStrategyRelatedInfoClient = {
  getStrategyRelatedInfo: (input: { domain_id: string; rule_set_id: string }) => Promise<{
    project_count?: number;
    pipeline_count?: number;
  }>;
};

export function createPipelineGetStrategyRelatedInfoHandler(
  client: PipelineGetStrategyRelatedInfoClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetStrategyRelatedInfoInput.parse(input);
    const response = await client.getStrategyRelatedInfo(parsed);
    const result = mapPipelineStrategyRelatedInfo(parsed.domain_id, parsed.rule_set_id, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
