import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListRuleTypesInput } from "../schemas.js";

type PipelineRuleType = {
  typeKey?: string;
  typeName?: string;
};

export function mapPipelineRuleTypes(organizationId: string, items: PipelineRuleType[]) {
  return asListResult(
    `Loaded ${items.length} pipeline rule types`,
    items.map((item) => ({
      id: item.typeKey ?? "",
      organizationId,
      typeKey: item.typeKey,
      typeName: item.typeName
    })),
    {
      page: 1,
      pageSize: items.length,
      total: items.length
    }
  );
}

type PipelineListRuleTypesClient = {
  listRuleTypes: (input: { organization_id: string }) => Promise<{
    items: PipelineRuleType[];
  }>;
};

export function createPipelineListRuleTypesHandler(client: PipelineListRuleTypesClient) {
  return async (input: unknown) => {
    const parsed = pipelineListRuleTypesInput.parse(input);
    const response = await client.listRuleTypes(parsed);
    const result = mapPipelineRuleTypes(parsed.organization_id, response.items);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
