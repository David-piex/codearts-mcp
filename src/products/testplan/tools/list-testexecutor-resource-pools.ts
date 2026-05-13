import { testPlanListTestexecutorResourcePoolsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListTestexecutorResourcePoolsClient = {
  listTestexecutorResourcePools: (input: { project_id: string }) => Promise<{
    pools: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTestexecutorResourcePoolsHandler(
  client: TestPlanListTestexecutorResourcePoolsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListTestexecutorResourcePoolsInput.parse(input);
    const response = await client.listTestexecutorResourcePools(parsed);
    const result = mapTestPlanRecordList(
      response.pools,
      response.total,
      "testexecutor resource pools",
      "pool"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
