import { testPlanListResourcePoolsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListResourcePoolsClient = {
  listResourcePools: (input: { project_id: string }) => Promise<{
    pools: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListResourcePoolsHandler(client: TestPlanListResourcePoolsClient) {
  return async (input: unknown) => {
    const parsed = testPlanListResourcePoolsInput.parse(input);
    const response = await client.listResourcePools(parsed);
    const result = mapTestPlanRecordList(response.pools, response.total, "resource pools", "pool");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
