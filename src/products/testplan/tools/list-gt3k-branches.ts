import { testPlanListGt3kBranchesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kBranchesClient = {
  listGt3kBranches: (input: {
    project_uuid: string;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kBranchesHandler(
  client: TestPlanListGt3kBranchesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kBranchesInput.parse(input);
    const response = await client.listGt3kBranches(parsed);
    const result = mapTestPlanRecordList(response.branches, response.total, "GT3K branches", "branch");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
