import { testPlanGetBranchInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetBranchClient = {
  getBranch: (input: {
    branch_uri: string;
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetBranchHandler(client: TestPlanGetBranchClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetBranchInput.parse(input);
    const response = await client.getBranch(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded branch ${parsed.branch_uri}`,
      parsed.branch_uri,
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
