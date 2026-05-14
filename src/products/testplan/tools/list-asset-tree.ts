import { testPlanListAssetTreeInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListAssetTreeClient = {
  listAssetTree: (input: {
    project_id: string;
    asset_id: string;
  }) => Promise<{
    nodes: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListAssetTreeHandler(client: TestPlanListAssetTreeClient) {
  return async (input: unknown) => {
    const parsed = testPlanListAssetTreeInput.parse(input);
    const response = await client.listAssetTree(parsed);
    const result = mapTestPlanRecordList(
      response.nodes,
      response.total,
      "asset tree nodes",
      "node"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
