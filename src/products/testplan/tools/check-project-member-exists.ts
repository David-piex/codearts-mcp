import { testPlanCheckProjectMemberExistsInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanCheckProjectMemberExistsClient = {
  checkProjectMemberExists: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCheckProjectMemberExistsHandler(
  client: TestPlanCheckProjectMemberExistsClient
) {
  return async (input: unknown) => {
    testPlanCheckProjectMemberExistsInput.parse(input);
    const response = await client.checkProjectMemberExists();
    const result = mapTestPlanValueItem(
      "Checked current project member existence",
      "project-member-exists",
      "existence",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
