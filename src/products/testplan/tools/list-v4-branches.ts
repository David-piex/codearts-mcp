import { testPlanListV4BranchesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListV4BranchesClient = {
  listV4Branches: (input: {
    project_uuid: string;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListV4BranchesHandler(client: TestPlanListV4BranchesClient) {
  return async (input: unknown) => {
    const parsed = testPlanListV4BranchesInput.parse(input);
    const response = await client.listV4Branches(parsed);
    const result = mapTestPlanRecordList(response.branches, response.total, "v4 branches", "branch");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
