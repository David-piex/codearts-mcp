import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListStrategiesInput } from "../schemas.js";

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

export function mapPipelineStrategyList(
  domainId: string,
  strategies: PipelineStrategySummary[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${strategies.length} pipeline strategies`,
    strategies.map((strategy) => ({
      id: strategy.id ?? "",
      domainId,
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

type PipelineListStrategiesClient = {
  listStrategies: (input: {
    domain_id: string;
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

export function createPipelineListStrategiesHandler(client: PipelineListStrategiesClient) {
  return async (input: unknown) => {
    const parsed = pipelineListStrategiesInput.parse(input);
    const response = await client.listStrategies(parsed);
    const result = mapPipelineStrategyList(
      parsed.domain_id,
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
