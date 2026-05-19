import { testPlanListV1BranchesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListV1BranchesClient = {
  listV1Branches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListV1BranchesHandler(client: TestPlanListV1BranchesClient) {
  return async (input: unknown) => {
    const parsed = testPlanListV1BranchesInput.parse(input);
    const response = await client.listV1Branches(parsed);
    const result = mapTestPlanRecordList(
      response.branches,
      response.total,
      "v1 branches",
      "branch",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
