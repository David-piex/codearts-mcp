import { testPlanGetTestcaseFieldInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetTestcaseFieldClient = {
  getTestcaseField: (input: {
    project_id: string;
    uri: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseFieldHandler(client: TestPlanGetTestcaseFieldClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseFieldInput.parse(input);
    const response = await client.getTestcaseField(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded testcase field ${parsed.uri}`,
      parsed.uri,
      "field",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
