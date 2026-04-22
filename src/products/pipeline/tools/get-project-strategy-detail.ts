import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetProjectStrategyDetailInput } from "../schemas.js";

type PipelineStrategySummary = {
  id?: string;
  name?: string;
  type?: string;
  version?: string;
  operator?: string;
  operate_time?: number;
  is_valid?: boolean;
  level?: string;
  is_public?: boolean;
  is_legacy?: boolean;
};

export function mapProjectPipelineStrategySummary(
  projectId: string,
  strategy: PipelineStrategySummary
) {
  return asItemResult(`Loaded project pipeline strategy detail ${strategy.id ?? ""}`, {
    id: strategy.id ?? "",
    projectId,
    ruleSetId: strategy.id ?? "",
    name: strategy.name ?? "",
    type: strategy.type,
    version: strategy.version,
    operator: strategy.operator,
    operateTime: strategy.operate_time,
    isValid: strategy.is_valid,
    level: strategy.level,
    isPublic: strategy.is_public,
    isLegacy: strategy.is_legacy
  });
}

type PipelineGetProjectStrategyDetailClient = {
  getProjectStrategyDetail: (input: {
    project_id: string;
    rule_set_id: string;
  }) => Promise<PipelineStrategySummary>;
};

export function createPipelineGetProjectStrategyDetailHandler(
  client: PipelineGetProjectStrategyDetailClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetProjectStrategyDetailInput.parse(input);
    const response = await client.getProjectStrategyDetail(parsed);
    const result = mapProjectPipelineStrategySummary(parsed.project_id, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
