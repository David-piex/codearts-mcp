import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListRulesInput } from "../schemas.js";

type PipelineRuleSummary = {
  id?: string;
  type?: string;
  name?: string;
  version?: string;
  operator?: string;
  operate_time?: number;
};

export function mapPipelineRuleList(
  domainId: string,
  rules: PipelineRuleSummary[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${rules.length} pipeline rules`,
    rules.map((rule) => ({
      id: rule.id ?? "",
      domainId,
      ruleId: rule.id ?? "",
      name: rule.name ?? "",
      type: rule.type,
      version: rule.version,
      operator: rule.operator,
      operateTime: rule.operate_time
    })),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListRulesClient = {
  listRules: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    cloud_project_id?: string;
    type?: string;
    name?: string;
  }) => Promise<{
    data: PipelineRuleSummary[];
    total?: number;
  }>;
};

export function createPipelineListRulesHandler(client: PipelineListRulesClient) {
  return async (input: unknown) => {
    const parsed = pipelineListRulesInput.parse(input);
    const response = await client.listRules(parsed);
    const result = mapPipelineRuleList(
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
