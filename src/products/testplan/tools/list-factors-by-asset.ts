import { testPlanListFactorsByAssetInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listFactorsByAsset: (input: {
    project_id: string;
    asset_id: string;
    page: number;
    page_size: number;
    type?: string;
    name?: string;
    parent_node_ids?: string[];
    creator_num?: string;
    mindmap_id?: string;
    testpoint_id?: string;
    mindmap_node_id?: string;
  }) => Promise<{
    factors: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListFactorsByAssetHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListFactorsByAssetInput.parse(input);
    const response = await client.listFactorsByAsset(parsed);
    const result = mapTestPlanRecordList(
      response.factors,
      response.total,
      "TestPlan factors",
      "factor",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
