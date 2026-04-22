import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListProjectStrategiesInput } from "../schemas.js";

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

export function mapProjectPipelineStrategyList(
  projectId: string,
  strategies: PipelineStrategySummary[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${strategies.length} project pipeline strategies`,
    strategies.map((strategy) => ({
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
    })),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListProjectStrategiesClient = {
  listProjectStrategies: (input: {
    project_id: string;
    offset: number;
    limit: number;
    include_tenant_rule_set?: boolean;
    name?: string;
    is_valid?: boolean;
    type?: string;
  }) => Promise<{
    data: PipelineStrategySummary[];
    total?: number;
  }>;
};

export function createPipelineListProjectStrategiesHandler(
  client: PipelineListProjectStrategiesClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListProjectStrategiesInput.parse(input);
    const response = await client.listProjectStrategies(parsed);
    const result = mapProjectPipelineStrategyList(
      parsed.project_id,
      response.data,
      parsed.offset,
      parsed.limit,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
