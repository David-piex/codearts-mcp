import { testPlanListAssetsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListAssetsClient = {
  listAssets: (input: {
    project_id: string;
  }) => Promise<{
    assets: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListAssetsHandler(client: TestPlanListAssetsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListAssetsInput.parse(input);
    const response = await client.listAssets(parsed);
    const result = mapTestPlanRecordList(
      response.assets,
      response.total,
      "assets",
      "asset"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
