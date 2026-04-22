import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetProjectStrategyRelatedInfoInput } from "../schemas.js";

export function mapProjectPipelineStrategyRelatedInfo(
  projectId: string,
  ruleSetId: string,
  input: {
    project_count?: number;
    pipeline_count?: number;
  }
) {
  return asItemResult(`Loaded project pipeline strategy related info for ${ruleSetId}`, {
    id: ruleSetId,
    projectId,
    ruleSetId,
    projectCount: input.project_count ?? 0,
    pipelineCount: input.pipeline_count ?? 0
  });
}

type PipelineGetProjectStrategyRelatedInfoClient = {
  getProjectStrategyRelatedInfo: (input: {
    project_id: string;
    rule_set_id: string;
  }) => Promise<{
    project_count?: number;
    pipeline_count?: number;
  }>;
};

export function createPipelineGetProjectStrategyRelatedInfoHandler(
  client: PipelineGetProjectStrategyRelatedInfoClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetProjectStrategyRelatedInfoInput.parse(input);
    const response = await client.getProjectStrategyRelatedInfo(parsed);
    const result = mapProjectPipelineStrategyRelatedInfo(
      parsed.project_id,
      parsed.rule_set_id,
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
