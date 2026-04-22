import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListStrategyChildrenInput } from "../schemas.js";

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

export function mapPipelineStrategyChildren(
  domainId: string,
  parentRuleSetId: string,
  strategies: PipelineStrategySummary[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${strategies.length} child pipeline strategies`,
    strategies.map((strategy) => ({
      id: strategy.id ?? "",
      parentRuleSetId,
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

type PipelineListStrategyChildrenClient = {
  listStrategyChildren: (input: {
    domain_id: string;
    rule_set_id: string;
    offset?: number;
    limit?: number;
  }) => Promise<{
    data: PipelineStrategySummary[];
    total?: number;
  }>;
};

export function createPipelineListStrategyChildrenHandler(
  client: PipelineListStrategyChildrenClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListStrategyChildrenInput.parse(input);
    const response = await client.listStrategyChildren(parsed);
    const result = mapPipelineStrategyChildren(
      parsed.domain_id,
      parsed.rule_set_id,
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
