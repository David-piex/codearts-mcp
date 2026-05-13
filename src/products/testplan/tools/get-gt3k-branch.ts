import { testPlanGetGt3kBranchInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetGt3kBranchClient = {
  getGt3kBranch: (input: {
    branch_id: string;
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kBranchHandler(client: TestPlanGetGt3kBranchClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetGt3kBranchInput.parse(input);
    const response = await client.getGt3kBranch(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded GT3K branch ${parsed.branch_id}`,
      parsed.branch_id,
      "branch",
      response.raw,
      { projectUuid: parsed.project_uuid }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
